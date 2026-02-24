'use client';

import { logoutAction } from '@/app/actions/auth';
import useAppDispatch from '@/hooks/useAppDispatch';
import { setLogInState } from '@/features/auth/authSlice';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CircleUserRound, LogOut } from 'lucide-react';
import { Spinner } from '@/components/ui/spinner';
import Image from 'next/image';

const Page = () => {
  const [logoutLoading, setLogoutLoading] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const authClickHandler = async () => {
    setLogoutLoading(true);
    const response = await logoutAction();

    if (response.success) {
      router.push('/');
      dispatch(setLogInState(false));
    }

    setLogoutLoading(false);
  };

  return (
    <main>
      <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-1.5 overflow-hidden rounded-2xl md:flex-row">
        <aside className="flex w-full basis-full flex-col items-center gap-2 bg-blue-900 p-4 md:basis-[35%]">
          <CircleUserRound size={120} strokeWidth={0.5} />
          <p>Shivendra Dwivedi</p>
          <p className="-mt-1">shivendrawk@gmail.com</p>

          <div className="mt-2 flex w-full flex-col items-center gap-3 rounded-2xl bg-gray-900 px-6 py-2">
            <p className="text-lg font-medium">Current Balance</p>
            <p className="-mt-2 text-xl font-medium">$900</p>
            <button className="w-full rounded-md bg-blue-700 py-1">
              Recharge
            </button>
          </div>

          <button
            onClick={authClickHandler}
            className="mt-4 flex w-full items-center justify-center rounded-lg bg-red-800 py-2"
          >
            <p className="mx-auto flex items-center gap-2 text-lg font-medium">
              {logoutLoading ? (
                <Spinner data-icon="inline-start" />
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
            <div className="flex cursor-pointer items-center gap-4 rounded-md bg-gray-800 p-3 px-4 transition-all duration-150 ease-linear hover:bg-gray-900">
              <Image
                src="/assistants/general_ai.png"
                alt="agent profile"
                height={300}
                width={300}
                className="h-17 w-17 rounded-full"
              />
              <div className="mt-1 basis-full">
                <p className="font-medium">Agent Name</p>
                <p>The first chat heading...</p>
              </div>
              <div className="justify-self-end">
                <p>12/25/23</p>
              </div>
            </div>

            <div className="flex cursor-pointer items-center gap-4 rounded-md bg-gray-800 p-3 px-4 transition-all duration-150 ease-linear hover:bg-gray-900">
              <Image
                src="/assistants/general_ai.png"
                alt="agent profile"
                height={300}
                width={300}
                className="h-17 w-17 rounded-full"
              />
              <div className="mt-1 basis-full">
                <p className="font-medium">Agent Name</p>
                <p>The first chat heading...</p>
              </div>
              <div className="justify-self-end">
                <p>12/25/23</p>
              </div>
            </div>

            <div className="flex cursor-pointer items-center gap-4 rounded-md bg-gray-800 p-3 px-4 transition-all duration-150 ease-linear hover:bg-gray-900">
              <Image
                src="/assistants/general_ai.png"
                alt="agent profile"
                height={300}
                width={300}
                className="h-17 w-17 rounded-full"
              />
              <div className="mt-1 basis-full">
                <p className="font-medium">Agent Name</p>
                <p>The first chat heading...</p>
              </div>
              <div className="justify-self-end">
                <p>12/25/23</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Page;
