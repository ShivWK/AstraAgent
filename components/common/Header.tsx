'use client';

import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import ThemeChanger from './ThemeChanger';
import AuthForm from '../auth/AuthForm';
import { usePathname } from 'next/navigation';
import { logoutAction } from '@/app/actions/auth';
import { Spinner } from '../ui/spinner';
import {
  setOpenLoginModel,
  selectLogInState,
  setLogInState,
  selectLoginError,
  setLoginError,
} from '@/features/auth/authSlice';
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
    if (isLoggedIn) {
      setLogoutLoading(true);
      const response = await logoutAction();

      console.log(response);

      if (response.success) {
        if (pathname !== '/') {
          router.push('/');
        }
        dispatch(setLogInState(false));
      }

      setLogoutLoading(false);
    } else {
      if (errorMessage) {
        dispatch(setLoginError(''));
      }
      dispatch(setOpenLoginModel(true));
    }
  };

  return (
    <>
      <header className="fixed z-50 flex w-full justify-between border px-2.5 py-3 backdrop-blur-md">
        <div
          className="flex cursor-pointer items-center gap-5"
          onClick={() => router.push('/')}
        >
          <Image
            src="/logo-solid.jpeg"
            alt="Astra agent logo"
            width={50}
            height={50}
            className="h-13 w-14 rounded md:h-13 md:w-14"
          />
          <p className="hidden text-2xl font-semibold tracking-wide lg:block">
            Astra Agent
          </p>
        </div>
        <div className="flex items-center gap-4">
          <ThemeChanger />
          <Button
            onClick={authClickHandler}
            variant="secondary"
            size="lg"
            className="text-md text-lg tracking-wide transition-all duration-75 active:scale-95"
            disabled={logoutLoading}
          >
            {isLoggedIn ? (
              <span className="flex items-center gap-2">
                {logoutLoading && <Spinner data-icon="inline-start" />}
                Sign Out
              </span>
            ) : (
              'Sign In'
            )}
          </Button>
        </div>
      </header>
      <AuthForm />
    </>
  );
};

export default Header;
