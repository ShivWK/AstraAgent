import { useState } from 'react';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { FieldErrors, useForm } from 'react-hook-form';

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
  } = useForm<FormType>({
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
      <DialogContent className="sm:max-w-[425px]">
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
                  <p className="text-sm text-red-400">{errors.name.message}</p>
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
                <p className="text-sm text-red-400">{errors.email.message}</p>
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
                <p className="text-sm text-red-400">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>
          <DialogFooter className="w-full">
            <div className="flex w-full flex-col gap-4">
              <div className="flex w-full justify-between">
                <Button
                  type="button"
                  className="basis-[49%] text-white dark:bg-[#0c2e96]"
                >
                  <span className="">Continue with</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                    <path d="M1 1h22v22H1z" fill="none" />
                  </svg>
                </Button>
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
                  onClick={() => setLogin(!isLogIn)}
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
