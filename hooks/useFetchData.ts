import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { type Conversation } from '@/types/conversation';
import { type Agent } from '@/types/agents';
import { Dispatch, SetStateAction } from 'react';
import useAppDispatch from './useAppDispatch';
import useAppSelector from './useAppSelector';
import { type Mode } from '@/features/agents/agentsSlice';
import {
  setSelectedInteractionMode,
  selectSelectedInteractionMode,
} from '@/features/agents/agentsSlice';

type PropsType = {
  conversationId: string | null;
  mode: string | null;
  agentId: string | null;
  chat: Record<string, string>[];
  setChat: Dispatch<SetStateAction<Record<string, string>[]>>;
};

const useFetchData = ({
  conversationId,
  mode,
  agentId,
  setChat,
  chat,
}: PropsType) => {
  const [loading, setLoading] = useState(true);
  const [hasMessages, setHasMessages] = useState(false);
  const [currentAgent, setCurrentAgent] = useState<Agent | null>(null);
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [conversationHistory, setConversationHistory] = useState<
    Conversation[] | null
  >(null);

  const interactionMode = useAppSelector(selectSelectedInteractionMode);

  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    if (!conversationId || !agentId) return;

    const fetchConversation = async () => {
      try {
        const [conversation, conversations, messages, agent] =
          await Promise.all([
            fetch(`/api/conversation/${conversationId}`),
            fetch(
              `/api/conversation/with_agent?mode=${interactionMode || mode}&agentId=${agentId}`,
            ),
            fetch(`/api/messages/${conversationId}`),
            fetch(`/api/agents/${agentId}`),
          ]);

        const [singleData, manyData, messagesData, agentData] =
          await Promise.all([
            conversation.json(),
            conversations.json(),
            messages.json(),
            agent.json(),
          ]);

        setConversation(singleData.conversation);
        setConversationHistory(manyData.conversation);
        setCurrentAgent(agentData.agent);

        console.log('Messages', chat, 'id', conversationId);

        if (messagesData.messages && messagesData.messages.length > 0) {
          setHasMessages(true);
          setChat(messagesData.messages);
        }
      } catch (err) {
        if (err instanceof Error) {
          console.log(err.message);
        } else {
          console.log('Random error', err);
        }

        router.replace(`/ai-assistant?mode=${mode || interactionMode}`);
      } finally {
        setLoading(false);
      }
    };

    fetchConversation();
  }, [conversationId, router, interactionMode, mode, setChat, agentId]);

  useEffect(() => {
    if (!interactionMode && mode) {
      dispatch(setSelectedInteractionMode(mode as Mode));
    } else if (!interactionMode && !mode) {
      router.push('/mode-selection');
    }
  }, [dispatch, interactionMode, mode, router]);

  useEffect(() => {
    if (chat.length > 0) {
      setHasMessages(true);
    }
  }, [chat]);

  return {
    loading,
    currentAgent,
    conversation,
    hasMessages,
    conversationHistory,
    interactionMode,
    setHasMessages,
    setConversationHistory,
  };
};

export default useFetchData;
