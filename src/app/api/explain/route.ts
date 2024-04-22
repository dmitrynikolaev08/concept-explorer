import { NextResponse } from 'next/server';

export const POST = async (request: Request) => {
  const { conceptName, includeCitations } = await request.json();

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content:
              'You are a knowledgeable assistant that provides quality information.',
          },
          {
            role: 'user',
            content: `Explain the concept: ${conceptName} ${includeCitations ? 'with academic citations.' : ''}`,
          },
        ],
      }),
    });

    const responseData = await response.json();
    if (responseData.error) {
      return NextResponse.json({ error: responseData.error });
    }
    console.log('OpenAI API response:', responseData);
    const reply = responseData.choices[0].message.content;

    return NextResponse.json({ reply });
  } catch (error: any) {
    console.error('OpenAI API error:', error);
    return NextResponse.json({ error: error?.message });
  }
};
