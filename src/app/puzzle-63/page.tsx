"use client";

import React from "react";
import { motion } from "framer-motion";
import { Zap, Activity, Clock, Terminal } from "lucide-react";
import Link from "next/link";

const STATS = [
  { label: "Active Nodes", value: "4/6", icon: Zap, color: "text-blue-400" },
  { label: "Q-Credits/Hour", value: "465", icon: Activity, color: "text-[#00f0ff]" },
  { label: "Avg Latency", value: "12.4ms", icon: Clock, color: "text-purple-400" },
];

export default function NexusQHome() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-20 min-h-[calc(100vh-80px)] flex flex-col items-center justify-center relative overflow-hidden">
      
      {/* Decorative Icons */}
      <motion.div 
        animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute top-20 left-20 w-16 h-16 bg-[#00f0ff]/10 border border-[#00f0ff]/20 rounded-2xl flex items-center justify-center text-[#00f0ff]"
      >
        <Terminal size={32} />
      </motion.div>

      <motion.div 
        animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, delay: 1 }}
        className="absolute top-40 right-20 w-12 h-12 bg-[#6a2be2]/10 border border-[#6a2be2]/20 rounded-2xl flex items-center justify-center text-[#6a2be2]"
      >
        <Activity size={24} />
      </motion.div>

      {/* Hero Content */}
      <div className="text-center space-y-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-7xl md:text-9xl font-black tracking-tighter mb-4 text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">
            Nexus-Q
          </h1>
          <p className="text-xl md:text-2xl font-bold text-white/80 tracking-tight">
            Advanced Quantum Compute Allocation Dashboard
          </p>
          <p className="text-sm text-white/40 max-w-lg mx-auto mt-4 leading-relaxed font-medium">
            Monitor server nodes, calculate computational costs, and deploy AI models with quantum-level precision.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex items-center justify-center gap-6"
        >
          <Link href="/puzzle-63/allocator" className="bg-[#00f0ff] text-black px-10 py-4 rounded-full font-black text-sm tracking-tighter hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_rgba(0,240,255,0.3)] flex items-center gap-2">
            <Zap size={18} fill="black" /> START COMPUTING
          </Link>
          <Link href="/puzzle-63/network" className="bg-white/5 border border-white/10 text-white px-10 py-4 rounded-full font-black text-sm tracking-tighter hover:bg-white/10 transition-all flex items-center gap-2">
            <Activity size={18} /> VIEW NETWORK
          </Link>
        </motion.div>

        {/* Stats Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 pt-20 border-t border-white/5"
        >
          {STATS.map((stat, i) => (
            <div key={i} className="bg-white/[0.02] border border-white/5 p-8 rounded-[2rem] hover:border-[#00f0ff]/20 transition-all group">
              <div className={cn("w-12 h-12 rounded-xl bg-current/10 flex items-center justify-center mb-6 transition-all group-hover:scale-110", stat.color)}>
                <stat.icon size={24} />
              </div>
              <p className="text-4xl font-black tracking-tighter mb-1">{stat.value}</p>
              <p className="text-[10px] text-white/40 font-mono tracking-widest uppercase">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Decorative ID */}
      <div className="absolute bottom-10 left-10 text-[10vh] font-black text-white/[0.03] select-none pointer-events-none">
        #63
      </div>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}
