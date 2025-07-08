-- Fix the infinite recursion issue in user_roles policies
-- Drop the problematic policy first
DROP POLICY IF EXISTS "Admins can manage roles" ON public.user_roles;

-- Create a security definer function to check admin status without recursion
CREATE OR REPLACE FUNCTION public.is_admin(user_id uuid)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_roles.user_id = $1 AND role = 'admin'
  );
$$;

-- Create a new policy that doesn't cause recursion
CREATE POLICY "Service role can manage all roles" ON public.user_roles
FOR ALL
USING (current_setting('role') = 'service_role');

-- Allow users to insert their own roles (for initial admin setup)
CREATE POLICY "Users can insert roles for themselves" ON public.user_roles
FOR INSERT
WITH CHECK (user_id = auth.uid());

-- Grant admin permissions to the specified email addresses
-- First, let's get the user IDs for those email addresses
DO $$
DECLARE
    sergio_user_id uuid;
    nativo_user_id uuid;
BEGIN
    -- Get user ID for sergio.ramrz21@gmail.com
    SELECT id INTO sergio_user_id 
    FROM auth.users 
    WHERE email = 'sergio.ramrz21@gmail.com' 
    LIMIT 1;
    
    -- Get user ID for nativoholisticomedia@gmail.com
    SELECT id INTO nativo_user_id 
    FROM auth.users 
    WHERE email = 'nativoholisticomedia@gmail.com' 
    LIMIT 1;
    
    -- Insert admin roles if users exist
    IF sergio_user_id IS NOT NULL THEN
        INSERT INTO public.user_roles (user_id, role) 
        VALUES (sergio_user_id, 'admin')
        ON CONFLICT (user_id, role) DO NOTHING;
    END IF;
    
    IF nativo_user_id IS NOT NULL THEN
        INSERT INTO public.user_roles (user_id, role) 
        VALUES (nativo_user_id, 'admin')
        ON CONFLICT (user_id, role) DO NOTHING;
    END IF;
END $$;