"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Stethoscope, 
  Cpu, 
  Zap, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowLeft, 
  FileText, 
  Smartphone, 
  Laptop,
  Wifi,
  HardDrive,
  Battery,
  Monitor,
  Check,
  ShieldAlert,
  ArrowRight
} from "lucide-react";
import Link from "next/link";
import { cn } from "../../lib/utils";

// --- TYPES ---
interface Option {
  value: string;
  label: string;
  desc: string;
  icon: React.ReactNode;
  next: string; // Either a question ID or "RESULT_ID"
}

interface Question {
  id: string;
  text: string;
  subtitle: string;
  options: Option[];
}

interface DiagnosisResult {
  id: string;
  title: string;
  urgency: "Low" | "Medium" | "High" | "Critical";
  recommendation: string;
  color: string;
}

// --- CONFIGURATION ---
const QUESTIONS: Record<string, Question> = {
  START: {
    id: "START",
    text: "Thiết bị gặp sự cố là gì?",
    subtitle: "Chọn loại thiết bị để chúng tôi khoanh vùng phạm vi chẩn đoán.",
    options: [
      { value: "laptop", label: "Laptop / PC", desc: "Máy tính xách tay hoặc máy để bàn.", icon: <Laptop />, next: "LAPTOP_ISSUE" },
      { value: "phone", label: "Smartphone", desc: "Điện thoại thông minh hoặc máy tính bảng.", icon: <Smartphone />, next: "PHONE_ISSUE" },
    ]
  },
  LAPTOP_ISSUE: {
    id: "LAPTOP_ISSUE",
    text: "Vấn đề nằm ở đâu?",
    subtitle: "Dấu hiệu rõ ràng nhất mà bạn đang thấy là gì?",
    options: [
      { value: "power", label: "Nguồn & Pin", desc: "Không lên nguồn, sập nguồn đột ngột.", icon: <Battery />, next: "LAPTOP_POWER" },
      { value: "screen", label: "Màn hình", desc: "Màn hình sọc, tối đen hoặc bị vỡ.", icon: <Monitor />, next: "LAPTOP_SCREEN" },
      { value: "software", label: "Phần mềm / OS", desc: "Máy treo, màn hình xanh hoặc nhiễm virus.", icon: <Cpu />, next: "RESULT_SOFT_FIX" },
    ]
  },
  LAPTOP_POWER: {
    id: "LAPTOP_POWER",
    text: "Cắm sạc có tín hiệu đèn không?",
    subtitle: "Kiểm tra đèn báo sạc trên thân máy hoặc củ sạc.",
    options: [
      { value: "no_light", label: "Không có đèn", desc: "Hoàn toàn không thấy tín hiệu điện vào.", icon: <Zap />, next: "RESULT_POWER_MAIN" },
      { value: "has_light", label: "Có đèn báo", desc: "Có điện nhưng máy vẫn không khởi động.", icon: <Check />, next: "RESULT_POWER_INTERNAL" },
    ]
  },
  LAPTOP_SCREEN: {
    id: "LAPTOP_SCREEN",
    text: "Màn hình có bị va đập trước đó không?",
    subtitle: "Yếu tố tác động vật lý rất quan trọng trong chẩn đoán.",
    options: [
      { value: "impact", label: "Có va đập / Rơi", desc: "Màn hình bị nứt hoặc chịu lực mạnh.", icon: <AlertTriangle />, next: "RESULT_SCREEN_REPLACE" },
      { value: "no_impact", label: "Không va đập", desc: "Tự nhiên bị sọc hoặc không hiển thị.", icon: <Wifi />, next: "RESULT_GPU_ISSUE" },
    ]
  },
  PHONE_ISSUE: {
    id: "PHONE_ISSUE",
    text: "Tình trạng của điện thoại?",
    subtitle: "Mô tả ngắn gọn lỗi bạn đang gặp phải.",
    options: [
      { value: "water", label: "Rơi vào nước", desc: "Thiết bị bị ngấm chất lỏng.", icon: <Zap />, next: "RESULT_WATER_CRITICAL" },
      { value: "battery", label: "Pin / Sạc", desc: "Pin ảo, sạc không vào hoặc nóng máy.", icon: <Battery />, next: "RESULT_PHONE_BATTERY" },
    ]
  }
};

