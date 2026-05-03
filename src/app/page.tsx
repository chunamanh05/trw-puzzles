import Link from "next/link";
import { Puzzle, ArrowRight, Code2 } from "lucide-react";

export default function Home() {
  const puzzles = [
    {
      id: 5,
      title: "Smart Pre-fill Form",
      description: "Form that auto-saves to localStorage and pre-fills fields when the user returns — even after a refresh.",
      tags: ["localStorage", "UX", "Forms"]
    },
    {
      id: 8,
      title: "Visual Product Search",
      description: "App that uses Google Lens (mock) and AI to find and normalize product names from an uploaded image.",
      tags: ["AI", "Drag & Drop", "UX"]
    },
    {
      id: 11,
      title: "Dynamic Referral Headlines",
      description: "Landing page that personalizes its headline based on the ?ref= query parameter, backed by a simulated database.",
      tags: ["Query Params", "Personalization", "UX"]
    },
    {
      id: 99,
      title: "Fitness Lead Scoring",
      description: "5-question quiz that scores answers, classifies leads into Cold / Warm / Hot tiers, and shows a dynamic CTA per result.",
      tags: ["Lead Scoring", "Quiz", "State Machine"]
    },
    {
      id: 95,
      title: "API Key Dashboard",
      description: "Secure masked key display with regeneration logic and premium dark UI.",
      tags: ["Security", "UX", "Animation"]
    },
    {
      id: 101,
      title: "Smart Notification Control",
      description: "Advanced preferences panel with nested state, master mute, and persistent auto-save feedback.",
      tags: ["Nested State", "localStorage", "SaaS UI"]
    },
    {
      id: 102,
      title: "Earth Digital Twin",
      description: "Interactive 3D globe with real-time camera fly-to animations and sci-fi HUD overlay.",
      tags: ["WebGL", "Three.js", "Animation"]
    },
    {
      id: 13,
      title: "Multilingual i18n Routing",
      description: "Dynamic language switcher using scoped App Router parameters and motion transitions.",
      tags: ["i18n", "Routing", "Next.js"]
    },
    {
      id: 14,
      title: "Google Trends Explorer",
      description: "Live search interest visualization with Recharts, Next.js API Routes, and Dark/Light mode toggle.",
      tags: ["Recharts", "API Proxy", "Theme Toggle"]
    },
    {
      id: 18,
      title: "Quantum Tunnel Scroll",
      description: "Procedural 3D tunnel converted into a scroll-controlled image sequence using HTML5 Canvas.",
      tags: ["Canvas", "Scroll", "Procedural"]
    },
    {
      id: 103,
      title: "SaaS Pricing Matcher",
      description: "Intelligent pricing tier recommender with usage-based logic and animated wizard UX.",
      tags: ["Logic", "Wizard", "Framer Motion"]
    },
    {
      id: 22,
      title: "Vapi Voice AI Agent",
      description: "Live voice assistant connection using Vapi web SDK with volume-reactive UI orb.",
      tags: ["Voice AI", "Vapi", "Audio Visualizer"]
    },
    {
      id: 23,
      title: "Location Aware Hero",
      description: "Dynamic landing page that detects user location and adapts theme (Sun/Snow/Night) accordingly.",
      tags: ["Geolocation", "Dynamic UI", "Framer Motion"]
    }
    // Add more puzzles here as they are created
  ];




  const sortedPuzzles = [...puzzles].sort((a, b) => a.id - b.id);

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-accent-primary selection:text-background">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 border-b border-glass-border">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 text-accent-primary mb-6">
            <Puzzle size={24} />
            <span className="text-sm font-mono tracking-widest uppercase">The Puzzle Repository</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 leading-[0.9]">
            Frontend <span className="text-gradient">Mastery</span>
          </h1>
          <p className="text-muted-foreground text-xl max-w-2xl leading-relaxed">
            A monorepo of pixel-perfect UI components and complex logic features. 
            Built for performance, scalability, and absolute portability.
          </p>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedPuzzles.map((p) => (
              <Link 
                key={p.id} 
                href={`/puzzle-${p.id}`}
                className="group relative block p-8 rounded-luxury glass hover:bg-glass-bg transition-all duration-500 luxury-shadow"
              >
                <div className="flex justify-between items-start mb-6">
                  <span className="text-4xl font-mono font-bold text-accent-primary drop-shadow-[0_0_10px_rgba(34,211,238,0.3)]">
                    #{p.id}
                  </span>
                  <div className="p-2 rounded-full border border-glass-border group-hover:border-accent-primary group-hover:text-accent-primary transition-all">
                    <ArrowRight size={20} className="-rotate-45 group-hover:rotate-0 transition-transform duration-500" />
                  </div>
                </div>
                
                <h3 className="text-xl font-bold mb-3 tracking-tight">{p.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  {p.description}
                </p>

                <div className="flex gap-2">
                  {p.tags.map(tag => (
                    <span key={tag} className="text-[10px] uppercase tracking-wider px-2 py-1 rounded bg-muted border border-glass-border">
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-glass-border text-center">
        <div className="flex items-center justify-center gap-6 mb-6">
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
            <Code2 size={20} />
          </a>
        </div>
        <p className="text-muted-foreground text-xs uppercase tracking-widest">
          &copy; {new Date().getFullYear()} &mdash; TRW PUZZLES SYSTEM
        </p>
      </footer>
    </main>
  );
}
