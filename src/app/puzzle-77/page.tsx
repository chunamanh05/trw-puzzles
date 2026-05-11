// @ts-nocheck
"use client";

import React, { useState, useEffect, CSSProperties } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Palette, Sun, Moon, CornerUpRight, Type, RotateCcw, 
  LayoutDashboard, Settings, Users, PieChart, ArrowLeft, ChevronRight, Monitor 
} from "lucide-react";
import Link from "next/link";
import { cn } from "../../lib/utils";

// Theme presets
const ACCENT_COLORS = [
  { name: "Indigo", value: "#6366f1" },
  { name: "Emerald", value: "#10b981" },
  { name: "Rose", value: "#f43f5e" },
  { name: "Amber", value: "#f59e0b" },
  { name: "Violet", value: "#8b5cf6" },
];

const FONTS = [
  { name: "Sans", family: "var(--font-geist-sans), system-ui, sans-serif" },
  { name: "Serif", family: "Georgia, serif" },
  { name: "Mono", family: "ui-monospace, monospace" },
];

const DEFAULT_THEME = {
  accent: "#6366f1",
  radius: 12,
  isDark: false,
  font: "var(--font-geist-sans), system-ui, sans-serif",
};

export default function Puzzle77ThemeCustomizer() {
  const [theme, setTheme] = useState(DEFAULT_THEME);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("studio_x_theme");
    if (saved) {
      setTheme(JSON.parse(saved));
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("studio_x_theme", JSON.stringify(theme));
    }
  }, [theme, isLoaded]);

  const resetTheme = () => setTheme(DEFAULT_THEME);

  if (!isLoaded) return null;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans p-6 selection:bg-indigo-100 flex flex-col md:flex-row gap-8">
      
      {/* Lobby Link */}
      <Link href="/" className="fixed top-6 left-6 z-50 p-3 bg-white border border-slate-200 rounded-2xl shadow-sm hover:text-indigo-600 transition-colors">
        <ArrowLeft size={20} />
      </Link>

      {/* Main Preview Area */}
      <main className="flex-1 min-h-[80vh] flex flex-col items-center justify-center">
        <div className="w-full max-w-4xl space-y-6">
          <div className="flex items-center gap-2 mb-4 text-slate-400">
            <Monitor size={16} />
            <span className="text-xs font-black uppercase tracking-[0.3em]">Live Preview Environment</span>
          </div>

          <div 
            style={{ 
              "--accent": theme.accent, 
              "--radius": `${theme.radius}px`,
              "--font-family": theme.font,
            } as CSSProperties}
            className={cn(
              "w-full rounded-[var(--radius)] transition-all duration-500 shadow-2xl overflow-hidden flex flex-col border",
              theme.isDark ? "bg-[#0f172a] border-white/5 text-white" : "bg-white border-slate-100 text-slate-900"
            )}
          >
            {/* Dashboard Mock Navbar */}
            <nav className={cn(
              "p-6 flex justify-between items-center border-b",
              theme.isDark ? "border-white/5" : "border-slate-50"
            )} style={{ fontFamily: "var(--font-family)" }}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-[calc(var(--radius)/2)] bg-[var(--accent)] flex items-center justify-center text-white">
                  <LayoutDashboard size={18} />
                </div>
                <span className="font-black text-lg tracking-tighter">Studio-X <span style={{ color: "var(--accent)" }}>CMS</span></span>
              </div>
              <div className="flex gap-4">
                {[1, 2, 3].map(i => <div key={i} className={cn("w-8 h-8 rounded-full", theme.isDark ? "bg-white/5" : "bg-slate-100")} />)}
              </div>
            </nav>

            {/* Dashboard Mock Content */}
            <div className="p-8 grid grid-cols-1 md:grid-cols-12 gap-6" style={{ fontFamily: "var(--font-family)" }}>
              {/* Sidebar Mock */}
              <div className="md:col-span-3 space-y-2">
                {[
                  { label: "Overview", icon: PieChart, active: true },
                  { label: "Customers", icon: Users },
                  { label: "Settings", icon: Settings },
                ].map((item) => (
                  <div 
                    key={item.label}
                    className={cn(
                      "flex items-center gap-3 p-3 rounded-[calc(var(--radius)/1.5)] text-sm font-bold transition-all",
                      item.active 
                        ? "bg-[var(--accent)] text-white shadow-lg" 
                        : theme.isDark ? "hover:bg-white/5 text-white/40" : "hover:bg-slate-50 text-slate-400"
                    )}
                  >
                    <item.icon size={18} />
                    {item.label}
                  </div>
                ))}
              </div>

              {/* Main Content Mock */}
              <div className="md:col-span-9 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: "Total Revenue", val: "$45,231.89", trend: "+20.1%" },
                    { label: "Subscriptions", val: "+2350", trend: "+180.1%" },
                  ].map((stat) => (
                    <div key={stat.label} className={cn(
                      "p-6 rounded-[var(--radius)] border flex flex-col gap-1",
                      theme.isDark ? "bg-white/5 border-white/5" : "bg-slate-50 border-slate-100"
                    )}>
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{stat.label}</span>
                      <div className="text-2xl font-black">{stat.val}</div>
                      <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-tighter">{stat.trend} from last month</span>
                    </div>
                  ))}
                </div>

                <div className={cn(
                  "p-8 rounded-[var(--radius)] border space-y-6",
                  theme.isDark ? "bg-white/5 border-white/5" : "bg-slate-50 border-slate-100"
                )}>
                  <div className="space-y-2">
                    <h3 className="text-xl font-black tracking-tight">System Status</h3>
                    <p className={cn("text-xs leading-relaxed", theme.isDark ? "text-white/40" : "text-slate-400")}>
                      All systems are operating normally. Your accent color is currently set to <span style={{ color: "var(--accent)" }}>{theme.accent}</span>.
                    </p>
                  </div>
                  <button 
                    className="px-6 py-3 rounded-[calc(var(--radius)/1.5)] bg-[var(--accent)] text-white text-xs font-black uppercase tracking-widest shadow-xl transition-all hover:scale-105 active:scale-95"
                    style={{ shadowColor: "var(--accent)" }}
                  >
                    Execute Command
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Customizer Sidebar */}
      <aside className="w-full md:w-96 bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-2xl overflow-hidden flex flex-col gap-10">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-900 rounded-2xl flex items-center justify-center text-white">
              <Palette size={20} />
            </div>
            <h2 className="text-2xl font-black tracking-tighter">Studio-X</h2>
          </div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Interface Studio</p>
        </div>

        <div className="space-y-8 flex-1">
          {/* Accent Color */}
          <div className="space-y-4">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
              <Palette size={14} /> Accent Color
            </label>
            <div className="flex flex-wrap gap-3">
              {ACCENT_COLORS.map((color) => (
                <button
                  key={color.value}
                  onClick={() => setTheme({ ...theme, accent: color.value })}
                  className={cn(
                    "w-10 h-10 rounded-xl transition-all hover:scale-110",
                    theme.accent === color.value ? "ring-4 ring-slate-100 border-2 border-white scale-110" : ""
                  )}
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          {/* Border Radius */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                <CornerUpRight size={14} /> Border Radius
              </label>
              <span className="text-xs font-black text-slate-900">{theme.radius}px</span>
            </div>
            <input 
              type="range" min="0" max="32" step="2"
              value={theme.radius}
              onChange={(e) => setTheme({ ...theme, radius: parseInt(e.target.value) })}
              className="w-full accent-slate-900"
            />
          </div>

          {/* Theme Mode */}
          <div className="space-y-4">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
              <Sun size={14} /> Theme Mode
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setTheme({ ...theme, isDark: false })}
                className={cn(
                  "p-4 rounded-2xl flex flex-col items-center gap-2 border-2 transition-all",
                  !theme.isDark ? "border-slate-900 bg-slate-900 text-white" : "border-slate-100 hover:border-slate-200"
                )}
              >
                <Sun size={18} />
                <span className="text-[10px] font-black uppercase">Light</span>
              </button>
              <button
                onClick={() => setTheme({ ...theme, isDark: true })}
                className={cn(
                  "p-4 rounded-2xl flex flex-col items-center gap-2 border-2 transition-all",
                  theme.isDark ? "border-slate-900 bg-slate-900 text-white" : "border-slate-100 hover:border-slate-200"
                )}
              >
                <Moon size={18} />
                <span className="text-[10px] font-black uppercase">Dark</span>
              </button>
            </div>
          </div>

          {/* Font Family */}
          <div className="space-y-4">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
              <Type size={14} /> Typography
            </label>
            <div className="flex gap-2">
              {FONTS.map((font) => (
                <button
                  key={font.name}
                  onClick={() => setTheme({ ...theme, font: font.family })}
                  className={cn(
                    "flex-1 p-3 rounded-xl border-2 text-[10px] font-black uppercase transition-all",
                    theme.font === font.family ? "border-slate-900 bg-slate-900 text-white" : "border-slate-100 hover:border-slate-200"
                  )}
                >
                  {font.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <button 
          onClick={resetTheme}
          className="w-full p-4 bg-slate-50 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2"
        >
          <RotateCcw size={14} /> Reset to Default
        </button>
      </aside>

      {/* Decorative Index */}
      <div className="fixed bottom-10 right-10 text-[20vh] font-black text-slate-200/40 select-none pointer-events-none -z-20 uppercase">
        Theme
      </div>
    </div>
  );
}
