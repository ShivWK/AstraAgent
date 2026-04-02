'use server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/options';
import { signIn, signOut } from 'next-auth/react';

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

// export async function logoutAction() {
//   const authJsSession = await getServerSession(authOptions);

//   try {
//     if (authJsSession) {
//       await signOut({ redirect: false });
//     }
//     return { success: true };
//   } catch (err) {
//     console.log('Error occurred', err);
//     throw err;
//   }
// }
