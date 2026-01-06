'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between bg-white px-16 py-32 sm:items-start dark:bg-black">
        <Button
          onClick={() => router.push('/ai-assistant')}
          className="dark:bg-blue-600 dark:text-white"
        >
          Get Started
        </Button>
      </main>
    </div>
  );
}
