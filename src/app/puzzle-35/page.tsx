"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ArrowDown } from "lucide-react";
import Link from "next/link";

const SECTIONS = [
  { id: "home", label: "HOME", color: "bg-[#fdfcf0]", textColor: "text-[#8b5a2b]" },
  { id: "menu", label: "MENU", color: "bg-[#faf7e6]", textColor: "text-[#8b5a2b]" },
  { id: "about", label: "ABOUT", color: "bg-[#f5f0d6]", textColor: "text-[#8b5a2b]" },
  { id: "contact", label: "CONTACT", color: "bg-[#efe9c7]", textColor: "text-[#8b5a2b]" },
];

export default function SimpleStickySidebar() {
  const [activeSection, setActiveSection] = useState("home");

  // Scroll Spy Logic
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.6 }
    );

    SECTIONS.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-[#fdfcf0] text-[#8b5a2b] font-serif relative">
      
      {/* HUB RETURN BUTTON */}
      <Link href="/" className="fixed top-8 left-8 z-50 flex items-center gap-2 text-[#8b5a2b]/60 hover:text-[#8b5a2b] transition-colors text-xs font-bold uppercase tracking-widest">
        <ChevronLeft size={14} /> Back to Hub
      </Link>

      {/* MINIMAL DOT NAVIGATION (SIDEBAR) */}
      <nav className="fixed right-10 top-1/2 -translate-y-1/2 z-50 flex flex-col items-end gap-6">
        {SECTIONS.map((section) => {
          const isActive = activeSection === section.id;
          return (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className="group flex items-center gap-4 outline-none"
            >
              {/* LABEL: Only show when active or group-hover */}
              <AnimatePresence>
                {(isActive) && (
                  <motion.span
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="text-[10px] font-black tracking-[0.2em] text-[#8b5a2b]"
                  >
                    {section.label}
                  </motion.span>
                )}
              </AnimatePresence>

              {/* THE DOT */}
              <div className="relative flex items-center justify-center w-6 h-6">
                {isActive && (
                  <motion.div 
                    layoutId="dot-outline"
                    className="absolute inset-0 border border-[#8b5a2b] rounded-full"
                  />
                )}
                <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  isActive ? 'bg-[#8b5a2b] scale-125' : 'bg-[#8b5a2b]/30 group-hover:bg-[#8b5a2b]/60'
                }`} />
              </div>
            </button>
          );
        })}
      </nav>

      {/* SCROLLABLE SECTIONS */}
      <div className="flex-1">
        {SECTIONS.map((section, idx) => (
          <section
            key={section.id}
            id={section.id}
            className={`min-h-screen flex flex-col items-center justify-center p-12 ${section.color} transition-colors duration-1000 relative`}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <span className="text-xs font-bold tracking-[0.4em] text-[#8b5a2b]/40 mb-4 block">SECTION {idx + 1}</span>
              <h1 className="text-6xl md:text-9xl font-black tracking-tighter mb-8 lowercase">
                {section.label}.
              </h1>
              <div className="w-20 h-1 bg-[#8b5a2b]/20 mx-auto mb-8 rounded-full" />
              <p className="max-w-xl text-lg text-[#8b5a2b]/70 font-medium leading-relaxed italic mx-auto">
                Simple, elegant, and effective navigation. The sidebar is now a minimal dot-system on the right.
              </p>
            </motion.div>

            {idx < SECTIONS.length - 1 && (
              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[#8b5a2b]/20"
              >
                <ArrowDown size={24} />
              </motion.div>
            )}
          </section>
        ))}
      </div>

    </main>
  );
}
