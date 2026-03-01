'use server';
import { signIn, signOut, auth } from '@/auth';
import { cookies } from 'next/headers';
import { SessionModel } from '@/model/sessionModel';
import { connectDB } from '@/lib/db/connectDb';

export async function signInWithProviderAction(
  callbackUrl: string,
  provider: string,
) {
  const cookieStore = await cookies();
  const customSessionId = cookieStore.get('sessionId')?.value;
  const authJSSession = await auth();

  if (!authJSSession || !customSessionId) {
    await signIn(provider, {
      redirectTo: callbackUrl,
      redirect: true,
    });
  }
}

export async function logoutAction() {
  const cookieStore = await cookies();
  const authJsSession = await auth();

  try {
    const sessionIdCookie = cookieStore.get('sessionId');
    const sessionId = sessionIdCookie?.value.split('.')[0];

    if (sessionId) {
      await connectDB();
      await SessionModel.findByIdAndDelete(sessionId);
      cookieStore.delete('sessionId');
    }

    if (authJsSession) {
      await signOut({ redirect: false });
    }
    return { success: true };
  } catch (err) {
    console.log('Error occurred', err);
    throw err;
  }
}
