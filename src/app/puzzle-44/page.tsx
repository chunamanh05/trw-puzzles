"use client";

import { useEffect, useState } from "react";
import { getPosts, BlogPost } from "./api-client";
import { 
  ChevronLeft, 
  ArrowRight, 
  Calendar, 
  User, 
  FileText,
  Loader2,
  Settings
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function BlogList() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const data = await getPosts();
      setPosts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white text-slate-900 font-sans">
      
      {/* Navigation Header */}
      <header className="px-6 py-8 border-b border-slate-100 sticky top-0 bg-white/80 backdrop-blur-md z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-colors text-xs font-black uppercase tracking-widest">
            <ChevronLeft size={16} /> Hub
          </Link>
          
          <nav className="hidden md:flex items-center gap-8 text-xs font-black uppercase tracking-widest text-slate-500">
            <Link href="#" className="hover:text-slate-900 transition-colors">Services</Link>
            <Link href="#" className="hover:text-slate-900 transition-colors">Contact</Link>
            <Link href="/puzzle-44" className="text-slate-900 border-b-2 border-[#9c7b5d] pb-1">News</Link>
          </nav>

          <Link href="/puzzle-44/admin" className="flex items-center gap-2 bg-slate-900 text-white px-5 py-3 rounded-full text-xs font-black uppercase tracking-widest hover:bg-black transition-all">
            <Settings size={14} /> Admin
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto px-6"
        >
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 text-slate-900">
            Our <span className="text-[#9c7b5d]">blog</span>
          </h1>
          <div className="w-20 h-1 bg-[#9c7b5d] mx-auto rounded-full" />
        </motion.div>
      </section>

      {/* Blog Grid */}
      <section className="max-w-6xl mx-auto px-6 pb-32">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 text-slate-400 gap-4">
            <Loader2 className="animate-spin text-[#9c7b5d]" size={48} />
            <p className="font-bold text-sm uppercase tracking-widest">Fetching latest news...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-32 bg-slate-50 rounded-[3rem] border border-slate-100">
            <h3 className="text-2xl font-black text-slate-900 mb-4">No stories published yet.</h3>
            <p className="text-slate-500 mb-8">Check back later or visit the admin panel to add one.</p>
            <Link href="/puzzle-44/admin/new" className="inline-flex items-center gap-2 bg-[#9c7b5d] text-white px-8 py-4 rounded-full font-black uppercase tracking-widest text-xs hover:bg-[#85684e] transition-all">
              Create a Post
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {posts.map((post, idx) => (
              <motion.article 
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group cursor-pointer"
              >
                <Link href={`/puzzle-44/${post.slug}`}>
                  <div className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden mb-6 bg-slate-100 border border-slate-100 shadow-xl shadow-slate-200/50 group-hover:shadow-2xl group-hover:shadow-[#9c7b5d]/20 transition-all duration-500">
                    {post.image_url && (
                      <img 
                        src={post.image_url} 
                        alt={post.title} 
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    )}
                    <div className="absolute bottom-6 left-6 flex items-center gap-2 px-4 py-2 bg-black/60 backdrop-blur-md rounded-full text-[10px] font-black text-white uppercase tracking-widest">
                      <Calendar size={12} className="text-[#9c7b5d]" />
                      {new Date(post.created_at!).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </div>
                  </div>
                  
                  <div className="px-4">
                    <h3 className="text-2xl font-black text-slate-900 leading-tight mb-4 group-hover:text-[#9c7b5d] transition-colors duration-300">
                      {post.title}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 mb-6 font-medium">
                      {post.content.replace(/<[^>]*>?/gm, '')}
                    </p>
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-900 group-hover:gap-4 transition-all duration-300">
                      Read the article <ArrowRight size={14} className="text-[#9c7b5d]" />
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        )}
      </section>

      {/* Footer Decoration */}
      <footer className="py-20 bg-slate-50 border-t border-slate-100 text-center">
        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">© 2026 TRW Puzzles Blog. Dynamic Content Powered by Supabase.</p>
      </footer>
    </main>
  );
}
