"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShieldCheck, 
  Settings2, 
  Check, 
  X, 
  BarChart3, 
  Target, 
  Cpu, 
  Lock,
  ArrowLeft,
  RotateCcw
} from "lucide-react";
import Link from "next/link";
import { cn } from "../../lib/utils";

// Consent Categories Definition
const CATEGORIES = [
  { id: "essential", title: "Essential", desc: "Required for the site to function correctly. These cannot be disabled.", icon: Lock, required: true },
  { id: "analytics", title: "Analytics", desc: "Helps us understand how visitors interact with the site to improve experience.", icon: BarChart3, required: false },
  { id: "marketing", title: "Marketing", desc: "Used to deliver relevant advertisements and track ad campaign performance.", icon: Target, required: false },
  { id: "functional", title: "Functional", desc: "Enables advanced features like personalized settings or video playback.", icon: Cpu, required: false },
];

export default function Puzzle108ConsentPanel() {
  const [consent, setConsent] = useState<Record<string, boolean>>({
    essential: true,
    analytics: false,
    marketing: false,
    functional: false,
  });
  const [isOpen, setIsOpen] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load consent from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("user_consent_prefs");
    if (saved) {
      setConsent(JSON.parse(saved));
    } else {
      setTimeout(() => setShowBanner(true), 1000);
    }
    setIsLoaded(true);
  }, []);

  const saveConsent = (newPrefs: Record<string, boolean>) => {
    setConsent(newPrefs);
    localStorage.setItem("user_consent_prefs", JSON.stringify(newPrefs));
    setShowBanner(false);
    setIsOpen(false);
  };

  const handleAcceptAll = () => {
    const allAccepted = {
      essential: true,
      analytics: true,
      marketing: true,
      functional: true,
    };
    saveConsent(allAccepted);
  };

  const handleRejectAll = () => {
    const allRejected = {
      essential: true,
      analytics: false,
      marketing: false,
      functional: false,
    };
    saveConsent(allRejected);
  };

  const toggleCategory = (id: string) => {
    if (id === "essential") return;
    setConsent(prev => ({ ...prev, [id]: !prev[id] }));
  };

  if (!isLoaded) return null;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100 p-6 md:p-12">
      
      {/* Navbar */}
      <nav className="max-w-5xl mx-auto flex justify-between items-center mb-20">
        <Link href="/" className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-indigo-600 transition-colors">
          <ArrowLeft size={16} /> Lobby
        </Link>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
            <ShieldCheck size={20} />
          </div>
          <span className="font-black tracking-tighter text-xl">PrivacyShield</span>
        </div>
        <button 
          onClick={() => setIsOpen(true)}
          className="text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-slate-900 transition-colors flex items-center gap-2"
        >
          <Settings2 size={14} /> Preferences
        </button>
      </nav>

      {/* Main Content (Demo Area) */}
      <main className="max-w-4xl mx-auto text-center space-y-12 py-20">
        <header className="space-y-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="w-24 h-24 bg-white rounded-3xl shadow-2xl shadow-indigo-100 flex items-center justify-center mx-auto border border-slate-100 text-indigo-600"
          >
            <ShieldCheck size={48} />
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none">
            Your privacy is our <span className="text-indigo-600">priority.</span>
          </h1>
          <p className="text-slate-500 text-lg max-w-xl mx-auto font-medium">
            Manage how we use cookies and tracking technologies to ensure you have the best experience on our platform.
          </p>
        </header>

        {/* Current Status Dashboard */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-12">
          {CATEGORIES.map((cat) => (
            <div key={cat.id} className={cn(
              "p-6 rounded-[2rem] border transition-all duration-500",
              consent[cat.id] ? "bg-white border-indigo-600 shadow-xl shadow-indigo-100" : "bg-slate-100 border-transparent opacity-60"
            )}>
              <cat.icon size={24} className={consent[cat.id] ? "text-indigo-600 mb-4" : "text-slate-400 mb-4"} />
              <h3 className="font-black text-sm uppercase tracking-tight">{cat.title}</h3>
              <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest">
                {consent[cat.id] ? "Enabled" : "Disabled"}
              </p>
            </div>
          ))}
        </div>
      </main>

      {/* Bottom Sticky Banner */}
      <AnimatePresence>
        {showBanner && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-6 left-6 right-6 z-40"
          >
            <div className="max-w-4xl mx-auto bg-slate-900 text-white p-6 md:p-8 rounded-[2.5rem] shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 border border-white/10">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shrink-0">
                  <ShieldCheck size={24} />
                </div>
                <div className="text-left">
                  <h4 className="font-bold text-lg leading-tight">We value your privacy</h4>
                  <p className="text-white/50 text-sm max-w-md">
                    We use cookies to enhance your browsing experience and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 w-full md:w-auto">
                <button 
                  onClick={() => setIsOpen(true)}
                  className="flex-1 md:flex-none px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest bg-white/10 hover:bg-white/20 transition-colors"
                >
                  Customize
                </button>
                <button 
                  onClick={handleAcceptAll}
                  className="flex-1 md:flex-none px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest bg-indigo-600 hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-600/20"
                >
                  Accept All
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Preferences Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-8 pb-4 flex justify-between items-center border-b border-slate-50">
                <div>
                  <h2 className="text-2xl font-black tracking-tight">Consent Preferences</h2>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Privacy Center</p>
                </div>
                <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-slate-50 rounded-full transition-colors">
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-6">
                {CATEGORIES.map((cat) => (
                  <div key={cat.id} className="group flex items-start gap-6 p-6 rounded-[2rem] bg-slate-50 hover:bg-indigo-50/50 transition-all border-2 border-transparent hover:border-indigo-100">
                    <div className={cn(
                      "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-colors",
                      consent[cat.id] ? "bg-indigo-600 text-white" : "bg-white text-slate-400"
                    )}>
                      <cat.icon size={20} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-black text-slate-900 uppercase tracking-tight">{cat.title}</h4>
                        {cat.required ? (
                          <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest px-3 py-1 bg-white rounded-full border border-indigo-100">Always On</span>
                        ) : (
                          <button 
                            onClick={() => toggleCategory(cat.id)}
                            className={cn(
                              "w-12 h-6 rounded-full relative transition-colors p-1",
                              consent[cat.id] ? "bg-indigo-600" : "bg-slate-300"
                            )}
                          >
                            <motion.div 
                              animate={{ x: consent[cat.id] ? 24 : 0 }}
                              className="w-4 h-4 bg-white rounded-full shadow-sm"
                            />
                          </button>
                        )}
                      </div>
                      <p className="text-sm text-slate-500 font-medium leading-relaxed">{cat.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-8 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button 
                  onClick={handleRejectAll}
                  className="w-full sm:w-auto text-xs font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors flex items-center gap-2"
                >
                  <RotateCcw size={14} /> Reject Optional
                </button>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button 
                    onClick={() => saveConsent(consent)}
                    className="flex-1 sm:flex-none px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest bg-slate-900 text-white hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200"
                  >
                    Save Preferences
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Decorative Index */}
      <div className="fixed bottom-10 left-10 text-[15vh] font-black text-slate-100 select-none pointer-events-none -z-20 uppercase">
        Consent
      </div>
    </div>
  );
}
