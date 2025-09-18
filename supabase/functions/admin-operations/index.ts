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
  dateOfBirth?: string;
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
    // Initialize Supabase client with service role key for admin operations
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

    // Initialize regular client for user verification
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
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

    // Verify the user is authenticated and is an admin using regular client
    const token = authHeader.replace('Bearer ', '')
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser(token)
    
    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: 'Invalid authentication' }),
        { 
          status: 401, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Check if user is admin using service role client
    const { data: userRole, error: roleError } = await supabaseAdmin
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .eq('role', 'admin')
      .maybeSingle()

    if (roleError || !userRole) {
      return new Response(
        JSON.stringify({ error: 'Insufficient permissions - admin role required' }),
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
          const { email, firstName, lastName, dateOfBirth, role, temporaryPassword }: CreateUserRequest = body

          // Generate password if not provided
          const password = temporaryPassword || generateTemporaryPassword()

          try {
            // Create user with admin privileges using service role
            const { data: newUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
              email,
              password,
              email_confirm: true, // Skip email confirmation
              user_metadata: {
                first_name: firstName,
                last_name: lastName,
                full_name: `${firstName} ${lastName}`.trim()
              }
            })

            if (createError) {
              console.error('User creation error:', createError)
              return new Response(
                JSON.stringify({ error: `Failed to create user: ${createError.message}` }),
                { 
                  status: 400, 
                  headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
                }
              )
            }

            if (!newUser.user) {
              return new Response(
                JSON.stringify({ error: 'User creation failed - no user returned' }),
                { 
                  status: 400, 
                  headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
                }
              )
            }

            console.log('User created successfully:', newUser.user.email)

            // Create agent profile using service role
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
              // Don't fail the entire operation for profile creation
            }

            // Create user role using service role
            const { error: roleError } = await supabaseAdmin
              .from('user_roles')
              .insert([{
                user_id: newUser.user.id,
                role: role,
                assigned_by: user.id
              }])

            if (roleError) {
              console.error('Error creating user role:', roleError)
              // Don't fail the entire operation for role creation
            }

            // Create invitation record using service role
            const { data: invitation, error: invitationError } = await supabaseAdmin
              .from('user_invitations')
              .insert([{
                email,
                first_name: firstName,
                last_name: lastName,
                role,
                temporary_password: password,
                invited_by: user.id,
                accepted_at: new Date().toISOString() // Mark as accepted since user is created
              }])
              .select()
              .single()

            if (invitationError) {
              console.error('Error creating invitation:', invitationError)
              // Don't fail the entire operation for invitation creation
            }

            return new Response(
              JSON.stringify({ 
                success: true, 
                user: {
                  id: newUser.user.id,
                  email: newUser.user.email,
                  created_at: newUser.user.created_at
                },
                invitation,
                temporaryPassword: password,
                message: 'User created successfully with confirmed email'
              }),
              { 
                status: 200, 
                headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
              }
            )
          } catch (userCreationError) {
            console.error('Unexpected error during user creation:', userCreationError)
            return new Response(
              JSON.stringify({ error: `User creation failed: ${userCreationError.message}` }),
              { 
                status: 500, 
                headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
              }
            )
          }
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
      JSON.stringify({ error: `Internal server error: ${error.message}` }),
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