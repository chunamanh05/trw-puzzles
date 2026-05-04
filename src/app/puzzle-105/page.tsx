"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, Calendar, Clock, CheckCircle2, Zap, AlertCircle } from "lucide-react";
import Link from "next/link";

// --- Types ---
type SlotStatus = 'available' | 'booked';

interface TimeSlot {
  time: string;
  status: SlotStatus;
}

interface DayAvailability {
  id: string;
  date: number;
  dayName: string;
  slots: TimeSlot[];
}

// --- Mock Data ---
const MOCK_DAYS: DayAvailability[] = [
  {
    id: "day-1",
    date: 5,
    dayName: "TUE",
    slots: [
      { time: "9:00 AM", status: "booked" },
      { time: "10:00 AM", status: "available" },
      { time: "11:00 AM", status: "available" },
      { time: "12:00 PM", status: "available" },
      { time: "1:00 PM", status: "booked" },
      { time: "2:00 PM", status: "available" },
      { time: "3:00 PM", status: "available" },
      { time: "4:00 PM", status: "available" },
    ]
  },
  {
    id: "day-2",
    date: 6,
    dayName: "WED",
    slots: [
      { time: "9:00 AM", status: "available" },
      { time: "10:00 AM", status: "available" },
      { time: "11:00 AM", status: "available" },
      { time: "12:00 PM", status: "booked" },
      { time: "1:00 PM", status: "available" },
      { time: "2:00 PM", status: "booked" },
      { time: "3:00 PM", status: "available" },
      { time: "4:00 PM", status: "available" },
    ]
  },
  {
    id: "day-3",
    date: 7,
    dayName: "THU",
    slots: [
      { time: "9:00 AM", status: "booked" },
      { time: "10:00 AM", status: "booked" },
      { time: "11:00 AM", status: "available" },
      { time: "12:00 PM", status: "available" },
      { time: "1:00 PM", status: "booked" },
      { time: "2:00 PM", status: "available" },
      { time: "3:00 PM", status: "available" },
      { time: "4:00 PM", status: "booked" },
    ]
  },
  {
    id: "day-4",
    date: 8,
    dayName: "FRI",
    slots: [
      { time: "9:00 AM", status: "available" },
      { time: "10:00 AM", status: "available" },
      { time: "11:00 AM", status: "available" },
      { time: "12:00 PM", status: "available" },
      { time: "1:00 PM", status: "available" },
      { time: "2:00 PM", status: "available" },
      { time: "3:00 PM", status: "available" },
      { time: "4:00 PM", status: "available" },
    ]
  }
];

