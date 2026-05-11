"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  UploadCloud, 
  Trash2, 
  Send, 
  Check, 
  X, 
  Mail, 
  User, 
  FileText, 
  Plus, 
  ArrowLeft,
  ImagePlus,
  Settings
} from "lucide-react";
import Link from "next/link";
import { cn } from "../../lib/utils";

// --- TYPES ---
interface ImageFile {
  id: string;
  file: File;
  preview: string;
}

interface FormData {
  name: string;
  email: string;
  service: string;
  description: string;
}

export default function Puzzle84SnapQuote() {
  // State
  const [images, setImages] = useState<ImageFile[]>([]);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    service: "Landscape Design",
    description: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // --- IMAGE HANDLING ---
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newImages: ImageFile[] = Array.from(files).map(file => ({
      id: Math.random().toString(36).substring(7),
      file,
      preview: URL.createObjectURL(file)
    }));

    setImages(prev => [...prev, ...newImages]);
    
    // Reset input value to allow re-uploading the same file if deleted
    e.target.value = "";
  };

  const removeImage = (id: string) => {
    setImages(prev => {
      const filtered = prev.filter(img => img.id !== id);
      // Cleanup the URL to prevent memory leaks
      const target = prev.find(img => img.id === id);
      if (target) URL.revokeObjectURL(target.preview);
      return filtered;
    });
  };

  // Cleanup all URLs on unmount
  useEffect(() => {
    return () => {
      images.forEach(img => URL.revokeObjectURL(img.preview));
    };
  }, [images]);

  // --- VALIDATION ---
  const isFormValid = 
    images.length >= 3 && 
    formData.name.trim() !== "" && 
    formData.email.includes("@") && 
    formData.description.trim() !== "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    setIsSubmitting(true);
    // Simulate API Call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#030712] text-white font-sans selection:bg-cyan-500/30 flex flex-col">
      
      {/* Background Glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-600/5 blur-[150px] rounded-full" />
      </div>

      {/* Header */}
      <header className="relative z-20 px-8 py-6 border-b border-white/5 bg-black/20 backdrop-blur-md flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="p-2 hover:bg-white/5 rounded-xl transition-colors text-white/40 hover:text-white mr-4">
            <ArrowLeft size={20} />
          </Link>
          <div className="w-10 h-10 rounded-xl bg-cyan-500 flex items-center justify-center text-black">
            <ImagePlus size={22} />
          </div>
          <span className="text-xl font-black tracking-tighter">SnapQuote</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">Accepting requests</span>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full p-6 lg:p-12">
        
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT: Photo Section */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <h2 className="text-2xl font-black tracking-tight mb-2">Project Photos</h2>
              <p className="text-sm text-white/40 font-medium">Upload at least 3 clear photos of your project area</p>
            </div>

            {/* Upload Box */}
            <div className="relative">
              <input 
                type="file" 
                multiple 
                accept="image/*"
                onChange={handleImageUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div className="aspect-video rounded-[2.5rem] border-2 border-dashed border-white/10 bg-white/5 hover:bg-white/[0.08] hover:border-cyan-500/50 transition-all flex flex-col items-center justify-center gap-4 group">
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-white/20 group-hover:text-cyan-400 group-hover:scale-110 transition-all">
                  <UploadCloud size={32} />
                </div>
                <div className="text-center">
                  <p className="font-bold text-white/80">Drag & drop or click to upload</p>
                  <p className="text-xs text-white/30 mt-1 uppercase tracking-widest font-bold">PNG, JPG, WEBP supported — min 3</p>
                </div>

                {images.length > 0 && (
                  <div className="mt-4 px-4 py-2 rounded-full bg-cyan-500/20 border border-cyan-500/20 text-[10px] font-black text-cyan-400 uppercase tracking-widest">
                    {images.length} photos uploaded — {images.length < 3 ? `need ${3 - images.length} more` : "ready"}
                  </div>
                )}
              </div>
            </div>

            {/* Previews */}
            <div className="grid grid-cols-3 gap-4">
              <AnimatePresence>
                {images.map((img) => (
                  <motion.div 
                    key={img.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="aspect-square rounded-3xl overflow-hidden relative group"
                  >
                    <img src={img.preview} alt="preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button 
                        type="button"
                        onClick={() => removeImage(img.id)}
                        className="p-3 bg-red-500 rounded-xl text-white hover:scale-110 active:scale-95 transition-all"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {images.length < 6 && (
                <div className="aspect-square rounded-3xl border border-white/5 bg-white/5 flex items-center justify-center text-white/10">
                  <Plus size={32} />
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: Form Section */}
          <div className="lg:col-span-7 bg-white/[0.03] border border-white/10 rounded-[3rem] p-8 md:p-12 space-y-10">
            <div>
              <h2 className="text-2xl font-black tracking-tight mb-2">Project Details</h2>
              <p className="text-sm text-white/40 font-medium">Tell us more so we can prepare an accurate quote</p>
            </div>

            <div className="space-y-6">
              {/* Name */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/40 flex items-center gap-2 px-2">
                  <User size={12} /> Full Name *
                </label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="John Doe"
                  className="w-full h-16 px-6 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-cyan-500/50 transition-all font-bold"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/40 flex items-center gap-2 px-2">
                  <Mail size={12} /> Email Address *
                </label>
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="john@example.com"
                  className="w-full h-16 px-6 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-cyan-500/50 transition-all font-bold"
                />
              </div>

              {/* Service */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/40 flex items-center gap-2 px-2">
                  <Settings size={12} /> Service Needed *
                </label>
                <select 
                  value={formData.service}
                  onChange={e => setFormData(prev => ({ ...prev, service: e.target.value }))}
                  className="w-full h-16 px-6 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-cyan-500/50 transition-all font-bold appearance-none"
                >
                  <option className="bg-[#111]">Landscape Design</option>
                  <option className="bg-[#111]">Interior Renovation</option>
                  <option className="bg-[#111]">Pool Maintenance</option>
                  <option className="bg-[#111]">Smart Home Setup</option>
                </select>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/40 flex items-center gap-2 px-2">
                  <FileText size={12} /> Project Description *
                </label>
                <textarea 
                  rows={4}
                  value={formData.description}
                  onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Briefly describe your project scope, goals, and any specific requirements..."
                  className={cn(
                    "w-full p-6 bg-white/5 border rounded-2xl focus:outline-none focus:border-cyan-500/50 transition-all font-bold resize-none",
                    formData.description === "" ? "border-red-500/30" : "border-white/10"
                  )}
                />
                {formData.description === "" && (
                   <p className="text-[10px] font-bold text-red-400/60 px-2 flex items-center gap-1">
                     <X size={10} /> Project Description is required
                   </p>
                )}
              </div>
            </div>

            {/* Submit Section */}
            <div className="pt-6 border-t border-white/5 space-y-4">
              <button 
                type="submit"
                disabled={!isFormValid || isSubmitting}
                className={cn(
                  "w-full h-16 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 relative overflow-hidden",
                  isFormValid 
                    ? "bg-cyan-500 text-black hover:bg-cyan-400 hover:scale-[1.02] active:scale-95 shadow-xl shadow-cyan-500/20" 
                    : "bg-white/5 text-white/20 cursor-not-allowed"
                )}
              >
                {isSubmitting ? (
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  >
                    <Settings size={20} />
                  </motion.div>
                ) : isSuccess ? (
                  <span className="flex items-center gap-2"><Check size={20} /> Request Sent</span>
                ) : (
                  <span className="flex items-center gap-2"><Send size={18} /> Submit Quote Request</span>
                )}
              </button>
              
              {!isFormValid && (
                <p className="text-center text-[10px] font-bold text-white/20 uppercase tracking-widest">
                  {images.length < 3 
                    ? `Upload at least 3 photos to proceed (${images.length}/3)` 
                    : "Complete all required fields to submit"}
                </p>
              )}
            </div>
          </div>
        </form>

      </main>

      {/* Success Modal */}
      <AnimatePresence>
        {isSuccess && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-slate-900 border border-white/10 p-12 rounded-[3rem] max-w-md w-full text-center space-y-6 shadow-2xl"
            >
              <div className="w-20 h-20 rounded-3xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto mb-4">
                <Check size={40} />
              </div>
              <h2 className="text-3xl font-black italic uppercase tracking-tighter">Request Received!</h2>
              <p className="text-white/50 font-medium leading-relaxed">
                Thank you, <span className="text-white font-bold">{formData.name}</span>. Our team will review your photos and send a quote to <span className="text-white font-bold">{formData.email}</span> within 24 hours.
              </p>
              <button 
                onClick={() => window.location.reload()}
                className="w-full h-14 bg-white text-black font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-cyan-400 transition-all"
              >
                Done
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{ __html: `
        body { background: #030712; }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #1f2937; border-radius: 10px; }
      `}} />

    </div>
  );
}
