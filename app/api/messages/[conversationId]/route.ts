import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/connectDb';
import { MessagesModel } from '@/model/messagesModel';
import mongoose from 'mongoose';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/options';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ conversationId: string }> },
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized' },
      { status: 401 },
    );
  }

  try {
    const { conversationId } = await params;

    if (!mongoose.Types.ObjectId.isValid(conversationId)) {
      return NextResponse.json(
        { message: 'Invalid conversationId' },
        { status: 400 },
      );
    }

    await connectDB();
    const messages = await MessagesModel.find({ conversationId })
      .sort({ createdAt: 1 })
      .lean();

    return NextResponse.json({ success: true, messages }, { status: 200 });
  } catch (error) {
    console.error('Fetch messages error:', error);

    return NextResponse.json(
      { success: false, message: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
