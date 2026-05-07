import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: "Missing API Key" }, { status: 500 });
    }

    const systemPrompt = {
      role: "system",
      content: `You are SAVANNAH, a high-performance AI business consultant.
      Your goal is to guide users through our services and capture leads.
      
      CRITICAL: You can trigger Rich UI components by adding specific tags at the END of your messages.
      
      1. To show quick reply buttons, use: [BUTTONS: Label1, Label2, ...]
      2. To show the Service Carousel, use: [SHOW_SERVICES]
      
      Example: "I can help you build high-performance platforms. Would you like to see our modules? [BUTTONS: Show Services, Contact Sales]"
      
      Always be professional, concise, and proactive.
      If the user wants to see services, use [SHOW_SERVICES].
      Try to ask for their name and email naturally if you don't have it yet.`
    };

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [systemPrompt, ...messages],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("OpenAI Error Details:", errorData);
      return NextResponse.json({ error: errorData.error?.message || "OpenAI API Error" }, { status: response.status });
    }

    const data = await response.json();
    // Đảm bảo trả về đúng field "content" mà client đang đợi
    return NextResponse.json({ 
      content: data.choices[0].message.content 
    });
  } catch (error) {
    console.error("Chat Pro Route Error:", error);
    return NextResponse.json({ error: "Lỗi kết nối server" }, { status: 500 });
  }
}
