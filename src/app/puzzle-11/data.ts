/**
 * PUZZLE #11 — Simulated Database
 *
 * In a real-world app, this data would be fetched from a database (Supabase, etc.).
 * Here, we represent the database as a plain TypeScript object for simplicity.
 * The KEY is the value of the `?ref=` query parameter from the URL.
 */

export interface HeadlineEntry {
  badge: string;        // Shown as a pill badge above the headline
  headline: string;     // Main H1 — changes per referral source
  subheadline: string;  // Supporting text below the headline
  cta: string;          // Call-to-action button label
}

export const HEADLINES_DB: Record<string, HeadlineEntry> = {
  google: {
    badge: "☕ Via Google Search",
    headline: "Find Your Perfect Brew",
    subheadline: "You searched for the best. You found it. Our beans are rated #1 by coffee lovers worldwide.",
    cta: "Explore Our Menu",
  },
  facebook: {
    badge: "👥 Via Facebook",
    headline: "Your Friends Are Already Here",
    subheadline: "Thousands of your neighbours have made this their morning ritual. Come join the community.",
    cta: "See What's Trending",
  },
  instagram: {
    badge: "📸 Via Instagram",
    headline: "Crafted for the Aesthetic",
    subheadline: "Every cup is a frame-worthy moment. Taste the coffee everyone's posting about.",
    cta: "View the Collection",
  },
  twitter: {
    badge: "🐦 Via X (Twitter)",
    headline: "The Buzz Is Real",
    subheadline: "It's all over your timeline for a reason. Come taste the cup that everyone is talking about.",
    cta: "Order Now",
  },
  email: {
    badge: "📧 Welcome Back",
    headline: "We Missed You, Friend",
    subheadline: "A special offer is waiting for you — just because you came back. Your loyalty means everything.",
    cta: "Claim Your Offer",
  },
};

// Fallback entry for when no `ref` parameter is present
export const DEFAULT_HEADLINE: HeadlineEntry = {
  badge: "",
  headline: "Where Every Cup Tells a Story",
  subheadline: "Premium single-origin beans, expertly roasted and delivered to your door.",
  cta: "Start Your Journey",
};
