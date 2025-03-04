
import { serve } from "https://deno.land/std@0.170.0/http/server.ts";
import { Stripe } from "https://esm.sh/stripe@13.6.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.47.0";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
  apiVersion: "2023-10-16",
});

// Create a Supabase client
const supabaseUrl = Deno.env.get("SUPABASE_URL") || "https://trdkzlndbvtsyihiphsa.supabase.co";
const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
const supabase = createClient(supabaseUrl, supabaseKey);

serve(async (req) => {
  const signature = req.headers.get("stripe-signature");
  
  if (!signature) {
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
      
      if (userId && planId) {
        // Update the user's plan in the database
        const { error: planError } = await supabase.rpc('update_user_plan', {
          user_id: userId,
          new_plan: planId
        });
        
        if (planError) {
          console.error('Error updating user plan:', planError);
        } else {
          console.log(`Successfully updated plan for user ${userId} to ${planId}`);
        }
        
        // Store payment information in the Subscriptions table (note the capital S)
        const { error: paymentError } = await supabase
          .from('Subscriptions')
          .insert({
            id: session.id,
            user_id: userId,
            amount: session.amount_total,
            currency: session.currency,
            status: session.status,
            created: new Date(session.created * 1000).toISOString(),
            description: `Suscripción Plan ${planId.charAt(0).toUpperCase() + planId.slice(1)}`,
          });
          
        if (paymentError) {
          console.error('Error storing payment record:', paymentError);
        } else {
          console.log(`Successfully stored payment record for session ${session.id}`);
        }
      }
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
