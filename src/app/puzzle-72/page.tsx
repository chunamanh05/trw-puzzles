"use client";

import React, { useState, useEffect } from "react";
import { motion, Reorder, AnimatePresence } from "framer-motion";
import { 
  GripVertical, 
  HelpCircle, 
  Layers, 
  Zap, 
  MessageSquare, 
  RotateCcw, 
  Eye, 
  Settings2,
  ArrowLeft
} from "lucide-react";
import Link from "next/link";
import { cn } from "../../lib/utils";

// Initial sections data
const INITIAL_SECTIONS = [
  { id: "faq", title: "FAQ", desc: "Answer common questions to reduce support load", icon: HelpCircle, color: "text-green-400" },
  { id: "features", title: "Features", desc: "Showcase your product features and benefits", icon: Layers, color: "text-emerald-400" },
  { id: "hero", title: "Hero Section", desc: "Welcome visitors with a compelling headline", icon: Zap, color: "text-cyan-400" },
  { id: "testimonials", title: "Testimonials", desc: "Build trust with customer reviews", icon: MessageSquare, color: "text-indigo-400" },
];

export default function Puzzle72FluxFrame() {
  const [sections, setSections] = useState(INITIAL_SECTIONS);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("fluxframe_layout");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Map icons back to the saved objects
        const hydrated = parsed.map((s: any) => ({
          ...s,
          icon: INITIAL_SECTIONS.find(i => i.id === s.id)?.icon || HelpCircle
        }));
        setSections(hydrated);
      } catch (e) {
        console.error("Failed to parse layout", e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever sections change
  const handleReorder = (newOrder: typeof sections) => {
    setSections(newOrder);
    const toSave = newOrder.map(({ icon, ...rest }) => rest);
    localStorage.setItem("fluxframe_layout", JSON.stringify(toSave));
  };

  const handleReset = () => {
    setSections(INITIAL_SECTIONS);
    localStorage.removeItem("fluxframe_layout");
  };

  if (!isLoaded) return null;

  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white font-sans p-6 md:p-12 overflow-x-hidden">
      
      {/* Navbar & Header */}
      <nav className="max-w-7xl mx-auto flex justify-between items-center mb-16">
        <Link href="/" className="text-white/40 hover:text-white transition-colors flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
          <ArrowLeft size={16} /> Lobby
        </Link>
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-cyan-500 rounded-xl flex items-center justify-center text-black shadow-[0_0_20px_rgba(6,182,212,0.4)]">
            <Settings2 size={24} />
          </div>
          <span className="text-2xl font-black tracking-tighter">FluxFrame</span>
        </div>
        <button 
          onClick={handleReset}
          className="bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2"
        >
          <RotateCcw size={14} /> RESET LAYOUT
        </button>
      </nav>

      <header className="max-w-3xl mx-auto text-center mb-20 space-y-4">
        <h1 className="text-4xl md:text-5xl font-black tracking-tighter">Build stunning layouts with ease.</h1>
        <p className="text-white/40 text-lg">Reorder, visualize, and perfect your page structure in real-time with our futuristic drag-and-drop builder.</p>
      </header>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Section Builder (Draggable) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="flex items-center gap-3 mb-8">
            <Settings2 className="text-cyan-400" size={20} />
            <h2 className="text-xl font-bold tracking-tight">Section Builder</h2>
          </div>

          <Reorder.Group axis="y" values={sections} onReorder={handleReorder} className="space-y-4">
            {sections.map((section) => (
              <Reorder.Item 
                key={section.id} 
                value={section}
                className="relative cursor-grab active:cursor-grabbing"
              >
                <div className="bg-white/[0.03] border border-white/10 hover:border-cyan-500/30 p-6 rounded-2xl flex items-center gap-6 transition-colors group">
                  <div className="text-white/20 group-hover:text-cyan-400/50 transition-colors">
                    <GripVertical size={20} />
                  </div>
                  <div className={cn("w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center", section.color)}>
                    <section.icon size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-white/90">{section.title}</h3>
                    <p className="text-xs text-white/30">{section.desc}</p>
                  </div>
                  <div className="w-8 h-8 rounded-full border border-white/5 flex items-center justify-center text-[10px] font-mono text-white/20">
                    {sections.indexOf(section) + 1}
                  </div>
                </div>
              </Reorder.Item>
            ))}
          </Reorder.Group>
        </div>

        {/* Live Preview */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center gap-3 mb-8">
            <Eye className="text-cyan-400" size={20} />
            <h2 className="text-xl font-bold tracking-tight">Live Preview</h2>
          </div>

          <div className="bg-black/40 border border-white/5 rounded-[3rem] p-12 min-h-[600px] relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-[100px] rounded-full" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 blur-[100px] rounded-full" />

            <div className="relative space-y-6">
              <AnimatePresence mode="popLayout">
                {sections.map((section, index) => (
                  <motion.div
                    key={section.id}
                    layout
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    className="bg-white/[0.05] border border-white/10 rounded-3xl p-10 flex items-start gap-8 group"
                  >
                    <div className={cn("w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform", section.color)}>
                      <section.icon size={32} />
                    </div>
                    <div className="flex-1 pt-2">
                      <div className="flex items-center gap-4 mb-2">
                        <span className="text-[10px] font-mono text-cyan-400 tracking-widest uppercase">Section 0{index + 1}</span>
                        <div className="h-px flex-1 bg-white/5" />
                      </div>
                      <h4 className="text-3xl font-black tracking-tighter mb-2">{section.title}</h4>
                      <p className="text-white/40 leading-relaxed">{section.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>

      </div>

      {/* Decorative ID */}
      <div className="fixed bottom-10 right-10 text-[15vh] font-black text-white/[0.02] pointer-events-none select-none -z-10 uppercase">
        #72
      </div>
    </div>
  );
}
