import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/connectDb';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/options';
import { UserAgentsModel } from '@/model/userAgentModel';
import { agentCreationSchema } from '@/lib/validations/agents.schema';
import { AgentsTemplateModel } from '@/model/agentsModel';

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized' },
      { status: 401 },
    );
  }

  try {
    await connectDB();
    const userId = session.user.id;

    const agents = await UserAgentsModel.find({
      $or: [{ createdBy: userId }, { createdBy: null }],
    })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      agents: [...agents],
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch agents',
      },
      { status: 500 },
    );
  }
}

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

    const parsed = agentCreationSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 },
      );
    }

    const { domain, name, style, level } = parsed.data;
    let { purpose } = parsed.data;

    console.log('Received data:', { domain, name, style, level, purpose });

    await connectDB();
    const template = await AgentsTemplateModel.findOne({
      id: domain,
    });

    if (!template) {
      return NextResponse.json(
        { success: false, message: 'Invalid domain' },
        { status: 400 },
      );
    }

    purpose += ` I want you to be ${style} and treat me as of ${level} level.`;

    const agent = await UserAgentsModel.create({
      name,
      icon: template.icon,
      key: domain,
      description: template.description,
      subHeading: template.subHeading,
      title: template.title,
      Icon: template.icon,
      instruction: template.instruction,
      userInstruction: template.userInstruction,
      fallbackMessage: template.fallbackMessage,
      userPreference: purpose,
      model: template.model,
      themeColor: template.themeColor,
      sampleQuestions: template.sampleQuestions,
      placeholder: template.placeholder,
      isDefault: false,
      createdBy: userId,
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

// export async function POST(req: NextRequest) {
//   try {
//     const body = await req.json();

//     const {
//       title,
//       icon,
//       subHeading,
//       placeholder,
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
//     const agent = await AgentsTemplateModel.create({
//       title,
//       icon,
//       description,
//       model,
//       placeholder,
//       instruction,
//       userInstruction,
//       fallbackMessage,
//       themeColor,
//       sampleQuestions,
//       subHeading,
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
