"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  FileCode, 
  MapPin, 
  Sparkles, 
  CheckCircle2, 
  HelpCircle, 
  ArrowRight, 
  ArrowLeft,
  Zap,
  Award,
  Info,
  Star,
  ShieldCheck,
  Globe,
  Users,
  Clock
} from "lucide-react";
import Link from "next/link";
import { cn } from "../../lib/utils";

// --- DATA ---
interface Service {
  id: string;
  name: string;
  desc: string;
  icon: React.ReactNode;
  faq: { q: string; a: string }[];
}

interface Location {
  id: string;
  name: string;
  region: string;
  residents: string;
  postcodes: string;
}

const SERVICES: Service[] = [
  {
    id: "plumb",
    name: "Plumbing",
    desc: "Leaks, boilers & drainage expert service.",
    icon: <Zap />,
    faq: [
      { q: "How fast can you reach Hackney?", a: "Our local team in Hackney typically arrives within 30-60 minutes." },
      { q: "Are you Gas Safe registered?", a: "Yes, all our engineers are fully Gas Safe registered and insured." }
    ]
  },
  {
    id: "land",
    name: "Landscaping",
    desc: "Design, build & maintain outdoor spaces.",
    icon: <Globe />,
    faq: [
      { q: "Do you offer free consultations?", a: "Yes, we provide on-site design consultations for all local residents." },
      { q: "Can you handle large scale projects?", a: "We have the equipment and team to handle both residential and commercial landscaping." }
    ]
  },
  {
    id: "lock",
    name: "Locksmith",
    desc: "Lockouts, locks & security solutions.",
    icon: <ShieldCheck />,
    faq: [
      { q: "Is it a 24/7 service?", a: "Absolutely. We have emergency locksmiths on standby 24 hours a day." },
      { q: "Do you provide non-destructive entry?", a: "Our specialists always prioritize non-destructive methods to save your hardware." }
    ]
  }
];

const LOCATIONS: Location[] = [
  { id: "islington", name: "Islington", region: "North London", residents: "240,000+", postcodes: "N1, N5, N7" },
  { id: "camden", name: "Camden", region: "North West London", residents: "270,000+", postcodes: "NW1, NW3, NW5" },
  { id: "hackney", name: "Hackney", region: "East London", residents: "280,000+", postcodes: "E8, E5, E9, N16" }
];

