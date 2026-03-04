import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import Github from 'next-auth/providers/github';
import Credentials from 'next-auth/providers/credentials';
import { connectDB } from './lib/db/connectDb';
import { UserModel } from './model/userModel';
import { AccountsModel } from './model/accountsModel';
import { loginSchema } from './lib/validations/auth.schema';
import bcrypt from 'bcryptjs';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google,
    Github,
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) {
          throw new Error('Invalid email or password');
        }

        const { email, password } = parsed.data;

        await connectDB();
        const user = await UserModel.findOne({ email });

        if (!user || !user.password) {
          throw new Error('Invalid email or password');
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
          throw new Error('Invalid email or password');
        }

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          image: user.image,
        };
      },
    }),
  ],
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
