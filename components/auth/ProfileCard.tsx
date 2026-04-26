import { ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import RechargeModal from './RechargeModal';

interface Props {
  user:
    | ({
        id: string;
        role: 'user' | 'admin';
        token: number;
        totalTokens?: number | undefined;
        emailVerified: Date | null;
      } & {
        name?: string | null | undefined;
        email?: string | null | undefined;
        image?: string | null | undefined;
      })
    | undefined;
  logoutLoading?: boolean;
}

export default function ProfileCard({ user, logoutLoading }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const handleRechargeClick = () => {
    if (logoutLoading) return;
    setIsOpen(true);
  };

  console.log('User data:', user);

  if (!user)
    return (
      <div className="mt-2 h-24 w-full animate-pulse rounded-2xl bg-gray-900"></div>
    );

  return user!.role === 'admin' ? (
    <div className="mt-2 flex w-full items-center gap-3 rounded-2xl bg-gray-900 px-6 py-4">
      <div className="rounded-full bg-linear-to-r from-yellow-400 to-orange-500 p-3 shadow-[0_0_20px_rgba(255,165,0,0.4)]">
        <ShieldCheck className="h-7 w-7 text-white" />
      </div>

      <div className="flex flex-col">
        <h2 className="text-xl font-semibold text-white">Admin</h2>
        <p className="text-sm text-gray-400">Full Access Control</p>
      </div>
    </div>
  ) : (
    <>
      <div className="mt-2 flex w-full flex-col items-center gap-3 rounded-2xl bg-gray-900 px-6 py-2 pb-3.5">
        <p className="text-lg font-medium">Current Balance</p>
        <p className="-mt-2 text-xl font-medium">{user!.token || 0}</p>
        <button
          onClick={handleRechargeClick}
          disabled={logoutLoading}
          className="w-full rounded-md bg-blue-700 py-1 text-lg tracking-wider transition-all duration-150 ease-linear active:translate-y-0.5 disabled:opacity-50 disabled:active:translate-y-0"
        >
          Recharge
        </button>
      </div>
      <RechargeModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onProceed={() => {}}
      />
    </>
  );
}
