import { NextAuthOptions } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import { connectDB } from '@/lib/db/connectDb';
import GoogleProvider from 'next-auth/providers/google';
import { UserModel } from '@/model/userModel';
import { loginSchema } from '@/lib/validations/auth.schema';
import bcrypt from 'bcryptjs';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import clientPromise from '@/lib/mongodb';

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
    async jwt({ token, user }) {
      if (token) {
        await connectDB();
        const dbUSer = await UserModel.findOne({ email: token.email });

        token.id = dbUSer._id.toString();
        token.emailVerified = dbUSer.emailVerified;
      }
      console.log('JWT', token, 'User', user);
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.emailVerified = token.emailVerified as Date | null;
      }

      console.log('Session', session);
      return session;
    },
  },

  debug: process.env.NODE_ENV === 'development',
  secret: process.env.NEXTAUTH_SECRET,
};
