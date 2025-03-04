
import { serve } from "https://deno.land/std@0.170.0/http/server.ts";
import { Stripe } from "https://esm.sh/stripe@13.6.0";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
  apiVersion: "2023-10-16",
});

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  try {
    const { action, customerId, paymentMethodId, email } = await req.json();
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

    console.log(`Processing payment method action: ${action}`);

    // Handle different actions
    switch (action) {
      case "setup_intent":
        // Create a SetupIntent to securely collect payment details
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
        // Create or retrieve a Stripe customer for the user
        if (!email) {
          return new Response(
            JSON.stringify({ error: "Email is required to create a customer" }),
            {
              status: 400,
              headers: { ...corsHeaders, "Content-Type": "application/json" },
            }
          );
        }

        let customer;
        // Check if customer already exists
        const customers = await stripe.customers.list({ email });
        
        if (customers.data.length > 0) {
          customer = customers.data[0];
          console.log(`Found existing customer: ${customer.id}`);
        } else {
          // Create a new customer
          customer = await stripe.customers.create({
            email,
            metadata: {
              supabaseUserId: email.split('@')[0], // Simplified for demo
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
        // List all payment methods for a customer
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
        // Remove a payment method
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
