import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { createHmac } from 'crypto';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function signCookie(cookie: string) {
  const key = process.env.COOKIE_SECRETE_KEY!;
  const signature = createHmac('sha256', key).update(cookie).digest('hex');

  return `${cookie}.${signature}`;
}

export function verifyCookie(signedCookie: string) {
  const [cookie, signature] = signedCookie.split('.');

  const newSignature = signCookie(cookie).split('.')[1];
  if (signature === newSignature) {
    return true;
  }

  return false;
}

export const emailVerificationTemplate = ({ link }: { link: string }) => {
  return `<div style="font-family: Arial, sans-serif; background:#f6f9fc; padding:40px 20px;">
  <div style="max-width:500px; margin:auto; background:white; padding:30px; border-radius:10px; text-align:center;">

    <h2 style="color:#1f2937; margin-bottom:10px;">
      Verify your email
    </h2>

    <p style="color:#4b5563; font-size:14px; line-height:1.5;">
      Thanks for signing up for <strong>Astra Agent</strong>.  
      Please verify your email address to activate your account.
    </p>

    <div style="margin:30px 0;">
      <a 
        href=${link}
        style="
          background:#2563eb;
          color:white;
          padding:12px 22px;
          text-decoration:none;
          border-radius:6px;
          font-weight:600;
          display:inline-block;
        "
      >
        Verify Email
      </a>
    </div>

    <p style="font-size:12px;">
      If the button doesn't work, click this link:
      <br/>
      <a href="${link}">${link}</a>
    </p>

    <p style="color:#6b7280; font-size:12px;">
      If you didn’t create an account with Astra Agent, you can safely ignore this email.
    </p>

  </div>

  <p style="font-size:12px; color:#6b7280; text-align:center">
    This password reset link will expire in 24 hours for security reasons.
  </p>

  <p style="text-align:center; font-size:12px; color:#9ca3af; margin-top:20px;">
    © Astra Agent
  </p>
</div>`;
};

export const passwordResetTemplate = ({ link }: { link: string }) => {
  return `<div style="font-family: Arial, sans-serif; background:#f6f9fc; padding:40px 20px;">
  <div style="max-width:500px; margin:auto; background:white; padding:30px; border-radius:10px; text-align:center;">

    <h2 style="color:#1f2937; margin-bottom:10px;">
      Reset your password
    </h2>

    <p style="color:#4b5563; font-size:14px; line-height:1.5;">
      We received a request to reset your password for <strong>Astra Agent</strong>.
      Click the button below to create a new password.
    </p>

    <div style="margin:30px 0;">
      <a 
        href="${link}"
        style="
          background:#2563eb;
          color:white;
          padding:12px 22px;
          text-decoration:none;
          border-radius:6px;
          font-weight:600;
          display:inline-block;
        "
      >
        Reset Password
      </a>
    </div>

    <p style="font-size:12px;">
      If the button doesn't work, click this link:
      <br/>
      <a href="${link}">${link}</a>
    </p>

    <p style="color:#6b7280; font-size:12px;">
      If you didn’t request a password reset, you can safely ignore this email.
      Your password will remain unchanged.
    </p>

  </div>

  <p style="font-size:12px; color:#6b7280; text-align:center">
    This password reset link will expire in 10 minutes for security reasons.
  </p>

  <p style="text-align:center; font-size:12px; color:#9ca3af; margin-top:20px;">
    © Astra Agent
  </p>
</div>`;
};