export default function BookingSlotPage() {
  const [selectedDayId, setSelectedDayId] = useState(MOCK_DAYS[1].id);
  const [selectedTime, setSelectedTime] = useState<string | null>("10:00 AM");
  const [isBooked, setIsBooked] = useState(false);

  const activeDay = useMemo(() => 
    MOCK_DAYS.find(d => d.id === selectedDayId)!, 
  [selectedDayId]);

  const handleDayChange = (id: string) => {
    setSelectedDayId(id);
    setSelectedTime(null); // Reset time when changing day
  };

  const handleBooking = () => {
    if (!selectedTime) return;
    setIsBooked(true);
    // In real app, send to server
  };

  return (
    <main className="min-h-screen bg-[#05070a] text-white flex flex-col items-center justify-center p-6 font-sans relative overflow-hidden">
      
      {/* Abstract Background Grid */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" 
        style={{ backgroundImage: 'radial-gradient(#1e293b 1px, transparent 1px)', backgroundSize: '32px 32px' }} 
      />

      {/* Nav */}
      <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 text-slate-500 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest z-10">
        <ChevronLeft size={14} /> Back to Hub
      </Link>

      {/* Header */}
      <div className="text-center mb-12 z-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-2 mb-4"
        >
          <div className="w-10 h-10 bg-cyan-500 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <Zap size={20} className="text-white fill-white" />
          </div>
          <span className="text-xl font-black tracking-tighter">SlotFlow</span>
        </motion.div>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2">
          Book your <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">time slot</span>
        </h1>
        <p className="text-slate-500 font-medium">Live availability — pick a day and select an open time.</p>
      </div>

      {/* Main Container */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl bg-[#0d1117] border border-white/5 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative z-10"
      >
        {/* Section: Select a Day */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-6 text-slate-400">
            <Calendar size={16} />
            <span className="text-xs font-black uppercase tracking-widest">Select a Day</span>
          </div>
          
          <div className="grid grid-cols-4 gap-3">
            {MOCK_DAYS.map((day) => {
              const openSlots = day.slots.filter(s => s.status === 'available').length;
              const isActive = selectedDayId === day.id;

              return (
                <button
                  key={day.id}
                  onClick={() => handleDayChange(day.id)}
                  className={`relative flex flex-col items-center justify-center py-5 rounded-3xl border transition-all duration-300 ${
                    isActive 
                    ? 'bg-emerald-500/10 border-emerald-500/50 shadow-lg shadow-emerald-500/10' 
                    : 'bg-white/5 border-white/5 hover:border-white/10 hover:bg-white/[0.08]'
                  }`}
                >
                  <span className={`text-[10px] font-black mb-1 ${isActive ? 'text-emerald-400' : 'text-slate-500'}`}>
                    {day.dayName}
                  </span>
                  <span className="text-2xl font-black mb-2 tracking-tighter">
                    {day.date}
                  </span>
                  <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold ${isActive ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/5 text-slate-500'}`}>
                    {openSlots} open
                  </span>
                  
                  {isActive && (
                    <motion.div 
                      layoutId="day-active"
                      className="absolute inset-0 border-2 border-emerald-500 rounded-3xl"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="h-px bg-white/5 mb-10" />

        {/* Section: Available Times */}
        <div className="mb-10">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2 text-slate-400">
              <Clock size={16} />
              <span className="text-xs font-black uppercase tracking-widest">Available Times</span>
            </div>
            <span className="text-xs font-bold text-slate-500 tracking-tight">
              {activeDay.dayName === "WED" ? "Wednesday" : activeDay.dayName}, May {activeDay.date}
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <AnimatePresence mode="wait">
              <motion.div 
                key={selectedDayId}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="contents"
              >
                {activeDay.slots.map((slot, idx) => {
                  const isSelected = selectedTime === slot.time;
                  const isBookedSlot = slot.status === 'booked';

                  return (
                    <button
                      key={idx}
                      disabled={isBookedSlot}
                      onClick={() => setSelectedTime(slot.time)}
                      className={`group relative flex items-center justify-center gap-2 py-4 rounded-2xl border font-bold text-sm transition-all duration-200 ${
                        isBookedSlot
                        ? 'opacity-20 cursor-not-allowed bg-transparent border-white/5'
                        : isSelected
                          ? 'bg-cyan-500/10 border-cyan-500/60 text-white shadow-lg shadow-cyan-500/10'
                          : 'bg-white/5 border-white/5 text-slate-400 hover:border-white/20 hover:text-white'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${
                        isSelected ? 'border-cyan-400 bg-cyan-400/20' : 'border-slate-700'
                      }`}>
                        {isSelected && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-1.5 h-1.5 rounded-full bg-cyan-400" />}
                      </div>
                      {slot.time}
                    </button>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="h-px bg-white/5 mb-10" />

        {/* Footer: Summary & CTA */}
        <div className="flex flex-col items-center gap-6">
          <div className="px-5 py-3 bg-cyan-500/5 border border-cyan-500/20 rounded-2xl flex items-center gap-3">
            <Calendar size={14} className="text-cyan-400" />
            <span className="text-xs font-bold text-slate-300">
              Selected: <span className="text-white">{selectedTime ? `${activeDay.dayName}, May ${activeDay.date} at ${selectedTime}` : 'None'}</span>
            </span>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleBooking}
            disabled={!selectedTime || isBooked}
            className={`w-full py-5 rounded-3xl font-black text-lg flex items-center justify-center gap-3 transition-all relative overflow-hidden group ${
              isBooked
              ? 'bg-emerald-500 text-white cursor-default'
              : selectedTime 
                ? 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-white shadow-xl shadow-cyan-500/20' 
                : 'bg-white/5 text-slate-600 cursor-not-allowed'
            }`}
          >
            {isBooked ? (
              <>
                <CheckCircle2 size={24} />
                Booking Confirmed!
              </>
            ) : (
              <>
                <Zap size={22} className={selectedTime ? "fill-white" : ""} />
                {selectedTime ? 'Book this time' : 'Select a slot to book'}
              </>
            )}
            
            {/* Animated Shine Effect */}
            {selectedTime && !isBooked && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shine" />
            )}
          </motion.button>

          {isBooked && (
            <motion.p 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }}
              className="text-xs font-bold text-emerald-400 flex items-center gap-2"
            >
              <CheckCircle2 size={12} /> A confirmation email has been sent.
            </motion.p>
          )}
        </div>
      </motion.div>

      {/* Decorative Blur */}
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

      <style jsx global>{`
        @keyframes shine {
          100% { transform: translateX(100%); }
        }
        .animate-shine {
          animation: shine 1.5s infinite;
        }
      `}</style>
    </main>
  );
}
