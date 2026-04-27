'use client';

import styles from './page.module.css';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Bot, ChevronRight, MessagesSquare } from 'lucide-react';
import Image from 'next/image';
import useAppDispatch from '@/hooks/useAppDispatch';
import useAppSelector from '@/hooks/useAppSelector';
import {
  selectGetStartedLoading,
  setGetStartedLoading,
} from '@/features/auth/authSlice';
import { Spinner } from '@/components/ui/spinner';
import { useSession } from 'next-auth/react';
import Footer from '@/components/footer/Footer';

export default function Home() {
  const { status } = useSession();
  const router = useRouter();
  const loading = useAppSelector(selectGetStartedLoading);
  const dispatch = useAppDispatch();

  const getStartedClickHandler = () => {
    router.push('/ai-assistant');

    if (status !== 'authenticated') {
      dispatch(setGetStartedLoading(true));
    }
  };

  return (
    <>
      <main className="flex w-full justify-center pt-34 pb-5 md:pt-20">
        <section className="flex flex-col items-center gap-4">
          <Image
            src="/logo-transparent.png"
            alt="Astra agent site logo, an start in blue shade"
            width={300}
            height={300}
            quality={100}
            className="h-50 w-52 md:h-60 md:w-62"
          ></Image>

          <div className="mb-2 flex w-full max-w-2xl flex-col items-center gap-2">
            <span className="font-primary text-center text-4xl font-extrabold">
              Your AI task Force
            </span>
            <span className="text-center text-xl">Unlock powerful agents</span>
          </div>

          <Button
            onClick={getStartedClickHandler}
            className={`${styles['btn--start']} rounded-full py-5.5 text-lg font-medium transition-all duration-75 active:scale-95 md:py-5 dark:bg-blue-600 dark:text-white`}
            disabled={loading}
          >
            Get Started
            {loading ? (
              <Spinner className="size-5" data-icon="inline-end" />
            ) : (
              <ChevronRight className="animate-ping" />
            )}
          </Button>

          <div className="mt-2 flex w-full flex-col gap-4 md:max-w-2xl md:flex-row md:gap-6">
            <button className="relative overflow-hidden rounded-3xl border border-blue-500/20 bg-linear-to-br from-blue-950 via-slate-950 to-black p-5 shadow-[0_10px_20px_rgba(0,0,0,0.5)] transition-all duration-150 ease-linear hover:shadow-blue-500/30 active:scale-95 max-md:w-full md:shadow-xl">
              <div className="absolute -top-8 -right-8 h-28 w-28 rounded-full bg-blue-500/10 blur-3xl" />

              <div className="relative z-10">
                <div className="flex items-center gap-3 md:mb-3">
                  <div className="flex items-center justify-center rounded-2xl bg-blue-500/15 p-2 text-5xl md:text-2xl">
                    <MessagesSquare className="size-10" />
                  </div>

                  <div className="text-start">
                    <p className="text-xl font-semibold text-white">
                      Talk to Astra
                    </p>
                    <p className="text-sm text-gray-400">
                      Your smart AI assistant
                    </p>
                  </div>

                  <p className="ml-auto animate-pulse text-2xl md:hidden">→</p>
                </div>

                <p className="hidden md:block">Start Chat →</p>
              </div>
            </button>

            <button className="relative overflow-hidden rounded-3xl border border-violet-500/20 bg-linear-to-br from-violet-950 via-slate-950 to-black p-5 shadow-[0_10px_20px_rgba(0,0,0,0.5)] transition-all duration-150 ease-linear hover:shadow-violet-500/30 active:scale-95 max-md:w-full md:shadow-xl">
              <div className="absolute -right-8 -bottom-8 h-28 w-28 rounded-full bg-violet-500/10 blur-3xl" />

              <div className="relative z-10">
                <div className="flex items-center gap-3 md:mb-3">
                  <div className="flex items-center justify-center rounded-2xl bg-violet-500/15 p-2 text-4xl md:text-2xl">
                    <Bot className="size-10" />
                  </div>

                  <div className="text-start">
                    <p className="text-xl font-semibold text-white">
                      Create Agent
                    </p>
                    <p className="text-sm text-gray-400">
                      Build your custom AI expert
                    </p>
                  </div>

                  <p className="ml-auto animate-pulse text-2xl md:hidden">→</p>
                </div>

                <p className="hidden md:block">Create Now →</p>
              </div>
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
