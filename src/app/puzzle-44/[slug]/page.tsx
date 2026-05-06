import { supabase } from "@/lib/supabase";
import { ChevronLeft, Calendar, Clock, Share2 } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

// Enable ISR: Revalidate every 60 seconds
export const revalidate = 60;

async function getPost(slug: string) {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .single();
  
  if (error || !data) return null;
  return data;
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="min-h-screen bg-white text-slate-900 font-sans pb-32">
      
      {/* Top Navigation */}
      <nav className="max-w-4xl mx-auto px-6 py-10 flex items-center justify-between">
        <Link href="/puzzle-44" className="flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-colors text-xs font-black uppercase tracking-widest">
          <ChevronLeft size={16} /> All Articles
        </Link>
        <button className="p-3 bg-slate-50 rounded-full text-slate-400 hover:text-slate-900 transition-colors">
          <Share2 size={18} />
        </button>
      </nav>

      {/* Hero Header */}
      <header className="max-w-4xl mx-auto px-6 mb-16 text-center">
        <div className="flex items-center justify-center gap-6 text-[10px] font-black uppercase tracking-[0.2em] text-[#9c7b5d] mb-6">
          <span className="flex items-center gap-2"><Calendar size={12} /> {new Date(post.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
          <span className="flex items-center gap-2"><Clock size={12} /> 5 MIN READ</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 leading-tight mb-12">
          {post.title}
        </h1>
        
        <div className="aspect-[21/9] rounded-[3rem] overflow-hidden shadow-2xl shadow-slate-200 border border-slate-100">
          {post.image_url && (
            <img src={post.image_url} alt={post.title} className="w-full h-full object-cover" />
          )}
        </div>
      </header>

      {/* Content Section */}
      <section className="max-w-2xl mx-auto px-6">
        <div className="prose prose-slate prose-lg max-w-none">
          {/* Simple paragraph splitting for basic content */}
          {post.content.split('\n').map((para: string, i: number) => (
            <p key={i} className="mb-6 text-slate-600 leading-relaxed font-medium text-lg">
              {para}
            </p>
          ))}
        </div>

        {/* Article Footer */}
        <div className="mt-20 pt-12 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#9c7b5d] rounded-full flex items-center justify-center text-white font-black">NA</div>
              <div>
                <p className="text-sm font-black text-slate-900">Nam Anh</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Lead Developer</p>
              </div>
            </div>
            
            <Link href="/puzzle-44" className="bg-slate-900 text-white px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest hover:bg-black transition-all">
              Back to News
            </Link>
          </div>
        </div>
      </section>

    </article>
  );
}
