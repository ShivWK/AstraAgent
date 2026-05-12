'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  resetPasswordSchema,
  ResetPasswordInput,
} from '@/lib/validations/auth.schema';

export default function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();

  const token = searchParams.get('token');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordInput) => {
    try {
      const res = await fetch('/api/verification-action', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          purpose: 'reset_password',
          token,
          password: data.password,
        }),
      });

      const result = await res.json();
      if (res.status === 429) {
        const data = await res.json();
        const retryAfter = data.retryAfter;
        const minutes = Math.floor(retryAfter / 60);
        const seconds = retryAfter % 60;

        setError(`Too many requests. Try again in ${minutes}m ${seconds}s`);
        return;
      }

      if (!res.ok) {
        setError(result.error || 'Something went wrong');
        return;
      }

      alert('Password reset successful');
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
      } else {
        console.log('Something went wrong');
      }
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="bg-modal-background border-modal-border shadow-modal-shadow w-full max-w-md rounded-xl border-2 p-8">
        <h1 className="text-quick-cards-heading text-center text-2xl font-semibold">
          Reset your password
        </h1>

        <p className="text-quick-cards-subheading mt-2 text-center text-sm">
          Enter your new password below.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-5">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              New Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter new password"
                {...register('password')}
                className="bg-input-primary-bg border-input-primary-border focus:border-input-focus-border focus:shadow-input-focus-shadow placeholder:text-input-placeholder w-full rounded-lg border px-3 py-2 pr-10 outline-none"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-quick-cards-subheading absolute top-1/2 right-2 -translate-y-1/2 text-sm"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>

            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Confirm Password
            </label>

            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Confirm password"
              {...register('confirmPassword')}
              className="bg-input-primary-bg border-input-primary-border focus:border-input-focus-border focus:shadow-input-focus-shadow placeholder:text-input-placeholder w-full rounded-lg border px-3 py-2 outline-none"
            />

            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            disabled={isSubmitting}
            type="submit"
            className="w-full rounded-lg bg-blue-600 py-2 font-medium text-white transition hover:bg-blue-700 disabled:opacity-50"
          >
            {isSubmitting ? 'Resetting...' : 'Reset Password'}
          </button>

          {error && (
            <p className="mt-4 text-center text-sm text-red-400 select-none">
              {error}
            </p>
          )}
        </form>
      </div>
    </main>
  );
}
