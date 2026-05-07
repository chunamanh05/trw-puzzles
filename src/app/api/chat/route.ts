import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: "Chưa cấu hình API Key trong .env.local" }, { status: 500 });
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `Bạn là Nexus, một trợ lý AI chuyên nghiệp và thân thiện cho một công ty công nghệ. 
            Mục tiêu chính của bạn là:
            1. Trả lời các câu hỏi của khách hàng một cách ngắn gọn, súc tích (phong cách terminal).
            2. Luôn cố gắng tìm cách hỏi tên của khách hàng nếu họ chưa nói.
            3. Sau khi biết tên, hãy cố gắng hỏi email của khách hàng để gửi thêm tài liệu hoặc liên hệ lại.
            4. Giữ phong cách chuyên nghiệp nhưng cá nhân hóa theo thông tin người dùng cung cấp.
            5. Nếu người dùng hỏi về bất động sản, hãy tư vấn về tự động hóa marketing và tạo lead.
            Lưu ý: Luôn bắt đầu tin nhắn bằng "NEXUS: " và không dùng emoji quá đà.`
          },
          ...messages
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json({ error: errorData.error.message }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json({ message: data.choices[0].message.content });
  } catch (error) {
    return NextResponse.json({ error: "Lỗi kết nối server" }, { status: 500 });
  }
}
