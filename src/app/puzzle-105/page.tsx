"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, Calendar, Clock, CheckCircle2, Sparkles, Layers, ArrowRight, Timer } from "lucide-react";
import Link from "next/link";

// --- Types ---
type SlotStatus = 'available' | 'booked';
interface TimeSlot { time: string; status: SlotStatus; }
interface DayAvailability { id: string; date: number; dayName: string; fullName: string; slots: TimeSlot[]; }

// --- Extended Mock Data ---
const MOCK_DAYS: DayAvailability[] = [
  {
    id: "day-1", date: 5, dayName: "TUE", fullName: "Thứ Ba",
    slots: [
      { time: "08:30", status: "booked" }, { time: "09:30", status: "available" },
      { time: "10:30", status: "available" }, { time: "11:30", status: "available" },
      { time: "13:30", status: "booked" }, { time: "14:30", status: "available" },
      { time: "15:30", status: "available" }, { time: "16:30", status: "available" },
    ]
  },
  {
    id: "day-2", date: 6, dayName: "WED", fullName: "Thứ Tư",
    slots: [
      { time: "08:30", status: "available" }, { time: "09:30", status: "available" },
      { time: "10:30", status: "available" }, { time: "11:30", status: "booked" },
      { time: "13:30", status: "available" }, { time: "14:30", status: "booked" },
      { time: "15:30", status: "available" }, { time: "16:30", status: "available" },
    ]
  },
  {
    id: "day-3", date: 7, dayName: "THU", fullName: "Thứ Năm",
    slots: [
      { time: "08:30", status: "booked" }, { time: "09:30", status: "booked" },
      { time: "10:30", status: "available" }, { time: "11:30", status: "available" },
      { time: "13:30", status: "booked" }, { time: "14:30", status: "available" },
      { time: "15:30", status: "available" }, { time: "16:30", status: "booked" },
    ]
  },
  {
    id: "day-4", date: 8, dayName: "FRI", fullName: "Thứ Sáu",
    slots: [
      { time: "08:30", status: "available" }, { time: "09:30", status: "available" },
      { time: "10:30", status: "available" }, { time: "11:30", status: "available" },
      { time: "13:30", status: "available" }, { time: "14:30", status: "available" },
      { time: "15:30", status: "available" }, { time: "16:30", status: "available" },
    ]
  }
];

