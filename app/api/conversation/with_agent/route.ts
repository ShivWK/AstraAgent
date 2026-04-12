import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/options';
import { connectDB } from '@/lib/db/connectDb';
import { ConversationModel } from '@/model/conversationModel';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.id;

    const { searchParams } = new URL(req.url);
    const mode = searchParams.get('mode');
    const agentId = searchParams.get('agentId');

    if (!mode || !agentId) {
      return NextResponse.json(
        { message: 'mode and agentId required' },
        { status: 400 },
      );
    }

    await connectDB();
    const conversation = await ConversationModel.find({
      userId,
      mode,
      agentId,
    })
      .sort({ updatedAt: -1, createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      conversation,
    });
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
    }

    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
