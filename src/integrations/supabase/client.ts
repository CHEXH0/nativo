// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://trdkzlndbvtsyihiphsa.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRyZGt6bG5kYnZ0c3lpaGlwaHNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcxNTc5ODgsImV4cCI6MjA1MjczMzk4OH0.-QnJyQSAVgoJB99DhtmiANu1C8J1ssRWbllRtwcyL-o";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);