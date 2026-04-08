import { NextRequest, NextResponse } from 'next/server';
import { MODEL_MAP } from '@/lib/constant';

export async function POST(req: NextRequest) {
  try {
    const { message, model = 'smart' } = await req.json();

    if (!message) {
      return NextResponse.json(
        { success: false, message: 'Message is required' },
        { status: 400 },
      );
    }

    const selectedModel = MODEL_MAP[model];
    console.log('Selected Model:', selectedModel);

    if (!selectedModel) {
      return NextResponse.json(
        { success: false, message: 'Invalid model' },
        { status: 400 },
      );
    }

    const response = await fetch(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.OPEN_ROUTER_API_KEY}`,
          'HTTP-Referer': 'https://astraagent.shivendra.site/',
          'X-OpenRouter-Title': 'Astra Agent',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: selectedModel,
          messages: [
            // {
            //   role: 'system',
            //   content: 'You are a helpful AI assistant.',
            // },
            {
              role: 'user',
              content: message,
            },
          ],
        }),
      },
    );

    const data = await response.json();
    console.log('OpenRouter Response:', data);
    const aiText =
      data?.choices?.[0]?.message?.content || 'No response from AI';

    return NextResponse.json({
      success: true,
      reply: aiText,
    });
  } catch (error) {
    console.error('OpenRouter Error:', error);

    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 },
    );
  }
}
