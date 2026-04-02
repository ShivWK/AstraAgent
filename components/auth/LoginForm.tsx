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
import { useEffect, useState } from 'react';
import EyeButton from './EyeButton';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import {
  setGetStartedLoading,
  setLoginError,
  setOpenLoginModel,
  setGlobalAuthLoader,
  selectGlobalAuthLoader,
} from '@/features/auth/authSlice';
import useAppDispatch from '@/hooks/useAppDispatch';
import useAppSelector from '@/hooks/useAppSelector';
import { signIn } from 'next-auth/react';

type FormType = z.infer<typeof loginSchema>;

type PropsType = {
  setLogin: (value: 'login' | 'signup' | 'reset_password') => void;
};

export function LoginForm({ setLogin }: PropsType) {
  const [eyeOpen, setEyeOpen] = useState(false);
  const searchParams = useSearchParams();
  const globalAuthLoader = useAppSelector(selectGlobalAuthLoader);
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

  useEffect(() => {
    dispatch(setGlobalAuthLoader(isSubmitting));
  }, [isSubmitting, dispatch]);

  const onSubmit = async (data: FormType) => {
    const callbackUrl = searchParams.get('callbackUrl') || '/';
    dispatch(setLoginError(null));

    const result = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (!result?.ok) {
      dispatch(setLoginError('Invalid email or password'));
      return;
    }

    console.log('Success');
    dispatch(setOpenLoginModel(false));
    dispatch(setGetStartedLoading(false));

    if (pathname !== callbackUrl) {
      router.replace(callbackUrl);
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
            disabled={isSubmitting || globalAuthLoader}
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
            <EyeButton
              eyeOpen={eyeOpen}
              setEyeOpen={setEyeOpen}
              isSubmitting={isSubmitting}
            />
          </div>
          <Input
            type={eyeOpen ? 'text' : 'password'}
            id="password"
            disabled={isSubmitting || globalAuthLoader}
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
            Sign In
          </Button>

          <button
            onClick={() => setLogin('reset_password')}
            type="button"
            className="mt-1 text-sm underline underline-offset-2 transition-all duration-75 ease-out active:text-gray-300"
          >
            forgot password
          </button>
          <span>------- or -------</span>
          <SignInWithProviders />
        </div>
      </DialogFooter>
    </form>
  );
}
