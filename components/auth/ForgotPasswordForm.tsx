'use client';

import { Button } from '../ui/button';
import { DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Spinner } from '../ui/spinner';
import { useForm, FieldErrors } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import useAppDispatch from '@/hooks/useAppDispatch';
import { setLoginError } from '@/features/auth/authSlice';

const forgotPasswordSchema = z.object({
  email: z.email('Enter a valid email'),
});

type FormType = z.infer<typeof forgotPasswordSchema>;

export function ForgotPasswordForm() {
  const [emailSent, setEmailSent] = useState(false);
  const dispatch = useAppDispatch();

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

  const onSubmit = async (data: FormType) => {
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
        {!emailSent ? (
          <>
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
          </>
        ) : (
          <p className="text-center text-sm text-gray-500">
            If an account exists for this email, a password reset link has been
            sent.
          </p>
        )}
      </div>

      <DialogFooter className="w-full">
        <div className="flex w-full flex-col items-center gap-3">
          <Button
            type="submit"
            disabled={isSubmitting || emailSent}
            className="w-full text-white transition-all duration-75 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-[#0c2e96]"
          >
            {isSubmitting && <Spinner data-icon="inline-start" />}
            Send Reset Link
          </Button>
        </div>
      </DialogFooter>
    </form>
  );
}
