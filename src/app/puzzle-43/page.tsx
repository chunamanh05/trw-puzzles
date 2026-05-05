"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  ChevronLeft, 
  Home, 
  MapPin, 
  Building2, 
  ShieldCheck, 
  TrendingUp, 
  Compass, 
  Key, 
  Search,
  ArrowRight,
  Star
} from "lucide-react";
import Link from "next/link";

// --- MAGIC UI MARQUEE COMPONENT (FIXED) ---
interface MarqueeProps {
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  children?: React.ReactNode;
  vertical?: boolean;
  repeat?: number;
  duration?: string;
}

const Marquee = ({
  className = "",
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  duration = "40s",
}: MarqueeProps) => {
  return (
    <div
      className={`group flex overflow-hidden p-2 [--gap:1rem] [gap:var(--gap)] ${
        vertical ? "flex-col" : "flex-row"
      } ${className} marquee-container`}
      style={{ "--duration": duration } as React.CSSProperties}
    >
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={`flex shrink-0 justify-around [gap:var(--gap)] marquee-content ${
              vertical ? "animate-marquee-vertical flex-col" : "animate-marquee flex-row"
            } ${reverse ? "[animation-direction:reverse]" : ""}`}
          >
            {children}
          </div>
        ))}

      <style jsx>{`
        .marquee-container {
          cursor: pointer;
        }
        /* Cưỡng bức dừng chuyển động khi hover vào container */
        .marquee-container:hover .marquee-content {
          animation-play-state: paused !important;
        }
        
        .animate-marquee {
          animation: marquee var(--duration) linear infinite;
        }

        .animate-marquee-vertical {
          animation: marquee-vertical var(--duration) linear infinite;
        }

        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(calc(-100% - var(--gap))); }
        }

        @keyframes marquee-vertical {
          from { transform: translateY(0); }
          to { transform: translateY(calc(-100% - var(--gap))); }
        }
      `}</style>
    </div>
  );
};

const LOGOS = [
  { name: "Global", icon: Compass, color: "text-white" },
  { name: "Premium", icon: ShieldCheck, color: "text-blue-400" },
  { name: "Building", icon: Building2, color: "text-purple-500" },
  { name: "Growth", icon: TrendingUp, color: "text-emerald-500" },
  { name: "Location", icon: MapPin, color: "text-pink-500" },
  { name: "Search", icon: Search, color: "text-yellow-500" },
  { name: "Modern", icon: Home, color: "text-cyan-400" },
];

const REVIEWS = [
  { name: "Alex Rivers", role: "Product Designer", text: "The performance is just mind-blowing. Best UI kit ever!" },
  { name: "Sarah Chen", role: "Fullstack Dev", text: "Infinite Marquee is a game changer for our landing page." },
  { name: "Marco V.", role: "CEO @ TechFlow", text: "Simple, elegant, and highly performant. Highly recommend!" },
  { name: "Elena S.", role: "Creative Director", text: "The smooth loop is therapeutic to watch. Great work!" },
];

export default function InfiniteMarqueePage() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 font-sans overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,#1e1b4b,transparent)] opacity-50" />
      
      <div className="relative z-10 w-full max-w-5xl text-center space-y-12">
        
        {/* Header */}
        <div className="space-y-4">
          <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-white transition-colors text-xs font-black uppercase tracking-widest">
            <ChevronLeft size={14} /> Back to Hub
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-4">
              Magic <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Marquee.</span>
            </h1>
            <p className="text-slate-500 font-medium max-w-xl mx-auto">
              The original Magic UI marquee experience. <br/>
              Pure performance. Seamless loops. **Pause on hover.**
            </p>
          </motion.div>
        </div>

        {/* --- MARQUEE SECTION --- */}
        <div className="relative flex flex-col gap-6 w-full py-12">
          
          {/* Row 1: Left */}
          <Marquee pauseOnHover duration="30s">
            {LOGOS.map((logo, idx) => (
              <div key={idx} className="flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md hover:bg-white/10 hover:scale-110 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all duration-300">
                <logo.icon size={20} className={`${logo.color} drop-shadow-[0_0_8px_currentColor]`} />
                <span className="text-sm font-bold uppercase tracking-widest">{logo.name}</span>
              </div>
            ))}
          </Marquee>

          {/* Row 2: Right (Reverse) */}
          <Marquee reverse pauseOnHover duration="40s">
            {REVIEWS.map((review, idx) => (
              <div key={idx} className="flex flex-col gap-2 p-6 bg-white/5 border border-white/5 rounded-[2rem] w-[300px] hover:scale-105 hover:bg-white/10 hover:border-indigo-500/40 transition-all duration-300 text-left">
                <div className="flex items-center gap-1 text-amber-500 mb-2">
                  {[1, 2, 3, 4, 5].map((s) => <Star key={s} size={10} className="fill-current" />)}
                </div>
                <p className="text-sm text-slate-200 font-medium italic">"{review.text}"</p>
                <div className="mt-4">
                  <p className="text-xs font-black uppercase text-indigo-400 tracking-wider">{review.name}</p>
                </div>
              </div>
            ))}
          </Marquee>

          {/* Row 3: Fast */}
          <Marquee pauseOnHover duration="20s">
            {["TYPESCRIPT", "NEXT.JS", "TAILWIND", "FRAMER", "RUST", "PYTHON", "AI"].map((skill, idx) => (
              <div key={idx} className="flex items-center gap-2 px-6 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full hover:scale-110 hover:bg-indigo-500/30 transition-all">
                <Key size={14} className="text-indigo-400" />
                <span className="text-[10px] font-black tracking-[0.2em] text-indigo-200">{skill}</span>
              </div>
            ))}
          </Marquee>

          {/* Edge Gradients */}
          <div className="absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
        </div>

        {/* CTA */}
        <div className="pt-8">
          <button className="px-10 py-5 bg-white text-black font-black uppercase tracking-widest text-xs rounded-2xl shadow-2xl hover:bg-emerald-400 hover:text-white transition-all">
            Explore Documentation
          </button>
        </div>

      </div>
    </main>
  );
}
