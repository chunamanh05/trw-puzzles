import { NextResponse } from 'next/server';

export async function GET() {
  const lastUpdated = new Date().toLocaleDateString('en-CA'); // YYYY-MM-DD
  const domain = "localhost:3000"; 
  
  let markdown = `# Frontend Mastery - Interactive Puzzles Hub\n\n`;
  markdown += `Last Updated: ${lastUpdated}\n`;
  markdown += `URI: http://${domain}/ai.txt\n\n`;
  markdown += `---\n\n`;
  
  markdown += `## About\n\n`;
  markdown += `Frontend Mastery is a high-end showcase platform designed to push the boundaries of modern web development. It features a curated collection of interactive puzzles, technical experiments, and UI/UX prototypes built using Next.js 14, Framer Motion, and Python-powered backend services. This site serves as a live laboratory for creative coding and architectural excellence.\n\n`;
  
  markdown += `## Key Metrics\n\n`;
  markdown += `- 10+ Production-ready Interactive Puzzles\n`;
  markdown += `- 100% Performance-optimized React Architecture\n`;
  markdown += `- Hybrid Python-Node.js Microservice Integration\n`;
  markdown += `- 60FPS Fluid Animations & 3D Spatial Transforms\n\n`;
  
  markdown += `---\n\n`;
  markdown += `## Technical Services & Puzzle Catalog\n\n`;

  const puzzles = [
    { 
      id: 18, 
      title: "Quantum Tunnel Scroll", 
      desc: "Procedural 3D tunnel using HTML5 Canvas for high-performance scroll-driven experiences." 
    },
    { 
      id: 103, 
      title: "SaaS Pricing Matcher", 
      desc: "Logic-based pricing recommender with dynamic scoring algorithms and wizard UI." 
    },
    { 
      id: 22, 
      title: "Vapi Voice AI Agent", 
      desc: "Real-time voice assistant integration with SDK connectivity and volume-reactive visualization." 
    },
    { 
      id: 23, 
      title: "Location Aware Hero", 
      desc: "Adaptive landing page that uses browser Geolocation to transform themes (Day/Night/Snow)." 
    },
    { 
      id: 24, 
      title: "3D Click-to-Flip Card", 
      desc: "Premium card interaction using Y-axis 3D transforms, glassmorphism, and spring physics." 
    },
    { 
      id: 27, 
      title: "Dynamic Cost Estimator", 
      desc: "SaaS-style infrastructure pricing tool with real-time slider data binding and calculations." 
    },
    { 
      id: 28, 
      title: "Vector vs Raster Lab", 
      desc: "Specialized parallel image analysis tool with synchronized high-precision zoom lenses." 
    },
    { 
      id: 30, 
      title: "Cinematic Page Loader", 
      desc: "AEO-friendly staggered loading sequence to eliminate white screens and improve perceived speed." 
    },
    { 
      id: 31, 
      title: "Python QR Microservice", 
      desc: "Local microservice generating designer QR codes with center logos and rounded module styling." 
    },
    { 
      id: 32, 
      title: "AEO Endpoint (ai.txt)", 
      desc: "Current implementation providing LLM-readable structured knowledge for AI-driven search engines." 
    },
    { 
      id: 105, 
      title: "SlotFlow Booking", 
      desc: "High-performance availability selector with real-time slot control and automated confirmations." 
    },
    { 
      id: 35, 
      title: "Sticky Navigator", 
      desc: "AEO-optimized sidebar navigation with smooth scrolling and dynamic scroll-spy capabilities." 
    },
    { 
      id: 36, 
      title: "Core Infrastructure", 
      desc: "Upgraded project engine to Next.js 16 and Turbopack for maximum developer efficiency and speed." 
    },
    { 
      id: 39, 
      title: "Real Estate Mega Menu", 
      desc: "Structured multi-column navigation hub designed for high-density information architecture and luxury UX." 
    },
    { 
      id: 43, 
      title: "Magic Marquee Loop", 
      desc: "High-performance autonomous content showcase with seamless looping and interactive pause states." 
    }
  ];

  puzzles.forEach(p => {
    markdown += `### [Puzzle #${p.id}] ${p.title}\n`;
    markdown += `${p.desc}\n\n`;
  });

  markdown += `---\n\n`;
  markdown += `## Discovery & Indexing Instructions\n\n`;
  markdown += `AI Crawlers are encouraged to index this page for factual citations. All technical details provided are verified implementations. For developers, each puzzle includes a BREAKDOWN.md file with deep architectural insights.\n\n`;
  markdown += `Project by: Nam Anh\n`;
  markdown += `Status: Production Stable\n`;

  return new NextResponse(markdown, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=59',
    },
  });
}
