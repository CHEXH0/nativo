
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

const PLAN_PRODUCTS = {
  basic: {
    productId: "prod_RsnTi3vnYdOLZw",
    amount: 900
  },
  gold: {
    productId: "prod_RsnURV3GymmmUX",
    amount: 5900
  },
  vip: {
    productId: "prod_RsnV4XA6NDM7kx",
    amount: 10900
  }
};

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

    const { planId, paymentMethodId } = await req.json();
    
    if (!planId || !PLAN_PRODUCTS[planId as keyof typeof PLAN_PRODUCTS]) {
      return new Response(
        JSON.stringify({ error: "Invalid plan ID" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const baseUrl = req.headers.get("origin") || "https://your-app-domain.com";
    const userId = user.id;
    const email = user.email;
    
    console.log(`Creating checkout session for plan: ${planId}, user: ${userId}`);
    
    const product = PLAN_PRODUCTS[planId as keyof typeof PLAN_PRODUCTS];
    
    // Create or get Stripe customer
    let customerId;
    
    if (email) {
      const customers = await stripe.customers.list({ email, limit: 1 });
      
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
      client_reference_id: userId,
      metadata: {
        userId: userId,
        planId: planId
      }
    };

    if (customerId) {
      sessionConfig.customer = customerId;
      sessionConfig.success_url += `&customer_id=${customerId}`;
    }

    if (paymentMethodId) {
      console.log(`Using payment method: ${paymentMethodId}`);
      sessionConfig.payment_method = paymentMethodId;
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
