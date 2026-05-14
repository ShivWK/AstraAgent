import { selectUser } from '@/features/auth/authSlice';
import useAppSelector from '@/hooks/useAppSelector';
import { User } from '@/types/user';
import { Info, CircleX } from 'lucide-react';
import { useState } from 'react';

type Props = {
  user: User;
  authLoader: boolean;
};

const TokenUsage = ({ user, authLoader }: Props) => {
  const { totalTokens, tokens } = useAppSelector(selectUser);
  const [openInfoBox, setOpenInfoBox] = useState(false);

  const usedTokens = totalTokens ? totalTokens - Math.max(0, tokens!) : 0;
  const progress = totalTokens! > 0 ? (usedTokens / totalTokens!) * 100 : 0;

  if (user?.role === 'admin') return null;

  if (authLoader) {
    return (
      <div className="mb-5 h-45 w-full animate-pulse rounded-2xl bg-gray-900 md:w-[52%]"></div>
    );
  }

  const getColor = () => {
    if (progress < 50) return 'from-green-500 to-green-400';
    if (progress < 80) return 'from-yellow-500 to-yellow-400';
    return 'from-red-500 to-red-400';
  };

  return (
    <div className="mb-5 w-full max-w-md rounded-2xl border border-[rgba(120,160,255,0.22)] bg-[#B2DEF8] p-5 shadow-lg dark:border-gray-700 dark:bg-gray-900">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-quick-cards-heading text-sm">Token Usage</p>
        <p className="text-quick-cards-subheading text-xs">
          {usedTokens} / {totalTokens}
        </p>
      </div>

      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-quick-cards-heading text-2xl font-semibold">
            {Math.max(0, tokens)?.toLocaleString()}
          </p>
          <p className="text-quick-cards-heading text-xs">Tokens Remaining</p>
        </div>

        {tokens < 0 && (
          <div className="flex flex-col">
            <p className="ml-auto text-2xl font-semibold text-red-500">
              {tokens.toLocaleString()}
            </p>
            <div className="text-quick-cards-heading relative flex items-center gap-1 text-xs md:gap-2">
              <span>Pending Adjustment</span>
              <button
                aria-label="Know about pending adjustment"
                onClick={() => setOpenInfoBox(!openInfoBox)}
                onBlur={() => setOpenInfoBox(false)}
              >
                {openInfoBox ? (
                  <CircleX aria-hidden="true" className="size-4.5" />
                ) : (
                  <Info aria-hidden="true" className="size-4.5" />
                )}
              </button>

              {openInfoBox && (
                <div className="4 absolute top-8 -left-12 z-10 w-48 rounded-md bg-[#2B7FFF] p-2 text-white drop-shadow-[0_0_5px_rgba(0,0,0,0.5)] dark:bg-blue-800">
                  <p>
                    Pending usage appears when an AI response finishes after
                    your available balance is exhausted. This amount will be
                    adjusted automatically during your next recharge.
                  </p>

                  <div className="absolute -top-4 right-3 border-t-8 border-r-8 border-b-8 border-l-8 border-t-transparent border-r-transparent border-b-[#2B7FFF] border-l-transparent dark:border-b-blue-800" />
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="relative h-2 w-full overflow-hidden rounded-full bg-gray-700">
        <div
          className={`h-full rounded-full bg-linear-to-r ${getColor()} transition-all duration-500 ease-out`}
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="text-quick-cards-subheading mt-3 flex justify-between text-xs">
        <span>{progress.toFixed(1)}% used</span>
        <span>{tokens && tokens > 0 ? 'Active' : 'Exhausted'}</span>
      </div>
    </div>
  );
};

export default TokenUsage;
