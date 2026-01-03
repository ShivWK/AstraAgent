import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import { connectDB } from './lib/db/connectDb';
import { UserModel } from './model/userModel';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        await connectDB();
        const existingUser = await UserModel.findOne({ email: user.email });

        if (!existingUser) {
          await UserModel.create({
            name: user.name,
            email: user.email,
            image: user.image,
            provider: account?.provider,
            emailVerified: profile?.email_verified,
          });
        }

        return true;
      } catch (err) {
        console.log('Error occurred', err);
        return false;
      }
    },
  },
});
