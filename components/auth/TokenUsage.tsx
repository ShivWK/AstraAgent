type Props = {
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
};

const TokenUsage = ({ user }: Props) => {
  const totalTokens = user?.totalTokens;
  const remainingTokens = user?.token;
  const usedTokens = totalTokens ? totalTokens - remainingTokens! : 0;
  const progress = totalTokens! > 0 ? (usedTokens / totalTokens!) * 100 : 0;

  if (user?.role === 'admin') return null;

  if (!user) {
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
    <div className="mb-5 w-full max-w-md rounded-2xl border border-gray-700 bg-gray-900 p-5 shadow-lg">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-gray-400">Token Usage</p>
        <p className="text-xs text-gray-500">
          {usedTokens} / {totalTokens}
        </p>
      </div>

      <div className="mb-4">
        <p className="text-2xl font-semibold text-white">
          {remainingTokens?.toLocaleString()}
        </p>
        <p className="text-xs text-gray-400">tokens remaining</p>
      </div>

      <div className="relative h-2 w-full overflow-hidden rounded-full bg-gray-700">
        <div
          className={`h-full rounded-full bg-linear-to-r ${getColor()} transition-all duration-500 ease-out`}
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="mt-3 flex justify-between text-xs text-gray-400">
        <span>{progress.toFixed(1)}% used</span>
        <span>
          {remainingTokens && remainingTokens > 0 ? 'Active' : 'Exhausted'}
        </span>
      </div>
    </div>
  );
};

export default TokenUsage;
