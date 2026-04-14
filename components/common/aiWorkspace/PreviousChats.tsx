import { type Conversation } from '@/types/conversation';
import PreviousChat from './PreviousChat';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

type PropsType = {
  loading: boolean;
  conversationHistory: Conversation[] | null;
  setHistory: Dispatch<SetStateAction<Conversation[] | null>>;
  openDropDown: boolean;
};

const PreviousChats = ({
  conversationHistory,
  setHistory,
  openDropDown,
}: PropsType) => {
  const [showHistory, setShowHistory] = useState(true);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (openDropDown) {
      (() => {
        setShowHistory(false);
      })();
    } else {
      timer = setTimeout(() => {
        setShowHistory(true);
      }, 250);
    }

    return () => clearTimeout(timer);
  }, [openDropDown]);

  if (!showHistory) return null;

  return (
    <div className="pretty-scrollbar basis-full overflow-auto">
      <h2 className="mt-3 mb-2 text-lg font-medium tracking-wide">
        Your Chats with this agent
      </h2>

      <ul className="section__previous-chats flex min-h-0 grow-0 basis-full list-none flex-col gap-1">
        <li className="rounded-primary dark:bg-primary-dark-bg/70 shrink-0 cursor-pointer px-2 py-0.5">
          Create New chat
        </li>
        {conversationHistory?.map((conversation) => (
          <PreviousChat
            key={conversation._id}
            chat={conversation.title}
            id={conversation._id}
            setHistory={setHistory}
          />
        ))}
      </ul>
    </div>
  );
};

export default PreviousChats;
