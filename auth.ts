import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import Github from 'next-auth/providers/github';
import Credentials from 'next-auth/providers/credentials';
import { loginSchema } from './lib/validations/auth.schema';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import client from './lib/mongodb';
import bcrypt from 'bcryptjs';

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: MongoDBAdapter(client),
  providers: [
    Google,
    Github,
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        try {
          const parsed = loginSchema.safeParse(credentials);
          if (!parsed.success) {
            console.log('Validation failed:', parsed.error);
            return null;
          }

          const { email, password } = parsed.data;

          const db = client.db();
          const user = await db.collection('users').findOne({ email });

          if (!user) {
            console.log('User not found:', email);
            return null;
          }

          if (!user.password) {
            console.log('User has no password (maybe OAuth user?):', email);
            return null;
          }

          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) {
            console.log('Password mismatch for:', email);
            return null;
          }

          const userToReturn = {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            image: user.image ?? null,
            emailVerified: user.emailVerified ?? null,
          };

          console.log('Authorization successful for:', email, userToReturn);
          return userToReturn;
        } catch (err) {
          console.error('Authorization error:', err);
          return null;
        }
      },
    }),
  ],

  session: {
    maxAge: 60 * 60 * 24,
  },

  callbacks: {
    async session({ session, user }) {
      session.user.id = user.id;
      session.user.emailVerified = user.emailVerified;
      return session;
    },
  },
});

export default auth;
