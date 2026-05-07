"use client";

import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Play, Pause, ChevronDown } from "lucide-react";
import Link from "next/link";

export default function Puzzle61VideoHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-black overflow-hidden font-sans selection:bg-rose-500/30">
      
      {/* Navigation Overlay */}
      <nav className="fixed top-8 left-8 z-[100]">
        <Link href="/" className="text-xs font-mono text-white/50 hover:text-white transition-colors flex items-center gap-2 bg-black/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
          <ArrowLeft size={14} /> Lobby
        </Link>
      </nav>

      {/* Video Background Layer */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover"
        >
          <source 
            src="https://assets.mixkit.co/videos/preview/mixkit-cyberpunk-city-street-at-night-with-neon-lights-40138-large.mp4" 
            type="video/mp4" 
          />
          Your browser does not support the video tag.
        </video>
        
        {/* Dark Overlay with Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/80" />
      </div>

      {/* Content Overlay Layer */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-rose-500 font-mono text-[10px] tracking-[0.4em] uppercase mb-6"
          >
            Experience Motion // Digital Zenith
          </motion.p>
          
          <h1 className="text-6xl md:text-[120px] font-black tracking-tighter leading-[0.9] text-white mb-8 drop-shadow-2xl">
            CINEMATIC <br />
            <span className="italic font-serif text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-purple-400">EVOLUTION</span>
          </h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex flex-wrap justify-center gap-6 mt-10"
          >
            <button className="bg-white text-black px-10 py-4 rounded-full font-bold hover:bg-rose-500 hover:text-white transition-all transform hover:scale-105 active:scale-95 shadow-xl">
              GET STARTED
            </button>
            <button className="border border-white/20 backdrop-blur-md text-white px-10 py-4 rounded-full font-bold hover:bg-white/10 transition-all transform hover:scale-105 active:scale-95">
              VIEW REEL
            </button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] font-mono tracking-widest uppercase">Scroll</span>
          <ChevronDown size={20} />
        </motion.div>
      </div>

      {/* Manual Controls Layer (Custom UI) */}
      <div className="fixed bottom-10 right-10 z-[100]">
        <button
          onClick={togglePlay}
          className="group relative flex items-center justify-center w-16 h-16 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:bg-rose-500 hover:border-rose-500 transition-all shadow-2xl overflow-hidden"
        >
          <AnimatePresence mode="wait">
            {isPlaying ? (
              <motion.div key="pause" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }}>
                <Pause size={24} fill="currentColor" />
              </motion.div>
            ) : (
              <motion.div key="play" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }}>
                <Play size={24} fill="currentColor" className="ml-1" />
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Progress Ring (Visual only) */}
          <div className="absolute inset-0 rounded-full border-2 border-white/5 group-hover:border-white/20 transition-colors" />
        </button>
      </div>

      {/* Decorative ID */}
      <div className="fixed bottom-10 left-10 text-[10vh] font-black text-white/[0.05] pointer-events-none select-none z-0">
        #61
      </div>
    </div>
  );
}
