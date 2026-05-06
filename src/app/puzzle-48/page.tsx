"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Fuse, { FuseResult } from "fuse.js";
import { articles, Article } from "./search-data";
import Link from "next/link";

// ─── Fuse.js configuration ────────────────────────────────────────────────────
const fuse = new Fuse(articles, {
  keys: [
    { name: "title", weight: 3 },
    { name: "description", weight: 2 },
    { name: "category", weight: 1.5 },
    { name: "location", weight: 1.5 },
    { name: "content", weight: 1 },
    { name: "type", weight: 0.5 },
  ],
  threshold: 0.35,
  includeScore: true,
  includeMatches: true,
  minMatchCharLength: 2,
  findAllMatches: true,
});

// ─── Keyword Highlight Utility ─────────────────────────────────────────────────
function highlight(text: string, query: string): React.ReactNode {
  if (!query.trim()) return text;
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
  const parts = text.split(regex);
  return parts.map((part, i) =>
    regex.test(part) ? (
      <mark
        key={i}
        className="search-highlight"
      >
        {part}
      </mark>
    ) : (
      part
    )
  );
}

// ─── Type badge ───────────────────────────────────────────────────────────────
const TYPE_COLORS: Record<Article["type"], string> = {
  villa:      "rgba(34, 211, 238, 0.15)",
  penthouse:  "rgba(168, 85, 247, 0.15)",
  estate:     "rgba(251, 191, 36, 0.15)",
  mansion:    "rgba(249, 115, 22, 0.15)",
  retreat:    "rgba(52, 211, 153, 0.15)",
};
const TYPE_TEXT: Record<Article["type"], string> = {
  villa:      "#22d3ee",
  penthouse:  "#a855f7",
  estate:     "#fbbf24",
  mansion:    "#f97316",
  retreat:    "#34d399",
};

