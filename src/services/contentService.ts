import { supabase } from '@/integrations/supabase/client';
import { ContentItem, NewContentItem } from '@/types/content';

export class ContentService {
  static async checkAdminRole(): Promise<boolean> {
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

      return !!data;
    } catch (error) {
      console.error('Error checking admin role:', error);
      return false;
    }
  }

  static async fetchContent(isAdmin: boolean): Promise<ContentItem[]> {
    let query = supabase
      .from('content')
      .select('*')
      .order('sort_order', { ascending: true });

    // If not admin, only show active content
    if (!isAdmin) {
      query = query.eq('is_active', true);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching content:', error);
      throw new Error('Failed to load content');
    }

    return data || [];
  }

  static async handleOrderSwap(
    currentId: string | null, 
    newOrder: number, 
    content: ContentItem[]
  ): Promise<void> {
    try {
      // Find if there's already content with this sort_order
      const existingContent = content.find(item => 
        item.sort_order === newOrder && item.id !== currentId
      );

      if (existingContent && currentId) {
        // Get the current item's sort_order
        const currentContent = content.find(item => item.id === currentId);
        if (currentContent) {
          // Swap the orders
          await supabase
            .from('content')
            .update({ sort_order: currentContent.sort_order })
            .eq('id', existingContent.id);
        }
      }
    } catch (error) {
      console.error('Error swapping content order:', error);
    }
  }

  static async addContent(newContent: NewContentItem, content: ContentItem[]): Promise<ContentItem> {
    // Check if sort_order already exists and swap if needed
    if (newContent.sort_order !== undefined) {
      await this.handleOrderSwap(null, newContent.sort_order, content);
    }

    const { data, error } = await supabase
      .from('content')
      .insert([newContent])
      .select()
      .single();

    if (error) {
      console.error('Error adding content:', error);
      throw new Error('Failed to add content');
    }

    return data;
  }

  static async updateContent(
    id: string, 
    updates: Partial<ContentItem>, 
    content: ContentItem[]
  ): Promise<ContentItem> {
    // Check if sort_order is being updated and swap if needed
    if (updates.sort_order !== undefined) {
      await this.handleOrderSwap(id, updates.sort_order, content);
    }

    const { data, error } = await supabase
      .from('content')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating content:', error);
      throw new Error('Failed to update content');
    }

    return data;
  }

  static async deleteContent(id: string): Promise<void> {
    const { error } = await supabase
      .from('content')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting content:', error);
      throw new Error('Failed to delete content');
    }
  }
}