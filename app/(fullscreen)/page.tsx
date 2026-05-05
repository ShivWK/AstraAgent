'use client';

import styles from './page.module.css';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
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
import QuickAccess from '@/components/common/QuickAccess';

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
        <section className="flex flex-col items-center gap-8">
          <Image
            src="/logo-transparent.png"
            alt="Astra agent site logo, an start in blue shade"
            width={300}
            height={300}
            quality={100}
            className="h-50 w-52 md:h-60 md:w-62"
          ></Image>

          <div className="-mt-4 flex w-full max-w-2xl flex-col items-center gap-2">
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
          <QuickAccess />
        </section>
      </main>
      <Footer />
    </>
  );
}
