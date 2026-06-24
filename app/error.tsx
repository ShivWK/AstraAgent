'use client';

import { useEffect } from 'react';
import Link from 'next/link';

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const reloadHandler = () => {
    window.location.reload();
  };

  return (
    <main className="flex min-h-screen items-center justify-center px-2 md:pt-15">
      <div className="w-full max-w-2xl">
        <div className="rounded-3xl border border-white/20 bg-white/10 px-4 py-6 text-center shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-black/10">
          {/* Error Heading */}
          <h1 className="bg-linear-to-r from-red-600 to-orange-500 bg-clip-text text-5xl font-extrabold text-transparent md:text-7xl dark:from-red-400 dark:to-orange-300">
            Oops!
          </h1>

          <h2 className="mt-4 text-2xl font-bold text-white md:text-3xl dark:text-white">
            Something Went Wrong
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-base text-white md:text-lg dark:text-gray-300">
            Astra Agent encountered an unexpected error.
            <br />
            Try again or{' '}
            <Link
              href="/"
              className="mt-4 font-semibold text-purple-600 underline underline-offset-3 dark:text-white"
            >
              return home.
            </Link>
          </p>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-row flex-wrap justify-center gap-4">
            <button
              onClick={reset}
              className="rounded-full bg-linear-to-r from-blue-500 to-purple-600 px-7 py-3 font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:scale-105"
            >
              Try Again
            </button>

            <button
              onClick={reloadHandler}
              className="rounded-full border border-blue-400/40 bg-white/20 px-7 py-3 font-semibold text-gray-900 backdrop-blur-md transition hover:bg-white/30 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
            >
              Reload App
            </button>
          </div>

          {/* Footer */}
          <div className="mt-8">
            <p className="text-sm text-gray-900 md:text-base dark:text-gray-400">
              Powered by{' '}
              <span className="bg-linear-to-r from-blue-600 to-fuchsia-600 bg-clip-text font-semibold text-transparent dark:from-cyan-400 dark:to-violet-500">
                Astra Agent
              </span>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
