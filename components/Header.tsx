'use client';

import { Button } from './ui/button';
import { Sun } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Header = () => {
  const router = useRouter();

  return (
    <header className="fixed flex w-full justify-between p-3 backdrop-blur-md">
      <div
        className="flex cursor-pointer items-center gap-3"
        onClick={() => router.push('/')}
      >
        <Image
          src="/logo-solid.jpeg"
          alt="Astra agent logo"
          width={50}
          height={50}
          className="rounded"
        />
        <p className="hidden text-2xl font-semibold tracking-wide lg:block">
          Astra Agent
        </p>
      </div>
      <div className="flex items-center gap-4">
        <Button
          variant="secondary"
          size="icon"
          className="rounded-full text-xl"
        >
          <Sun size={24} strokeWidth={2} />
        </Button>
        <Button variant="secondary" className="text-md">
          Get Started
        </Button>
      </div>
    </header>
  );
};

export default Header;
