'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import ThemeChanger from './ThemeChanger';
import { LoginForm } from './LoginForm';

const Header = () => {
  const [openLoginForm, setOpenLoginForm] = useState(false);
  const router = useRouter();
  const { resolvedTheme } = useTheme();
  let src = null;

  switch (resolvedTheme) {
    case 'light':
      src = '/logo-transparent.png';
      break;

    case 'dark':
      src = '/logo-solid.jpeg';
      break;

    default:
      src = '/logo-transparent.png';
      break;
  }

  return (
    <header className="fixed flex w-full justify-between p-3 backdrop-blur-md">
      <div
        className="flex cursor-pointer items-center gap-3"
        onClick={() => router.push('/')}
      >
        <Image
          src={src}
          alt="Astra agent logo"
          width={55}
          height={55}
          className="rounded"
        />
        <p className="hidden text-2xl font-semibold tracking-wide lg:block">
          Astra Agent
        </p>
      </div>
      <div className="flex items-center gap-4">
        <ThemeChanger />
        <Button
          onClick={() => setOpenLoginForm(!openLoginForm)}
          variant="secondary"
          size="lg"
          className="text-md tracking-wide"
        >
          Get Started
        </Button>
        <LoginForm open={openLoginForm} setOpen={setOpenLoginForm} />
      </div>
    </header>
  );
};

export default Header;
