"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, Upload, ZoomIn, Image as ImageIcon, FileCode, MousePointer2, AlertCircle, PlayCircle } from "lucide-react";
import Link from "next/link";

// High-detail SVG Logo for sampling
const SAMPLE_SVG_DATA = `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgdmlld0JveD0iMCAwIDUwMCA1MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0yNTAgNTBMNDI1IDM1MEg3NUwyNTAgNTBaIiBmaWxsPSIjNjM2NkYxIiBmaWxsLW9wYWNpdHk9IjAuNiIvPgo8cGF0aCBkPSJNMjUwIDEwMEwzNzUgMzAwSDEyNUwyNTAgMTAwWiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTI1MCAxNTBMMzI1IDI1MEgxNzVMMjUwIDE1MFoiIGZpbGw9IiM2MzY2RjEiLz4KPHBhdGggZD0iTTI1MCAyMDBMMjc1IDIzMEgyMjVMMjUwIDEwMFoiIGZpbGw9ImJsYWNrIi8+Cjwvc3ZnPg==`;

const SAMPLE_PNG_DATA = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACt3Ry6AAAACXBIWXMAAAsTAAALEwEAmpwYAAAEJ0lEQVR4nO3dyW7UUBiGYZMoYf9X6KIIIXIDmPV8ApU6fAAViRI+gIqE6fABVCRIlPAfqEiQKCH8ByoSpErH6SUnK6/tSIn9pIisOImSJEmeZFnE/8AauAAfJvSu+9iLH+zPWvwPdmf6uLqL/A921/RxdRf5H+yu6ePqLvI/2F3Tx9Vd5H+wu6aPq7vI/2B3TR9Xd5H/we6aPq7uIv8D3TV9XN1F/ge7a/q4uov8D3bX9HF1F/kf7K7p4+ou8j/YXdfH1T3dv9ld18fVPd0/2F3Xx9U93T/YXdfH1T3dv9ld18fVPd0/2F3Xx9U93T/YXdfH1T3dv9ld18fVPd0/2F3Xx9U93T/YXdfH1T3dv9ld18fVPd0/2F3Xx9U93T/YXdfH1T3dv9ld18fVPd0/2F3Xx9U93T/YXdfH1T3dv9ld18fVPd0/2F3Xx9U93T/YXdfH1T3dv9ld18fVPd0/2F3Xx9U93T/YXdfH1T3dv9ld18fVPd0/2F3Xx9U93T/YXdfH1T3dv9ld18fVPd0/2F3Xx9U93T/YXdfH1T3dv9ld18fVPd0/2F3Xx9U93d+F9AP2dR6ce7+eFNAAAAAASUVORK5CYII=`;

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
    <main className="min-h-screen bg-[#050505] text-white p-8 flex flex-col font-sans overflow-hidden">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 z-10">
        <div>
          <Link href="/" className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest mb-4">
            <ChevronLeft size={14} /> Hub
          </Link>
          <h1 className="text-4xl font-black tracking-tighter italic">Vector <span className="text-blue-500">Analyzer.</span></h1>
          <p className="text-slate-500 text-sm mt-1">Compare Raster (PNG) vs Vector (SVG) quality in real-time.</p>
        </div>

        <div className="flex flex-wrap gap-4">
          <button 
            onClick={loadSamples}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-xl transition-all text-xs font-bold shadow-lg"
          >
            <PlayCircle size={16} /> Load Samples
          </button>
          <label className="flex items-center gap-2 px-4 py-2 bg-blue-600/10 hover:bg-blue-600/20 border border-blue-500/20 rounded-xl cursor-pointer transition-all text-xs font-bold text-blue-400">
            <ImageIcon size={16} />
            Upload PNG
            <input type="file" accept="image/png, image/jpeg" className="hidden" onChange={handlePngUpload} />
          </label>
          <label className="flex items-center gap-2 px-4 py-2 bg-emerald-600/10 hover:bg-emerald-600/20 border border-emerald-500/20 rounded-xl cursor-pointer transition-all text-xs font-bold text-emerald-400">
            <FileCode size={16} />
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
              <h2 className="text-xl font-bold text-slate-400">Please upload both files or click "Load Samples"</h2>
              <p className="text-slate-600 text-sm max-w-xs mx-auto mt-2">Upload your original PNG and your converted SVG to see the resolution difference.</p>
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
          <div className="relative bg-[#111] bg-[radial-gradient(#1a1a1a_1px,transparent_1px)] bg-[size:20px_20px] rounded-[2.5rem] border border-white/5 overflow-hidden flex items-center justify-center group shadow-inner">
            <div className="absolute top-8 left-8 flex items-center gap-3 bg-black/60 backdrop-blur-xl px-4 py-2 rounded-2xl border border-white/10 z-10">
              <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
              <span className="text-[11px] font-black uppercase tracking-widest text-slate-300">Raster (PNG)</span>
            </div>
            
            {pngSrc && (
              <img src={pngSrc} alt="PNG Logo" className="max-w-[80%] max-h-[80%] object-contain" />
            )}

            {/* SYNCED LENS */}
            {isHovering && pngSrc && (
              <div 
                className="absolute w-64 h-64 border-2 border-blue-500/50 rounded-3xl pointer-events-none z-30 shadow-[0_0_80px_rgba(59,130,246,0.2)] bg-[#050505] overflow-hidden"
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
                    backgroundSize: '1500%', 
                    backgroundRepeat: 'no-repeat',
                    imageRendering: 'pixelated'
                  }}
                />
                <div className="absolute bottom-4 left-4 px-3 py-1 bg-blue-500 text-[10px] font-black uppercase text-white rounded-lg">Pixelated Edge</div>
              </div>
            )}
          </div>

          {/* SVG SIDE */}
          <div className="relative bg-[#111] bg-[radial-gradient(#1a1a1a_1px,transparent_1px)] bg-[size:20px_20px] rounded-[2.5rem] border border-white/5 overflow-hidden flex items-center justify-center group shadow-inner">
            <div className="absolute top-8 left-8 flex items-center gap-3 bg-black/60 backdrop-blur-xl px-4 py-2 rounded-2xl border border-white/10 z-10">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span className="text-[11px] font-black uppercase tracking-widest text-slate-300">Vector (SVG)</span>
            </div>

            {svgSrc && (
              <img src={svgSrc} alt="SVG Logo" className="max-w-[80%] max-h-[80%] object-contain" />
            )}

            {/* SYNCED LENS */}
            {isHovering && svgSrc && (
              <div 
                className="absolute w-64 h-64 border-2 border-emerald-500/50 rounded-3xl pointer-events-none z-30 shadow-[0_0_80px_rgba(16,185,129,0.2)] bg-[#050505] overflow-hidden"
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
                    backgroundSize: '1500%', 
                    backgroundRepeat: 'no-repeat'
                  }}
                />
                <div className="absolute bottom-4 left-4 px-3 py-1 bg-emerald-500 text-[10px] font-black uppercase text-white rounded-lg">Smooth Paths</div>
              </div>
            )}
          </div>
        </div>

        {/* Floating Tooltips */}
        <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/5">
          <div className="flex items-center gap-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest">
            <div className="flex items-center gap-2"><MousePointer2 size={14} /> Pos: {zoomPos.x.toFixed(0)}%, {zoomPos.y.toFixed(0)}%</div>
            <div className="w-px h-4 bg-white/10" />
            <div className="flex items-center gap-2"><ZoomIn size={14} /> Zoom: 1500%</div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="fixed bottom-[-10%] right-[-5%] w-[400px] h-[400px] bg-emerald-600/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="fixed top-[-10%] left-[-5%] w-[300px] h-[300px] bg-blue-600/5 rounded-full blur-[80px] pointer-events-none" />
    </main>
  );
}
