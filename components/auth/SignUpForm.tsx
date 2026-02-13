import { Button } from '../ui/button';
import { DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Spinner } from '../ui/spinner';
import { FieldErrors, useForm } from 'react-hook-form';
import SignInWithProviders from './SignInWithProviders';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpSchema } from '@/lib/validations/auth.schema';
import EyeButton from './EyeButton';
import { useEffect, useState } from 'react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import {
  setGetStartedLoading,
  setLoginError,
  setLogInState,
  setOpenLoginModel,
  setGlobalAuthLoader,
  selectGlobalAuthLoader,
} from '@/features/auth/authSlice';
import useAppDispatch from '@/hooks/useAppDispatch';
import useAppSelector from '@/hooks/useAppSelector';

type FormType = z.infer<typeof signUpSchema>;

export function SignUpForm() {
  const [eyeOpen, setEyeOpen] = useState(false);
  const globalAuthLoader = useAppSelector(selectGlobalAuthLoader);
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormType>({
    resolver: zodResolver(signUpSchema),
    mode: 'onBlur',
    shouldUnregister: true,
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    console.log('Ran');
    dispatch(setGlobalAuthLoader(isSubmitting));
  }, [isSubmitting, dispatch]);

  const onSubmit = async (data: FormType) => {
    const callbackUrl = searchParams.get('callbackUrl') || '/';

    const response = await fetch('/api/register', {
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
    } else {
      console.log('Success', result.message);
      dispatch(setLogInState(true));
      dispatch(setOpenLoginModel(false));
      dispatch(setGetStartedLoading(false));

      if (pathname !== callbackUrl) {
        router.push(callbackUrl);
      }
    }
  };

  const onError = (error: FieldErrors<FormType>) => {
    console.log(error);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
      <DialogHeader className="mb-5">
        <DialogTitle>Sign Up</DialogTitle>
      </DialogHeader>
      <div className="mb-5 grid gap-4">
        <div className="grid gap-3">
          <Label htmlFor="name">Name</Label>
          <Input
            type="text"
            id="name"
            placeholder="Enter Your Name"
            {...register('name')}
          />
          {errors.name && (
            <p className="-mt-0.5 text-sm text-red-400">
              {errors.name.message}
            </p>
          )}
        </div>

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
        <div className="flex w-full flex-col items-center gap-3">
          <Button
            type="submit"
            className="w-full text-white transition-all duration-75 active:scale-95 dark:bg-[#0c2e96]"
            disabled={isSubmitting || globalAuthLoader}
          >
            {isSubmitting && <Spinner data-icon="inline-start" />}
            Sign Up
          </Button>
          <span>------- or -------</span>
          <SignInWithProviders />
        </div>
      </DialogFooter>
    </form>
  );
}
