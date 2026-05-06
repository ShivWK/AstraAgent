'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { setLoginError, setOpenLoginModel } from '@/features/auth/authSlice';
import useAppDispatch from '@/hooks/useAppDispatch';
import { useEffect } from 'react';
import { setOpenAgentCreationModel } from '@/features/agents/agentsSlice';

const AuthIntentHandler = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    if (searchParams.get('auth') === 'required') {
      dispatch(setLoginError('Please sign in or sign up to continue'));
      dispatch(setOpenLoginModel(true));

      router.replace(`/?callbackUrl=${callbackUrl}`);
      return;
    }

    if (searchParams.get('createAgent') === 'true') {
      dispatch(setOpenAgentCreationModel(true));

      // delay helps avoid race condition
      setTimeout(() => {
        router.replace('/ai-assistant');
      }, 0);
    }
  }, [searchParams, router, dispatch, callbackUrl]);

  return null;
};

export default AuthIntentHandler;
