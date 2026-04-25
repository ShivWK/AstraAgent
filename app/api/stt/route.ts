import { SarvamAIClient } from 'sarvamai';
import { NextResponse, NextRequest } from 'next/server';
import { Readable } from 'stream';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/options';
import { UserModel } from '@/model/userModel';

export const runtime = 'nodejs';

const client = new SarvamAIClient({
  apiSubscriptionKey: process.env.SARVAM_API_KEY!,
});

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user.id) {
    return NextResponse.json(
      {
        message: 'Unauthorized',
        success: false,
      },
      { status: 401 },
    );
  }

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const stream = Readable.from(buffer);

    const response = await client.speechToText.transcribe({
      file: stream,
      model: 'saaras:v3',
      mode: 'transcribe',
    });

    const transcript = response?.transcript || '';

    if (transcript.length > 0) {
      const tokenUsed = Math.ceil(response.transcript.length / 4);

      await UserModel.findByIdAndUpdate(session.user.id, {
        $inc: { token: -tokenUsed },
      });
    }

    return NextResponse.json({
      text: transcript,
    });
  } catch (error) {
    console.error('STT Error:', error);

    return NextResponse.json({ error: 'STT failed' }, { status: 500 });
  }
}
