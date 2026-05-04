import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/options';
import { UserModel } from '@/model/userModel';

export const GET = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user.id) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized' },
      { status: 401 },
    );
  }

  try {
    const foundUser = await UserModel.findById(session.user.id);

    if (!foundUser) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 },
      );
    }

    const user = {
      name: foundUser.name,
      email: foundUser.email,
      role: foundUser.role,
      tokens: foundUser.token,
      totalTokens: foundUser.totalTokens,
      image: foundUser.image,
      emailVerified: foundUser.emailVerified,
    };

    return NextResponse.json({ success: true, user }, { status: 200 });
  } catch (err) {
    console.log(err);

    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 },
    );
  }
};
