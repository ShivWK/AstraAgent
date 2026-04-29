import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/options';
import { connectDB } from '@/lib/db/connectDb';
import { ConversationModel } from '@/model/conversationModel';
import { MessagesModel } from '@/model/messagesModel';
import { UserModel } from '@/model/userModel';

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const session = await getServerSession(authOptions);
    const user = await UserModel.findById(session?.user.id);

    if (!session || !user) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 },
      );
    }

    const userId = session.user.id;

    await connectDB();

    const conversation = await ConversationModel.findOne({
      _id: id,
      userId,
    });

    if (!conversation) {
      return NextResponse.json(
        { message: 'Conversation not found or not authorized' },
        { status: 404 },
      );
    }

    await MessagesModel.deleteMany({ conversationId: id });

    await ConversationModel.findOneAndDelete({
      _id: id,
      userId,
    });

    return NextResponse.json({
      message: 'Conversation deleted successfully',
      conversationId: id,
    });
  } catch (error) {
    console.error('Delete conversation error:', error);

    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
