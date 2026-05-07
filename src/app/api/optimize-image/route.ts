import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const targetFormat = formData.get("format") as "webp" | "avif";
    const quality = parseInt(formData.get("quality") as string) || 80;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    let optimizedBuffer: Buffer;

    const pipeline = sharp(buffer);

    if (targetFormat === "avif") {
      // Nhắm vào codec AV1 với chất lượng và độ nén tối ưu
      optimizedBuffer = await pipeline
        .avif({ quality, lossless: false, effort: 4 })
        .toBuffer();
    } else {
      // Nhắm vào codec libwebp
      optimizedBuffer = await pipeline
        .webp({ quality, lossless: false, effort: 4 })
        .toBuffer();
    }

    return new NextResponse(optimizedBuffer, {
      headers: {
        "Content-Type": `image/${targetFormat}`,
        "Content-Disposition": `attachment; filename="optimized.${targetFormat}"`,
        "X-Original-Size": file.size.toString(),
        "X-Optimized-Size": optimizedBuffer.length.toString(),
      },
    });
  } catch (error) {
    console.error("Optimization error:", error);
    return NextResponse.json({ error: "Failed to optimize image" }, { status: 500 });
  }
}
