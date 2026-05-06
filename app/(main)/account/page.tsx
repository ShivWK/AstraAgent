'use client';

import { useState } from 'react';
import { LogOut, TriangleAlert, Crown } from 'lucide-react';
import { Spinner } from '@/components/ui/spinner';
import ProfileChange from '@/components/account/ProfileChange';
import { signOut } from 'next-auth/react';
import EmailVerificationModal from '@/components/auth/EmailVerificationModal';
import ProfileCard from '@/components/account/ProfileCard';
import TokenUsage from '@/components/account/TokenUsage';
import { selectDbLoader, selectUser } from '@/features/auth/authSlice';
import PreviousChats from '@/components/account/PreviousChats';
import useAppSelector from '@/hooks/useAppSelector';

const Page = () => {
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [openEmailVerificationModal, setOpenEmailVerificationModal] =
    useState(false);
  const userDetails = useAppSelector(selectUser);
  const authLoader = useAppSelector(selectDbLoader);

  const authClickHandler = async () => {
    if (logoutLoading) return;
    setLogoutLoading(true);
    await signOut({ redirect: false });

    window.location.replace('/');
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
            {userDetails?.role === 'admin' && (
              <Crown
                aria-hidden="true"
                className="absolute top-2 right-2 text-yellow-400"
              />
            )}
            <ProfileChange user={userDetails} />
            <p className="text-lg">{userDetails?.name || 'User Name'}</p>
            <p className="-mt-2 flex items-center gap-2 text-lg">
              {userDetails?.emailVerified === null && !authLoader && (
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
              <span>{userDetails.email || 'User Email Address'}</span>
            </p>

            <ProfileCard
              logoutLoading={logoutLoading}
              user={userDetails}
              authLoader={authLoader}
            />

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
            <TokenUsage user={userDetails} authLoader={authLoader} />
            <PreviousChats />
          </section>
        </div>
      </main>
      <EmailVerificationModal
        email={userDetails.email}
        open={openEmailVerificationModal}
        setOpen={setOpenEmailVerificationModal}
      />
    </>
  );
};

export default Page;
