'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };
  return (
    <main className="flex min-h-screen items-center justify-center px-2 md:pt-15">
      <div className="w-full max-w-2xl">
        <div className="rounded-3xl border border-white/20 bg-white/10 px-2 py-4 text-center shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-black/10">
          {/* 404 */}
          <h1 className="bg-linear-to-r from-blue-700 to-purple-700 bg-clip-text text-6xl font-extrabold text-transparent md:text-8xl dark:from-cyan-400 dark:to-violet-500">
            404
          </h1>

          <h2 className="mt-4 text-2xl font-bold text-white md:text-4xl dark:text-white">
            Page Not Found
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-base text-white md:text-lg dark:text-gray-300">
            Looks like this page took a wrong turn in the galaxy.
            <br />
            Let&apos;s get you back on track.
          </p>

          {/* Buttons */}
          <div className="mt-10 flex flex-row justify-center gap-4">
            <Link
              href="/"
              className="rounded-full bg-linear-to-r from-blue-500 to-purple-600 px-7 py-3 font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:scale-105"
            >
              Go Home
            </Link>

            <button
              onClick={handleBackClick}
              className="rounded-full border border-blue-400/40 bg-white/20 px-7 py-3 font-semibold text-gray-900 backdrop-blur-md transition hover:bg-white/30 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
            >
              Go Back
            </button>
          </div>

          {/* Footer Text */}
          <div className="mt-10">
            <p className="text-sm text-gray-700 md:text-base dark:text-gray-400">
              Or explore more with{' '}
              <span className="bg-linear-to-r from-blue-700 to-purple-700 bg-clip-text font-semibold text-transparent dark:from-cyan-400 dark:to-violet-500">
                Astra Agent
              </span>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
