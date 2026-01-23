import { Dialog, DialogContent } from '../ui/dialog';
import useAppDispatch from '@/hooks/useAppDispatch';
import useAppSelector from '@/hooks/useAppSelector';
import { LoginForm } from './LoginForm';
import { SignUpForm } from './SignUpForm';
import { useState } from 'react';
import {
  selectLoginError,
  setOpenLoginModel,
  selectLoginModelOpenState,
  setGetStartedLoading,
} from '@/features/auth/authSlice';

const AuthForm = () => {
  const [isLogIn, setLogin] = useState(true);
  const dispatch = useAppDispatch();
  const open = useAppSelector(selectLoginModelOpenState);
  const error = useAppSelector(selectLoginError);

  const openChangeHandler = (state: boolean) => {
    dispatch(setOpenLoginModel(state));
    dispatch(setGetStartedLoading(false));
  };

  return (
    <Dialog open={open} onOpenChange={openChangeHandler}>
      <DialogContent
        className="sm:max-w-[425px]"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        {isLogIn ? <LoginForm /> : <SignUpForm />}
        <p className="mt-2 flex items-center gap-1">
          <span className="text-gray-300">
            {!isLogIn ? 'Already registered?' : 'New to Astra Agent?'}
          </span>
          <button
            type="button"
            onClick={() => setLogin(!isLogIn)}
            className="cursor-pointer text-white underline underline-offset-2"
          >
            {!isLogIn ? 'Sign in now' : 'Sign up now'}
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
