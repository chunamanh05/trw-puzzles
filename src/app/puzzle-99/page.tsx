"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dumbbell, ChevronRight, RotateCcw, Download, Phone, Zap, CheckCircle } from "lucide-react";

/**
 * PUZZLE #99: Dynamic Lead Scoring & Qualification System
 * Theme: Fitness Coaching
 *
 * Flow: Question 1→5 (each answer maps to score) → Calculate total → Classify tier → Show CTA
 * Score range: 5 (min) to 15 (max)
 * Tiers: cold (5-8) | warm (9-11) | hot (12-15)
 */

// ─── DATA LAYER (Simulated Database) ─────────────────────────────────────────

interface Option { label: string; text: string; score: number; }
interface Question { id: number; icon: string; question: string; hint: string; options: Option[]; }

const QUESTIONS: Question[] = [
  {
    id: 1,
    icon: "🎯",
    question: "What is your primary fitness goal?",
    hint: "Helps us tailor the right program for you.",
    options: [
      { label: "A", text: "Just get moving — I'm a complete beginner", score: 1 },
      { label: "B", text: "Improve overall health & energy levels",      score: 2 },
      { label: "C", text: "Lose weight and transform my body",           score: 3 },
      { label: "D", text: "Build serious muscle & athletic performance", score: 3 },
    ],
  },
  {
    id: 2,
    icon: "📅",
    question: "How many days per week can you commit to training?",
    hint: "Be honest — consistency beats intensity.",
    options: [
      { label: "A", text: "1–2 days (very limited schedule)", score: 1 },
      { label: "B", text: "3 days (moderate commitment)",     score: 2 },
      { label: "C", text: "4–5 days (serious commitment)",    score: 3 },
      { label: "D", text: "6–7 days (I'm all in)",           score: 3 },
    ],
  },
  {
    id: 3,
    icon: "⏳",
    question: "How long have you been consistently working out?",
    hint: "Helps us calibrate the right starting point.",
    options: [
      { label: "A", text: "Never — I'm just starting out",      score: 1 },
      { label: "B", text: "Less than 6 months",                 score: 2 },
      { label: "C", text: "6 months to 2 years",                score: 2 },
      { label: "D", text: "2+ years but hitting a plateau",     score: 3 },
    ],
  },
  {
    id: 4,
    icon: "💰",
    question: "What's your monthly budget for coaching?",
    hint: "We have options for every level of investment.",
    options: [
      { label: "A", text: "Under $50 — I need free resources",   score: 1 },
      { label: "B", text: "$50 – $150 — Beginner investment",    score: 2 },
      { label: "C", text: "$150 – $300 — I'm serious about it",  score: 3 },
      { label: "D", text: "Over $300 — I want the best results", score: 3 },
    ],
  },
  {
    id: 5,
    icon: "🚧",
    question: "What's your biggest challenge right now?",
    hint: "This is what we'll tackle first together.",
    options: [
      { label: "A", text: "Lack of motivation to start or stay consistent", score: 1 },
      { label: "B", text: "I don't know where to begin",                    score: 2 },
      { label: "C", text: "I need structure and accountability",            score: 2 },
      { label: "D", text: "I'm stuck — not seeing results despite effort",  score: 3 },
    ],
  },
];

// ─── TIER CONFIGURATION ───────────────────────────────────────────────────────

type TierKey = "cold" | "warm" | "hot";

interface TierConfig {
  key: TierKey;
  label: string;
  emoji: string;
  color: string;          // Tailwind text color
  glowColor: string;      // CSS color for SVG stroke & glow
  headline: string;
  message: string;
  ctaLabel: string;
  ctaIcon: React.ElementType;
}

const TIERS: Record<TierKey, TierConfig> = {
  cold: {
    key: "cold",
    label: "Getting Started",
    emoji: "🌱",
    color: "text-emerald-400",
    glowColor: "#34d399",
    headline: "Great first step!",
    message: "You're at the beginning of an exciting journey. We've put together a free guide to help you build the right foundation before diving into a full program.",
    ctaLabel: "Download Free Guide",
    ctaIcon: Download,
  },
  warm: {
    key: "warm",
    label: "Strong Potential",
    emoji: "🔥",
    color: "text-amber-400",
    glowColor: "#f59e0b",
    headline: "You have real commitment.",
    message: "You've got clear goals and the drive to match. A personalized coaching plan will help you break through your current ceiling and get results 3x faster.",
    ctaLabel: "Book a Free Discovery Call",
    ctaIcon: Phone,
  },
  hot: {
    key: "hot",
    label: "Elite Candidate",
    emoji: "⚡",
    color: "text-accent-primary",
    glowColor: "#00f5d4",
    headline: "You're exactly who we work with.",
    message: "Serious goals, serious commitment, and ready to invest in real transformation. Our premium 1-on-1 program was built for people like you.",
    ctaLabel: "Get My Custom Plan",
    ctaIcon: Zap,
  },
};

