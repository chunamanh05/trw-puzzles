"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Cpu, Globe, Shield, Zap } from "lucide-react";
import Link from "next/link";
import { cn } from "../../lib/utils";

const VersionNav = ({ active }: { active: number }) => (
  <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] bg-black/50 backdrop-blur-xl border border-white/10 p-1 rounded-full flex gap-1">
    {[1, 2, 3].map((v) => (
      <Link
        key={v}
        href={v === 1 ? "/puzzle-57" : `/puzzle-57/v${v}`}
        className={cn(
          "px-6 py-2 rounded-full text-xs font-mono transition-all",
          active === v 
            ? "bg-rose-500 text-white shadow-[0_0_15px_rgba(244,63,94,0.5)]" 
            : "text-white/40 hover:text-white/70 hover:bg-white/5"
        )}
      >
        VERSION 0{v}
      </Link>
    ))}
  </div>
);

export default function Puzzle57V1() {
  return (
    <div className="min-h-screen bg-[#050505] text-[#fcfcfc] selection:bg-rose-500/30 font-sans overflow-x-hidden">
      <VersionNav active={1} />
      
      <nav className="fixed top-8 left-8 z-50">
        <Link href="/" className="text-xs font-mono text-muted-foreground hover:text-rose-400 transition-colors flex items-center gap-2">
          <ArrowLeft size={14} /> Lobby
        </Link>
      </nav>

      {/* Section 1: Cyber Hero */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 px-6">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-[20%] left-[-10%] w-[40%] h-[40%] bg-rose-500/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-[20%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px] animate-pulse delay-700" />
        </div>

        <div className="max-w-4xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-3 py-1 rounded-full border border-rose-500/30 bg-rose-500/10 text-rose-500 text-[10px] font-mono tracking-widest uppercase mb-8"
          >
            System Version 1.0 // Cyberpunk
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-none"
          >
            THE FUTURE IS <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-purple-500 to-blue-500 animate-gradient-x">SYNTHETIC</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg text-white/50 max-w-xl mx-auto mb-10 font-mono leading-relaxed"
          >
            Experience the pinnacle of digital evolution. A luxury interface built for the next generation of digital pioneers.
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(244,63,94,0.4)" }}
            whileTap={{ scale: 0.95 }}
            className="bg-rose-500 text-white px-10 py-4 rounded-xl font-bold tracking-tight shadow-[0_0_20px_rgba(244,63,94,0.3)] transition-all"
          >
            INITIALIZE SYSTEM
          </motion.button>
        </div>
      </section>

      {/* Section 2: Features Grid */}
      <section className="py-32 px-6 bg-white/[0.02] border-y border-white/5 relative">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Zap, title: "Hyper Speed", desc: "Proprietary algorithms ensuring sub-millisecond response times across the globe." },
            { icon: Shield, title: "Neural Link", desc: "Biometric encryption layers integrated directly into your digital workflow." },
            { icon: Cpu, title: "Quantum Core", desc: "Parallel processing capabilities that redefine what's possible in the cloud." },
          ].map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="p-10 rounded-3xl bg-black border border-white/10 hover:border-rose-500/50 transition-all group"
            >
              <div className="w-12 h-12 rounded-2xl bg-rose-500/10 flex items-center justify-center text-rose-500 mb-6 group-hover:scale-110 transition-transform">
                <f.icon size={24} />
              </div>
              <h3 className="text-xl font-bold mb-4">{f.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <footer className="py-20 text-center opacity-20 text-[10vw] font-black select-none pointer-events-none">
        NEXUS 1.0
      </footer>
    </div>
  );
}
