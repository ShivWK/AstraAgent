'use server';
import { signIn, signOut, auth } from '@/auth';

export async function signInWithProviderAction(
  callbackUrl: string,
  provider: string,
) {
  const authJSSession = await auth();

  if (!authJSSession) {
    await signIn(provider, {
      redirectTo: callbackUrl,
      redirect: true,
    });
  }
}

export async function logoutAction() {
  const authJsSession = await auth();

  try {
    if (authJsSession) {
      await signOut({ redirect: false });
    }
    return { success: true };
  } catch (err) {
    console.log('Error occurred', err);
    throw err;
  }
}
