import { type Conversation } from '@/types/conversation';
import AgentDetails from './AgentDetails';
import PreviousChats from './PreviousChats';
import { Dispatch, SetStateAction } from 'react';

type PropsType = {
  loading: boolean;
  conversation: Conversation | null;
  conversationHistory: Conversation[] | null;
  setHistory: Dispatch<SetStateAction<Conversation[] | null>>;
};

const AISideBar = ({
  loading,
  conversation,
  conversationHistory,
  setHistory,
}: PropsType) => {
  return (
    <div className="section__agent rounded-primary flex h-full w-full flex-col pb-2">
      <AgentDetails loading={loading} conversation={conversation} />
      <PreviousChats
        conversationHistory={conversationHistory}
        setHistory={setHistory}
      />
    </div>
  );
};

export default AISideBar;
