"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Key, 
  Lock, 
  Unlock, 
  ShieldCheck, 
  ChevronRight, 
  Crown, 
  Sparkles,
  Zap,
  Star,
  RefreshCw,
  Eye,
  EyeOff
} from "lucide-react";

const VALID_CODES = ["TRW2024", "SECRET", "ANTIGRAVITY", "VIP_ACCESS"];

export default function GatedContent() {
  const [isUnlocked, setIsUnlocked] = useState<boolean | null>(null);
  const [inputCode, setInputCode] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showCode, setShowCode] = useState(false);

  // Check persistence on mount
  useEffect(() => {
    const savedState = localStorage.getItem("puzzle-106-access");
    if (savedState === "granted") {
      setIsUnlocked(true);
    } else {
      setIsUnlocked(false);
    }
  }, []);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    // Simulate validation delay for a "premium" feel
    setTimeout(() => {
      if (VALID_CODES.includes(inputCode.trim().toUpperCase())) {
        setIsUnlocked(true);
        localStorage.setItem("puzzle-106-access", "granted");
      } else {
        setError(true);
        // Shake animation reset
        setTimeout(() => setError(false), 500);
      }
      setLoading(false);
    }, 800);
  };

  const handleLock = () => {
    setIsUnlocked(false);
    localStorage.removeItem("puzzle-106-access");
    setInputCode("");
  };

  if (isUnlocked === null) return null; // Avoid hydration mismatch

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-slate-100 flex items-center justify-center p-6 font-sans overflow-hidden relative">
      {/* Abstract Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 blur-[120px] rounded-full" />
      </div>

      <AnimatePresence mode="wait">
        {!isUnlocked ? (
          <motion.div 
            key="locked"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-md relative z-10"
          >
            <div className="bg-slate-900/50 backdrop-blur-2xl border border-white/10 rounded-[40px] p-10 shadow-2xl overflow-hidden relative">
              {/* Card Decoration */}
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Lock size={120} />
              </div>

              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-indigo-500/20">
                  <Key className="text-white" size={32} />
                </div>

                <h1 className="text-4xl font-black mb-4 tracking-tight">Access Gated</h1>
                <p className="text-slate-400 font-medium mb-10 leading-relaxed">
                  This content is encrypted. Please enter your specialized access code to proceed to the vault.
                </p>

                <form onSubmit={handleUnlock} className="space-y-6">
                  <div className="relative group">
                    <input 
                      type={showCode ? "text" : "password"}
                      value={inputCode}
                      onChange={(e) => setInputCode(e.target.value)}
                      placeholder="Enter secret code..."
                      className={`w-full bg-white/5 border ${error ? 'border-red-500 animate-shake' : 'border-white/10'} rounded-2xl px-6 py-5 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all font-mono tracking-widest text-lg`}
                    />
                    <button 
                      type="button"
                      onClick={() => setShowCode(!showCode)}
                      className="absolute right-5 top-1/2 -translate-y-1/2 p-2 text-slate-500 hover:text-slate-300 transition-colors"
                    >
                      {showCode ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>

                  <button 
                    disabled={loading || !inputCode}
                    className="w-full group bg-white text-black font-black uppercase tracking-widest text-xs py-5 rounded-2xl flex items-center justify-center gap-3 hover:bg-indigo-50 transition-all disabled:opacity-50"
                  >
                    {loading ? (
                      <RefreshCw className="animate-spin" size={16} />
                    ) : (
                      <>
                        Authenticate Access
                        <ChevronRight className="group-hover:translate-x-1 transition-transform" size={16} />
                      </>
                    )}
                  </button>
                </form>

                <div className="mt-10 pt-8 border-t border-white/5 flex items-center justify-between text-[10px] uppercase tracking-[0.2em] font-black text-slate-500">
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={14} className="text-indigo-500" />
                    Secure Vault v2.4
                  </div>
                  <div className="hover:text-indigo-400 cursor-help transition-colors">Request Access</div>
                </div>
              </div>
            </div>
            
            <p className="text-center mt-8 text-slate-500 text-xs font-medium italic">
              Hint: Try codes like TRW2024 or ANTIGRAVITY
            </p>
          </motion.div>
        ) : (
          <motion.div 
            key="unlocked"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-5xl relative z-10"
          >
            <div className="grid lg:grid-cols-12 gap-8 items-stretch">
              {/* Main Content Area */}
              <div className="lg:col-span-8 bg-white text-black rounded-[40px] p-12 lg:p-20 shadow-2xl overflow-hidden relative group">
                <div className="absolute top-0 right-0 p-20 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-700">
                  <Crown size={300} />
                </div>
                
                <div className="relative">
                  <div className="inline-flex items-center gap-2 bg-indigo-500 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-10">
                    <Sparkles size={12} /> Special Access Granted
                  </div>
                  
                  <h2 className="text-6xl font-black mb-8 leading-[1.1] tracking-tight">
                    Welcome to the <span className="text-indigo-500">Inner Circle.</span>
                  </h2>
                  
                  <div className="space-y-6 text-lg text-slate-600 font-medium leading-relaxed max-w-2xl">
                    <p>
                      You have successfully bypassed the perimeter security. This dashboard contains sensitive information reserved only for members of the <strong className="text-black">TRW-Antigravity Elite.</strong>
                    </p>
                    <p>
                      Explore the exclusive archives, upcoming blueprints, and early-access tools that are hidden from the public eye.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-12">
                    <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 hover:border-indigo-200 transition-colors cursor-pointer group/card">
                      <Zap className="mb-4 text-indigo-500 group-hover/card:scale-110 transition-transform" />
                      <h4 className="font-bold text-sm uppercase tracking-wider mb-1">Elite Modules</h4>
                      <p className="text-xs text-slate-400">14 hidden modules active</p>
                    </div>
                    <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 hover:border-indigo-200 transition-colors cursor-pointer group/card">
                      <Star className="mb-4 text-indigo-500 group-hover/card:scale-110 transition-transform" />
                      <h4 className="font-bold text-sm uppercase tracking-wider mb-1">Vanguard News</h4>
                      <p className="text-xs text-slate-400">Last updated 4m ago</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar Info */}
              <div className="lg:col-span-4 flex flex-col gap-8">
                <div className="bg-indigo-600 rounded-[40px] p-10 text-white flex-1 relative overflow-hidden">
                  <div className="absolute top-[-20%] right-[-20%] w-64 h-64 bg-white/10 rounded-full blur-3xl" />
                  <div className="relative">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center mb-8">
                      <Unlock size={24} />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">Member Status</h3>
                    <p className="text-indigo-100 text-sm font-medium mb-8">
                      Your identity is verified. Your session is persisted via local encryption protocols.
                    </p>
                    <div className="space-y-4">
                      <div className="bg-white/10 h-1 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: "85%" }}
                          transition={{ duration: 1, delay: 0.5 }}
                          className="bg-white h-full"
                        />
                      </div>
                      <div className="flex justify-between text-[10px] font-black uppercase tracking-widest opacity-80">
                        <span>Clearance Level</span>
                        <span>Level 8 / Elite</span>
                      </div>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={handleLock}
                  className="bg-white/5 border border-white/10 hover:bg-red-500/10 hover:border-red-500/30 text-white py-6 rounded-[40px] font-black uppercase tracking-widest text-[10px] transition-all flex items-center justify-center gap-3"
                >
                  <Lock size={14} /> Terminate Secure Session
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-8px); }
          75% { transform: translateX(8px); }
        }
        .animate-shake {
          animation: shake 0.4s cubic-bezier(.36,.07,.19,.97) both;
        }
      `}</style>
    </div>
  );
}
