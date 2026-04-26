"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Coffee, MapPin, Star, ArrowRight, Wifi, Leaf } from "lucide-react";
import { HEADLINES_DB, DEFAULT_HEADLINE } from "./data";

/**
 * PUZZLE #11: Dynamic Headlines via Referral Source
 *
 * Core concept: Read `?ref=` from URL → look up in "database" → render personalized headline.
 * Try these URLs to see it in action:
 *   /puzzle-11?ref=google
 *   /puzzle-11?ref=facebook
 *   /puzzle-11?ref=instagram
 *   /puzzle-11?ref=twitter
 *   /puzzle-11?ref=email
 */

// ─── Stats ────────────────────────────────────────────────────────────────────
const STATS = [
  { value: "12+", label: "Locations" },
  { value: "50k+", label: "Happy Guests" },
  { value: "4.9★", label: "Avg Rating" },
];

// ─── Perks ────────────────────────────────────────────────────────────────────
const PERKS = [
  { icon: Leaf, text: "100% Organic Beans" },
  { icon: Wifi, text: "Free High-Speed WiFi" },
  { icon: MapPin, text: "12 Locations Citywide" },
];

// ─── The inner component that uses the hook ───────────────────────────────────
// Must be wrapped in <Suspense> because useSearchParams() suspends rendering.
function CoffeeHero() {
  const searchParams = useSearchParams();
  const ref = searchParams.get("ref") ?? "";

  // ── DATABASE LOOKUP ──
  // This is the core logic of the puzzle.
  // We look up the `ref` param in our "database" (the HEADLINES_DB object).
  // If no match, we fall back to the default entry.
  const content = HEADLINES_DB[ref.toLowerCase()] ?? DEFAULT_HEADLINE;

  return (
    <section className="relative flex-1 flex items-center py-24 px-6 overflow-hidden">

      {/* ── Ambient Glows ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-amber-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-orange-800/10 blur-[100px] rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-16 items-center">

        {/* ── Left: Personalized Content ── */}
        <div>
          {/* Source Badge */}
          <AnimatePresence mode="wait">
            {content.badge && (
              <motion.div
                key={`badge-${ref}`}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="inline-flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 mb-6"
              >
                {content.badge}
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── HEADLINE — The key feature of this puzzle ── */}
          {/* When `ref` changes, AnimatePresence animates the old headline out  */}
          {/* and the new headline in with a smooth blur+slide effect.            */}
          <AnimatePresence mode="wait">
            <motion.h1
              key={`headline-${ref}`}
              initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(6px)" }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="text-5xl md:text-6xl font-black tracking-tight leading-[1.08] mb-6"
              style={{
                background: "linear-gradient(135deg, #fde68a 0%, #f59e0b 40%, #d97706 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {content.headline}
            </motion.h1>
          </AnimatePresence>

          {/* Subheadline */}
          <AnimatePresence mode="wait">
            <motion.p
              key={`sub-${ref}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="text-muted-foreground text-base leading-relaxed mb-8 max-w-md"
            >
              {content.subheadline}
            </motion.p>
          </AnimatePresence>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm"
              style={{ background: "linear-gradient(135deg, #f59e0b, #d97706)", color: "#0a0a0a" }}
            >
              {content.cta} <ArrowRight size={16} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm border border-glass-border hover:border-amber-500/30 text-muted-foreground hover:text-foreground transition-all"
            >
              Find a Location <MapPin size={16} />
            </motion.button>
          </div>

          {/* Stats */}
          <div className="flex gap-8 mt-10 pt-8 border-t border-glass-border">
            {STATS.map((s) => (
              <div key={s.label}>
                <p className="text-xl font-bold text-amber-400">{s.value}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right: Coffee Visual Card ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="hidden md:block"
        >
          <div className="relative">
            {/* Main card */}
            <div className="glass rounded-[2rem] p-8 luxury-shadow flex flex-col items-center gap-6 border border-amber-500/10">
              {/* Coffee emoji visual */}
              <div className="w-32 h-32 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-7xl">
                ☕
              </div>
              <div className="text-center">
                <p className="text-amber-300 font-bold text-xl">Signature Blend</p>
                <p className="text-muted-foreground text-sm mt-1">Ethiopia × Colombia × Guatemala</p>
              </div>
              {/* Perks */}
              <div className="w-full space-y-3 pt-2 border-t border-glass-border">
                {PERKS.map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Icon size={14} className="text-amber-500 shrink-0" />
                    {text}
                  </div>
                ))}
              </div>
            </div>

            {/* Floating rating badge */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-4 -left-4 glass rounded-xl px-4 py-3 flex items-center gap-2 border border-amber-500/20"
            >
              <Star size={14} className="text-amber-400 fill-amber-400" />
              <div>
                <p className="text-xs font-bold text-amber-400">4.9 / 5.0</p>
                <p className="text-[10px] text-muted-foreground">50,000+ reviews</p>
              </div>
            </motion.div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

// ─── Page Shell ───────────────────────────────────────────────────────────────
export default function Puzzle11() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-glass-border max-w-6xl mx-auto w-full mt-4">
        <div className="flex items-center gap-2 font-bold text-lg">
          <Coffee size={20} className="text-amber-400" />
          <span>BrewLab</span>
        </div>
        <div className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
          {["Menu", "Story", "Locations"].map((item) => (
            <a key={item} href="#" className="hover:text-foreground transition-colors">{item}</a>
          ))}
        </div>
        <button
          className="text-sm font-bold px-4 py-2 rounded-lg"
          style={{ background: "linear-gradient(135deg, #f59e0b, #d97706)", color: "#0a0a0a" }}
        >
          Order Now
        </button>
      </nav>

      {/* Hero — wrapped in Suspense because useSearchParams() suspends */}
      <Suspense fallback={<div className="flex-1 flex items-center justify-center text-muted-foreground">Loading...</div>}>
        <CoffeeHero />
      </Suspense>
    </div>
  );
}
