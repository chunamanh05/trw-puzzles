"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Bell, 
  Mail, 
  Smartphone, 
  Monitor, 
  MessageSquare, 
  Users, 
  AlertTriangle, 
  BarChart3, 
  CreditCard,
  Check,
  Loader2,
  VolumeX,
  Volume2
} from "lucide-react";

/**
 * PUZZLE #101: Smart Notification Preferences Panel
 * 
 * Features:
 * 1. 6 Notification types with descriptions and icons.
 * 2. 3 Channels per type (Email, Push, In-App).
 * 3. Master "Mute All" switch (Option A: Disables interactions).
 * 4. LocalStorage persistence with Hydration handling.
 * 5. Auto-save status indicator.
 */

// ─── TYPES & DATA ─────────────────────────────────────────────────────────────

type ChannelKey = "email" | "push" | "inApp";

interface NotificationType {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
}

const NOTIFICATION_TYPES: NotificationType[] = [
  { id: "messages", title: "New Messages",    description: "Direct messages and replies from team members.", icon: MessageSquare },
  { id: "leads",    title: "New Leads",       description: "Incoming leads and prospect activity.",          icon: Users },
  { id: "alerts",   title: "System Alerts",    description: "Critical system warnings and outage notices.",    icon: AlertTriangle },
  { id: "reports",  title: "Weekly Reports",   description: "Scheduled summaries and performance digests.",    icon: BarChart3 },
  { id: "billing",  title: "Billing Updates",  description: "Invoices, payment confirmations, and plan changes.",icon: CreditCard },
  { id: "security", title: "Security Login",   description: "Alerts for new device logins or password changes.",icon: Bell },
];

type Preferences = Record<string, Record<ChannelKey, boolean>>;

const INITIAL_PREFS: Preferences = NOTIFICATION_TYPES.reduce((acc, item) => {
  acc[item.id] = { email: true, push: true, inApp: true };
  return acc;
}, {} as Preferences);

// ─── COMPONENTS ───────────────────────────────────────────────────────────────