const RESULTS: Record<string, DiagnosisResult> = {
  RESULT_SOFT_FIX: {
    id: "RESULT_SOFT_FIX",
    title: "Lỗi Hệ điều hành / Phần mềm",
    urgency: "Medium",
    recommendation: "Cần cài đặt lại hệ điều hành hoặc quét mã độc chuyên sâu. Dữ liệu có thể được cứu hộ.",
    color: "bg-blue-500"
  },
  RESULT_POWER_MAIN: {
    id: "RESULT_POWER_MAIN",
    title: "Lỗi Mainboard / IC Nguồn",
    urgency: "High",
    recommendation: "Khả năng cao bị chập mạch nguồn trên main. Cần đo đạc kỹ thuật tại trung tâm.",
    color: "bg-orange-500"
  },
  RESULT_POWER_INTERNAL: {
    id: "RESULT_POWER_INTERNAL",
    title: "Lỗi Linh kiện nội bộ",
    urgency: "High",
    recommendation: "Có thể do RAM hoặc CPU gặp sự cố. Cần kiểm tra tách rời từng linh kiện.",
    color: "bg-amber-600"
  },
  RESULT_SCREEN_REPLACE: {
    id: "RESULT_SCREEN_REPLACE",
    title: "Hỏng tấm nền LCD / OLED",
    urgency: "Medium",
    recommendation: "Màn hình đã bị tổn thương vật lý. Giải pháp duy nhất là thay cụm màn hình mới.",
    color: "bg-indigo-500"
  },
  RESULT_GPU_ISSUE: {
    id: "RESULT_GPU_ISSUE",
    title: "Lỗi Chip Đồ họa / Cáp màn",
    urgency: "High",
    recommendation: "Có thể do lỏng cáp hoặc chip GPU quá nhiệt. Cần vệ sinh và đóng lại chip.",
    color: "bg-violet-600"
  },
  RESULT_WATER_CRITICAL: {
    id: "RESULT_WATER_CRITICAL",
    title: "Thiết bị ngấm chất lỏng",
    urgency: "Critical",
    recommendation: "Tắt máy ngay lập tức! Đưa đến trung tâm trong vòng 2h để tránh oxy hóa toàn bộ linh kiện.",
    color: "bg-red-600"
  },
  RESULT_PHONE_BATTERY: {
    id: "RESULT_PHONE_BATTERY",
    title: "Lão hóa Pin / Hỏng cổng sạc",
    urgency: "Low",
    recommendation: "Thay pin chính hãng hoặc vệ sinh chân sạc. Có thể xử lý lấy ngay trong 30 phút.",
    color: "bg-emerald-600"
  }
};

