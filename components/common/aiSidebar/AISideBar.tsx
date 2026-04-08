import { type Conversation } from '@/types/conversation';
import AgentDetails from './AgentDetails';
import PreviousChats from './PreviousChats';

type PropsType = {
  loading: boolean;
  conversation: Conversation | null;
};

const AISideBar = ({ loading, conversation }: PropsType) => {
  return (
    <div className="section__agent rounded-primary flex h-full w-full flex-col pb-2">
      <AgentDetails loading={loading} conversation={conversation} />
      <PreviousChats conversation={conversation} />
    </div>
  );
};

export default AISideBar;
