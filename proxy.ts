import { cookies } from 'next/headers';
import { auth } from './auth';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

async function customMiddleware(req: NextRequest) {
  const cookieStore = await cookies();
  const authJsSession = await auth();
  const customSession = cookieStore.get('sessionId');

  const { pathname } = req.nextUrl;

  const protectedRoutes = ['/ai-assistant'];

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (isProtected) {
    if (!authJsSession?.user && !customSession) {
      const redirectUrl = new URL('/', req.nextUrl.origin);
      redirectUrl.searchParams.set('callbackUrl', pathname);
      redirectUrl.searchParams.set('auth', 'required');
      return NextResponse.redirect(redirectUrl);
    }
  }

  return NextResponse.next();
}

export default auth(async function proxy(request) {
  const middlewareResponse = await customMiddleware(request);

  if (middlewareResponse) {
    return middlewareResponse;
  }

  return NextResponse.next();
});

// Confirm that is the session is updating or not, authjs session
