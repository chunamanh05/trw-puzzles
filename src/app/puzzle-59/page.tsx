"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Send, 
  ArrowLeft, 
  Maximize2, 
  ChevronLeft, 
  ChevronRight, 
  ExternalLink,
  Sparkles,
  Bot,
  User,
  LayoutDashboard,
  Smartphone,
  LineChart,
  Cpu
} from "lucide-react";
import Link from "next/link";
import { cn } from "../../lib/utils";
import { Button } from "../../components/ui/button";

interface Message {
  role: "user" | "assistant";
  content: string;
  buttons?: string[];
  showCarousel?: boolean;
}

const SERVICES = [
  {
    id: 1,
    title: "Digital Platforms",
    subtitle: "SYSTEM_MODULE",
    desc: "High-performance Websites, Web Platforms, and Mobile Apps designed to convert traffic into revenue.",
    icon: LayoutDashboard,
    color: "from-cyan-500 to-blue-600",
  },
  {
    id: 2,
    title: "Conversion Apps",
    subtitle: "MOBILE_DEPLOY",
    desc: "Native and cross-platform mobile experiences that keep your users engaged and buying.",
    icon: Smartphone,
    color: "from-rose-500 to-purple-600",
  },
  {
    id: 3,
    title: "Growth Dashboards",
    subtitle: "REVENUE_ANALYTICS",
    desc: "Real-time data visualization that helps you make informed decisions to scale your business.",
    icon: LineChart,
    color: "from-green-500 to-emerald-600",
  },
  {
    id: 4,
    title: "AI Automation",
    subtitle: "NEXUS_CORE",
    desc: "Intelligent workflows that handle repetitive tasks, saving your team 10+ hours weekly.",
    icon: Cpu,
    color: "from-amber-500 to-orange-600",
  },
];

