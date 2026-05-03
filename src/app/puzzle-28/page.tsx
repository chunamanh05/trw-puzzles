"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, Upload, ZoomIn, Image as ImageIcon, FileCode, MousePointer2, AlertCircle, PlayCircle } from "lucide-react";
import Link from "next/link";

// High-detail SVG Logo for sampling
const SAMPLE_SVG_DATA = `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgdmlld0JveD0iMCAwIDUwMCA1MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0yNTAgNTBMNDI1IDM1MEg3NUwyNTAgNTBaIiBmaWxsPSIjNjM2NkYxIiBmaWxsLW9wYWNpdHk9IjAuNiIvPgo8cGF0aCBkPSJNMjUwIDEwMEwzNzUgMzAwSDEyNUwyNTAgMTAwWiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTI1MCAxNTBMMzI1IDI1MEgxNzVMMjUwIDE1MFoiIGZpbGw9IiM2MzY2RjEiLz4KPHBhdGggZD0iTTI1MCAyMDBMMjc1IDIzMEgyMjVMMjUwIDIwMFoiIGZpbGw9ImJsYWNrIi8+CjxwYXRoIGQ9Ik0yNTAgNTBWMzUwIiBzdHJva2U9ImJsYWNrIiBzdHJva2Utd2lkdGg9IjIiLz4KPHBhdGggZD0iTTc1IDM1MEg0MjUiIHN0cm9rZT0iYmxhY2siIHN0cm9rZS13aWR0aD0iMiIvPgo8L3N2Zz4=`;

