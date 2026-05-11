"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CheckCircle2, 
  Circle, 
  ArrowRight, 
  Rocket, 
  FileText, 
  Image as ImageIcon, 
  Target, 
  MessageSquare, 
  ShieldCheck, 
  ArrowLeft,
  Check,
  Sparkles,
  RotateCcw,
  Info
} from "lucide-react";
import Link from "next/link";
import { cn } from "../../lib/utils";

// --- TYPES ---
interface ChecklistItem {
  id: number;
  label: string;
  desc: string;
  completed: boolean;
  icon: React.ReactNode;
}

const INITIAL_ITEMS: ChecklistItem[] = [
  { id: 1, label: "Brand Identity", desc: "Logo files, fonts, and color palettes ready.", completed: false, icon: <Target size={20} /> },
  { id: 2, label: "Core Content", desc: "Text for Home, About, and Service pages.", completed: false, icon: <FileText size={20} /> },
  { id: 3, label: "Visual Assets", desc: "High-quality product or service photography.", completed: false, icon: <ImageIcon size={20} /> },
  { id: 4, label: "Technical Access", desc: "Domain and Hosting login credentials.", completed: false, icon: <ShieldCheck size={20} /> },
  { id: 5, label: "Contact Details", desc: "Phone, email, and physical office address.", completed: false, icon: <MessageSquare size={20} /> },
  { id: 6, label: "Payment Setup", desc: "Merchant account or bank details for gateway.", completed: false, icon: <CheckCircle2 size={20} /> },
];

