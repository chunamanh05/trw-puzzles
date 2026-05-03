"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ArrowRight, Sparkles, Layers, Cpu, Globe, AlertTriangle } from "lucide-react";
import Link from "next/link";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3, // Wait for loader to disappear
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 20 }
  },
};

const cardsData = [
  { id: 1, title: "Neural Networks", icon: Cpu, desc: "Train complex models with unparalleled speed." },
  { id: 2, title: "Global CDN", icon: Globe, desc: "Deliver content to edge nodes in milliseconds." },
  { id: 3, title: "Deep Abstractions", icon: Layers, desc: "Build on top of secure, multi-layered architectures." },
  { id: 4, title: "AI Generation", icon: Sparkles, desc: "Synthesize creative assets dynamically on the fly." },
];

export default function AnimatedLoadPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [hasError, setHasError] = useState(false); // Toggle to test the 99% stuck state

  useEffect(() => {
    // Progress counter logic
    const duration = 2500; // 2.5 seconds total load time
    const intervalTime = 25; // Update every 25ms
    const totalSteps = duration / intervalTime;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      
      // Calculate smooth progress
      // Using an ease-out formula to make it slow down near the end
      const rawProgress = 1 - Math.pow(1 - (currentStep / totalSteps), 3);
      const percent = Math.floor(rawProgress * 100);

      if (hasError) {
        // If error, cap at 99%
        setProgress(Math.min(percent, 99));
        if (currentStep >= totalSteps) {
          clearInterval(interval);
        }
      } else {
        // Normal load goes to 100%
        setProgress(percent);
        if (percent >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 200); // Small pause at 100% before revealing
        }
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, [hasError]); // Re-run if we toggle error state

  const retryLoad = () => {
    setHasError(false);
    setProgress(0);
    setIsLoading(true);
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white font-sans overflow-x-hidden relative">
      
      {/* PRE-LOADER SEQUENCE */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[100] bg-[#0a0a0a] flex flex-col items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center w-full max-w-xs"
            >
              {/* Spinner */}
              <div className={`w-16 h-16 border-t-2 rounded-full animate-spin mb-8 ${hasError ? 'border-red-500' : 'border-indigo-500'}`} />
              
              {/* Text */}
              <div className="overflow-hidden mb-2">
                <motion.h2 
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="text-xl font-black uppercase tracking-[0.5em] text-slate-400"
                >
                  Initializing
                </motion.h2>
              </div>

              {/* Progress Number */}
              <div className="text-4xl font-mono font-black mb-4 w-24 text-center">
                {progress}%
              </div>

              {/* Progress Bar */}
              <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  className={`h-full ${hasError ? 'bg-red-500' : 'bg-indigo-500'}`}
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "linear", duration: 0.05 }}
                />
              </div>

              {/* Error Message & Retry Button */}
              {hasError && progress === 99 && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8 flex flex-col items-center gap-4"
                >
                  <div className="flex items-center gap-2 text-red-500 text-sm font-bold">
                    <AlertTriangle size={16} /> Connection timeout
                  </div>
                  <button 
                    onClick={retryLoad}
                    className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-bold uppercase tracking-widest transition-colors"
                  >
                    Retry Connection
                  </button>
                </motion.div>
              )}

              {/* Dev Toggle for Error (Hidden in prod, just for puzzle demo) */}
              {progress < 50 && (
                 <button 
                   onClick={() => setHasError(true)}
                   className="absolute bottom-10 text-[10px] text-slate-600 hover:text-slate-400 font-mono underline"
                 >
                   [Dev] Simulate Load Error
                 </button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN CONTENT */}
      {!isLoading && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="relative min-h-screen p-8 md:p-16 flex flex-col z-10"
        >
          {/* Background Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-indigo-900/20 rounded-full blur-[150px] pointer-events-none -z-10" />

          {/* Navigation */}
          <motion.nav variants={itemVariants} className="flex justify-between items-center mb-24">
            <Link href="/" className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest">
              <ChevronLeft size={14} /> Return to Hub
            </Link>
            <div className="text-xl font-black tracking-tighter italic">
              VELOCITY <span className="text-indigo-500">LABS</span>
            </div>
          </motion.nav>

          {/* Hero Section */}
          <div className="max-w-4xl mx-auto text-center mb-32">
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-black uppercase tracking-[0.3em] mb-8">
              <Sparkles size={14} /> Cinematic Experience
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8">
              Defy The <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Blank Screen.</span>
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-xl text-slate-400 max-w-2xl mx-auto mb-12">
              A masterclass in staggered animations and reactive hover states. We ensure your users are engaged from the very first millisecond.
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex justify-center gap-6">
              <motion.button 
                whileHover={{ scale: 1.05, backgroundColor: "#4f46e5" }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-indigo-600 text-white font-black rounded-2xl flex items-center gap-3 transition-colors shadow-lg shadow-indigo-600/20"
              >
                Deploy System <ArrowRight size={18} />
              </motion.button>
              
              <motion.button 
                onClick={() => {
                  setHasError(true);
                  setProgress(0);
                  setIsLoading(true);
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-black rounded-2xl flex items-center gap-3 transition-colors"
              >
                Test 99% Error
              </motion.button>
            </motion.div>
          </div>

          {/* Staggered Grid with Reactive Cards */}
          <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto w-full">
            {cardsData.map((card) => (
              <motion.div
                key={card.id}
                variants={itemVariants}
                whileHover={{ 
                  y: -10,
                  scale: 1.02,
                  boxShadow: "0 20px 40px -10px rgba(99,102,241,0.2)"
                }}
                className="group relative bg-[#111] border border-white/10 p-8 rounded-3xl overflow-hidden cursor-pointer"
              >
                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-6 border border-white/5 group-hover:border-indigo-500/50 group-hover:bg-indigo-500/10 transition-all duration-300">
                  <card.icon size={28} className="text-slate-400 group-hover:text-indigo-400 transition-colors duration-300" />
                </div>
                
                <h3 className="text-xl font-bold mb-3 text-white">{card.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed group-hover:text-slate-300 transition-colors duration-300">
                  {card.desc}
                </p>
                
                {/* Animated underline on hover */}
                <div className="absolute bottom-0 left-0 h-1 bg-indigo-500 w-0 group-hover:w-full transition-all duration-500 ease-out" />
              </motion.div>
            ))}
          </motion.div>

        </motion.div>
      )}
    </main>
  );
}
