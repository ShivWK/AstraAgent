import { type Conversation } from '@/types/conversation';
import PreviousChat from './PreviousChat';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import PreviousChatSkeleton from '@/components/skeletons/PreviousChatSkeleton';
import { useRouter } from 'next/navigation';
import { selectSelectedInteractionMode } from '@/features/agents/agentsSlice';
import useAppSelector from '@/hooks/useAppSelector';
import { useSearchParams } from 'next/navigation';
import { Spinner } from '@/components/ui/spinner';

type PropsType = {
  loading: boolean;
  conversationHistory: Conversation[] | null;
  setHistory: Dispatch<SetStateAction<Conversation[] | null>>;
  openDropDown: boolean;
  currentConversation: Conversation | null;
};

const PreviousChats = ({
  loading,
  conversationHistory,
  setHistory,
  openDropDown,
  currentConversation,
}: PropsType) => {
  const [showHistory, setShowHistory] = useState(true);
  const [conversationLoading, setConversationLoading] = useState(false);
  const mode1 = useAppSelector(selectSelectedInteractionMode);
  const searchParams = useSearchParams();
  const mode2 = searchParams.get('mode');
  const router = useRouter();

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

  const handleNewConversationCreation = async () => {
    if (conversationLoading) return;

    try {
      setConversationLoading(true);
      const response = await fetch('api/conversation/create', {
        method: 'POST',
        body: JSON.stringify({
          agentId: currentConversation?.agentId,
          agentTitle: currentConversation?.title,
          agentName: currentConversation?.agentName,
          defaultAgentModel: currentConversation?.defaultAgentModel,
          key: currentConversation?.key,
          mode: mode1 || mode2,
          newCreation: true,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }

      const conversationID = result.conversation._id;
      router.push(
        `/ai-workspace?conversation_id=${conversationID}&mode=${mode2 || mode1}&agentId=${result.conversation.agentId}`,
      );
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log(err.message);
      } else {
        console.log('Unknown error', err);
      }
    } finally {
      setConversationLoading(false);
    }
  };

  return (
    <div className="pretty-scrollbar basis-full overflow-auto">
      <h2 className="mt-3 mb-2 text-lg font-medium tracking-wide">
        Your Chats with this agent
      </h2>

      {loading ? (
        <PreviousChatSkeleton />
      ) : (
        <ul className="section__previous-chats flex min-h-0 grow-0 basis-full list-none flex-col gap-1">
          <li className="mt-0.5 mb-1">
            <button
              disabled={conversationLoading}
              onClick={handleNewConversationCreation}
              className="rounded-primary dark:bg-primary-dark-bg/70 flex shrink-0 cursor-pointer items-center gap-2 px-2 py-0.5 transition-all duration-100 ease-linear active:scale-95"
            >
              <span>Create New chat</span>
              {conversationLoading && <Spinner className="size-5" />}
            </button>
          </li>
          {conversationHistory?.map((conversation) => (
            <PreviousChat
              currentConversation={currentConversation}
              key={conversation._id}
              chat={conversation.title}
              id={conversation._id}
              setHistory={setHistory}
              agentId={conversation.agentId}
              mode={mode1 || mode2}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default PreviousChats;
