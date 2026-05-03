'use client';

import { useState, useEffect } from 'react';
import { LogOut, TriangleAlert, Crown } from 'lucide-react';
import { Spinner } from '@/components/ui/spinner';
import ProfileChange from '@/components/common/account/ProfileChange';
import { signOut, useSession } from 'next-auth/react';
import EmailVerificationModal from '@/components/auth/EmailVerificationModal';
import ProfileCard from '@/components/common/account/ProfileCard';
import TokenUsage from '@/components/common/account/TokenUsage';
import useAppDispatch from '@/hooks/useAppDispatch';
import { setTokens } from '@/features/auth/authSlice';
import PreviousChats from '@/components/common/account/PreviousChats';

const Page = () => {
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [openEmailVerificationModal, setOpenEmailVerificationModal] =
    useState(false);
  const { data: session, update, status } = useSession();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const call = async () => {
      await update();
    };

    call();
  }, []);

  useEffect(() => {
    if (!session?.user.token || !session?.user.totalTokens) return;
    dispatch(
      setTokens({
        type: 'main',
        totalValue: session?.user.totalTokens,
        currentValue: session?.user.token,
      }),
    );
  }, [session?.user, dispatch]);

  useEffect(() => {
    if (session?.user.emailVerified) return;

    const interval = setInterval(async () => {
      const res = await fetch('/api/check_emailVerification');
      const data = await res.json();

      if (data.emailVerified) {
        await update();
        clearInterval(interval);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [update, session?.user.emailVerified]);

  const authClickHandler = async () => {
    if (logoutLoading) return;
    setLogoutLoading(true);
    await signOut({ callbackUrl: '/' });

    setLogoutLoading(false);
  };

  const handleEmailVerificationClick = (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.stopPropagation();
    setOpenEmailVerificationModal(true);
  };

  return (
    <>
      <main className="mb-10 max-md:-mt-4">
        <div className="mx-auto flex max-w-300 flex-col gap-5 overflow-hidden md:flex-row md:gap-1.5">
          <aside className="relative flex w-full basis-full flex-col items-center gap-2 rounded-2xl bg-blue-900 p-4 pt-4.5 md:basis-[35%]">
            {session?.user?.role === 'admin' && (
              <Crown
                aria-hidden="true"
                className="absolute top-2 right-2 text-yellow-400"
              />
            )}
            <ProfileChange />
            <p className="text-lg">{session?.user?.name || 'User Name'}</p>
            <p className="-mt-2 flex items-center gap-2 text-lg">
              {session?.user?.emailVerified === null && (
                <button
                  onClick={handleEmailVerificationClick}
                  aria-label="Verify Email"
                >
                  <TriangleAlert
                    aria-hidden="true"
                    size={21}
                    className="text-red-600"
                  />
                </button>
              )}
              <span>{session?.user?.email || 'User Email Address'}</span>
            </p>

            <ProfileCard logoutLoading={logoutLoading} user={session?.user} />

            <button
              onClick={authClickHandler}
              disabled={logoutLoading}
              className="mt-4 flex w-full items-center justify-center rounded-lg bg-red-800 py-2 transition-all duration-150 ease-linear active:translate-y-0.5 disabled:opacity-50 disabled:active:translate-y-0"
            >
              <p className="mx-auto flex items-center gap-2 text-lg font-medium">
                {logoutLoading ? (
                  <Spinner data-icon="inline-start" className="size-6" />
                ) : (
                  <LogOut />
                )}
                Sign Out
              </p>
            </button>
          </aside>
          <section className="w-full self-start p-2 md:basis-full">
            <TokenUsage user={session?.user} />
            <PreviousChats />
          </section>
        </div>
      </main>
      <EmailVerificationModal
        email={session?.user?.email}
        open={openEmailVerificationModal}
        setOpen={setOpenEmailVerificationModal}
      />
    </>
  );
};

export default Page;
