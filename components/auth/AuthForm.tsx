import { Dialog, DialogContent } from '../ui/dialog';
import { LoginForm } from './LoginForm';
import { SignUpForm } from './SignUpForm';
import { useEffect, useState } from 'react';

type PropType = {
  open: boolean;
  setOpen: (value: boolean) => void;
};

const AuthForm = ({ open, setOpen }: PropType) => {
  const [isLogIn, setLogin] = useState(true);
  const [error, setError] = useState<string>('');

  const switchFormHandler = () => {
    setLogin(!isLogIn);
    setError('');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="sm:max-w-[425px]"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        {isLogIn ? (
          <LoginForm setOpen={setOpen} setError={setError} />
        ) : (
          <SignUpForm setOpen={setOpen} setError={setError} />
        )}
        <p className="mt-2 flex items-center gap-1">
          <span className="text-gray-300">
            {!isLogIn ? 'Already registered?' : 'New to Astra Agent?'}
          </span>
          <button
            type="button"
            onClick={switchFormHandler}
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
