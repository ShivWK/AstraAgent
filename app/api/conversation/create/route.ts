import { NextResponse } from 'next/server';
import { ConversationModel } from '@/model/conversationModel';
import { connectDB } from '@/lib/db/connectDb';
import { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/options';
import { UserAgentsModel } from '@/model/userAgentModel';

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      {
        message: 'Unauthorized',
        success: false,
      },
      { status: 401 },
    );
  }

  try {
    const body = await req.json();
    const {
      agentId,
      defaultAgentModel,
      mode,
      customInstruction,
      agentTitle,
      agentName,
    } = body;

    if (!agentId || !defaultAgentModel || !mode || !agentTitle || !agentName) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 },
      );
    }

    await connectDB();

    const isValidAgent = await UserAgentsModel.findById(agentId);

    if (!isValidAgent) {
      return NextResponse.json(
        { message: 'Invalid agent', success: false },
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

    const isValidModel = ALLOWED_MODELS.includes(defaultAgentModel);

    if (!isValidModel) {
      return NextResponse.json(
        { message: 'Invalid model', success: false },
        { status: 400 },
      );
    }

    const oldConversations = await ConversationModel.find({
      userId: session.user.id,
      agentId,
    })
      .sort({ updatedAt: -1 })
      .lean();

    const mostRecent = oldConversations[0];
    const THRESHOLD = 30 * 60 * 1000;

    const isRecent =
      mostRecent &&
      Date.now() - new Date(mostRecent.updatedAt).getTime() < THRESHOLD;

    if (isRecent) {
      await ConversationModel.findByIdAndUpdate(mostRecent._id, {
        updatedAt: Date.now(),
      });

      return NextResponse.json({
        success: true,
        conversation: mostRecent,
      });
    }

    const conversation = await ConversationModel.create({
      userId: session.user.id,
      agentId,
      agentTitle,
      agentName,
      defaultAgentModel,
      currentAgentModel: defaultAgentModel,
      mode,
      customInstruction: customInstruction || '',
      title: 'New Chat',
      updatedAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      conversation,
    });
  } catch (error) {
    console.error('Create Conversation Error:', error);

    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 },
    );
  }
}
