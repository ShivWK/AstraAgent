const PreviousChatSkeleton = () => {
  return (
    <div className="w-full">
      <div className="mt-1 mb-1.5 h-7 w-[46%] animate-pulse rounded bg-gray-300 dark:bg-white/20" />

      <div className="flex w-full flex-col gap-1">
        <div className="h-7 w-full animate-pulse rounded bg-gray-300 dark:bg-white/20" />
        <div className="h-7 w-full animate-pulse rounded bg-gray-300 dark:bg-white/20" />
        <div className="h-7 w-full animate-pulse rounded bg-gray-300 dark:bg-white/20" />
      </div>
    </div>
  );
};

export default PreviousChatSkeleton;
