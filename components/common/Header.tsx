'use client';

import { useState } from 'react';
import { Button } from '../ui/button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import ThemeChanger from './ThemeChanger';
import AuthForm from '../auth/AuthForm';
import { usePathname } from 'next/navigation';
import { logoutAction } from '@/app/actions/auth';
import { Spinner } from '../ui/spinner';

type PropsType = {
  isLoggedIn: boolean;
};

const Header = ({ isLoggedIn }: PropsType) => {
  const [openLoginForm, setOpenLoginForm] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const loginClickHandler = async () => {
    if (isLoggedIn) {
      setLogoutLoading(true);
      const response = await logoutAction();
      if (response.success) {
        if (pathname !== '/') {
          router.push('/');
        }
      }

      setLogoutLoading(false);
    } else {
      setOpenLoginForm(true);
    }
  };

  // console.log("Is Logged in", isLoggedIn, pathname)

  return (
    <>
      <header className="fixed flex w-full justify-between px-1.5 py-2 backdrop-blur-md md:px-3 md:py-3">
        <div
          className="flex cursor-pointer items-center gap-3"
          onClick={() => router.push('/')}
        >
          <Image
            src="/logo-transparent.png"
            alt="Astra agent logo"
            width={60}
            height={60}
            className="rounded"
          />
          <p className="hidden text-2xl font-semibold tracking-wide lg:block">
            Astra Agent
          </p>
        </div>
        <div className="flex items-center gap-4">
          <ThemeChanger />
          <Button
            onClick={loginClickHandler}
            variant="secondary"
            size="lg"
            className="text-md tracking-wide"
            disabled={logoutLoading}
          >
            {isLoggedIn ? (
              <span className="flex items-center gap-2">
                {logoutLoading && <Spinner />}
                Sign Out
              </span>
            ) : (
              'Sign In'
            )}
          </Button>
        </div>
      </header>
      <AuthForm open={openLoginForm} setOpen={setOpenLoginForm} />
    </>
  );
};

export default Header;
