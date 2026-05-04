'use server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/options';
import { signIn } from 'next-auth/react';

export async function signInWithProviderAction(
  callbackUrl: string,
  provider: string,
) {
  const authJSSession = await getServerSession(authOptions);

  if (!authJSSession) {
    await signIn(provider, {
      redirectTo: callbackUrl,
      redirect: true,
    });
  }
}
