import { Geist, Geist_Mono } from 'next/font/google';
import Providers from './providers';
import Header from '@/components/common/Header';
import { ReactNode, Suspense } from 'react';
import AuthIntentHandler from '@/components/auth/AuthIntentHandler';
import ThemeSync from '@/components/theme/theme-sync';
import ThemeInit from '@/components/theme/theme-init';
import './globals.css';

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
    'Astra Agent is a customizable AI companion platform where users can create and manage their own intelligent agents. Choose advanced AI models powered by Llama, Gemini, GLM, and Gemma, assign tasks, and build agents for translation, grammar correction, language practice, research, and automation. Includes voice-enabled interaction, subscriptions, and fully personalized workflows — all powered by a modern full-stack Next.js architecture.',
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
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} pretty-scrollbar bg-primary-background antialiased`}
      >
        <Providers>
          <ThemeInit />
          <ThemeSync />
          <Suspense fallback={null}>
            <AuthIntentHandler />
          </Suspense>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}

{
  /* <Script id="theme-script" strategy='beforeInteractive'>{
          `
        (function() {
          try {
            const savedTheme = localStorage.getItem('theme') || 'system';

            let isDark = false;

            if (savedTheme === 'dark') {
              isDark = true;
            } else if (savedTheme === 'light') {
              isDark = false;
            } else {
              isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            }

            if (isDark) {
              document.documentElement.classList.add('dark');
            } else {
              document.documentElement.classList.remove('dark');
            }
          } catch (e) {}
        })();
      `
        }</Script> */
}
