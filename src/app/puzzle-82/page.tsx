"use client";
// @ts-nocheck

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, 
  ArrowLeft, 
  Rocket, 
  BarChart3, 
  Building2, 
  Target, 
  Zap, 
  Globe, 
  CheckCircle2,
  Calendar,
  Layers,
  ChevronRight,
  Sparkles,
  DollarSign
} from "lucide-react";
import Link from "next/link";
import { cn } from "../../lib/utils";

// --- DATA DEFINITION ---
const QUESTIONS = [
  {
    id: "stage",
    title: "Vị thế doanh nghiệp của bạn?",
    subtitle: "Chúng tôi cần biết quy mô để đưa ra giải pháp phù hợp nhất.",
    options: [
      { value: "startup", label: "Early-Stage Startup", desc: "Đang xây dựng sản phẩm và tìm kiếm thị trường.", icon: <Rocket /> },
      { value: "scaleup", label: "Growing Scale-up", desc: "Đã có doanh thu ổn định và đang muốn bứt phá.", icon: <Layers /> },
      { value: "enterprise", label: "Established Enterprise", desc: "Tập đoàn lớn cần chuyển đổi số và tối ưu vận hành.", icon: <Building2 /> },
    ]
  },
  {
    id: "goal",
    title: "Mục tiêu ưu tiên hiện tại?",
    subtitle: "Vấn đề nào đang khiến bạn trăn trở nhất?",
    options: [
      { value: "efficiency", label: "Tối ưu vận hành", desc: "Tiết kiệm thời gian và nhân lực bằng AI.", icon: <Zap /> },
      { value: "growth", label: "Tăng trưởng doanh thu", desc: "Tìm kiếm thêm khách hàng và mở rộng thị trường.", icon: <BarChart3 /> },
      { value: "branding", label: "Định vị thương hiệu", desc: "Xây dựng sự uy tín và hiện diện chuyên nghiệp.", icon: <Globe /> },
    ]
  },
  {
    id: "budget",
    title: "Ngân sách dự kiến?",
    subtitle: "Mức đầu tư sẽ quyết định chiều sâu của giải pháp.",
    options: [
      { value: "low", label: "$2,000 - $5,000", desc: "Phù hợp cho các dự án khởi đầu nhanh.", icon: <DollarSign /> },
      { value: "mid", label: "$5,000 - $20,000", desc: "Giải pháp toàn diện và chuyên sâu hơn.", icon: <Sparkles /> },
      { value: "high", label: "Trên $20,000", desc: "Đồng hành chiến lược dài hạn và tuỳ biến cao.", icon: <Target /> },
    ]
  }
];

const OUTCOMES = {
  starter: {
    title: "AI Automation Starter Kit",
    desc: "Giải pháp hoàn hảo để giải phóng đội ngũ nhỏ của bạn khỏi các tác vụ thủ công.",
    benefits: ["Tự động hóa 10+ quy trình", "Báo cáo Real-time", "Hỗ trợ 24/7"],
    cta: "Nhận bản demo ngay",
    color: "bg-indigo-600"
  },
  growth: {
    title: "Performance Growth Engine",
    desc: "Xây dựng hệ thống thu hút khách hàng tự động và website chuyển đổi cao.",
    benefits: ["Website tối ưu UX/UI", "Hệ thống CRM thông minh", "Phễu Marketing tự động"],
    cta: "Khám phá lộ trình tăng trưởng",
    color: "bg-emerald-600"
  },
  enterprise: {
    title: "Digital Transformation Strategy",
    desc: "Chiến lược chuyển đổi số toàn diện dành riêng cho doanh nghiệp quy mô lớn.",
    benefits: ["Hệ thống quản trị tập trung", "Bảo mật cấp độ cao nhất", "Đội ngũ chuyên gia đồng hành"],
    cta: "Đặt lịch tư vấn chiến lược",
    color: "bg-violet-600"
  }
};

