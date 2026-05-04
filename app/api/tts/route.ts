import { SarvamAIClient } from 'sarvamai';
import { NextResponse, NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/options';
import { UserModel } from '@/model/userModel';
import { connectDB } from '@/lib/db/connectDb';

export const runtime = 'nodejs';

const client = new SarvamAIClient({
  apiSubscriptionKey: process.env.SARVAM_API_KEY!,
});

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized' },
      { status: 401 },
    );
  }

  try {
    await connectDB();
    const user = await UserModel.findById(session?.user.id);

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 },
      );
    }

    const { text, speaker } = await req.json();

    if (!text) {
      return NextResponse.json({ error: 'No text provided' }, { status: 400 });
    }

    const response = await client.textToSpeech.convert({
      text,
      model: 'bulbul:v3',
      speaker,
      target_language_code: 'en-IN',
    });

    let tokenUsed: number = 0;

    if (response?.audios?.[0]) {
      tokenUsed = Math.ceil(text.length / 4);

      await UserModel.findByIdAndUpdate(session.user.id, {
        $inc: { token: -tokenUsed },
      });
    }

    return NextResponse.json({
      audio: response.audios?.[0],
      tokenUsed,
    });
  } catch (error) {
    console.error('TTS Error:', error);

    return NextResponse.json({ error: 'TTS failed' }, { status: 500 });
  }
}