export default function Puzzle90PageBuilder() {
  const [selectedServiceId, setSelectedServiceId] = useState<string>(SERVICES[0].id);
  const [selectedLocationId, setSelectedLocationId] = useState<string>(LOCATIONS[2].id);

  // --- DERIVED CONTENT ---
  const service = useMemo(() => SERVICES.find(s => s.id === selectedServiceId) || SERVICES[0], [selectedServiceId]);
  const location = useMemo(() => LOCATIONS.find(l => l.id === selectedLocationId) || LOCATIONS[0], [selectedLocationId]);

  return (
    <div className="min-h-screen bg-[#020912] text-white font-sans selection:bg-emerald-500/30 flex flex-col overflow-hidden">
      
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-emerald-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-blue-600/5 blur-[150px] rounded-full" />
      </div>

      {/* Header */}
      <header className="relative z-20 px-8 py-4 border-b border-white/5 bg-black/40 backdrop-blur-md flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="p-2 hover:bg-white/5 rounded-xl transition-colors text-white/40 hover:text-white mr-4">
            <ArrowLeft size={20} />
          </Link>
          <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-black">
            <FileCode size={20} />
          </div>
          <span className="text-lg font-black tracking-tighter uppercase">AnswerGrid</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-black uppercase tracking-widest text-emerald-400 flex items-center gap-2">
            <Sparkles size={12} /> AEO & GEO Ready
          </div>
        </div>
      </header>

      <main className="flex-1 grid grid-cols-1 lg:grid-cols-12 relative z-10 overflow-hidden">
        
        {/* LEFT: SELECTORS */}
        <aside className="lg:col-span-3 border-r border-white/5 bg-black/20 p-6 flex flex-col gap-6 overflow-y-auto">
          
          {/* Service Selector */}
          <div className="space-y-4">
            <h2 className="text-[10px] font-black uppercase tracking-widest text-white/30 px-2">Select Service</h2>
            <div className="space-y-2">
              {SERVICES.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSelectedServiceId(s.id)}
                  className={cn(
                    "w-full p-4 rounded-2xl text-left transition-all border group relative",
                    selectedServiceId === s.id 
                      ? "bg-emerald-500/10 border-emerald-500/50" 
                      : "bg-white/[0.02] border-white/5 hover:border-white/10"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center transition-colors",
                      selectedServiceId === s.id ? "bg-emerald-500 text-black" : "bg-white/5 text-white/40 group-hover:text-white"
                    )}>
                      {React.isValidElement(s.icon) && React.cloneElement(s.icon as React.ReactElement<any>, { size: 20 })}
                    </div>
                    <div className="flex-1">
                      <h3 className={cn("text-xs font-bold", selectedServiceId === s.id ? "text-white" : "text-white/60")}>{s.name}</h3>
                      <p className="text-[9px] text-white/30 font-medium">{s.desc}</p>
                    </div>
                    {selectedServiceId === s.id && (
                      <span className="text-[8px] font-black uppercase bg-emerald-500 text-black px-1.5 py-0.5 rounded">Active</span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Location Selector */}
          <div className="space-y-4">
            <h2 className="text-[10px] font-black uppercase tracking-widest text-white/30 px-2">Select Location</h2>
            <div className="space-y-2">
              {LOCATIONS.map((l) => (
                <button
                  key={l.id}
                  onClick={() => setSelectedLocationId(l.id)}
                  className={cn(
                    "w-full p-4 rounded-2xl text-left transition-all border group",
                    selectedLocationId === l.id 
                      ? "bg-emerald-500/10 border-emerald-500/50" 
                      : "bg-white/[0.02] border-white/5 hover:border-white/10"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className={cn("text-xs font-bold", selectedLocationId === l.id ? "text-white" : "text-white/60")}>{l.name}</h3>
                      <p className="text-[9px] text-white/30 font-medium">{l.postcodes}</p>
                    </div>
                    <span className="text-[9px] font-black text-white/20">{l.residents}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Current Selection Summary */}
          <div className="mt-auto p-5 rounded-2xl bg-white/[0.03] border border-white/5 space-y-2">
            <p className="text-[9px] font-black uppercase tracking-widest text-white/20">Current Selection</p>
            <p className="text-xs font-bold text-emerald-400">{service.name} in {location.name}</p>
            <p className="text-[10px] text-white/30">{location.postcodes} • {location.residents} residents</p>
          </div>
        </aside>

        {/* RIGHT: PREVIEW */}
        <section className="lg:col-span-9 p-8 lg:p-12 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${selectedServiceId}-${selectedLocationId}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="max-w-4xl mx-auto space-y-12"
            >
              {/* PAGE HEADER */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-[10px] font-bold text-white/30 uppercase tracking-widest">
                  <span className="text-emerald-500">Emergency & Routine</span>
                  <span>•</span>
                  <span>{location.region}</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
                  {location.name} {service.name} Experts — 24/7 Emergency Service
                </h1>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    {[1,2,3,4,5].map(s => <Star key={s} size={12} fill="#10b981" className="text-emerald-500" />)}
                  </div>
                  <span className="text-xs font-bold text-white/60">4.9 <span className="text-white/20 font-medium ml-1">(401 reviews)</span></span>
                  <div className="flex items-center gap-2 px-2 py-0.5 rounded bg-white/5 border border-white/10">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[9px] font-black uppercase tracking-widest text-white/40">Live</span>
                  </div>
                </div>
              </div>

              {/* DIRECT ANSWER BLOCK */}
              <div className="p-8 rounded-3xl bg-emerald-500/5 border border-emerald-500/20 space-y-4">
                <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400 flex items-center gap-2">
                  <Zap size={14} fill="currentColor" /> Direct Answer
                </h2>
                <p className="text-xl font-bold leading-relaxed text-white/90">
                  Yes, we provide 24/7 emergency {service.name.toLowerCase()} services throughout {location.name}. Our team covers {location.postcodes} postcodes with rapid response times and transparent pricing.
                </p>
              </div>

              {/* PAGE SUMMARY */}
              <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/5 space-y-4">
                <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 flex items-center gap-2">
                  <FileCode size={14} /> Page Summary
                </h2>
                <p className="text-sm text-white/50 leading-relaxed font-medium">
                  {location.name}'s trusted {service.name.toLowerCase()} service for residential and commercial properties. Fast callout times, certified engineers, and honest pricing across all {location.postcodes} and surrounding postcodes.
                </p>
              </div>

              {/* KEY FACTS GRID */}
              <div className="space-y-6">
                <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 flex items-center gap-2 px-2">
                  <Info size={14} /> Key Facts
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { label: "Response Time", value: "30-60 minutes", icon: <Clock size={16} /> },
                    { label: "Availability", value: "24 hrs, 7 days a week", icon: <CheckCircle2 size={16} /> },
                    { label: "Coverage", value: location.postcodes, icon: <MapPin size={16} /> },
                    { label: "Certification", value: "Gas Safe registered", icon: <Award size={16} /> }
                  ].map((fact, i) => (
                    <div key={i} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center gap-4 group hover:bg-white/[0.04] transition-all">
                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/20 group-hover:text-emerald-400 transition-colors">
                        {fact.icon}
                      </div>
                      <div>
                        <p className="text-[9px] font-black uppercase tracking-widest text-white/20">{fact.label}</p>
                        <p className="text-sm font-bold text-white/80">{fact.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* FAQ SECTION */}
              <div className="space-y-6">
                <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 flex items-center gap-2 px-2">
                  <HelpCircle size={14} /> Frequently Asked
                </h2>
                <div className="space-y-3">
                  {service.faq.map((f, i) => (
                    <div key={i} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                      <h4 className="text-sm font-bold mb-2 flex items-start gap-2">
                        <span className="text-emerald-500 italic">Q.</span> {f.q}
                      </h4>
                      <p className="text-xs text-white/40 leading-relaxed pl-6 border-l border-emerald-500/20 font-medium">
                        {f.a}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* FOOTER CTA */}
              <div className="py-12 border-t border-white/5 flex flex-col items-center space-y-6">
                <button className="px-12 py-5 bg-emerald-500 text-black font-black text-xs uppercase tracking-[0.2em] rounded-2xl hover:bg-emerald-400 shadow-2xl shadow-emerald-500/20 active:scale-95 transition-all">
                  Contact {location.name} Team Now
                </button>
                <p className="text-[9px] font-black uppercase tracking-[0.4em] text-white/10">
                  AEO Optimized Content • Global Service Network
                </p>
              </div>

            </motion.div>
          </AnimatePresence>
        </section>

      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        body { background: #020912; }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 10px; }
      `}} />

    </div>
  );
}
