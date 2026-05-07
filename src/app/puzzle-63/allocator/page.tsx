"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Calculator, Cpu, Zap, Activity, Clock } from "lucide-react";

export default function NexusQAllocator() {
  const [params, setParams] = useState(51.1); // B
  const [traffic, setTraffic] = useState(4710); // req/s
  const [latency, setLatency] = useState(410); // ms

  const qCredits = useMemo(() => {
    // Mock formula: (Params * Traffic) / (Latency / 100)
    const raw = (params * traffic) / (latency / 100);
    return Math.floor(raw / 100);
  }, [params, traffic, latency]);

  const stats = [
    { label: "Hourly", value: (qCredits * 3600).toLocaleString(), unit: "Q-Credits", subtitle: "Per hour usage" },
    { label: "Daily", value: (qCredits * 3600 * 24).toLocaleString(), unit: "Q-Credits", subtitle: "24-hour projection" },
    { label: "Monthly", value: (qCredits * 3600 * 24 * 30).toLocaleString(), unit: "Q-Credits", subtitle: "30-day estimate" },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-20 min-h-[calc(100vh-80px)]">
      
      {/* Header */}
      <div className="text-center mb-16">
        <motion.div 
          initial={{ scale: 0 }} animate={{ scale: 1 }}
          className="w-16 h-16 bg-[#00f0ff] rounded-2xl flex items-center justify-center text-black mx-auto mb-6 shadow-[0_0_30px_rgba(0,240,255,0.4)]"
        >
          <Calculator size={32} />
        </motion.div>
        <h2 className="text-5xl font-black tracking-tighter uppercase mb-4">Compute Cost Calculator</h2>
        <p className="text-white/40 max-w-lg mx-auto font-medium">
          Calculate the exact Q-Credits required to deploy and run your AI model with quantum precision.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Sliders Area */}
        <div className="lg:col-span-7 space-y-6">
          <CalculatorSlider 
            label="Model Parameters" icon={Cpu} value={params} min={0.1} max={100} unit="B" color="bg-cyan-400"
            onChange={setParams}
          />
          <CalculatorSlider 
            label="Expected Traffic" icon={Zap} value={traffic} min={1} max={10000} unit="req/s" color="bg-purple-500"
            onChange={setTraffic}
          />
          <CalculatorSlider 
            label="Desired Latency" icon={Clock} value={latency} min={10} max={1000} unit="ms" color="bg-green-400"
            onChange={setLatency}
          />
        </div>

        {/* Result Area */}
        <div className="lg:col-span-5 space-y-6">
          <motion.div 
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
            className="bg-gradient-to-br from-[#00f0ff]/10 to-[#6a2be2]/10 border border-white/10 rounded-[2.5rem] p-12 text-center relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-white/[0.02] opacity-0 group-hover:opacity-100 transition-opacity" />
            <p className="text-[10px] text-white/40 font-mono tracking-widest uppercase mb-4">Q-Credits Required</p>
            <h3 className="text-[120px] font-black tracking-tighter leading-none mb-2 text-white">
              {qCredits}
            </h3>
            <p className="text-xs font-mono text-white/30 uppercase tracking-[0.3em]">credits per second</p>
            
            {/* Animated Ring */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] border border-white/5 rounded-full animate-spin-slow pointer-events-none" />
          </motion.div>

          {/* Breakdown Stats */}
          <div className="space-y-4">
            {stats.map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl flex items-center justify-between group hover:border-white/10 transition-all"
              >
                <div>
                  <h4 className="text-sm font-bold">{stat.label}</h4>
                  <p className="text-[10px] text-white/40 font-mono uppercase">{stat.subtitle}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-black tracking-tighter text-[#00f0ff]">{stat.value}</p>
                  <p className="text-[10px] text-white/30 font-mono uppercase tracking-widest">{stat.unit}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

function CalculatorSlider({ label, icon: Icon, value, min, max, unit, color, onChange }: any) {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="bg-white/[0.02] border border-white/5 p-8 rounded-[2rem] space-y-8 hover:border-white/10 transition-all">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-white/60">
            <Icon size={20} />
          </div>
          <h4 className="font-bold text-white/80">{label}</h4>
        </div>
        <div className="text-right">
          <p className="text-2xl font-black tracking-tighter text-[#00f0ff]">{value}{unit}</p>
        </div>
      </div>

      <div className="relative group pt-4">
        <input 
          type="range" min={min} max={max} step={min === 0.1 ? 0.1 : 1} value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="w-full h-1.5 bg-white/5 rounded-full appearance-none cursor-pointer focus:outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(255,255,255,0.5)] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-black"
        />
        <div 
          className={cn("absolute top-4 left-0 h-1.5 rounded-full pointer-events-none transition-all", color)} 
          style={{ width: `${percentage}%` }} 
        />
        <div className="flex justify-between mt-4 text-[10px] font-mono text-white/20 uppercase tracking-widest">
          <span>{min}{unit}</span>
          <span>{max}{unit}</span>
        </div>
      </div>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}
