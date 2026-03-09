'use client';

import { Button } from '../ui/button';
import { DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Spinner } from '../ui/spinner';
import { useForm, FieldErrors } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import useAppDispatch from '@/hooks/useAppDispatch';
import { setLoginError } from '@/features/auth/authSlice';

const forgotPasswordSchema = z.object({
  email: z.email('Enter a valid email'),
});

type FormType = z.infer<typeof forgotPasswordSchema>;

export function ForgotPasswordForm() {
  const [emailSent, setEmailSent] = useState(false);
  const [resendLinkClicked, setResendLinkClicked] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (seconds === 0) return;

    const timer = setInterval(() => {
      setSeconds((prv) => prv - 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [seconds]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormType>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: 'onBlur',
    shouldUnregister: true,
    defaultValues: {
      email: '',
    },
  });

  async function sendLink(data: FormType) {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      body: JSON.stringify({
        email: data.email,
        purpose: 'reset_password',
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response;
  }

  const onSubmit = async (data: FormType) => {
    if (isSubmitting) return;
    const response = await sendLink(data);

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
      setEmailSent(true);
      setSeconds(30);
    }
  };

  const onError = (error: FieldErrors<FormType>) => {
    console.log(error);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
      <DialogHeader className="mb-5">
        <DialogTitle>Reset Password</DialogTitle>
      </DialogHeader>

      <div className="mb-5 grid gap-4">
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>

          <Input
            type="text"
            id="email"
            placeholder="Enter your email"
            disabled={isSubmitting}
            {...register('email')}
          />

          {errors.email && (
            <p className="-mt-0.5 text-sm text-red-400">
              {errors.email.message}
            </p>
          )}
        </div>
        {emailSent && (
          <p className="text-center text-sm text-gray-500">
            If an account with this email exists, we’ve sent a password reset
            link. Please check your inbox or spam folder.
          </p>
        )}
      </div>

      <DialogFooter className="w-full">
        <div className="flex w-full flex-col items-center gap-3">
          <Button
            type="submit"
            onClick={() => setResendLinkClicked(false)}
            disabled={isSubmitting || emailSent}
            className="w-full text-white transition-all duration-75 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-[#0c2e96]"
          >
            {isSubmitting && !resendLinkClicked && (
              <Spinner data-icon="inline-start" />
            )}
            {emailSent ? 'Link Sent' : 'Send Reset Link'}
          </Button>
        </div>
      </DialogFooter>
      {emailSent && (
        <button
          type="submit"
          onClick={() => setResendLinkClicked(true)}
          disabled={seconds > 0 || isSubmitting}
          className={`mx-auto mt-4 block text-sm font-medium text-white underline-offset-3 transition-all duration-75 ease-linear select-none disabled:cursor-not-allowed disabled:text-gray-400 ${!isSubmitting && seconds === 0 && 'hover:underline'} active:text-gray-40`}
        >
          {seconds > 0
            ? `Resend in ${seconds}s`
            : isSubmitting
              ? 'Resending Link...'
              : 'Resend Link'}
        </button>
      )}
    </form>
  );
}
