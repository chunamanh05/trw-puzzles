"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Car, 
  CarFront, 
  Zap, 
  ArrowLeft, 
  CheckCircle2,
  DollarSign,
  User,
  Building
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type VehicleType = "car" | "taxi" | "electric" | null;
type PersonType = "physical" | "legal" | null;

interface FormData {
  vehicleType: VehicleType;
  brand: string;
  model: string;
  marketValue: string;
  currency: string;
  personType: PersonType;
  isYoungDriver: boolean;
  isNewDriver: boolean;
}

export default function ProgressiveDisclosureForm() {
  const [formData, setFormData] = useState<FormData>({
    vehicleType: null,
    brand: "",
    model: "",
    marketValue: "",
    currency: "EUR",
    personType: null,
    isYoungDriver: false,
    isNewDriver: false,
  });

  const [isCalculated, setIsCalculated] = useState(false);

  const updateForm = (updates: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
    setIsCalculated(false);
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const calculatePremium = () => {
    const marketVal = parseFloat(formData.marketValue) || 10000;
    let base = marketVal * 0.002; 
    
    if (formData.vehicleType === "electric") base *= 0.8;
    if (formData.vehicleType === "taxi") base *= 1.5;
    if (formData.isYoungDriver) base += 25;
    if (formData.isNewDriver) base += 15;
    
    return base.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#fcfcfc] p-6 md:p-24 selection:bg-rose-500/30">
      
      {/* Background Glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-rose-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[120px]" />
      </div>

      <nav className="fixed top-8 left-8 z-50">
        <Link href="/" className="text-xs font-mono text-muted-foreground hover:text-rose-400 transition-colors flex items-center gap-2">
          <ArrowLeft size={14} /> Back to Lobby
        </Link>
      </nav>

      <div className="max-w-2xl mx-auto relative z-10">
        <header className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Calculate <span className="text-rose-500">CASCO</span> price
          </h1>
          <p className="text-muted-foreground">Complete the fields below to get an instant insurance quote.</p>
        </header>

        <div className="space-y-12">
          
          {/* Step 1: Vehicle Type */}
          <motion.section 
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            <label className="text-xs font-mono uppercase tracking-[0.2em] text-white/40">01. Vehicle Type</label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={() => updateForm({ vehicleType: "car" })}
                className={cn(
                  "flex flex-col items-center justify-center p-8 rounded-2xl border transition-all duration-300 group",
                  formData.vehicleType === "car" ? "bg-rose-500/10 border-rose-500 text-rose-500 shadow-[0_0_20px_rgba(244,63,94,0.2)]" : "bg-white/5 border-white/10 text-white/60 hover:border-white/20 hover:bg-white/[0.07]"
                )}
              >
                <Car size={32} className="mb-4" />
                <span className="text-sm font-medium">Car</span>
              </button>
              <button
                onClick={() => updateForm({ vehicleType: "taxi" })}
                className={cn(
                  "flex flex-col items-center justify-center p-8 rounded-2xl border transition-all duration-300 group",
                  formData.vehicleType === "taxi" ? "bg-rose-500/10 border-rose-500 text-rose-500 shadow-[0_0_20px_rgba(244,63,94,0.2)]" : "bg-white/5 border-white/10 text-white/60 hover:border-white/20 hover:bg-white/[0.07]"
                )}
              >
                <CarFront size={32} className="mb-4" />
                <span className="text-sm font-medium">Taxi / Rental</span>
              </button>
              <button
                onClick={() => updateForm({ vehicleType: "electric" })}
                className={cn(
                  "flex flex-col items-center justify-center p-8 rounded-2xl border transition-all duration-300 group",
                  formData.vehicleType === "electric" ? "bg-rose-500/10 border-rose-500 text-rose-500 shadow-[0_0_20px_rgba(244,63,94,0.2)]" : "bg-white/5 border-white/10 text-white/60 hover:border-white/20 hover:bg-white/[0.07]"
                )}
              >
                <Zap size={32} className="mb-4" />
                <span className="text-sm font-medium">Electric car</span>
              </button>
            </div>
          </motion.section>

          {/* Step 2: Brand & Model */}
          <AnimatePresence>
            {formData.vehicleType && (
              <motion.section
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="space-y-4"
              >
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <label className="text-xs font-mono uppercase tracking-[0.2em] text-white/40">02. Brand</label>
                    <input 
                      type="text"
                      placeholder="e.g. BMW"
                      value={formData.brand}
                      onChange={(e) => updateForm({ brand: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-rose-500/50 transition-all"
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-xs font-mono uppercase tracking-[0.2em] text-white/40">03. Model</label>
                    <input 
                      type="text"
                      placeholder="e.g. M2"
                      value={formData.model}
                      onChange={(e) => updateForm({ model: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-rose-500/50 transition-all"
                    />
                  </div>
                </div>
              </motion.section>
            )}
          </AnimatePresence>

          {/* Step 3: Market Value & Currency */}
          <AnimatePresence>
            {formData.brand && formData.model && (
              <motion.section
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="space-y-4"
              >
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <label className="text-xs font-mono uppercase tracking-[0.2em] text-white/40">04. Market Value</label>
                    <div className="relative">
                      <input 
                        type="number"
                        placeholder="50000"
                        value={formData.marketValue}
                        onChange={(e) => updateForm({ marketValue: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pl-10 text-sm focus:outline-none focus:border-rose-500/50 transition-all"
                      />
                      <DollarSign size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <label className="text-xs font-mono uppercase tracking-[0.2em] text-white/40">05. Currency</label>
                    <select 
                      value={formData.currency}
                      onChange={(e) => updateForm({ currency: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-rose-500/50 transition-all appearance-none"
                    >
                      <option value="EUR">EUR</option>
                      <option value="USD">USD</option>
                      <option value="GBP">GBP</option>
                    </select>
                  </div>
                </div>
              </motion.section>
            )}
          </AnimatePresence>

          {/* Step 4: Person Type */}
          <AnimatePresence>
            {formData.marketValue && (
              <motion.section
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="space-y-4"
              >
                <label className="text-xs font-mono uppercase tracking-[0.2em] text-white/40">06. Person Type</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => updateForm({ personType: "physical" })}
                    className={cn(
                      "flex items-center gap-4 p-4 rounded-xl border transition-all duration-300",
                      formData.personType === "physical" ? "bg-rose-500/10 border-rose-500 text-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.1)]" : "bg-white/5 border-white/10 text-white/60 hover:border-white/20"
                    )}
                  >
                    <User size={20} />
                    <span className="text-sm font-medium">Physical</span>
                  </button>
                  <button
                    onClick={() => updateForm({ personType: "legal" })}
                    className={cn(
                      "flex items-center gap-4 p-4 rounded-xl border transition-all duration-300",
                      formData.personType === "legal" ? "bg-rose-500/10 border-rose-500 text-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.1)]" : "bg-white/5 border-white/10 text-white/60 hover:border-white/20"
                    )}
                  >
                    <Building size={20} />
                    <span className="text-sm font-medium">Legal Entity</span>
                  </button>
                </div>
              </motion.section>
            )}
          </AnimatePresence>

          {/* Step 5: Final Options */}
          <AnimatePresence>
            {formData.personType && (
              <motion.section
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="space-y-6"
              >
                <div className="space-y-3">
                  <div 
                    onClick={() => updateForm({ isYoungDriver: !formData.isYoungDriver })}
                    className="flex items-center gap-3 cursor-pointer group py-2"
                  >
                    <div className={cn("w-5 h-5 rounded border flex items-center justify-center transition-all shrink-0", formData.isYoungDriver ? "bg-rose-500 border-rose-500" : "bg-white/5 border-white/20 group-hover:border-white/40")}>
                      {formData.isYoungDriver && <CheckCircle2 size={12} className="text-white" />}
                    </div>
                    <span className="text-sm text-white/70 group-hover:text-white transition-colors select-none">Driver under 23 years old?</span>
                  </div>
                  <div 
                    onClick={() => updateForm({ isNewDriver: !formData.isNewDriver })}
                    className="flex items-center gap-3 cursor-pointer group py-2"
                  >
                    <div className={cn("w-5 h-5 rounded border flex items-center justify-center transition-all shrink-0", formData.isNewDriver ? "bg-rose-500 border-rose-500" : "bg-white/5 border-white/20 group-hover:border-white/40")}>
                      {formData.isNewDriver && <CheckCircle2 size={12} className="text-white" />}
                    </div>
                    <span className="text-sm text-white/70 group-hover:text-white transition-colors select-none">Experience less than 2 years?</span>
                  </div>
                </div>

                <Button 
                  onClick={() => setIsCalculated(true)}
                  className="w-full bg-rose-500 hover:bg-rose-600 text-white py-6 rounded-xl font-bold text-lg shadow-[0_0_20px_rgba(244,63,94,0.3)] transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  Calculate Price
                </Button>

                {isCalculated && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-8 rounded-2xl bg-gradient-to-br from-rose-500 to-rose-700 text-white text-center space-y-2"
                  >
                    <p className="text-rose-100 text-xs font-mono uppercase tracking-widest">Estimated Monthly Premium</p>
                    <div className="text-5xl font-bold tracking-tighter">
                      {formData.currency === "EUR" ? "€" : formData.currency === "USD" ? "$" : "£"}
                      {calculatePremium()}
                    </div>
                    <p className="text-rose-200 text-xs italic opacity-70">*Calculated based on your specific risk profile.</p>
                  </motion.div>
                )}
              </motion.section>
            )}
          </AnimatePresence>

        </div>
      </div>

      {/* Side ID Tag */}
      <div className="fixed bottom-8 right-8 text-[15vh] font-bold text-white/[0.02] pointer-events-none select-none font-mono">
        #54
      </div>
    </div>
  );
}