export default function Puzzle48() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<FuseResult<Article>[]>([]);
  const [focused, setFocused] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [hasSearched, setHasSearched] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // ── Run search ───────────────────────────────────────────────────────────
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setHasSearched(false);
      setSelectedIndex(-1);
      return;
    }
    setHasSearched(true);
    const found = fuse.search(query);
    setResults(found);
    setSelectedIndex(-1);
  }, [query]);

  // ── Ctrl+K shortcut ──────────────────────────────────────────────────────
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
        inputRef.current?.select();
      }
      if (e.key === "Escape") {
        inputRef.current?.blur();
        setQuery("");
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // ── Keyboard navigation ───────────────────────────────────────────────────
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((i) => Math.min(i + 1, results.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((i) => Math.max(i - 1, -1));
      }
    },
    [results.length]
  );

  const relevanceLabel = (score?: number) => {
    if (!score) return "100%";
    const pct = Math.round((1 - score) * 100);
    return `${pct}%`;
  };

  return (
    <div className="puzzle-48-root">
      <style>{`
        .puzzle-48-root {
          min-height: 100vh;
          background: #07090f;
          color: #e2e8f0;
          font-family: 'Inter', 'SF Pro Display', system-ui, sans-serif;
        }

        /* ── Hero ─────────────────────────────────────── */
        .p48-hero {
          position: relative;
          height: 340px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          overflow: hidden;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .p48-hero-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(34,211,238,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34,211,238,0.04) 1px, transparent 1px);
          background-size: 48px 48px;
          mask-image: radial-gradient(ellipse 80% 100% at 50% 0%, black 60%, transparent 100%);
        }
        .p48-hero-glow {
          position: absolute;
          top: -120px;
          left: 50%;
          transform: translateX(-50%);
          width: 600px;
          height: 600px;
          background: radial-gradient(ellipse, rgba(34,211,238,0.12) 0%, transparent 70%);
          pointer-events: none;
        }
        .p48-label {
          font-size: 11px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #22d3ee;
          margin-bottom: 16px;
          font-family: 'JetBrains Mono', monospace;
        }
        .p48-heading {
          font-size: clamp(2rem, 6vw, 3.5rem);
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 1.05;
          margin-bottom: 12px;
        }
        .p48-heading span {
          background: linear-gradient(135deg, #22d3ee 0%, #a855f7 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .p48-subtext {
          color: #64748b;
          font-size: 15px;
          margin-bottom: 0;
        }
        .p48-shortcut {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          margin-left: 4px;
          font-size: 11px;
          color: #475569;
        }
        .p48-shortcut kbd {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 4px;
          padding: 1px 5px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          color: #94a3b8;
        }

        /* ── Search Bar ───────────────────────────────── */
        .p48-search-wrapper {
          max-width: 800px;
          margin: 0 auto;
          padding: 40px 24px 24px;
        }
        .p48-search-box {
          position: relative;
        }
        .p48-search-icon {
          position: absolute;
          left: 20px;
          top: 50%;
          transform: translateY(-50%);
          color: #22d3ee;
          opacity: 0.7;
          pointer-events: none;
          transition: opacity 0.2s;
        }
        .p48-input:focus ~ .p48-search-icon,
        .p48-search-box:focus-within .p48-search-icon {
          opacity: 1;
        }
        .p48-input {
          width: 100%;
          background: rgba(255,255,255,0.04);
          border: 1.5px solid rgba(255,255,255,0.08);
          border-radius: 14px;
          padding: 18px 120px 18px 56px;
          font-size: 17px;
          color: #f1f5f9;
          outline: none;
          transition: border-color 0.25s, box-shadow 0.25s, background 0.25s;
          box-sizing: border-box;
        }
        .p48-input::placeholder { color: #334155; }
        .p48-input:focus {
          border-color: rgba(34,211,238,0.5);
          background: rgba(34,211,238,0.04);
          box-shadow: 0 0 0 4px rgba(34,211,238,0.08), 0 1px 40px rgba(34,211,238,0.05);
        }
        .p48-input-badge {
          position: absolute;
          right: 16px;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .p48-input-kbd {
          display: flex;
          align-items: center;
          gap: 3px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 6px;
          padding: 3px 8px;
        }
        .p48-input-kbd kbd {
          font-size: 11px;
          color: #475569;
          font-family: 'JetBrains Mono', monospace;
        }
        .p48-count-badge {
          font-size: 11px;
          font-family: 'JetBrains Mono', monospace;
          color: #22d3ee;
          padding: 3px 10px;
          background: rgba(34,211,238,0.08);
          border: 1px solid rgba(34,211,238,0.2);
          border-radius: 20px;
          letter-spacing: 0.05em;
        }

        /* ── Status Bar ───────────────────────────────── */
        .p48-status {
          max-width: 800px;
          margin: 0 auto;
          padding: 0 24px 16px;
          font-size: 12px;
          color: #475569;
          font-family: 'JetBrains Mono', monospace;
          display: flex;
          align-items: center;
          gap: 8px;
          min-height: 28px;
        }
        .p48-status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #22d3ee;
          box-shadow: 0 0 8px #22d3ee;
          flex-shrink: 0;
          animation: blink 1.2s ease-in-out infinite;
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }

        /* ── Results Grid ─────────────────────────────── */
        .p48-results {
          max-width: 800px;
          margin: 0 auto;
          padding: 0 24px 64px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        /* ── Result Card ──────────────────────────────── */
        .p48-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 14px;
          padding: 20px 24px;
          cursor: pointer;
          transition: border-color 0.2s, background 0.2s, transform 0.15s;
          position: relative;
          overflow: hidden;
          animation: cardIn 0.2s ease both;
          text-decoration: none;
          color: inherit;
          display: block;
        }
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .p48-card:hover,
        .p48-card.is-selected {
          border-color: rgba(34,211,238,0.3);
          background: rgba(34,211,238,0.04);
          transform: translateX(4px);
        }
        .p48-card::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          width: 3px;
          height: 100%;
          background: linear-gradient(180deg, #22d3ee, #a855f7);
          opacity: 0;
          transition: opacity 0.2s;
          border-radius: 3px 0 0 3px;
        }
        .p48-card:hover::before,
        .p48-card.is-selected::before { opacity: 1; }

        .p48-card-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 10px;
        }
        .p48-card-title {
          font-size: 16px;
          font-weight: 700;
          letter-spacing: -0.01em;
          color: #f1f5f9;
          line-height: 1.3;
        }
        .p48-card-meta {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
        }
        .p48-card-type {
          font-size: 10px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          font-family: 'JetBrains Mono', monospace;
          padding: 3px 9px;
          border-radius: 20px;
          font-weight: 600;
        }
        .p48-card-score {
          font-size: 11px;
          font-family: 'JetBrains Mono', monospace;
          color: #334155;
        }
        .p48-card-desc {
          font-size: 13.5px;
          color: #64748b;
          line-height: 1.65;
          margin-bottom: 14px;
        }
        .p48-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .p48-card-location {
          font-size: 12px;
          color: #475569;
          font-family: 'JetBrains Mono', monospace;
          display: flex;
          align-items: center;
          gap: 5px;
        }
        .p48-card-price {
          font-size: 14px;
          font-weight: 700;
          color: #22d3ee;
          letter-spacing: -0.01em;
        }

        /* ── Highlight ────────────────────────────────── */
        .search-highlight {
          background: rgba(34,211,238,0.18);
          color: #67e8f9;
          border-radius: 3px;
          padding: 0 2px;
          font-weight: 600;
          text-decoration: none;
        }

        /* ── Empty State ──────────────────────────────── */
        .p48-empty {
          text-align: center;
          padding: 60px 24px;
          color: #334155;
        }
        .p48-empty-icon {
          font-size: 48px;
          margin-bottom: 16px;
          filter: grayscale(1);
          opacity: 0.5;
        }
        .p48-empty-title {
          font-size: 17px;
          font-weight: 600;
          color: #475569;
          margin-bottom: 6px;
        }
        .p48-empty-sub {
          font-size: 13px;
          color: #334155;
        }

        /* ── Featured Grid (initial state) ───────────── */
        .p48-featured {
          max-width: 800px;
          margin: 0 auto;
          padding: 0 24px 64px;
        }
        .p48-featured-label {
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #334155;
          font-family: 'JetBrains Mono', monospace;
          margin-bottom: 16px;
        }
        .p48-featured-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 10px;
        }
        .p48-featured-chip {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 10px;
          padding: 14px 16px;
          cursor: pointer;
          transition: border-color 0.2s, background 0.2s;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .p48-featured-chip:hover {
          border-color: rgba(34,211,238,0.25);
          background: rgba(34,211,238,0.03);
        }
        .p48-featured-chip-title {
          font-size: 13px;
          font-weight: 600;
          color: #94a3b8;
        }
        .p48-featured-chip-loc {
          font-size: 11px;
          color: #475569;
          font-family: 'JetBrains Mono', monospace;
        }

        /* ── Back link ────────────────────────────────── */
        .p48-back {
          position: fixed;
          top: 20px;
          left: 24px;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          color: #475569;
          text-decoration: none;
          font-family: 'JetBrains Mono', monospace;
          letter-spacing: 0.05em;
          transition: color 0.2s;
          z-index: 100;
          background: rgba(7,9,15,0.8);
          backdrop-filter: blur(12px);
          padding: 8px 14px;
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 8px;
        }
        .p48-back:hover { color: #22d3ee; border-color: rgba(34,211,238,0.3); }

        /* ── Progress bar ─────────────────────────────── */
        .p48-progress {
          position: fixed;
          top: 0;
          left: 0;
          height: 2px;
          background: linear-gradient(90deg, #22d3ee, #a855f7);
          transition: width 0.3s ease;
          z-index: 1000;
          box-shadow: 0 0 12px #22d3ee;
        }
      `}</style>

      {/* Progress bar */}
      <div
        className="p48-progress"
        style={{ width: hasSearched ? `${Math.min(100, (results.length / articles.length) * 100 + 10)}%` : "0%" }}
      />

      {/* Back link */}
      <Link href="/" className="p48-back">
        ← Back to Lobby
      </Link>

      {/* Hero */}
      <div className="p48-hero">
        <div className="p48-hero-grid" />
        <div className="p48-hero-glow" />
        <div className="p48-label" style={{ position: "relative" }}>Puzzle #48 — Instant Search Engine</div>
        <h1 className="p48-heading" style={{ position: "relative" }}>
          Find Your <span>Perfect Estate</span>
        </h1>
        <p className="p48-subtext" style={{ position: "relative" }}>
          Search across titles, descriptions, locations & content — instantly.
          <span className="p48-shortcut">
            Press <kbd>Ctrl</kbd><kbd>K</kbd> to focus
          </span>
        </p>
      </div>

      {/* Search bar */}
      <div className="p48-search-wrapper" ref={containerRef}>
        <div className="p48-search-box">
          <svg className="p48-search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            ref={inputRef}
            className="p48-input"
            id="p48-search-input"
            type="text"
            placeholder="Search villas, penthouses, locations, styles…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onKeyDown={handleKeyDown}
            autoComplete="off"
            spellCheck={false}
          />
          <div className="p48-input-badge">
            {hasSearched ? (
              <span className="p48-count-badge">
                {results.length} result{results.length !== 1 ? "s" : ""}
              </span>
            ) : (
              <span className="p48-input-kbd">
                <kbd>Ctrl</kbd><kbd>K</kbd>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Status bar */}
      <div className="p48-status">
        {hasSearched ? (
          <>
            <div className="p48-status-dot" />
            <span>
              {results.length > 0
                ? `Searching "${query}" — ${results.length} of ${articles.length} properties matched`
                : `No results for "${query}"`}
            </span>
          </>
        ) : (
          <span>{articles.length} properties indexed • Client-side fuzzy search via Fuse.js</span>
        )}
      </div>

      {/* Results */}
      {hasSearched ? (
        <div className="p48-results">
          {results.length > 0 ? (
            results.map((result, i) => {
              const p = result.item;
              return (
                <div
                  key={p.id}
                  className={`p48-card${selectedIndex === i ? " is-selected" : ""}`}
                  style={{ animationDelay: `${i * 40}ms` }}
                >
                  <div className="p48-card-header">
                    <div className="p48-card-title">
                      {highlight(p.title, query)}
                    </div>
                    <div className="p48-card-meta">
                      <span
                        className="p48-card-type"
                        style={{
                          background: TYPE_COLORS[p.type],
                          color: TYPE_TEXT[p.type],
                          border: `1px solid ${TYPE_TEXT[p.type]}40`,
                        }}
                      >
                        {p.type}
                      </span>
                      <span className="p48-card-score">
                        {relevanceLabel(result.score)}
                      </span>
                    </div>
                  </div>

                  <p className="p48-card-desc">
                    {highlight(p.description, query)}
                  </p>

                  <div className="p48-card-footer">
                    <span className="p48-card-location">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
                      </svg>
                      {highlight(p.location, query)}
                    </span>
                    <span className="p48-card-price">{p.price}</span>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="p48-empty">
              <div className="p48-empty-icon">🔍</div>
              <div className="p48-empty-title">No properties found</div>
              <div className="p48-empty-sub">
                Try different keywords — location, style, or property type
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Initial state — show all properties as chips */
        <div className="p48-featured">
          <div className="p48-featured-label">All Properties — Click to Explore</div>
          <div className="p48-featured-grid">
            {articles.map((a) => (
              <div
                key={a.id}
                className="p48-featured-chip"
                onClick={() => {
                  setQuery(a.title);
                  inputRef.current?.focus();
                }}
              >
                <span className="p48-featured-chip-title">{a.title}</span>
                <span className="p48-featured-chip-loc">{a.location}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
