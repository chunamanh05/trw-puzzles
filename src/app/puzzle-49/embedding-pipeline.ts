/**
 * Singleton embedding pipeline cho Transformers.js.
 * Chỉ load model 1 lần, sau đó cache lại — tránh tải lại 25MB mỗi lần dùng.
 */

type EmbeddingPipeline = (
  texts: string | string[],
  options?: { pooling: string; normalize: boolean }
) => Promise<{ data: Float32Array }>;

let pipelineInstance: EmbeddingPipeline | null = null;
let loadingPromise: Promise<EmbeddingPipeline> | null = null;

export async function getEmbeddingPipeline(
  onProgress?: (progress: number) => void
): Promise<EmbeddingPipeline> {
  // Đã có instance → trả về ngay
  if (pipelineInstance) return pipelineInstance;

  // Đang tải → đợi promise đang chạy thay vì tạo thêm
  if (loadingPromise) return loadingPromise;

  loadingPromise = (async () => {
    // Dynamic import để tránh SSR lỗi
    const { pipeline, env } = await import("@xenova/transformers");

    // Dùng cache của trình duyệt — không tải lại sau lần đầu
    env.allowLocalModels = false;
    env.useBrowserCache = true;

    const pipe = await pipeline(
      "feature-extraction",
      "Xenova/all-MiniLM-L6-v2", // ~25MB, hỗ trợ đa ngôn ngữ cơ bản
      {
        progress_callback: (info: { status: string; progress?: number }) => {
          if (info.status === "progress" && info.progress !== undefined) {
            onProgress?.(info.progress);
          }
        },
      }
    );

    pipelineInstance = pipe as unknown as EmbeddingPipeline;
    return pipelineInstance;
  })();

  return loadingPromise;
}

/**
 * Embed một chuỗi văn bản → trả về mảng số (vector).
 * Model all-MiniLM-L6-v2 tạo ra vector 384 chiều.
 */
export async function embed(text: string): Promise<number[]> {
  const pipe = await getEmbeddingPipeline();
  const output = await pipe(text, { pooling: "mean", normalize: true });
  return Array.from(output.data);
}

/**
 * Tính cosine similarity giữa 2 vector.
 * Kết quả từ -1 đến 1 — càng gần 1 càng tương đồng về nghĩa.
 */
export function cosineSimilarity(a: number[], b: number[]): number {
  let dot = 0;
  let magA = 0;
  let magB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    magA += a[i] * a[i];
    magB += b[i] * b[i];
  }
  if (magA === 0 || magB === 0) return 0;
  return dot / (Math.sqrt(magA) * Math.sqrt(magB));
}
