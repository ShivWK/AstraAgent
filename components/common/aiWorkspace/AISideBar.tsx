import { type Conversation } from '@/types/conversation';
import AgentDetails from './AgentDetails';
import PreviousChats from './PreviousChats';
import { Dispatch, SetStateAction, useState } from 'react';
import { Agent } from '@/types/agents';

type PropsType = {
  loading: boolean;
  conversation: Conversation | null;
  conversationHistory: Conversation[] | null;
  setHistory: Dispatch<SetStateAction<Conversation[] | null>>;
  currentAgent: Agent | null;
};

const AISideBar = ({
  loading,
  conversation,
  conversationHistory,
  setHistory,
  currentAgent,
}: PropsType) => {
  const [openDropdown, setOpenDropdown] = useState(false);

  return (
    <div className="section__agent rounded-primary flex h-full w-full flex-col pb-2">
      <AgentDetails
        openDropDown={openDropdown}
        setOpenDropDown={setOpenDropdown}
        loading={loading}
        conversation={conversation}
        currentAgent={currentAgent}
      />
      <PreviousChats
        loading={loading}
        openDropDown={openDropdown}
        currentConversation={conversation}
        conversationHistory={conversationHistory}
        setHistory={setHistory}
      />
    </div>
  );
};

export default AISideBar;
