
import { serve } from "https://deno.land/std@0.170.0/http/server.ts";
import { Stripe } from "https://esm.sh/stripe@13.6.0";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
  apiVersion: "2023-10-16",
});

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const PLAN_PRICES = {
  basic: {
    priceId: "price_1QzLvtCE5f7WEyNvYu0kkgXo", // Replace with your actual Stripe price IDs
    amount: 900 // in cents = $9
  },
  gold: {
    priceId: "price_1QzLw2CE5f7WEyNvB07VYTOw", // Replace with your actual Stripe price IDs
    amount: 5900 // in cents = $59
  },
  vip: {
    priceId: "price_1QzLwACE5f7WEyNv8xJDLNXC", // Replace with your actual Stripe price IDs
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
    const { planId, userId } = await req.json();
    
    if (!planId || !PLAN_PRICES[planId as keyof typeof PLAN_PRICES]) {
      return new Response(
        JSON.stringify({ error: "Invalid plan ID" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const baseUrl = req.headers.get("origin") || "http://localhost:5173";
    
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: PLAN_PRICES[planId as keyof typeof PLAN_PRICES].priceId,
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
    });

    return new Response(
      JSON.stringify({ sessionId: session.id, url: session.url }),
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
