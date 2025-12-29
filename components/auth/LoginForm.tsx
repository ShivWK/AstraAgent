import { useState } from 'react';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { FieldErrors, useForm } from 'react-hook-form';
import SignInWithGoogle from './SignInWithGoogle';

type PropsType = {
  open: boolean;
  setOpen: (value: boolean) => void;
};

type FormType = {
  name: string;
  email: string;
  password: string;
};

export function LoginForm({ open, setOpen }: PropsType) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormType>({
    mode: 'onBlur',
    shouldUnregister: true,
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });
  const [isLogIn, setLogin] = useState(true);

  const onSubmit = (data: FormType) => {
    console.log(data);
    setOpen(false);
  };

  const onError = (error: FieldErrors<FormType>) => {
    console.log(error);
  };

  const signinSignupSwitchHandler = () => {
    setLogin(!isLogIn);
    reset();
  };

  const nameValidation = isLogIn
    ? {}
    : {
        required: { value: true, message: 'Name is required' },
        minLength: {
          value: 2,
          message: 'Name must be at least 2 characters',
        },
        maxLength: {
          value: 50,
          message: 'Name must be at most 50 characters',
        },
        pattern: {
          value: /^[A-Za-z][A-Za-z\s]{1,49}$/,
          message: 'Provide a valid name',
        },
        validate: (fieldValue: string) => {
          if (fieldValue.toLowerCase() === 'xxx') {
            return 'Provide a valid name';
          }
        },
      };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="sm:max-w-[425px]"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
          <DialogHeader className="mb-5">
            <DialogTitle>{isLogIn ? 'Sign In' : 'Sign Up'}</DialogTitle>
          </DialogHeader>
          <div className="mb-5 grid gap-4">
            {!isLogIn && (
              <div className="grid gap-3">
                <Label htmlFor="name">Name</Label>
                <Input
                  type="text"
                  id="name"
                  placeholder="Enter Your Name"
                  {...register('name', nameValidation)}
                />
                {errors.name && (
                  <p className="-mt-0.5 text-sm text-red-400">
                    {errors.name.message}
                  </p>
                )}
              </div>
            )}
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input
                type="text"
                id="email"
                placeholder="Enter Your Email"
                {...register('email', {
                  required: { value: true, message: 'Email is required' },
                  minLength: {
                    value: 5,
                    message: 'Email must be at least 5 characters',
                  },
                  maxLength: {
                    value: 254,
                    message: 'Email must be at most 254 characters',
                  },
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
                    message: 'Provide a valid email',
                  },
                })}
              />
              {errors.email && (
                <p className="-mt-0.5 text-sm text-red-400">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="grid gap-3">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                placeholder="Enter Your Password"
                {...register('password', {
                  required: { value: true, message: 'Password is required' },
                  minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters',
                  },
                  maxLength: {
                    value: 64,
                    message: 'Password must be at most 64 characters',
                  },
                  // pattern: {
                  //   value:
                  //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,64}$/,
                  //   message:
                  //     'Password must include upper, lower, number, and special character',
                  // },
                })}
              />
              {errors.password && (
                <p className="-mt-0.5 text-sm text-red-400">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>
          <DialogFooter className="w-full">
            <div className="flex w-full flex-col gap-4">
              <div className="flex w-full justify-between">
                <SignInWithGoogle />
                <Button
                  type="submit"
                  className="basis-[49%] text-white dark:bg-[#0c2e96]"
                >
                  {isLogIn ? 'Sign In' : 'Sign Up'}
                </Button>
              </div>

              <p className="mt-2 flex items-center gap-1">
                <span className="text-gray-300">
                  {!isLogIn ? 'Already registered?' : 'New to Astra Agent?'}
                </span>
                <button
                  type="button"
                  onClick={signinSignupSwitchHandler}
                  className="cursor-pointer text-white underline underline-offset-2"
                >
                  {!isLogIn ? 'Sign in now' : 'Sign up now'}
                </button>
              </p>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
