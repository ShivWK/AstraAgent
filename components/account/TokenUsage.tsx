import { selectUser } from '@/features/auth/authSlice';
import useAppSelector from '@/hooks/useAppSelector';
import { User } from '@/types/user';

type Props = {
  user: User;
  authLoader: boolean;
};

const TokenUsage = ({ user, authLoader }: Props) => {
  const { totalTokens, tokens } = useAppSelector(selectUser);

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

      <div className="mb-4">
        <p className="text-quick-cards-heading text-2xl font-semibold">
          {Math.max(0, tokens)?.toLocaleString()}
        </p>
        <p className="text-quick-cards-heading text-xs">tokens remaining</p>
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
