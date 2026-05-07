"use client";

import React from "react";
import { motion } from "framer-motion";
import { Network, Server, Globe, Cpu, Zap, Activity } from "lucide-react";

const NODES = [
  { id: "NODE_01", region: "NORTH_AMERICA", status: "online", load: 45, latency: "12ms" },
  { id: "NODE_02", region: "EUROPE_WEST", status: "online", load: 62, latency: "18ms" },
  { id: "NODE_03", region: "ASIA_PACIFIC", status: "offline", load: 0, latency: "--" },
  { id: "NODE_04", region: "SOUTH_AMERICA", status: "online", load: 12, latency: "42ms" },
  { id: "NODE_05", region: "AFRICA_SOUTH", status: "online", load: 28, latency: "38ms" },
  { id: "NODE_06", region: "OCEANIA_EAST", status: "maintenance", load: 0, latency: "--" },
];

export default function NexusQNetwork() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-20 min-h-[calc(100vh-80px)]">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
        <div>
          <div className="flex items-center gap-3 text-[#00f0ff] mb-4">
            <Globe size={24} />
            <span className="text-xs font-mono tracking-[0.4em] uppercase">Global Distribution</span>
          </div>
          <h2 className="text-5xl font-black tracking-tighter uppercase">Quantum Network</h2>
        </div>
        
        <div className="flex gap-4">
          <StatusBadge label="ACTIVE" count={4} color="text-green-400" />
          <StatusBadge label="OFFLINE" count={2} color="text-red-400" />
        </div>
      </div>

      {/* Node Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {NODES.map((node, i) => (
          <motion.div 
            key={node.id}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-8 hover:border-[#00f0ff]/20 transition-all group overflow-hidden relative"
          >
            {/* Background Icon */}
            <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
              <Server size={140} />
            </div>

            <div className="flex items-center justify-between mb-8">
              <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-white/40">
                <Cpu size={24} />
              </div>
              <div className={cn(
                "px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase border",
                node.status === "online" ? "text-green-400 border-green-400/20 bg-green-400/5" :
                node.status === "maintenance" ? "text-amber-400 border-amber-400/20 bg-amber-400/5" :
                "text-red-400 border-red-400/20 bg-red-400/5"
              )}>
                {node.status}
              </div>
            </div>

            <div className="space-y-1 mb-8">
              <p className="text-[10px] text-white/40 font-mono tracking-widest">{node.region}</p>
              <h3 className="text-2xl font-black tracking-tighter">{node.id}</h3>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 p-4 rounded-2xl">
                <p className="text-[10px] text-white/30 font-mono uppercase mb-1">Load</p>
                <div className="flex items-center gap-2">
                  <Activity size={14} className="text-[#00f0ff]" />
                  <span className="text-lg font-bold">{node.load}%</span>
                </div>
              </div>
              <div className="bg-white/5 p-4 rounded-2xl">
                <p className="text-[10px] text-white/30 font-mono uppercase mb-1">Latency</p>
                <div className="flex items-center gap-2">
                  <Zap size={14} className="text-purple-400" />
                  <span className="text-lg font-bold">{node.latency}</span>
                </div>
              </div>
            </div>

            {/* Load bar */}
            <div className="mt-8 pt-8 border-t border-white/5">
              <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }} animate={{ width: `${node.load}%` }} transition={{ duration: 1, delay: 0.5 }}
                  className="h-full bg-gradient-to-r from-[#00f0ff] to-[#6a2be2]" 
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function StatusBadge({ label, count, color }: any) {
  return (
    <div className="bg-white/5 border border-white/10 px-6 py-3 rounded-2xl flex items-center gap-3">
      <span className={cn("w-2 h-2 rounded-full bg-current", color)} />
      <span className="text-xs font-bold text-white/60">{label}</span>
      <span className="text-xl font-black text-white ml-2">{count}</span>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}
