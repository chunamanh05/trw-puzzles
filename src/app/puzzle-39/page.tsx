"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronDown, 
  ChevronLeft, 
  Home, 
  MapPin, 
  Building2, 
  ShieldCheck, 
  TrendingUp, 
  Compass, 
  Key, 
  Search,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

const LOCATIONS = [
  { name: "Dubai Marina", count: "124 Properties", icon: MapPin },
  { name: "Manhattan, NY", count: "89 Properties", icon: MapPin },
  { name: "The Palm Jumeirah", count: "45 Properties", icon: MapPin },
  { name: "Mayfair, London", count: "67 Properties", icon: MapPin },
];

const PROPERTY_TYPES = [
  { name: "Luxury Villas", icon: Home },
  { name: "Modern Penthouses", icon: Building2 },
  { name: "Private Islands", icon: Compass },
  { name: "Smart Apartments", icon: Key },
];

export default function MegaDropdownPage() {
  return (
    <main className="min-h-screen bg-[#0a0c10] text-white font-sans overflow-x-hidden">
      
      {/* --- ELITE NAVIGATION BAR --- */}
      <nav className="fixed top-0 left-0 right-0 h-24 bg-black/40 backdrop-blur-xl border-b border-white/5 z-50 px-8 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center shadow-lg shadow-amber-500/20">
            <Building2 className="text-black" size={20} />
          </div>
          <span className="text-xl font-black tracking-tighter uppercase">Elite<span className="text-amber-500">Estates.</span></span>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-10">
          <Link href="#" className="text-sm font-bold text-slate-400 hover:text-white transition-colors">Home</Link>
          
          {/* --- MEGA DROPDOWN TRIGGER --- */}
          <div className="group relative py-8">
            <button className="flex items-center gap-1 text-sm font-bold text-white hover:text-amber-500 transition-colors">
              Properties <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />
            </button>

            {/* --- THE MEGA DROPDOWN --- */}
            <div className="absolute top-[90%] left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
              <div className="w-[800px] bg-[#12161d] border border-white/10 rounded-3xl p-8 shadow-[0_30px_100px_rgba(0,0,0,0.8)] grid grid-cols-3 gap-8">
                
                {/* Column 1: Popular Locations */}
                <div className="space-y-6">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-500">Popular Locations</h4>
                  <div className="space-y-2">
                    {LOCATIONS.map((loc, idx) => (
                      <button key={idx} className="w-full flex items-center gap-4 p-3 rounded-2xl hover:bg-white/5 transition-all group/item text-left">
                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover/item:bg-amber-500 group-hover/item:text-black transition-colors">
                          <loc.icon size={18} />
                        </div>
                        <div>
                          <p className="text-sm font-bold">{loc.name}</p>
                          <p className="text-[10px] text-slate-500">{loc.count}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Column 2: Categories */}
                <div className="space-y-6">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-500">Categories</h4>
                  <div className="grid grid-cols-1 gap-2">
                    {PROPERTY_TYPES.map((type, idx) => (
                      <button key={idx} className="flex items-center gap-4 p-4 rounded-2xl border border-transparent hover:border-white/10 hover:bg-white/5 transition-all text-left">
                        <type.icon size={18} className="text-slate-400" />
                        <span className="text-sm font-bold text-slate-300">{type.name}</span>
                      </button>
                    ))}
                  </div>
                  <div className="pt-4 border-t border-white/5">
                    <button className="text-xs font-bold text-white flex items-center gap-2 hover:text-amber-500 transition-colors">
                      View All Listings <ArrowRight size={14} />
                    </button>
                  </div>
                </div>

                {/* Column 3: Featured Listing */}
                <div className="space-y-6">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-500">Spotlight</h4>
                  <div className="relative aspect-[4/5] rounded-3xl overflow-hidden group/card shadow-2xl">
                    <img 
                      src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=800" 
                      alt="Luxury Villa" 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="bg-amber-500 text-black text-[9px] font-black px-2 py-0.5 rounded-full inline-block mb-2 uppercase">Best Value</div>
                      <h5 className="text-lg font-black leading-tight mb-1">Azure Sky Villa</h5>
                      <p className="text-xs text-white/60 mb-3">$12,500,000</p>
                      <button className="w-full py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-xs font-bold hover:bg-white hover:text-black transition-all">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          <Link href="#" className="text-sm font-bold text-slate-400 hover:text-white transition-colors">Investment</Link>
          <Link href="#" className="text-sm font-bold text-slate-400 hover:text-white transition-colors">About Us</Link>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-6">
          <button className="hidden md:flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
            <Search size={18} />
          </button>
          <button className="bg-white text-black px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest hover:bg-amber-500 transition-all shadow-xl shadow-white/5">
            Contact Expert
          </button>
        </div>

      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 px-6 overflow-hidden">
        {/* Animated Background Image */}
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.3 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 z-0"
        >
          <img 
            src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=2000" 
            alt="Estate" 
            className="w-full h-full object-cover grayscale opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0c10] via-transparent to-[#0a0c10]" />
        </motion.div>

        <div className="relative z-10 text-center max-w-4xl">
          <Link href="/" className="inline-flex items-center gap-2 text-amber-500/60 hover:text-amber-500 transition-colors text-xs font-black uppercase tracking-widest mb-12">
            <ChevronLeft size={14} /> Back to Hub
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <span className="text-amber-500 text-xs font-black uppercase tracking-[0.4em] mb-6 block italic">Elite Estates International</span>
            <h1 className="text-7xl md:text-9xl font-black tracking-tighter leading-none mb-10">
              WORLD'S MOST <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-500 to-amber-200 bg-[length:200%_auto] animate-shine">EXQUISITE.</span>
            </h1>
            <p className="text-slate-400 text-xl font-medium max-w-2xl mx-auto leading-relaxed mb-12">
              Explore our curated portfolio of rare real estate and architectural masterpieces across the globe.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <div className="flex items-center gap-8 px-8 py-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem]">
                <div className="text-left">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Active Listings</p>
                  <p className="text-2xl font-black text-white">2.4k+</p>
                </div>
                <div className="w-px h-10 bg-white/10" />
                <div className="text-left">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Global Offices</p>
                  <p className="text-2xl font-black text-white">42</p>
                </div>
                <div className="w-px h-10 bg-white/10" />
                <div className="text-left">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Total Sales</p>
                  <p className="text-2xl font-black text-white">$14B</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Decorative Floating Elements */}
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-40 left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
      </section>

      <style jsx global>{`
        @keyframes shine {
          to {
            background-position: 200% center;
          }
        }
        .animate-shine {
          animation: shine 3s linear infinite;
        }
      `}</style>
    </main>
  );
}
