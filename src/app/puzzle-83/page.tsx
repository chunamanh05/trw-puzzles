"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MapPin, 
  Search, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  Navigation,
  Globe,
  BellRing,
  ArrowLeft,
  Zap
} from "lucide-react";
import Link from "next/link";
import { cn } from "../../lib/utils";

// --- SUPPORTED AREAS DATA ---
const SUPPORTED_AREAS = [
  "hà nội", "ha noi", "hanoi", "hn",
  "thành phố hồ chí minh", "ho chi minh", "hcm", "saigon", "sài gòn",
  "đà nẵng", "da nang", "danang",
  "cần thơ", "can tho", "cantho",
  "bình dương", "binh duong", "binhduong",
  "hải phòng", "hai phong", "haiphong",
  "100000", "700000", "550000", "900000" // Example postcodes
];

// Normalize function for fuzzy matching
const normalizeInput = (input: string): string => {
  return input
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove Vietnamese accents
    .replace(/\s+/g, ""); // Remove spaces
};

export default function Puzzle83AreaChecker() {
  const [query, setQuery] = useState<string>("");
  const [status, setStatus] = useState<"idle" | "checking" | "supported" | "unsupported">("idle");

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;

    setStatus("checking");
    
    // Simulate API delay for a premium feel
    setTimeout(() => {
      const normalizedQuery = normalizeInput(query);
      const isSupported = SUPPORTED_AREAS.some(area => normalizeInput(area) === normalizedQuery);
      
      setStatus(isSupported ? "supported" : "unsupported");
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans selection:bg-emerald-500/30 flex flex-col overflow-hidden">
      
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-600/5 blur-[150px] rounded-full" />
      </div>

      {/* Header */}
      <header className="relative z-20 p-8">
        <Link href="/" className="inline-flex items-center gap-2 p-3 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all text-white/40 hover:text-white group">
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        </Link>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-6 relative z-10">
        <div className="w-full max-w-2xl">
          
          {/* Title Section */}
          <div className="text-center mb-12">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em] mb-6"
            >
              <Navigation size={14} className="fill-current" /> Availability Checker
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight mb-6 italic">
              Do we serve <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-emerald-200 to-emerald-500">
                your area?
              </span>
            </h1>
            <p className="text-white/40 font-medium text-lg max-w-md mx-auto">
              Enter your city or postcode to see if our premium services are available in your location.
            </p>
          </div>

          {/* Search Form */}
          <form onSubmit={handleCheck} className="relative mb-12">
            <div className="relative group">
              <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none text-white/20 group-focus-within:text-emerald-400 transition-colors">
                <MapPin size={24} />
              </div>
              <input 
                type="text" 
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  if (status !== "idle") setStatus("idle");
                }}
                placeholder="Ex: Hanoi, District 1, 100000..."
                className="w-full h-20 pl-16 pr-32 bg-white/5 border border-white/10 rounded-3xl text-xl font-bold focus:outline-none focus:border-emerald-500/50 focus:bg-white/[0.08] transition-all placeholder:text-white/10"
              />
              <button 
                type="submit"
                disabled={status === "checking"}
                className="absolute right-3 top-3 bottom-3 px-8 bg-emerald-500 hover:bg-emerald-400 disabled:bg-white/10 disabled:text-white/20 text-black font-black text-xs uppercase tracking-widest rounded-2xl transition-all shadow-lg shadow-emerald-500/20 active:scale-95"
              >
                {status === "checking" ? "Checking..." : "Check"}
              </button>
            </div>
          </form>

          {/* Result Area */}
          <div className="min-h-[180px]">
            <AnimatePresence mode="wait">
              {status === "supported" && (
                <motion.div
                  key="supported"
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  className="p-8 rounded-[2.5rem] bg-emerald-500/10 border border-emerald-500/20 flex flex-col md:flex-row items-center gap-8 shadow-2xl shadow-emerald-500/5"
                >
                  <div className="w-16 h-16 rounded-2xl bg-emerald-500 flex items-center justify-center text-black shrink-0">
                    <CheckCircle2 size={32} />
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-2xl font-black mb-2">Good news! We're here.</h3>
                    <p className="text-white/50 font-medium leading-relaxed">
                      Our experts are available in <span className="text-white font-bold">{query}</span>. You can schedule your session today.
                    </p>
                  </div>
                  <button className="px-8 py-4 bg-white text-black font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-emerald-400 transition-all flex items-center gap-2 group whitespace-nowrap">
                    Book Now <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </motion.div>
              )}

              {status === "unsupported" && (
                <motion.div
                  key="unsupported"
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  className="p-8 rounded-[2.5rem] bg-orange-500/10 border border-orange-500/20 flex flex-col md:flex-row items-center gap-8 shadow-2xl shadow-orange-500/5"
                >
                  <div className="w-16 h-16 rounded-2xl bg-orange-500 flex items-center justify-center text-black shrink-0">
                    <AlertCircle size={32} />
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-2xl font-black mb-2">Not quite there yet.</h3>
                    <p className="text-white/50 font-medium leading-relaxed">
                      We haven't reached <span className="text-white font-bold">{query}</span> just yet, but we're expanding fast!
                    </p>
                  </div>
                  <button className="px-8 py-4 bg-white/10 text-white font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-orange-500 hover:text-black transition-all flex items-center gap-2 group whitespace-nowrap">
                    <BellRing size={16} /> Notify Me
                  </button>
                </motion.div>
              )}

              {status === "idle" && query && (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center text-white/20 text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2"
                >
                  <Search size={14} /> Hit enter to check availability
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </main>

      {/* Footer / Features */}
      <footer className="relative z-20 p-8 border-t border-white/5 bg-black/20">
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-12 opacity-30 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-700">
          <div className="flex items-center gap-2 font-black text-[10px] uppercase tracking-widest italic">
            <Globe size={16} /> 20+ Cities Covered
          </div>
          <div className="flex items-center gap-2 font-black text-[10px] uppercase tracking-widest italic">
            <CheckCircle2 size={16} /> Verified Locations
          </div>
          <div className="flex items-center gap-2 font-black text-[10px] uppercase tracking-widest italic">
            <Zap size={16} /> Instant Verification
          </div>
        </div>
      </footer>

    </div>
  );
}
