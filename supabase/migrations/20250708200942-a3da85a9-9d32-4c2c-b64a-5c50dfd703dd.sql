-- Create content table for videos and other content
CREATE TABLE public.content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  video_url TEXT,
  thumbnail_url TEXT,
  content_type TEXT NOT NULL DEFAULT 'video', -- video, document, audio, etc.
  category TEXT, -- meditation, wellness, courses, etc.
  is_premium BOOLEAN NOT NULL DEFAULT false,
  required_plan TEXT DEFAULT 'none', -- none, basico, gold, vip
  duration_minutes INTEGER,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.content ENABLE ROW LEVEL SECURITY;

-- Create policy for all users to view active content
CREATE POLICY "All users can view active content" ON public.content
FOR SELECT
USING (is_active = true);

-- Create policy for admins to manage content (we'll use a user_roles system)
CREATE POLICY "Admins can manage content" ON public.content
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);

-- Create user_roles table for admin access
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Policy for users to see their own roles
CREATE POLICY "Users can view their own roles" ON public.user_roles
FOR SELECT
USING (user_id = auth.uid());

-- Policy for admins to manage roles
CREATE POLICY "Admins can manage roles" ON public.user_roles
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);

-- Create function to check if user has a specific role
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role text)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
NEW.updated_at = now();
RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_content_updated_at
BEFORE UPDATE ON public.content
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert some sample content
INSERT INTO public.content (title, description, video_url, category, required_plan, duration_minutes, sort_order) VALUES
('Introducción a NATIVO', 'Video de bienvenida a nuestra plataforma de bienestar holístico', 'https://player.vimeo.com/video/1091659873', 'introduccion', 'none', 5, 1),
('Meditación Básica', 'Aprende los fundamentos de la meditación mindfulness', 'https://example.com/meditation-basic', 'meditacion', 'basico', 15, 2),
('Sesión de Bienestar GOLD', 'Contenido exclusivo para miembros GOLD', 'https://example.com/wellness-gold', 'bienestar', 'gold', 30, 3),
('Masterclass VIP', 'Sesión personalizada para miembros VIP', 'https://example.com/masterclass-vip', 'masterclass', 'vip', 60, 4);