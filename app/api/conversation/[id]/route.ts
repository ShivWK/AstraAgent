import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/connectDb';
import { ConversationModel } from '@/model/conversationModel';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/options';
import mongoose from 'mongoose';
import { UserModel } from '@/model/userModel';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
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

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: 'Invalid conversation ID' },
        { status: 400 },
      );
    }

    const conversation = await ConversationModel.findById(id);

    if (!conversation) {
      return NextResponse.json(
        { success: false, message: 'Conversation not found' },
        { status: 404 },
      );
    }

    if (conversation.userId.toString() !== session.user.id) {
      return NextResponse.json(
        { success: false, message: 'Forbidden' },
        { status: 403 },
      );
    }

    return NextResponse.json({
      success: true,
      conversation,
    });
  } catch (err: unknown) {
    console.error('Get Conversation Error:', err);

    let message = 'Server error';

    if (err instanceof Error) {
      message = err.message;
    }

    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
