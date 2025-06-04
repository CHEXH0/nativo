
import { serve } from "https://deno.land/std@0.170.0/http/server.ts";
import { Stripe } from "https://esm.sh/stripe@13.6.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.47.0";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
  apiVersion: "2023-10-16",
});

// Create a Supabase client with service role key
const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Missing required environment variables");
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

serve(async (req) => {
  const signature = req.headers.get("stripe-signature");
  
  if (!signature) {
    console.error("Missing Stripe signature");
    return new Response(JSON.stringify({ error: "Missing signature" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
  
  try {
    // Get the raw request body
    const body = await req.text();
    
    // Verify and construct the webhook event
    const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET") || "";
    
    if (!webhookSecret) {
      console.error("Missing webhook secret");
      return new Response(JSON.stringify({ error: "Configuration error" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
    
    let event;
    
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error(`Webhook signature verification failed: ${err.message}`);
      return new Response(JSON.stringify({ error: `Webhook Error: ${err.message}` }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
    
    // Handle the event
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      
      // Extract user ID and plan ID from metadata
      const userId = session.metadata?.userId;
      const planId = session.metadata?.planId;
      
      if (!userId || !planId) {
        console.error("Missing userId or planId in session metadata");
        return new Response(JSON.stringify({ error: "Missing required metadata" }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }
      
      console.log(`Updating plan for user ${userId} to ${planId}`);
      
      // Update the user's plan in the database using direct query instead of RPC
      const { error } = await supabase
        .from('profiles')
        .upsert({ 
          id: userId, 
          plan: planId,
          created_at: new Date().toISOString()
        }, { 
          onConflict: 'id' 
        });
      
      if (error) {
        console.error('Error updating user plan:', error);
        return new Response(JSON.stringify({ error: 'Failed to update user plan' }), {
          status: 500,
          headers: { "Content-Type": "application/json" },
        });
      }
      
      console.log(`Successfully updated plan for user ${userId} to ${planId}`);
    }
    
    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
    
  } catch (error) {
    console.error('Error processing webhook:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});
