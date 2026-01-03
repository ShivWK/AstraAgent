'use server';
import { signIn, signOut } from '@/auth';
import { cookies } from 'next/headers';
import { SessionModel } from '@/model/sessionModel';
import { connectDB } from '@/lib/db/connectDb';

export async function signInWithGoogleAction() {
  await signIn('google');
}

type PropsType = 'credentials' | 'google';

export async function logoutAction() {
  const cookieStore = await cookies();
  console.log('aclled');
  try {
    // if (provider === 'credentials') {
    const sessionIdCookie = cookieStore.get('sessionId');
    const sessionId = sessionIdCookie?.value.split('.')[0];

    console.log('session id', sessionId);

    if (sessionId) {
      await connectDB();
      await SessionModel.findByIdAndDelete(sessionId);
      cookieStore.delete('sessionId');
    }
    // } else {
    await signOut();
    return { success: true };
    // }
  } catch (err) {
    console.log('Error occurred', err);
    throw err;
  }
}
