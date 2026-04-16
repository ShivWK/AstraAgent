import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages) {
      return NextResponse.json(
        { success: false, message: 'Messages are required' },
        { status: 400 },
      );
    }

    const formattedMessages = messages
      .map((m: Record<string, string>) => `${m.role}: ${m.content}`)
      .join('\n');

    const prompt = `
    You are a title generator.

    Rules:
    - Max 5-6 words
    - No quotes
    - No punctuation at end
    - Clear and specific
    - Based on user intent

    Conversation:
    ${formattedMessages}

    Return only the title.
    `;

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
          model: 'arcee-ai/trinity-large-preview:free',
          messages: [
            {
              role: 'user',
              content: prompt,
            },
          ],
        }),
      },
    );

    console.log('Agent response for title', JSON.stringify(response));

    const data = await response.json();

    if (!response.ok) {
      throw new Error('Error in generating Response');
    }

    const aiText = data?.choices?.[0]?.message?.content || 'New Chat';
    console.log(aiText);

    return NextResponse.json({
      success: true,
      title: aiText,
    });
  } catch (error) {
    console.error('OpenRouter Error:', error);

    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 },
    );
  }
}
