"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Save, CheckCircle, Sparkles, User, Mail, Building2, Briefcase, Send, Trash2 } from "lucide-react";

/**
 * PUZZLE #5: Pre-fill Form on Return
 * Core Concept: localStorage — browser-side persistent storage.
 * Features:
 * - Auto-saves every field on change (no submit needed)
 * - Detects returning user and pre-fills the form
 * - Shows "Welcome back" banner with the user's name
 * - Shows an "Auto-saved" indicator while typing
 * - Clear saved data option
 */

const STORAGE_KEY = "puzzle5_form_data";

interface FormData {
  name: string;
  email: string;
  company: string;
  role: string;
}

const EMPTY_FORM: FormData = { name: "", email: "", company: "", role: "" };

const fields: {
  key: keyof FormData;
  label: string;
  type: string;
  placeholder: string;
  icon: React.ElementType;
}[] = [
  { key: "name",    label: "Full Name",    type: "text",  placeholder: "e.g. Alex Johnson",      icon: User       },
  { key: "email",   label: "Email",        type: "email", placeholder: "e.g. alex@company.com",  icon: Mail       },
  { key: "company", label: "Company",      type: "text",  placeholder: "e.g. Acme Corp.",        icon: Building2  },
  { key: "role",    label: "Your Role",    type: "text",  placeholder: "e.g. Product Designer",  icon: Briefcase  },
];

export default function PreFillForm() {
  const [form, setForm]                     = useState<FormData>(EMPTY_FORM);
  const [isReturningUser, setIsReturningUser] = useState(false);
  const [saveStatus, setSaveStatus]         = useState<"idle" | "saving" | "saved">("idle");
  const [isSubmitted, setIsSubmitted]       = useState(false);
  const [mounted, setMounted]               = useState(false);

  // --- STEP 1: On mount, read from localStorage and pre-fill ---
  // Must be inside useEffect because localStorage is a browser-only API.
  // Next.js renders on the server first — the server doesn't have a "browser".
  // Without useEffect, this would crash on the server.
  useEffect(() => {
    setMounted(true);
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const saved: FormData = JSON.parse(raw);
      const hasData = Object.values(saved).some((v) => v.trim() !== "");
      if (hasData) {
        setForm(saved);
        setIsReturningUser(true);
      }
    }
  }, []);

  // --- STEP 2: Auto-save to localStorage on every change ---
  // useCallback prevents this function from being re-created on every render.
  const saveToStorage = useCallback((data: FormData) => {
    setSaveStatus("saving");
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    // Small artificial delay to make the "saving..." feel meaningful
    setTimeout(() => setSaveStatus("saved"), 600);
    setTimeout(() => setSaveStatus("idle"), 2200);
  }, []);

  const handleChange = (key: keyof FormData, value: string) => {
    const updated = { ...form, [key]: value };
    setForm(updated);
    saveToStorage(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleClear = () => {
    localStorage.removeItem(STORAGE_KEY);
    setForm(EMPTY_FORM);
    setIsReturningUser(false);
    setIsSubmitted(false);
    setSaveStatus("idle");
  };

  // Prevent hydration mismatch: don't render user-specific content until mounted
  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-accent-primary/5 blur-[140px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-secondary/5 blur-[140px] rounded-full" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg relative"
      >
        {/* === RETURNING USER BANNER === */}
        <AnimatePresence>
          {isReturningUser && !isSubmitted && (
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12 }}
              className="mb-5 flex items-center gap-3 px-5 py-4 rounded-2xl border border-accent-primary/25 bg-accent-primary/5"
            >
              <Sparkles className="text-accent-primary shrink-0" size={18} />
              <div>
                <p className="text-sm font-semibold text-accent-primary">
                  Welcome back{form.name ? `, ${form.name.split(" ")[0]}` : ""}!
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  We&apos;ve restored your progress from your last visit.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* === MAIN CARD === */}
        <div className="glass rounded-luxury p-8 luxury-shadow">
          
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-gradient">
                {isSubmitted ? "You're all set." : "Tell us about yourself"}
              </h1>
              <p className="text-xs text-muted-foreground mt-1.5">
                {isSubmitted
                  ? "Your information was submitted successfully."
                  : "Your progress saves automatically as you type."}
              </p>
            </div>
            {/* Auto-save status indicator */}
            <AnimatePresence mode="wait">
              {saveStatus !== "idle" && (
                <motion.div
                  key={saveStatus}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center gap-1.5 text-[11px] text-muted-foreground"
                >
                  {saveStatus === "saving" ? (
                    <Save size={13} className="animate-pulse" />
                  ) : (
                    <CheckCircle size={13} className="text-accent-primary" />
                  )}
                  {saveStatus === "saving" ? "Saving..." : "Saved"}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* === SUCCESS STATE === */}
          <AnimatePresence mode="wait">
            {isSubmitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-10 gap-4"
              >
                <div className="w-16 h-16 rounded-full bg-accent-primary/10 border border-accent-primary/20 flex items-center justify-center">
                  <CheckCircle className="text-accent-primary" size={32} />
                </div>
                <div className="text-center">
                  <p className="font-semibold">Thank you, {form.name || "friend"}!</p>
                  <p className="text-sm text-muted-foreground mt-1">We&apos;ll be in touch at {form.email}.</p>
                </div>
                <button
                  onClick={handleClear}
                  className="mt-4 text-xs text-muted-foreground hover:text-foreground underline underline-offset-4 transition-colors"
                >
                  Start over & clear saved data
                </button>
              </motion.div>
            ) : (
              /* === FORM === */
              <motion.form key="form" onSubmit={handleSubmit} className="space-y-5">
                {fields.map(({ key, label, type, placeholder, icon: Icon }) => (
                  <div key={key}>
                    <label className="block text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">
                      {label}
                    </label>
                    <div className="relative">
                      <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground">
                        <Icon size={16} />
                      </div>
                      <input
                        type={type}
                        value={form[key]}
                        onChange={(e) => handleChange(key, e.target.value)}
                        placeholder={placeholder}
                        className="w-full bg-black/40 border border-glass-border rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:border-accent-primary/50 focus:ring-1 focus:ring-accent-primary/20 transition-all placeholder:text-muted-foreground/40"
                      />
                    </div>
                  </div>
                ))}

                {/* Actions */}
                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    className="flex-1 flex items-center justify-center gap-2 h-12 bg-foreground text-background rounded-xl font-semibold hover:opacity-90 active:scale-[0.98] transition-all"
                  >
                    <Send size={16} />
                    Submit
                  </button>
                  {isReturningUser && (
                    <button
                      type="button"
                      onClick={handleClear}
                      title="Clear saved data"
                      className="h-12 w-12 flex items-center justify-center border border-glass-border rounded-xl text-muted-foreground hover:text-red-400 hover:border-red-400/30 transition-all"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        {/* Footer note */}
        <p className="text-center text-[11px] text-muted-foreground/50 mt-5">
          Data is stored locally in your browser. Nothing is sent to any server.
        </p>
      </motion.div>
    </div>
  );
}
