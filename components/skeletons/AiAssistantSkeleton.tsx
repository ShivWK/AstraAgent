import AgentCardsSkeleton from './AgentCardsSkeleton';

const AiAssistantSkeleton = () => {
  return (
    <main className="animate-pulse pb-18">
      <div className="mx-auto max-w-300">
        <section className="w-full">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="space-y-3">
              <div className="h-9 w-72 rounded bg-gray-300 md:h-7 dark:bg-gray-700" />
              <div className="h-7 w-60 rounded bg-gray-300 md:h-5 dark:bg-gray-700" />
            </div>

            <div className="hidden h-10 w-32 rounded-full bg-gray-300 md:block dark:bg-gray-700" />
          </div>

          <AgentCardsSkeleton />

          <div className="mx-auto mt-8 h-12 w-40 rounded-full bg-gray-300 md:hidden dark:bg-gray-700" />
        </section>

        <section className="mx-auto mt-10 flex w-full flex-col gap-8 md:w-[80%] md:flex-row md:gap-50">
          <div className="rounded-xl bg-gray-300 p-4 md:basis-1/2 dark:bg-gray-700">
            <div className="mb-2 h-5 w-40 rounded bg-gray-400 dark:bg-gray-600" />
            <div className="h-4 w-32 rounded bg-gray-400 dark:bg-gray-600" />
          </div>
        </section>
      </div>
    </main>
  );
};

export default AiAssistantSkeleton;
