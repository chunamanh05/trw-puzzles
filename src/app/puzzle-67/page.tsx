"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Maximize2, Heart, Share2 } from "lucide-react";
import Link from "next/link";

const GALLERY_IMAGES = [
  { url: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=600&auto=format&fit=crop", title: "Floral Abstract", height: "h-80" },
  { url: "https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=600&auto=format&fit=crop", title: "Modern Sculpture", height: "h-96" },
  { url: "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?q=80&w=600&auto=format&fit=crop", title: "Ink & Fluid", height: "h-64" },
  { url: "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?q=80&w=600&auto=format&fit=crop", title: "Brutalist Shapes", height: "h-[30rem]" },
  { url: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=600&auto=format&fit=crop", title: "Color Theory", height: "h-72" },
  { url: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=600&auto=format&fit=crop", title: "Minimal Geometry", height: "h-96" },
  { url: "https://images.unsplash.com/photo-1543857778-c4a1a3e0b2eb?q=80&w=600&auto=format&fit=crop", title: "Digital Distortion", height: "h-64" },
  { url: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=600&auto=format&fit=crop", title: "Paper Texture", height: "h-80" },
  { url: "https://images.unsplash.com/photo-1561214115-f2f134cc4912?q=80&w=600&auto=format&fit=crop", title: "Abstract Flow", height: "h-[28rem]" },
  { url: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=600&auto=format&fit=crop", title: "Cyber Sunset", height: "h-64" },
  { url: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=600&auto=format&fit=crop", title: "Deep Space", height: "h-96" },
  { url: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=600&auto=format&fit=crop", title: "Organized Chaos", height: "h-72" },
];

export default function Puzzle67MasonryGallery() {
  return (
    <div className="min-h-screen bg-[#fafafa] text-black font-sans selection:bg-black selection:text-white">
      
      {/* Navigation */}
      <nav className="p-8 flex justify-between items-center fixed top-0 left-0 right-0 z-50 bg-white/50 backdrop-blur-md">
        <Link href="/" className="text-xs font-bold tracking-widest uppercase flex items-center gap-2 hover:opacity-50 transition-opacity">
          <ArrowLeft size={16} /> Lobby
        </Link>
        <h1 className="text-sm font-black tracking-[0.3em] uppercase">Masonry Studio</h1>
        <div className="text-xs font-mono text-black/40">COLLECTION_2026</div>
      </nav>

      {/* Masonry Grid */}
      <div className="pt-32 px-4 md:px-8 pb-20">
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
          {GALLERY_IMAGES.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="relative group break-inside-avoid rounded-2xl overflow-hidden cursor-pointer bg-neutral-200"
            >
              <img 
                src={img.url} 
                alt={img.title}
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 p-6 flex flex-col justify-between">
                <div className="flex justify-end gap-2 translate-y-[-10px] group-hover:translate-y-0 transition-transform">
                  <button className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors">
                    <Heart size={14} />
                  </button>
                  <button className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors">
                    <Share2 size={14} />
                  </button>
                </div>
                
                <div className="translate-y-[10px] group-hover:translate-y-0 transition-transform">
                  <p className="text-[10px] font-mono text-white/60 tracking-widest uppercase mb-1">Modern Art</p>
                  <h3 className="text-lg font-bold text-white tracking-tight leading-none">{img.title}</h3>
                  <div className="mt-4 flex items-center gap-2 text-white/40 text-xs font-mono">
                    <Maximize2 size={12} /> VIEW FULLSIZE
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Aesthetic Footer */}
      <footer className="p-20 text-center border-t border-black/5">
        <div className="max-w-xl mx-auto space-y-6">
          <p className="text-sm text-black/40 leading-relaxed italic">
            "Masonry layouts mimic the natural flow of human perception, allowing diverse perspectives to coexist in a single visual continuum."
          </p>
          <div className="h-px w-20 bg-black/10 mx-auto" />
          <p className="text-[10px] font-mono tracking-widest text-black/20 uppercase">End of Collection</p>
        </div>
      </footer>

      {/* Decorative Index */}
      <div className="fixed bottom-10 right-10 text-[15vh] font-black text-black/[0.02] pointer-events-none select-none -z-10">
        #67
      </div>
    </div>
  );
}
