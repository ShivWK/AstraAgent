'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Spinner } from '@/components/ui/spinner';
import { useSession } from 'next-auth/react';

export default function EmailVerification() {
  const { update } = useSession();
  const updateRef = useRef(update);

  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');
  const purpose = searchParams.get('purpose');

  const hasParam = Boolean(token && purpose);

  const [status, setStatus] = useState<
    'loading' | 'success' | 'error' | 'TooManyRequests'
  >(hasParam ? 'loading' : 'error');

  useEffect(() => {
    updateRef.current = update;
  }, [update]);

  useEffect(() => {
    if (!hasParam) return;

    let timer: NodeJS.Timeout;
    const verifyEmail = async () => {
      try {
        const res = await fetch('/api/verification-action', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            token,
            purpose,
          }),
        });

        if (res.status === 429) {
          setStatus('TooManyRequests');
          return;
        }

        if (!res.ok) {
          setStatus('error');
          return;
        }

        setStatus('success');
        await updateRef.current();

        timer = setTimeout(() => {
          router.replace('/');
        }, 3000);
      } catch (err) {
        console.log(err);
        setStatus('error');
      }
    };

    verifyEmail();

    return () => {
      clearTimeout(timer);
    };
  }, [token, purpose, hasParam, router]);

  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-md rounded-lg bg-blue-900 p-8 text-center shadow-md">
        {status === 'loading' && (
          <>
            <Spinner className="mx-auto block size-18" />
            <h2 className="text-xl font-semibold">Verifying your email...</h2>
            <p className="mt-2 text-gray-200">
              Please wait while we verify your email address.
            </p>
          </>
        )}

        {status === 'success' && (
          <>
            <h2 className="text-2xl font-semibold text-green-400">
              Email Verified ✅
            </h2>
            <p className="mt-2 text-gray-200">
              Your email has been successfully verified. You can now continue
              using your account.
            </p>

            <p className="mt-2 text-gray-200">
              You will be redirected to the home page in 3 seconds
            </p>
          </>
        )}

        {status === 'error' && (
          <>
            <h2 className="text-2xl font-semibold text-red-500">
              Verification Failed
            </h2>
            <p className="mt-2 text-gray-200">
              This verification link is invalid or expired.
            </p>
          </>
        )}

        {status === 'TooManyRequests' && (
          <>
            <h2 className="text-xl text-yellow-400">Slow down ⚠️</h2>
            <p>Too many requests. Try again later.</p>
          </>
        )}
      </div>
    </main>
  );
}
