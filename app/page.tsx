'use client';
import styles from './page.module.css';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { Cat } from 'lucide-react';
import useAppDispatch from '@/hooks/useAppDispatch';
import useAppSelector from '@/hooks/useAppSelector';
import {
  selectGetStartedLoading,
  selectLogInState,
  setGetStartedLoading,
} from '@/features/auth/authSlice';
import { Spinner } from '@/components/ui/spinner';

export default function Home() {
  const router = useRouter();
  const loading = useAppSelector(selectGetStartedLoading);
  const isLoggedIn = useAppSelector(selectLogInState);
  const dispatch = useAppDispatch();

  const getStartedClickHandler = () => {
    router.push('/ai-assistant');

    if (!isLoggedIn) {
      dispatch(setGetStartedLoading(true));
    }
  };

  return (
    <main className="flex min-h-screen w-full items-center justify-center max-md:px-2 md:pt-10">
      <section className="flex flex-col items-center gap-3.5 p-2">
        <Image
          src="/logo-transparent.png"
          alt="Astra agent site logo, an start in blue shade"
          width={250}
          height={250}
          className="rounded"
        ></Image>
        <span className="font-primary text-center text-5xl font-extrabold">
          Your AI task Force
        </span>
        <Button
          onClick={getStartedClickHandler}
          className={`${styles['btn--start']} rounded-full py-5.5 text-lg font-medium transition-all duration-75 active:scale-95 md:py-5 dark:bg-blue-600 dark:text-white`}
          disabled={loading}
        >
          Get Started
          {loading ? (
            <Spinner className="size-5" data-icon="inline-end" />
          ) : (
            <ArrowRight className="animate-ping" />
          )}
        </Button>
        <span className="text-center">Unlock powerful agents</span>
        <div className="flex flex-wrap gap-3">
          <div className="flex flex-col items-center gap-1 rounded border border-blue-400 p-2">
            <Cat />
            <span>agent</span>
          </div>
          <div className="flex flex-col items-center gap-1 rounded border border-blue-400 p-2">
            <Cat />
            <span>agent</span>
          </div>
          <div className="flex flex-col items-center gap-1 rounded border border-blue-400 p-2">
            <Cat />
            <span>agent</span>
          </div>
          <div className="flex flex-col items-center gap-1 rounded border border-blue-400 p-2">
            <Cat />
            <span>agent</span>
          </div>
          <div className="flex flex-col items-center gap-1 rounded border border-blue-400 p-2">
            <Cat />
            <span>agent</span>
          </div>
        </div>
      </section>
    </main>
  );
}
