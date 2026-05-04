"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, QrCode, Link as LinkIcon, Download, Sparkles, Loader2, ServerCog, Upload, X } from "lucide-react";
import Link from "next/link";

export default function PythonMicroservicePage() {
  const [url, setUrl] = useState("");
  const [logoBase64, setLogoBase64] = useState<string | null>(null);
  const [qrImage, setQrImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Xử lý đọc file ảnh Logo và chuyển sang Base64
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // Giới hạn 2MB cho logo
        setError("Logo file is too large. Please use an image under 2MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoBase64(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateQRCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/puzzle-31', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          link: url, 
          logo: logoBase64 
        })
      });

      const data = await res.json();

      if (data.success) {
        setQrImage(data.image);
      } else {
        setError(data.error || "Failed to generate QR code");
      }
    } catch (err) {
      setError("Network error. Please check your connection.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (!qrImage) return;
    const a = document.createElement("a");
    a.href = qrImage;
    a.download = `custom-qr-${Date.now()}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <main className="min-h-screen bg-[#020617] text-white p-8 flex flex-col font-sans overflow-hidden relative">
      
      {/* Decor */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-emerald-600/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[100px]" />
      </div>

      <div className="flex justify-between items-center z-10 mb-12 max-w-5xl mx-auto w-full">
        <Link href="/" className="flex items-center gap-2 text-slate-500 hover:text-emerald-400 transition-colors text-xs font-bold uppercase tracking-widest">
          <ChevronLeft size={14} /> Return to Hub
        </Link>
        <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em] rounded-full">
          <ServerCog size={12} /> Python Microservice Engine
        </div>
      </div>

      <div className="max-w-5xl mx-auto w-full z-10 flex flex-col lg:flex-row items-start gap-16 flex-1">
        
        {/* Input Form */}
        <div className="flex-1 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter leading-none mb-6">
              Designer <br/> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">QR Matrix.</span>
            </h1>
            <p className="text-slate-400 mb-8 max-w-md">
              Mã QR thế hệ mới với các chấm bo tròn và khả năng chèn Logo thương hiệu trực tiếp vào trung tâm mã.
            </p>

            <form onSubmit={generateQRCode} className="space-y-6 max-w-md">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Destination URL</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <LinkIcon size={18} className="text-slate-500" />
                  </div>
                  <input
                    type="text"
                    placeholder="Dán link hoặc mã VietQR..."
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    required
                    className="w-full bg-slate-900/50 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-emerald-500/50 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Brand Logo (Optional)</label>
                <div className="flex gap-4">
                  <button 
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex-1 flex items-center justify-center gap-2 py-4 bg-white/5 border border-white/10 rounded-2xl border-dashed hover:bg-white/10 transition-all text-xs font-bold text-slate-400"
                  >
                    <Upload size={16} /> {logoBase64 ? "Change Logo" : "Upload Logo"}
                  </button>
                  {logoBase64 && (
                    <div className="relative w-14 h-14 bg-white rounded-xl p-1 shrink-0">
                      <img src={logoBase64} className="w-full h-full object-contain" alt="Logo preview" />
                      <button 
                        type="button"
                        onClick={() => setLogoBase64(null)}
                        className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1 shadow-lg"
                      >
                        <X size={10} />
                      </button>
                    </div>
                  )}
                </div>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleLogoUpload} 
                  className="hidden" 
                  accept="image/*"
                />
              </div>

              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl transition-all shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Sparkles size={18} />}
                Generate Designer QR
              </button>
            </form>
            
            {error && (
              <p className="text-red-400 text-sm mt-4 font-bold bg-red-500/10 px-4 py-2 rounded-lg border border-red-500/20 max-w-md">
                {error}
              </p>
            )}
          </motion.div>
        </div>

        {/* QR Output */}
        <div className="flex-1 w-full flex justify-center lg:justify-end">
          <motion.div
            className="w-full max-w-[360px] aspect-[3/4] bg-[#0a0a0a] rounded-[3rem] border border-white/10 shadow-2xl flex flex-col p-8 relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="flex justify-between items-center mb-8">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Output Preview</span>
              <QrCode size={18} className="text-emerald-500" />
            </div>

            <div className="flex-1 bg-white/5 rounded-3xl border border-white/5 flex items-center justify-center relative">
              <AnimatePresence mode="wait">
                {qrImage ? (
                  <motion.div
                    key="qr"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="p-6 bg-white rounded-3xl shadow-2xl w-56 h-56"
                  >
                    <img src={qrImage} alt="QR Code" className="w-full h-full object-contain" />
                  </motion.div>
                ) : (
                  <div className="text-slate-600 text-[10px] font-black uppercase tracking-[0.3em] text-center px-8">
                    Waiting for input...
                  </div>
                )}
              </AnimatePresence>
            </div>

            <button 
              onClick={handleDownload}
              disabled={!qrImage}
              className="mt-8 w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 disabled:opacity-30 text-emerald-400"
            >
              <Download size={14} /> Download PNG
            </button>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
