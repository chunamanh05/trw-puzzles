"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Command, 
  Search, 
  Moon, 
  Sun, 
  Home, 
  Link as LinkIcon, 
  Cpu, 
  CornerDownLeft, 
  Terminal,
  ArrowRight,
  ArrowLeft
} from "lucide-react";
import Link from "next/link";
import { cn } from "../../lib/utils";

const COMMANDS = [
  { id: "home", title: "Go to Home", subtitle: "Navigate back to the main lobby", icon: Home, shortcut: "G H", action: (router: any) => window.location.href = "/" },
  { id: "theme", title: "Toggle Theme", subtitle: "Switch between light and dark mode", icon: Sun, shortcut: "T T", action: () => document.documentElement.classList.toggle("dark") },
  { id: "copy", title: "Copy Page URL", subtitle: "Copy current URL to clipboard", icon: LinkIcon, shortcut: "C U", action: () => { navigator.clipboard.writeText(window.location.href); alert("Copied to clipboard!"); } },
  { id: "sys", title: "System Status", subtitle: "Check current system performance", icon: Cpu, shortcut: "S S", action: () => alert("System: 100% Stable. All nodes active.") },
  { id: "terminal", title: "Open Terminal", subtitle: "Access the hidden console interface", icon: Terminal, shortcut: "O T", action: () => alert("Terminal access granted.") },
];

export default function Puzzle73CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter commands based on query
  const filteredCommands = useMemo(() => {
    return COMMANDS.filter(cmd => 
      cmd.title.toLowerCase().includes(query.toLowerCase()) || 
      cmd.subtitle.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle palette with Ctrl+K or Cmd+K
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }

      if (!isOpen) return;

      // Navigation
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % filteredCommands.length);
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + filteredCommands.length) % filteredCommands.length);
      }
      if (e.key === "Enter") {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].action();
          setIsOpen(false);
        }
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredCommands, selectedIndex]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 10);
      setSelectedIndex(0);
      setQuery("");
    }
  }, [isOpen]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] text-slate-900 dark:text-white transition-colors duration-500 flex flex-col items-center justify-center p-6">
      
      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-xl w-full text-center space-y-8">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          className="w-20 h-20 bg-indigo-600 rounded-3xl flex items-center justify-center text-white mx-auto shadow-2xl shadow-indigo-500/20"
        >
          <Command size={40} />
        </motion.div>
        
        <div className="space-y-4">
          <h1 className="text-4xl font-black tracking-tight uppercase">Nexus Command</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
            Unleash the full potential of productivity. Press <kbd className="px-2 py-1 bg-white dark:bg-white/10 border border-slate-200 dark:border-white/10 rounded shadow-sm font-mono text-sm">Ctrl + K</kbd> to begin.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 pt-8">
          <Link href="/" className="px-6 py-3 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:scale-105 transition-all">
            <ArrowLeft size={16} /> Back to Lobby
          </Link>
          <button 
            onClick={() => setIsOpen(true)}
            className="px-6 py-3 bg-indigo-600 text-white rounded-2xl text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:scale-105 transition-all shadow-xl shadow-indigo-500/20"
          >
            Open Menu <Search size={16} />
          </button>
        </div>
      </div>

      {/* Command Palette Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
            />

            {/* Palette Panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="relative w-full max-w-2xl bg-white dark:bg-[#0f172a] rounded-[2rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.5)] border border-white/10 overflow-hidden"
            >
              {/* Search Bar */}
              <div className="relative p-6 border-b border-slate-100 dark:border-white/5 flex items-center gap-4">
                <Search className="text-slate-400" size={24} />
                <input 
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="What would you like to do?..."
                  className="w-full bg-transparent outline-none text-xl font-medium placeholder:text-slate-400"
                />
                <div className="flex items-center gap-1.5">
                  <span className="px-2 py-1 bg-slate-100 dark:bg-white/5 rounded text-[10px] font-mono text-slate-400 uppercase">ESC</span>
                </div>
              </div>

              {/* Commands List */}
              <div className="max-h-[60vh] overflow-y-auto p-4 custom-scrollbar">
                {filteredCommands.length > 0 ? (
                  <div className="space-y-1">
                    {filteredCommands.map((cmd, i) => (
                      <button
                        key={cmd.id}
                        onMouseEnter={() => setSelectedIndex(i)}
                        onClick={() => { cmd.action(); setIsOpen(false); }}
                        className={cn(
                          "w-full flex items-center gap-4 p-4 rounded-2xl transition-all text-left group",
                          selectedIndex === i ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" : "hover:bg-slate-50 dark:hover:bg-white/5"
                        )}
                      >
                        <div className={cn(
                          "w-12 h-12 rounded-xl flex items-center justify-center transition-colors",
                          selectedIndex === i ? "bg-white/20" : "bg-slate-100 dark:bg-white/5 text-slate-400 group-hover:text-indigo-600"
                        )}>
                          <cmd.icon size={24} />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-sm">{cmd.title}</h4>
                          <p className={cn("text-xs transition-colors", selectedIndex === i ? "text-white/60" : "text-slate-400")}>
                            {cmd.subtitle}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          {selectedIndex === i && (
                            <motion.div initial={{ x: -10, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
                              <CornerDownLeft size={16} className="text-white/40" />
                            </motion.div>
                          )}
                          <span className={cn(
                            "px-2 py-1 rounded text-[10px] font-mono transition-colors",
                            selectedIndex === i ? "bg-white/20 text-white" : "bg-slate-100 dark:bg-white/5 text-slate-400"
                          )}>
                            {cmd.shortcut}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="py-20 text-center space-y-4">
                    <div className="w-16 h-16 bg-slate-100 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto text-slate-300">
                      <Search size={32} />
                    </div>
                    <p className="text-slate-400 font-medium uppercase tracking-widest text-[10px]">No commands found</p>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="bg-slate-50 dark:bg-black/20 p-4 px-8 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                <div className="flex items-center gap-6">
                  <span className="flex items-center gap-1.5"><span className="px-1.5 py-0.5 bg-slate-200 dark:bg-white/10 rounded text-slate-600 dark:text-slate-400">↑↓</span> NAVIGATE</span>
                  <span className="flex items-center gap-1.5"><span className="px-1.5 py-0.5 bg-slate-200 dark:bg-white/10 rounded text-slate-600 dark:text-slate-400">ENTER</span> SELECT</span>
                </div>
                <span className="flex items-center gap-2">NEXUS_OS v1.0 <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /></span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
      `}</style>
    </div>
  );
}
