"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShieldCheck, 
  Search, 
  ShoppingCart, 
  Menu, 
  AlertTriangle, 
  CheckCircle2, 
  ChevronDown, 
  Zap, 
  Smartphone,
  Info,
  ArrowLeft,
  MousePointer2,
  Activity,
  Box,
  Terminal
} from "lucide-react";
import Link from "next/link";
import { cn } from "../../lib/utils";

// Optimized Audit Rules
const AUDIT_RULES = [
  { id: 1, title: "Image Alt", impact: "Critical", code: "1.1.1", desc: "Missing descriptive alt text for hero image.", fix: "Add alt='New collection luxury bag'.", status: "fail" },
  { id: 2, title: "Contrast", impact: "Serious", code: "1.4.3", desc: "Contrast ratio (2.1:1) is below 4.5:1 threshold.", fix: "Use #FFFFFF for banner text.", status: "fail" },
  { id: 3, title: "Buttons", impact: "Critical", code: "4.1.2", desc: "Search button missing aria-label.", fix: "Add aria-label='Search products'.", status: "fail" },
  { id: 4, title: "Inputs", impact: "Serious", code: "1.3.1", desc: "Form field lacks associated <label>.", fix: "Add <label for='email'> tag.", status: "fail" },
  { id: 5, title: "Language", impact: "Passed", code: "3.1.1", desc: "HTML lang='en' detected successfully.", fix: "Correct as implemented.", status: "pass" },
  { id: 6, title: "Headings", impact: "Serious", code: "1.3.1", desc: "Heading levels skipped (H1 to H3).", fix: "Change 'Featured' to H2 tag.", status: "fail" },
  { id: 7, title: "Links", impact: "Serious", code: "2.4.4", desc: "Vague link text 'Click here' detected.", fix: "Change to 'Browse Catalog'.", status: "fail" },
  { id: 8, title: "Focus", impact: "Serious", code: "2.4.7", desc: "Missing visible focus indicators on links.", fix: "Add focus:ring-2 CSS styles.", status: "fail" },
];

