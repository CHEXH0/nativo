
import { serve } from "https://deno.land/std@0.170.0/http/server.ts";
import { Stripe } from "https://esm.sh/stripe@13.6.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.47.0";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
  apiVersion: "2023-10-16",
});

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Create Supabase client for auth verification
const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY") || "";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  try {
    // Verify authentication
    const authHeader = req.headers.get('authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: "No authorization header" }),
        {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Get user from JWT
    const { data: { user }, error: authError } = await supabase.auth.getUser(
      authHeader.replace('Bearer ', '')
    );

    if (authError || !user) {
      console.error("Authentication error:", authError);
      return new Response(
        JSON.stringify({ error: "Invalid authentication" }),
        {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const { action, customerId, paymentMethodId, email } = await req.json();

    console.log(`Processing payment method action: ${action} for user: ${user.id}`);

    switch (action) {
      case "setup_intent":
        const setupIntent = await stripe.setupIntents.create({
          usage: "off_session",
          customer: customerId || undefined,
        });
        return new Response(
          JSON.stringify({ 
            clientSecret: setupIntent.client_secret,
          }),
          {
            status: 200,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );

      case "create_customer":
        const userEmail = email || user.email;
        if (!userEmail) {
          return new Response(
            JSON.stringify({ error: "Email is required to create a customer" }),
            {
              status: 400,
              headers: { ...corsHeaders, "Content-Type": "application/json" },
            }
          );
        }

        let customer;
        const customers = await stripe.customers.list({ email: userEmail, limit: 1 });
        
        if (customers.data.length > 0) {
          customer = customers.data[0];
          console.log(`Found existing customer: ${customer.id}`);
        } else {
          customer = await stripe.customers.create({
            email: userEmail,
            metadata: {
              supabaseUserId: user.id,
            },
          });
          console.log(`Created new customer: ${customer.id}`);
        }

        return new Response(
          JSON.stringify({ customerId: customer.id }),
          {
            status: 200,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );

      case "list_payment_methods":
        if (!customerId) {
          return new Response(
            JSON.stringify({ error: "Customer ID is required" }),
            {
              status: 400,
              headers: { ...corsHeaders, "Content-Type": "application/json" },
            }
          );
        }

        const paymentMethods = await stripe.paymentMethods.list({
          customer: customerId,
          type: "card",
        });

        return new Response(
          JSON.stringify({ paymentMethods: paymentMethods.data }),
          {
            status: 200,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );

      case "detach_payment_method":
        if (!paymentMethodId) {
          return new Response(
            JSON.stringify({ error: "Payment method ID is required" }),
            {
              status: 400,
              headers: { ...corsHeaders, "Content-Type": "application/json" },
            }
          );
        }

        const detachedMethod = await stripe.paymentMethods.detach(paymentMethodId);

        return new Response(
          JSON.stringify({ paymentMethod: detachedMethod }),
          {
            status: 200,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );

      default:
        return new Response(
          JSON.stringify({ error: "Invalid action" }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
    }
  } catch (error) {
    console.error("Error processing request:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
      status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
