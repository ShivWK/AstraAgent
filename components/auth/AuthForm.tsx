import { Dialog, DialogContent } from '../ui/dialog';
import { LoginForm } from './LoginForm';
import { SignUpForm } from './SignUpForm';
import { useState } from 'react';

type PropType = {
  open: boolean;
  setOpen: (value: boolean) => void;
};

const AuthForm = ({ open, setOpen }: PropType) => {
  const [isLogIn, setLogin] = useState(true);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="sm:max-w-[425px]"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        {isLogIn ? (
          <LoginForm setOpen={setOpen} />
        ) : (
          <SignUpForm setOpen={setOpen} />
        )}
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
      </DialogContent>
    </Dialog>
  );
};

export default AuthForm;
