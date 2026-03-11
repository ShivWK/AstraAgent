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
import { UserModel } from '@/model/userModel';
import { RateLimit } from '@/lib/rate_limit';

export const POST = auth(async function POST(req) {
  try {
    const ip = req.headers.get('x-forwarded-for') ?? '127.0.0.1';
    const { success, reset } = await RateLimit.emailSend.limit(ip);

    if (!success) {
      const retryAfter = Math.ceil((reset - Date.now()) / 1000);
      return NextResponse.json(
        {
          message: 'Too many requests',
          retryAfter,
        },
        {
          status: 429,
        },
      );
    }

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

    if (purpose === 'email_verification' && !req.auth) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    if (purpose === 'reset_password') {
      const user = await UserModel.findOne({ email });
      if (!user) {
        return NextResponse.json(
          { message: 'If the email exists, a reset link has been sent' },
          { status: 200 },
        );
      }
    }

    const token = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    await VerificationModel.findOneAndDelete({
      email,
      type: purpose,
    });

    const expiry =
      purpose === 'email_verification' ? 60 * 60 * 24 * 1000 : 60 * 10 * 1000;

    await VerificationModel.create({
      userId: req?.auth?.user?.id ?? null,
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
      { message: 'If the email exists, a reset link has been sent' },
      { status: 200 },
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 },
    );
  }
});
