import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/options';
import { connectDB } from '@/lib/db/connectDb';
import { ConversationModel } from '@/model/conversationModel';
import mongoose from 'mongoose';

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const session = await getServerSession(authOptions);

    console.log('Got id', id);

    if (!session?.user?.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.id;

    await connectDB();
    const deletedConversation = await ConversationModel.findOneAndDelete({
      _id: id,
      userId,
    });

    if (!deletedConversation) {
      return NextResponse.json(
        { message: 'Conversation not found or not authorized' },
        { status: 404 },
      );
    }

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
