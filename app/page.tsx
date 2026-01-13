'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { Cat } from 'lucide-react';

export default function Home() {
  const router = useRouter();

  return (
    <main className="flex min-h-screen w-full items-center justify-center">
      <section className="flex flex-col items-center gap-3 p-2">
        <Image
          src="/logo-transparent.png"
          alt="Astra agent site logo, an start in blue shade"
          width={250}
          height={250}
          className="rounded"
        ></Image>
        <span className="text-center text-xl">Your AI task Force</span>
        <Button
          onClick={() => router.push('/ai-assistant')}
          className="text-lg font-normal dark:bg-blue-600 dark:text-white"
        >
          Get Started
          <ArrowRight className="animate-ping" />
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
