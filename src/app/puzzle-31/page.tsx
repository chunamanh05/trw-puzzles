"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, QrCode, Link as LinkIcon, Download, Sparkles, Loader2, ServerCog } from "lucide-react";
import Link from "next/link";

export default function PythonMicroservicePage() {
  const [url, setUrl] = useState("");
  const [qrImage, setQrImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateQRCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    setIsLoading(true);
    setError(null);

    try {
      // Call our Next.js API route which in turn executes the Python script
      const res = await fetch('/api/puzzle-31', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ link: url })
      });

      const data = await res.json();

      if (data.success) {
        setQrImage(data.image);
      } else {
        setError(data.error || "Failed to connect to Python microservice");
      }
    } catch (err) {
      setError("Network error. Make sure the server is running.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (!qrImage) return;
    const a = document.createElement("a");
    a.href = qrImage;
    a.download = `qr-${url.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <main className="min-h-screen bg-[#020617] text-white p-8 flex flex-col font-sans overflow-hidden relative">
      
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-teal-600/10 rounded-full blur-[100px]" />
      </div>

      {/* Header */}
      <div className="flex justify-between items-center z-10 mb-16 max-w-5xl mx-auto w-full">
        <Link href="/" className="flex items-center gap-2 text-slate-500 hover:text-emerald-400 transition-colors text-xs font-bold uppercase tracking-widest">
          <ChevronLeft size={14} /> Return to Hub
        </Link>
        <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em] rounded-full">
          <ServerCog size={12} /> Python Backend Active
        </div>
      </div>

      <div className="max-w-5xl mx-auto w-full z-10 flex flex-col lg:flex-row items-center gap-16 flex-1">
        
        {/* Left Side: Input Form */}
        <div className="flex-1 w-full text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-6">
              Instant <br/> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">Node Linking.</span>
            </h1>
            <p className="text-slate-400 text-lg mb-10 max-w-md mx-auto lg:mx-0">
              Transform any URL into a high-fidelity, scannable matrix. Powered by an internal Python microservice architecture.
            </p>

            <form onSubmit={generateQRCode} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto lg:mx-0">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <LinkIcon size={18} className="text-slate-500" />
                </div>
                <input
                  type="url"
                  placeholder="https://your-link.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  required
                  className="w-full bg-slate-900/50 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all"
                />
              </div>
              <button 
                type="submit" 
                disabled={isLoading}
                className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl transition-all shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Sparkles size={18} />}
                Generate
              </button>
            </form>
            
            {error && (
              <p className="text-red-400 text-sm mt-4 font-bold bg-red-500/10 px-4 py-2 rounded-lg border border-red-500/20 max-w-md">
                {error}
              </p>
            )}
          </motion.div>
        </div>

        {/* Right Side: QR Output Display */}
        <div className="flex-1 w-full flex justify-center lg:justify-end perspective-1000">
          <motion.div
            className="w-[320px] h-[400px] bg-[#0a0a0a] rounded-[2.5rem] border border-white/10 shadow-2xl flex flex-col p-6 relative overflow-hidden"
            initial={{ opacity: 0, rotateY: 30, scale: 0.9 }}
            animate={{ opacity: 1, rotateY: 0, scale: 1 }}
            transition={{ duration: 1, type: "spring" }}
          >
            {/* Glossy Header */}
            <div className="flex justify-between items-center mb-6">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Output Matrix</span>
              <QrCode size={16} className="text-emerald-500" />
            </div>

            {/* QR Image Area */}
            <div className="flex-1 bg-white/5 rounded-2xl border border-white/5 flex items-center justify-center relative overflow-hidden">
              <AnimatePresence mode="wait">
                {qrImage ? (
                  <motion.div
                    key="qr"
                    initial={{ scale: 0.8, opacity: 0, filter: "blur(10px)" }}
                    animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ type: "spring", damping: 20 }}
                    className="p-4 bg-white rounded-xl shadow-inner w-48 h-48"
                  >
                    <img src={qrImage} alt="Generated QR Code" className="w-full h-full object-contain" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-slate-600 text-xs font-mono uppercase tracking-widest text-center px-8"
                  >
                    Awaiting Link Input...
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer Action */}
            <div className="mt-6">
              <button 
                onClick={handleDownload}
                disabled={!qrImage}
                className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 disabled:opacity-30 disabled:hover:bg-white/5 disabled:cursor-not-allowed text-emerald-400"
              >
                <Download size={14} /> Download PNG
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