export default function Puzzle89DiagnosisWizard() {
  const [stepId, setStepId] = useState<string>("START");
  const [history, setHistory] = useState<string[]>([]);
  const [answers, setAnswers] = useState<any[]>([]);

  // --- LOGIC ---
  const handleSelect = (option: Option, questionText: string) => {
    const newAnswers = [...answers, { q: questionText, a: option.label }];
    setAnswers(newAnswers);
    setHistory([...history, stepId]);
    setStepId(option.next);
  };

  const goBack = () => {
    if (history.length === 0) return;
    const prevId = history[history.length - 1];
    setStepId(prevId);
    setHistory(history.slice(0, -1));
    setAnswers(answers.slice(0, -1));
  };

  const reset = () => {
    setStepId("START");
    setHistory([]);
    setAnswers([]);
  };

  const isResult = RESULTS[stepId] !== undefined;
  const currentQuestion = QUESTIONS[stepId];
  const currentResult = RESULTS[stepId];

  if (!isResult && !currentQuestion) return null;
  if (isResult && !currentResult) return null;


  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans selection:bg-cyan-500/30 flex flex-col overflow-hidden">
      
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-violet-600/5 blur-[150px] rounded-full" />
      </div>

      {/* Header */}
      <header className="relative z-20 px-8 py-6 border-b border-white/5 bg-black/20 backdrop-blur-md flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="p-2 hover:bg-white/5 rounded-xl transition-colors text-white/40 hover:text-white mr-4">
            <ArrowLeft size={20} />
          </Link>
          <div className="w-10 h-10 rounded-xl bg-cyan-500 flex items-center justify-center text-black shadow-[0_0_15px_rgba(34,211,238,0.4)]">
            <Stethoscope size={22} />
          </div>
          <span className="text-xl font-black tracking-tighter italic uppercase">TechDiagnose</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-widest text-cyan-500">AI Support Active</span>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-6 lg:p-12 relative z-10">
        <AnimatePresence mode="wait">
          {!isResult ? (
            <motion.div
              key={stepId}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full max-w-4xl"
            >
              <div className="text-center mb-12">
                <div className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 mb-4">Step {history.length + 1}</div>
                <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight mb-4">
                  {currentQuestion.text}
                </h2>
                <p className="text-white/40 font-medium text-lg max-w-lg mx-auto">
                  {currentQuestion.subtitle}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {currentQuestion.options.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleSelect(option, currentQuestion.text)}
                    className="p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/10 hover:border-cyan-500/50 hover:bg-white/[0.06] transition-all group text-left flex items-center gap-6"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-white/20 group-hover:text-cyan-400 group-hover:bg-cyan-400/10 transition-all shrink-0">
                      {React.isValidElement(option.icon) && React.cloneElement(option.icon as React.ReactElement<any>, { size: 28 })}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-1">{option.label}</h3>
                      <p className="text-sm text-white/40 font-medium group-hover:text-white/60">{option.desc}</p>
                    </div>
                  </button>
                ))}
              </div>

              {history.length > 0 && (
                <button 
                  onClick={goBack}
                  className="mt-12 mx-auto flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/20 hover:text-white transition-colors"
                >
                  <ArrowLeft size={14} /> Quay lại câu hỏi trước
                </button>
              )}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-12"
            >
              {/* LEFT: RESULT CARD */}
              <div className="lg:col-span-7 space-y-6">
                <div className={cn("p-12 rounded-[3.5rem] border shadow-2xl relative overflow-hidden", currentResult.color + "/10 border-" + currentResult.color.split('-')[1] + "-500/50")}>
                  <div className="flex items-center gap-4 mb-8">
                    <div className={cn("px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest text-white border border-white/20", currentResult.color)}>
                      Urgency: {currentResult.urgency}
                    </div>
                    {currentResult.urgency === "Critical" && (
                      <div className="flex items-center gap-2 text-red-500 animate-bounce">
                        <ShieldAlert size={16} /> <span className="text-[10px] font-black uppercase">Action Required</span>
                      </div>
                    )}
                  </div>

                  <h2 className="text-5xl md:text-6xl font-black tracking-tighter leading-tight mb-6">
                    {currentResult.title}
                  </h2>
                  <p className="text-xl text-white/60 font-medium leading-relaxed mb-10">
                    {currentResult.recommendation}
                  </p>

                  <div className="flex flex-wrap gap-4 pt-6 border-t border-white/10">
                    <button className="px-10 py-5 bg-white text-black font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-cyan-400 transition-all flex items-center gap-3">
                      Đặt lịch sửa chữa ngay <ArrowRight size={18} />
                    </button>
                    <button 
                      onClick={reset}
                      className="px-10 py-5 bg-white/5 border border-white/10 text-white/60 font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-white/10 transition-all"
                    >
                      Chẩn đoán lại
                    </button>
                  </div>
                </div>
              </div>

              {/* RIGHT: SUMMARY REPORT */}
              <div className="lg:col-span-5 space-y-6">
                <div className="p-10 rounded-[3rem] bg-white/[0.03] border border-white/10">
                  <div className="flex items-center gap-3 mb-8">
                    <FileText className="text-cyan-400" />
                    <h3 className="text-lg font-black uppercase tracking-widest">Diagnostic Report</h3>
                  </div>

                  <div className="space-y-6">
                    {answers.map((ans, i) => (
                      <div key={i} className="space-y-1">
                        <p className="text-[10px] font-black uppercase tracking-widest text-white/20">{ans.q}</p>
                        <p className="text-sm font-bold text-white/80">{ans.a}</p>
                      </div>
                    ))}
                    <div className="pt-6 border-t border-white/5">
                      <div className="flex items-center justify-between p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20">
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-cyan-400/60">Reference ID</p>
                          <p className="font-bold text-cyan-400">#DX-{Math.floor(Math.random()*9000)+1000}</p>
                        </div>
                        <CheckCircle2 size={24} className="text-cyan-400" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="relative z-20 p-8 border-t border-white/5 text-center">
        <p className="text-[10px] font-black uppercase tracking-widest text-white/10">
          TechDiagnose Smart Support Framework &copy; TRW Puzzles 2026
        </p>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        body { background: #020617; }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 10px; }
      `}} />

    </div>
  );
}
