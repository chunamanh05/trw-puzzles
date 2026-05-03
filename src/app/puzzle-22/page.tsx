"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, Phone, PhoneOff, Loader2, Bot, Sparkles, ChevronLeft } from "lucide-react";
import Link from "next/link";
import Vapi from "@vapi-ai/web";

const PUBLIC_KEY = "ec939415-2b7b-4167-9a2e-960ffa603c76";
const ASSISTANT_ID = "bb0f210b-2d4f-4987-97df-63068913ce3e";

export default function VapiAgentPage() {
  const [vapi, setVapi] = useState<any>(null);
  const [callStatus, setCallStatus] = useState<"inactive" | "loading" | "active">("inactive");
  const [volume, setVolume] = useState(0);
  const [isAgentSpeaking, setIsAgentSpeaking] = useState(false);

  useEffect(() => {
    const vapiInstance = new Vapi(PUBLIC_KEY);
    setVapi(vapiInstance);

    vapiInstance.on("call-start", () => {
      setCallStatus("active");
    });

    vapiInstance.on("call-end", () => {
      setCallStatus("inactive");
      setVolume(0);
      setIsAgentSpeaking(false);
    });

    vapiInstance.on("error", (e: any) => {
      console.error("Vapi Error:", e);
      setCallStatus("inactive");
    });

    // Volume level updates frequently (0 to 1)
    vapiInstance.on("volume-level", (level: number) => {
      setVolume(level);
    });

    vapiInstance.on("speech-start", () => setIsAgentSpeaking(true));
    vapiInstance.on("speech-end", () => setIsAgentSpeaking(false));

    return () => {
      vapiInstance.stop();
    };
  }, []);

  const toggleCall = () => {
    if (!vapi) return;

    if (callStatus === "inactive") {
      setCallStatus("loading");
      vapi.start(ASSISTANT_ID);
    } else {
      vapi.stop();
      setCallStatus("inactive");
    }
  };

  // Calculate dynamic scale and opacity based on volume
  const pulseScale = 1 + volume * 1.5;
  const pulseOpacity = Math.max(0.2, volume);

  return (
    <main className="min-h-screen bg-[#050505] text-slate-100 flex flex-col items-center justify-center relative overflow-hidden font-sans">
      
      {/* Navigation */}
      <Link 
        href="/"
        className="absolute top-8 left-8 flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors z-50 text-sm font-medium tracking-wide"
      >
        <ChevronLeft size={16} /> Return to Hub
      </Link>

      {/* Decorative Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-900/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-emerald-900/10 rounded-full blur-[80px]" />
      </div>

      <div className="max-w-2xl w-full z-10 px-6 flex flex-col items-center text-center">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-[0.2em] mb-6">
            <Sparkles size={14} /> Voice Intelligence
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
            Meet Your AI Concierge
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-lg mx-auto leading-relaxed">
            Experience next-generation conversational AI. Powered by Vapi, our agent can understand context, intent, and speak with human-like latency.
          </p>
        </motion.div>

        {/* Interactive Orb / Visualizer */}
        <div className="relative w-64 h-64 flex items-center justify-center mb-12">
          
          {/* Pulsing rings based on volume */}
          <AnimatePresence>
            {callStatus === "active" && (
              <>
                <motion.div 
                  className="absolute inset-0 rounded-full border border-cyan-500/30 bg-cyan-500/5"
                  animate={{ scale: pulseScale, opacity: pulseOpacity }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                />
                <motion.div 
                  className="absolute inset-0 rounded-full border border-emerald-500/20 bg-emerald-500/5"
                  animate={{ scale: pulseScale * 1.2, opacity: pulseOpacity * 0.5 }}
                  transition={{ type: "spring", stiffness: 250, damping: 25 }}
                />
              </>
            )}
          </AnimatePresence>

          {/* Core Orb */}
          <div className={`relative z-10 w-32 h-32 rounded-full flex items-center justify-center transition-all duration-700 shadow-2xl ${
            callStatus === "active" 
              ? isAgentSpeaking 
                ? "bg-gradient-to-br from-emerald-400 to-cyan-500 shadow-cyan-500/50" 
                : "bg-gradient-to-br from-cyan-500 to-blue-600 shadow-blue-500/40"
              : "bg-slate-800 border border-slate-700 shadow-none"
          }`}>
            {callStatus === "loading" ? (
              <Loader2 size={40} className="text-cyan-400 animate-spin" />
            ) : callStatus === "active" ? (
              <Mic size={40} className="text-white animate-pulse" />
            ) : (
              <Bot size={40} className="text-slate-500" />
            )}
          </div>

          {/* Status Badge */}
          <div className="absolute -bottom-6 px-4 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 backdrop-blur-md text-xs font-mono tracking-widest uppercase flex items-center gap-2 text-slate-300">
            {callStatus === "inactive" && "System Standby"}
            {callStatus === "loading" && "Connecting..."}
            {callStatus === "active" && (
              <>
                <span className={`w-2 h-2 rounded-full ${isAgentSpeaking ? 'bg-emerald-500' : 'bg-cyan-500 animate-pulse'}`} />
                {isAgentSpeaking ? "Agent Speaking" : "Listening..."}
              </>
            )}
          </div>
        </div>

        {/* Action Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleCall}
          disabled={callStatus === "loading"}
          className={`flex items-center gap-3 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-xl border ${
            callStatus === "inactive"
              ? "bg-white text-black border-transparent hover:bg-cyan-50"
              : callStatus === "loading"
              ? "bg-slate-800 text-slate-400 border-slate-700 cursor-not-allowed"
              : "bg-red-500/10 text-red-500 border-red-500/20 hover:bg-red-500 hover:text-white"
          }`}
        >
          {callStatus === "inactive" ? (
            <>
              <Phone size={20} /> Connect Agent
            </>
          ) : callStatus === "loading" ? (
            <>
              <Loader2 size={20} className="animate-spin" /> Connecting...
            </>
          ) : (
            <>
              <PhoneOff size={20} /> End Call
            </>
          )}
        </motion.button>
        
        {/* Hint text */}
        <p className="mt-6 text-sm text-slate-500 font-mono">
          Ensure your microphone permissions are granted.
        </p>

      </div>
    </main>
  );
}
