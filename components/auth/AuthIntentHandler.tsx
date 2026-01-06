'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { setLoginError, setOpenLoginModel } from '@/features/auth/authSlice';
import useAppDispatch from '@/hooks/useAppDispatch';
import { useEffect } from 'react';

const AuthIntentHandler = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    if (searchParams.get('auth') === 'required') {
      dispatch(setLoginError('Please sign in to continue'));
      dispatch(setOpenLoginModel(true));

      router.replace(`/?callbackUrl=${callbackUrl}`);
    }
  }, [searchParams, router, dispatch, callbackUrl]);

  return null;
};

export default AuthIntentHandler;
