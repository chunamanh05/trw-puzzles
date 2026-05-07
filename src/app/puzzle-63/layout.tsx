"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { LayoutDashboard, Database, Network, Cpu, ArrowLeft } from "lucide-react";
import { cn } from "../../lib/utils";

export default function NexusQLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", path: "/puzzle-63", icon: LayoutDashboard },
    { name: "Allocator", path: "/puzzle-63/allocator", icon: Database },
    { name: "Network", path: "/puzzle-63/network", icon: Network },
  ];

  return (
    <div className="min-h-screen bg-[#0f172a] text-white font-sans selection:bg-[#00f0ff]/30">
      {/* Top Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0f172a]/80 backdrop-blur-xl border-b border-white/5 px-8 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="mr-4 text-white/40 hover:text-white transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div className="w-10 h-10 bg-[#00f0ff] rounded-lg flex items-center justify-center text-black shadow-[0_0_20px_rgba(0,240,255,0.4)]">
            <Cpu size={24} />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tighter leading-none">Nexus-Q</h1>
            <p className="text-[10px] text-white/40 font-mono tracking-widest uppercase">Quantum Computing</p>
          </div>
        </div>

        <div className="flex items-center gap-1 bg-black/40 p-1.5 rounded-xl border border-white/5">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link 
                key={item.path} 
                href={item.path}
                className={cn(
                  "flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all relative",
                  isActive ? "text-[#00f0ff]" : "text-white/40 hover:text-white/70"
                )}
              >
                {isActive && (
                  <motion.div 
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-[#00f0ff]/10 rounded-lg border border-[#00f0ff]/20"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <item.icon size={16} />
                {item.name}
              </Link>
            );
          })}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <div className="text-right">
            <p className="text-[10px] text-white/40 font-mono">STATUS</p>
            <p className="text-xs font-bold text-green-400">ACTIVE_GRID</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10" />
        </div>
      </nav>

      <main className="pt-20">
        {children}
      </main>

      {/* Background Glows */}
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-[#6a2be2]/20 blur-[120px] rounded-full -z-10 pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-[600px] h-[600px] bg-[#00f0ff]/10 blur-[150px] rounded-full -z-10 pointer-events-none" />
    </div>
  );
}
