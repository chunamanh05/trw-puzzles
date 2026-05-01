"use client";

import { useEffect, useRef, useState } from "react";
import Globe from "react-globe.gl";

interface City {
  name: string;
  lat: number;
  lng: number;
  pop: string;
  desc: string;
}

interface GlobeComponentProps {
  cities: City[];
  activeCity: City | null;
  onCityClick: (city: City) => void;
}

export default function GlobeComponent({ cities, activeCity, onCityClick }: GlobeComponentProps) {
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
      // Khi chọn thành phố: Bay sát vào (altitude thấp) và ngừng tự xoay
      globeRef.current.pointOfView({ lat: activeCity.lat, lng: activeCity.lng, altitude: 0.6 }, 1500);
      globeRef.current.controls().autoRotate = false;
    } else {
      // Khi reset: Lùi camera ra xa (altitude cao) và tiếp tục tự xoay
      globeRef.current.pointOfView({ lat: 20, lng: 0, altitude: 2.5 }, 2000);
      globeRef.current.controls().autoRotate = true;
    }
  }, [activeCity]);

  // 3. Chuẩn bị dữ liệu Marker
  // Cần thêm thuộc tính size để thư viện biết cách render
  const htmlElementsData = cities.map(city => ({
    ...city,
    size: 20 
  }));

  if (windowSize.width === 0) return null; // Đợi lấy xong kích thước màn hình

  return (
    <Globe
      ref={globeRef}
      width={windowSize.width}
      height={windowSize.height}
      // Dùng các texture public chất lượng cao từ unpkg
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
      bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
      backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
      // Render HTML Markers
      htmlElementsData={htmlElementsData}
      htmlElement={(d: any) => {
        const el = document.createElement('div');
        // Sử dụng Tailwind class thẳng trong chuỗi nội dung (JIT scanner của Tailwind vẫn đọc được)
        el.innerHTML = `
          <div class="flex flex-col items-center cursor-pointer pointer-events-auto transform -translate-y-1/2">
            <div class="w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_15px_#22d3ee] animate-pulse border-2 border-white/80"></div>
            <div class="mt-2 px-3 py-1.5 bg-black/60 backdrop-blur-md rounded-lg border border-cyan-500/30 text-white text-[11px] font-bold tracking-wider uppercase whitespace-nowrap shadow-lg">
              ${d.name}
            </div>
          </div>
        `;
        
        el.style.pointerEvents = 'auto';
        el.onclick = () => onCityClick(d as City);
        return el;
      }}
      htmlAltitude={0.02} // Khoảng cách của marker so với mặt đất (tránh bị chìm vào mesh)
    />
  );
}
