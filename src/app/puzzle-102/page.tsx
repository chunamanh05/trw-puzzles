"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Globe2, Navigation, Target, Info, Crosshair, Plus, Minus } from "lucide-react";

/**
 * PUZZLE #102: Interactive 3D Digital Twin of Earth
 * 
 * Features:
 * 1. Realistic 3D Globe using react-globe.gl (Three.js wrapper).
 * 2. Dynamic import with ssr: false to prevent Next.js hydration errors.
 * 3. 4 Custom HTML markers for real cities.
 * 4. Fly-to camera animation on city click.
 * 5. Sci-fi / HUD overlay UI.
 */

// ─── DYNAMIC IMPORT (SSR: FALSE) ──────────────────────────────────────────────
// Thư viện 3D bắt buộc phải được render trên Client. 
// Nếu render trên Server sẽ bị lỗi "window is not defined".
const EarthGlobe = dynamic(() => import("./GlobeComponent"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-[#050505] text-cyan-500">
      <div className="relative flex items-center justify-center mb-6">
        <div className="absolute w-16 h-16 border-t-2 border-b-2 border-cyan-500 rounded-full animate-spin" />
        <Globe2 size={28} className="animate-pulse" />
      </div>
      <p className="tracking-[0.3em] text-xs font-bold animate-pulse text-cyan-400">
        INITIALIZING DIGITAL TWIN...
      </p>
    </div>
  )
});

// ─── DATA LAYER ───────────────────────────────────────────────────────────────

interface City {
  name: string;
  lat: number;
  lng: number;
  pop: string;
  desc: string;
  about: string;
}

const CITIES: City[] = [
  { name: "New York", lat: 40.7128, lng: -74.0060, pop: "8.4M",  desc: "Global Financial Hub", about: "The most populous city in the United States, known for its iconic skyline, Wall Street, and massive cultural influence across art, fashion, and entertainment." },
  { name: "London",   lat: 51.5074, lng: -0.1278,  pop: "8.9M",  desc: "European Tech Center", about: "The capital of England and the UK, standing on the River Thames. A major global city with a rich history featuring landmarks like the Tower of London." },
  { name: "Tokyo",    lat: 35.6762, lng: 139.6503, pop: "14.0M", desc: "Metropolitan Megacity", about: "The bustling capital of Japan, seamlessly blending the ultramodern with traditional temples. It boasts the world's most populous metropolitan area." },
  { name: "Sydney",   lat: -33.8688, lng: 151.2093,pop: "5.3M",  desc: "Oceania Gateway", about: "Australia's largest city, globally famous for its harbourfront Opera House, Harbour Bridge, and stunning beaches like Bondi." },
];

// ─── MAIN UI ──────────────────────────────────────────────────────────────────

