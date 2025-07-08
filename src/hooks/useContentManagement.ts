import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ContentItem {
  id: string;
  title: string;
  description: string | null;
  video_url: string | null;
  thumbnail_url: string | null;
  content_type: string;
  category: string | null;
  is_premium: boolean;
  required_plan: string;
  duration_minutes: number | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface NewContentItem {
  title: string;
  description?: string;
  video_url?: string;
  thumbnail_url?: string;
  content_type?: string;
  category?: string;
  is_premium?: boolean;
  required_plan?: string;
  duration_minutes?: number;
  sort_order?: number;
  is_active?: boolean;
}

export const useContentManagement = () => {
  const [content, setContent] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const { toast } = useToast();

  const checkAdminRole = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return false;

      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .eq('role', 'admin')
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error checking admin role:', error);
        return false;
      }

      const hasAdminRole = !!data;
      setIsAdmin(hasAdminRole);
      return hasAdminRole;
    } catch (error) {
      console.error('Error checking admin role:', error);
      return false;
    }
  };

  const fetchContent = async () => {
    try {
      setLoading(true);
      const isUserAdmin = await checkAdminRole();
      
      let query = supabase
        .from('content')
        .select('*')
        .order('sort_order', { ascending: true });

      // If not admin, only show active content
      if (!isUserAdmin) {
        query = query.eq('is_active', true);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching content:', error);
        toast({
          title: "Error",
          description: "Failed to load content",
          variant: "destructive",
        });
        return;
      }

      setContent(data || []);
    } catch (error) {
      console.error('Error fetching content:', error);
    } finally {
      setLoading(false);
    }
  };

  const addContent = async (newContent: NewContentItem) => {
    try {
      const { data, error } = await supabase
        .from('content')
        .insert([newContent])
        .select()
        .single();

      if (error) {
        console.error('Error adding content:', error);
        toast({
          title: "Error",
          description: "Failed to add content",
          variant: "destructive",
        });
        return false;
      }

      setContent(prev => [...prev, data]);
      toast({
        title: "Success",
        description: "Content added successfully",
      });
      return true;
    } catch (error) {
      console.error('Error adding content:', error);
      return false;
    }
  };

  const updateContent = async (id: string, updates: Partial<ContentItem>) => {
    try {
      const { data, error } = await supabase
        .from('content')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating content:', error);
        toast({
          title: "Error",
          description: "Failed to update content",
          variant: "destructive",
        });
        return false;
      }

      setContent(prev => prev.map(item => item.id === id ? data : item));
      toast({
        title: "Success",
        description: "Content updated successfully",
      });
      return true;
    } catch (error) {
      console.error('Error updating content:', error);
      return false;
    }
  };

  const deleteContent = async (id: string) => {
    try {
      const { error } = await supabase
        .from('content')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting content:', error);
        toast({
          title: "Error",
          description: "Failed to delete content",
          variant: "destructive",
        });
        return false;
      }

      setContent(prev => prev.filter(item => item.id !== id));
      toast({
        title: "Success",
        description: "Content deleted successfully",
      });
      return true;
    } catch (error) {
      console.error('Error deleting content:', error);
      return false;
    }
  };

  const toggleContentStatus = async (id: string, is_active: boolean) => {
    return updateContent(id, { is_active });
  };

  useEffect(() => {
    fetchContent();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        fetchContent();
      } else if (event === 'SIGNED_OUT') {
        setContent([]);
        setIsAdmin(false);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return {
    content,
    loading,
    isAdmin,
    fetchContent,
    addContent,
    updateContent,
    deleteContent,
    toggleContentStatus,
  };
};