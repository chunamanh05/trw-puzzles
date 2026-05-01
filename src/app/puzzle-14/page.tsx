"use client";

import { useState, useEffect, useMemo } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Search, TrendingUp, TrendingDown, Calendar, Activity, Moon, Sun, Loader2, LineChart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * PUZZLE #14: Google Trends Explorer
 * Features:
 * 1. Fetch REAL data from Google Trends via Next.js API Route.
 * 2. Fallback to realistic Mock Data if Google blocks the request (Rate Limit / Anti-bot).
 * 3. Interactive Area Chart using Recharts.
 * 4. Dark/Light Theme Toggle (as requested).
 */

// ─── MOCK DATA GENERATOR (Dự phòng) ───────────────────────────────────────────
const generateMockData = (keyword: string) => {
  const data = [];
  const now = new Date();
  let baseValue = 40;
  
  let seed = 0;
  for (let i = 0; i < keyword.length; i++) seed += keyword.charCodeAt(i);

  for (let i = 52; i >= 0; i--) { 
    const d = new Date(now.getTime() - i * 7 * 24 * 60 * 60 * 1000);
    const noise = Math.sin(i * 0.5 + seed) * 20 + Math.cos(i * 0.2 + seed) * 15;
    let value = Math.max(0, Math.min(100, Math.round(baseValue + noise + (Math.random() * 10))));
    
    // Nếu là tuần hiện tại, giả lập hiệu ứng Trending
    if (i < 5) value = Math.min(100, value + (5-i)*10);
    
    data.push({
      date: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      value: value
    });
  }
  return data;
};

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

export default function TrendsExplorer() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark'); // Bạn yêu cầu Dark Luxury nhưng thêm toggle
  const [searchTerm, setSearchTerm] = useState("Artificial Intelligence");
  const [inputVal, setInputVal] = useState("Artificial Intelligence");
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dataSource, setDataSource] = useState<'live' | 'mock'>('live');

  // Logic Fetch Dữ Liệu
  const fetchData = async (keyword: string) => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/trends?keyword=${encodeURIComponent(keyword)}`);
      const json = await res.json();
      
      if (res.ok && json.data) {
        setData(json.data);
        setDataSource('live');
      } else {
        // API Lỗi (Thường do Google chặn Rate Limit) -> Kích hoạt Mock Data
        setData(generateMockData(keyword));
        setDataSource('mock');
      }
    } catch (e) {
      setData(generateMockData(keyword));
      setDataSource('mock');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(searchTerm);
  }, [searchTerm]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputVal.trim() && inputVal.trim() !== searchTerm) {
      setSearchTerm(inputVal.trim());
    }
  };

  // Tính toán Insights
  const insights = useMemo(() => {
    if (data.length === 0) return null;
    const values = data.map(d => d.value);
    const current = values[values.length - 1];
    const previous = values[values.length - 2] || current;
    const peak = Math.max(...values);
    const lowest = Math.min(...values);
    
    // Tìm ngày Peak & Lowest
    const peakDate = data.find(d => d.value === peak)?.date;
    const lowestDate = data.find(d => d.value === lowest)?.date;
    
    const diff = current - previous;
    const status = diff >= 0 ? "On the Hype!" : "Cooling Down";
    
    return { current, peak, lowest, peakDate, lowestDate, diff, status };
  }, [data]);

  // CSS Variables tùy theo Theme
  const isDark = theme === 'dark';
  const bgMain = isDark ? "bg-[#0b0e14]" : "bg-slate-50";
  const textMain = isDark ? "text-white" : "text-slate-900";
  const textMuted = isDark ? "text-slate-400" : "text-slate-500";
  const cardBg = isDark ? "bg-[#11151f] border-white/5" : "bg-white border-slate-200/60";
  const shadowCard = isDark ? "shadow-2xl shadow-black/50" : "shadow-xl shadow-slate-200/50";
  const gridColor = isDark ? "#1e293b" : "#f1f5f9";
  const tooltipBg = isDark ? "#11151f" : "#ffffff";

  return (
    <main className={`min-h-screen transition-colors duration-500 ${bgMain} font-sans pb-20`}>
      {/* Theme Toggle */}
      <div className="absolute top-6 right-6 z-50">
        <button
          onClick={() => setTheme(isDark ? 'light' : 'dark')}
          className={`p-3 rounded-full backdrop-blur-md border transition-all ${
            isDark ? "bg-white/5 border-white/10 text-yellow-400 hover:bg-white/10" : "bg-white border-slate-200 text-slate-700 shadow-md hover:bg-slate-50"
          }`}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={theme}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </motion.div>
          </AnimatePresence>
        </button>
      </div>

      <div className="max-w-5xl mx-auto px-6 pt-20">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
              <LineChart size={24} />
            </div>
            <h1 className={`text-4xl font-black tracking-tight ${textMain}`}>
              Trends Explorer
            </h1>
          </div>
          <p className={textMuted}>Discover search trends and insights for any topic worldwide</p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-12 relative group">
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Enter a search term..."
            className={`w-full h-16 pl-6 pr-16 rounded-full border outline-none transition-all text-lg font-medium shadow-lg
              ${isDark 
                ? "bg-[#161b26] border-white/10 text-white placeholder:text-slate-600 focus:border-blue-500 focus:shadow-[0_0_20px_rgba(59,130,246,0.15)]" 
                : "bg-white border-slate-200 text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:shadow-[0_0_20px_rgba(59,130,246,0.1)]"
              }`}
          />
          <button
            type="submit"
            className="absolute right-2 top-2 bottom-2 w-12 rounded-full bg-blue-600 hover:bg-blue-500 flex items-center justify-center text-white transition-colors"
          >
            {isLoading ? <Loader2 size={20} className="animate-spin" /> : <Search size={20} />}
          </button>
        </form>

        {/* Data Source Indicator */}
        <div className="flex justify-end mb-4">
          <div className={`flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-full border ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'} ${dataSource === 'live' ? 'text-emerald-500' : 'text-amber-500'}`}>
            <div className={`w-2 h-2 rounded-full ${dataSource === 'live' ? 'bg-emerald-500' : 'bg-amber-500'} animate-pulse`} />
            {dataSource === 'live' ? 'LIVE DATA (GOOGLE API)' : 'MOCK DATA (RATE LIMITED)'}
          </div>
        </div>

        {/* Chart Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-6 md:p-8 rounded-3xl border ${cardBg} ${shadowCard} mb-8`}
        >
          <h2 className={`text-xl font-black mb-8 ${textMain}`}>Interest Over Time</h2>
          
          <div className="w-full h-[350px]">
            {isLoading ? (
              <div className="w-full h-full flex items-center justify-center">
                <Loader2 size={32} className="text-blue-500 animate-spin" />
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 0, left: -25, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={isDark ? 0.4 : 0.2}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="4 4" vertical={false} stroke={gridColor} />
                  <XAxis 
                    dataKey="date" 
                    tick={{fontSize: 11, fill: isDark ? '#64748b' : '#94a3b8'}} 
                    tickLine={false} 
                    axisLine={false} 
                    minTickGap={40} 
                  />
                  <YAxis 
                    tick={{fontSize: 11, fill: isDark ? '#64748b' : '#94a3b8'}} 
                    tickLine={false} 
                    axisLine={false} 
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: tooltipBg,
                      borderColor: isDark ? '#1e293b' : '#e2e8f0',
                      color: textMain,
                      borderRadius: '12px',
                      boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#3b82f6" 
                    strokeWidth={3} 
                    fillOpacity={1} 
                    fill="url(#colorValue)" 
                    activeDot={{ r: 6, fill: '#3b82f6', stroke: bgMain, strokeWidth: 3 }} 
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
          <div className="text-center mt-4 text-xs font-semibold uppercase tracking-widest text-slate-500">
            Time Period (Last 12 Months)
          </div>
        </motion.div>

        {/* Insights Grid */}
        <div className="mb-6">
          <h2 className={`text-xl font-bold mb-4 ${textMain}`}>
            Insights for "{searchTerm}"
          </h2>
          
          {insights && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              
              <InsightCard 
                title="Current Interest" 
                value={insights.current} 
                subtext="out of 100" 
                icon={Activity} 
                color="blue" 
                theme={theme}
              />
              
              <InsightCard 
                title="Peak Interest" 
                value={insights.peak} 
                subtext={insights.peakDate || "N/A"} 
                icon={TrendingUp} 
                color="emerald" 
                theme={theme}
              />
              
              <InsightCard 
                title="Lowest Interest" 
                value={insights.lowest} 
                subtext={insights.lowestDate || "N/A"} 
                icon={TrendingDown} 
                color="amber" 
                theme={theme}
              />
              
              <InsightCard 
                title="Trend Status" 
                value={insights.status} 
                subtext={`${insights.diff >= 0 ? '+' : ''}${insights.diff} vs previous week`} 
                icon={Calendar} 
                color="rose" 
                theme={theme}
                isTextValue
              />

            </div>
          )}
        </div>

      </div>
    </main>
  );
}

