"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Monitor, Music, Play, Radio } from "lucide-react";
import Link from "next/link";
import { cn } from "../../../lib/utils";

const VersionNav = ({ active }: { active: number }) => (
  <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] bg-purple-900/50 backdrop-blur-xl border border-pink-500/20 p-1 rounded-full flex gap-1 shadow-[0_0_20px_rgba(236,72,153,0.2)]">
    {[1, 2, 3].map((v) => (
      <Link
        key={v}
        href={v === 1 ? "/puzzle-57" : `/puzzle-57/v${v}`}
        className={cn(
          "px-6 py-2 rounded-full text-xs font-black transition-all tracking-tighter",
          active === v 
            ? "bg-pink-500 text-white shadow-[0_0_20px_rgba(236,72,153,0.5)]" 
            : "text-pink-200/40 hover:text-pink-200 hover:bg-white/5"
        )}
      >
        V.0{v}
      </Link>
    ))}
  </div>
);

export default function Puzzle57V3() {
  return (
    <div className="min-h-screen bg-[#1a0b2e] text-[#f472b6] selection:bg-yellow-400/30 font-sans overflow-x-hidden">
      <VersionNav active={3} />
      
      {/* Retro Grid Background */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ec4899_1px,transparent_1px),linear-gradient(to_bottom,#ec4899_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <nav className="fixed top-8 left-8 z-50">
        <Link href="/" className="text-xs font-black tracking-tighter text-pink-500/50 hover:text-pink-500 transition-colors flex items-center gap-2 uppercase">
          <ArrowLeft size={14} /> Exit Simulation
        </Link>
      </nav>

      {/* Section 1: Retro Hero */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 px-6 overflow-hidden">
        {/* Neon Sun */}
        <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-t from-yellow-500 via-pink-500 to-transparent rounded-t-full blur-3xl opacity-20" />

        <div className="max-w-4xl text-center relative z-10">
          <motion.div
            initial={{ rotate: -2, scale: 0.8 }}
            animate={{ rotate: 0, scale: 1 }}
            className="inline-block px-6 py-2 bg-yellow-400 text-purple-900 text-xs font-black tracking-widest uppercase mb-8 shadow-[5px_5px_0px_#ec4899]"
          >
            Aesthetic Version 3.0 // Vapor
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, scale: 1.2 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-7xl md:text-9xl font-black italic tracking-tighter mb-8 leading-none uppercase drop-shadow-[0_5px_0_#4c1d95] text-transparent bg-clip-text bg-gradient-to-b from-pink-400 to-purple-600"
          >
            RETRO <br />
            <span className="text-yellow-400 not-italic">WAVE.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xl text-pink-200/60 max-w-xl mx-auto mb-10 font-bold italic tracking-tight"
          >
            Step into the neon-soaked future of 1984. A digital landscape where reality meets simulation.
          </motion.p>
          <div className="flex flex-wrap justify-center gap-6">
            <motion.button
              whileHover={{ scale: 1.1, rotate: 2 }}
              className="bg-pink-500 text-white px-10 py-4 rounded-none font-black tracking-widest shadow-[8px_8px_0px_#facc15] transition-all uppercase"
            >
              Play Demo
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1, rotate: -2 }}
              className="border-4 border-yellow-400 text-yellow-400 px-10 py-4 rounded-none font-black tracking-widest transition-all uppercase"
            >
              Connect
            </motion.button>
          </div>
        </div>
      </section>

      {/* Section 2: Retro Stats */}
      <section className="py-32 px-6 relative">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Monitor, label: "RESOLUTION", val: "4K" },
            { icon: Radio, label: "FREQUENCY", val: "120HZ" },
            { icon: Music, label: "AUDIO", val: "HI-FI" },
            { icon: Play, label: "LATENCY", val: "0MS" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="p-8 border-4 border-pink-500/20 bg-purple-900/30 backdrop-blur-md text-center group hover:border-yellow-400 transition-all"
            >
              <item.icon className="mx-auto mb-4 group-hover:animate-bounce" size={32} />
              <div className="text-3xl font-black mb-1">{item.val}</div>
              <div className="text-[10px] font-bold tracking-[0.3em] opacity-40 uppercase">{item.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      <footer className="py-20 text-center opacity-10 text-[12vw] font-black italic tracking-tighter select-none pointer-events-none uppercase">
        VHS-HQ
      </footer>
    </div>
  );
}
