'use client';

const AgentCardsSkeleton = () => {
  return (
    <section className="relative h-fit">
      <div className="carousel hide-scrollbar">
        <div className="carousel_group mt-5 mb-2 flex gap-5 md:my-6 md:gap-8 md:pr-8 md:pl-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="rounded-primary flex shrink-0 grow-0 flex-col items-center gap-2 border-2 border-blue-400 px-4 py-5 backdrop-blur-md"
            >
              {/* Image skeleton */}
              <div className="h-34 w-34 animate-pulse rounded-full border-2 border-blue-400 bg-gray-300 dark:bg-gray-700" />

              <div className="mt-2 h-4 w-20 animate-pulse rounded bg-gray-300 dark:bg-gray-700" />

              <div className="h-4 w-24 animate-pulse rounded bg-gray-300 dark:bg-gray-700" />
            </div>
          ))}
        </div>
      </div>

      {/* Fake scroll indicator */}
      <div className="absolute -bottom-4 left-1/2 flex w-[18%] -translate-x-1/2 items-center gap-3 md:-bottom-3">
        <div className="h-2 w-full rounded-2xl border border-blue-400">
          <div className="h-full w-1/3 animate-pulse rounded-2xl bg-blue-400"></div>
        </div>
      </div>
    </section>
  );
};

export default AgentCardsSkeleton;
