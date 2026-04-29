import { NextRequest, NextResponse } from 'next/server';
import { ConversationModel } from '@/model/conversationModel';
import { connectDB } from '@/lib/db/connectDb';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/options';

export async function PATCH(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized' },
      { status: 401 },
    );
  }

  try {
    const body = await req.json();
    const { conversationId, newModel } = body;

    if (!conversationId || !newModel) {
      return NextResponse.json(
        { success: false, message: 'Missing fields' },
        { status: 400 },
      );
    }

    const ALLOWED_MODELS = [
      'fast',
      'smart',
      'powerful',
      'logic',
      'conversational',
    ];

    const isValidModel = ALLOWED_MODELS.includes(newModel);

    if (!isValidModel) {
      return NextResponse.json(
        { message: 'Invalid model', success: false },
        { status: 400 },
      );
    }

    await connectDB();

    const updated = await ConversationModel.findByIdAndUpdate(
      conversationId,
      {
        currentAgentModel: newModel,
        updatedAt: new Date(),
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
    console.error('Update Model Error:', error);

    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 },
    );
  }
}