// ─── HELPER COMPONENTS ────────────────────────────────────────────────────────

function InsightCard({ title, value, subtext, icon: Icon, color, theme, isTextValue = false }: any) {
  const isDark = theme === 'dark';
  
  const colorMap: any = {
    blue: { bg: isDark ? "bg-blue-500/10" : "bg-blue-50", text: "text-blue-500", border: isDark ? "border-blue-500/20" : "border-blue-200" },
    emerald: { bg: isDark ? "bg-emerald-500/10" : "bg-emerald-50", text: "text-emerald-500", border: isDark ? "border-emerald-500/20" : "border-emerald-200" },
    amber: { bg: isDark ? "bg-amber-500/10" : "bg-amber-50", text: "text-amber-500", border: isDark ? "border-amber-500/20" : "border-amber-200" },
    rose: { bg: isDark ? "bg-rose-500/10" : "bg-rose-50", text: "text-rose-500", border: isDark ? "border-rose-500/20" : "border-rose-200" },
  };

  const c = colorMap[color];

  return (
    <div className={`p-5 rounded-2xl border transition-colors ${isDark ? "bg-[#11151f] border-white/5" : "bg-white border-slate-200 shadow-sm"}`}>
      <div className="flex justify-between items-start mb-4">
        <span className={`text-xs font-semibold uppercase tracking-wider ${isDark ? "text-slate-400" : "text-slate-500"}`}>{title}</span>
        <div className={`p-2 rounded-lg ${c.bg} ${c.text}`}>
          <Icon size={16} />
        </div>
      </div>
      <div className={`font-black ${isTextValue ? "text-xl leading-tight mb-2" : "text-3xl mb-1"} ${isDark ? "text-white" : "text-slate-900"}`}>
        {value}
      </div>
      <div className={`text-xs ${isDark ? "text-slate-500" : "text-slate-400"}`}>
        {subtext}
      </div>
    </div>
  );
}
