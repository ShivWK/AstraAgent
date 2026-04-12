import { type Conversation } from '@/types/conversation';
import PreviousChat from '../PreviousChat';
import { Dispatch, SetStateAction } from 'react';

type PropsType = {
  conversationHistory: Conversation[] | null;
  setHistory: Dispatch<SetStateAction<Conversation[] | null>>;
};

const PreviousChats = ({ conversationHistory, setHistory }: PropsType) => {
  return (
    <div>
      <h2 className="mt-2 mb-1.5 text-lg font-medium tracking-wide">
        Your Chats with this agent
      </h2>

      <ul className="section__previous-chats pretty-scrollbar flex min-h-0 grow-0 basis-full list-none flex-col gap-1 overflow-auto">
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
