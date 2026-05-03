"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Thermometer, Cloud, Sun, Snowflake, Moon, ChevronRight, Navigation, CloudRain, CloudFog, Wind, Droplets } from "lucide-react";
import Link from "next/link";

const API_KEY = "d213abf148564bdc9d3104117260305";

type ThemeConfig = {
  name: string;
  bgClass: string;
  textColor: string;
  accentColor: string;
  title: string;
  subtitle: string;
  cta: string;
  icon: any;
  buttonClass: string;
};

const THEMES: Record<string, ThemeConfig> = {
  sunny: {
    name: "Golden Hour",
    bgClass: "bg-[radial-gradient(circle_at_70%_-20%,#f59e0b,rgba(251,191,36,0)_45%),radial-gradient(circle_at_center,#fffbeb,#fef3c7)]",
    textColor: "text-amber-950",
    accentColor: "bg-amber-600",
    title: "Pure Solar Energy",
    subtitle: "The world is bathed in light. It's the perfect time to bring your brightest ideas to life.",
    cta: "Capture the Light",
    icon: Sun,
    buttonClass: "bg-amber-600 text-white shadow-amber-200",
  },
  cloudy: {
    name: "Steady Overcast",
    bgClass: "bg-[radial-gradient(circle_at_center,#334155,#0f172a)]",
    textColor: "text-slate-100",
    accentColor: "bg-blue-500",
    title: "Steady as the Clouds",
    subtitle: "No distracting sunshine. Just you and your most important work in a calm, balanced environment.",
    cta: "Stay in the Flow",
    icon: Cloud,
    buttonClass: "bg-white text-slate-900 shadow-blue-900/20",
  },
  rainy: {
    name: "Rainy Day Rhythm",
    bgClass: "bg-[radial-gradient(circle_at_top,#0f172a,#020617)]",
    textColor: "text-blue-100",
    accentColor: "bg-blue-500",
    title: "Liquid Creativity",
    subtitle: "Let the rhythm of the rain guide your focus. A perfect day for deep work and reflection.",
    cta: "Dive Into Flow",
    icon: CloudRain,
    buttonClass: "bg-blue-600 text-white shadow-blue-900/40",
  },
  snowy: {
    name: "Snow Day Silence",
    bgClass: "bg-[radial-gradient(circle_at_top,#f1f5f9,#94a3b8)]",
    textColor: "text-slate-900",
    accentColor: "bg-sky-500",
    title: "Snow Day Productivity",
    subtitle: "The world is wrapped in white. Time to wrap up those pending tasks with absolute clarity.",
    cta: "Get Cozy & Code",
    icon: Snowflake,
    buttonClass: "bg-slate-900 text-white shadow-slate-200",
  },
  default: {
    name: "Midnight Velocity",
    bgClass: "bg-[#020617]",
    textColor: "text-white",
    accentColor: "bg-violet-600",
    title: "Global Velocity",
    subtitle: "Detecting your local environment... Adaptive UI initializing.",
    cta: "Initialize System",
    icon: Navigation,
    buttonClass: "bg-violet-600 text-white shadow-violet-900/20",
  }
};

