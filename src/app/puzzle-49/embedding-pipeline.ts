/**
 * Client-side embedding utility.
 * Gọi tới /api/embed (Next.js API Route) — API key nằm server-side, không lộ ra browser.
 * Dùng OpenAI text-embedding-3-small: 1536 chiều, rất chính xác.
 */

/** Cache tránh gọi API trùng lặp */
const cache = new Map<string, number[]>();

/** Gọi API route nội bộ để lấy embedding */
export async function embedCached(text: string): Promise<number[]> {
  if (cache.has(text)) return cache.get(text)!;

  const res = await fetch("/api/embed", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error || `API error ${res.status}`);
  }

  const { vector } = await res.json();
  cache.set(text, vector);
  return vector;
}

/** Cosine similarity: -1 → 1, càng gần 1 càng tương đồng về nghĩa */
export function cosineSimilarity(a: number[], b: number[]): number {
  let dot = 0, magA = 0, magB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    magA += a[i] * a[i];
    magB += b[i] * b[i];
  }
  if (magA === 0 || magB === 0) return 0;
  return dot / (Math.sqrt(magA) * Math.sqrt(magB));
}
