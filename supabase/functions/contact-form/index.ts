import { createClient } from 'npm:@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
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

    if (req.method === 'POST') {
      const body = await req.json()
      const { formType, ...formData } = body

      if (formType === 'consultation') {
        // Insert consultation request
        const { data, error } = await supabaseAdmin
          .from('consultation_requests')
          .insert([{
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            city: formData.city,
            state: formData.state,
            product_interest: formData.productInterest || null,
            hear_about: formData.hearAbout || null,
            comments: formData.comments || null,
            status: 'pending'
          }])
          .select()
          .single()

        if (error) {
          console.error('Error creating consultation request:', error)
          return new Response(
            JSON.stringify({ success: false, error: error.message }),
            { 
              status: 400, 
              headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
            }
          )
        }

        return new Response(
          JSON.stringify({ success: true, data }),
          { 
            status: 200, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        )
      } else if (formType === 'team') {
        // Insert team application
        const { data, error } = await supabaseAdmin
          .from('team_applications')
          .insert([{
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            city: formData.city,
            state: formData.state,
            experience: formData.experience || null,
            hear_about: formData.hearAbout || null,
            description: formData.description || null,
            referred_by: formData.referredBy || null,
            status: 'pending'
          }])
          .select()
          .single()

        if (error) {
          console.error('Error creating team application:', error)
          return new Response(
            JSON.stringify({ success: false, error: error.message }),
            { 
              status: 400, 
              headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
            }
          )
        }

        return new Response(
          JSON.stringify({ success: true, data }),
          { 
            status: 200, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        )
      } else {
        return new Response(
          JSON.stringify({ success: false, error: 'Invalid form type' }),
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
      JSON.stringify({ success: false, error: 'Internal server error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})