export default function Puzzle109AccessAuditV2() {
  const [isScanning, setIsScanning] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [activeTab, setActiveTab] = useState<"all" | "fail" | "pass">("all");
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const startScan = () => {
    setIsScanning(true);
    setShowResults(false);
    setTimeout(() => {
      setIsScanning(false);
      setShowResults(true);
    }, 2500);
  };

  const stats = useMemo(() => {
    const failed = AUDIT_RULES.filter(r => r.status === "fail").length;
    const passed = AUDIT_RULES.filter(r => r.status === "pass").length;
    const score = Math.round((passed / AUDIT_RULES.length) * 100);
    return { failed, passed, score };
  }, []);

  const filteredRules = AUDIT_RULES.filter(r => {
    if (activeTab === "all") return true;
    return r.status === activeTab;
  });

  return (
    <div className="min-h-screen bg-[#060410] text-slate-300 font-sans selection:bg-pink-500/30 overflow-x-hidden p-6">
      
      {/* Background Neon Glows */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-pink-600/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-600/10 blur-[150px] rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto space-y-12 pb-20">
        
        {/* Navigation / Header */}
        <nav className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center text-white shadow-[0_0_20px_rgba(219,39,119,0.3)]">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tighter text-white">AccessAudit <span className="text-pink-500">EVOLVED</span></h1>
              <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest leading-none">v2.0 Midnight Amethyst</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="hidden md:flex gap-4 text-[10px] font-bold text-white/40 uppercase tracking-widest border-r border-white/5 pr-6">
              <span className="flex items-center gap-2"><Activity size={12} className="text-pink-500" /> Real-time Scanning</span>
              <span className="flex items-center gap-2"><Smartphone size={12} className="text-purple-500" /> Device Responsive</span>
            </div>
            <Link href="/" className="text-white/20 hover:text-white transition-colors">
              <ArrowLeft size={20} />
            </Link>
          </div>
        </nav>

        {/* TOP: Mock Preview Area (Centered Mobile View) */}
        <section className="relative flex flex-col items-center">
          <div className="flex items-center gap-2 mb-8 bg-white/5 p-2 px-4 rounded-full border border-white/5">
            <Box size={14} className="text-pink-500" />
            <h2 className="text-[10px] font-black uppercase tracking-widest text-white/60">Simulator Environment</h2>
          </div>

          <div className="relative group">
            {/* The Smartphone Frame */}
            <div className="relative w-[340px] h-[640px] bg-black rounded-[3rem] p-3 border-[6px] border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.5)] overflow-hidden">
              {/* Camera Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-50 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-white/10" />
              </div>

              {/* Mock Web Content */}
              <div className="w-full h-full bg-white text-black overflow-y-auto rounded-[2.2rem] relative custom-scrollbar">
                <nav className="p-4 pt-8 flex justify-between items-center border-b border-slate-100 sticky top-0 bg-white/80 backdrop-blur-md z-10">
                  <span className="font-black text-sm tracking-tighter uppercase italic">LuxeShop</span>
                  <Menu size={18} />
                </nav>

                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1549439602-43ebca2327af?auto=format&fit=crop&q=80&w=800" 
                    alt="" // Missing alt
                    className={cn("w-full h-[220px] object-cover transition-all grayscale", hoveredId === "Image Alt" && "grayscale-0 ring-4 ring-pink-500")}
                  />
                  <div className="p-6">
                    <h2 className={cn("text-2xl font-black mb-1", hoveredId === "Contrast" && "bg-black text-white px-2")}>Midnight Collection</h2>
                    <p className="text-xs text-slate-400">Discover elegance in every detail.</p>
                    <button className={cn("mt-4 w-full p-3 bg-black text-white text-xs font-bold rounded-lg", hoveredId === "Focus" && "ring-4 ring-pink-500")}>
                      View Detail
                    </button>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <h3 className="text-sm font-black border-b pb-2 uppercase tracking-widest">New Arrivals</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {[1, 2].map(i => (
                      <div key={i} className="space-y-1">
                        <div className="aspect-[3/4] bg-slate-100 rounded-xl" />
                        <div className="w-12 h-2 bg-slate-100 rounded-full" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Scanning Laser Line */}
                <AnimatePresence>
                  {isScanning && (
                    <motion.div 
                      initial={{ top: 0 }}
                      animate={{ top: "100%" }}
                      transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                      className="absolute left-0 right-0 h-1 bg-pink-500 shadow-[0_0_20px_rgba(236,72,153,1)] z-40"
                    />
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Glowing Glow behind the phone */}
            <div className="absolute -inset-10 bg-pink-500/10 blur-[60px] -z-10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </section>

        {/* BOTTOM: Report Area */}
        <section className="space-y-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="bg-white/5 p-4 rounded-3xl border border-white/5 flex items-center gap-6">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mb-1">Overall Health</span>
                  <div className="flex items-end gap-2 leading-none">
                    <span className="text-5xl font-black text-white">{showResults ? stats.score : "--"}</span>
                    <span className="text-sm font-bold text-pink-500 pb-1">/100</span>
                  </div>
                </div>
                <div className="h-10 w-px bg-white/10" />
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mb-1">Status</span>
                  <span className={cn(
                    "text-xs font-black uppercase tracking-widest transition-colors",
                    !showResults ? "text-white/20" : stats.score < 30 ? "text-pink-500" : "text-teal-400"
                  )}>
                    {showResults ? (stats.score < 30 ? "Critical" : "Stable") : "Ready"}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className={cn(
                      "w-4 h-1 rounded-full transition-colors",
                      !showResults ? "bg-white/5" : i <= (stats.score / 20) ? "bg-pink-500" : "bg-white/5"
                    )} />
                  ))}
                </div>
                <span className="text-[9px] font-mono text-white/20 uppercase tracking-[0.3em]">Scanner Signal</span>
              </div>
            </div>

            <button 
              onClick={startScan}
              disabled={isScanning}
              className="relative px-10 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:scale-105 transition-all shadow-[0_10px_30px_rgba(219,39,119,0.2)] disabled:opacity-50"
            >
              {isScanning ? "Engaging Scan..." : "Initiate Audit"}
            </button>
          </div>

          {/* Results Grid */}
          <AnimatePresence mode="wait">
            {showResults ? (
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
              >
                {filteredRules.map((rule) => (
                  <motion.div
                    key={rule.id}
                    onMouseEnter={() => setHoveredId(rule.title)}
                    onMouseLeave={() => setHoveredId(null)}
                    className={cn(
                      "group p-6 rounded-[2rem] border transition-all duration-500 relative overflow-hidden bg-[#0c0a1f]",
                      rule.status === "fail" ? "border-pink-500/20 hover:border-pink-500/50" : "border-teal-500/10 hover:border-teal-500/30"
                    )}
                  >
                    {/* Header: Title & Status */}
                    <div className="flex justify-between items-start mb-6">
                      <div className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
                        rule.status === "fail" ? "bg-pink-500/10 text-pink-500 group-hover:scale-110" : "bg-teal-500/10 text-teal-400"
                      )}>
                        {rule.status === "fail" ? <AlertTriangle size={20} /> : <CheckCircle2 size={20} />}
                      </div>
                      <span className="text-[10px] font-mono text-white/20 uppercase">WCAG {rule.code}</span>
                    </div>

                    <h4 className="text-lg font-black text-white mb-2 tracking-tight leading-tight">{rule.title}</h4>
                    <p className="text-xs text-white/40 mb-6 leading-relaxed h-10 overflow-hidden">{rule.desc}</p>

                    <div className="pt-6 border-t border-white/5 space-y-4">
                      <div className="flex items-start gap-3">
                        <Terminal size={14} className="text-pink-500 shrink-0 mt-0.5" />
                        <div className="space-y-1">
                          <p className="text-[9px] font-black text-pink-500 uppercase tracking-widest leading-none">Remediation</p>
                          <p className="text-[11px] text-white/60 font-medium italic">{rule.fix}</p>
                        </div>
                      </div>
                    </div>

                    {/* Impact Badge */}
                    <div className={cn(
                      "absolute top-6 right-6 px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-tighter",
                      rule.impact === "Critical" ? "bg-pink-500 text-white" : rule.impact === "Serious" ? "bg-purple-500 text-white" : "bg-white/5 text-white/40"
                    )}>
                      {rule.impact}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : !isScanning && (
              <div className="py-32 text-center space-y-6 bg-white/[0.02] border border-dashed border-white/5 rounded-[3rem]">
                <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mx-auto text-white/10">
                  <Zap size={40} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white/40 uppercase tracking-widest">Ready for analysis</h3>
                  <p className="text-xs text-white/20 mt-2">Initialize the audit scanner to detect accessibility compliance gaps.</p>
                </div>
              </div>
            )}
          </AnimatePresence>
        </section>

      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
      `}</style>
    </div>
  );
}
