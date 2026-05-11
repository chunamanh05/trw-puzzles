"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MapPin, 
  Phone, 
  Clock, 
  ArrowRight, 
  ExternalLink, 
  Navigation, 
  ArrowLeft,
  Check,
  Building2,
  Globe
} from "lucide-react";
import Link from "next/link";
import { cn } from "../../lib/utils";

// --- TYPES ---
interface BranchConfig {
  id: string;
  city: string;
  name: string;
  address: string;
  phone: string;
  hours: string;
  mapUrl: string;
}

const BRANCHES: BranchConfig[] = [
  {
    id: "hn",
    city: "Hà Nội",
    name: "Capital Hub — Hoàn Kiếm",
    address: "15 Ngô Quyền, Tràng Tiền, Hoàn Kiếm, Hà Nội",
    phone: "024 3934 1000",
    hours: "08:00 AM — 09:00 PM",
    mapUrl: "https://goo.gl/maps/hanoi"
  },
  {
    id: "hcm",
    city: "TP. Hồ Chí Minh",
    name: "Sài Gòn Center — Quận 1",
    address: "65 Lê Lợi, Bến Nghé, Quận 1, TP. HCM",
    phone: "028 3821 1000",
    hours: "09:00 AM — 10:00 PM",
    mapUrl: "https://goo.gl/maps/saigon"
  },
  {
    id: "dn",
    city: "Đà Nẵng",
    name: "Danang Point — Hải Châu",
    address: "248 Trần Phú, Phước Ninh, Hải Châu, Đà Nẵng",
    phone: "023 6382 1000",
    hours: "08:30 AM — 09:30 PM",
    mapUrl: "https://goo.gl/maps/danang"
  }
];

const STORAGE_KEY = "trw-puzzle-88-selected-branch";

export default function Puzzle88BranchSwitcher() {
  const [selectedId, setSelectedId] = useState<string>("hn");
  const [isLoaded, setIsLoaded] = useState(false);

  // --- PERSISTENCE ---
  useEffect(() => {
    // Load from localStorage on mount
    const savedId = localStorage.getItem(STORAGE_KEY);
    if (savedId && BRANCHES.some(b => b.id === savedId)) {
      setSelectedId(savedId);
    }
    setIsLoaded(true);
  }, []);

  const handleBranchSelect = (id: string) => {
    setSelectedId(id);
    localStorage.setItem(STORAGE_KEY, id);
  };

  const activeBranch = useMemo(() => 
    BRANCHES.find(b => b.id === selectedId) || BRANCHES[0],
  [selectedId]);

  return (
    <div className="min-h-screen bg-[#030712] text-white font-sans selection:bg-orange-500/30 flex flex-col overflow-hidden">
      
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-orange-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-blue-600/5 blur-[150px] rounded-full" />
      </div>

      {/* Header */}
      <header className="relative z-20 p-8 flex items-center justify-between">
        <Link href="/" className="p-3 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all text-white/40 hover:text-white group">
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        </Link>
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-[10px] font-black text-orange-400 uppercase tracking-[0.2em]">
            <Globe size={14} className="fill-current" /> Store Locator
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-6 lg:p-12 relative z-10">
        
        <div className="w-full max-w-4xl space-y-12">
          
          {/* Title Section */}
          <div className="text-center space-y-4">
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight italic uppercase">
              Find Our <span className="text-orange-500">Location</span>
            </h1>
            <p className="text-white/40 font-medium max-w-md mx-auto">
              Select a city below to view specific branch contact details and opening hours.
            </p>
          </div>

          {/* BRANCH SELECTOR (Tabs) */}
          <div className="flex flex-wrap justify-center gap-4">
            {BRANCHES.map((branch) => (
              <button
                key={branch.id}
                onClick={() => handleBranchSelect(branch.id)}
                className={cn(
                  "px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all relative overflow-hidden border",
                  selectedId === branch.id 
                    ? "bg-orange-500 text-black border-orange-400 shadow-xl shadow-orange-500/20" 
                    : "bg-white/5 text-white/40 border-white/5 hover:border-white/10 hover:text-white"
                )}
              >
                {branch.city}
                {selectedId === branch.id && (
                   <motion.div 
                    layoutId="tab-highlight"
                    className="absolute inset-0 bg-white/10"
                   />
                )}
              </button>
            ))}
          </div>

          {/* CONTACT DETAILS CARD */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-12 gap-8"
            >
              {/* Main Info */}
              <div className="md:col-span-7 p-10 rounded-[3rem] bg-white/[0.03] border border-white/10 space-y-10 relative overflow-hidden group">
                <div className="absolute -bottom-10 -right-10 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Building2 size={240} />
                </div>

                <div>
                  <h2 className="text-3xl font-black tracking-tight mb-2 flex items-center gap-3">
                    {activeBranch.name}
                  </h2>
                  <div className="flex items-center gap-2 text-orange-500/60 text-[10px] font-black uppercase tracking-widest">
                    <Check size={14} /> Official Branch
                  </div>
                </div>

                <div className="space-y-6 relative z-10">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-orange-500 shrink-0">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-1">Address</p>
                      <p className="font-bold text-white/80 leading-relaxed">{activeBranch.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-orange-500 shrink-0">
                      <Phone size={24} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-1">Direct Line</p>
                      <p className="font-bold text-white/80 text-xl">{activeBranch.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-orange-500 shrink-0">
                      <Clock size={24} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-1">Opening Hours</p>
                      <p className="font-bold text-white/80 leading-relaxed">{activeBranch.hours}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Sidebar */}
              <div className="md:col-span-5 flex flex-col gap-6">
                <div className="flex-1 p-8 rounded-[3rem] bg-orange-500/10 border border-orange-500/20 flex flex-col justify-between">
                  <div className="space-y-4">
                    <h3 className="text-xl font-black italic uppercase">Visit Us in {activeBranch.city}</h3>
                    <p className="text-sm text-white/50 font-medium leading-relaxed">
                      Lựa chọn chi nhánh này đã được lưu cho lần truy cập sau của bạn. Chúng tôi luôn sẵn sàng đón tiếp!
                    </p>
                  </div>
                  <div className="space-y-4 mt-8">
                    <a 
                      href={activeBranch.mapUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-full py-5 bg-white text-black font-black text-xs uppercase tracking-widest rounded-2xl flex items-center justify-center gap-3 hover:bg-orange-400 transition-all shadow-xl active:scale-95"
                    >
                      <Navigation size={18} fill="currentColor" /> Get Directions
                    </a>
                    <button className="w-full py-5 bg-white/5 border border-white/10 text-white font-black text-xs uppercase tracking-widest rounded-2xl flex items-center justify-center gap-3 hover:bg-white/10 transition-all">
                      <ExternalLink size={18} /> Visit Branch Page
                    </button>
                  </div>
                </div>

                <div className="p-8 rounded-[3rem] bg-white/[0.03] border border-white/10 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-1">Location ID</p>
                    <p className="font-bold uppercase">{activeBranch.id}-0088</p>
                  </div>
                  <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/20">
                    <ArrowRight size={20} />
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

        </div>

      </main>

      <footer className="relative z-20 p-8 border-t border-white/5 text-center">
        <p className="text-[10px] font-black uppercase tracking-widest text-white/10">
          BranchFlow System &copy; Global Franchise Network 2026
        </p>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        body { background: #030712; }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #1f2937; border-radius: 10px; }
      `}} />

    </div>
  );
}
