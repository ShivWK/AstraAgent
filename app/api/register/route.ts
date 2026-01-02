import * as z from 'zod';
import { connectDB } from '@/lib/db/connectDb';
import { UserModel } from '@/model/userModel';
import { SessionModel } from '@/model/sessionModel';
import { signUpSchema } from '@/lib/validations/auth.schema';
import { MongoServerError } from 'mongodb';
import { cookies } from 'next/headers';
import { signCookie } from '@/lib/utils';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    console.log(body);

    if (!body || Object.keys(body).length === 0) {
      return Response.json({ error: 'No data provided' }, { status: 400 });
    }

    const parsed = signUpSchema.safeParse(body);

    if (!parsed.success) {
      return Response.json(
        {
          error: 'Validation failed',
          message: z.flattenError(parsed.error),
        },
        { status: 400 },
      );
    }

    const { name, email, password } = parsed.data;
    const hashedPassword = await bcrypt.hash(password, 12);

    await connectDB();
    const user = await UserModel.create({
      name,
      email,
      password: hashedPassword,
      provider: 'credentials',
    });

    const session = await SessionModel.create({
      userId: user._id,
      provider: 'credentials',
    });

    const cookiesStore = await cookies();
    cookiesStore.set('sessionId', signCookie(session._id.toString()), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24,
      path: '/',
      sameSite: 'lax',
    });

    return Response.json(
      { message: 'User successfully created' },
      { status: 201 },
    );
  } catch (err: unknown) {
    console.log(err);
    if (err instanceof MongoServerError && err.code === 11000) {
      return Response.json({ error: 'User already exist' }, { status: 409 });
    } else {
      return Response.json({ error: 'Something went wrong' }, { status: 500 });
    }
  }
}
