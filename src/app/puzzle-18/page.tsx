"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ChevronDown, Cpu, Network, Sparkles, Terminal } from "lucide-react";

/**
 * PUZZLE #18: The Quantum Tunnel (Procedural Image Sequence)
 * 
 * To solve the constraint of "converting a video into an image sequence" WITHOUT 
 * relying on external assets that might break, we use a revolutionary approach:
 * We "render and film" a 3D tunnel using Canvas on the fly, extract 120 frames 
 * as base64 images, and then play those frames back on scroll!
 */

const FRAME_COUNT = 120;

export default function ProceduralScrollVideo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState("Initializing Engine...");

  // Framer Motion Scroll Progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // 1. Procedural Engine: Generate the Image Sequence "Video"
  useEffect(() => {
    let isCancelled = false;

    const buildSequence = async () => {
      setPhase("Rendering Quantum Tunnel...");
      
      const renderCanvas = document.createElement("canvas");
      // Use standard 16:9 ratio, kept relatively small to optimize Base64 string sizes
      renderCanvas.width = 1280;
      renderCanvas.height = 720;
      const ctx = renderCanvas.getContext("2d", { alpha: false });
      if (!ctx) return;

      const cx = renderCanvas.width / 2;
      const cy = renderCanvas.height / 2;
      const generatedImages: HTMLImageElement[] = [];

      // Pre-calculate random stars for consistency across frames
      const stars = Array.from({ length: 150 }, () => ({
        angle: Math.random() * Math.PI * 2,
        dist: Math.random(), 
        speed: 0.05 + Math.random() * 0.05,
        size: Math.random() * 2 + 0.5
      }));

      for (let i = 0; i < FRAME_COUNT; i++) {
        if (isCancelled) return;

        const p = i / FRAME_COUNT; // Progress from 0 to 1

        // Background
        ctx.fillStyle = "#020617"; // Slate 950
        ctx.fillRect(0, 0, renderCanvas.width, renderCanvas.height);

        // Draw Stars flying towards camera (Warp effect)
        stars.forEach(star => {
          let z = (star.dist + p * star.speed * (FRAME_COUNT/2)) % 1;
          let r = Math.pow(z, 4) * renderCanvas.width; 
          let alpha = z;
          
          let x = cx + Math.cos(star.angle) * r;
          let y = cy + Math.sin(star.angle) * r;

          ctx.fillStyle = `rgba(139, 92, 246, ${alpha})`; // Violet
          ctx.beginPath();
          ctx.arc(x, y, star.size + z * 3, 0, Math.PI * 2);
          ctx.fill();
        });

        // Draw Hexagonal Tunnel
        for (let r = 0; r < 25; r++) {
          let z = (r / 25 + p * 3) % 1; // 3 cycles
          const scale = Math.pow(z, 3) * renderCanvas.width * 1.2;
          const alpha = Math.sin(z * Math.PI); // Fade in center, fade out at edges

          ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`; // Cyan
          ctx.lineWidth = 1 + z * 4;

          ctx.beginPath();
          const twist = p * Math.PI + z * 0.5;
          for (let sides = 0; sides <= 6; sides++) {
            const angle = (sides / 6) * Math.PI * 2 + twist;
            const x = cx + Math.cos(angle) * scale;
            const y = cy + Math.sin(angle) * scale;
            if (sides === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
        }

        // Central Core Glow
        const pulse = Math.sin(p * Math.PI * 6) * 0.5 + 0.5;
        const coreGradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, 50 + pulse * 50);
        coreGradient.addColorStop(0, `rgba(255, 255, 255, 0.9)`);
        coreGradient.addColorStop(0.3, `rgba(56, 189, 248, 0.5)`);
        coreGradient.addColorStop(1, `rgba(56, 189, 248, 0)`);
        
        ctx.beginPath();
        ctx.arc(cx, cy, 150, 0, Math.PI * 2);
        ctx.fillStyle = coreGradient;
        ctx.fill();

        // Convert to Image Object
        const dataUrl = renderCanvas.toDataURL("image/webp", 0.6);
        const img = new Image();
        img.src = dataUrl;
        
        // Wait for image to load before pushing to ensure synchronization
        await new Promise((resolve) => {
          img.onload = resolve;
        });
        
        generatedImages.push(img);
        setProgress(Math.round((i / FRAME_COUNT) * 100));

        // Yield to browser to prevent freezing the UI
        await new Promise(r => setTimeout(r, 0));
      }

      setPhase("Finalizing Sequence...");
      setImages(generatedImages);
      setIsLoaded(true);
    };

    buildSequence();

    return () => { isCancelled = true; };
  }, []);

  // 2. Scroll Logic: Draw images onto the visible Canvas
  useEffect(() => {
    if (!isLoaded || images.length === 0 || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) return;

    canvas.width = 1280;
    canvas.height = 720;
    context.drawImage(images[0], 0, 0);

    const unsubscribe = scrollYProgress.on("change", (latest) => {
      // Map scroll progress to frame index
      const frameIndex = Math.min(
        FRAME_COUNT - 1,
        Math.floor(latest * FRAME_COUNT)
      );
      
      if (images[frameIndex]) {
        requestAnimationFrame(() => {
          context.drawImage(images[frameIndex], 0, 0);
        });
      }
    });

    return () => unsubscribe();
  }, [isLoaded, images, scrollYProgress]);

  // 3. Typography Animation Mapping
  const text1Opacity = useTransform(scrollYProgress, [0, 0.15, 0.25], [1, 1, 0], { clamp: true });
  const text1Scale = useTransform(scrollYProgress, [0, 0.25], [1, 3], { clamp: true });

  const text2Opacity = useTransform(scrollYProgress, [0.3, 0.45, 0.6, 0.75], [0, 1, 1, 0], { clamp: true });
  const text2Scale = useTransform(scrollYProgress, [0.3, 0.45], [0.8, 1], { clamp: true });

  const canvasFilter = useTransform(scrollYProgress, [0.8, 1], ["brightness(1)", "brightness(3) blur(20px)"], { clamp: true });
  const canvasOpacity = useTransform(scrollYProgress, [0.9, 1], [1, 0], { clamp: true });

  return (
    <main className="bg-[#020617] text-white selection:bg-cyan-500/30">
      
      {/* LOADING OVERLAY */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#020617] flex flex-col items-center justify-center text-white"
          >
            <Terminal size={48} className="text-cyan-400 mb-8 animate-pulse" />
            <h2 className="text-2xl font-mono tracking-widest mb-2 font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500">
              {phase}
            </h2>
            <p className="text-sm font-mono text-slate-500 mb-8">Converting algorithmic video to image sequence...</p>
            
            <div className="w-80 h-1 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-cyan-400 to-violet-500 transition-all duration-100 ease-linear shadow-[0_0_10px_rgba(34,211,238,0.5)]" 
                style={{ width: `${progress}%` }} 
              />
            </div>
            <div className="mt-4 font-mono text-cyan-400 font-bold">{progress}%</div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SECTION 1: SCROLL VIDEO HERO */}
      <div ref={containerRef} className="relative h-[600vh]">
        <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-[#020617]">
          
          {/* Header */}
          <div className="absolute top-0 w-full p-8 flex justify-between items-center z-50 text-sm uppercase tracking-[0.2em] font-mono font-bold text-slate-400">
            <div className="flex items-center gap-2 text-cyan-400"><Network size={18} /> THE CORE</div>
            <div>SCROLL TO INITIATE</div>
          </div>

          {/* Rendered Canvas Sequence */}
          <motion.div 
            style={{ filter: canvasFilter, opacity: canvasOpacity }}
            className="absolute inset-0 w-full h-full flex items-center justify-center z-0"
          >
            <canvas 
              ref={canvasRef}
              className="w-full h-full object-cover opacity-90"
            />
            {/* Dark vignette to blend edges */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#020617_100%)] pointer-events-none" />
          </motion.div>

          {/* Holographic Text Overlays */}
          <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none">
            
            {/* Text 1: The Quantum Tunnel */}
            <motion.div 
              style={{ opacity: text1Opacity, scale: text1Scale }}
              className="absolute text-center px-4 mix-blend-screen"
            >
              <h1 className="text-6xl md:text-8xl font-black mb-4 tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400">
                INTO THE <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">UNKNOWN</span>
              </h1>
              <p className="text-cyan-200 font-mono tracking-widest text-sm uppercase">
                Warning: Warp Speed Authorized
              </p>
              
              <div className="absolute left-1/2 -translate-x-1/2 bottom-[-120px] flex flex-col items-center gap-4 opacity-50 animate-bounce">
                <ChevronDown size={32} className="text-cyan-400" />
              </div>
            </motion.div>

            {/* Text 2: AI Core Reached */}
            <motion.div 
              style={{ opacity: text2Opacity, scale: text2Scale }}
              className="absolute text-center px-4 mix-blend-screen"
            >
              <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-cyan-500/20 border border-cyan-400/50 flex items-center justify-center backdrop-blur-md">
                <Cpu size={40} className="text-cyan-300" />
              </div>
              <h2 className="text-5xl md:text-7xl font-black mb-6 text-white tracking-tight">
                SYSTEM <span className="text-violet-400 italic">AWAKENED</span>
              </h2>
              <p className="text-slate-300 text-lg font-mono tracking-wide max-w-xl mx-auto">
                The neural network has successfully synchronized with your scroll trajectory.
              </p>
            </motion.div>

          </div>
        </div>
      </div>

      {/* SECTION 2: THE DESTINATION (Normal Content) */}
      <section className="relative z-30 min-h-screen bg-slate-50 text-slate-900 py-32 px-6 overflow-hidden">
        
        {/* Decorative Grid */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col items-center text-center mb-24">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-100 text-violet-700 font-mono text-sm font-bold mb-6">
              <Sparkles size={16} /> Welcome to Reality
            </div>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 mb-8 leading-tight">
              A New Dimension of <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-cyan-600">Interactivity</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl leading-relaxed">
              You just witnessed a fully procedural 3D environment generated completely in your browser, converted into an image sequence, and mapped to your scroll bar. No external videos. No massive downloads.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {[
              { title: "Procedural Engine", desc: "120 frames rendered algorithmically using HTML5 Canvas on page load.", icon: Terminal },
              { title: "Zero Dependencies", desc: "No external image sequences or heavy video files required. 100% self-contained.", icon: Cpu },
              { title: "60FPS Playback", desc: "Pre-caching frames as Base64 images ensures perfectly smooth scrubbing without decode lag.", icon: Network },
            ].map((feature, i) => (
              <div key={i} className="p-10 rounded-3xl bg-white border border-slate-200 shadow-xl shadow-slate-200/50 hover:-translate-y-2 transition-transform duration-300">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-100 to-cyan-100 flex items-center justify-center mb-8 text-violet-600">
                  <feature.icon size={28} />
                </div>
                <h3 className="text-2xl font-bold mb-4 tracking-tight">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed font-medium">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
