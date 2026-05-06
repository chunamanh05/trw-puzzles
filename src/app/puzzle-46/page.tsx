"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  MapPin, 
  Maximize2, 
  BedDouble, 
  Bath, 
  Home,
  Building,
  Navigation,
  ArrowDown,
  Compass,
  Layers,
  Award
} from "lucide-react";

const ESTATES = [
  {
    id: 1,
    title: "The Glass Pavilion",
    location: "Malibu, California",
    price: "$12,500,000",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80",
    sqft: "8,500",
    beds: 5,
    baths: 6
  },
  {
    id: 2,
    title: "Azure Sky Villa",
    location: "Santorini, Greece",
    price: "$8,900,000",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    sqft: "4,200",
    beds: 3,
    baths: 4
  },
  {
    id: 3,
    title: "Noir Minimalist",
    location: "Tokyo, Japan",
    price: "$15,200,000",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    sqft: "12,000",
    beds: 7,
    baths: 9
  },
  {
    id: 4,
    title: "The Alpine Retreat",
    location: "Zermatt, Switzerland",
    price: "$7,400,000",
    image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1200&q=80",
    sqft: "3,800",
    beds: 4,
    baths: 3
  },
  {
    id: 5,
    title: "Emerald Estate",
    location: "Bali, Indonesia",
    price: "$5,800,000",
    image: "https://images.unsplash.com/photo-1576941089067-2de3c901e126?auto=format&fit=crop&w=1200&q=80",
    sqft: "6,500",
    beds: 6,
    baths: 5
  }
];

export default function StickyHorizontalScroll() {
  const targetRef = useRef<HTMLDivElement>(null);
  
  // Cải tiến: Thêm offset ["start start", "end end"] để bắt đầu ngay khi chạm đỉnh
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  // Tăng biên độ di chuyển để chắc chắn ảnh chạy hết sang trái
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

  return (
    <div className="bg-[#0a0a0c]">
      
      {/* 1. HERO SECTION */}
      <section className="h-screen flex flex-col items-center justify-center text-white px-8 text-center relative">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative z-10"
        >
          <h1 className="text-[12vw] font-black tracking-tighter leading-none mb-4">ESTATE</h1>
          <h2 className="text-2xl font-light tracking-[0.5em] text-slate-400 uppercase mb-12">Horizon Discovery</h2>
          <motion.div 
            animate={{ y: [0, 15, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="cursor-pointer"
          >
            <ArrowDown size={32} className="text-indigo-500" />
          </motion.div>
        </motion.div>
      </section>

      {/* 2. STICKY HORIZONTAL SCROLL SECTION */}
      <section ref={targetRef} className="relative h-[500vh]">
        <div className="sticky top-0 h-screen flex items-center overflow-hidden">
          <motion.div style={{ x, opacity }} className="flex gap-20 px-[10vw]">
            {ESTATES.map((estate) => (
              <div 
                key={estate.id}
                className="flex-shrink-0 w-[85vw] md:w-[70vw] lg:w-[55vw]"
              >
                <div className="relative aspect-video rounded-[60px] overflow-hidden group shadow-2xl">
                  <img 
                    src={estate.image} 
                    alt={estate.title}
                    className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-16 flex flex-col justify-end">
                    <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm uppercase tracking-widest mb-4">
                      <MapPin size={16} /> {estate.location}
                    </div>
                    <h3 className="text-6xl font-black text-white mb-4 tracking-tighter">{estate.title}</h3>
                    <p className="text-white/60 text-xl font-medium">{estate.price}</p>
                  </div>
                </div>
                <div className="mt-10 px-10 flex justify-between items-center text-white">
                  <div className="flex gap-12">
                    <div className="flex flex-col gap-1">
                      <span className="text-slate-500 text-[10px] uppercase font-bold tracking-widest">Beds</span>
                      <span className="text-2xl font-black">{estate.beds}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-slate-500 text-[10px] uppercase font-bold tracking-widest">Baths</span>
                      <span className="text-2xl font-black">{estate.baths}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-slate-500 text-[10px] uppercase font-bold tracking-widest">Area</span>
                      <span className="text-2xl font-black">{estate.sqft} <span className="text-sm font-normal text-slate-500">ft²</span></span>
                    </div>
                  </div>
                  <button className="h-16 px-10 rounded-full border border-white/20 hover:bg-white hover:text-black transition-all font-black text-[10px] uppercase tracking-[0.2em]">
                    Inquire Now
                  </button>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 3. NEW SECTION: INTERIOR SPOTLIGHT (TRƯỚC FOOTER) */}
      <section className="min-h-screen bg-white py-32 px-8 lg:px-24 flex flex-col justify-center">
        <div className="grid lg:grid-cols-2 gap-24 items-center max-w-7xl mx-auto">
          <div>
            <div className="flex items-center gap-2 text-indigo-600 font-black uppercase tracking-[0.3em] text-[10px] mb-8">
              <Compass size={16} /> Interior Excellence
            </div>
            <h2 className="text-7xl font-black text-slate-900 tracking-tighter leading-[0.9] mb-10">
              Details that <br /> <span className="text-slate-300">define luxury.</span>
            </h2>
            <div className="space-y-8 text-xl text-slate-500 leading-relaxed font-medium">
              <p>Mọi chi tiết nội thất đều được tuyển chọn từ những nghệ nhân hàng đầu thế giới, kết hợp giữa đá cẩm thạch Ý và gỗ sồi lâu năm.</p>
              <div className="grid grid-cols-2 gap-10 pt-10">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-slate-900 font-black">
                    <Layers size={20} className="text-indigo-500" /> 100%
                  </div>
                  <span className="text-xs uppercase tracking-widest font-bold text-slate-400">Custom Finishes</span>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-slate-900 font-black">
                    <Award size={20} className="text-indigo-500" /> 15+
                  </div>
                  <span className="text-xs uppercase tracking-widest font-bold text-slate-400">Design Awards</span>
                </div>
              </div>
            </div>
          </div>
          <div className="relative aspect-square rounded-[80px] overflow-hidden shadow-3xl">
            <img 
              src="https://images.unsplash.com/photo-1600607687940-47a0f9259017?auto=format&fit=crop&w=1200&q=80" 
              className="w-full h-full object-cover" 
              alt="Interior"
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-[80px]" />
          </div>
        </div>
      </section>

      {/* 4. FINAL CTA / FOOTER */}
      <section className="h-[80vh] flex flex-col items-center justify-center bg-[#0a0a0c] text-white px-8 border-t border-white/5">
        <div className="text-center max-w-3xl">
          <h2 className="text-5xl md:text-7xl font-black mb-12 tracking-tighter">Your horizon awaits.</h2>
          <div className="flex flex-wrap justify-center gap-6">
            <button className="bg-indigo-600 px-12 py-6 rounded-3xl font-black uppercase text-xs tracking-widest shadow-2xl shadow-indigo-500/20">Schedule Visit</button>
            <button className="bg-white/5 border border-white/10 px-12 py-6 rounded-3xl font-black uppercase text-xs tracking-widest">Contact Sales</button>
          </div>
        </div>
        <footer className="absolute bottom-10 w-full px-20 flex justify-between text-[10px] font-black uppercase tracking-[0.3em] text-slate-600">
          <div>&copy; Antigravity Estates 2025</div>
          <div className="flex gap-8">
            <span className="hover:text-white cursor-pointer transition-colors">Instagram</span>
            <span className="hover:text-white cursor-pointer transition-colors">LinkedIn</span>
          </div>
        </footer>
      </section>
    </div>
  );
}
