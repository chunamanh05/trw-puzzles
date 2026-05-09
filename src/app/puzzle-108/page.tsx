"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShieldCheck, 
  Settings2, 
  Check, 
  X, 
  BarChart3, 
  Target, 
  Fingerprint, 
  Share2,
  Lock,
  RotateCcw,
  EyeOff,
  ChevronDown,
  Circle
} from "lucide-react";
import Link from "next/link";
import { cn } from "../../lib/utils";

// Define 5 distinct categories based on the requested format
const CATEGORIES = [
  { id: "essential", title: "Essential", desc: "Required for basic site functionality and security.", icon: Lock, required: true },
  { id: "analytics", title: "Analytics", desc: "Helping us understand visitor behavior to improve the site.", icon: BarChart3, required: false },
  { id: "marketing", title: "Marketing", desc: "Enables personalized advertisements and campaign tracking.", icon: Target, required: false },
  { id: "personalization", title: "Personalization", desc: "Remembers your preferences and customizes your experience.", icon: Fingerprint, required: false },
  { id: "thirdparty", title: "Third-Party", desc: "Allows external services like video players or social widgets.", icon: Share2, required: false },
];

export default function Puzzle108PrivacyDashboard() {
  const [consent, setConsent] = useState<Record<string, boolean>>({
    essential: true,
    analytics: false,
    marketing: false,
    personalization: false,
    thirdparty: false,
  });
  const [isPanelVisible, setIsPanelVisible] = useState(true);
  const [showSaveToast, setShowSaveToast] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("user_consent_dashboard_v2");
    if (saved) {
      setConsent(JSON.parse(saved));
    }
    setIsLoaded(true);
  }, []);

  // Compute stats for the widget
  const stats = useMemo(() => {
    const enabled = Object.values(consent).filter(v => v).length;
    const disabled = Object.values(consent).length - enabled;
    return { enabled, disabled };
  }, [consent]);

  const saveToStorage = (newPrefs: Record<string, boolean>) => {
    setConsent(newPrefs);
    localStorage.setItem("user_consent_dashboard_v2", JSON.stringify(newPrefs));
    setShowSaveToast(true);
    setTimeout(() => setShowSaveToast(false), 3000);
  };

  const handleAction = (type: "accept" | "reject" | "reset") => {
    let newConsent = { ...consent };
    if (type === "accept") {
      Object.keys(newConsent).forEach(k => newConsent[k] = true);
    } else if (type === "reject") {
      Object.keys(newConsent).forEach(k => newConsent[k] = k === "essential");
    } else {
      newConsent = { essential: true, analytics: false, marketing: false, personalization: false, thirdparty: false };
    }
    saveToStorage(newConsent);
  };

  const toggleCategory = (id: string) => {
    if (id === "essential") return;
    const newConsent = { ...consent, [id]: !consent[id] };
    saveToStorage(newConsent);
  };

  if (!isLoaded) return null;

  return (
    <div className="min-h-screen bg-[#05080f] text-white font-sans p-4 md:p-12 overflow-x-hidden selection:bg-cyan-500/30">
      
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/5 blur-[120px] rounded-full" />
      </div>

      <nav className="max-w-6xl mx-auto flex justify-between items-center mb-16">
        <Link href="/" className="text-white/20 hover:text-white transition-colors flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
          Lobby
        </Link>
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="w-10 h-10 bg-cyan-500 rounded-xl flex items-center justify-center text-black shadow-[0_0_20px_rgba(6,182,212,0.4)] group-hover:scale-110 transition-transform">
            <ShieldCheck size={24} />
          </div>
          <span className="text-2xl font-black tracking-tighter">PrivacyShield <span className="text-cyan-400">v2</span></span>
        </div>
        <div className="hidden md:block text-[10px] font-mono text-white/20 uppercase tracking-[0.3em]">
          End-to-End Encryption Enabled
        </div>
      </nav>

      <AnimatePresence mode="wait">
        {isPanelVisible ? (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            className="max-w-5xl mx-auto"
          >
            {/* Top Notification Bar */}
            <div className="bg-white/[0.03] border border-white/5 p-4 px-8 rounded-3xl mb-6 flex items-center justify-between backdrop-blur-md">
              <div className="flex items-center gap-4">
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center transition-colors",
                  showSaveToast ? "bg-emerald-500/20 text-emerald-400" : "bg-white/5 text-white/40"
                )}>
                  {showSaveToast ? <Check size={20} /> : <ShieldCheck size={20} />}
                </div>
                <div>
                  <h4 className="text-sm font-bold">{showSaveToast ? "Preferences saved" : "Consent Management"}</h4>
                  <p className="text-[10px] text-white/30 uppercase tracking-widest">{stats.enabled} of 5 categories enabled</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setIsPanelVisible(false)}
                  className="p-2.5 px-4 bg-white/5 hover:bg-white/10 rounded-xl flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest transition-all"
                >
                  <EyeOff size={14} /> Hide Panel
                </button>
                <button 
                  onClick={() => handleAction("reset")}
                  className="p-2.5 px-4 bg-white/5 hover:bg-white/10 rounded-xl flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest transition-all text-white/40"
                >
                  <RotateCcw size={14} /> Reset
                </button>
              </div>
            </div>

            {/* Main Panel */}
            <div className="bg-[#0c121d] border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl">
              <div className="p-8 md:p-12 border-b border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-cyan-400 border border-white/5">
                    <Settings2 size={28} />
                  </div>
                  <div>
                    <h2 className="text-3xl font-black tracking-tight">Customize Preferences</h2>
                    <p className="text-white/40 text-sm">Manage your consent settings individually</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 w-full md:w-auto">
                  <button 
                    onClick={() => handleAction("reject")}
                    className="flex-1 md:flex-none p-3 px-8 rounded-2xl border border-red-500/20 bg-red-500/5 text-red-400 text-xs font-black uppercase tracking-widest hover:bg-red-500/10 transition-all flex items-center justify-center gap-2"
                  >
                    <X size={14} /> Reject All
                  </button>
                  <button 
                    onClick={() => handleAction("accept")}
                    className="flex-1 md:flex-none p-3 px-8 rounded-2xl bg-cyan-500 text-black text-xs font-black uppercase tracking-widest hover:bg-cyan-400 transition-all flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(6,182,212,0.3)]"
                  >
                    <Check size={14} /> Accept All
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12">
                {/* Left: Preferences List */}
                <div className="lg:col-span-8 p-8 md:p-12 space-y-4">
                  {CATEGORIES.map((cat) => (
                    <div key={cat.id} className="group bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 hover:border-white/10 p-6 rounded-3xl transition-all flex items-center gap-6">
                      <div className={cn(
                        "w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500",
                        consent[cat.id] ? "bg-cyan-500/20 text-cyan-400" : "bg-white/5 text-white/20"
                      )}>
                        <cat.icon size={24} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h4 className="font-bold text-lg">{cat.title}</h4>
                          {cat.required && (
                            <span className="text-[9px] font-bold px-2 py-0.5 bg-cyan-500/10 text-cyan-500 rounded-full border border-cyan-500/20 flex items-center gap-1 uppercase tracking-tighter">
                              <Lock size={10} /> Required
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-white/30 max-w-sm">{cat.desc}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <ChevronDown size={16} className="text-white/10" />
                        <button 
                          onClick={() => toggleCategory(cat.id)}
                          className={cn(
                            "w-14 h-8 rounded-full relative transition-all duration-300 p-1.5",
                            consent[cat.id] ? "bg-cyan-500" : "bg-white/10",
                            cat.required ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                          )}
                        >
                          <motion.div 
                            animate={{ x: consent[cat.id] ? 24 : 0 }}
                            className={cn("w-5 h-5 rounded-full shadow-lg", consent[cat.id] ? "bg-black" : "bg-white/40")}
                          />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Right: Status Widget */}
                <div className="lg:col-span-4 bg-white/[0.02] border-l border-white/5 p-8 md:p-12">
                  <div className="flex items-center gap-3 mb-10">
                    <ShieldCheck className="text-cyan-400" size={18} />
                    <h3 className="text-sm font-black uppercase tracking-widest">Consent Status</h3>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-10">
                    <div className="bg-emerald-500/5 border border-emerald-500/10 p-6 rounded-[2rem] text-center">
                      <div className="text-4xl font-black text-emerald-400 mb-1">{stats.enabled}</div>
                      <div className="text-[10px] font-bold text-emerald-500/60 uppercase tracking-widest">Enabled</div>
                    </div>
                    <div className="bg-red-500/5 border border-red-500/10 p-6 rounded-[2rem] text-center">
                      <div className="text-4xl font-black text-red-400 mb-1">{stats.disabled}</div>
                      <div className="text-[10px] font-bold text-red-500/60 uppercase tracking-widest">Disabled</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {CATEGORIES.map((cat) => (
                      <div key={cat.id} className="flex items-center justify-between p-3 px-5 rounded-2xl bg-white/5 border border-white/5">
                        <span className={cn("text-xs font-bold", consent[cat.id] ? "text-cyan-400" : "text-white/20")}>
                          {cat.title}
                        </span>
                        {consent[cat.id] ? (
                          <div className="w-5 h-5 bg-cyan-500/20 rounded-full flex items-center justify-center text-cyan-400">
                            <Check size={12} />
                          </div>
                        ) : (
                          <div className="w-5 h-5 bg-white/5 rounded-full flex items-center justify-center text-white/10">
                            <Circle size={10} />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="mt-12 pt-12 border-t border-white/5">
                    <p className="text-[10px] text-white/20 leading-relaxed italic">
                      Your choices are stored locally on this device. You can update them at any time from this dashboard.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="shield-icon"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={() => setIsPanelVisible(true)}
            className="fixed bottom-10 right-10 w-20 h-20 bg-cyan-500 rounded-3xl flex items-center justify-center text-black cursor-pointer shadow-[0_0_40px_rgba(6,182,212,0.4)] hover:scale-110 transition-all z-50 group"
          >
            <ShieldCheck size={32} />
            <div className="absolute right-full mr-4 bg-white text-black text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              Open Privacy Center
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Decorative Index */}
      <div className="fixed bottom-20 left-10 text-[20vh] font-black text-white/[0.02] pointer-events-none select-none -z-20 uppercase">
        Privacy
      </div>
    </div>
  );
}
