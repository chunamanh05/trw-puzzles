"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UploadCloud, Image as ImageIcon, Search, Sparkles, ShoppingBag, ExternalLink, RefreshCw } from "lucide-react";

/**
 * PUZZLE #8: Visual Product Search (UI Mockup)
 * Flow: Upload Image -> Mock Lens Scan (Raw Data) -> Mock AI Clean (Normalized Data)
 */

type SearchState = "idle" | "uploading" | "scanning_lens" | "cleaning_ai" | "success";

interface ProductResult {
  rawTitle: string;
  cleanTitle: string;
  brand: string;
  price: string;
  link: string;
}

// Mock data to simulate the process
const MOCK_RESULT: ProductResult = {
  rawTitle: "Sony WH-1000XM5 Wireless Noise Canceling Headphones, Black - New in Box (Authentic) 2023 Model",
  cleanTitle: "Sony WH-1000XM5",
  brand: "Sony",
  price: "$348.00",
  link: "https://example.com/buy",
};

export default function VisualSearch() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [searchState, setSearchState] = useState<SearchState>("idle");
  const [result, setResult] = useState<ProductResult | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- MOCK PROCESS FLOW ---
  const startSearchProcess = async () => {
    // 1. Uploading
    setSearchState("uploading");
    await new Promise((res) => setTimeout(res, 800));

    // 2. Scanning with Lens
    setSearchState("scanning_lens");
    await new Promise((res) => setTimeout(res, 1500));

    // 3. Cleaning with AI
    setSearchState("cleaning_ai");
    await new Promise((res) => setTimeout(res, 1200));

    // 4. Success
    setResult(MOCK_RESULT);
    setSearchState("success");
  };

  // --- EVENT HANDLERS ---
  const handleImageUpload = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    const url = URL.createObjectURL(file);
    setImagePreview(url);
    startSearchProcess();
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageUpload(e.dataTransfer.files[0]);
    }
  };

  const reset = () => {
    setImagePreview(null);
    setResult(null);
    setSearchState("idle");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-2xl relative">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gradient mb-3">Find Anything.</h1>
          <p className="text-muted-foreground text-sm">
            Upload an image. We'll use Visual Search to find the raw product, and AI to clean it up for you.
          </p>
        </div>

        {/* Main Content Area */}
        <div className="glass rounded-luxury p-1 luxury-shadow relative overflow-hidden">
          
          {/* UPLOAD STATE */}
          <AnimatePresence mode="wait">
            {searchState === "idle" && (
              <motion.div
                key="upload"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors cursor-pointer flex flex-col items-center justify-center gap-4 min-h-[300px]
                  ${isDragging ? "border-accent-primary bg-accent-primary/5" : "border-glass-border hover:border-accent-primary/50 hover:bg-white/5"}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="w-16 h-16 rounded-full bg-accent-primary/10 flex items-center justify-center text-accent-primary mb-2">
                  <UploadCloud size={28} />
                </div>
                <div>
                  <p className="font-medium">Click or drag image to search</p>
                  <p className="text-xs text-muted-foreground mt-1">Supports JPG, PNG, WEBP</p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={(e) => e.target.files && handleImageUpload(e.target.files[0])}
                />
              </motion.div>
            )}

            {/* PROCESSING & RESULT STATE */}
            {searchState !== "idle" && (
              <motion.div
                key="processing"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 min-h-[300px] flex flex-col md:flex-row gap-6 bg-black/40 rounded-xl"
              >
                {/* Left: Image Preview */}
                <div className="w-full md:w-1/3 relative rounded-lg overflow-hidden border border-glass-border bg-black/50 aspect-square shrink-0">
                  {imagePreview && (
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover opacity-70" />
                  )}
                  
                  {/* Scanner Animation Overlays */}
                  {searchState === "scanning_lens" && (
                    <motion.div
                      animate={{ top: ["0%", "100%", "0%"] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="absolute left-0 w-full h-1 bg-accent-primary shadow-[0_0_15px_rgba(0,245,212,0.8)]"
                    />
                  )}
                  {searchState === "cleaning_ai" && (
                    <motion.div
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="absolute inset-0 bg-accent-secondary/20 backdrop-blur-[2px]"
                    />
                  )}
                </div>

                {/* Right: Status & Results */}
                <div className="flex-1 flex flex-col justify-center gap-6">
                  
                  {/* Status Steps */}
                  <div className="space-y-4">
                    <StatusStep
                      icon={<ImageIcon size={16} />}
                      title="Image Uploaded"
                      active={searchState !== "idle"}
                      loading={searchState === "uploading"}
                    />
                    <StatusStep
                      icon={<Search size={16} />}
                      title="Visual Search (Raw)"
                      subtitle={searchState === "cleaning_ai" || searchState === "success" ? MOCK_RESULT.rawTitle : undefined}
                      active={searchState === "scanning_lens" || searchState === "cleaning_ai" || searchState === "success"}
                      loading={searchState === "scanning_lens"}
                      isRaw
                    />
                    <StatusStep
                      icon={<Sparkles size={16} />}
                      title="AI Normalization"
                      active={searchState === "cleaning_ai" || searchState === "success"}
                      loading={searchState === "cleaning_ai"}
                    />
                  </div>

                  {/* Final Result Card */}
                  <AnimatePresence>
                    {searchState === "success" && result && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-2 p-5 rounded-xl border border-accent-secondary/30 bg-accent-secondary/5"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <p className="text-xs text-accent-secondary font-medium tracking-wider uppercase mb-1">
                              {result.brand}
                            </p>
                            <h3 className="text-lg font-bold">{result.cleanTitle}</h3>
                          </div>
                          <span className="text-lg font-bold text-accent-primary">{result.price}</span>
                        </div>
                        
                        <div className="flex gap-3">
                          <button className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-foreground text-background rounded-lg text-sm font-semibold hover:opacity-90 transition-all">
                            <ShoppingBag size={14} /> Buy Now
                          </button>
                          <button
                            onClick={reset}
                            className="px-4 py-2.5 border border-glass-border rounded-lg text-muted-foreground hover:text-foreground transition-all flex items-center justify-center"
                            title="Start Over"
                          >
                            <RefreshCw size={14} />
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// Helper Component for the Status Flow
function StatusStep({ 
  icon, 
  title, 
  subtitle,
  active, 
  loading,
  isRaw
}: { 
  icon: React.ReactNode; 
  title: string; 
  subtitle?: string;
  active: boolean; 
  loading?: boolean;
  isRaw?: boolean;
}) {
  if (!active && !loading) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className={`flex gap-3 ${loading ? "opacity-70" : "opacity-100"}`}
    >
      <div className={`mt-0.5 shrink-0 ${loading ? "animate-pulse text-accent-primary" : "text-muted-foreground"}`}>
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium flex items-center gap-2">
          {title}
          {loading && <span className="text-[10px] bg-accent-primary/20 text-accent-primary px-1.5 py-0.5 rounded uppercase tracking-wider">Processing</span>}
        </p>
        {subtitle && (
          <p className={`text-xs mt-1 ${isRaw ? "text-muted-foreground/60 italic line-clamp-2 text-[11px]" : "text-muted-foreground"}`}>
            {subtitle}
          </p>
        )}
      </div>
    </motion.div>
  );
}