export default function NotificationPreferences() {
  const [prefs, setPrefs] = useState<Preferences>(INITIAL_PREFS);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">("idle");

  // 1. Load from LocalStorage
  useEffect(() => {
    const savedPrefs = localStorage.getItem("notify_prefs");
    const savedMute = localStorage.getItem("notify_mute");
    
    if (savedPrefs) setPrefs(JSON.parse(savedPrefs));
    if (savedMute) setIsMuted(JSON.parse(savedMute));
    
    setIsLoaded(true);
  }, []);

  // 2. Auto-save on change
  useEffect(() => {
    if (!isLoaded) return;

    setSaveStatus("saving");
    localStorage.setItem("notify_prefs", JSON.stringify(prefs));
    localStorage.setItem("notify_mute", JSON.stringify(isMuted));

    const timer = setTimeout(() => setSaveStatus("saved"), 600);
    const hideTimer = setTimeout(() => setSaveStatus("idle"), 2500);

    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, [prefs, isMuted, isLoaded]);

  const toggleChannel = (typeId: string, channel: ChannelKey) => {
    if (isMuted) return;
    setPrefs(prev => ({
      ...prev,
      [typeId]: {
        ...prev[typeId],
        [channel]: !prev[typeId][channel]
      }
    }));
  };

  if (!isLoaded) return null; // Avoid hydration mismatch

  return (
    <main className="min-h-screen bg-[#0f111a] text-slate-200 flex items-center justify-center p-4 md:p-8 selection:bg-indigo-500/30">
      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-600/10 blur-[120px] rounded-full" />
        <div className="absolute top-1/2 -right-24 w-80 h-80 bg-violet-600/10 blur-[100px] rounded-full" />
      </div>

      <div className="w-full max-w-3xl z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <Bell className="text-white" size={20} />
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-white">NotifyControl</h1>
            </div>
            <p className="text-slate-400 text-sm">Smart notification preferences for your workspace</p>
          </div>

          {/* Save Status Indicator */}
          <AnimatePresence mode="wait">
            {saveStatus !== "idle" && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full bg-slate-800/50 border border-slate-700/50"
              >
                {saveStatus === "saving" ? (
                  <>
                    <Loader2 size={12} className="animate-spin text-indigo-400" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Check size={12} className="text-emerald-400" />
                    <span className="text-emerald-400">All changes saved</span>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Master Switch Card */}
        <div className={`p-6 rounded-2xl mb-6 border transition-all duration-300 ${
          isMuted 
            ? "bg-slate-900/40 border-slate-700/50 grayscale-[0.5]" 
            : "bg-indigo-600/5 border-indigo-500/20 shadow-xl shadow-indigo-500/5"
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-full transition-colors ${isMuted ? "bg-slate-800 text-slate-500" : "bg-indigo-500/20 text-indigo-400"}`}>
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </div>
              <div>
                <h3 className="font-semibold text-white">Notifications active</h3>
                <p className="text-xs text-slate-400">Master switch to mute all communication channels</p>
              </div>
            </div>
            
            <button
              onClick={() => setIsMuted(!isMuted)}
              className={`relative w-12 h-6 rounded-full transition-colors duration-300 focus:outline-none ${
                isMuted ? "bg-slate-700" : "bg-indigo-500"
              }`}
            >
              <motion.div
                animate={{ x: isMuted ? 4 : 28 }}
                className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm"
              />
            </button>
          </div>
        </div>

        {/* Preferences List */}
        <div className="space-y-3">
          <div className="px-6 py-2 flex items-center justify-between text-[10px] uppercase tracking-widest font-bold text-slate-500">
            <span>Notification Type</span>
            <div className="flex gap-12 md:gap-16 mr-4">
              <span>Email</span>
              <span>Push</span>
              <span>In-App</span>
            </div>
          </div>

          {NOTIFICATION_TYPES.map((type) => (
            <motion.div
              layout
              key={type.id}
              className={`group relative p-5 rounded-2xl border bg-slate-900/40 border-slate-800/50 hover:border-slate-700/50 transition-all ${
                isMuted ? "opacity-50 pointer-events-none" : ""
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                {/* Type Info */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-indigo-400 group-hover:bg-indigo-500/10 transition-all duration-300">
                    <type.icon size={22} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-100 group-hover:text-white transition-colors">{type.title}</h4>
                    <p className="text-xs text-slate-500 line-clamp-1">{type.description}</p>
                  </div>
                </div>

                {/* Toggles */}
                <div className="flex items-center gap-4 md:gap-8 self-end md:self-auto">
                  <ChannelToggle 
                    active={prefs[type.id].email} 
                    icon={Mail} 
                    label="Email"
                    onClick={() => toggleChannel(type.id, "email")} 
                  />
                  <ChannelToggle 
                    active={prefs[type.id].push} 
                    icon={Smartphone} 
                    label="Push"
                    onClick={() => toggleChannel(type.id, "push")} 
                  />
                  <ChannelToggle 
                    active={prefs[type.id].inApp} 
                    icon={Monitor} 
                    label="In-App"
                    onClick={() => toggleChannel(type.id, "inApp")} 
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="mt-8 text-center text-[10px] text-slate-600 uppercase tracking-[0.2em]">
          Preferences are saved automatically to your local storage
        </p>
      </div>
    </main>
  );
}

// ─── HELPER COMPONENT ─────────────────────────────────────────────────────────

function ChannelToggle({ 
  active, 
  icon: Icon, 
  label,
  onClick 
}: { 
  active: boolean; 
  icon: React.ElementType; 
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`relative group/btn flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-xl border transition-all duration-300 ${
        active 
          ? "bg-indigo-500/10 border-indigo-500/40 text-indigo-400 shadow-lg shadow-indigo-500/5" 
          : "bg-slate-800/30 border-slate-800 text-slate-600 hover:border-slate-700"
      }`}
      title={label}
    >
      <Icon size={20} strokeWidth={active ? 2.5 : 2} />
      
      {/* Active Dot */}
      {active && (
        <motion.div
          layoutId="active-dot"
          className="absolute -top-1 -right-1 w-3 h-3 bg-indigo-500 rounded-full border-2 border-[#0f111a]"
        />
      )}

      {/* Label Tooltip (Mobile visible on active) */}
      <span className="absolute -bottom-6 opacity-0 group-hover/btn:opacity-100 transition-opacity text-[8px] font-bold uppercase tracking-tighter text-slate-500">
        {label}
      </span>
    </button>
  );
}