export default function GlassBookingPage() {
  const [selectedDayId, setSelectedDayId] = useState(MOCK_DAYS[0].id);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [step, setStep] = useState(1); 
  const [currentTime, setCurrentTime] = useState(new Date());

  // Live Clock Effect
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const activeDay = useMemo(() => MOCK_DAYS.find(d => d.id === selectedDayId)!, [selectedDayId]);

  const timeString = currentTime.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  return (
    <main className="min-h-screen bg-[#030014] text-white flex flex-col font-sans relative overflow-hidden">
      
      {/* Background Animated Gradient */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-violet-600/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-fuchsia-600/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Nav & Live Clock */}
      <nav className="p-8 flex justify-between items-start z-10">
        <Link href="/" className="flex items-center gap-2 text-slate-500 hover:text-violet-400 transition-colors text-xs font-black uppercase tracking-widest">
          <ChevronLeft size={14} /> Hub
        </Link>
        
        <div className="flex flex-col items-end gap-2">
          <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 text-[10px] font-bold uppercase tracking-widest text-slate-400">
            <Layers size={12} className="text-violet-400" /> V.2.1 Real-time Glass
          </div>
          <div className="flex items-center gap-2 text-violet-400 font-mono text-sm bg-violet-500/10 px-3 py-1 rounded-lg border border-violet-500/20 shadow-lg shadow-violet-500/5">
            <Timer size={14} className="animate-spin-slow" /> {timeString}
          </div>
        </div>
      </nav>

      <div className="flex-1 flex items-center justify-center p-6 z-10">
        <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-12">
          
          {/* LEFT: STEP INDICATOR & TITLE */}
          <div className="lg:w-1/3 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-violet-500/10 border border-violet-500/20 rounded-lg text-violet-400 text-[10px] font-black uppercase tracking-widest">
                <Sparkles size={12} /> Bước {step} trên 3
              </div>
              <h1 className="text-7xl font-black tracking-tighter leading-none italic">
                LIVE<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400 underline decoration-violet-500/30">SLOTS.</span>
              </h1>
              <p className="text-slate-400 text-sm max-w-xs font-medium leading-relaxed">
                Hệ thống đặt lịch thông minh tích hợp thời gian thực và giao diện kính mờ.
              </p>

              {/* Steps Visual */}
              <div className="space-y-4 pt-8 border-l border-white/10 ml-4 pl-8">
                {[
                  { id: 1, label: "Chọn Ngày", icon: Calendar },
                  { id: 2, label: "Chọn Giờ", icon: Clock },
                  { id: 3, label: "Xác Nhận", icon: CheckCircle2 }
                ].map((s) => (
                  <div key={s.id} className={`flex items-center gap-4 transition-all duration-500 relative ${step >= s.id ? 'opacity-100' : 'opacity-20'}`}>
                    {step === s.id && (
                      <motion.div layoutId="step-indicator" className="absolute -left-[37px] w-2 h-2 bg-violet-400 rounded-full shadow-[0_0_10px_#a78bfa]" />
                    )}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center border ${step >= s.id ? 'bg-violet-500 border-violet-400 shadow-lg shadow-violet-500/20' : 'border-white/20'}`}>
                      {step > s.id ? <CheckCircle2 size={14} /> : <s.icon size={14} />}
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest">{s.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* RIGHT: INTERACTIVE CARDS */}
          <div className="lg:w-2/3">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step-1"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="grid grid-cols-2 sm:grid-cols-4 gap-4"
                >
                  {MOCK_DAYS.map((day) => (
                    <button
                      key={day.id}
                      onClick={() => { setSelectedDayId(day.id); setStep(2); }}
                      className="group relative h-56 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 flex flex-col justify-between hover:bg-white/10 hover:border-violet-500/50 transition-all duration-500 text-left overflow-hidden"
                    >
                      <div className="z-10">
                        <span className="text-[10px] font-black text-violet-400 mb-1 block">{day.fullName}</span>
                        <span className="text-5xl font-black tracking-tighter block group-hover:scale-110 transition-transform origin-left duration-500">
                          {day.date}
                        </span>
                      </div>
                      <div className="z-10 flex items-center justify-between">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Tháng 5</span>
                        <div className="w-8 h-8 rounded-full bg-violet-500/10 flex items-center justify-center group-hover:bg-violet-500 group-hover:text-white transition-all">
                          <ArrowRight size={14} />
                        </div>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-br from-violet-600/0 to-violet-600/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step-2"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-10 relative overflow-hidden"
                >
                  <div className="flex items-center justify-between mb-10">
                    <button onClick={() => setStep(1)} className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors">
                      ← Quay lại chọn ngày
                    </button>
                    <div className="flex items-center gap-2">
                       <span className="text-xs font-bold text-violet-400">{activeDay.fullName}, Ngày {activeDay.date}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {activeDay.slots.map((slot, idx) => {
                      const isSelected = selectedTime === slot.time;
                      const isBooked = slot.status === 'booked';
                      return (
                        <button
                          key={idx}
                          disabled={isBooked}
                          onClick={() => setSelectedTime(slot.time)}
                          className={`relative py-6 rounded-2xl border font-black text-lg transition-all duration-300 overflow-hidden ${
                            isBooked 
                            ? 'opacity-10 cursor-not-allowed grayscale' 
                            : isSelected 
                              ? 'border-violet-500 text-white' 
                              : 'border-white/5 bg-white/5 hover:border-white/20'
                          }`}
                        >
                          <span className="relative z-10">{slot.time}</span>
                          {isSelected && (
                            <motion.div 
                              layoutId="slot-bg" 
                              className="absolute inset-0 bg-gradient-to-br from-violet-600 to-fuchsia-600"
                            />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    disabled={!selectedTime}
                    onClick={() => setStep(3)}
                    className="w-full mt-10 py-5 bg-white text-black font-black rounded-2xl flex items-center justify-center gap-3 hover:bg-violet-400 hover:text-white transition-all disabled:opacity-20 shadow-2xl shadow-white/5"
                  >
                    Xác nhận khung giờ <ArrowRight size={18} />
                  </button>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step-3"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-[2.5rem] p-12 text-center shadow-2xl shadow-violet-500/20 relative overflow-hidden"
                >
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"
                  />
                  
                  <CheckCircle2 size={80} className="mx-auto mb-8 text-white" />
                  <h2 className="text-5xl font-black tracking-tighter mb-4 italic">HOÀN TẤT!</h2>
                  <p className="text-white/80 font-medium mb-10 max-w-sm mx-auto leading-relaxed">
                    Bạn đã đặt thành công lịch vào <br/>
                    <span className="text-white font-black bg-black/20 px-2 py-1 rounded-lg">
                      {activeDay.fullName}, Ngày {activeDay.date} lúc {selectedTime}
                    </span>
                  </p>
                  <button
                    onClick={() => { setStep(1); setSelectedTime(null); }}
                    className="px-10 py-4 bg-black text-white font-black rounded-2xl hover:bg-white/10 transition-all text-[10px] uppercase tracking-widest border border-white/10"
                  >
                    Quay lại trang chủ
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'linear-gradient(#ffffff05 1px, transparent 1px), linear-gradient(90deg, #ffffff05 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <style jsx global>{`
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </main>
  );
}
