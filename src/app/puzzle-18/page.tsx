"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * PUZZLE #18: Scroll Controlled Video Animation
 * 
 * Note: Since we don't have the 148 frames of the 3D Pen from the prompt, 
 * we use the famous Apple AirPods Pro image sequence as a high-quality placeholder.
 * The engine and scroll logic are identical. To replace it with the Pen, 
 * simply swap the `currentFrame` URL logic.
 */

const FRAME_COUNT = 148;
const currentFrame = (index: number) => 
  `https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/01-hero-lightpass/${(index).toString().padStart(4, '0')}.jpg`;

export default function ScrollVideoPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [progress, setProgress] = useState(0);

  // Framer Motion Scroll Progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // 1. Preload Images
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;
    
    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      
      img.onload = () => {
        loadedCount++;
        setProgress(Math.round((loadedCount / FRAME_COUNT) * 100));
        if (loadedCount === FRAME_COUNT) {
          setImages(loadedImages);
          setIsLoaded(true);
        }
      };
      
      // Fallback in case of error so it doesn't hang forever
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === FRAME_COUNT) {
          setImages(loadedImages);
          setIsLoaded(true);
        }
      };
      
      loadedImages.push(img);
    }
  }, []);

  // 2. Draw Images to Canvas based on Scroll
  useEffect(() => {
    if (!isLoaded || images.length === 0 || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) return;

    // Kích thước chuẩn của bộ ảnh Apple (1158x770)
    canvas.width = 1158;
    canvas.height = 770;
    
    // Vẽ frame đầu tiên
    if (images[0].complete) {
      context.drawImage(images[0], 0, 0);
    }

    // Subscribe to scroll changes
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      // Map scroll progress (0 to 1) to frame index (0 to 147)
      const frameIndex = Math.min(
        FRAME_COUNT - 1,
        Math.floor(latest * FRAME_COUNT)
      );
      
      if (images[frameIndex] && images[frameIndex].complete) {
        requestAnimationFrame(() => {
          // Xóa canvas cũ (nếu có transparent) và vẽ frame mới
          context.clearRect(0, 0, canvas.width, canvas.height);
          context.drawImage(images[frameIndex], 0, 0);
        });
      }
    });

    return () => unsubscribe();
  }, [isLoaded, images, scrollYProgress]);

  // 3. Typography Animation Mapping
  // Text 1: Hiện rõ lúc đầu, mờ dần khi cuộn xuống 20%
  const opacity1 = useTransform(scrollYProgress, [0, 0.15, 0.25], [1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.25], [0, -100]);

  // Text 2: Hiện lên ở đoạn giữa, mờ đi ở đoạn cuối
  const opacity2 = useTransform(scrollYProgress, [0.3, 0.45, 0.6, 0.75], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.3, 0.45], [50, 0]);

  return (
    <main className="bg-black text-white selection:bg-neutral-800">
      
      {/* Loading Screen Overlay */}
      {!isLoaded && (
        <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center text-white">
          <h2 className="text-2xl font-serif tracking-widest mb-4">PREPARING ASSETS</h2>
          <div className="w-64 h-1 bg-white/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#d4af37] transition-all duration-300 ease-out" 
              style={{ width: `${progress}%` }} 
            />
          </div>
          <p className="mt-4 text-xs font-mono text-neutral-500">{progress}% LOADED</p>
        </div>
      )}

      {/* 
        Scrollable Container
        Chiều cao cực lớn (500vh) để người dùng có nhiều không gian cuộn chuột.
        Càng cao thì tốc độ thay đổi frame càng chậm và mượt.
      */}
      <div ref={containerRef} className="relative h-[500vh]">
        
        {/* Sticky Canvas & Text Container (Luôn nằm giữa màn hình) */}
        <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-black">
          
          {/* Header (Navbar) */}
          <div className="absolute top-0 w-full p-8 flex justify-between items-center z-50 text-xs uppercase tracking-[0.2em] font-medium text-neutral-400">
            <div>TRW.AI</div>
            <div className="flex gap-8">
              <span className="hover:text-white cursor-pointer transition-colors">Features</span>
              <span className="hover:text-white cursor-pointer transition-colors">Pricing</span>
            </div>
          </div>

          {/* Canvas Component */}
          <canvas 
            ref={canvasRef}
            className="w-full max-w-5xl object-contain z-0 opacity-80"
          />

          {/* Vignette Overlay (Tạo viền đen mờ bao quanh như ảnh mẫu) */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)] z-10 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 z-10 pointer-events-none" />

          {/* Typography Overlays */}
          <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none">
            
            {/* Text 1: Precision Redefined */}
            <motion.div 
              style={{ opacity: opacity1, y: y1 }}
              className="absolute text-center px-4"
            >
              <h1 className="text-6xl md:text-8xl lg:text-[100px] font-serif mb-6 text-white leading-tight">
                Precision
                <br />
                <span className="text-[#d4af37]">Redefined</span>
              </h1>
              <p className="text-neutral-400 text-lg md:text-xl font-light tracking-wide max-w-2xl mx-auto">
                The future of writing, crafted for those who demand excellence.
              </p>
              
              <div className="absolute left-1/2 -translate-x-1/2 bottom-[-100px] flex flex-col items-center gap-4">
                <div className="text-[10px] uppercase tracking-[0.3em] text-neutral-500">
                  Scroll to Explore
                </div>
                <div className="w-px h-12 bg-gradient-to-b from-neutral-500 to-transparent" />
              </div>
            </motion.div>

            {/* Text 2: Engineered Perfection */}
            <motion.div 
              style={{ opacity: opacity2, y: y2 }}
              className="absolute text-center px-4"
            >
              <h2 className="text-5xl md:text-7xl font-serif mb-6 text-white leading-tight">
                Engineered <br/><span className="text-neutral-400 italic">Perfection</span>
              </h2>
              <p className="text-[#d4af37] text-lg font-light tracking-wide">
                Every detail meticulously crafted for the ultimate writing experience.
              </p>
            </motion.div>

          </div>
        </div>
      </div>
    </main>
  );
}
