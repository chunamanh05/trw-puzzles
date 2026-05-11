"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Compass, 
  Layers, 
  Send, 
  CheckCircle2, 
  ArrowDown, 
  ArrowUp, 
  ArrowLeft,
  MousePointer2,
  Sparkles,
  Star,
  ShieldCheck,
  Zap
} from "lucide-react";
import Link from "next/link";
import { cn } from "../../lib/utils";

// --- DATA ---
interface SectionData {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  cta: string;
  icon: React.ReactNode;
  color: string;
  image: string;
}

const SECTIONS: SectionData[] = [
  {
    id: "welcome",
    title: "Modern Sanctuary",
    subtitle: "The Art of Living",
    content: "Bước vào không gian sống được thiết kế riêng cho sự tĩnh tại và sang trọng. Mỗi chi tiết đều kể một câu chuyện về phong cách.",
    cta: "Explore Design",
    icon: <Compass />,
    color: "emerald",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: "process",
    title: "Pure Craftsmanship",
    subtitle: "Attention to Detail",
    content: "Quy trình chế tác thủ công kết hợp cùng công nghệ AI để tối ưu hóa từng mét vuông diện tích sử dụng của bạn.",
    cta: "View Process",
    icon: <Layers />,
    color: "amber",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: "results",
    title: "Global Excellence",
    subtitle: "Proven Results",
    content: "Hơn 500 dự án cao cấp trên toàn cầu đã được bàn giao với sự hài lòng tuyệt đối từ những khách hàng khó tính nhất.",
    cta: "See Portfolio",
    icon: <Star />,
    color: "blue",
    image: "https://images.unsplash.com/photo-1616489953149-8647e703901b?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: "action",
    title: "Start Journey",
    subtitle: "Ready to Build?",
    content: "Đội ngũ chuyên gia của chúng tôi đã sẵn sàng biến ý tưởng của bạn thành hiện thực rực rỡ ngay hôm nay.",
    cta: "Contact Us Now",
    icon: <Send />,
    color: "indigo",
    image: "https://images.unsplash.com/photo-1616137422495-1e9e46e2aa77?auto=format&fit=crop&q=80&w=1200"
  }
];

