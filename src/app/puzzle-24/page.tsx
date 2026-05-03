"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, CreditCard, ShieldCheck, Zap, Star, QrCode, Smartphone } from "lucide-react";
import Link from "next/link";

export default function FlipCardPage() {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <main className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-900/10 rounded-full blur-[120px]" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-900/10 rounded-full blur-[100px]" />
      </div>

      {/* Navigation */}
      <Link 
        href="/"
        className="absolute top-8 left-8 flex items-center gap-2 text-slate-500 hover:text-white transition-colors z-50 text-sm font-bold uppercase tracking-widest"
      >
        <ChevronLeft size={16} /> Return to Hub
      </Link>

      <div className="max-w-4xl w-full z-10 flex flex-col lg:flex-row items-center gap-16">
        
        {/* Left Side: Copy */}
        <div className="flex-1 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-[0.3em] mb-6">
              <Star size={12} fill="currentColor" /> Executive Access
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-6">
              The Identity <br/> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600">Reimagined.</span>
            </h1>
            <p className="text-slate-400 text-lg mb-8 max-w-md mx-auto lg:mx-0">
              Your digital footprint, encrypted into a physical masterpiece. Click the card to reveal the hidden architecture of your membership.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="px-8 py-4 bg-white text-black font-black rounded-xl hover:scale-105 transition-transform">
                Apply for Entry
              </button>
              <button className="px-8 py-4 bg-white/5 border border-white/10 text-white font-black rounded-xl hover:bg-white/10 transition-colors">
                View Network
              </button>
            </div>
          </motion.div>
        </div>

        {/* Right Side: The Flip Card */}
        <div className="perspective-1000 cursor-pointer group" onClick={() => setIsFlipped(!isFlipped)}>
          <motion.div
            className="relative w-[340px] h-[500px] md:w-[400px] md:h-[600px] transition-all duration-700 transform-style-3d shadow-2xl"
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            {/* FRONT SIDE */}
            <div className="absolute inset-0 w-full h-full backface-hidden rounded-[2.5rem] p-10 bg-gradient-to-br from-[#1a1a1a] via-[#0a0a0a] to-[#000] border border-white/10 flex flex-col justify-between overflow-hidden shadow-2xl">
              {/* Card Grain Texture */}
              <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
              <div className="absolute top-[-10%] right-[-10%] w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03),transparent_40%)] pointer-events-none" />

              <div className="relative z-10 flex justify-between items-start">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                  <div className="w-6 h-6 bg-black rounded-sm rotate-45" />
                </div>
                <div className="text-right">
                  <span className="block text-[10px] font-black tracking-[0.2em] uppercase text-blue-500">Velocity</span>
                  <span className="block text-[8px] font-bold text-slate-500">PLATINUM NODE</span>
                </div>
              </div>

              <div className="relative z-10">
                <h2 className="text-3xl font-black tracking-tighter mb-1 uppercase">Nam Anh Chu</h2>
                <div className="flex items-center gap-2 text-slate-500 text-xs font-mono">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  ACTIVE MEMBER SINCE 2024
                </div>
              </div>

              <div className="relative z-10 flex justify-between items-end border-t border-white/5 pt-8">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Global Rank</span>
                  <span className="text-xl font-black">#001-ALPHA</span>
                </div>
                <div className="w-12 h-12 rounded-full border-2 border-blue-500/20 flex items-center justify-center">
                  <CreditCard className="text-blue-500" size={24} />
                </div>
              </div>
            </div>

            {/* BACK SIDE */}
            <div 
              className="absolute inset-0 w-full h-full backface-hidden rounded-[2.5rem] p-10 bg-gradient-to-br from-[#0a0a0a] to-[#000] border border-white/10 flex flex-col justify-between shadow-2xl"
              style={{ transform: "rotateY(180deg)" }}
            >
              <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')]" />

              <div className="relative z-10 flex flex-col gap-6">
                <div className="w-full h-12 bg-gradient-to-r from-slate-900 to-black border-y border-white/5 flex items-center justify-end px-4">
                  <span className="text-[10px] font-mono text-slate-700">CVV: ***</span>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-14 h-10 bg-gradient-to-br from-yellow-600 to-yellow-200 rounded-lg flex items-center justify-center shadow-lg">
                    <div className="grid grid-cols-2 gap-px w-full h-full p-2 opacity-30">
                      {[...Array(6)].map((_, i) => <div key={i} className="bg-black" />)}
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Security Chip</span>
                    <span className="text-[8px] font-bold text-slate-600">ENCRYPTED NODE 256-AES</span>
                  </div>
                </div>
              </div>

              <div className="relative z-10 flex flex-col gap-6">
                <div className="bg-white p-3 rounded-2xl w-fit mx-auto shadow-xl shadow-blue-500/20">
                  <QrCode size={100} className="text-black" />
                </div>
                <div className="flex justify-around text-center border-t border-white/10 pt-6">
                  <div>
                    <ShieldCheck size={20} className="text-blue-500 mx-auto mb-1" />
                    <span className="block text-[8px] font-bold text-slate-500">SECURE</span>
                  </div>
                  <div>
                    <Zap size={20} className="text-amber-500 mx-auto mb-1" />
                    <span className="block text-[8px] font-bold text-slate-500">FAST</span>
                  </div>
                  <div>
                    <Smartphone size={20} className="text-emerald-500 mx-auto mb-1" />
                    <span className="block text-[8px] font-bold text-slate-500">MOBILE</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <p className="absolute bottom-12 text-slate-500 text-xs font-mono uppercase tracking-[0.5em] animate-pulse">
        Click to Rotate Identity
      </p>

      {/* Global CSS for 3D */}
      <style jsx global>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
      `}</style>
    </main>
  );
}
