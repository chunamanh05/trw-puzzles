"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Thermometer, Cloud, Sun, Snowflake, Moon, ChevronRight, Navigation, CloudRain, Wind } from "lucide-react";
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
    bgClass: "bg-[#fffbeb] bg-[radial-gradient(circle_at_80%_0%,#fef3c7,#fffbeb)]",
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
    bgClass: "bg-[#0f172a] bg-[radial-gradient(circle_at_center,#1e293b,#0f172a)]",
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
    bgClass: "bg-[#020617] bg-[radial-gradient(circle_at_top,#0f172a,#020617)]",
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
    bgClass: "bg-[#f1f5f9] bg-[radial-gradient(circle_at_top,#f1f5f9,#94a3b8)]",
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

  // Generate stable random cloud configurations to prevent re-shuffling on every render
  const cloudConfigs = useMemo(() => {
    return [...Array(10)].map((_, i) => ({
      id: i,
      delay: Math.random() * -60, // Random starting position in cycle
      duration: 30 + Math.random() * 40, // Random speed
      top: (Math.random() * 80) + "%", // Random vertical position
      scale: 0.5 + Math.random() * 1.5, // Random size
      opacity: 0.2 + Math.random() * 0.4, // Random opacity
      direction: Math.random() > 0.5 ? 1 : -1, // Random direction (L-to-R or R-to-L)
    }));
  }, []);

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
        {/* SHARP SUN for Sunny */}
        {themeKey === 'sunny' && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 z-0 pointer-events-none"
          >
            <div className="absolute top-20 right-20 w-40 h-40 bg-amber-400 rounded-full shadow-[0_0_100px_#fbbf24] z-10" />
            <div className="absolute top-20 right-20 w-40 h-40 bg-white rounded-full blur-[2px] z-20" />
            
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="absolute top-40 right-40 w-[1000px] h-[1000px] -translate-y-1/2 translate-x-1/2 opacity-[0.15]"
              style={{ backgroundImage: 'repeating-conic-gradient(from 0deg, #f59e0b 0deg, #f59e0b 2deg, transparent 3deg, transparent 15deg)' }}
            />
            <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_0%,rgba(251,191,36,0.4),transparent_60%)]" />
          </motion.div>
        )}

        {/* RANDOMIZED CLOUDS for Cloudy */}
        {themeKey === 'cloudy' && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 z-0 pointer-events-none"
          >
            {cloudConfigs.map((cloud) => (
              <motion.div
                key={cloud.id}
                initial={{ 
                  left: cloud.direction === 1 ? "-60%" : "120%", 
                  top: cloud.top,
                  scale: cloud.scale,
                  opacity: cloud.opacity 
                }}
                animate={{ 
                  left: cloud.direction === 1 ? "120%" : "-60%" 
                }}
                transition={{ 
                  duration: cloud.duration, 
                  repeat: Infinity, 
                  ease: "linear", 
                  delay: cloud.delay 
                }}
                className="absolute flex flex-col items-center"
                style={{ width: "600px" }}
              >
                <div className="relative">
                  <div className="w-[400px] h-[120px] bg-slate-300 rounded-full shadow-lg" />
                  <div className="absolute -top-16 left-20 w-[180px] h-[180px] bg-slate-300 rounded-full" />
                  <div className="absolute -top-12 right-24 w-[140px] h-[140px] bg-slate-300 rounded-full" />
                </div>
              </motion.div>
            ))}
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[1px]" />
          </motion.div>
        )}

        {/* DENSE RAIN for Rainy */}
        {themeKey === 'rainy' && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 z-0 pointer-events-none"
          >
            <div className="absolute inset-0 bg-black/40" />
            {[...Array(150)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ top: "-200px" }}
                animate={{ top: "120vh" }}
                transition={{ duration: 0.3 + Math.random() * 0.3, repeat: Infinity, ease: "linear", delay: Math.random() * 3 }}
                className="absolute w-[2px] h-[150px] bg-gradient-to-b from-transparent via-blue-300/60 to-transparent"
                style={{ left: (Math.random() * 100) + "%" }}
              />
            ))}
            <div className="absolute bottom-0 w-full h-64 bg-gradient-to-t from-blue-500/10 to-transparent blur-3xl" />
          </motion.div>
        )}

        {/* HEAVY SNOWFALL for Snowy */}
        {themeKey === 'snowy' && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 z-0 pointer-events-none"
          >
            <div className="absolute inset-0 bg-white/5" />
            <div className="absolute bottom-0 w-full h-[40%] bg-gradient-to-t from-white/60 to-transparent blur-3xl" />
            {[...Array(180)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ top: "-50px", opacity: 0, scale: 0.5 + Math.random() }}
                animate={{ 
                  top: "110vh", 
                  left: (Math.random() * 100 + (Math.random() * 10 - 5)) + "%", 
                  opacity: [0, 1, 1, 0],
                  rotate: 360
                }}
                transition={{ duration: 8 + Math.random() * 15, repeat: Infinity, delay: Math.random() * 15 }}
                className="absolute w-3 h-3 bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,0.9)]"
                style={{ left: (Math.random() * 100) + "%" }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <nav className="relative z-20 w-full px-12 py-10 flex justify-between items-center">
        <div className="flex items-center gap-3 font-black text-2xl tracking-tighter italic">
          <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center text-white font-sans not-italic">V</div>
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
            className="max-w-6xl"
          >
            {/* Condition Badge */}
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-black/5 border border-black/10 backdrop-blur-xl mb-14">
              <theme.icon size={22} className="animate-pulse" />
              <span className="text-xs font-black uppercase tracking-[0.6em] opacity-80">
                {weather?.current?.condition?.text || "Synchronizing Environment"}
              </span>
            </div>

            <h1 className="text-7xl md:text-[11rem] font-black tracking-tighter leading-[0.75] mb-14 drop-shadow-xl">
              {theme.title}
            </h1>

            <p className="text-xl md:text-4xl font-medium opacity-80 max-w-3xl mx-auto mb-20 leading-tight">
              {theme.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-10">
              <button className={`px-14 py-7 rounded-[2rem] font-black text-3xl transition-all hover:scale-110 active:scale-95 shadow-[0_20px_50px_rgba(0,0,0,0.15)] ${theme.buttonClass}`}>
                {theme.cta}
              </button>
              <button className="px-14 py-7 rounded-[2rem] border-2 border-black/10 font-black text-3xl hover:bg-black/5 flex items-center gap-5 transition-all">
                <Navigation size={28} /> Watch Demo
              </button>
            </div>

            {/* Client List */}
            <div className="mt-32 pt-16 border-t border-black/10 flex flex-wrap justify-center gap-20 opacity-50 grayscale font-black tracking-tighter text-2xl">
              {["Acme Corp", "Globex", "Initech", "Hooli", "Pied Piper"].map(client => (
                <span key={client}>{client}</span>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* LOCATION DASHBOARD */}
      <div className="relative z-20 w-full p-16 flex justify-center">
        <div className="bg-white/10 dark:bg-black/20 border border-white/20 backdrop-blur-3xl rounded-[3rem] px-16 py-8 flex items-center gap-20 shadow-[0_50px_100px_rgba(0,0,0,0.2)] overflow-hidden">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-black/10 rounded-[1.5rem] flex items-center justify-center border border-white/10">
              <MapPin size={32} className="text-red-500" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[12px] font-black uppercase tracking-widest opacity-50 mb-1">Current Location</span>
              <span className="text-2xl font-black tracking-tight">{loading ? "Detecting..." : `${weather?.location?.name}, ${weather?.location?.country}`}</span>
            </div>
          </div>
          
          <div className="w-px h-16 bg-white/10" />

          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-black/10 rounded-[1.5rem] flex items-center justify-center border border-white/10">
              <Thermometer size={32} className="text-orange-500" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[12px] font-black uppercase tracking-widest opacity-50 mb-1">Temperature</span>
              <span className="text-2xl font-black tracking-tight">{weather?.current?.temp_c}°C</span>
            </div>
          </div>

          <div className="w-px h-16 bg-white/10" />

          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-black/10 rounded-[1.5rem] flex items-center justify-center border border-white/10">
              <Wind size={32} className="text-blue-500" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[12px] font-black uppercase tracking-widest opacity-50 mb-1">Conditions</span>
              <span className="text-2xl font-black tracking-tight">{weather?.current?.condition?.text}</span>
            </div>
          </div>
        </div>
      </div>

      {/* SIMULATOR */}
      <div className="fixed bottom-16 right-16 z-50 flex flex-col gap-5">
        <span className="text-[12px] font-black text-center bg-black text-white px-4 py-2 rounded-xl shadow-2xl tracking-widest">SIMULATOR</span>
        {[
          { key: "sunny", icon: Sun, color: "bg-amber-500" },
          { key: "cloudy", icon: Cloud, color: "bg-slate-900" },
          { key: "rainy", icon: CloudRain, color: "bg-blue-600" },
          { key: "snowy", icon: Snowflake, color: "bg-white text-black border-4 border-slate-200" }
        ].map(btn => (
          <button 
            key={btn.key}
            onClick={() => setThemeKey(btn.key)}
            className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center shadow-2xl transition-all hover:scale-125 active:scale-90 ${btn.color} ${btn.key === themeKey ? 'ring-4 ring-black/30 scale-110 shadow-indigo-500/20' : ''}`}
          >
            <btn.icon size={28} />
          </button>
        ))}
      </div>
    </main>
  );
}
