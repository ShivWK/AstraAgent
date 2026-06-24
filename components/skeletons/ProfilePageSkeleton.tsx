const ProfilePageSkeleton = () => {
  return (
    <main className="min-h-dvh pt-20 pb-8 max-md:px-2 md:pt-26">
      <div className="mx-auto flex max-w-300 flex-col gap-5 overflow-hidden md:flex-row md:gap-1.5">
        <aside className="bg-profile-card relative flex w-full basis-full flex-col items-center gap-4 rounded-2xl p-4 pt-4.5 md:basis-[35%]">
          <div
            role="img"
            className="animate-pulse rounded-full border bg-gray-400/60 bg-linear-to-br p-1"
          >
            <div className="h-32 w-32 rounded-full" />
          </div>
          <div className="h-6 w-1/2 animate-pulse rounded-md bg-gray-400/60"></div>
          <div className="h-6 w-3/4 animate-pulse rounded-md bg-gray-400/60"></div>
          <div className="mt-2 h-24 w-full animate-pulse rounded-2xl bg-gray-400/60" />
          <div className="mt-4 h-8 w-full animate-pulse rounded-lg bg-gray-400/60" />
        </aside>

        <section className="w-full self-start p-2 md:basis-full">
          <div className="mb-5 h-45 w-full animate-pulse rounded-2xl bg-gray-400 md:w-[52%] dark:bg-gray-400/70"></div>
          <div className="bg-primary-dark-bg rounded-md p-2">
            <div className="mx-auto flex w-full flex-col gap-2">
              <div className="w-full animate-pulse rounded-xl bg-gray-400/60 p-4">
                <div className="mb-2 h-5 w-40 rounded bg-gray-400 dark:bg-gray-600" />
                <div className="h-4 w-32 rounded bg-gray-400 dark:bg-gray-600" />
              </div>

              <div className="w-full animate-pulse rounded-xl bg-gray-400/60 p-4">
                <div className="mb-2 h-5 w-40 rounded bg-gray-400 dark:bg-gray-600" />
                <div className="h-4 w-32 rounded bg-gray-400 dark:bg-gray-600" />
              </div>

              <div className="w-full animate-pulse rounded-xl bg-gray-400/60 p-4">
                <div className="mb-2 h-5 w-40 rounded bg-gray-400 dark:bg-gray-600" />
                <div className="h-4 w-32 rounded bg-gray-400 dark:bg-gray-600" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default ProfilePageSkeleton;