export default function Puzzle82ServiceRouter() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<any>({});
  const [showResult, setShowResult] = useState(false);

  const handleSelect = (questionId: string, value: string) => {
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);

    if (step < QUESTIONS.length - 1) {
      setTimeout(() => setStep(step + 1), 300);
    } else {
      setTimeout(() => setShowResult(true), 300);
    }
  };

  const getOutcome = () => {
    if (answers.budget === "high" || answers.stage === "enterprise") return OUTCOMES.enterprise;
    if (answers.goal === "growth" || answers.budget === "mid") return OUTCOMES.growth;
    return OUTCOMES.starter;
  };

  const progress = ((step + (showResult ? 1 : 0)) / QUESTIONS.length) * 100;
  const outcome = showResult ? getOutcome() : OUTCOMES.starter;

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans selection:bg-indigo-500/30 overflow-hidden flex flex-col">
      
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/5 blur-[100px] rounded-full" />
      </div>

      {/* Header & Progress */}
      <div className="relative z-20 px-8 py-10 flex items-center justify-between">
        <Link href="/" className="p-3 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all text-white/40 hover:text-white">
          <ArrowLeft size={20} />
        </Link>
        
        <div className="flex-1 max-w-md mx-8">
          <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.5)]"
              animate={{ width: `${progress}%` }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
            />
          </div>
        </div>

        <div className="text-[10px] font-black uppercase tracking-widest text-white/40">
          Step {showResult ? 3 : step + 1} of 3
        </div>
      </div>

      <main className="flex-1 flex items-center justify-center p-6 relative z-10">
        <AnimatePresence mode="wait">
          {!showResult ? (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full max-w-4xl"
            >
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-4">
                  {QUESTIONS[step].title}
                </h2>
                <p className="text-white/40 font-medium text-lg">
                  {QUESTIONS[step].subtitle}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {QUESTIONS[step].options.map((option) => (
                  <motion.button
                    key={option.value}
                    whileHover={{ y: -5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSelect(QUESTIONS[step].id, option.value)}
                    className={cn(
                      "relative group p-8 rounded-[2.5rem] border text-left transition-all overflow-hidden",
                      answers[QUESTIONS[step].id] === option.value 
                        ? "bg-indigo-600 border-indigo-400 shadow-[0_20px_60px_rgba(79,70,229,0.3)]" 
                        : "bg-white/5 border-white/10 hover:border-white/20"
                    )}
                  >
                    <div className={cn(
                      "w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors",
                      answers[QUESTIONS[step].id] === option.value ? "bg-white/20 text-white" : "bg-white/5 text-white/40 group-hover:text-indigo-400"
                    )}>
                      {React.cloneElement(option.icon, { size: 28 })}
                    </div>
                    
                    <h3 className="text-xl font-bold mb-2">{option.label}</h3>
                    <p className="text-sm font-medium text-white/40 group-hover:text-white/60 leading-relaxed">
                      {option.desc}
                    </p>

                    {/* Check indicator */}
                    {answers[QUESTIONS[step].id] === option.value && (
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-6 right-6 text-white"
                      >
                        <CheckCircle2 size={24} />
                      </motion.div>
                    )}
                  </motion.button>
                ))}
              </div>

              {step > 0 && (
                <button 
                  onClick={() => setStep(step - 1)}
                  className="mt-12 mx-auto flex items-center gap-2 text-xs font-black uppercase tracking-widest text-white/30 hover:text-white transition-colors"
                >
                  <ArrowLeft size={14} /> Quay lại câu trước
                </button>
              )}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full max-w-5xl"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                
                {/* Result Info */}
                <div className="space-y-8">
                  <div>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em] mb-6">
                      <Sparkles size={14} /> Your Strategy Match
                    </div>
                    <h2 className="text-5xl md:text-6xl font-black tracking-tighter leading-none mb-6">
                      {outcome.title}
                    </h2>
                    <p className="text-xl text-white/50 font-medium leading-relaxed">
                      Dựa trên phân tích về quy mô <span className="text-white">"{answers.stage}"</span> và mục tiêu <span className="text-white">"{answers.goal}"</span> của bạn, đây là lộ trình tối ưu nhất:
                    </p>
                  </div>

                  <div className="space-y-4">
                    {outcome.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-center gap-4 text-white/80 font-bold">
                        <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                          <CheckCircle2 size={14} />
                        </div>
                        {benefit}
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <button className={cn("px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest text-white shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3", outcome.color)}>
                      {outcome.cta} <ArrowRight size={18} />
                    </button>
                    <button 
                      onClick={() => {setStep(0); setShowResult(false); setAnswers({});}}
                      className="px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest text-white/40 border border-white/10 hover:bg-white/5 transition-all"
                    >
                      Bắt đầu lại
                    </button>
                  </div>
                </div>

                {/* Decorative Visual Card */}
                <div className="relative">
                  <div className={cn("aspect-square rounded-[3rem] p-12 flex flex-col justify-between shadow-2xl relative overflow-hidden", outcome.color)}>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2" />
                    <div className="w-20 h-20 rounded-3xl bg-white/20 flex items-center justify-center text-white">
                      {outcome.title.includes("AI") ? <Zap size={40} /> : outcome.title.includes("Growth") ? <BarChart3 size={40} /> : <Building2 size={40} />}
                    </div>
                    <div>
                      <h3 className="text-3xl font-black mb-4 leading-tight">{outcome.title}</h3>
                      <p className="text-white/80 font-medium leading-relaxed">
                        {outcome.desc}
                      </p>
                    </div>
                  </div>
                  
                  {/* Floating badge */}
                  <div className="absolute -bottom-6 -right-6 bg-slate-900 border border-white/10 p-6 rounded-3xl shadow-2xl flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                      <Calendar size={24} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-white/40">Next Step</p>
                      <p className="text-sm font-bold">Lên lịch tư vấn chiến lược</p>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Custom Styles for Slider-like progress if needed */}
      <style dangerouslySetInnerHTML={{ __html: `
        body { background: #020617; }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 10px; }
      `}} />
    </div>
  );
}
