import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import Github from 'next-auth/providers/github';
import { connectDB } from './lib/db/connectDb';
import { UserModel } from './model/userModel';
import { AccountsModel } from './model/accountsModel';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google, Github],
  session: { maxAge: 60 * 60 * 24 },
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log(user.email, account?.provider, account?.providerAccountId);

      try {
        if (account?.provider === 'google' || account?.provider === 'github') {
          await connectDB();
          let existingUser = await UserModel.findOne({ email: user.email });

          if (!existingUser) {
            existingUser = await UserModel.create({
              name: user.name,
              email: user.email,
              image: user.image,
              emailVerified: profile?.email_verified,
              hasPassword: false,
            });
          }

          const existingAccount = await AccountsModel.findOne({
            provider: account?.provider,
            providerAccountId: account?.providerAccountId,
          });

          if (!existingAccount) {
            await AccountsModel.create({
              userId: existingUser._id,
              provider: account?.provider,
              providerAccountId: account?.providerAccountId,
            });
          }

          if (
            existingUser &&
            !existingUser.emailVerified &&
            profile?.email_verified
          ) {
            existingUser.emailVerified = true;
            await existingUser.save();
          }
        }
        return true;
      } catch (err) {
        console.log('Error occurred', err);
        return false;
      }
    },
  },
  pages: {
    error: '',
  },
});
