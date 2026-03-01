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
