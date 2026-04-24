'use client';

import { useState, useEffect } from 'react';
import { LogOut, TriangleAlert } from 'lucide-react';
import { Spinner } from '@/components/ui/spinner';
import Chats from '@/components/common/Chats';
import ProfileChange from '@/components/auth/ProfileChange';
import { signOut, useSession } from 'next-auth/react';
import EmailVerificationModal from '@/components/auth/EmailVerificationModal';

const Page = () => {
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [openEmailVerificationModal, setOpenEmailVerificationModal] =
    useState(false);
  const data1 = useSession();
  // console.log('Got session data', data1);

  const { data: session, update } = data1;

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

  const handleRechargeClick = () => {
    if (logoutLoading) return;
  };

  const handleEmailVerificationClick = (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.stopPropagation();
    setOpenEmailVerificationModal(true);
  };

  return (
    <>
      <main className="max-md:-mt-4">
        <div className="mx-auto flex max-w-300 flex-col items-center gap-1.5 overflow-hidden rounded-2xl md:flex-row">
          <aside className="flex w-full basis-full flex-col items-center gap-2 bg-blue-900 p-4 pt-4.5 md:basis-[35%]">
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

            <div className="mt-2 flex w-full flex-col items-center gap-3 rounded-2xl bg-gray-900 px-6 py-2 pb-3.5">
              <p className="text-lg font-medium">Current Balance</p>
              <p className="-mt-2 text-xl font-medium">
                {session?.user?.token || 0}
              </p>
              <button
                onClick={handleRechargeClick}
                disabled={logoutLoading}
                className="w-full rounded-md bg-blue-700 py-1 text-lg tracking-wider transition-all duration-150 ease-linear active:translate-y-0.5 disabled:opacity-50 disabled:active:translate-y-0"
              >
                Recharge
              </button>
            </div>

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
          <section className="basis-full self-start p-2">
            <h2 className="mb-4 text-xl font-medium">Previous Chats</h2>
            <div className="flex flex-col gap-3">
              <Chats
                name="Agent Name"
                chat="The first chat heading..."
                date="12/02/26"
              />
              <Chats
                name="Agent Name"
                chat="The first chat heading..."
                date="12/02/26"
              />
              <Chats
                name="Agent Name"
                chat="The first chat heading..."
                date="12/02/26"
              />
            </div>
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
