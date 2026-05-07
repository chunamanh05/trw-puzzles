"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Leaf, Sparkles, Wind } from "lucide-react";
import Link from "next/link";
import { cn } from "../../../lib/utils";

const VersionNav = ({ active }: { active: number }) => (
  <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] bg-white/50 backdrop-blur-xl border border-black/5 p-1 rounded-full flex gap-1 shadow-sm">
    {[1, 2, 3].map((v) => (
      <Link
        key={v}
        href={v === 1 ? "/puzzle-57" : `/puzzle-57/v${v}`}
        className={cn(
          "px-6 py-2 rounded-full text-xs font-medium transition-all",
          active === v 
            ? "bg-black text-white shadow-lg" 
            : "text-black/40 hover:text-black/70 hover:bg-black/5"
        )}
      >
        VERSION 0{v}
      </Link>
    ))}
  </div>
);

export default function Puzzle57V2() {
  return (
    <div className="min-h-screen bg-[#fcfcfc] text-[#1a1a1a] selection:bg-black/10 font-sans overflow-x-hidden">
      <VersionNav active={2} />
      
      <nav className="fixed top-8 left-8 z-50">
        <Link href="/" className="text-xs font-medium text-black/40 hover:text-black transition-colors flex items-center gap-2">
          <ArrowLeft size={14} /> Lobby
        </Link>
      </nav>

      {/* Section 1: Minimalist Hero */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 px-6">
        <div className="absolute inset-0">
          <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-blue-100/50 rounded-full blur-[140px]" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-orange-50/50 rounded-full blur-[140px]" />
        </div>

        <div className="max-w-4xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block px-4 py-1 rounded-full bg-black/5 text-black/60 text-[10px] font-medium tracking-widest uppercase mb-8"
          >
            Design Version 2.0 // Zen
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-serif italic tracking-tight mb-8 leading-tight"
          >
            Purity in every <br />
            <span className="font-sans font-light not-italic">PIXEL.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg text-black/50 max-w-xl mx-auto mb-10 font-light leading-relaxed"
          >
            A serene digital experience crafted for those who value clarity and simplicity above all else. No noise, just essence.
          </motion.p>
          <motion.button
            whileHover={{ y: -5 }}
            className="bg-black text-white px-12 py-5 rounded-full font-medium tracking-tight shadow-xl transition-all hover:shadow-2xl"
          >
            Begin Journey
          </motion.button>
        </div>
      </section>

      {/* Section 2: Glassmorphism Content */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="aspect-square rounded-[40px] bg-gradient-to-tr from-blue-50 via-white to-orange-50 relative overflow-hidden shadow-inner border border-white p-8 flex items-center justify-center"
          >
            <div className="absolute inset-0 bg-white/20 backdrop-blur-3xl" />
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-64 h-64 border border-black/5 rounded-full flex items-center justify-center p-12"
            >
              <div className="w-full h-full border border-black/10 rounded-full flex items-center justify-center p-8">
                <Leaf className="text-black/20" size={48} />
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-5xl font-serif italic">Breathe Digital.</h2>
            <div className="space-y-6">
              {[
                { icon: Wind, title: "Lightweight", desc: "Engineered for speed, optimized for a weightless experience." },
                { icon: Sparkles, title: "Clarity", desc: "High-contrast typography meets generous whitespace." }
              ].map((item, i) => (
                <div key={i} className="flex gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-black/5 flex items-center justify-center text-black shrink-0">
                    <item.icon size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">{item.title}</h4>
                    <p className="text-black/50 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="py-20 text-center opacity-5 text-[8vw] font-serif italic select-none pointer-events-none">
        zen purity
      </footer>
    </div>
  );
}