export default function DigitalTwinPage() {
  const [activeCity, setActiveCity] = useState<City | null>(null);
  const [zoomAltitude, setZoomAltitude] = useState(2.5);

  const handleCityClick = (city: City | null) => {
    setActiveCity(city);
    // Tự động set mức zoom khi click: 0.15 là zoom cận cảnh, 2.5 là nhìn toàn cầu
    setZoomAltitude(city ? 0.15 : 2.5);
  };

  return (
    <main className="relative w-full h-screen bg-[#020202] overflow-hidden selection:bg-cyan-500/30">
      
      {/* LỚP DƯỚI CÙNG: 3D Canvas */}
      <div className="absolute inset-0 z-0">
        <EarthGlobe 
          cities={CITIES} 
          activeCity={activeCity} 
          zoomAltitude={zoomAltitude}
          onCityClick={handleCityClick} 
        />
      </div>

      {/* LỚP TRÊN CÙNG: UI Overlay (HUD) */}
      <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-between p-6 md:p-10">
        
        {/* Header HUD */}
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-black/40 backdrop-blur-md border border-cyan-500/30 rounded-2xl flex items-center justify-center text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.15)]">
              <Globe2 size={26} strokeWidth={1.5} />
            </div>
            <div>
              <h1 className="text-2xl font-black text-white tracking-tight">EarthTwin</h1>
              <div className="flex items-center gap-2 mt-0.5">
                <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
                <p className="text-[10px] text-cyan-400/80 tracking-[0.2em] uppercase font-semibold">
                  Global Telemetry Active
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-400 text-xs font-bold backdrop-blur-md">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            LIVE LINK
          </div>
        </div>

        {/* Floating Sidebar Controls (Bên phải) */}
        <div className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 flex flex-col gap-3 pointer-events-auto">
          {CITIES.map((city) => {
            const isActive = activeCity?.name === city.name;
            return (
              <button
                key={city.name}
                onClick={() => handleCityClick(city)}
                className={`p-3.5 rounded-2xl border backdrop-blur-md transition-all duration-300 flex items-center justify-center group relative
                  ${isActive 
                    ? "bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.2)]" 
                    : "bg-black/40 border-white/10 text-white/50 hover:bg-white/10 hover:border-white/20 hover:text-white"
                  }`}
              >
                <Navigation size={20} className={isActive ? "rotate-45 transition-transform duration-500" : "transition-transform duration-500"} />
                
                {/* Tooltip khi hover (Desktop) */}
                <span className="absolute right-[120%] px-3 py-1.5 bg-black/80 border border-white/10 rounded-lg text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  Focus {city.name}
                </span>
              </button>
            );
          })}
          
          {/* Nút Reset View */}
          <div className="w-full h-px bg-white/10 my-1" />
          <button
            onClick={() => handleCityClick(null)}
            className="p-3.5 rounded-2xl border border-white/10 bg-black/40 text-white/50 hover:bg-white/10 hover:text-white backdrop-blur-md transition-all flex items-center justify-center"
            title="Reset to Orbit View"
          >
            <Target size={20} />
          </button>
        </div>

        {/* Zoom Slider (Góc dưới bên phải) */}
        <div className="absolute right-6 md:right-10 bottom-6 md:bottom-10 flex flex-col items-center gap-2 pointer-events-auto bg-black/40 backdrop-blur-md p-3 rounded-2xl border border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.15)] z-20">
          <button onClick={() => setZoomAltitude(Math.max(0.01, zoomAltitude - 0.2))} className="w-8 h-8 flex items-center justify-center rounded-full bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/30 transition-colors">
            <Plus size={16} />
          </button>
          
          <div className="w-8 h-32 flex items-center justify-center relative">
            <input 
              type="range" 
              min="0.01" 
              max="3.0" 
              step="0.05"
              value={3.01 - zoomAltitude} 
              onChange={(e) => setZoomAltitude(3.01 - parseFloat(e.target.value))}
              className="w-28 h-1.5 appearance-none bg-white/20 rounded-full outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-cyan-400 [&::-webkit-slider-thumb]:rounded-full cursor-pointer transform -rotate-90 origin-center absolute"
            />
          </div>

          <button onClick={() => setZoomAltitude(Math.min(3.0, zoomAltitude + 0.2))} className="w-8 h-8 flex items-center justify-center rounded-full bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/30 transition-colors">
            <Minus size={16} />
          </button>
          <div className="text-[10px] font-black text-cyan-400 mt-1 uppercase tracking-widest">Zoom</div>
        </div>

        {/* Information Panel (Góc dưới trái) */}
        <div className="w-full max-w-sm pointer-events-auto">
          {activeCity ? (
            <div className="bg-black/60 backdrop-blur-xl border border-cyan-500/30 p-6 rounded-3xl shadow-[0_0_30px_rgba(0,0,0,0.5)] animate-in slide-in-from-bottom-10 fade-in duration-500">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-black text-white tracking-tight">{activeCity.name}</h2>
                  <p className="text-sm text-cyan-400/80 mt-1">{activeCity.desc}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                  <Crosshair size={18} />
                </div>
              </div>
              
              <div className="mb-6 p-4 bg-white/5 rounded-2xl border border-white/5">
                <p className="text-sm text-cyan-50/80 leading-relaxed">
                  {activeCity.about}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 p-4 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
                  <div className="flex items-center gap-2 mb-2">
                    <UsersIcon />
                    <p className="text-[10px] text-white/50 uppercase tracking-widest">Population</p>
                  </div>
                  <p className="text-xl font-bold text-white">{activeCity.pop}</p>
                </div>
                
                <div className="bg-white/5 p-4 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
                  <div className="flex items-center gap-2 mb-2">
                    <LocationIcon />
                    <p className="text-[10px] text-white/50 uppercase tracking-widest">Coordinates</p>
                  </div>
                  <p className="text-sm font-mono text-cyan-100/80">
                    {Math.abs(activeCity.lat).toFixed(2)}°{activeCity.lat >= 0 ? 'N' : 'S'}
                    <br/>
                    {Math.abs(activeCity.lng).toFixed(2)}°{activeCity.lng >= 0 ? 'E' : 'W'}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-black/40 border border-white/5 backdrop-blur-md w-max">
              <Info size={16} className="text-white/40" />
              <p className="text-white/40 text-sm font-medium">Select a target to view telemetry...</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

// Custom mini icons for the stats panel
const UsersIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-400">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const LocationIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-400">
    <circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>
  </svg>
);
