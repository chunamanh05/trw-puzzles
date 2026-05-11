"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Clock, 
  Phone, 
  Calendar, 
  ArrowRight, 
  AlertTriangle, 
  CheckCircle2, 
  MapPin,
  ArrowLeft,
  Zap,
  Moon,
  Sun,
  ShieldCheck,
  ChevronRight
} from "lucide-react";
import Link from "next/link";
import { cn } from "../../lib/utils";

// --- CONFIGURATION ---
interface BusinessHour {
  open: string;
  close: string;
  isClosed?: boolean;
}

const HOURS_CONFIG: Record<number, BusinessHour> = {
  1: { open: "07:00", close: "18:00" }, // Monday
  2: { open: "07:00", close: "18:00" }, // Tuesday
  3: { open: "07:00", close: "18:00" }, // Wednesday
  4: { open: "07:00", close: "18:00" }, // Thursday
  5: { open: "07:00", close: "17:00" }, // Friday
  6: { open: "08:00", close: "14:00" }, // Saturday
  0: { open: "00:00", close: "00:00", isClosed: true }, // Sunday
};

const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// --- UTILS ---
const timeToMinutes = (time: string): number => {
  const [hh, mm] = time.split(":").map(Number);
  return hh * 60 + mm;
};

export default function Puzzle86HourGuard() {
  const [now, setNow] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  // Tick every 10 seconds
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 10000);
    return () => clearInterval(timer);
  }, []);

  // --- DERIVED STATUS ---
  const status = useMemo(() => {
    const day = now.getDay();
    const currentTimeMinutes = now.getHours() * 60 + now.getMinutes();
    const config = HOURS_CONFIG[day];

    if (config.isClosed) return "emergency"; // Sunday is emergency only
    
    const openMinutes = timeToMinutes(config.open);
    const closeMinutes = timeToMinutes(config.close);

    if (currentTimeMinutes >= openMinutes && currentTimeMinutes < closeMinutes) {
      return "open";
    }
    
    return "emergency";
  }, [now]);

  const currentDayName = DAY_NAMES[now.getDay()];

  return (
    <div className="min-h-screen bg-[#020912] text-white font-sans selection:bg-amber-500/30 flex flex-col items-center py-12 px-6">
      
      {/* Header Logo */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex items-center gap-2 mb-8"
      >
        <div className="w-8 h-8 rounded-lg bg-cyan-500 flex items-center justify-center text-black">
          <Zap size={18} fill="currentColor" />
        </div>
        <span className="text-xs font-black uppercase tracking-[0.3em] text-cyan-500">OpenNow</span>
      </motion.div>

      <div className="w-full max-w-xl space-y-4">
        
        {/* MAIN BUSINESS CARD */}
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-gradient-to-br from-amber-900/40 to-transparent border border-amber-500/20 rounded-[2rem] p-8 relative overflow-hidden"
        >
          {/* Status Badge */}
          <div className="absolute top-8 right-8">
            <div className={cn(
              "px-4 py-1.5 rounded-full flex items-center gap-2 text-[10px] font-black uppercase tracking-widest backdrop-blur-md border",
              status === "open" ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-400" : "bg-amber-500/10 border-amber-500/40 text-amber-400"
            )}>
              <div className={cn("w-1.5 h-1.5 rounded-full animate-pulse", status === "open" ? "bg-emerald-400" : "bg-amber-400")} />
              {status === "open" ? "Open Now" : "After Hours"}
            </div>
          </div>

          <div className="flex items-center gap-2 text-amber-500/60 text-[10px] font-black uppercase tracking-widest mb-4">
            <ShieldCheck size={14} /> Emergency Plumber
          </div>

          <h1 className="text-4xl font-black tracking-tighter mb-2">ProFlow Plumbing</h1>
          <p className="text-white/40 text-sm font-medium mb-8">Fast. Reliable. Always there when you need us.</p>

          <div className="flex flex-wrap gap-6 text-[10px] font-bold text-white/30 uppercase tracking-widest">
            <div className="flex items-center gap-2">
              <Clock size={14} /> {now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} — {currentDayName}
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={14} /> 42 Waterworks Lane, Auckland CBD
            </div>
          </div>
        </motion.div>

        {/* EMERGENCY ACTION BLOCK */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white/[0.03] border border-white/5 rounded-[2rem] p-8 space-y-6"
        >
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/40 shrink-0">
              <Phone size={20} />
            </div>
            <p className="text-sm text-white/50 leading-relaxed font-medium">
              24/7 emergency callout available for <span className="text-white font-bold">burst pipes, flooding,</span> and major leaks.
            </p>
          </div>

          <button className="w-full py-5 bg-amber-500 hover:bg-amber-400 text-black font-black text-xs uppercase tracking-widest rounded-2xl flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(245,158,11,0.3)] transition-all active:scale-95">
            <Zap size={16} fill="currentColor" /> Request Emergency Callout — 0800 999 123
          </button>
          
          <p className="text-center text-[9px] font-bold text-white/20 uppercase tracking-widest">
            Emergency rates apply. Fully licensed technicians.
          </p>
        </motion.div>

        {/* WEEKLY SCHEDULE */}
        <div className="bg-white/[0.03] border border-white/5 rounded-[2rem] p-8 pb-4">
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/30 mb-6 px-2">
            <Calendar size={14} /> Business Hours
          </div>

          <div className="space-y-1">
            {DAY_NAMES.map((dayName, idx) => {
              const config = HOURS_CONFIG[idx];
              const isToday = now.getDay() === idx;
              
              return (
                <button 
                  key={dayName}
                  onClick={() => setSelectedDay(idx)}
                  className={cn(
                    "w-full flex items-center justify-between p-4 rounded-xl transition-all group",
                    isToday ? "bg-cyan-500/10 text-cyan-400" : "hover:bg-white/5 text-white/40 hover:text-white"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold">{dayName}</span>
                    {isToday && <span className="text-[10px] font-black uppercase bg-cyan-500 text-black px-2 py-0.5 rounded">Today</span>}
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-bold">
                      {config.isClosed ? "Closed" : `${config.open} AM — ${config.close.replace('18:00', '6:00 PM').replace('17:00', '5:00 PM').replace('14:00', '2:00 PM')}`}
                    </span>
                    <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer Info */}
        <div className="text-center pt-4">
          <p className="text-[10px] font-bold text-white/10 uppercase tracking-widest">
            Hours are displayed in your local time • Emergency support available 24/7
          </p>
        </div>
      </div>

      {/* Selected Day Modal (Interactive) */}
      <AnimatePresence>
        {selectedDay !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6"
            onClick={() => setSelectedDay(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-slate-900 border border-white/10 p-8 rounded-[2.5rem] max-w-sm w-full space-y-6"
              onClick={e => e.stopPropagation()}
            >
              <h3 className="text-2xl font-black tracking-tight italic uppercase">Book for {DAY_NAMES[selectedDay]}?</h3>
              <p className="text-white/50 text-sm font-medium leading-relaxed">
                Bạn muốn đặt lịch hẹn trước cho ngày <span className="text-white">{DAY_NAMES[selectedDay]}</span>? Đội ngũ của chúng tôi sẽ sẵn sàng từ <span className="text-white">{HOURS_CONFIG[selectedDay].open} AM</span>.
              </p>
              <div className="flex flex-col gap-3">
                <button className="w-full py-4 bg-cyan-500 text-black font-black text-xs uppercase tracking-widest rounded-xl hover:bg-cyan-400">Confirm Booking</button>
                <button onClick={() => setSelectedDay(null)} className="w-full py-4 bg-white/5 text-white/40 font-black text-xs uppercase tracking-widest rounded-xl hover:bg-white/10">Close</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{ __html: `
        body { background: #020912; }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 10px; }
      `}} />
    </div>
  );
}