// Low-res version of the same logo (simulated PNG)
const SAMPLE_PNG_DATA = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABXUlEQVR4nO2WsU4DMRBEp0iU8P8fI6EUKfK9AmX9AmU6fAAViRI+gIqE6fABVCRIlPAfqEiQKCH8ByoSpEon6SInO9ay7V0SR7Isy7IsyyL8hS6wB7Ym5K77uIof7M9Z/A92R/q4uov8D3bX9HF1F/kf7K7p4+ou8j/YXdPH1V3kf7C7po+ru8j/YHdNH1d3kf/B7po+ru4i/4PdNX1c3UX+B7tr+ri6i/wPdNf0cXUX+R/sruvj6p7uH+yu6+Pqnu4f7K7r4+qe7h/sruvj6p7uH+yu6+Pqnu4f7K7r4+qe7h/sruvj6p7uH+yu6+Pqnu4f7K7r4+qe7h/sruvj6p7uH+yu6+Pqnu4f7K7r4+qe7h/sruvj6p7uH+yu6+Pqnu4f7K7r4+qe7h/sruvj6p7uH+yu6+Pqnu4f7K7r4+qe7h/sruvj6p7uH+yu6+Pqnu4f7K7r4+qe7h/sruvj6p7u70L6Afs6D869X08KAAAAAElFTkSuQmCC`;

export default function PngVsSvgPage() {
  const [pngSrc, setPngSrc] = useState<string | null>(null);
  const [svgSrc, setSvgSrc] = useState<string | null>(null);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);

  const loadSamples = () => {
    setPngSrc(SAMPLE_PNG_DATA);
    setSvgSrc(SAMPLE_SVG_DATA);
  };

  const handlePngUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (prev) => setPngSrc(prev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSvgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (prev) => setSvgSrc(prev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white p-8 flex flex-col font-sans overflow-hidden">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 z-10">
        <div>
          <Link href="/" className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest mb-4">
            <ChevronLeft size={14} /> Hub
          </Link>
          <h1 className="text-4xl font-black tracking-tighter">Vector <span className="text-indigo-500">Analyzer.</span></h1>
          <p className="text-slate-500 text-sm mt-1">Compare Raster (PNG) vs Vector (SVG) quality in real-time.</p>
        </div>

        <div className="flex flex-wrap gap-4">
          <button 
            onClick={loadSamples}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-all text-xs font-bold shadow-lg shadow-indigo-600/20"
          >
            <PlayCircle size={16} /> Load Samples
          </button>
          <label className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg cursor-pointer transition-all text-xs font-bold">
            <ImageIcon size={16} className="text-blue-400" />
            Upload PNG
            <input type="file" accept="image/png" className="hidden" onChange={handlePngUpload} />
          </label>
          <label className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg cursor-pointer transition-all text-xs font-bold">
            <FileCode size={16} className="text-indigo-400" />
            Upload SVG
            <input type="file" accept="image/svg+xml" className="hidden" onChange={handleSvgUpload} />
          </label>
        </div>
      </div>

      {/* Analyzer Workspace */}
      <div className="flex-1 flex flex-col gap-8 relative">
        
        {(!pngSrc || !svgSrc) && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-20 rounded-3xl border border-dashed border-white/10">
            <div className="text-center">
              <AlertCircle size={48} className="mx-auto mb-4 text-slate-700" />
              <h2 className="text-xl font-bold text-slate-400">Please upload files or click "Load Samples"</h2>
              <p className="text-slate-600 text-sm max-w-xs mx-auto mt-2">Upload your own files or use our preset samples to see the resolution difference.</p>
            </div>
          </div>
        )}

        <div 
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1 h-full min-h-[500px]"
        >
          {/* PNG SIDE */}
          <div className="relative bg-[#111] rounded-3xl border border-white/5 overflow-hidden flex items-center justify-center group">
            <div className="absolute top-6 left-6 flex items-center gap-2 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 z-10">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Raster (PNG)</span>
            </div>
            
            {pngSrc && (
              <img src={pngSrc} alt="PNG Logo" className="max-w-[70%] max-h-[70%] object-contain" />
            )}

            {/* SYNCED LENS */}
            {isHovering && pngSrc && (
              <div 
                className="absolute w-48 h-48 border-2 border-blue-500 rounded-2xl pointer-events-none z-30 shadow-[0_0_50px_rgba(59,130,246,0.3)] bg-[#111] overflow-hidden"
                style={{ 
                  left: `${zoomPos.x}%`, 
                  top: `${zoomPos.y}%`, 
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <div 
                  className="w-full h-full"
                  style={{ 
                    backgroundImage: `url(${pngSrc})`,
                    backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`,
                    backgroundSize: '1200%', // High zoom
                    backgroundRepeat: 'no-repeat',
                    imageRendering: 'pixelated'
                  }}
                />
                <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-blue-500 text-[8px] font-black uppercase text-white rounded">Pixelated</div>
              </div>
            )}
          </div>

          {/* SVG SIDE */}
          <div className="relative bg-[#111] rounded-3xl border border-white/5 overflow-hidden flex items-center justify-center group">
            <div className="absolute top-6 left-6 flex items-center gap-2 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 z-10">
              <span className="w-2 h-2 rounded-full bg-indigo-500" />
              <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Vector (SVG)</span>
            </div>

            {svgSrc && (
              <img src={svgSrc} alt="SVG Logo" className="max-w-[70%] max-h-[70%] object-contain" />
            )}

            {/* SYNCED LENS */}
            {isHovering && svgSrc && (
              <div 
                className="absolute w-48 h-48 border-2 border-indigo-500 rounded-2xl pointer-events-none z-30 shadow-[0_0_50px_rgba(99,102,241,0.3)] bg-[#111] overflow-hidden"
                style={{ 
                  left: `${zoomPos.x}%`, 
                  top: `${zoomPos.y}%`, 
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <div 
                  className="w-full h-full"
                  style={{ 
                    backgroundImage: `url(${svgSrc})`,
                    backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`,
                    backgroundSize: '1200%', // High zoom
                    backgroundRepeat: 'no-repeat'
                  }}
                />
                <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-indigo-500 text-[8px] font-black uppercase text-white rounded">Infinite Quality</div>
              </div>
            )}
          </div>
        </div>

        {/* Floating Tooltips */}
        <div className="flex justify-between text-[10px] font-bold text-slate-600 uppercase tracking-widest mt-4">
          <div className="flex items-center gap-2">
            <MousePointer2 size={12} /> Sync Cursor: {zoomPos.x.toFixed(0)}%, {zoomPos.y.toFixed(0)}%
          </div>
          <div className="flex items-center gap-2">
            <ZoomIn size={12} /> Current Magnification: 1200%
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="fixed bottom-[-10%] right-[-5%] w-[400px] h-[400px] bg-indigo-600/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="fixed top-[-10%] left-[-5%] w-[300px] h-[300px] bg-blue-600/5 rounded-full blur-[80px] pointer-events-none" />
    </main>
  );
}
