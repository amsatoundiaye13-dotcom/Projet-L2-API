import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Event {
  id: string;
  title: string;
  description: string;
  event_date: string;
  event_time: string;
  location: string;
  category: string;
  image_url?: string;
  created_at: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  category: string;
  cover_image_url?: string;
  download_url: string;
  created_at: string;
}

export interface Favorite {
  id: string;
  event_id: string;
  user_session_id: string;
  created_at: string;
}
