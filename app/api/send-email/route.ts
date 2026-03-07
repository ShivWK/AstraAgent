import { NextResponse } from 'next/server';
import auth from '@/auth';
import * as z from 'zod';
import { emailSchema } from '@/lib/validations/auth.schema';
import sendEmail from '@/utils/sendEmail';
import { emailVerificationTemplate } from '@/lib/utils';
import { passwordResetTemplate } from '@/lib/utils';

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

    const { link, purpose, email } = parsed.data;

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
