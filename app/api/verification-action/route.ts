import { UserModel } from '@/model/userModel';
import { VerificationModel } from '@/model/verificationTokenModel';
import * as z from 'zod';
import { verifyActionSchema } from '@/lib/validations/auth.schema';
import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { connectDB } from '@/lib/db/connectDb';
import bcrypt from 'bcryptjs';

export const Post = async (req: Request) => {
  try {
    const body = await req.json();
    const parsed = verifyActionSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: 'Validation Failed',
          message: z.flattenError(parsed.error),
        },
        {
          status: 400,
        },
      );
    }

    const { token, purpose } = parsed.data;
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    await connectDB();
    const verificationDoc = await VerificationModel.findOne({
      type: purpose,
      token: hashedToken,
    });

    if (!verificationDoc) {
      return NextResponse.json(
        { message: 'Invalid or expired token' },
        { status: 400 },
      );
    }

    if (verificationDoc.expiresAt < new Date()) {
      return NextResponse.json({ message: 'Token expired' }, { status: 400 });
    }

    if (parsed.data.purpose === 'email_verification') {
      await UserModel.findByIdAndUpdate(verificationDoc.userId, {
        emailVerified: new Date(),
      });
    }

    if (parsed.data.purpose === 'reset_password') {
      const { password } = parsed.data;
      const hashedPassword = await bcrypt.hash(password, 12);

      await UserModel.findByIdAndUpdate(verificationDoc.userId, {
        password: hashedPassword,
      });
    }

    await VerificationModel.deleteOne({
      _id: verificationDoc._id,
    });

    return NextResponse.json(
      {
        message: 'Action completed successfully',
      },
      {
        status: 200,
      },
    );
  } catch (err) {
    console.log(err);

    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 },
    );
  }
};
