import { NextRequest, NextResponse } from 'next/server';
import { ConversationModel } from '@/model/conversationModel';
import { connectDB } from '@/lib/db/connectDb';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/options';
import { UserModel } from '@/model/userModel';

export async function PATCH(req: NextRequest) {
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
    const body = await req.json();
    const { title, conversationId } = body;

    if (!conversationId || !title) {
      return NextResponse.json(
        { success: false, message: 'Missing fields' },
        { status: 400 },
      );
    }

    const updated = await ConversationModel.findByIdAndUpdate(
      conversationId,
      {
        title,
        isTitleGenerated: true,
      },
      { returnDocument: 'after' },
    );

    if (!updated) {
      return NextResponse.json(
        { success: false, message: 'Conversation not found' },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      conversation: updated,
    });
  } catch (error) {
    console.error('Update Title Error:', error);

    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 },
    );
  }
}
