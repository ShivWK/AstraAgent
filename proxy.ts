import { NextResponse } from 'next/server';
import { withAuth } from 'next-auth/middleware';

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;

    const protectedRoutes = ['/ai-assistant', '/account', '/ai-workspace'];

    const isProtected = protectedRoutes.some((route) =>
      pathname.startsWith(route),
    );

    const fullPath = pathname + req.nextUrl.search;

    if (isProtected && !req.nextauth.token) {
      const redirectUrl = new URL('/', req.nextUrl.origin);
      redirectUrl.searchParams.set('callbackUrl', fullPath);
      redirectUrl.searchParams.set('auth', 'required');

      return NextResponse.redirect(redirectUrl);
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: () => true, // handling logic manually
    },
  },
);
