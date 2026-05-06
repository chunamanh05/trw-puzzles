"use client";

import { useEffect, useState } from "react";
import { getPosts, deletePost, BlogPost } from "../api-client";
import { 
  Plus, 
  Trash2, 
  ExternalLink, 
  LayoutDashboard, 
  FileText, 
  LogOut, 
  ChevronLeft,
  Loader2
} from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
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
      console.error("Failed to fetch posts:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    try {
      await deletePost(id);
      setPosts(posts.filter(p => p.id !== id));
    } catch (err) {
      alert("Failed to delete post");
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex font-sans">
      
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col p-6 hidden lg:flex">
        <div className="mb-10">
          <h1 className="text-xl font-black text-slate-800">Admin Panel</h1>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">trw-puzzles blog</p>
        </div>

        <nav className="space-y-1 flex-1">
          <Link href="/puzzle-44/admin" className="flex items-center gap-3 px-4 py-3 bg-slate-100 text-slate-900 rounded-xl font-bold text-sm transition-all">
            <LayoutDashboard size={18} /> Dashboard
          </Link>
          <Link href="/puzzle-44" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-50 rounded-xl font-bold text-sm transition-all">
            <FileText size={18} /> See the Website
          </Link>
        </nav>

        <button className="flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl font-bold text-sm transition-all mt-auto">
          <LogOut size={18} /> Disconnection
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          <header className="flex items-center justify-between mb-12">
            <div>
              <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-800 transition-colors text-xs font-bold uppercase tracking-widest mb-4">
                <ChevronLeft size={14} /> Back to Hub
              </Link>
              <h2 className="text-3xl font-black text-slate-900">Blog Articles</h2>
            </div>
            
            <Link href="/puzzle-44/admin/new" className="flex items-center gap-2 bg-[#9c7b5d] hover:bg-[#85684e] text-white px-6 py-3 rounded-full font-bold text-sm shadow-lg shadow-[#9c7b5d]/20 transition-all">
              <Plus size={18} /> New Article
            </Link>
          </header>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-32 text-slate-400 gap-4">
              <Loader2 className="animate-spin" size={40} />
              <p className="font-bold text-sm uppercase tracking-widest">Loading articles...</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="bg-white border-2 border-dashed border-slate-200 rounded-3xl p-20 text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText className="text-slate-400" size={32} />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-2">No articles yet</h3>
              <p className="text-slate-500 text-sm mb-8">Create your first blog post to see it here.</p>
              <Link href="/puzzle-44/admin/new" className="text-[#9c7b5d] font-bold text-sm hover:underline">
                Start writing now
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <div key={post.id} className="bg-white rounded-3xl border border-slate-200 overflow-hidden group hover:shadow-xl hover:shadow-slate-200/50 transition-all">
                  <div className="aspect-video relative overflow-hidden bg-slate-100">
                    {post.image_url ? (
                      <img src={post.image_url} alt={post.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-slate-300">
                        <FileText size={48} />
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        {new Date(post.created_at!).toLocaleDateString()}
                      </span>
                      <div className="flex items-center gap-2">
                        <Link href={`/puzzle-44/${post.slug}`} target="_blank" className="p-2 text-slate-400 hover:text-blue-500 transition-colors">
                          <ExternalLink size={16} />
                        </Link>
                        <button onClick={() => handleDelete(post.id!)} className="p-2 text-slate-400 hover:text-red-500 transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                    <h4 className="text-lg font-black text-slate-900 leading-tight mb-4 group-hover:text-[#9c7b5d] transition-colors">{post.title}</h4>
                    <p className="text-slate-500 text-sm line-clamp-2 leading-relaxed mb-6">
                      {post.content.replace(/<[^>]*>?/gm, '')}
                    </p>
                    <Link href={`/puzzle-44/${post.slug}`} target="_blank" className="text-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-2 group-hover:gap-3 transition-all">
                      Read the article <Plus size={14} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
