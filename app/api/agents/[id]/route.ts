import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/options';
import { UserAgentsModel } from '@/model/userAgentModel';
import { connectDB } from '@/lib/db/connectDb';

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
    const { id } = await params;
    console.log('Got id', id);

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Invalid agent ID' },
        { status: 400 },
      );
    }

    await connectDB();
    const agent = await UserAgentsModel.findById(id);

    if (!agent) {
      return NextResponse.json(
        { success: false, message: 'Agent not found' },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      agent,
    });
  } catch (err: unknown) {
    console.error('Get Agent Error:', err);

    let message = 'Server error';
    if (err instanceof Error) message = err.message;

    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.id;
    const agentId = params.id;

    await connectDB();
    const deletedAgent = await UserAgentsModel.findOneAndDelete({
      _id: agentId,
      createdBy: userId,
    });

    if (!deletedAgent) {
      return NextResponse.json(
        { message: 'Agent not found or not authorized' },
        { status: 404 },
      );
    }

    return NextResponse.json({
      message: 'Agent deleted successfully',
      agentId,
    });
  } catch (error) {
    console.error('Delete agent error:', error);

    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
