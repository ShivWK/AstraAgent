import * as z from 'zod';
import { signUpSchema } from '@/lib/validations/auth.schema';
import client from '@/lib/mongodb';
import bcrypt from 'bcryptjs';
import { auth } from '@/auth';

export async function POST(request: Request) {
  const session = await auth();

  if (session) {
    return Response.json({ error: 'Already logged in' }, { status: 409 });
  }

  try {
    const body = await request.json();

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

    const db = client.db();
    const existingUser = await db.collection('users').findOne({ email });

    if (existingUser) {
      return Response.json({ error: 'Validation failed' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = {
      name,
      email,
      password: hashedPassword,
      emailVerified: null,
      image: null,
    };

    const result = await db.collection('users').insertOne(user);

    return Response.json(
      {
        message: 'User successfully created',
        data: {
          id: result.insertedId.toString(),
          name: user.name,
          email: user.email,
          emailVerified: user.emailVerified,
          image: user.image,
        },
      },
      { status: 201 },
    );
  } catch (err: unknown) {
    console.log(err);
    return Response.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