// ─── HELPERS ──────────────────────────────────────────────────────────────────

const MAX_SCORE = QUESTIONS.length * 3; // 15

function getTier(score: number): TierKey {
  if (score <= 8)  return "cold";
  if (score <= 11) return "warm";
  return "hot";
}

// ─── SUB-COMPONENT: Circular Score Gauge ─────────────────────────────────────

function ScoreGauge({ score, max, glowColor }: { score: number; max: number; glowColor: string }) {
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const progress = score / max;
  const dashOffset = circumference * (1 - progress);

  return (
    <div className="relative flex items-center justify-center w-36 h-36">
      <svg className="absolute" width="144" height="144" viewBox="0 0 144 144">
        {/* Track */}
        <circle cx="72" cy="72" r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
        {/* Progress */}
        <motion.circle
          cx="72" cy="72" r={radius}
          fill="none"
          stroke={glowColor}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: dashOffset }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
          style={{ transformOrigin: "center", transform: "rotate(-90deg)", filter: `drop-shadow(0 0 8px ${glowColor})` }}
        />
      </svg>
      {/* Score text */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, type: "spring" }}
        className="text-center"
      >
        <span className="text-3xl font-black">{score}</span>
        <span className="text-sm text-muted-foreground">/{max}</span>
      </motion.div>
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

type Phase = "start" | "quiz" | "result";

