import { createClient } from 'npm:@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

interface CreateUserRequest {
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'agent';
  temporaryPassword?: string;
}

interface CreateInvitationRequest {
  email: string;
  first_name?: string;
  last_name?: string;
  role: 'admin' | 'agent';
  temporary_password: string;
  invited_by: string;
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Initialize Supabase client with service role key
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    )

    // Get the authorization header to verify the requesting user
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Missing authorization header' }),
        { 
          status: 401, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Verify the user is authenticated and is an admin
    const token = authHeader.replace('Bearer ', '')
    const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(token)
    
    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: 'Invalid authentication' }),
        { 
          status: 401, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Check if user is admin
    const { data: userRole, error: roleError } = await supabaseAdmin
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .eq('role', 'admin')
      .maybeSingle()

    if (roleError || !userRole) {
      return new Response(
        JSON.stringify({ error: 'Insufficient permissions' }),
        { 
          status: 403, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    const url = new URL(req.url)
    const operation = url.pathname.split('/').pop()

    if (req.method === 'POST') {
      const body = await req.json()

      switch (operation) {
        case 'create-user': {
          const { email, firstName, lastName, role, temporaryPassword }: CreateUserRequest = body

          // Generate password if not provided
          const password = temporaryPassword || generateTemporaryPassword()

          // Create user with admin privileges
          const { data: newUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
            email,
            password,
            email_confirm: true,
            user_metadata: {
              first_name: firstName,
              last_name: lastName,
              full_name: `${firstName} ${lastName}`.trim()
            }
          })

          if (createError) {
            return new Response(
              JSON.stringify({ error: createError.message }),
              { 
                status: 400, 
                headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
              }
            )
          }

          if (newUser.user) {
            // Create agent profile
            const { error: profileError } = await supabaseAdmin
              .from('agent_profiles')
              .insert([{
                user_id: newUser.user.id,
                first_name: firstName,
                last_name: lastName,
                date_of_birth: dateOfBirth || null,
                status: 'active'
              }])

            if (profileError) {
              console.error('Error creating agent profile:', profileError)
            }

            // Create user role
            const { error: roleError } = await supabaseAdmin
              .from('user_roles')
              .insert([{
                user_id: newUser.user.id,
                role: role,
                assigned_by: user.id
              }])

            if (roleError) {
              console.error('Error creating user role:', roleError)
            }

            // Create invitation record
            const { data: invitation, error: invitationError } = await supabaseAdmin
              .from('user_invitations')
              .insert([{
                email,
                first_name: firstName,
                last_name: lastName,
                role,
                temporary_password: password,
                invited_by: user.id,
                accepted_at: new Date().toISOString()
              }])
              .select()
              .single()

            if (invitationError) {
              console.error('Error creating invitation:', invitationError)
            }

            return new Response(
              JSON.stringify({ 
                success: true, 
                user: newUser.user,
                invitation,
                temporaryPassword: password
              }),
              { 
                status: 200, 
                headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
              }
            )
          }
          break
        }

        case 'create-invitation': {
          const invitationData: CreateInvitationRequest = body

          const { data: invitation, error: invitationError } = await supabaseAdmin
            .from('user_invitations')
            .insert([invitationData])
            .select()
            .single()

          if (invitationError) {
            return new Response(
              JSON.stringify({ error: invitationError.message }),
              { 
                status: 400, 
                headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
              }
            )
          }

          return new Response(
            JSON.stringify({ success: true, invitation }),
            { 
              status: 200, 
              headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
            }
          )
        }

        case 'get-invitations': {
          const { data: invitations, error: invitationsError } = await supabaseAdmin
            .from('user_invitations')
            .select('*')
            .order('created_at', { ascending: false })

          if (invitationsError) {
            return new Response(
              JSON.stringify({ error: invitationsError.message }),
              { 
                status: 400, 
                headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
              }
            )
          }

          return new Response(
            JSON.stringify({ success: true, invitations }),
            { 
              status: 200, 
              headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
            }
          )
        }

        default:
          return new Response(
            JSON.stringify({ error: 'Unknown operation' }),
            { 
              status: 400, 
              headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
            }
          )
      }
    }

    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { 
        status: 405, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('Edge function error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})

function generateTemporaryPassword(): string {
  const chars = 'ABCDEFGHJKMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789'
  let password = ''
  for (let i = 0; i < 12; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return password
}