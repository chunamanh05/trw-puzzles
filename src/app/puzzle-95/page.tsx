"use client";

import React, { useState, useEffect } from "react";
import { 
  Eye, 
  EyeOff, 
  Copy, 
  RefreshCw, 
  Check, 
  ShieldCheck, 
  Zap, 
  Lock 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * PUZZLE #95: API Key Dashboard
 * Features:
 * - Client-side key generation
 * - Masked/Unmasked toggle
 * - Copy to clipboard with success state
 * - Secure regeneration with invalidation
 * - Premium Dark Mode UI
 */

const GENERATED_PREFIX = "kv_";

export default function ApiKeyDashboard() {
  const [apiKey, setApiKey] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);

  // Generate a random mock key
  const generateNewKey = () => {
    const randomPart = Array.from({ length: 32 }, () => 
      Math.random().toString(36)[2]
    ).join("");
    
    // Format: kv_xxxx-xxxx-xxxx-xxxx
    const chunks = randomPart.match(/.{1,8}/g) || [];
    return `${GENERATED_PREFIX}${chunks.join("-")}`;
  };

  // Initial key generation
  useEffect(() => {
    setApiKey(generateNewKey());
  }, []);

  const handleRegenerate = async () => {
    setIsRegenerating(true);
    // Simulate network delay for premium feel
    await new Promise((resolve) => setTimeout(resolve, 800));
    setApiKey(generateNewKey());
    setIsRegenerating(false);
    setIsVisible(true); // Reveal new key so user knows it changed
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(apiKey);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const maskedKey = apiKey ? `${apiKey.slice(0, 7)}${"•".repeat(24)}` : "";

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 font-sans">
      
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent-primary/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent-secondary/5 blur-[120px] rounded-full" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl relative"
      >
        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-glass-border bg-glass-bg text-[10px] uppercase tracking-widest text-accent-primary mb-4">
            <Lock size={10} />
            Secure Vault
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gradient mb-4">
            Your <span className="text-accent-primary">API Key</span> Dashboard
          </h1>
          <p className="text-muted-foreground text-sm max-w-md mx-auto">
            Manage your secret key securely. Reveal, copy, or regenerate it at any time.
          </p>
        </div>

        {/* Main Dashboard Card */}
        <div className="glass rounded-luxury p-8 luxury-shadow relative overflow-hidden">
          
          {/* Subtle Grid Pattern Overlay */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150" />

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent-primary/10 flex items-center justify-center border border-accent-primary/20">
                  <ShieldCheck className="text-accent-primary" size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold">Production Key</h3>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Live & Active</p>
                </div>
              </div>
              <div className="h-2 w-2 rounded-full bg-accent-primary animate-pulse shadow-[0_0_8px_rgba(0,245,212,0.6)]" />
            </div>

            {/* API Key Container */}
            <div className="relative group">
              <div className="w-full bg-black/40 border border-glass-border rounded-xl px-4 py-4 pr-12 font-mono text-sm tracking-wider overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={isVisible ? "visible" : "masked"}
                    initial={{ opacity: 0, filter: "blur(4px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, filter: "blur(4px)" }}
                    transition={{ duration: 0.2 }}
                    className={isVisible ? "text-foreground" : "text-muted-foreground/40"}
                  >
                    {isVisible ? apiKey : maskedKey}
                  </motion.span>
                </AnimatePresence>
              </div>

              {/* Action Buttons inside Input */}
              <button
                onClick={() => setIsVisible(!isVisible)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-muted-foreground hover:text-foreground transition-colors"
                title={isVisible ? "Hide Key" : "Show Key"}
              >
                {isVisible ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Bottom Actions */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              <button
                onClick={handleCopy}
                disabled={isRegenerating}
                className="flex items-center justify-center gap-2 h-12 bg-foreground text-background rounded-xl font-medium hover:opacity-90 transition-all active:scale-[0.98] disabled:opacity-50"
              >
                {isCopied ? (
                  <>
                    <Check size={18} />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy size={18} />
                    Copy Key
                  </>
                )}
              </button>

              <button
                onClick={handleRegenerate}
                disabled={isRegenerating}
                className="flex items-center justify-center gap-2 h-12 border border-glass-border hover:bg-glass-bg rounded-xl font-medium transition-all active:scale-[0.98] disabled:opacity-50"
              >
                <RefreshCw size={18} className={isRegenerating ? "animate-spin" : ""} />
                {isRegenerating ? "Generating..." : "Regenerate"}
              </button>
            </div>

            {/* Footer Metadata */}
            <div className="mt-8 pt-6 border-t border-glass-border flex items-center justify-between text-[11px] text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Zap size={12} className="text-accent-secondary" />
                Auto-invalidates previous keys
              </div>
              <span>Generated on {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </div>
          </div>
        </div>

        {/* Feature Highlights Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          {[
            { icon: Lock, label: "Encrypted at rest", desc: "Keys never stored in plain text." },
            { icon: RefreshCw, label: "Instant invalidation", desc: "Old keys revoked immediately." },
            { icon: ShieldCheck, label: "Rate limited", desc: "Built-in brute-force protection." }
          ].map((feature, i) => (
            <div key={i} className="p-4 rounded-2xl border border-glass-border bg-glass-bg/50">
              <div className="w-8 h-8 rounded-lg bg-accent-secondary/10 flex items-center justify-center mb-3">
                <feature.icon className="text-accent-secondary" size={16} />
              </div>
              <h4 className="text-xs font-bold mb-1">{feature.label}</h4>
              <p className="text-[10px] text-muted-foreground leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
