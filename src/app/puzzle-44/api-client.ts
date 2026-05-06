"use client";

// Note: In a real app, these should be Server Actions ("use server").
// But to ensure compatibility with your current setup and for rapid testing, 
// I'll implement these as client-side handlers using the Supabase client.
// In the future, we can move these to a separate actions.ts file with "use server".

import { supabase } from "@/lib/supabase";

export interface BlogPost {
  id?: string;
  title: string;
  slug: string;
  content: string;
  image_url: string;
  created_at?: string;
}

export const getPosts = async () => {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data as BlogPost[];
};

export const getPostBySlug = async (slug: string) => {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .single();
  
  if (error) throw error;
  return data as BlogPost;
};

export const createPost = async (post: BlogPost) => {
  const { data, error } = await supabase
    .from('posts')
    .insert([post])
    .select();
  
  if (error) throw error;
  return data;
};

export const deletePost = async (id: string) => {
  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
};
