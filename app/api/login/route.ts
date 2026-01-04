import { loginSchema } from '@/lib/validations/auth.schema';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { connectDB } from '@/lib/db/connectDb';
import { UserModel } from '@/model/userModel';
import { SessionModel } from '@/model/sessionModel';
import * as z from 'zod';
import { signCookie } from '@/lib/utils';
import { auth } from '@/auth';

export async function POST(request: Request) {
  const cookiesStore = await cookies();
  const authJSSession = await auth();
  const sessionId = cookiesStore.get('sessionId')?.value;

  if (sessionId || authJSSession) {
    return Response.json({ error: 'Already logged in' }, { status: 409 });
  }

  try {
    const body = await request.json();
    if (!body || Object.keys(body).length === 0) {
      return Response.json({ error: 'Data not provided' }, { status: 400 });
    }

    const parsed = loginSchema.safeParse(body);
    if (!parsed.success) {
      return Response.json(
        {
          error: 'Validation failed',
          message: z.flattenError(parsed.error),
        },
        { status: 400 },
      );
    }

    const { email, password } = parsed.data;
    await connectDB();

    const user = await UserModel.findOne({ email });

    if (!user) {
      return Response.json(
        { error: 'Invalid email or password' },
        { status: 401 },
      );
    }

    if (!user.hasPassword && user.provider === 'google') {
      return Response.json(
        { error: 'Use Google sign-in for this email.' },
        { status: 409 },
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return Response.json(
        { error: 'Invalid email or password' },
        { status: 401 },
      );
    }

    const session = await SessionModel.create({
      userId: user._id,
      provider: 'credentials',
    });

    cookiesStore.set('sessionId', signCookie(session._id.toString()), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24,
      sameSite: 'lax',
    });

    return Response.json({ message: 'Login successful' }, { status: 200 });
  } catch (err: unknown) {
    return Response.json(
      { error: 'Something went wrong' },
      {
        status: 500,
      },
    );
  }
}
