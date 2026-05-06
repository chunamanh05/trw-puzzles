"use client";

import { useState } from "react";
import { createPost } from "../../api-client";
import { 
  ChevronLeft, 
  Save, 
  Image as ImageIcon, 
  Type, 
  FileText,
  Link as LinkIcon,
  Loader2,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NewArticle() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [imageUrl, setImageUrl] = useState("https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80");
  const [content, setContent] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    try {
      await createPost({
        title,
        slug,
        image_url: imageUrl,
        content
      });
      setSuccess(true);
      setTimeout(() => router.push("/puzzle-44/admin"), 1500);
    } catch (err: any) {
      console.error("Supabase Error:", err);
      // Hiển thị lỗi chi tiết để debug
      setErrorMsg(err.message || "Unknown error occurred. Check browser console (F12).");
    } finally {
      setLoading(false);
    }
  };

  const removeVietnameseTones = (str: string) => {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    str = str.replace(/[^a-zA-Z0-9 ]/g, "");
    return str;
  };

  const handleTitleUpdate = (val: string) => {
    setTitle(val);
    const noTones = removeVietnameseTones(val);
    const generatedSlug = noTones.toLowerCase()
      .trim()
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
    setSlug(generatedSlug);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] p-6 lg:p-12 font-sans">
      <div className="max-w-4xl mx-auto">
        
        <header className="flex items-center justify-between mb-10">
          <div>
            <Link href="/puzzle-44/admin" className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-800 transition-colors text-xs font-bold uppercase tracking-widest mb-4">
              <ChevronLeft size={14} /> Back to articles
            </Link>
            <h2 className="text-3xl font-black text-slate-900">New Article</h2>
          </div>
        </header>

        {errorMsg && (
          <div className="mb-8 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-start gap-3 text-red-600 animate-in fade-in slide-in-from-top-2">
            <AlertCircle className="shrink-0 mt-0.5" size={18} />
            <div>
              <p className="font-bold text-sm">Submission Failed</p>
              <p className="text-xs opacity-80">{errorMsg}</p>
            </div>
          </div>
        )}

        {success ? (
          <div className="bg-white border border-slate-200 rounded-3xl p-20 text-center flex flex-col items-center animate-in fade-in zoom-in duration-500">
            <div className="w-20 h-20 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 size={48} />
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-2">Successfully Created!</h3>
            <p className="text-slate-500">Redirecting you back to the dashboard...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="bg-white rounded-3xl border border-slate-200 p-8 lg:p-10 shadow-sm">
              <div className="space-y-8">
                
                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
                    <Type size={14} /> Title
                  </label>
                  <input 
                    required
                    type="text" 
                    value={title}
                    onChange={(e) => handleTitleUpdate(e.target.value)}
                    placeholder="Nhập tiêu đề tiếng Việt..."
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#9c7b5d]/10 focus:border-[#9c7b5d] transition-all text-lg font-bold text-slate-900"
                  />
                </div>

                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
                    <LinkIcon size={14} /> URL slug
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 font-medium ml-1">/blog/</span>
                    <input 
                      required
                      type="text" 
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      placeholder="url-slug-here"
                      className="flex-1 px-6 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-[#9c7b5d] transition-all text-sm font-medium text-slate-900"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
                    <ImageIcon size={14} /> Wallpaper URL
                  </label>
                  <input 
                    type="text" 
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="w-full px-6 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-[#9c7b5d] transition-all text-sm font-medium text-slate-900 mb-4"
                  />
                  <div className="aspect-[21/9] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 relative group">
                    <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                </div>

                <div className="space-y-3 pt-4">
                  <label className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
                    <FileText size={14} /> Content
                  </label>
                  <div className="border border-slate-200 rounded-3xl overflow-hidden focus-within:ring-4 focus-within:ring-[#9c7b5d]/10 focus-within:border-[#9c7b5d] transition-all">
                    <textarea 
                      required
                      rows={12}
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="Nội dung bài viết của bạn..."
                      className="w-full px-8 py-6 focus:outline-none text-slate-700 leading-relaxed font-medium"
                    />
                  </div>
                </div>

              </div>
            </div>

            <div className="flex justify-end">
              <button 
                disabled={loading}
                className="flex items-center gap-3 bg-slate-900 hover:bg-black text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs shadow-2xl disabled:opacity-50 transition-all"
              >
                {loading ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
                {loading ? "Saving..." : "Create Post"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
