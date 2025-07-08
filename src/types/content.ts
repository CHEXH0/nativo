export interface ContentItem {
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

export interface NewContentItem {
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