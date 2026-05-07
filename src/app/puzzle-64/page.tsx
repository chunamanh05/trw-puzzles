"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Upload, 
  Image as ImageIcon, 
  Download, 
  ArrowRight, 
  Zap, 
  FileCheck,
  RefreshCw,
  ArrowLeft
} from "lucide-react";
import Link from "next/link";
import { cn } from "../../lib/utils";

export default function Puzzle64ImageOptimizer() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [optimizedUrl, setOptimizedUrl] = useState<string | null>(null);
  const [format, setFormat] = useState<"webp" | "avif">("webp");
  const [quality, setQuality] = useState(80);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [stats, setStats] = useState<{ original: number; optimized: number } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
      setOptimizedUrl(null);
      setStats(null);
    }
  };

  const handleOptimize = async () => {
    if (!file) return;
    setIsOptimizing(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("format", format);
    formData.append("quality", quality.toString());

    try {
      const response = await fetch("/api/optimize-image", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Optimization failed");

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setOptimizedUrl(url);

      const originalSize = parseInt(response.headers.get("X-Original-Size") || "0");
      const optimizedSize = parseInt(response.headers.get("X-Optimized-Size") || "0");
      setStats({ original: originalSize, optimized: optimizedSize });
    } catch (error) {
      console.error(error);
      alert("Lỗi khi tối ưu ảnh!");
    } finally {
      setIsOptimizing(false);
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans p-6 md:p-12">
      <nav className="max-w-6xl mx-auto mb-12">
        <Link href="/" className="text-white/40 hover:text-white transition-colors flex items-center gap-2 text-sm font-mono tracking-widest uppercase">
          <ArrowLeft size={14} /> Lobby
        </Link>
      </nav>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Settings Panel */}
        <div className="lg:col-span-4 space-y-8">
          <header>
            <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-400 mb-6 border border-emerald-500/20">
              <Zap size={24} />
            </div>
            <h1 className="text-4xl font-black tracking-tighter uppercase mb-2">Opti-Core</h1>
            <p className="text-white/40 text-sm">Next-gen Image Optimization targeting libwebp and AV1 codecs.</p>
          </header>

          <div className="bg-white/[0.03] border border-white/5 rounded-3xl p-8 space-y-8">
            {/* Format Selection */}
            <div className="space-y-4">
              <label className="text-[10px] font-mono tracking-widest text-white/30 uppercase">Target Codec</label>
              <div className="grid grid-cols-2 gap-2 p-1 bg-black/40 rounded-xl border border-white/5">
                {["webp", "avif"].map((f) => (
                  <button
                    key={f}
                    onClick={() => setFormat(f as any)}
                    className={cn(
                      "py-2 rounded-lg text-xs font-bold transition-all",
                      format === f ? "bg-white text-black" : "text-white/40 hover:text-white"
                    )}
                  >
                    {f.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Quality Slider */}
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <label className="text-[10px] font-mono tracking-widest text-white/30 uppercase">Compression Quality</label>
                <span className="text-emerald-400 font-bold">{quality}%</span>
              </div>
              <input 
                type="range" min="10" max="100" value={quality}
                onChange={(e) => setQuality(parseInt(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-emerald-500"
              />
            </div>

            <button
              onClick={handleOptimize}
              disabled={!file || isOptimizing}
              className="w-full bg-emerald-500 disabled:bg-white/5 disabled:text-white/20 text-black font-black py-4 rounded-xl transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
            >
              {isOptimizing ? <RefreshCw className="animate-spin" size={18} /> : <Zap size={18} fill="currentColor" />}
              {isOptimizing ? "OPTIMIZING..." : "PROCESS IMAGE"}
            </button>
          </div>
        </div>

        {/* Upload & Preview Area */}
        <div className="lg:col-span-8">
          <div 
            className={cn(
              "h-[600px] border-2 border-dashed rounded-[3rem] transition-all flex flex-col items-center justify-center relative overflow-hidden",
              file ? "border-white/10 bg-white/[0.02]" : "border-white/10 hover:border-emerald-500/50 hover:bg-emerald-500/[0.02] cursor-pointer"
            )}
            onClick={() => !file && fileInputRef.current?.click()}
          >
            <input 
              type="file" ref={fileInputRef} className="hidden" 
              accept="image/*" onChange={handleFileChange} 
            />

            <AnimatePresence mode="wait">
              {!file ? (
                <motion.div 
                  key="empty"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="text-center space-y-6"
                >
                  <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center text-white/20 mx-auto">
                    <Upload size={32} />
                  </div>
                  <div>
                    <p className="text-lg font-bold">Drop image here</p>
                    <p className="text-white/30 text-sm">PNG, JPG, HEIC up to 10MB</p>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="preview"
                  initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                  className="w-full h-full flex flex-col p-8"
                >
                  <div className="flex-1 grid grid-cols-2 gap-8 min-h-0">
                    {/* Original */}
                    <div className="space-y-4 flex flex-col">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-mono text-white/30 uppercase">Original</span>
                        {stats && <span className="text-xs text-white/60">{formatSize(stats.original)}</span>}
                      </div>
                      <div className="flex-1 bg-black rounded-2xl overflow-hidden border border-white/5 relative">
                        <img src={previewUrl!} alt="Preview" className="w-full h-full object-contain" />
                      </div>
                    </div>

                    {/* Optimized */}
                    <div className="space-y-4 flex flex-col">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-mono text-emerald-400 uppercase">Optimized ({format.toUpperCase()})</span>
                        {stats && (
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-emerald-400 font-bold">{formatSize(stats.optimized)}</span>
                            <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full">
                              -{Math.round((1 - stats.optimized / stats.original) * 100)}%
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="flex-1 bg-black rounded-2xl overflow-hidden border border-emerald-500/20 relative group">
                        {optimizedUrl ? (
                          <>
                            <img src={optimizedUrl} alt="Optimized" className="w-full h-full object-contain" />
                            <a 
                              href={optimizedUrl} download={`optimized.${format}`}
                              className="absolute inset-0 bg-emerald-500/80 flex items-center justify-center text-black font-black opacity-0 group-hover:opacity-100 transition-opacity gap-2"
                            >
                              <Download size={24} /> DOWNLOAD
                            </a>
                          </>
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-white/10">
                            <ImageIcon size={48} />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex justify-between items-center pt-8 border-t border-white/5">
                    <button 
                      onClick={() => {
                        setFile(null);
                        setPreviewUrl(null);
                        setOptimizedUrl(null);
                        setStats(null);
                      }}
                      className="text-xs font-bold text-white/30 hover:text-white transition-colors"
                    >
                      CLEAR AND RESET
                    </button>
                    {stats && (
                      <div className="flex items-center gap-3 text-emerald-400 bg-emerald-500/5 px-6 py-3 rounded-2xl border border-emerald-500/10">
                        <FileCheck size={18} />
                        <span className="text-sm font-bold uppercase tracking-tighter">Ready to Deploy</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </div>
  );
}