export default function FitnessLeadScore() {
  const [phase, setPhase]               = useState<Phase>("start");
  const [currentQ, setCurrentQ]         = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);  // index in current Q
  const [totalScore, setTotalScore]     = useState(0);

  // ── Derived values ──
  const question    = QUESTIONS[currentQ];
  const progress    = ((currentQ) / QUESTIONS.length) * 100;
  const isLastQ     = currentQ === QUESTIONS.length - 1;

  const handleNext = () => {
    if (selectedOption === null) return;

    const pointsEarned = question.options[selectedOption].score;
    const newScore = totalScore + pointsEarned;

    if (isLastQ) {
      setTotalScore(newScore);
      setPhase("result");
    } else {
      setTotalScore(newScore);
      setCurrentQ((q) => q + 1);
      setSelectedOption(null);
    }
  };

  const handleRetake = () => {
    setPhase("start");
    setCurrentQ(0);
    setSelectedOption(null);
    setTotalScore(0);
  };

  // ── Result data ──
  const tierKey  = getTier(totalScore);
  const tier     = TIERS[tierKey];
  const CtaIcon  = tier.ctaIcon;

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      {/* Ambient glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-accent-primary/5 blur-[140px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/5 blur-[120px] rounded-full" />
      </div>

      {/* Header */}
      <div className="flex items-center gap-2 mb-10 text-accent-primary font-bold text-lg">
        <Dumbbell size={22} />
        <span>FitScore</span>
        <span className="text-xs text-muted-foreground font-normal ml-2 border border-glass-border rounded-full px-2 py-0.5">
          AI-Powered Lead Qualifier
        </span>
      </div>

      <div className="w-full max-w-2xl">
        <AnimatePresence mode="wait">

          {/* ══ START PHASE ══ */}
          {phase === "start" && (
            <motion.div
              key="start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="glass rounded-luxury p-12 text-center luxury-shadow flex flex-col items-center justify-center min-h-[400px]"
            >
              <div className="w-16 h-16 bg-accent-primary/10 rounded-2xl flex items-center justify-center mb-6 border border-accent-primary/20 text-accent-primary">
                <Zap size={32} />
              </div>
              <h1 className="text-3xl sm:text-4xl font-black mb-4 leading-tight">
                Discover Your True<br />Fitness Potential
              </h1>
              <p className="text-muted-foreground mb-10 max-w-md mx-auto text-sm sm:text-base">
                Take our 2-minute assessment to find out exactly which coaching program aligns with your goals, budget, and commitment level.
              </p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setPhase("quiz")}
                className="w-full sm:w-auto px-10 h-14 bg-accent-primary text-background text-lg font-bold rounded-xl flex items-center justify-center gap-2 transition-all"
              >
                Start Assessment
                <ChevronRight size={20} />
              </motion.button>
            </motion.div>
          )}

          {/* ══ QUIZ PHASE ══ */}
          {phase === "quiz" && (
            <motion.div
              key={`q-${currentQ}`}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              {/* Progress */}
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                <span>QUESTION {currentQ + 1} OF {QUESTIONS.length}</span>
                <span className="text-accent-primary font-bold">{Math.round(progress + 20)}%</span>
              </div>
              <div className="h-1 bg-white/5 rounded-full mb-8 overflow-hidden">
                <motion.div
                  className="h-full bg-accent-primary rounded-full"
                  initial={{ width: `${progress}%` }}
                  animate={{ width: `${progress + 20}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>

              {/* Question Card */}
              <div className="glass rounded-luxury p-8 luxury-shadow">
                {/* Question header */}
                <div className="flex items-start gap-5 mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-accent-primary/10 border border-accent-primary/20 flex items-center justify-center text-3xl shrink-0">
                    {question.icon}
                  </div>
                  <div className="pt-1">
                    <h2 className="text-2xl font-bold leading-snug">{question.question}</h2>
                    <p className="text-sm text-muted-foreground mt-2">{question.hint}</p>
                  </div>
                </div>

                {/* Options */}
                <div className="space-y-3 mb-8">
                  {question.options.map((opt, idx) => {
                    const isSelected = selectedOption === idx;
                    return (
                      <motion.button
                        key={idx}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => setSelectedOption(idx)}
                        className={`w-full flex items-center gap-5 px-6 py-5 rounded-2xl border text-left transition-all
                          ${isSelected
                            ? "border-accent-primary/60 bg-accent-primary/10 text-foreground"
                            : "border-glass-border bg-black/20 text-muted-foreground hover:border-white/20 hover:text-foreground"
                          }`}
                      >
                        <span className={`text-sm font-bold w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border transition-all
                          ${isSelected ? "bg-accent-primary text-background border-accent-primary" : "border-glass-border"}`}>
                          {opt.label}
                        </span>
                        <span className="text-lg font-medium">{opt.text}</span>
                        {isSelected && <CheckCircle size={20} className="ml-auto text-accent-primary shrink-0" />}
                      </motion.button>
                    );
                  })}
                </div>

                {/* Next button */}
                <motion.button
                  onClick={handleNext}
                  disabled={selectedOption === null}
                  whileHover={selectedOption !== null ? { scale: 1.02 } : {}}
                  whileTap={selectedOption !== null ? { scale: 0.98 } : {}}
                  className={`w-full h-14 text-lg rounded-xl font-bold flex items-center justify-center gap-2 transition-all mt-4
                    ${selectedOption !== null
                      ? "bg-accent-primary text-background cursor-pointer"
                      : "bg-white/5 text-muted-foreground/40 cursor-not-allowed"
                    }`}
                >
                  {isLastQ ? "See My Results" : "Next Question"}
                  <ChevronRight size={20} />
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* ══ RESULT PHASE ══ */}
          {phase === "result" && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="max-w-lg mx-auto"
            >
              <div className="glass rounded-luxury p-8 luxury-shadow text-center">
                {/* Title */}
                <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Your Lead Score</p>
                <p className="text-sm text-muted-foreground mb-6">Assessment complete — here are your results</p>

                {/* Score Gauge */}
                <div className="flex justify-center mb-5">
                  <ScoreGauge score={totalScore} max={MAX_SCORE} glowColor={tier.glowColor} />
                </div>

                {/* Tier Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-6 text-sm font-semibold ${tier.color}`}
                  style={{ borderColor: tier.glowColor + "40", backgroundColor: tier.glowColor + "15" }}
                >
                  <span>{tier.emoji}</span>
                  {tier.label}
                </motion.div>

                {/* Message */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="mb-8"
                >
                  <h3 className="font-bold text-lg mb-2">{tier.headline}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-sm mx-auto">
                    {tier.message}
                  </p>
                </motion.div>

                {/* CTAs */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="flex gap-3"
                >
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex-1 h-12 rounded-xl font-bold flex items-center justify-center gap-2 text-sm"
                    style={{ background: `linear-gradient(135deg, ${tier.glowColor}, ${tier.glowColor}cc)`, color: "#0a0a0a" }}
                  >
                    <CtaIcon size={16} />
                    {tier.ctaLabel}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleRetake}
                    className="h-12 px-4 rounded-xl border border-glass-border text-muted-foreground hover:text-foreground transition-all flex items-center gap-2 text-sm"
                  >
                    <RotateCcw size={14} />
                    Retake
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
