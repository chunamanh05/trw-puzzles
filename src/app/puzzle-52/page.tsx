"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Send, ArrowLeft, MoreHorizontal, Maximize2, X, Minus } from "lucide-react";
import Link from "next/link";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export default function NexusChatAgent() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "NEXUS: Hello, I'm Nexus. To better assist you, may I know your name?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: messages.concat(userMessage).map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const data = await response.json();
      if (data.error) throw new Error(data.error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.message,
          timestamp: new Date(),
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "NEXUS: [SYSTEM ERROR] Connection failed. Please check your API key in .env.local",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
      // Re-focus input
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#fcfcfc] p-4 md:p-12 font-mono selection:bg-cyan-500/30 flex flex-col items-center justify-center relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#00f5d41a_0%,transparent_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <nav className="fixed top-8 left-8 z-50">
        <Link href="/" className="text-xs text-muted-foreground hover:text-cyan-400 transition-colors flex items-center gap-2">
          <ArrowLeft size={14} /> Back to Lobby
        </Link>
      </nav>

      {/* Header Title Section */}
      <div className="text-center mb-10 relative z-10">
        <div className="flex items-center justify-center gap-4 mb-4">
           {["Websites", "Appointment Setters", "Voice Call", "Custom System", "Contact Us"].map((item) => (
             <span key={item} className="px-3 py-1 rounded-full border border-white/5 bg-white/5 text-[10px] text-muted-foreground hover:text-white transition-colors cursor-pointer">
               {item}
             </span>
           ))}
        </div>
        <h1 className="text-5xl md:text-8xl font-bold tracking-tighter text-white opacity-90">
          YOUR BUSINESS <br />
          <span className="text-white">AUTOPILOT.</span>
        </h1>
      </div>

      {/* Terminal Window */}
      <motion.div 
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="w-full max-w-3xl aspect-[4/3] bg-[#0a0a0a] rounded-xl border border-white/10 shadow-2xl overflow-hidden flex flex-col relative z-10"
      >
        {/* Window Top Bar */}
        <div className="h-10 bg-[#141414] border-b border-white/5 flex items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
          </div>
          <div className="text-[10px] text-muted-foreground tracking-widest font-bold">NEXUS@SUPPORT:~</div>
          <div className="flex items-center gap-3 text-muted-foreground">
            <Maximize2 size={12} />
          </div>
        </div>

        {/* Chat Content */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide"
          style={{ scrollBehavior: 'smooth' }}
        >
          <AnimatePresence initial={false}>
            {messages.map((msg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: msg.role === "user" ? 10 : -10 }}
                animate={{ opacity: 1, x: 0 }}
                className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-[10px] uppercase tracking-widest font-bold ${msg.role === "user" ? "text-white/40" : "text-cyan-500/60"}`}>
                    {msg.role === "user" ? "USER >" : ""}
                  </span>
                </div>
                <div className={`max-w-[85%] text-sm leading-relaxed ${msg.role === "user" ? "text-white text-right" : "text-cyan-400 font-medium"}`}>
                  {msg.content.replace("NEXUS: ", "")}
                </div>
              </motion.div>
            ))}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2 text-cyan-500/60 text-[10px] font-bold tracking-widest"
              >
                NEXUS: <span className="animate-pulse">TYPING...</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Input Bar */}
        <form 
          onSubmit={handleSendMessage}
          className="h-16 bg-[#141414] border-t border-white/5 flex items-center px-6 gap-4"
        >
          <span className="text-cyan-500 font-bold text-lg select-none">&gt;</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message here..."
            className="flex-1 bg-transparent border-none outline-none text-sm text-white placeholder:text-white/10"
            autoFocus
          />
          <button 
            type="submit"
            disabled={!input.trim() || isLoading}
            className={`transition-all ${input.trim() && !isLoading ? "text-cyan-400 hover:scale-110" : "text-white/5"}`}
          >
            <Send size={18} />
          </button>
        </form>
      </motion.div>

      {/* Footer Info */}
      <div className="fixed bottom-6 left-6 text-[10px] text-white/20 tracking-tighter flex gap-8">
        <div>SYSTEM_STATUS: <span className="text-emerald-500">ONLINE</span></div>
        <div>LATENCY: 12ms</div>
      </div>
    </div>
  );
}
