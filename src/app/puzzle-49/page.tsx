"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { embed, cosineSimilarity, getEmbeddingPipeline } from "./embedding-pipeline";
import { articles } from "../puzzle-48/search-data";

type SearchResult = {
  article: typeof articles[0];
  score: number;
};

type ModelStatus = "idle" | "loading" | "ready" | "error";

// Gợi ý query ngữ nghĩa để demo AI
const DEMO_QUERIES = [
  "quiet house near the ocean",
  "modern minimalist architecture",
  "most expensive property",
  "private getaway in nature",
  "urban luxury skyscraper",
  "historic building with gardens",
];

export default function Puzzle49() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [modelStatus, setModelStatus] = useState<ModelStatus>("idle");
  const [loadProgress, setLoadProgress] = useState(0);
  const [isSearching, setIsSearching] = useState(false);
  const [articleEmbeddings, setArticleEmbeddings] = useState<{ id: number; vec: number[] }[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Load model + pre-embed tất cả articles khi mount
  useEffect(() => {
    let cancelled = false;
    async function init() {
      setModelStatus("loading");
      try {
        await getEmbeddingPipeline((p) => setLoadProgress(Math.round(p)));
        if (cancelled) return;

        const embeddings: { id: number; vec: number[] }[] = [];
        for (const article of articles) {
          const vec = await embed(`${article.title}. ${article.description}. ${article.content}`);
          if (!cancelled) embeddings.push({ id: article.id, vec });
        }
        if (!cancelled) {
          setArticleEmbeddings(embeddings);
          setModelStatus("ready");
        }
      } catch {
        if (!cancelled) setModelStatus("error");
      }
    }
    init();
    return () => { cancelled = true; };
  }, []);

  // Ctrl+K
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") { e.preventDefault(); inputRef.current?.focus(); }
      if (e.key === "Escape") setQuery("");
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const runSearch = useCallback(async (q: string) => {
    if (!q.trim() || modelStatus !== "ready") { setResults([]); return; }
    setIsSearching(true);
    try {
      const qVec = await embed(q);
      const scored = articleEmbeddings.map(({ id, vec }) => ({
        article: articles.find((a) => a.id === id)!,
        score: cosineSimilarity(qVec, vec),
      }));
      scored.sort((a, b) => b.score - a.score);
      setResults(scored.filter((r) => r.score > 0.2));
    } finally {
      setIsSearching(false);
    }
  }, [articleEmbeddings, modelStatus]);

  // Debounce search
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (!query.trim()) { setResults([]); return; }
    debounceRef.current = setTimeout(() => runSearch(query), 500);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [query, runSearch]);

  const TYPE_COLOR: Record<string, string> = {
    villa: "#22d3ee", penthouse: "#a855f7", estate: "#fbbf24",
    mansion: "#f97316", retreat: "#34d399",
  };

  return (
    <div style={{ minHeight: "100vh", background: "#07090f", color: "#e2e8f0", fontFamily: "Inter, system-ui, sans-serif" }}>
      <style>{`
        .p49-glow { background: radial-gradient(ellipse at 50% 0%, rgba(168,85,247,0.12) 0%, transparent 65%); }
        .p49-grid { background-image: linear-gradient(rgba(168,85,247,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.04) 1px, transparent 1px); background-size: 48px 48px; }
        .p49-input { width:100%; background:rgba(255,255,255,0.04); border:1.5px solid rgba(255,255,255,0.08); border-radius:14px; padding:18px 140px 18px 52px; font-size:17px; color:#f1f5f9; outline:none; box-sizing:border-box; transition:border-color .25s,box-shadow .25s; }
        .p49-input::placeholder { color:#334155; }
        .p49-input:focus { border-color:rgba(168,85,247,0.5); box-shadow:0 0 0 4px rgba(168,85,247,0.08); background:rgba(168,85,247,0.03); }
        .p49-input:disabled { opacity:.5; cursor:not-allowed; }
        .p49-card { background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.06); border-radius:14px; padding:20px 24px; margin-bottom:10px; transition:border-color .2s, transform .15s; animation: cardIn .25s ease both; }
        .p49-card:hover { border-color:rgba(168,85,247,0.3); transform:translateX(4px); }
        @keyframes cardIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        .p49-bar-fill { height:100%; background:linear-gradient(90deg,#a855f7,#22d3ee); border-radius:2px; transition:width .3s ease; }
        .p49-chip { background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.07); border-radius:8px; padding:10px 14px; cursor:pointer; font-size:13px; color:#64748b; transition:border-color .2s,color .2s; }
        .p49-chip:hover { border-color:rgba(168,85,247,0.4); color:#a855f7; }
        .p49-pulse { animation: pulse 1.5s ease-in-out infinite; }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
      `}</style>

      {/* Back */}
      <Link href="/" style={{ position:"fixed", top:20, left:24, zIndex:100, display:"flex", alignItems:"center", gap:8, fontSize:12, color:"#475569", textDecoration:"none", fontFamily:"monospace", background:"rgba(7,9,15,0.85)", backdropFilter:"blur(12px)", padding:"8px 14px", border:"1px solid rgba(255,255,255,0.06)", borderRadius:8 }}>
        ← Lobby
      </Link>

      {/* Hero */}
      <div style={{ position:"relative", height:300, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", textAlign:"center", overflow:"hidden", borderBottom:"1px solid rgba(255,255,255,0.06)" }}>
        <div className="p49-grid p49-glow" style={{ position:"absolute", inset:0 }} />
        <div style={{ position:"relative" }}>
          <div style={{ fontSize:11, letterSpacing:"0.25em", textTransform:"uppercase", color:"#a855f7", marginBottom:14, fontFamily:"monospace" }}>
            Puzzle #49 — AI Semantic Search
          </div>
          <h1 style={{ fontSize:"clamp(1.8rem,5vw,3rem)", fontWeight:800, letterSpacing:"-0.03em", marginBottom:12, lineHeight:1.1 }}>
            Tìm Kiếm Bằng{" "}
            <span style={{ background:"linear-gradient(135deg,#a855f7,#22d3ee)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
              Ý Nghĩa
            </span>
          </h1>
          <p style={{ color:"#64748b", fontSize:14, margin:0 }}>
            Vector embeddings · Cosine similarity · Transformers.js (miễn phí, chạy ngay trong trình duyệt)
          </p>
        </div>
      </div>

      <div style={{ maxWidth:760, margin:"0 auto", padding:"32px 24px 64px" }}>

        {/* Model status bar */}
        <div style={{ marginBottom:24 }}>
          {modelStatus === "loading" && (
            <div style={{ background:"rgba(168,85,247,0.06)", border:"1px solid rgba(168,85,247,0.2)", borderRadius:12, padding:"14px 18px" }}>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8, fontSize:12, color:"#a855f7", fontFamily:"monospace" }}>
                <span className="p49-pulse">⚡ Đang tải AI model (all-MiniLM-L6-v2 ~25MB)...</span>
                <span>{loadProgress}%</span>
              </div>
              <div style={{ height:4, background:"rgba(255,255,255,0.06)", borderRadius:2, overflow:"hidden" }}>
                <div className="p49-bar-fill" style={{ width:`${loadProgress}%` }} />
              </div>
              <div style={{ fontSize:11, color:"#475569", marginTop:8, fontFamily:"monospace" }}>
                Sau lần đầu, model được cache lại — lần sau tải ngay lập tức
              </div>
            </div>
          )}
          {modelStatus === "ready" && (
            <div style={{ background:"rgba(34,211,238,0.05)", border:"1px solid rgba(34,211,238,0.15)", borderRadius:12, padding:"10px 18px", display:"flex", alignItems:"center", gap:10, fontSize:12, color:"#22d3ee", fontFamily:"monospace" }}>
              <span style={{ width:7, height:7, borderRadius:"50%", background:"#22d3ee", boxShadow:"0 0 8px #22d3ee", flexShrink:0 }} />
              Model sẵn sàng · {articles.length} bất động sản đã được index · Nhập bất kỳ mô tả nào bằng tiếng Anh
            </div>
          )}
          {modelStatus === "error" && (
            <div style={{ background:"rgba(239,68,68,0.08)", border:"1px solid rgba(239,68,68,0.2)", borderRadius:12, padding:"10px 18px", fontSize:12, color:"#f87171" }}>
              ❌ Không tải được model. Kiểm tra kết nối mạng và thử lại.
            </div>
          )}
        </div>

        {/* Search input */}
        <div style={{ position:"relative", marginBottom:16 }}>
          <svg style={{ position:"absolute", left:18, top:"50%", transform:"translateY(-50%)", color:"#a855f7", opacity:.8, pointerEvents:"none" }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <input
            ref={inputRef}
            className="p49-input"
            disabled={modelStatus !== "ready"}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={modelStatus === "ready" ? "Mô tả ngôi nhà bạn mơ ước... (bằng tiếng Anh)" : "Đang tải AI model..."}
          />
          <div style={{ position:"absolute", right:16, top:"50%", transform:"translateY(-50%)", display:"flex", alignItems:"center", gap:8 }}>
            {isSearching && <span className="p49-pulse" style={{ fontSize:11, color:"#a855f7", fontFamily:"monospace" }}>thinking...</span>}
            {results.length > 0 && !isSearching && (
              <span style={{ fontSize:11, fontFamily:"monospace", color:"#a855f7", background:"rgba(168,85,247,0.1)", border:"1px solid rgba(168,85,247,0.2)", borderRadius:20, padding:"2px 10px" }}>
                {results.length} kết quả
              </span>
            )}
            {modelStatus === "ready" && !query && (
              <span style={{ display:"flex", gap:3, background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:6, padding:"3px 8px" }}>
                <kbd style={{ fontSize:10, color:"#475569", fontFamily:"monospace" }}>Ctrl</kbd>
                <kbd style={{ fontSize:10, color:"#475569", fontFamily:"monospace" }}>K</kbd>
              </span>
            )}
          </div>
        </div>

        {/* Demo queries */}
        {modelStatus === "ready" && !query && (
          <div style={{ marginBottom:32 }}>
            <div style={{ fontSize:11, color:"#334155", fontFamily:"monospace", letterSpacing:"0.15em", textTransform:"uppercase", marginBottom:12 }}>
              Thử các query ngữ nghĩa này — Fuse.js sẽ thất bại, AI sẽ tìm ra:
            </div>
            <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
              {DEMO_QUERIES.map((q) => (
                <button key={q} className="p49-chip" onClick={() => { setQuery(q); inputRef.current?.focus(); }}>
                  "{q}"
                </button>
              ))}
            </div>
          </div>
        )}

        {/* So sánh với #48 */}
        {modelStatus === "ready" && !query && (
          <div style={{ marginBottom:32, padding:"14px 18px", background:"rgba(255,255,255,0.02)", border:"1px solid rgba(255,255,255,0.06)", borderRadius:12, fontSize:13, color:"#475569" }}>
            💡 Puzzle này nâng cấp từ{" "}
            <Link href="/puzzle-48" style={{ color:"#22d3ee", textDecoration:"none" }}>Puzzle #48 (Fuse.js)</Link>
            {" "}— thử cùng một query ở cả hai trang để thấy sự khác biệt giữa keyword matching và semantic understanding.
          </div>
        )}

        {/* Results */}
        {results.length > 0 && (
          <div>
            <div style={{ fontSize:11, color:"#475569", fontFamily:"monospace", letterSpacing:"0.15em", textTransform:"uppercase", marginBottom:16 }}>
              Kết quả theo mức độ tương đồng ngữ nghĩa
            </div>
            {results.map((r, i) => (
              <div key={r.article.id} className="p49-card" style={{ animationDelay:`${i * 50}ms` }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:10 }}>
                  <div style={{ fontWeight:700, fontSize:16, letterSpacing:"-0.01em" }}>{r.article.title}</div>
                  <div style={{ display:"flex", alignItems:"center", gap:8, flexShrink:0 }}>
                    <span style={{ fontSize:10, textTransform:"uppercase", letterSpacing:"0.1em", fontFamily:"monospace", padding:"3px 9px", borderRadius:20, background:`${TYPE_COLOR[r.article.type]}22`, color:TYPE_COLOR[r.article.type], border:`1px solid ${TYPE_COLOR[r.article.type]}44` }}>
                      {r.article.type}
                    </span>
                    {/* Similarity bar */}
                    <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                      <div style={{ width:60, height:4, background:"rgba(255,255,255,0.06)", borderRadius:2, overflow:"hidden" }}>
                        <div style={{ width:`${Math.round(r.score * 100)}%`, height:"100%", background:"linear-gradient(90deg,#a855f7,#22d3ee)", borderRadius:2 }} />
                      </div>
                      <span style={{ fontSize:11, fontFamily:"monospace", color:"#a855f7", minWidth:34 }}>
                        {Math.round(r.score * 100)}%
                      </span>
                    </div>
                  </div>
                </div>
                <p style={{ fontSize:13.5, color:"#64748b", lineHeight:1.65, marginBottom:12 }}>
                  {r.article.description}
                </p>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <span style={{ fontSize:12, color:"#475569", fontFamily:"monospace", display:"flex", alignItems:"center", gap:5 }}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                    {r.article.location}
                  </span>
                  <span style={{ fontWeight:700, color:"#a855f7", fontSize:14 }}>{r.article.price}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {query && !isSearching && results.length === 0 && modelStatus === "ready" && (
          <div style={{ textAlign:"center", padding:"60px 0", color:"#334155" }}>
            <div style={{ fontSize:48, marginBottom:16, opacity:.4 }}>🤖</div>
            <div style={{ fontSize:16, fontWeight:600, color:"#475569", marginBottom:6 }}>AI không tìm thấy kết quả phù hợp</div>
            <div style={{ fontSize:13 }}>Thử mô tả chi tiết hơn bằng tiếng Anh</div>
          </div>
        )}

        {/* Initial state — idle */}
        {modelStatus === "idle" && (
          <div style={{ textAlign:"center", padding:"60px 0", color:"#334155" }}>
            <div style={{ fontSize:13 }}>Đang khởi tạo...</div>
          </div>
        )}
      </div>
    </div>
  );
}
