import { Geist, Geist_Mono } from 'next/font/google';
import ThemeProvider from '@/components/common/theme-provider';
import Providers from './providers';
import Header from '@/components/common/Header';
import './globals.css';
import { ReactNode } from 'react';
import { cookies } from 'next/headers';
import { auth } from '@/auth';
import AuthIntentHandler from '@/components/auth/AuthIntentHandler';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata = {
  title: 'Astra Agent',
  description:
    'Astra Agent is a customizable AI companion platform where users can create and manage their own intelligent agents. Choose AI models like ChatGPT, Gemini, or Claude, assign tasks, and build agents for translation, grammar correction, language practice, research, and automation. Includes voice-enabled interaction, subscriptions, and fully personalized workflows — all powered by a modern full-stack Next.js architecture.',
  icons: {
    icon: [
      { url: 'favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: 'favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: 'favicon/apple-touch-icon.png',
  },
  manifest: 'favicon/site.webmanifest',
};

type PropsType = {
  children: ReactNode;
};

export default async function RootLayout({ children }: PropsType) {
  const cookieStore = await cookies();
  const customSession = cookieStore.get('sessionId');
  const authJSSession = await auth();

  const isLoggedIn = !!customSession || !!authJSSession;

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>
            <AuthIntentHandler />
            <Header isUserLoggedIn={isLoggedIn} />
            <div className="pt-22 max-md:px-2 md:pt-25">{children}</div>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
