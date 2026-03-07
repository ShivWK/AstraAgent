'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();

  const token = searchParams.get('token');
  const email = searchParams.get('email');

  const hasParam = Boolean(token && email);

  const [status, setStatus] = useState<'loading' | 'success' | 'error'>(
    hasParam ? 'loading' : 'error',
  );

  useEffect(() => {
    if (!hasParam) return;

    const verifyEmail = async () => {
      try {
        const res = await fetch('/api/auth/verify-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            token,
            email,
          }),
        });

        if (!res.ok) {
          setStatus('error');
          return;
        }

        setStatus('success');
      } catch (err) {
        console.log(err);
        setStatus('error');
      }
    };

    verifyEmail();
  }, [token, email, hasParam]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-md rounded-lg bg-white p-8 text-center shadow-md">
        {status === 'loading' && (
          <>
            <h2 className="text-xl font-semibold">Verifying your email...</h2>
            <p className="mt-2 text-gray-500">
              Please wait while we verify your email address.
            </p>
          </>
        )}

        {status === 'success' && (
          <>
            <h2 className="text-xl font-semibold text-green-600">
              Email Verified ✅
            </h2>
            <p className="mt-2 text-gray-600">
              Your email has been successfully verified. You can now continue
              using your account.
            </p>
          </>
        )}

        {status === 'error' && (
          <>
            <h2 className="text-xl font-semibold text-red-600">
              Verification Failed
            </h2>
            <p className="mt-2 text-gray-600">
              This verification link is invalid or expired.
            </p>
          </>
        )}
      </div>
    </main>
  );
}
