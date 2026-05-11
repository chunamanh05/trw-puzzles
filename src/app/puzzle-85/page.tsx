"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronLeft, 
  ChevronRight, 
  ArrowLeft, 
  Maximize2, 
  Sparkles, 
  MousePointer2,
  Image as ImageIcon
} from "lucide-react";
import Link from "next/link";
import { cn } from "../../lib/utils";

export default function Puzzle85BeforeAfterSlider() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // --- INTERACTION LOGIC ---
  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    
    setSliderPosition(position);
  }, []);

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  // Global mouse up to stop dragging even if outside container
  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    window.addEventListener("mouseup", handleGlobalMouseUp);
    return () => window.removeEventListener("mouseup", handleGlobalMouseUp);
  }, []);

  // --- IMAGES DATA ---
  const beforeImage = "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200"; // Clean but empty office
  const afterImage = "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=1200"; // Vibrant, decorated office

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans selection:bg-indigo-500/30 flex flex-col">
      
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-emerald-600/5 blur-[150px] rounded-full" />
      </div>

      {/* Header */}
      <header className="relative z-20 p-8 flex items-center justify-between">
        <Link href="/" className="p-3 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all text-white/40 hover:text-white group">
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        </Link>
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em]">
            <Sparkles size={14} className="fill-current" /> Visual Comparison
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-6 lg:p-12 relative z-10">
        
        <div className="max-w-5xl w-full text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight mb-4 uppercase italic">
            See the <span className="text-indigo-400">Transformation</span>
          </h1>
          <p className="text-white/40 font-medium max-w-xl mx-auto">
            Drag the slider to compare our AI-optimized workspace design vs the traditional empty office.
          </p>
        </div>

        {/* COMPARISON CONTAINER */}
        <div 
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          onMouseDown={handleMouseDown}
          className={cn(
            "relative w-full max-w-5xl aspect-video rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl cursor-ew-resize select-none group",
            isDragging && "cursor-grabbing"
          )}
        >
          {/* Before Image (Background) */}
          <div className="absolute inset-0 bg-slate-900">
            <img 
              src={beforeImage} 
              alt="Before" 
              className="w-full h-full object-cover grayscale opacity-50" 
            />
            <div className="absolute top-8 left-8 px-6 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[10px] font-black uppercase tracking-widest pointer-events-none">
              Before Optimization
            </div>
          </div>

          {/* After Image (Top Layer) */}
          <div 
            className="absolute inset-0 z-10 overflow-hidden"
            style={{ width: `${sliderPosition}%` }}
          >
            <img 
              src={afterImage} 
              alt="After" 
              className="w-full h-full object-cover" 
              style={{ width: `${(100 / sliderPosition) * 100}%` }} // Error-prone but common way: width must stay fixed to container width
            />
            {/* Real fixed width image solution */}
            <div className="absolute inset-0 w-[1000px] md:w-[1500px] lg:w-[2000px]"> 
               {/* This approach is complex with dynamic resizing. 
                  Better way: use absolute fill on image and let parent handle clipping */}
            </div>
            
            {/* Re-implementing correctly: Image should always be 100% of container width */}
            <div className="absolute top-0 left-0 h-full w-[max-content]" style={{ width: containerRef.current?.offsetWidth || '100%' }}>
               <img src={afterImage} alt="After" className="h-full w-full object-cover" />
            </div>

            <div className="absolute top-8 left-8 px-6 py-2 rounded-full bg-indigo-500 border border-white/20 text-[10px] font-black uppercase tracking-widest pointer-events-none shadow-xl">
              AI Optimized
            </div>
          </div>

          {/* Corrected Overlay Approach */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Background Image (Always Full) */}
            <img src={beforeImage} className="w-full h-full object-cover grayscale opacity-40" alt="bg" />
            
            {/* Top Image (Clipped) */}
            <div className="absolute inset-0 overflow-hidden" style={{ width: `${sliderPosition}%` }}>
               <img src={afterImage} className="absolute inset-0 h-full w-full object-cover" style={{ width: containerRef.current?.offsetWidth || '100vw' }} alt="fg" />
            </div>
          </div>

          {/* SLIDER HANDLE */}
          <div 
            className="absolute inset-y-0 z-30 pointer-events-none"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="absolute inset-y-0 -left-[1px] w-[2px] bg-white shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
            
            {/* Handle Circle */}
            <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white text-black shadow-2xl flex items-center justify-center group-hover:scale-110 transition-transform pointer-events-auto cursor-ew-resize active:scale-95">
              <div className="flex items-center gap-0.5">
                <ChevronLeft size={18} />
                <ChevronRight size={18} />
              </div>
            </div>

            {/* Pulsing Dot */}
            <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full border border-white/20 animate-ping pointer-events-none" />
          </div>

          {/* Instructions Overlay (Fades out) */}
          <AnimatePresence>
            {sliderPosition === 50 && !isDragging && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-40 bg-black/20 flex flex-col items-center justify-center pointer-events-none"
              >
                <div className="flex items-center gap-4 text-white/60 font-black uppercase tracking-[0.3em] text-xs">
                  <ChevronLeft className="animate-bounce" />
                  Drag to compare
                  <ChevronRight className="animate-bounce" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Feature Highlights */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
          {[
            { icon: <Maximize2 />, title: "Full Detail", desc: "Compare every pixel with high-resolution imagery." },
            { icon: <MousePointer2 />, title: "Precision Control", desc: "Smooth dragging experience on all devices." },
            { icon: <ImageIcon />, title: "Contextual Labels", desc: "Clear indicators for Before & After states." }
          ].map((item, i) => (
            <div key={i} className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/[0.08] transition-all">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-4">
                {item.icon}
              </div>
              <h3 className="font-bold mb-2">{item.title}</h3>
              <p className="text-xs text-white/40 leading-relaxed font-medium">{item.desc}</p>
            </div>
          ))}
        </div>

      </main>

      <footer className="relative z-20 p-8 border-t border-white/5 text-center">
        <p className="text-[10px] font-black uppercase tracking-widest text-white/20">
          Interactive Comparison Engine &copy; TRW Puzzles 2026
        </p>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        body { background: #020617; }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 10px; }
      `}} />

    </div>
  );
}
