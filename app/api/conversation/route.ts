import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/options';
import { connectDB } from '@/lib/db/connectDb';
import { ConversationModel } from '@/model/conversationModel';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 },
      );
    }

    const userId = session.user.id;

    const { searchParams } = new URL(req.url);
    const mode = searchParams.get('mode');

    if (!mode) {
      return NextResponse.json(
        { message: 'Mode is required' },
        { status: 400 },
      );
    }

    await connectDB();
    const conversations = await ConversationModel.find({
      userId,
      mode,
    })
      .sort({ updatedAt: -1 })
      .lean();

    return NextResponse.json({
      conversations,
    });
  } catch (error: unknown) {
    console.error('Error fetching conversations:', error);

    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