export default function Puzzle91ScrollReveal() {
  const [activeSection, setActiveSection] = useState<string>(SECTIONS[0].id);
  const observerRefs = useRef<Record<string, HTMLElement | null>>({});

  // --- INTERSECTION OBSERVER LOGIC ---
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "-20% 0px -20% 0px",
      threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, options);

    const currentRefs = observerRefs.current;
    Object.values(currentRefs).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      Object.values(currentRefs).forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  const currentSection = SECTIONS.find(s => s.id === activeSection) || SECTIONS[0];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-[#020617] text-white font-sans selection:bg-emerald-500/30">
      
      {/* FIXED HEADER */}
      <header className="fixed top-0 inset-x-0 z-50 px-8 py-6 flex items-center justify-between pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-4">
          <Link href="/" className="p-2 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all text-white/40 hover:text-white">
            <ArrowLeft size={20} />
          </Link>
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest text-white/60">StoryFlow Engine</span>
          </div>
        </div>
        
        <div className="pointer-events-auto flex items-center gap-4">
          <div className="p-3 bg-white/5 border border-white/10 rounded-full text-white/20">
            <MousePointer2 size={16} />
          </div>
        </div>
      </header>

      {/* SIDE NAVIGATION (Dots) */}
      <nav className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-4 p-4 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
        {SECTIONS.map((s) => (
          <button
            key={s.id}
            onClick={() => scrollToSection(s.id)}
            className="group relative flex items-center justify-center"
          >
            <div className={cn(
              "w-2 h-2 rounded-full transition-all duration-500",
              activeSection === s.id ? "bg-white scale-150 shadow-[0_0_10px_#fff]" : "bg-white/20 group-hover:bg-white/40"
            )} />
            <span className={cn(
              "absolute right-8 text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap",
              activeSection === s.id && "opacity-100 text-white"
            )}>
              {s.title}
            </span>
          </button>
        ))}
      </nav>

      {/* FLOATING CONTEXTUAL CTA */}
      <div className="fixed bottom-12 inset-x-0 z-50 flex justify-center pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.button
            key={activeSection}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            className={cn(
              "pointer-events-auto px-10 py-5 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] flex items-center gap-3 shadow-2xl transition-all hover:scale-105 active:scale-95",
              activeSection === "welcome" && "bg-emerald-500 text-black shadow-emerald-500/20",
              activeSection === "process" && "bg-amber-500 text-black shadow-amber-500/20",
              activeSection === "results" && "bg-blue-500 text-white shadow-blue-500/20",
              activeSection === "action" && "bg-indigo-600 text-white shadow-indigo-600/20"
            )}
          >
            {currentSection.cta}
            {activeSection === "action" ? <Zap size={18} fill="currentColor" /> : <ArrowDown size={18} />}
          </motion.button>
        </AnimatePresence>
      </div>

      {/* SECTIONS LIST */}
      <main className="snap-y snap-mandatory h-screen overflow-y-scroll scroll-smooth">
        {SECTIONS.map((section, index) => (
          <section
            key={section.id}
            id={section.id}
            ref={(el) => { observerRefs.current[section.id] = el; }}
            className="h-screen w-full snap-start relative flex items-center justify-center overflow-hidden"
          >
            {/* Background Image with Parallax & Mask */}
            <motion.div 
              className="absolute inset-0 z-0"
              initial={{ scale: 1.1 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 1.5 }}
            >
              <div className="absolute inset-0 bg-black/60 z-10" />
              <img 
                src={section.image} 
                alt={section.title} 
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Content Container */}
            <div className="relative z-20 max-w-5xl w-full px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              
              {/* Left Side: Info */}
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center gap-3"
                >
                  <div className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center border",
                    section.color === "emerald" && "bg-emerald-500/10 border-emerald-500/30 text-emerald-400",
                    section.color === "amber" && "bg-amber-500/10 border-amber-500/30 text-amber-400",
                    section.color === "blue" && "bg-blue-500/10 border-blue-500/30 text-blue-400",
                    section.color === "indigo" && "bg-indigo-500/10 border-indigo-500/30 text-indigo-400"
                  )}>
                    {React.isValidElement(section.icon) && React.cloneElement(section.icon as React.ReactElement<any>, { size: 24 })}
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">
                    Step 0{index + 1}
                  </span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <p className="text-xs font-black uppercase tracking-[0.3em] text-white/30 mb-2">{section.subtitle}</p>
                  <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight italic uppercase mb-6">
                    {section.title.split(' ')[0]} <br />
                    <span className={cn(
                      section.color === "emerald" && "text-emerald-400",
                      section.color === "amber" && "text-amber-400",
                      section.color === "blue" && "text-blue-400",
                      section.color === "indigo" && "text-indigo-400"
                    )}>
                      {section.title.split(' ').slice(1).join(' ')}
                    </span>
                  </h2>
                  <p className="text-lg text-white/50 font-medium leading-relaxed max-w-md">
                    {section.content}
                  </p>
                </motion.div>
              </div>

              {/* Right Side: Decorative Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ delay: 0.6, type: "spring" }}
                className="hidden md:flex justify-end"
              >
                <div className="relative p-12 rounded-[4rem] border border-white/10 bg-white/5 backdrop-blur-xl">
                  <div className="absolute top-0 right-0 p-8">
                     <Sparkles size={40} className="text-white/10" />
                  </div>
                  <div className="space-y-4">
                     <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 w-fit">
                        <CheckCircle2 size={12} className="text-emerald-400" />
                        <span className="text-[8px] font-black uppercase tracking-widest">Verified Quality</span>
                     </div>
                     <div className="text-3xl font-black italic tracking-tighter">
                        Premium <br /> Experience
                     </div>
                  </div>
                </div>
              </motion.div>

            </div>

            {/* Scroll Indicator at bottom of first section */}
            {index === 0 && (
              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/20 flex flex-col items-center gap-2"
              >
                <span className="text-[8px] font-black uppercase tracking-widest">Scroll Down</span>
                <ArrowDown size={14} />
              </motion.div>
            )}
          </section>
        ))}
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        body { background: #020617; overflow: hidden; }
        ::-webkit-scrollbar { width: 0px; }
        .snap-y { scroll-snap-type: y mandatory; }
        .snap-start { scroll-snap-align: start; }
      `}} />

    </div>
  );
}
