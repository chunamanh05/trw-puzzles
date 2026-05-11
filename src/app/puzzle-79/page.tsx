"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  ShieldCheck,
  Users,
  ChevronRight,
  ArrowUpRight,
  ArrowLeft,
  CheckCircle2,
  Trophy,
  Sparkles
} from "lucide-react";
import Link from "next/link";
import { cn } from "../../lib/utils";

// Sections data
const SECTIONS = [
  { id: "hero", title: "Scale Your Vision", sub: "The next generation SaaS platform for ambitious teams.", cta: "Start Free Trial", color: "bg-slate-950" },
  { id: "features", title: "Smart Features", sub: "Everything you need to automate your workflow in one place.", cta: "Explore Features", color: "bg-[#0a0f1a]" },
  { id: "pricing", title: "Clear Pricing", sub: "No hidden fees. Choose the plan that fits your scale.", cta: "Choose Plan", color: "bg-slate-950" },
  { id: "contact", title: "Get in Touch", sub: "Our experts are ready to help you transform your business.", cta: "Talk to Us", color: "bg-[#0a0f1a]" },
];

export default function Puzzle79StickyCTAV3() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isVisible, setIsVisible] = useState(false);

  // Intersection Observer to track scroll position
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { threshold: 0.5 });

    SECTIONS.forEach(s => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const activeCTA = SECTIONS.find(s => s.id === activeSection)?.cta || "Get Started";

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-indigo-500/30 overflow-x-hidden">

      {/* Lobby Link */}
      <Link href="/" className="fixed top-8 left-8 z-50 p-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl hover:bg-white/10 transition-all text-white/40 hover:text-white">
        <ArrowLeft size={20} />
      </Link>

      {/* Page Sections */}
      {SECTIONS.map((section) => (
        <section
          key={section.id}
          id={section.id}
          className={cn("min-h-screen flex flex-col items-center justify-center p-12 text-center relative overflow-hidden transition-colors duration-1000", section.color)}
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/20 blur-[150px] rounded-full" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative z-10 max-w-4xl space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-indigo-400 uppercase tracking-widest">
              <Sparkles size={14} /> Conversion Optimizer
            </div>
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-none italic uppercase">
              {section.title}
            </h2>
            <p className="text-xl text-white/50 max-w-xl mx-auto font-medium">
              {section.sub}
            </p>
            <div className="pt-12 grid grid-cols-1 md:grid-cols-3 gap-8 opacity-40">
              <div className="p-8 border border-white/10 rounded-[2rem] bg-white/5">
                <Users className="mx-auto mb-4" />
                <p className="text-xs font-black uppercase tracking-widest">Global Reach</p>
              </div>
              <div className="p-8 border border-white/10 rounded-[2rem] bg-white/5">
                <CheckCircle2 className="mx-auto mb-4" />
                <p className="text-xs font-black uppercase tracking-widest">Secure Flow</p>
              </div>
              <div className="p-8 border border-white/10 rounded-[2rem] bg-white/5">
                <ArrowUpRight className="mx-auto mb-4" />
                <p className="text-xs font-black uppercase tracking-widest">High ROI</p>
              </div>
            </div>
          </motion.div>
        </section>
      ))}

      {/* FIXED: Perfectly Centered Sticky CTA Bar */}
      <AnimatePresence>
        {isVisible && (
          <div className="fixed bottom-10 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
              className="pointer-events-auto max-w-[95vw]"
            >
              <div className="relative bg-slate-900/90 backdrop-blur-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center p-2 rounded-full">
                
                {/* Stats Container */}
                <div className="hidden md:flex items-center gap-3 pl-4 pr-6">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 text-yellow-400">
                    <Star size={18} fill="currentColor" />
                  </div>
                  <div>
                    <p className="text-sm font-black leading-none">4.9/5</p>
                    <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest mt-1">Trust Score</p>
                  </div>
                </div>

                <div className="hidden lg:block w-px h-8 bg-white/10" />

                {/* Context Info */}
                <div className="hidden lg:flex flex-col justify-center px-6 w-[200px]">
                  <h4 className="text-[9px] font-black uppercase tracking-widest text-indigo-400 mb-1">Current Phase</h4>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeSection}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.2 }}
                      className="text-xs font-bold text-white/90 truncate"
                    >
                      {SECTIONS.find(s => s.id === activeSection)?.sub}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Guarantee */}
                <div className="hidden xl:flex items-center gap-2 px-6 border-l border-white/10 mr-2">
                  <ShieldCheck size={18} className="text-emerald-400" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/60">30-Day Guarantee</span>
                </div>

                {/* CTA Button */}
                <button className="group relative px-8 py-4 bg-indigo-600 text-white rounded-full font-black text-xs uppercase tracking-widest shadow-lg hover:bg-indigo-500 transition-all flex items-center gap-3 shrink-0 overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={activeCTA}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center gap-2"
                    >
                      {activeCTA}
                    </motion.span>
                  </AnimatePresence>
                  <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-full" />
                </button>

              </div>

              {/* Outer Glow */}
              <div className="absolute -inset-4 bg-indigo-500/5 blur-2xl -z-10 rounded-full" />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Scroll Progress */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-indigo-600 origin-left z-[60]"
        style={{ scaleX: isVisible ? undefined : 0 }}
      />

      <style jsx global>{`
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #020617; }
        ::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #334155; }
      `}</style>
    </div>
  );
}
