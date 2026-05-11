import { Dialog, DialogContent } from '../ui/dialog';
import useAppDispatch from '@/hooks/useAppDispatch';
import useAppSelector from '@/hooks/useAppSelector';
import { LoginForm } from './LoginForm';
import { SignUpForm } from './SignUpForm';
import { ForgotPasswordForm } from './ForgotPasswordForm';
import { useState, Suspense } from 'react';

import {
  selectLoginError,
  setOpenLoginModel,
  selectLoginModelOpenState,
  setGetStartedLoading,
  selectAuthRequired,
  setAuthRequired,
} from '@/features/auth/authSlice';

const AuthForm = () => {
  const [isLogIn, setLogin] = useState<'login' | 'signup' | 'reset_password'>(
    'login',
  );
  const [authDone, setAuthDone] = useState(false);
  const dispatch = useAppDispatch();
  const open = useAppSelector(selectLoginModelOpenState);
  const error = useAppSelector(selectLoginError);
  const isAuthRequired = useAppSelector(selectAuthRequired);

  const openChangeHandler = (state: boolean) => {
    dispatch(setOpenLoginModel(state));
    dispatch(setGetStartedLoading(false));
    setTimeout(() => setLogin('login'), 150);

    if (!authDone && isAuthRequired) {
      window.history.back();
      dispatch(setAuthRequired(false));
    }
  };

  const formChangeClickHandler = () => {
    setLogin((prv) => {
      if (prv === 'login') return 'signup';
      else return 'login';
    });
  };

  return (
    <Dialog open={open} onOpenChange={openChangeHandler}>
      <DialogContent
        className="bg-modal-background border-modal-border shadow-modal-shadow border-2 sm:max-w-106.25"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        {isLogIn === 'login' ? (
          <Suspense fallback={null}>
            <LoginForm setLogin={setLogin} setAuthDone={setAuthDone} />
          </Suspense>
        ) : isLogIn === 'signup' ? (
          <Suspense fallback={null}>
            <SignUpForm setAuthDone={setAuthDone} />
          </Suspense>
        ) : (
          <ForgotPasswordForm />
        )}
        <p className="mt-2 flex items-center gap-1">
          <span className="text-gray-900 dark:text-gray-300">
            {isLogIn === 'signup'
              ? 'Already registered?'
              : isLogIn === 'login'
                ? 'New to Astra Agent?'
                : 'Remember your password?'}
          </span>
          <button
            type="button"
            onClick={formChangeClickHandler}
            className="cursor-pointer font-medium text-black underline underline-offset-2 dark:text-white"
          >
            {isLogIn === 'signup' || isLogIn === 'reset_password'
              ? 'Sign in now'
              : 'Sign up now'}
          </button>
        </p>
        {error && (
          <p className="text-center font-medium text-red-500">{error}</p>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AuthForm;
