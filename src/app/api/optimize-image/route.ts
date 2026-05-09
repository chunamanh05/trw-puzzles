import { NextRequest, NextResponse } from "next/server";
// @ts-ignore
import sharp from "sharp";
import { Buffer } from "node:buffer";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");
    const formatEntry = formData.get("format");
    const qualityEntry = formData.get("quality");

    if (!file || !(file instanceof Blob)) {
      return NextResponse.json({ error: "No valid file uploaded" }, { status: 400 });
    }

    const targetFormat = (formatEntry === "avif" || formatEntry === "webp") ? formatEntry : "webp";
    const qualityStr = typeof qualityEntry === "string" ? qualityEntry : "80";
    const quality = parseInt(qualityStr) || 80;

    const arrayBuffer = await file.arrayBuffer();
    const inputBuffer = Buffer.from(arrayBuffer);
    
    const pipeline = (sharp as any)(inputBuffer);
    let optimizedBuffer: Buffer;

    if (targetFormat === "avif") {
      optimizedBuffer = await pipeline
        .avif({ quality, lossless: false, effort: 4 })
        .toBuffer();
    } else {
      optimizedBuffer = await pipeline
        .webp({ quality, lossless: false, effort: 4 })
        .toBuffer();
    }

    // CHỐT HẠ: Chuyển Buffer thành Uint8Array để Typescript không báo lỗi BodyInit
    const responseBody = new Uint8Array(optimizedBuffer);

    return new Response(responseBody, {
      status: 200,
      headers: {
        "Content-Type": `image/${targetFormat}`,
        "Content-Disposition": `attachment; filename="optimized.${targetFormat}"`,
        "X-Original-Size": String(file.size),
        "X-Optimized-Size": String(responseBody.length),
      },
    });
  } catch (error: any) {
    console.error("Optimization error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to optimize image" }, 
      { status: 500 }
    );
  }
}