export default function LocationAwareHero() {
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [themeKey, setThemeKey] = useState<string>("default");

  useEffect(() => {
    async function fetchWeather() {
      try {
        const res = await fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=auto:ip&aqi=no`);
        const data = await res.json();
        setWeather(data);
        
        const condition = data.current.condition.text.toLowerCase();
        
        if (condition.includes("snow") || condition.includes("ice") || condition.includes("sleet")) {
          setThemeKey("snowy");
        } else if (condition.includes("rain") || condition.includes("drizzle") || condition.includes("thunder") || condition.includes("shower")) {
          setThemeKey("rainy");
        } else if (condition.includes("cloud") || condition.includes("overcast") || condition.includes("mist") || condition.includes("fog")) {
          setThemeKey("cloudy");
        } else if (condition.includes("sun") || condition.includes("clear")) {
          setThemeKey("sunny");
        } else {
          setThemeKey("default");
        }
      } catch (error) {
        console.error("Weather fetch failed", error);
      } finally {
        setLoading(false);
      }
    }
    fetchWeather();
  }, []);

  const theme = THEMES[themeKey] || THEMES.default;

  return (
    <main className={`min-h-screen ${theme.bgClass} ${theme.textColor} transition-all duration-1000 relative overflow-hidden flex flex-col font-sans`}>
      
      {/* ATMOSPHERIC BACKGROUND LAYERS */}
      <AnimatePresence>
        {/* SUNBEAMS for Sunny */}
        {themeKey === 'sunny' && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 z-0 pointer-events-none"
          >
            <div className="absolute top-0 right-0 w-[90%] h-[90%] bg-[radial-gradient(circle_at_80%_0%,rgba(251,191,36,0.5),transparent_60%)] blur-[150px]" />
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
              className="absolute -top-[50%] -right-[50%] w-[200%] h-[200%] opacity-[0.05]"
              style={{ backgroundImage: 'repeating-conic-gradient(from 0deg, transparent 0deg, transparent 15deg, #fbbf24 16deg, #fbbf24 17deg)' }}
            />
          </motion.div>
        )}

        {/* THICK CLOUDS for Cloudy */}
        {themeKey === 'cloudy' && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 z-0 pointer-events-none"
          >
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ x: -800, y: Math.random() * 800 }}
                animate={{ x: 2000 }}
                transition={{ duration: 25 + i * 15, repeat: Infinity, ease: "linear" }}
                className="absolute opacity-[0.25] mix-blend-overlay"
              >
                <div className="w-[1000px] h-[400px] bg-slate-100 rounded-full blur-[120px]" />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* DENSE RAIN for Rainy */}
        {themeKey === 'rainy' && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 z-0 pointer-events-none"
          >
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 via-transparent to-black/20" />
            {[...Array(120)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ y: -300, x: Math.random() * 100 + "%" }}
                animate={{ y: 1500 }}
                transition={{ duration: 0.3 + Math.random() * 0.3, repeat: Infinity, ease: "linear", delay: Math.random() * 2 }}
                className="absolute w-[2px] h-[150px] bg-gradient-to-b from-transparent via-blue-300/40 to-transparent"
              />
            ))}
            {/* Splash effect mockup */}
            <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-blue-500/10 to-transparent blur-3xl" />
          </motion.div>
        )}

        {/* HEAVY SNOWFALL for Snowy */}
        {themeKey === 'snowy' && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 z-0 pointer-events-none"
          >
            <div className="absolute inset-0 bg-white/10" />
            <div className="absolute bottom-0 w-full h-[30%] bg-gradient-to-t from-white/60 to-transparent blur-2xl" />
            {[...Array(150)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ y: -50, x: Math.random() * 100 + "%", opacity: 0, scale: 0.5 + Math.random() }}
                animate={{ 
                  y: 1200, 
                  x: (Math.random() * 100) + (Math.random() * 10 - 5) + "%", 
                  opacity: [0, 1, 1, 0],
                  rotate: 360
                }}
                transition={{ duration: 6 + Math.random() * 12, repeat: Infinity, delay: Math.random() * 10 }}
                className="absolute w-3 h-3 bg-white rounded-full blur-[0.8px] shadow-[0_0_20px_rgba(255,255,255,0.8)]"
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className={`fixed inset-0 pointer-events-none z-0`} />

      {/* Navigation */}
      <nav className="relative z-20 w-full px-12 py-10 flex justify-between items-center">
        <div className="flex items-center gap-3 font-black text-2xl tracking-tighter italic">
          <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center text-white">V</div>
          Velocity
        </div>
        <div className="hidden lg:flex items-center gap-10 text-sm font-bold uppercase tracking-widest opacity-60">
          <span>Features</span>
          <span>Pricing</span>
          <span>Docs</span>
          <span>Blog</span>
        </div>
        <div className="flex items-center gap-6">
          <span className="text-sm font-bold opacity-60">Sign in</span>
          <button className="px-8 py-3 bg-black text-white rounded-lg text-sm font-bold">
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="flex-1 flex flex-col items-center justify-center text-center px-6 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={themeKey}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
            className="max-w-5xl"
          >
            {/* Condition Badge */}
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-black/5 border border-black/10 backdrop-blur-md mb-12">
              <theme.icon size={20} className="animate-pulse" />
              <span className="text-[11px] font-black uppercase tracking-[0.5em] opacity-80">
                {weather?.current?.condition?.text || "Synchronizing Environment"}
              </span>
            </div>

            <h1 className="text-7xl md:text-[10rem] font-black tracking-tighter leading-[0.8] mb-12 drop-shadow-sm">
              {theme.title}
            </h1>

            <p className="text-xl md:text-3xl font-medium opacity-70 max-w-2xl mx-auto mb-16 leading-tight">
              {theme.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
              <button className={`px-12 py-6 rounded-2xl font-black text-2xl transition-all hover:scale-105 active:scale-95 shadow-2xl ${theme.buttonClass}`}>
                {theme.cta}
              </button>
              <button className="px-12 py-6 rounded-2xl border border-black/20 font-black text-2xl hover:bg-black/5 flex items-center gap-4">
                <Navigation size={24} /> Watch Demo
              </button>
            </div>

            {/* Client List */}
            <div className="mt-28 pt-12 border-t border-black/10 flex flex-wrap justify-center gap-16 opacity-40 grayscale font-black tracking-tighter text-xl">
              {["Acme Corp", "Globex", "Initech", "Hooli", "Pied Piper"].map(client => (
                <span key={client}>{client}</span>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* LOCATION DASHBOARD */}
      <div className="relative z-20 w-full p-12 flex justify-center">
        <div className="bg-black/10 border border-black/10 backdrop-blur-2xl rounded-[2.5rem] px-12 py-6 flex items-center gap-16 shadow-2xl border-white/10 overflow-hidden">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-black/20 rounded-2xl flex items-center justify-center border border-white/5">
              <MapPin size={28} className="text-red-500" />
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] font-black uppercase tracking-widest opacity-50 mb-1">Current Location</span>
              <span className="text-xl font-black">{loading ? "Detecting..." : `${weather?.location?.name}, ${weather?.location?.country}`}</span>
            </div>
          </div>
          
          <div className="w-px h-12 bg-black/20" />

          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-black/20 rounded-2xl flex items-center justify-center border border-white/5">
              <Thermometer size={28} className="text-orange-500" />
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] font-black uppercase tracking-widest opacity-50 mb-1">Temperature</span>
              <span className="text-xl font-black">{weather?.current?.temp_c}°C</span>
            </div>
          </div>

          <div className="w-px h-12 bg-black/20" />

          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-black/20 rounded-2xl flex items-center justify-center border border-white/5">
              <Wind size={28} className="text-blue-500" />
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] font-black uppercase tracking-widest opacity-50 mb-1">Condition</span>
              <span className="text-xl font-black">{weather?.current?.condition?.text}</span>
            </div>
          </div>
        </div>
      </div>

      {/* SIMULATOR */}
      <div className="fixed bottom-12 right-12 z-50 flex flex-col gap-4">
        <span className="text-[10px] font-black text-center bg-black text-white px-3 py-1.5 rounded-lg shadow-xl">SIMULATOR</span>
        {[
          { key: "sunny", icon: Sun, color: "bg-amber-500" },
          { key: "cloudy", icon: Cloud, color: "bg-slate-900" },
          { key: "rainy", icon: CloudRain, color: "bg-blue-600" },
          { key: "snowy", icon: Snowflake, color: "bg-white text-black border-2 border-slate-200" }
        ].map(btn => (
          <button 
            key={btn.key}
            onClick={() => setThemeKey(btn.key)}
            className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-2xl transition-all hover:scale-110 active:scale-90 ${btn.color} ${btn.key === themeKey ? 'ring-4 ring-black/20 scale-110' : ''}`}
          >
            <btn.icon size={24} />
          </button>
        ))}
      </div>
    </main>
  );
}
