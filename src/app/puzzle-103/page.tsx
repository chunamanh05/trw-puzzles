"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronRight, ChevronLeft, Building2, Zap, Shield, Users, BarChart3, Globe, Headphones } from "lucide-react";
import Link from "next/link";

// 1. Data Definitions
const PLANS = [
  {
    id: 0,
    name: "Starter",
    price: "$0",
    period: "/mo",
    description: "Perfect for individuals and side projects.",
    features: ["Up to 10k requests", "Basic analytics", "Community support"],
    cta: "Get Started for Free",
    color: "bg-slate-500",
  },
  {
    id: 1,
    name: "Pro",
    price: "$29",
    period: "/mo",
    description: "Ideal for small teams and growing apps.",
    features: ["Up to 100k requests", "Advanced reporting", "Email support"],
    cta: "Start Pro Trial",
    color: "bg-blue-500",
  },
  {
    id: 2,
    name: "Business",
    price: "$99",
    period: "/mo",
    description: "Scale your business with advanced tools.",
    features: ["Up to 1M requests", "Multi-region support", "Priority support"],
    cta: "Upgrade to Business",
    color: "bg-violet-500",
  },
  {
    id: 3,
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "Unmatched power for large-scale operations.",
    features: ["Unlimited requests", "Dedicated account manager", "24/7 Phone support", "Custom SLAs"],
    cta: "Contact Sales",
    color: "bg-emerald-500",
  },
];

const QUESTIONS = [
  {
    id: "team",
    title: "How large is your team?",
    subtitle: "Including yourself and any collaborators.",
    icon: <Users size={24} />,
    options: [
      { label: "Just me", tier: 0, reason: "Single user setup" },
      { label: "2-10 people", tier: 1, reason: "Small team collaboration" },
      { label: "11-50 people", tier: 2, reason: "Medium-scale organization" },
      { label: "50+ people", tier: 3, reason: "Enterprise-level team" },
    ],
  },
  {
    id: "requests",
    title: "Estimated monthly requests?",
    subtitle: "Approximate volume of API calls or traffic.",
    icon: <Zap size={24} />,
    options: [
      { label: "< 10k", tier: 0, reason: "Low volume traffic" },
      { label: "10k - 100k", tier: 1, reason: "Moderate traffic needs" },
      { label: "100k - 1M", tier: 2, reason: "High volume operations" },
      { label: "1M+", tier: 3, reason: "Large-scale request volume" },
    ],
  },
  {
    id: "priority",
    title: "What is your main priority?",
    subtitle: "Select the feature you care about most.",
    icon: <Shield size={24} />,
    options: [
      { label: "Basic Analytics", tier: 0, reason: "Standard data visibility" },
      { label: "Advanced Reporting", tier: 1, reason: "Deep business insights" },
      { label: "Multi-region Support", tier: 2, reason: "Global infrastructure" },
      { label: "Dedicated Support", tier: 3, reason: "Mission-critical uptime" },
    ],
  },
];

