const AgentDetailsSkeleton = () => {
  return (
    <div className="section__agent-card dark:bg-primary-dark-bg h-auto animate-pulse rounded-lg p-2">
      {/* Top Section */}
      <div className="section__agent-card rounded-primary dark:bg-primary-dark-bg mt-1 flex w-full flex-col items-center gap-2 md:flex-row md:gap-4 md:pl-2">
        {/* Image */}
        <div className="h-28 w-28 rounded-full bg-gray-400 md:h-23 md:w-23 dark:bg-gray-500" />

        {/* Text */}
        <div className="flex w-full flex-col items-center gap-2 md:w-auto md:items-start">
          <div className="h-6 w-28 rounded bg-gray-400 md:w-40 dark:bg-gray-500" />
          <div className="flex flex-col gap-1 md:gap-2">
            <div className="h-4 w-42 rounded bg-gray-400 md:w-24 dark:bg-gray-500" />
            <div className="hidden h-4 w-32 rounded bg-gray-400 md:block dark:bg-gray-500" />
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="my-3 w-full space-y-3">
        <div className="h-3 w-full rounded bg-gray-400 dark:bg-gray-500" />
        <div className="h-3 w-10 rounded bg-gray-400 md:w-5/6 dark:bg-gray-500" />
        {/* <div className="h-2 w-4/6 bg-gray-400 dark:bg-gray-500 rounded" /> */}
      </div>

      {/* Expandable Section */}
      <div
        className="mt-3 w-full rounded-lg bg-linear-to-tr from-blue-500 to-gray-400/30 backdrop-blur-md"
        style={{
          height: '3.5rem',
        }}
      >
        <div className="relative p-2">
          {/* Chevron */}
          <div className="absolute top-2 right-2 h-5 w-5 rounded bg-gray-400 dark:bg-gray-500" />

          {/* Model Info */}
          <div className="space-y-2">
            <div className="h-4 w-32 rounded bg-gray-400 dark:bg-gray-500" />
            <div className="h-4 w-48 rounded bg-gray-400 dark:bg-gray-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentDetailsSkeleton;
