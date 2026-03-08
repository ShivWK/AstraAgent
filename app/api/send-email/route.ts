import { NextResponse } from 'next/server';
import auth from '@/auth';
import * as z from 'zod';
import { emailSchema } from '@/lib/validations/auth.schema';
import sendEmail from '@/utils/sendEmail';
import { emailVerificationTemplate } from '@/lib/utils';
import { passwordResetTemplate } from '@/lib/utils';
import crypto from 'crypto';
import { VerificationModel } from '@/model/verificationTokenModel';
import { connectDB } from '@/lib/db/connectDb';

export const POST = auth(async function POST(req) {
  if (!req.auth) {
    return NextResponse.json(
      {
        message: 'Unauthorized',
      },
      { status: 401 },
    );
  }

  try {
    const body = await req.json();
    const parsed = emailSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          message: z.flattenError(parsed.error),
        },
        {
          status: 400,
        },
      );
    }

    const { purpose, email } = parsed.data;

    const token = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    await connectDB();
    await VerificationModel.findOneAndDelete({
      email,
      type: purpose,
    });

    const expiry =
      purpose === 'email_verification' ? 60 * 60 * 24 * 1000 : 60 * 10 * 1000;

    await VerificationModel.create({
      userId: req.auth.user.id,
      email,
      token: hashedToken,
      type: purpose,
      expiresAt: new Date(Date.now() + expiry),
    });

    const EMAIL_LINK = `${process.env.PUBLIC_SITE_URL}/email-verification?purpose=email_verification&token=${token}`;
    const PASSWORD_LINK = `${process.env.PUBLIC_SITE_URL}/reset-password?purpose=reset_password&token=${token}`;

    const link = purpose === 'email_verification' ? EMAIL_LINK : PASSWORD_LINK;

    await sendEmail({
      to: email,
      subject:
        purpose === 'email_verification' ? 'Verify Email' : 'Reset Password',
      template:
        purpose === 'email_verification'
          ? emailVerificationTemplate({ link })
          : passwordResetTemplate({ link }),
    });

    return NextResponse.json(
      {
        message: 'Email send successfully',
      },
      { status: 200 },
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: 'Something went wrong' },
      {
        status: 500,
      },
    );
  }
});
