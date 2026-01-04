import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import { connectDB } from './lib/db/connectDb';
import { UserModel } from './model/userModel';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  session: { maxAge: 60 * 60 * 24 },
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        await connectDB();
        const existingUser = await UserModel.findOne({ email: user.email });

        // If email already present then stop login
        if (!existingUser) {
          await UserModel.create({
            name: user.name,
            email: user.email,
            image: user.image,
            provider: account?.provider,
            emailVerified: profile?.email_verified,
            hasPassword: false,
          });
        }

        return true;
      } catch (err) {
        console.log('Error occurred', err);
        return false;
      }
    },

    async jwt({ token, account }) {
      if (account) {
        token.provider = account.provider;
      }

      return token;
    },
  },
});
