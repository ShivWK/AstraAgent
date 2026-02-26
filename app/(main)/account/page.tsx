'use client';

import { logoutAction } from '@/app/actions/auth';
import useAppDispatch from '@/hooks/useAppDispatch';
import { setLogInState } from '@/features/auth/authSlice';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CircleUserRound, LogOut } from 'lucide-react';
import { Spinner } from '@/components/ui/spinner';
import Chats from '@/components/common/Chats';

const Page = () => {
  const [logoutLoading, setLogoutLoading] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const authClickHandler = async () => {
    if (logoutLoading) return;
    try {
      setLogoutLoading(true);
      const response = await logoutAction();

      if (response.success) {
        router.push('/');
        dispatch(setLogInState(false));
      }
    } finally {
      setLogoutLoading(false);
    }
  };

  const handleRechargeClick = () => {
    if (logoutLoading) return;
  };

  return (
    <main className="max-md:-mt-4">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-1.5 overflow-hidden rounded-2xl md:flex-row">
        <aside className="flex w-full basis-full flex-col items-center gap-2 bg-blue-900 p-4 md:basis-[35%]">
          <CircleUserRound size={120} strokeWidth={0.5} />
          <p className="text-lg">Shivendra Dwivedi</p>
          <p className="-mt-2 text-lg">shivendrawk@gmail.com</p>

          <div className="mt-2 flex w-full flex-col items-center gap-3 rounded-2xl bg-gray-900 px-6 py-2 pb-3.5">
            <p className="text-lg font-medium">Current Balance</p>
            <p className="-mt-2 text-xl font-medium">$900</p>
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
  );
};

export default Page;
