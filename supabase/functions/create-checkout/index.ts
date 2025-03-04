
import { serve } from "https://deno.land/std@0.170.0/http/server.ts";
import { Stripe } from "https://esm.sh/stripe@13.6.0";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
  apiVersion: "2023-10-16",
});

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Updated to use product IDs since price IDs are not available
const PLAN_PRODUCTS = {
  basic: {
    productId: "prod_RsnTi3vnYdOLZw", // Basic/Básico plan
    amount: 900 // in cents = $9
  },
  gold: {
    productId: "prod_RsnURV3GymmmUX", // GOLD plan
    amount: 5900 // in cents = $59
  },
  vip: {
    productId: "prod_RsnV4XA6NDM7kx", // VIP plan
    amount: 10900 // in cents = $109
  }
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
    const { planId, userId, paymentMethodId, email } = await req.json();
    
    if (!planId || !PLAN_PRODUCTS[planId as keyof typeof PLAN_PRODUCTS]) {
      return new Response(
        JSON.stringify({ error: "Invalid plan ID" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const baseUrl = req.headers.get("origin") || "http://localhost:5173";
    
    console.log(`Creating checkout session for plan: ${planId}, user: ${userId}`);
    
    // Use product ID instead of price ID and let Stripe determine the price
    const product = PLAN_PRODUCTS[planId as keyof typeof PLAN_PRODUCTS];
    
    // Create or get Stripe customer
    let customerId;
    
    if (email) {
      const customers = await stripe.customers.list({ email });
      
      if (customers.data.length > 0) {
        customerId = customers.data[0].id;
      } else {
        const customer = await stripe.customers.create({
          email,
          metadata: {
            supabaseUserId: userId,
          },
        });
        customerId = customer.id;
      }
    }
    
    // Create session configuration
    const sessionConfig: any = {
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product: product.productId,
            unit_amount: product.amount,
            recurring: {
              interval: "month",
            },
          },
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${baseUrl}/profile?success=true&plan=${planId}`,
      cancel_url: `${baseUrl}/profile?canceled=true`,
      client_reference_id: userId, // Store user ID for webhook processing
      metadata: {
        userId: userId,
        planId: planId
      }
    };

    // If a customer ID is available, attach it to the session
    if (customerId) {
      sessionConfig.customer = customerId;
      sessionConfig.success_url += `&customer_id=${customerId}`;
    }

    // If a payment method ID is provided, use it for the checkout
    if (paymentMethodId) {
      console.log(`Using payment method: ${paymentMethodId}`);
      sessionConfig.payment_method = paymentMethodId;
      // Store payment method in success URL for client-side processing
      sessionConfig.success_url += `&payment_method=${paymentMethodId}`;
    }

    const session = await stripe.checkout.sessions.create(sessionConfig);

    console.log(`Checkout session created: ${session.id}`);

    return new Response(
      JSON.stringify({ sessionId: session.id, url: session.url, customerId }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
