import { useEffect, useState } from 'react';
import groupByAgent from '@/utils/groupByAgent';
import { Conversation } from '@/types/conversation';
import Chats from '../aiAssistants/PreviousChats';

const PreviousChats = () => {
  const [loading, setLoading] = useState(true);
  const [previousChats, setPreviousChats] = useState<Record<
    string,
    Record<string, string | Conversation[]>
  > | null>(null);
  const [previousChatsToShow, setPreviousChatsToShow] = useState<Record<
    string,
    Record<string, string | Conversation[]>
  > | null>(null);
  const [lastIndex, setLastIndex] = useState(3);
  const [isFull, setIsFull] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/conversation?mode=text');
        const result = await response.json();

        if (!response.ok) {
          throw new Error('Something went wrong', result.message);
        }

        setPreviousChats(groupByAgent(result.conversations));
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.log(err.message);
        }

        console.log('Unexpected Error:', err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!previousChats) return;

    const toShow = Object.entries(previousChats).slice(0, lastIndex);
    const final = Object.fromEntries(toShow);

    console.log('1st 3', final);
    setPreviousChatsToShow(final);
    setLoading(false);
  }, [previousChats, lastIndex]);

  useEffect(() => {
    if (!previousChats || !previousChatsToShow) return;

    const full =
      Object.entries(previousChatsToShow).length ===
      Object.entries(previousChats).length;
    setIsFull(full);
  }, [previousChatsToShow, previousChats]);

  const moreClickHandler = () => {
    setLastIndex((prv) => prv + 3);
  };

  return (
    <div>
      <h2 className="mb-4 text-xl font-medium">Previous Chats</h2>
      <div className="bg-primary-dark-bg flex flex-col gap-3 rounded p-1">
        {!loading ? (
          Object.entries(previousChatsToShow!).length !== 0 && (
            <Chats
              history={previousChatsToShow!}
              setHistory={setPreviousChatsToShow}
              hideHeading={true}
            />
          )
        ) : (
          <div className="flex flex-col gap-3">
            <div className="h-16 w-full animate-pulse rounded bg-gray-500/70" />
            <div className="h-16 w-full animate-pulse rounded bg-gray-500/70" />
            <div className="h-16 w-full animate-pulse rounded bg-gray-500/70" />
          </div>
        )}
      </div>

      {!loading && (
        <button
          onClick={moreClickHandler}
          disabled={isFull || loading}
          className="mx-auto mt-4 mb-1 block rounded bg-blue-700 px-4 py-1 tracking-wider transition-all duration-150 ease-linear active:translate-y-0.5 disabled:opacity-50 disabled:active:translate-y-0"
        >
          More
        </button>
      )}
    </div>
  );
};

export default PreviousChats;
