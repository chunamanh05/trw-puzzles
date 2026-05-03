"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, Database, Users, Cpu, Zap, ArrowRight, ShieldCheck, HardDrive } from "lucide-react";
import Link from "next/link";

export default function DynamicSliderPage() {
  const [storage, setStorage] = useState(250); // GB

  const price = useMemo(() => {
    // Base price logic: $0.15 per GB
    return (storage * 0.15).toFixed(2);
  }, [storage]);

  const nodes = useMemo(() => {
    // 1 node per 500GB
    return Math.ceil(storage / 500);
  }, [storage]);

  return (
    <main className="min-h-screen bg-[#020617] text-slate-100 flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
      
      {/* Background Orbs */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan-600/5 rounded-full blur-[100px]" />
      </div>

      {/* Navigation */}
      <Link 
        href="/"
        className="absolute top-8 left-8 flex items-center gap-2 text-slate-500 hover:text-indigo-400 transition-colors z-50 text-sm font-bold uppercase tracking-widest"
      >
        <ChevronLeft size={16} /> Exit Estimator
      </Link>

      <div className="max-w-5xl w-full z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        
        {/* Left Side: Control Panel */}
        <div className="flex-1 w-full max-w-md">
          <div className="mb-10 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em] mb-4">
              <Zap size={12} fill="currentColor" /> Real-time Pricing
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 leading-none">
              Scale Your <br/> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-500">Infrastructure.</span>
            </h1>
            <p className="text-slate-400 font-medium">
              Drag the slider to adjust your storage requirements. Watch your nodes and billing adapt instantly.
            </p>
          </div>

          <div className="bg-slate-900/40 border border-white/5 backdrop-blur-xl p-8 rounded-[2rem] shadow-2xl">
            <div className="flex justify-between items-end mb-8">
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Target Storage</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black text-white">{storage}</span>
                  <span className="text-indigo-400 font-bold">GB</span>
                </div>
              </div>
              <HardDrive className="text-indigo-500/50 mb-1" size={32} />
            </div>

            {/* CUSTOM SLIDER */}
            <div className="relative group">
              <input
                type="range"
                min="100"
                max="5000"
                step="50"
                value={storage}
                onChange={(e) => setStorage(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500 hover:accent-indigo-400 transition-all"
              />
              <div className="flex justify-between mt-4 text-[10px] font-bold text-slate-600 uppercase tracking-tighter">
                <span>100GB</span>
                <span>2.5TB</span>
                <span>5TB</span>
              </div>
            </div>

            <button className="w-full mt-10 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20">
              Deploy Instance <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* Right Side: Visual Feedback Cards */}
        <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Price Card */}
          <motion.div 
            layout
            className="col-span-1 md:col-span-2 bg-gradient-to-br from-indigo-600 to-indigo-900 p-8 rounded-[2.5rem] shadow-2xl flex flex-col justify-between h-48 relative overflow-hidden"
          >
            <div className="absolute top-[-10%] right-[-10%] w-40 h-40 bg-white/10 rounded-full blur-2xl" />
            <span className="text-xs font-bold text-indigo-200 uppercase tracking-widest relative z-10">Estimated Monthly Cost</span>
            <div className="flex items-baseline gap-1 relative z-10">
              <span className="text-xl font-bold text-indigo-300 opacity-60">$</span>
              <motion.span 
                key={price}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-6xl font-black tracking-tighter"
              >
                {price}
              </motion.span>
            </div>
          </motion.div>

          {/* Nodes Card */}
          <div className="bg-slate-900/60 border border-white/5 p-8 rounded-[2rem] flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center mb-4">
              <Cpu className="text-cyan-500" size={24} />
            </div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Active Nodes</span>
            <span className="text-3xl font-black text-white">{nodes} Units</span>
          </div>

          {/* Security Card */}
          <div className="bg-slate-900/60 border border-white/5 p-8 rounded-[2rem] flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-4">
              <ShieldCheck className="text-emerald-500" size={24} />
            </div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Status</span>
            <span className="text-3xl font-black text-emerald-500">OPTIMIZED</span>
          </div>

          {/* Data Visualization Bar */}
          <div className="col-span-1 md:col-span-2 bg-slate-900/40 border border-white/5 p-8 rounded-[2rem]">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Storage Capacity</span>
              <span className="text-xs font-bold text-indigo-400">{(storage/50).toFixed(0)}% Utilized</span>
            </div>
            <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400"
                initial={false}
                animate={{ width: `${(storage / 5000) * 100}%` }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
              />
            </div>
          </div>

        </div>
      </div>

      {/* Real-time Indicator */}
      <div className="absolute bottom-10 flex items-center gap-2 text-slate-600 text-[10px] font-bold uppercase tracking-[0.4em]">
        <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
        Live Binding Active
      </div>

    </main>
  );
}
