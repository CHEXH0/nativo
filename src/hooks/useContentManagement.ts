import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { ContentItem, NewContentItem } from '@/types/content';
import { ContentService } from '@/services/contentService';

export const useContentManagement = () => {
  const [content, setContent] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const { toast } = useToast();

  const fetchContent = async () => {
    try {
      setLoading(true);
      const isUserAdmin = await ContentService.checkAdminRole();
      setIsAdmin(isUserAdmin);
      
      const data = await ContentService.fetchContent(isUserAdmin);
      setContent(data);
    } catch (error) {
      console.error('Error fetching content:', error);
      toast({
        title: "Error",
        description: "Failed to load content",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addContent = async (newContent: NewContentItem) => {
    try {
      const data = await ContentService.addContent(newContent, content);
      setContent(prev => [...prev, data]);
      toast({
        title: "Success",
        description: "Content added successfully",
      });
      return true;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add content",
        variant: "destructive",
      });
      return false;
    }
  };

  const updateContent = async (id: string, updates: Partial<ContentItem>) => {
    try {
      const data = await ContentService.updateContent(id, updates, content);
      setContent(prev => prev.map(item => item.id === id ? data : item));
      toast({
        title: "Success",
        description: "Content updated successfully",
      });
      return true;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update content",
        variant: "destructive",
      });
      return false;
    }
  };

  const deleteContent = async (id: string) => {
    try {
      await ContentService.deleteContent(id);
      setContent(prev => prev.filter(item => item.id !== id));
      toast({
        title: "Success",
        description: "Content deleted successfully",
      });
      return true;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete content",
        variant: "destructive",
      });
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