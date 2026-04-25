import { NextAuthOptions } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import { connectDB } from '@/lib/db/connectDb';
import GoogleProvider from 'next-auth/providers/google';
import { UserModel } from '@/model/userModel';
import { loginSchema } from '@/lib/validations/auth.schema';
import bcrypt from 'bcryptjs';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import clientPromise from '@/lib/mongodb';
import jwt from 'jsonwebtoken';

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),

    GitHubProvider({
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
    }),

    CredentialsProvider({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          const parsed = loginSchema.safeParse(credentials);
          if (!parsed.success) {
            console.log('Validation failed:', parsed.error);
            return null;
          }

          const { email, password } = parsed.data;

          await connectDB();
          const user = await UserModel.findOne({ email });

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
            role: user.role ?? 'user',
            token: user.token ?? 10000,
            totalTokens: user.totalTokens ?? undefined,
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
    strategy: 'jwt',
    maxAge: 60 * 60 * 24,
    updateAge: 24 * 60 * 60,
  },

  callbacks: {
    async jwt({ token, user, trigger }) {
      if (user) {
        await connectDB();
        const dbUser = await UserModel.findOne({ email: user.email });
        // console.log('DB user found in JWT callback:', dbUser);

        if (dbUser) {
          token.image = dbUser.image;
          token.id = dbUser._id.toString();
          token.role = dbUser.role;
          token.emailVerified = dbUser.emailVerified;
          token.token = dbUser.token;
          token.totalTokens = dbUser.totalTokens;
        }
      }

      if (trigger === 'update') {
        await connectDB();
        const dbUser = await UserModel.findById(token.id);

        // console.log('user data:', dbUser);

        if (dbUser) {
          token.image = dbUser.image;
          token.token = dbUser.token;
          token.totalTokens = dbUser.totalTokens;
          token.emailVerified = dbUser.emailVerified;
        }
      }

      token.accessToken = jwt.sign(
        {
          id: token.id,
          role: token.role,
        },
        process.env.NEXTAUTH_SECRET!,
        { expiresIn: '1d' },
      );

      // console.log('JWT callback', { token, user, trigger });
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.image = token.image as string;
        session.user.id = token.id as string;
        session.user.role = token.role as 'user' | 'admin';
        session.user.token = token.token as number;
        session.user.emailVerified = token.emailVerified as Date | null;
        session.accessToken = token.accessToken as string;
        session.user.totalTokens = token.totalTokens as number;
      }

      // console.log('Session callback', { session, token });
      return session;
    },
  },

  debug: process.env.NODE_ENV === 'development',
  secret: process.env.NEXTAUTH_SECRET,
};
