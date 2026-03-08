import { Dialog, DialogContent } from '../ui/dialog';
import useAppDispatch from '@/hooks/useAppDispatch';
import useAppSelector from '@/hooks/useAppSelector';
import { LoginForm } from './LoginForm';
import { SignUpForm } from './SignUpForm';
import { ForgotPasswordForm } from './ForgotPasswordForm';
import { useState } from 'react';
import {
  selectLoginError,
  setOpenLoginModel,
  selectLoginModelOpenState,
  setGetStartedLoading,
} from '@/features/auth/authSlice';

const AuthForm = () => {
  const [isLogIn, setLogin] = useState<'login' | 'signup' | 'reset_password'>(
    'login',
  );
  const dispatch = useAppDispatch();
  const open = useAppSelector(selectLoginModelOpenState);
  const error = useAppSelector(selectLoginError);

  const openChangeHandler = (state: boolean) => {
    dispatch(setOpenLoginModel(state));
    dispatch(setGetStartedLoading(false));
    setTimeout(() => setLogin('login'), 150);
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
        className="sm:max-w-[425px]"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        {isLogIn === 'login' ? (
          <LoginForm setLogin={setLogin} />
        ) : isLogIn === 'signup' ? (
          <SignUpForm />
        ) : (
          <ForgotPasswordForm />
        )}
        <p className="mt-2 flex items-center gap-1">
          <span className="text-gray-300">
            {isLogIn === 'signup'
              ? 'Already registered?'
              : isLogIn === 'login'
                ? 'New to Astra Agent?'
                : 'Remember your password?'}
          </span>
          <button
            type="button"
            onClick={formChangeClickHandler}
            className="cursor-pointer text-white underline underline-offset-2"
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
