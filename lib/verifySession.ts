import { cookies } from 'next/headers';
import { verifyCookie } from './utils';
import { SessionModel } from '@/model/sessionModel';

export const verifySession = async () => {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('sessionId');

  if (!sessionCookie) return false;

  const isSignatureValid = verifyCookie(sessionCookie.value);
  if (!isSignatureValid) return false;

  const [session_id] = sessionCookie.value.split('.');

  try {
    const session = await SessionModel.findById(session_id);
    if (!session) return false;

    if (session.createdAt > Date.now()) {
      return true;
    } else {
      await SessionModel.findByIdAndDelete(session_id);
      return false;
    }
  } catch {
    return false;
  }
};
