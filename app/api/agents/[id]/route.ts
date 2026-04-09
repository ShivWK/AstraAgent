import { NextResponse } from 'next/server';
import { UserAgentsModel } from '@/model/userAgentModel';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/options';

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
    console.log('Got Id', id);

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Invalid agent ID' },
        { status: 400 },
      );
    }

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