export default function Puzzle59ProAgent() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "SAVANNAH: System re-initialized. I'm ready for new instructions. Would you like to see our core service modules?",
      buttons: ["Show Services", "How AI saves time"]
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentServiceIdx, setCurrentServiceIdx] = useState(0);
  const [showCarouselOverlay, setShowCarouselOverlay] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const parseAIResponse = (text: string): Message => {
    let content = text;
    let buttons: string[] = [];
    let showCarousel = false;

    const buttonMatch = content.match(/\[BUTTONS:\s*(.*?)\]/);
    if (buttonMatch) {
      buttons = buttonMatch[1].split(",").map(b => b.trim());
      content = content.replace(buttonMatch[0], "");
    }

    if (content.includes("[SHOW_SERVICES]")) {
      showCarousel = true;
      content = content.replace("[SHOW_SERVICES]", "");
    }

    return { role: "assistant", content: content.trim(), buttons, showCarousel };
  };

  const handleSend = async (text: string) => {
    if (!text.trim()) return;
    if (text === "Show Services") {
      setShowCarouselOverlay(true);
    }

    const userMsg: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat-pro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMsg].map(m => ({ role: m.role, content: m.content })) }),
      });

      const data = await response.json();
      const parsedMsg = parseAIResponse(data.content || data.message || "");
      
      setMessages((prev) => [...prev, parsedMsg]);
      
      if (parsedMsg.showCarousel) {
        setShowCarouselOverlay(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#fcfcfc] flex items-center justify-center p-4 md:p-10 font-sans selection:bg-cyan-500/30">
      
      {/* Back Button */}
      <nav className="fixed top-8 left-8 z-50">
        <Link href="/" className="text-xs font-mono text-muted-foreground hover:text-cyan-400 transition-colors flex items-center gap-2">
          <ArrowLeft size={14} /> Lobby
        </Link>
      </nav>

      <div className="w-full max-w-6xl h-[85vh] bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row shadow-[0_0_50px_rgba(0,0,0,0.5)]">
        
        {/* Left Panel: Contextual UI (Carousel) */}
        <div className="hidden md:flex flex-1 bg-black/40 border-r border-white/5 relative items-center justify-center p-12 overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_50%_50%,#00ffff22,transparent_70%)]" />
          
          <AnimatePresence mode="wait">
            {!showCarouselOverlay ? (
              <motion.div 
                key="empty"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="text-center space-y-6 relative z-10"
              >
                <div className="w-20 h-20 bg-cyan-500/10 rounded-3xl flex items-center justify-center text-cyan-400 mx-auto animate-pulse">
                  <Sparkles size={40} />
                </div>
                <h2 className="text-2xl font-bold tracking-tight">AI Assistant <span className="text-cyan-400">Pro</span></h2>
                <p className="text-white/40 text-sm max-w-xs mx-auto italic">Waiting for instructions to display interactive modules...</p>
              </motion.div>
            ) : (
              <motion.div 
                key="carousel"
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                className="w-full h-full flex flex-col justify-center"
              >
                <header className="mb-8 flex justify-between items-end">
                  <div>
                    <p className="text-cyan-400 text-[10px] font-mono tracking-widest uppercase mb-1">Service Module {currentServiceIdx + 1}/{SERVICES.length}</p>
                    <h2 className="text-3xl font-black uppercase tracking-tighter">Capabilities</h2>
                  </div>
                  <button onClick={() => setShowCarouselOverlay(false)} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                    <ArrowLeft size={20} className="text-white/20" />
                  </button>
                </header>

                <div className="relative h-96 group">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentServiceIdx}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.05 }}
                      className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent border border-white/10 rounded-[2rem] p-10 flex flex-col items-center text-center justify-center space-y-6"
                    >
                      <div className={cn("w-20 h-20 rounded-3xl bg-gradient-to-br flex items-center justify-center text-white shadow-xl", SERVICES[currentServiceIdx].color)}>
                        {React.createElement(SERVICES[currentServiceIdx].icon, { size: 40 })}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold">{SERVICES[currentServiceIdx].title}</h3>
                        <p className="text-cyan-400 text-[10px] font-mono tracking-widest mb-4">{SERVICES[currentServiceIdx].subtitle}</p>
                        <p className="text-white/50 text-sm leading-relaxed max-w-sm">{SERVICES[currentServiceIdx].desc}</p>
                      </div>
                      <Button className="bg-cyan-500 hover:bg-cyan-600 text-black font-bold px-8 rounded-full gap-2">
                        Build Platform <ExternalLink size={16} />
                      </Button>
                    </motion.div>
                  </AnimatePresence>

                  <button 
                    onClick={() => setCurrentServiceIdx((prev) => (prev > 0 ? prev - 1 : SERVICES.length - 1))}
                    className="absolute left-[-20px] top-1/2 -translate-y-1/2 w-10 h-10 bg-black border border-white/10 rounded-full flex items-center justify-center hover:bg-cyan-500 hover:text-black transition-all shadow-xl"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button 
                    onClick={() => setCurrentServiceIdx((prev) => (prev < SERVICES.length - 1 ? prev + 1 : 0))}
                    className="absolute right-[-20px] top-1/2 -translate-y-1/2 w-10 h-10 bg-black border border-white/10 rounded-full flex items-center justify-center hover:bg-cyan-500 hover:text-black transition-all shadow-xl"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>

                <div className="mt-8 flex justify-center gap-2">
                  {SERVICES.map((_, i) => (
                    <div key={i} className={cn("h-1 rounded-full transition-all duration-300", i === currentServiceIdx ? "w-8 bg-cyan-500" : "w-2 bg-white/10")} />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Panel: Chat Interface */}
        <div className="flex-1 flex flex-col h-full bg-[#080808]/50">
          <header className="p-6 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-cyan-500 rounded-2xl flex items-center justify-center text-black">
                <Bot size={20} />
              </div>
              <div>
                <h3 className="font-bold text-sm">Savannah AI</h3>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-[10px] text-white/40 font-mono">ONLINE // SECURE</span>
                </div>
              </div>
            </div>
            <button className="text-white/20 hover:text-white transition-colors">
              <Maximize2 size={18} />
            </button>
          </header>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn("flex gap-4 max-w-[85%]", msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto")}
              >
                <div className={cn(
                  "w-8 h-8 rounded-xl flex items-center justify-center shrink-0",
                  msg.role === "user" ? "bg-white/10 text-white" : "bg-cyan-500/10 text-cyan-400"
                )}>
                  {msg.role === "user" ? <User size={16} /> : <Bot size={16} />}
                </div>
                <div className="space-y-3">
                  <div className={cn(
                    "p-4 rounded-2xl text-sm leading-relaxed",
                    msg.role === "user" ? "bg-cyan-500 text-black font-medium shadow-[0_0_20px_rgba(6,182,212,0.2)]" : "bg-white/5 border border-white/10 text-white/80"
                  )}>
                    {msg.content}
                  </div>
                  
                  {/* Assistant Buttons */}
                  {msg.buttons && msg.buttons.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {msg.buttons.map((btn, bi) => (
                        <button
                          key={bi}
                          onClick={() => handleSend(btn)}
                          className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[11px] font-bold hover:bg-cyan-500 hover:text-black hover:border-cyan-500 transition-all"
                        >
                          [{btn.toUpperCase()}]
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
            {isLoading && (
              <div className="flex gap-4 max-w-[85%] mr-auto">
                <div className="w-8 h-8 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
                  <Bot size={16} className="animate-spin-slow" />
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex gap-1">
                  <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" />
                  <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce delay-100" />
                  <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce delay-200" />
                </div>
              </div>
            )}
          </div>

          <footer className="p-6 border-t border-white/5 bg-black/40">
            <div className="relative">
              <input 
                type="text"
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend(input)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 pr-16 text-sm focus:outline-none focus:border-cyan-500/50 transition-all"
              />
              <button 
                onClick={() => handleSend(input)}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-cyan-500 text-black rounded-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all"
              >
                <Send size={18} />
              </button>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
