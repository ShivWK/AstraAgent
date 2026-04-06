import { NextRequest, NextResponse } from 'next/server';
import { AgentsModel } from '@/model/agentsModel';
import { connectDB } from '@/lib/db/connectDb';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/options';
import { UserAgentsModel } from '@/model/userAgentModel';

// export async function POST(req: NextRequest) {
//   try {
//     const body = await req.json();

//     const {
//       title,
//       icon,
//       description,
//       model,
//       placeHolder,
//       instruction,
//       userInstruction,
//       fallbackMessage,
//       themeColor,
//       sampleQuestions,
//     } = body;

//     if (!title || !instruction || !model) {
//       return NextResponse.json(
//         { error: 'Missing required fields' },
//         { status: 400 },
//       );
//     }

//     await connectDB();
//     const agent = await AgentsModel.create({
//       title,
//       icon,
//       description,
//       model,
//       placeHolder,
//       instruction,
//       userInstruction,
//       fallbackMessage,
//       themeColor,
//       sampleQuestions,
//     });

//     return NextResponse.json({ success: true, data: agent }, { status: 201 });
//   } catch (error) {
//     console.error('Error creating agent:', error);

//     return NextResponse.json(
//       { error: 'Internal Server Error' },
//       { status: 500 },
//     );
//   }
// }

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 },
      );
    }

    const userId = session.user.id;
    const body = await req.json();

    const {
      name,
      description,
      title,
      icon,
      instruction,
      userInstruction,
      fallbackMessage,
      userPreference,
      placeholder,
      model,
      themeColor,
      isDefault,
      sampleQuestions,
      createdBy,
    } = body;

    if (!name || !instruction || !model) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 },
      );
    }

    await connectDB();
    const agent = await UserAgentsModel.create({
      name,
      description,
      icon,
      title,
      model,
      instruction,
      userInstruction,
      fallbackMessage,
      userPreference,
      placeholder,
      themeColor,
      sampleQuestions,
      isDefault,
      createdBy: createdBy ? userId : null,
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Agent created successfully',
        agent,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error('Create Agent Error:', error);

    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 },
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { title } = body;

    if (!title) {
      return NextResponse.json(
        { error: 'Missing required parameter' },
        { status: 400 },
      );
    }

    await connectDB();
    const agent = await AgentsModel.findOne({
      title: { $regex: new RegExp(`^${title}$`, 'i') },
    });

    if (!agent) {
      return NextResponse.json({ error: 'Agent not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: agent }, { status: 200 });
  } catch (error) {
    console.error('Error fetching agent:', error);

    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
