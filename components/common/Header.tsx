'use client';

import { Button } from '../ui/button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import ThemeChanger from './ThemeChanger';
import AuthForm from '../auth/AuthForm';
import { usePathname } from 'next/navigation';
import { Kanban, CircleUserRound } from 'lucide-react';
import {
  setOpenLoginModel,
  selectLoginError,
  setLoginError,
} from '@/features/auth/authSlice';
import { setOpenSidebar } from '@/features/agents/agentsSlice';
import useAppDispatch from '@/hooks/useAppDispatch';
import useAppSelector from '@/hooks/useAppSelector';
import { useSession } from 'next-auth/react';
import { useEffect, useRef } from 'react';
import useRefresher from '@/hooks/useRefreshAuth';

const Header = () => {
  const errorMessage = useAppSelector(selectLoginError);

  const { data: session, status } = useSession();
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const router = useRouter();

  const hasUpdated = useRef(false);
  const refresh = useRefresher();

  useEffect(() => {
    if (status === 'authenticated' && !hasUpdated.current) {
      hasUpdated.current = true;
      refresh();
    }
  }, [status, refresh]);

  const authClickHandler = async () => {
    if (errorMessage) {
      dispatch(setLoginError(''));
    }
    dispatch(setOpenLoginModel(true));
  };

  return (
    <>
      <header className="fixed z-50 flex w-full justify-between px-2.5 py-2.5 backdrop-blur-md">
        <button
          onClick={() => dispatch(setOpenSidebar(true))}
          className={`${pathname === '/ai-workspace' ? 'block md:hidden' : 'hidden'} rounded-full bg-blue-900 p-3`}
        >
          <Kanban
            className="-rotate-90 transform"
            size={24}
            aria-hidden="true"
          />
        </button>
        <div
          className="flex cursor-pointer items-center gap-5"
          onClick={() => router.push('/')}
        >
          <Image
            src="/logo-solid.jpeg"
            alt="Astra agent logo"
            width={300}
            height={300}
            quality={100}
            className={`${pathname === '/ai-workspace' ? 'hidden md:block' : 'block'} h-12 w-13 rounded`}
          />
          <p className="hidden text-2xl font-semibold tracking-wide lg:block">
            Astra Agent
          </p>
        </div>
        <div className="flex items-center gap-4">
          <ThemeChanger />
          {status === 'loading' && (
            <div className="h-12 w-12 animate-pulse rounded-full bg-gray-700" />
          )}
          {status === 'unauthenticated' ? (
            <Button
              onClick={authClickHandler}
              variant="secondary"
              size="lg"
              className="text-md text-lg tracking-wide transition-all duration-75 active:scale-90"
            >
              Sign In
            </Button>
          ) : (
            status === 'authenticated' && (
              <button
                aria-label="Account"
                onClick={() => router.push('/account')}
                className="transition-all duration-75 ease-linear hover:shadow-blue-400 active:scale-95"
              >
                {session?.user?.image ? (
                  <Image
                    src={session.user.image!}
                    alt="Profile picture"
                    width={300}
                    height={300}
                    quality={100}
                    className={`h-12 w-12 rounded-full border-2 border-blue-400 hover:shadow-[0_0_15px_1px_#51a2ff]`}
                  />
                ) : (
                  <CircleUserRound
                    size={48}
                    strokeWidth={1}
                    className="rounded-full text-blue-400 hover:shadow-[0_0_15px_1px_#51a2ff]"
                  />
                )}
              </button>
            )
          )}
        </div>
      </header>
      <AuthForm />
    </>
  );
};

export default Header;
