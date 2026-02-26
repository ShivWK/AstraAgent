'use client';

import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import ThemeChanger from './ThemeChanger';
import AuthForm from '../auth/AuthForm';
import { usePathname } from 'next/navigation';
import { logoutAction } from '@/app/actions/auth';
import { Kanban, CircleUserRound } from 'lucide-react';
import {
  setOpenLoginModel,
  selectLogInState,
  setLogInState,
  selectLoginError,
  setLoginError,
} from '@/features/auth/authSlice';
import { setOpenSidebar } from '@/features/agents/agentsSlice';
import useAppDispatch from '@/hooks/useAppDispatch';
import useAppSelector from '@/hooks/useAppSelector';

type PropsType = {
  isUserLoggedIn: boolean;
};

const Header = ({ isUserLoggedIn }: PropsType) => {
  const [logoutLoading, setLogoutLoading] = useState(false);
  const isLoggedIn = useAppSelector(selectLogInState);
  const errorMessage = useAppSelector(selectLoginError);
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoggedIn) return;
    dispatch(setLogInState(isUserLoggedIn));
  }, [isUserLoggedIn, dispatch]);

  const authClickHandler = async () => {
    if (errorMessage) {
      dispatch(setLoginError(''));
    }
    dispatch(setOpenLoginModel(true));
  };

  return (
    <>
      <header className="fixed z-50 flex w-full justify-between px-2.5 pt-2 pb-1.5 backdrop-blur-md">
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
          {!isLoggedIn ? (
            <Button
              onClick={authClickHandler}
              variant="secondary"
              size="lg"
              className={`text-md text-lg tracking-wide transition-all duration-75 active:scale-95 ${isLoggedIn && 'rounded-full'}`}
              disabled={logoutLoading}
            >
              Sign In
            </Button>
          ) : (
            <button onClick={() => router.push('/account')}>
              <CircleUserRound size={48} strokeWidth={1} />
            </button>
          )}
        </div>
      </header>
      <AuthForm />
    </>
  );
};

export default Header;
