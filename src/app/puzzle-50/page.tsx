"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { PhotoGallery } from "@/components/ui/gallery";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  quote: string;
  image: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Product Manager at TechFlow",
    quote: "The attention to detail and innovative features have completely transformed our workflow. This is exactly what we've been looking for.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Alex Rivera",
    role: "Senior Designer at CreativeCloud",
    quote: "Design system consistency was our biggest challenge until we implemented this solution. The components are pixel-perfect and highly flexible.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Marcus Thorne",
    role: "CTO at NexusLabs",
    quote: "Performance is non-negotiable for us. This library not only looks stunning but delivers exceptional speed and reliability across all devices.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 4,
    name: "Elena Rodriguez",
    role: "Marketing Director at SolarVibe",
    quote: "Our engagement rates soared after the redesign. The micro-interactions and smooth animations truly delight our users every single day.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop"
  }
];

export default function StackedTestimonialSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // 1 for next, -1 for prev

  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  }, []);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  }, []);

  const currentTestimonial = TESTIMONIALS[currentIndex];

  return (
    <div className="min-h-screen bg-[#050505] text-[#fcfcfc] overflow-x-hidden selection:bg-accent-primary/30">
      <style jsx global>{`
        .glass-panel {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }
      `}</style>

      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-accent-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent-secondary/10 rounded-full blur-[120px]" />
      </div>

      <nav className="fixed top-8 left-8 z-50">
        <Link href="/" className="text-xs font-mono text-muted-foreground hover:text-accent-primary transition-colors flex items-center gap-2">
          <ArrowLeft size={14} /> Back to Lobby
        </Link>
      </nav>

      <main className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center min-h-screen py-24 px-6">
        
        {/* Left Side: Stacked Cards */}
        <div className="relative flex justify-center items-center h-[400px] lg:h-[600px]">
          <AnimatePresence mode="popLayout" custom={direction}>
            {[2, 1, 0].map((offset) => {
              const index = (currentIndex + offset) % TESTIMONIALS.length;
              const item = TESTIMONIALS[index];
              
              // Only render the top 3 cards for the stack effect
              return (
                <motion.div
                  key={item.id}
                  custom={direction}
                  initial={{ 
                    opacity: 0, 
                    x: offset === 0 ? (direction > 0 ? 100 : -100) : 0,
                    scale: 1 - offset * 0.05,
                    rotate: offset === 0 ? 0 : (offset === 1 ? 5 : -5),
                    zIndex: 10 - offset
                  }}
                  animate={{ 
                    opacity: 1 - offset * 0.3,
                    x: 0,
                    y: offset * 15,
                    scale: 1 - offset * 0.05,
                    rotate: offset === 0 ? 0 : (offset === 1 ? 5 : -5),
                    zIndex: 10 - offset
                  }}
                  exit={{ 
                    opacity: 0, 
                    x: direction > 0 ? -100 : 100,
                    scale: 0.9,
                    transition: { duration: 0.4 }
                  }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 260, 
                    damping: 20,
                    opacity: { duration: 0.2 }
                  }}
                  className="absolute w-[300px] h-[400px] lg:w-[450px] lg:h-[550px] rounded-[32px] overflow-hidden shadow-2xl border border-white/10"
                >
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                  {offset === 0 && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
                    />
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Large Side Nav Arrows */}
          <button 
            onClick={handlePrev}
            className="absolute left-[-40px] lg:left-[-80px] p-4 rounded-full border border-white/5 hover:border-accent-primary/50 hover:bg-white/5 transition-all text-muted-foreground hover:text-accent-primary hidden md:block"
          >
            <ChevronLeft size={32} />
          </button>
          <button 
            onClick={handleNext}
            className="absolute right-[-40px] lg:right-[-80px] p-4 rounded-full border border-white/5 hover:border-accent-primary/50 hover:bg-white/5 transition-all text-muted-foreground hover:text-accent-primary hidden md:block"
          >
            <ChevronRight size={32} />
          </button>
        </div>

        {/* Right Side: Content */}
        <div className="flex flex-col justify-center text-center lg:text-left h-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <h2 className="text-4xl lg:text-6xl font-bold mb-2 tracking-tight">
                {currentTestimonial.name}
              </h2>
              <p className="text-accent-primary font-mono text-sm uppercase tracking-widest mb-10">
                {currentTestimonial.role}
              </p>
              
              <div className="relative">
                <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed italic max-w-xl">
                  "{currentTestimonial.quote}"
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Bottom Controls */}
          <div className="flex gap-4 mt-12 justify-center lg:justify-start">
            <button 
              onClick={handlePrev}
              className="p-4 rounded-full border border-white/10 hover:border-white/30 bg-white/5 transition-all text-white active:scale-95"
            >
              <ArrowLeft size={20} />
            </button>
            <button 
              onClick={handleNext}
              className="p-4 rounded-full border border-white/10 hover:border-white/30 bg-white/5 transition-all text-white active:scale-95"
            >
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </main>

      {/* ─── Section 2: 21st.dev PhotoGallery Component ─── */}
      <section className="relative w-full border-t border-white/5 py-24 px-6 overflow-hidden">
        {/* Section label */}
        <div className="max-w-6xl mx-auto mb-16 flex items-center gap-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/20">
            21st.dev Component — Photo Gallery
          </span>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>

        <PhotoGallery animationDelay={0.3} />
      </section>

      {/* Background ID Tag */}
      <div className="fixed bottom-8 right-8 text-[15vh] font-bold text-white/[0.02] pointer-events-none select-none font-mono">
        #50
      </div>
    </div>
  );
}
