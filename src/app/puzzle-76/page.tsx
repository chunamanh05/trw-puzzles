"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, 
  Briefcase, 
  CheckCircle, 
  ChevronRight, 
  ChevronLeft, 
  ArrowLeft,
  Mail,
  UserCircle,
  Sparkles,
  PartyPopper
} from "lucide-react";
import Link from "next/link";
import { cn } from "../../lib/utils";

// Define Form steps
const STEPS = [
  { id: 1, title: "Identity", sub: "Personal details", icon: UserCircle },
  { id: 2, title: "Scope", sub: "Project details", icon: Briefcase },
  { id: 3, title: "Review", sub: "Final check", icon: CheckCircle },
];

export default function Puzzle76MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    service: "Web Development",
    budget: "5k-10k",
    description: "",
  });

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("puzzle76_form_data");
    if (saved) {
      setFormData(JSON.parse(saved));
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage when formData changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("puzzle76_form_data", JSON.stringify(formData));
    }
  }, [formData, isLoaded]);

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isStepValid = () => {
    if (currentStep === 1) {
      return formData.fullName.length > 2 && /^\S+@\S+\.\S+$/.test(formData.email);
    }
    if (currentStep === 2) {
      return formData.description.length >= 3;
    }
    return true;
  };

  const handleNext = () => {
    if (isStepValid()) {
      if (currentStep < 3) setCurrentStep(prev => prev + 1);
      else {
        setIsSubmitted(true);
        localStorage.removeItem("puzzle76_form_data");
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(prev => prev - 1);
  };

  if (!isLoaded) return null;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col items-center justify-center p-6 selection:bg-indigo-100">
      
      {/* Lobby Link */}
      <Link href="/" className="absolute top-10 left-10 text-xs font-black uppercase tracking-[0.3em] text-slate-300 hover:text-indigo-600 transition-colors flex items-center gap-2">
        <ArrowLeft size={14} /> Lobby
      </Link>

      <div className="w-full max-w-xl">
        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.div
              key="form-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100 overflow-hidden"
            >
              {/* Stepper Header */}
              <div className="bg-slate-50/50 p-8 border-b border-slate-100">
                <div className="flex justify-between items-center relative">
                  {/* Progress Line */}
                  <div className="absolute top-5 left-0 right-0 h-0.5 bg-slate-200 -z-0" />
                  <motion.div 
                    className="absolute top-5 left-0 h-0.5 bg-indigo-600 -z-0"
                    initial={{ width: "0%" }}
                    animate={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
                    transition={{ type: "spring", stiffness: 50, damping: 20 }}
                  />

                  {STEPS.map((step) => (
                    <div key={step.id} className="relative z-10 flex flex-col items-center gap-2">
                      <div className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500",
                        currentStep >= step.id ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200" : "bg-white border-2 border-slate-200 text-slate-400"
                      )}>
                        <step.icon size={20} />
                      </div>
                      <div className="hidden md:block text-center">
                        <p className={cn("text-[10px] font-black uppercase tracking-widest", currentStep >= step.id ? "text-indigo-600" : "text-slate-400")}>
                          {step.title}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Form Content */}
              <div className="p-8 md:p-12 min-h-[400px] flex flex-col">
                <div className="mb-8">
                  <h2 className="text-3xl font-black tracking-tight text-slate-900">{STEPS[currentStep - 1].title}</h2>
                  <p className="text-slate-400 text-sm font-medium">{STEPS[currentStep - 1].sub}</p>
                </div>

                <div className="flex-1">
                  <AnimatePresence mode="wait">
                    {currentStep === 1 && (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                      >
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Full Name</label>
                          <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                            <input 
                              type="text" 
                              value={formData.fullName}
                              onChange={(e) => updateField("fullName", e.target.value)}
                              placeholder="John Doe"
                              className="w-full bg-slate-50 border-2 border-transparent focus:border-indigo-600/10 focus:bg-white outline-none p-4 pl-12 rounded-2xl transition-all font-medium"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Email Address</label>
                          <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                            <input 
                              type="email" 
                              value={formData.email}
                              onChange={(e) => updateField("email", e.target.value)}
                              placeholder="john@example.com"
                              className="w-full bg-slate-50 border-2 border-transparent focus:border-indigo-600/10 focus:bg-white outline-none p-4 pl-12 rounded-2xl transition-all font-medium"
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {currentStep === 2 && (
                      <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                      >
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Service</label>
                            <select 
                              value={formData.service}
                              onChange={(e) => updateField("service", e.target.value)}
                              className="w-full bg-slate-50 border-2 border-transparent focus:border-indigo-600/10 focus:bg-white outline-none p-4 rounded-2xl transition-all font-medium appearance-none"
                            >
                              <option>Web Development</option>
                              <option>Mobile App</option>
                              <option>UI/UX Design</option>
                            </select>
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Budget</label>
                            <select 
                              value={formData.budget}
                              onChange={(e) => updateField("budget", e.target.value)}
                              className="w-full bg-slate-50 border-2 border-transparent focus:border-indigo-600/10 focus:bg-white outline-none p-4 rounded-2xl transition-all font-medium appearance-none"
                            >
                              <option>1k - 5k</option>
                              <option>5k - 10k</option>
                              <option>10k+</option>
                            </select>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Project Description</label>
                          <textarea 
                            rows={4}
                            value={formData.description}
                            onChange={(e) => updateField("description", e.target.value)}
                            placeholder="Tell us about your project..."
                            className="w-full bg-slate-50 border-2 border-transparent focus:border-indigo-600/10 focus:bg-white outline-none p-4 rounded-2xl transition-all font-medium resize-none"
                          />
                          <p className={cn(
                            "text-[9px] font-bold uppercase tracking-widest mt-2 ml-1",
                            formData.description.length >= 3 ? "text-emerald-500" : "text-slate-300"
                          )}>
                            {formData.description.length >= 3 ? "✓ Looks good" : `Minimum 3 characters (${formData.description.length}/3)`}
                          </p>
                        </div>
                      </motion.div>
                    )}

                    {currentStep === 3 && (
                      <motion.div
                        key="step3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                      >
                        <div className="bg-slate-50 p-6 rounded-[2rem] space-y-4">
                          <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                            <span className="text-[10px] font-black uppercase text-slate-400">Client</span>
                            <span className="text-sm font-bold">{formData.fullName}</span>
                          </div>
                          <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                            <span className="text-[10px] font-black uppercase text-slate-400">Project</span>
                            <span className="text-sm font-bold text-indigo-600">{formData.service}</span>
                          </div>
                          <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                            <span className="text-[10px] font-black uppercase text-slate-400">Budget</span>
                            <span className="text-sm font-bold text-emerald-600">{formData.budget}</span>
                          </div>
                          <div className="pt-2">
                            <span className="text-[10px] font-black uppercase text-slate-400 block mb-2">Requirement</span>
                            <p className="text-xs text-slate-500 font-medium leading-relaxed italic line-clamp-3">"{formData.description}"</p>
                          </div>
                        </div>
                        <p className="text-[10px] text-center text-slate-400 font-medium">By submitting, you agree to our terms of service.</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Footer Actions */}
                <div className="flex items-center justify-between pt-12 gap-4">
                  <button 
                    onClick={handleBack}
                    className={cn(
                      "flex items-center gap-2 text-xs font-black uppercase tracking-widest transition-all",
                      currentStep === 1 ? "opacity-0 pointer-events-none" : "text-slate-400 hover:text-slate-900"
                    )}
                  >
                    <ChevronLeft size={16} /> Back
                  </button>
                  <button 
                    onClick={handleNext}
                    disabled={!isStepValid()}
                    className={cn(
                      "group px-8 py-4 rounded-2xl flex items-center gap-2 text-xs font-black uppercase tracking-widest transition-all shadow-xl",
                      isStepValid() 
                        ? "bg-indigo-600 text-white shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-0.5" 
                        : "bg-slate-100 text-slate-300 shadow-none cursor-not-allowed"
                    )}
                  >
                    {currentStep === 3 ? "Launch Project" : "Next Step"}
                    <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="success-card"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-[3rem] p-12 text-center shadow-2xl border border-indigo-100 relative overflow-hidden"
            >
              {/* Confetti Particles Mockup with Framer Motion */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(20)].map((_, i) => (
                  <motion.div 
                    key={i}
                    initial={{ y: 0, x: 0, opacity: 1 }}
                    animate={{ 
                      y: [0, -200, 400], 
                      x: [0, (Math.random() - 0.5) * 600],
                      rotate: [0, 360],
                      opacity: [1, 1, 0]
                    }}
                    transition={{ duration: 3, ease: "easeOut", repeat: Infinity, repeatDelay: 1 }}
                    className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full"
                    style={{ backgroundColor: ["#6366f1", "#f43f5e", "#10b981", "#f59e0b"][i % 4] }}
                  />
                ))}
              </div>

              <div className="relative z-10 space-y-6">
                <div className="w-24 h-24 bg-indigo-600 rounded-[2rem] flex items-center justify-center text-white mx-auto shadow-2xl shadow-indigo-200 animate-bounce">
                  <PartyPopper size={48} />
                </div>
                <div className="space-y-2">
                  <h2 className="text-4xl font-black tracking-tight text-slate-900">Success!</h2>
                  <p className="text-slate-400 font-medium max-w-xs mx-auto">Your project request has been sent successfully. We'll be in touch soon!</p>
                </div>
                <button 
                  onClick={() => {
                    setIsSubmitted(false);
                    setCurrentStep(1);
                    setFormData({ fullName: "", email: "", service: "Web Development", budget: "5k-10k", description: "" });
                  }}
                  className="px-8 py-4 bg-slate-900 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-xl"
                >
                  Create New Request
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Decorative Index */}
      <div className="fixed bottom-10 left-10 text-[20vh] font-black text-slate-100 select-none pointer-events-none -z-20 uppercase">
        Step {currentStep}
      </div>
    </div>
  );
}
