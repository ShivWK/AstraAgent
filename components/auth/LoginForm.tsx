import * as z from 'zod';
import { DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { zodResolver } from '@hookform/resolvers/zod';
import SignInWithProviders from './SignInWithProviders';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { FieldErrors, useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import { Spinner } from '../ui/spinner';
import { loginSchema } from '@/lib/validations/auth.schema';
import { useState } from 'react';
import EyeButton from './EyeButton';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import {
  setLoginError,
  setLogInState,
  setOpenLoginModel,
} from '@/features/auth/authSlice';
import useAppDispatch from '@/hooks/useAppDispatch';

type FormType = z.infer<typeof loginSchema>;

export function LoginForm() {
  const [eyeOpen, setEyeOpen] = useState(false);
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormType>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
    shouldUnregister: true,
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: FormType) => {
    const callbackUrl = searchParams.get('callbackUrl') || '/';

    const response = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    let result;

    try {
      result = await response.json();
    } catch {
      dispatch(setLoginError('Server error. Please try again.'));
      return;
    }

    if (!response.ok) {
      dispatch(setLoginError(result.error));
      return;
    }

    console.log('Success', result.message);
    dispatch(setLogInState(true));
    dispatch(setOpenLoginModel(false));

    if (pathname !== callbackUrl) {
      router.push(callbackUrl);
    }
  };

  const onError = (error: FieldErrors<FormType>) => {
    console.log(error);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
      <DialogHeader className="mb-5">
        <DialogTitle>Sign In</DialogTitle>
      </DialogHeader>
      <div className="mb-5 grid gap-4">
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            type="text"
            id="email"
            placeholder="Enter Your Email"
            {...register('email')}
          />
          {errors.email && (
            <p className="-mt-0.5 text-sm text-red-400">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="grid gap-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <EyeButton eyeOpen={eyeOpen} setEyeOpen={setEyeOpen} />
          </div>
          <Input
            type={eyeOpen ? 'text' : 'password'}
            id="password"
            placeholder="Enter Your Password"
            {...register('password')}
          />
          {errors.password && (
            <p className="-mt-0.5 text-sm text-red-400">
              {errors.password.message}
            </p>
          )}
        </div>
      </div>
      <DialogFooter className="w-full">
        <div className="flex w-full flex-col items-center gap-4">
          <Button
            type="submit"
            className="w-full text-white dark:bg-[#0c2e96]"
            disabled={isSubmitting}
          >
            {isSubmitting && <Spinner />}
            Sign In
          </Button>
          <span>------- or -------</span>
          <SignInWithProviders />
        </div>
      </DialogFooter>
    </form>
  );
}