export default function PricingRecommender() {
  const [step, setStep] = useState(0); // 0 to QUESTIONS.length, then result
  const [answers, setAnswers] = useState<number[]>([]);
  const [direction, setDirection] = useState(1); // 1 for next, -1 for back

  const isLastStep = step === QUESTIONS.length;

  const handleOptionSelect = (tier: number) => {
    const newAnswers = [...answers];
    newAnswers[step] = tier;
    setAnswers(newAnswers);
    
    // Auto next
    setTimeout(() => {
      setDirection(1);
      setStep(step + 1);
    }, 300);
  };

  const handleBack = () => {
    if (step > 0) {
      setDirection(-1);
      setStep(step - 1);
    }
  };

  const reset = () => {
    setStep(0);
    setAnswers([]);
    setDirection(-1);
  };

  // Recommendation Logic
  const recommendedTierIndex = answers.length > 0 ? Math.max(...answers) : 0;
  const recommendedPlan = PLANS[recommendedTierIndex];

  // Animation variants
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  return (
    <main className="min-h-screen bg-[#020617] text-slate-100 flex items-center justify-center p-6 font-sans">
      <div className="max-w-xl w-full relative">
        
        {/* Progress Header */}
        <div className="mb-12 flex justify-between items-end">
          <div>
            <div className="text-blue-500 font-mono text-xs tracking-widest uppercase mb-1 flex items-center gap-2">
              <Building2 size={14} /> PlanMatch Engine
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Find your perfect plan</h1>
          </div>
          {!isLastStep && (
            <div className="text-slate-500 font-mono text-sm">
              {step + 1} / {QUESTIONS.length}
            </div>
          )}
        </div>

        {/* Progress Bar */}
        {!isLastStep && (
          <div className="h-1 bg-slate-800 rounded-full mb-12 overflow-hidden">
            <motion.div 
              className="h-full bg-blue-500"
              initial={{ width: 0 }}
              animate={{ width: `${((step + 1) / QUESTIONS.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        )}

        <div className="min-h-[400px] relative overflow-hidden">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            {!isLastStep ? (
              <motion.div
                key={step}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="w-full"
              >
                <div className="mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-6">
                    {QUESTIONS[step].icon}
                  </div>
                  <h2 className="text-3xl font-bold mb-2">{QUESTIONS[step].title}</h2>
                  <p className="text-slate-400">{QUESTIONS[step].subtitle}</p>
                </div>

                <div className="space-y-3">
                  {QUESTIONS[step].options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleOptionSelect(option.tier)}
                      className={`w-full p-6 text-left rounded-2xl border transition-all duration-300 flex items-center justify-between group ${
                        answers[step] === option.tier 
                        ? 'bg-blue-500/10 border-blue-500 text-white' 
                        : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:border-slate-700 hover:bg-slate-900'
                      }`}
                    >
                      <span className="text-lg font-medium">{option.label}</span>
                      <div className={`w-6 h-6 rounded-full border flex items-center justify-center transition-colors ${
                        answers[step] === option.tier 
                        ? 'bg-blue-500 border-blue-500 text-white' 
                        : 'border-slate-700 group-hover:border-slate-500'
                      }`}>
                        {answers[step] === option.tier && <Check size={14} strokeWidth={3} />}
                      </div>
                    </button>
                  ))}
                </div>

                {step > 0 && (
                  <button 
                    onClick={handleBack}
                    className="mt-8 flex items-center gap-2 text-slate-500 hover:text-slate-300 transition-colors text-sm font-medium"
                  >
                    <ChevronLeft size={16} /> Previous Question
                  </button>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="result"
                variants={variants}
                initial="enter"
                animate="center"
                transition={{ duration: 0.6 }}
                className="w-full"
              >
                <div className="text-center mb-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-4">
                    Recommendation Ready
                  </div>
                  <h2 className="text-4xl font-bold mb-4">The {recommendedPlan.name} Plan</h2>
                  <p className="text-slate-400 max-w-md mx-auto">
                    Based on your specific needs, we recommend the {recommendedPlan.name} tier for optimal performance and value.
                  </p>
                </div>

                {/* Plan Card */}
                <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 mb-8 relative overflow-hidden">
                  <div className={`absolute top-0 left-0 w-full h-1 ${recommendedPlan.color}`} />
                  
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <div className="text-4xl font-bold mb-1">
                        {recommendedPlan.price}
                        <span className="text-lg text-slate-500 font-normal">{recommendedPlan.period}</span>
                      </div>
                      <p className="text-slate-400 text-sm">{recommendedPlan.description}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    {recommendedPlan.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm text-slate-300">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center text-white ${recommendedPlan.color}`}>
                          <Check size={12} strokeWidth={4} />
                        </div>
                        {feature}
                      </div>
                    ))}
                  </div>

                  <button className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] ${recommendedPlan.color} text-white shadow-lg shadow-blue-500/10`}>
                    {recommendedPlan.cta}
                  </button>
                </div>

                {/* Reasoning Breakdown */}
                <div className="bg-slate-900/30 border border-slate-800/50 rounded-2xl p-6 mb-8">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4 flex items-center gap-2">
                    <BarChart3 size={16} /> Why this match?
                  </h3>
                  <div className="space-y-4">
                    {QUESTIONS.map((q, i) => (
                      <div key={i} className="flex justify-between items-center text-sm">
                        <span className="text-slate-400">{q.title}</span>
                        <span className="text-slate-100 font-medium">
                          {q.options.find(opt => opt.tier === answers[i])?.reason}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-center gap-6">
                  <button 
                    onClick={reset}
                    className="text-slate-500 hover:text-slate-300 transition-colors text-sm font-medium flex items-center gap-2"
                  >
                    Start over
                  </button>
                  <Link 
                    href="/"
                    className="text-blue-500 hover:text-blue-400 transition-colors text-sm font-medium flex items-center gap-2"
                  >
                    Back to Lobby
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer Branding */}
        <div className="mt-12 text-center text-slate-600 text-[10px] uppercase tracking-[0.3em] font-medium">
          TRW PUZZLES &mdash; INTELLIGENT PRICING ENGINE
        </div>
      </div>
    </main>
  );
}
