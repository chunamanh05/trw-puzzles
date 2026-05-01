"use client";

import { useEffect, useRef, useState } from "react";
import Globe from "react-globe.gl";

interface City {
  name: string;
  lat: number;
  lng: number;
  pop: string;
  desc: string;
  about: string;
}

interface GlobeComponentProps {
  cities: City[];
  activeCity: City | null;
  zoomAltitude: number;
  onCityClick: (city: City) => void;
}

export default function GlobeComponent({ cities, activeCity, zoomAltitude, onCityClick }: GlobeComponentProps) {
  const globeRef = useRef<any>(null);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  // 1. Responsive Canvas Size
  useEffect(() => {
    // Chỉ chạy trên Client
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 2. Camera Controls & Animation
  useEffect(() => {
    if (!globeRef.current) return;
    
    // Config ban đầu
    globeRef.current.controls().autoRotate = true;
    globeRef.current.controls().autoRotateSpeed = 0.5;
    globeRef.current.controls().enableZoom = true;
    
    if (activeCity) {
      // Khi chọn thành phố: Bay sát vào (lấy altitude từ state của slider)
      globeRef.current.pointOfView({ lat: activeCity.lat, lng: activeCity.lng, altitude: zoomAltitude }, 1500);
      globeRef.current.controls().autoRotate = false;
    } else {
      // Khi reset: Lùi camera ra xa
      globeRef.current.pointOfView({ lat: 20, lng: 0, altitude: zoomAltitude }, 2000);
      globeRef.current.controls().autoRotate = true;
    }
  }, [activeCity]);

  // 2.5 Dynamic Zoom (từ Slider)
  useEffect(() => {
    if (!globeRef.current) return;
    const currentPov = globeRef.current.pointOfView();
    // Giữ nguyên tọa độ hiện tại, chỉ thay đổi cao độ (altitude) với thời gian ngắn (100ms) để slider mượt
    globeRef.current.pointOfView({ ...currentPov, altitude: zoomAltitude }, 100);
  }, [zoomAltitude]);

  // 3. Chuẩn bị dữ liệu Marker
  const htmlElementsData = cities.map(city => ({
    ...city,
    size: 20,
    isActive: activeCity?.name === city.name // Thêm cờ để biết thành phố nào đang được focus
  }));

  if (windowSize.width === 0) return null; // Đợi lấy xong kích thước màn hình

  return (
    <Globe
      ref={globeRef}
      width={windowSize.width}
      height={windowSize.height}
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
      bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
      backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
      htmlElementsData={htmlElementsData}
      htmlElement={(d: any) => {
        const el = document.createElement('div');
        el.style.pointerEvents = 'auto';
        el.onclick = () => onCityClick(d as City);

        if (d.isActive) {
          // BẢNG THÔNG TIN NỔI KHI ĐƯỢC CHỌN (POPUP TRÊN QUẢ CẦU)
          el.innerHTML = `
            <div class="flex flex-col items-center cursor-pointer transform -translate-y-full pb-2">
              <div class="bg-black/80 backdrop-blur-xl border border-cyan-400 p-4 rounded-xl shadow-[0_0_30px_rgba(34,211,238,0.4)] w-48">
                <div class="flex items-center gap-2 mb-2">
                  <div class="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span class="text-white font-black text-sm uppercase">${d.name}</span>
                </div>
                <div class="w-full h-px bg-cyan-500/30 mb-2"></div>
                <p class="text-cyan-100 text-[10px] leading-relaxed">${d.desc}</p>
                <div class="mt-3 flex justify-between items-center text-[9px] text-cyan-400 font-mono">
                  <span>POP: ${d.pop}</span>
                  <span>[LIVE]</span>
                </div>
              </div>
              <!-- Đường chỉ nối xuống mặt đất -->
              <div class="w-px h-10 bg-gradient-to-b from-cyan-400 to-transparent"></div>
              <div class="w-4 h-4 bg-cyan-400 rounded-full shadow-[0_0_20px_#22d3ee] animate-pulse border-2 border-white"></div>
            </div>
          `;
          el.style.zIndex = "10";
        } else {
          // GIAO DIỆN MẶC ĐỊNH (CHỈ LÀ DẤU CHẤM + TÊN)
          el.innerHTML = `
            <div class="flex flex-col items-center cursor-pointer transform -translate-y-1/2 opacity-70 hover:opacity-100 hover:scale-110 transition-all duration-300">
              <div class="w-3 h-3 bg-cyan-400/80 rounded-full border border-cyan-300 shadow-[0_0_10px_#22d3ee]"></div>
              <div class="mt-1 px-2 py-0.5 bg-black/40 backdrop-blur-sm rounded border border-white/10 text-white text-[9px] font-bold uppercase tracking-widest whitespace-nowrap">
                ${d.name}
              </div>
            </div>
          `;
          el.style.zIndex = "1";
        }
        
        return el;
      }}
      htmlAltitude={0.01}
    />
  );
}
