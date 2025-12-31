import { loginSchema } from '@/lib/validations/auth.schema';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { connectDB } from '@/lib/db/connectDb';
import { UserModel } from '@/model/userModel';
import { SessionModel } from '@/model/sessionModel';
import * as z from 'zod';
import { signCookie } from '@/lib/utils';

export const POST = async (request: Request) => {
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
        {
          status: 400,
        },
      );
    }

    const { email, password } = parsed.data;
    await connectDB();

    const user = await UserModel.findOne({ email });

    if (!user) {
      return Response.json(
        { error: 'Invalid email or password' },
        {
          status: 401,
        },
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return new Response(
        JSON.stringify({ error: 'Invalid email or password' }),
        {
          status: 401,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
    }

    const session = await SessionModel.create({
      userId: user._id,
    });

    const cookiesStore = await cookies();
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
};
