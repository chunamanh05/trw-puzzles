"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
  Globe, 
  BrainCircuit, 
  MessageSquare, 
  Eye, 
  LineChart, 
  Zap, 
  Layers, 
  Hexagon 
} from "lucide-react";
import { dictionaries, Locale } from "../dictionaries";

const iconMap: Record<string, React.ElementType> = {
  ml: BrainCircuit,
  nlp: MessageSquare,
  cv: Eye,
  strategy: LineChart,
  predictive: Zap,
  integration: Layers
};

const LOCALES: { code: Locale; label: string }[] = [
  { code: 'en', label: 'EN' },
  { code: 'vi', label: 'VI' },
  { code: 'es', label: 'ES' },
];

export default function MultilingualPage() {
  const params = useParams();
  const router = useRouter();
  
  // Extract lang from URL (e.g. /puzzle-13/vi)
  const lang = (params?.lang as Locale) || 'en';
  const dict = dictionaries[lang] || dictionaries['en']; // Fallback
  
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const changeLanguage = (newLang: Locale) => {
    router.push(`/puzzle-13/${newLang}`);
  };

  if (!isMounted) return null;

  return (
    <main className="min-h-screen bg-[#05050A] text-slate-200 font-sans selection:bg-blue-500/30">
      
      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-8">
        
        {/* Navbar */}
        <nav className="flex flex-col md:flex-row items-center justify-between gap-6 mb-24">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.3)]">
              <Hexagon className="text-white" size={22} />
            </div>
            <span className="text-xl font-black text-white tracking-tight">TRW.AI</span>
          </div>

          <div className="flex items-center gap-8 text-sm font-medium text-slate-400">
            <a href="#" className="hover:text-white transition-colors">{dict.nav.home}</a>
            <a href="#" className="text-blue-400">{dict.nav.services}</a>
            <a href="#" className="hover:text-white transition-colors">{dict.nav.about}</a>
            <a href="#" className="hover:text-white transition-colors">{dict.nav.contact}</a>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-white/5 p-1.5 rounded-full border border-white/10 backdrop-blur-md">
            <Globe size={16} className="text-slate-400 ml-2 mr-1" />
            {LOCALES.map((loc) => (
              <button
                key={loc.code}
                onClick={() => changeLanguage(loc.code)}
                className={`px-3 py-1.5 text-xs font-bold rounded-full transition-all duration-300 ${
                  lang === loc.code 
                    ? "bg-blue-600 text-white shadow-lg" 
                    : "text-slate-400 hover:text-white hover:bg-white/10"
                }`}
              >
                {loc.label}
              </button>
            ))}
          </div>
        </nav>

        {/* Hero Section */}
        <div className="text-center mb-20">
          <motion.h1 
            key={`title-${lang}`} // Key forces re-animation on language change
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight"
          >
            {dict.hero.title}
          </motion.h1>
          <motion.p 
            key={`sub-${lang}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto"
          >
            {dict.hero.subtitle}
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dict.services.map((service, idx) => {
            const Icon = iconMap[service.id];
            return (
              <motion.div
                key={`${service.id}-${lang}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="group p-8 rounded-3xl bg-slate-900/50 border border-slate-800 hover:bg-slate-800/50 hover:border-blue-500/30 transition-all duration-300"
              >
                <div className="w-14 h-14 bg-blue-500/10 text-blue-400 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-500 group-hover:text-white transition-colors duration-300">
                  <Icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-4 leading-snug">
                  {service.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
                  {service.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </main>
  );
}
