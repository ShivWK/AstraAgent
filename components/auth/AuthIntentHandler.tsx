'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import {
  setLoginError,
  setOpenLoginModel,
  setLoggedInUserDetails,
} from '@/features/auth/authSlice';
import { useSession } from 'next-auth/react';
import useAppDispatch from '@/hooks/useAppDispatch';
import { useEffect } from 'react';

const AuthIntentHandler = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');
  const dispatch = useAppDispatch();
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'authenticated') {
    const userDetails = {
      name: session.user?.name,
      email: session.user?.email,
      image: session.user?.image,
    };

    dispatch(setLoggedInUserDetails(userDetails));
  }

  useEffect(() => {
    if (searchParams.get('auth') === 'required') {
      dispatch(setLoginError('Please sign in or sign up to continue'));
      dispatch(setOpenLoginModel(true));

      router.replace(`/?callbackUrl=${callbackUrl}`);
    }
  }, [searchParams, router, dispatch, callbackUrl]);

  return null;
};

export default AuthIntentHandler;