export default function Puzzle87ReadinessChecker() {
  const [items, setItems] = useState<ChecklistItem[]>(INITIAL_ITEMS);

  // --- LOGIC ---
  const toggleItem = (id: number) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const resetAll = () => setItems(INITIAL_ITEMS);

  const completedCount = useMemo(() => items.filter(i => i.completed).length, [items]);
  const progress = Math.round((completedCount / items.length) * 100);
  const isReady = progress === 100;

  const statusLabel = useMemo(() => {
    if (progress === 0) return "Not Started";
    if (progress < 50) return "Just Starting";
    if (progress < 100) return "Nearly Ready";
    return "Ready to Proceed";
  }, [progress]);

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans selection:bg-cyan-500/30 flex flex-col items-center py-12 px-6">
      
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none opacity-30">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-cyan-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-indigo-600/5 blur-[150px] rounded-full" />
      </div>

      {/* Header Area */}
      <div className="w-full max-w-6xl flex flex-col items-center mb-16 text-center space-y-4">
        <Link href="/" className="absolute top-8 left-8 p-3 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all text-white/40 hover:text-white group">
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        </Link>
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight italic uppercase">
          Project <span className="text-cyan-400">Readiness Check</span>
        </h1>
        <p className="text-white/40 font-medium max-w-xl">
          Tick off each required item below to see your readiness score update in real-time. Get the right start — at the right time.
        </p>
      </div>

      <main className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
        
        {/* LEFT: THE CHECKLIST */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-8">
            <div className="flex items-center justify-between mb-8 px-2">
              <div>
                <h2 className="text-lg font-black uppercase tracking-widest text-white/80">Required Items</h2>
                <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest mt-1">Click each item to mark as complete</p>
              </div>
              <div className="px-4 py-2 bg-white/5 rounded-xl text-xs font-black tracking-widest text-white/40">
                {completedCount}/{items.length}
              </div>
            </div>

            <div className="space-y-3">
              {items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => toggleItem(item.id)}
                  className={cn(
                    "w-full text-left p-5 rounded-2xl border transition-all flex items-center gap-5 group",
                    item.completed 
                      ? "bg-cyan-500/10 border-cyan-500/40" 
                      : "bg-white/5 border-white/5 hover:border-white/10"
                  )}
                >
                  <div className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center transition-all shrink-0",
                    item.completed 
                      ? "bg-cyan-500 text-black shadow-lg shadow-cyan-500/20" 
                      : "bg-white/5 text-white/20"
                  )}>
                    {item.completed ? <Check size={20} strokeWidth={3} /> : item.icon}
                  </div>

                  <div className="flex-1">
                    <h3 className={cn(
                      "font-bold text-sm transition-all",
                      item.completed ? "text-white" : "text-white/60 group-hover:text-white"
                    )}>
                      {item.label}
                    </h3>
                    <p className="text-[10px] text-white/30 font-medium mt-0.5">{item.desc}</p>
                  </div>

                  <div className={cn(
                    "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all",
                    item.completed 
                      ? "bg-cyan-500 border-cyan-500" 
                      : "border-white/10 group-hover:border-white/20"
                  )}>
                    {item.completed && <Check size={10} strokeWidth={4} className="text-black" />}
                  </div>
                </button>
              ))}
            </div>

            <button 
              onClick={resetAll}
              className="w-full mt-8 py-4 text-[10px] font-black uppercase tracking-[0.3em] text-white/10 hover:text-red-400 transition-colors flex items-center justify-center gap-2"
            >
              <RotateCcw size={12} /> Reset all items
            </button>
          </div>
        </div>

        {/* RIGHT: DASHBOARD */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Status Progress Card */}
          <div className="p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/10 space-y-6">
            <div className="flex items-center gap-4">
              <div className={cn(
                "w-12 h-12 rounded-2xl flex items-center justify-center border",
                isReady ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-400" : "bg-cyan-500/10 border-cyan-500/40 text-cyan-400"
              )}>
                {isReady ? <Rocket size={24} /> : <Info size={24} />}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-black italic uppercase tracking-tight text-xl">{statusLabel}</h3>
                  <span className="text-[10px] font-black text-white/30 tracking-widest">{completedCount} / {items.length} ITEMS</span>
                </div>
                <p className="text-[10px] font-medium text-white/40 mt-1 uppercase tracking-widest">
                  {isReady ? "All systems are green" : "Complete the remaining items to unlock"}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-cyan-500 shadow-[0_0_15px_#22d3ee]"
                  animate={{ width: `${progress}%` }}
                  transition={{ type: "spring", stiffness: 100, damping: 20 }}
                />
              </div>
              <div className="flex justify-between text-[10px] font-black tracking-widest text-white/20">
                <span>0%</span>
                <span>{progress}%</span>
              </div>
            </div>
          </div>

          {/* Next Step Card */}
          <div className="p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/10 space-y-6 relative overflow-hidden">
             <div className="relative z-10">
                <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-2">Next Step</p>
                <p className="text-xs font-bold text-white/60 leading-relaxed mb-6">
                  {isReady 
                    ? "Great! Everything is ready. You can now submit your dossier for review." 
                    : "Just a few more items and you'll be ready to proceed."}
                </p>
                <button 
                  disabled={!isReady}
                  className={cn(
                    "w-full py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3",
                    isReady 
                      ? "bg-cyan-500 text-black hover:bg-cyan-400 hover:scale-[1.02] shadow-xl shadow-cyan-500/20" 
                      : "bg-white/5 text-white/20"
                  )}
                >
                  <Sparkles size={14} fill="currentColor" /> Finish Your Checklist <ArrowRight size={14} />
                </button>
             </div>
          </div>

          {/* Status Guide (Legend) */}
          <div className="p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/10">
            <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-6 flex items-center gap-2">
              <Info size={12} /> Status Guide
            </p>
            <div className="space-y-4">
              {[
                { label: "Not Ready", range: "0-49% complete", color: "bg-white/10" },
                { label: "Nearly Ready", range: "50-99% complete", color: "bg-cyan-500/50" },
                { label: "Ready to Proceed", range: "100% complete", color: "bg-emerald-500" },
              ].map((guide, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className={cn("w-2 h-2 rounded-full", guide.color)} />
                  <div className="flex-1 flex justify-between items-center">
                    <span className="text-[10px] font-bold text-white/60">{guide.label}</span>
                    <span className="text-[9px] font-black text-white/20 uppercase tracking-widest">{guide.range}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </main>

      <footer className="w-full max-w-6xl mt-12 pt-8 border-t border-white/5 text-center">
        <p className="text-[9px] font-black uppercase tracking-[0.4em] text-white/10">
          LaunchPad Pro Framework &copy; Agency Operations 2026
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
