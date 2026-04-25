import { type DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    accessToken: string;
    user: {
      id: string;
      role: 'user' | 'admin';
      token: number;
      totalTokens?: number;
      emailVerified: Date | null;
    } & DefaultSession['user'];
  }

  interface User {
    role: 'user' | 'admin';
    token: number;
    totalTokens?: number;
    emailVerified: Date | null;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role: 'user' | 'admin';
    token: number;
    totalTokens?: number;
    emailVerified: Date | null;
  }
}
