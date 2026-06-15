import { useState, useMemo } from 'react';
import Conversations from './Conversations';
import { useConversations } from '@/hooks/queries/conversation/useConversations';

const PreviousConversations = ({ big = false }: { big?: boolean }) => {
  const [lastIndex, setLastIndex] = useState(3);

  const { conversations, isLoading } = useConversations();

  const previousChatsToShow = useMemo(() => {
    if (!conversations) return null;

    const cleaned = Object.fromEntries(
      Object.entries(conversations).filter(
        ([_, agentData]) => agentData.conversations?.length > 0,
      ),
    );

    return Object.fromEntries(Object.entries(cleaned).slice(0, lastIndex));
  }, [conversations, lastIndex]);

  const moreClickHandler = () => {
    setLastIndex((prv) => prv + 3);
  };

  const isFull =
    conversations &&
    previousChatsToShow &&
    Object.keys(previousChatsToShow).length ===
      Object.keys(conversations).length;

  return (
    <div>
      <h2
        className={`${big ? 'mb-2 text-xl md:text-2xl' : 'mb-4'} w-full text-xl font-semibold text-white`}
      >
        Previous Chats
      </h2>
      <div className="bg-primary-dark-bg rounded-md p-1">
        {isLoading ? (
          <div className="flex flex-col gap-3 p-1">
            <div className="h-16 w-full animate-pulse rounded-md bg-gray-500" />
            <div className="h-16 w-full animate-pulse rounded-md bg-gray-500" />
          </div>
        ) : (
          previousChatsToShow &&
          Object.entries(previousChatsToShow!).length !== 0 && (
            <Conversations history={previousChatsToShow!} hideHeading={true} />
          )
        )}

        {!previousChatsToShow && !isLoading && (
          <p className="py-6 text-center text-white">
            No previous chats available
          </p>
        )}
      </div>

      {!isLoading && previousChatsToShow && !isFull && (
        <button
          onClick={moreClickHandler}
          disabled={isFull || isLoading}
          className="mx-auto mt-4 mb-1 block rounded bg-blue-700 px-4 py-1 font-normal tracking-wider text-white transition-all duration-150 ease-linear active:translate-y-0.5 disabled:opacity-50 disabled:active:translate-y-0"
        >
          More
        </button>
      )}
    </div>
  );
};

export default PreviousConversations;
