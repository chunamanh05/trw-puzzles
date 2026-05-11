"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import {
  Bot,
  TrendingUp,
  Clock,
  Users,
  DollarSign,
  ArrowLeft,
  Sparkles,
  AlertCircle,
  ArrowRight,
  Zap,
  ShieldCheck
} from "lucide-react";
import Link from "next/link";
import { cn } from "../../lib/utils";

// --- ANIMATED NUMBER COMPONENT ---
function AnimatedNumber({ value, prefix = "", suffix = "" }: { value: number, prefix?: string, suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { damping: 40, stiffness: 150 });

  useEffect(() => {
    motionValue.set(value);
  }, [value, motionValue]);

  useEffect(() => {
    // Explicitly type latest as number to satisfy Intl.NumberFormat
    return springValue.on("change", (latest: number) => {
      if (ref.current) {
        ref.current.textContent = `${prefix}${Intl.NumberFormat("en-US", { 
          maximumFractionDigits: 0 
        }).format(latest)}${suffix}`;
      }
    });
  }, [springValue, prefix, suffix]);

  return <span ref={ref}>{prefix}0{suffix}</span>;
}

export default function Puzzle80ROICalculatorV2() {
  // Inputs State
  const [employees, setEmployees] = useState(12);
  const [hoursPerWeek, setHoursPerWeek] = useState(10);
  const [hourlyRate, setHourlyRate] = useState(45);

  // Constants
  const SOFTWARE_COST = 499;
  const WEEKS_PER_MONTH = 4.33;

  // Real-time Calculations
  const currentMonthlyHours = employees * hoursPerWeek * WEEKS_PER_MONTH;
  const currentMonthlyCost = currentMonthlyHours * hourlyRate;

  // AI Impact (Assume 90% automation of manual tasks)
  const hoursSaved = currentMonthlyHours * 0.9;
  const savingsValue = hoursSaved * hourlyRate;
  const opportunityGain = savingsValue * 0.25; // 25% efficiency boost from freed time
  const totalMonthlyBenefit = savingsValue + opportunityGain;
  const netProfit = totalMonthlyBenefit - SOFTWARE_COST;
  const annualOpportunity = netProfit * 12;
  const efficiencyMultiplier = (totalMonthlyBenefit / SOFTWARE_COST).toFixed(1);

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans selection:bg-indigo-500/30 overflow-x-hidden pb-20 md:pb-0">

      {/* Lobby Link */}
      <Link href="/" className="absolute top-8 left-8 z-50 p-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl hover:bg-white/10 transition-all text-white/40 hover:text-white">
        <ArrowLeft size={20} />
      </Link>

      {/* Decorative Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-emerald-600/5 blur-[150px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 lg:py-32">

        {/* Header Section */}
        <div className="mb-16 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em] mb-6"
          >
            <Zap size={14} fill="currentColor" /> Live Revenue Projection
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-6 italic uppercase">
            Your Revenue <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-200 to-indigo-500">
              Opportunity.
            </span>
          </h1>
          <p className="text-lg text-white/40 max-w-xl font-medium">
            Enter your current operation metrics below to see your exact revenue opportunity in real time.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

          {/* LEFT: Input Dashboard */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-indigo-400 border border-white/10 text-sm">1</span>
              Your Numbers
            </h2>

            {/* Input Cards */}
            {[
              {
                label: "Monthly Team Size",
                desc: "Total employees involved in manual operations",
                icon: <Users />,
                value: employees,
                set: setEmployees,
                max: 100,
                prefix: "",
                unit: "staff"
              },
              {
                label: "Manual Hours / Week",
                desc: "Average hours spent per employee on manual tasks",
                icon: <Clock />,
                value: hoursPerWeek,
                set: setHoursPerWeek,
                max: 40,
                prefix: "",
                unit: "hours"
              },
              {
                label: "Average Hourly Rate",
                desc: "Fully loaded cost of your internal labor",
                icon: <DollarSign />,
                value: hourlyRate,
                set: setHourlyRate,
                max: 200,
                prefix: "$",
                unit: "/hr"
              }
            ].map((item, i) => (
              <div key={i} className="bg-white/[0.03] border border-white/10 rounded-[2rem] p-6 hover:bg-white/[0.05] transition-all group">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white/40 group-hover:text-indigo-400 transition-colors">
                      {React.cloneElement(item.icon as React.ReactElement<any>, { size: 24 })}
                    </div>
                    <div>
                      <h3 className="font-bold text-white/90">{item.label}</h3>
                      <p className="text-xs text-white/30 font-medium">{item.desc}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-black/40 px-4 py-2 rounded-xl border border-white/5">
                    <span className="text-xs font-bold text-white/30">{item.prefix}</span>
                    <input
                      type="number"
                      value={item.value}
                      onChange={(e) => item.set(Math.min(item.max, Math.max(0, Number(e.target.value))))}
                      className="bg-transparent w-12 text-xl font-black focus:outline-none text-indigo-400"
                    />
                    <span className="text-[10px] font-bold text-white/20 uppercase">{item.unit}</span>
                  </div>
                </div>
                <div className="relative h-2">
                  <div className="absolute inset-0 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      className="absolute inset-y-0 left-0 bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.5)]"
                      animate={{ width: `${(item.value / item.max) * 100}%` }}
                    />
                  </div>
                  <input
                    type="range" min="0" max={item.max} value={item.value}
                    onChange={(e) => item.set(Number(e.target.value))}
                    className="absolute inset-0 w-full opacity-0 cursor-pointer"
                  />
                </div>
              </div>
            ))}

            {/* Urgency Alert */}
            <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-3xl p-6 flex gap-4 items-center mt-8">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                <AlertCircle size={20} />
              </div>
              <p className="text-sm text-emerald-400/80 font-medium leading-relaxed">
                Industry data shows AI-optimized agencies achieve <span className="text-emerald-400 font-bold italic underline">35-50% higher profit margins</span> within the first 6 months of targeted automation.
              </p>
            </div>
          </div>

          {/* RIGHT: Results Dashboard */}
          <div className="lg:col-span-5">
            <div className="sticky top-12 bg-slate-900 border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl">

              {/* Main Result Area */}
              <div className="p-8 md:p-10 bg-gradient-to-b from-white/[0.03] to-transparent">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-center text-indigo-400 mb-2 flex items-center justify-center gap-2">
                  Monthly Revenue Uplift
                </p>
                <div className="text-6xl md:text-7xl font-black tracking-tighter text-center mb-2">
                  <AnimatedNumber value={netProfit} prefix="+$" />
                </div>
                <p className="text-center text-sm font-bold text-white/40 mb-8">
                  per month — that's <span className="text-white/80"><AnimatedNumber value={annualOpportunity} prefix="+$" /></span> per year
                </p>

                <div className="flex flex-wrap justify-center gap-3 mb-10">
                  <div className="px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[10px] font-black text-indigo-400 uppercase tracking-widest flex items-center gap-2">
                    Revenue Multiplier: {efficiencyMultiplier}x
                  </div>
                  <div className="px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-black text-emerald-400 uppercase tracking-widest flex items-center gap-2">
                    Net Growth: +{((netProfit / currentMonthlyCost) * 100).toFixed(0)}%
                  </div>
                </div>

                {/* Comparison Table */}
                <div className="space-y-4">
                  <div className="grid grid-cols-12 text-[10px] font-black uppercase tracking-widest text-white/20 mb-2 px-2">
                    <div className="col-span-6">Metric</div>
                    <div className="col-span-3 text-right">Current</div>
                    <div className="col-span-3 text-right text-indigo-400">Projected</div>
                  </div>

                  {[
                    { label: "Manual Monthly Hours", current: currentMonthlyHours, projected: currentMonthlyHours * 0.1, suffix: "h" },
                    { label: "Monthly Labor Cost", current: currentMonthlyCost, projected: SOFTWARE_COST, prefix: "$" },
                    { label: "Operating Margin", current: 20, projected: 65, suffix: "%" }
                  ].map((row, i) => (
                    <div key={i} className="grid grid-cols-12 items-center p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/5 transition-colors">
                      <div className="col-span-6 text-xs font-bold text-white/60">{row.label}</div>
                      <div className="col-span-3 text-right text-xs font-black text-white/40">
                        {row.prefix}{Intl.NumberFormat().format(row.current)}{row.suffix}
                      </div>
                      <div className="col-span-3 text-right text-xs font-black text-white flex items-center justify-end gap-1">
                        {row.prefix}{Intl.NumberFormat().format(row.projected)}{row.suffix}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Urgency Section / CTA */}
              <div className="p-8 bg-black/40 border-t border-white/10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center text-red-400">
                    <TrendingUp className="rotate-180" size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-red-400">Stop the Revenue Leakage</h4>
                    <p className="text-xs text-white/40">You are leaving <AnimatedNumber value={netProfit} prefix="$" /> on the table every month.</p>
                  </div>
                </div>

                <button className="w-full h-16 bg-white text-black font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-indigo-400 hover:text-white transition-all flex items-center justify-center gap-3 group">
                  Claim Your Opportunity <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
