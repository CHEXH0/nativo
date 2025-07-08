-- Create content table for videos and other content
CREATE TABLE public.content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  video_url TEXT,
  thumbnail_url TEXT,
  content_type TEXT NOT NULL DEFAULT 'video',
  category TEXT,
  is_premium BOOLEAN NOT NULL DEFAULT false,
  required_plan TEXT DEFAULT 'none',
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

-- Create policy for admins to manage content
CREATE POLICY "Admins can manage content" ON public.content
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);

-- Add admin policy to user_roles table
CREATE POLICY "Admins can manage roles" ON public.user_roles
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);

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

-- Insert sample content
INSERT INTO public.content (title, description, video_url, category, required_plan, duration_minutes, sort_order) VALUES
('Introducción a NATIVO', 'Video de bienvenida a nuestra plataforma de bienestar holístico', 'https://player.vimeo.com/video/1091659873', 'introduccion', 'none', 5, 1),
('Meditación Básica', 'Aprende los fundamentos de la meditación mindfulness', 'https://example.com/meditation-basic', 'meditacion', 'basico', 15, 2),
('Sesión de Bienestar GOLD', 'Contenido exclusivo para miembros GOLD', 'https://example.com/wellness-gold', 'bienestar', 'gold', 30, 3),
('Masterclass VIP', 'Sesión personalizada para miembros VIP', 'https://example.com/masterclass-vip', 'masterclass', 'vip', 60, 4);