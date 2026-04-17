import { useState, useEffect, useRef } from 'react';
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

  const hasGeneratedTitleRef = useRef(false);

  useEffect(() => {
    if (!conversationId || !agentId) return;

    const controller = new AbortController();
    const signal = controller.signal;

    const fetchConversation = async () => {
      setLoading(true);

      try {
        const [conversation, conversations, messages, agent] =
          await Promise.all([
            fetch(`/api/conversation/${conversationId}`, { signal }),
            fetch(
              `/api/conversation/with_agent?mode=${interactionMode || mode}&agentId=${agentId}`,
              { signal },
            ),
            fetch(`/api/messages/${conversationId}`, { signal }),
            fetch(`/api/agents/${agentId}`, { signal }),
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

        setChat(messagesData.messages || []);
        setHasMessages(messagesData.messages?.length > 0);
      } catch (err: unknown) {
        if (err instanceof DOMException && err.name === 'AbortError') return;
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

    return () => controller.abort();
  }, [conversationId, router, interactionMode, mode, setChat, agentId]);

  useEffect(() => {
    if (!conversationId) return;

    setChat([]);
    setHasMessages(false);
  }, [conversationId, setChat]);

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

  useEffect(() => {
    hasGeneratedTitleRef.current = false;
  }, [conversationId]);

  useEffect(() => {
    if (!chat || chat.length === 0) return;

    const shouldGenerate =
      chat.length >= 3 &&
      conversation?.title.trim() === 'New Chat' &&
      conversation?.isTitleGenerated === false &&
      !hasGeneratedTitleRef.current;

    if (!shouldGenerate) return;

    const generateTitle = async () => {
      hasGeneratedTitleRef.current = true;

      try {
        const messages = chat.slice(0, 5).map((msg) => ({
          role: msg.role,
          content: msg.content,
        }));

        const response = await fetch('/api/ai_generate_title', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ messages }),
        });

        const result = await response.json();

        if (!response.ok) {
          console.log(result.message);
          throw new Error("Can't generate the title");
        }

        const title = result?.title?.trim();

        const response2 = await fetch('/api/conversation/update_title', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title,
            conversationId,
          }),
        });

        const result2 = await response2.json();

        if (!response.ok) {
          throw new Error(result2.message);
        }

        setConversationHistory((prv) => {
          if (!prv) return prv;

          return prv?.map((conversation) => {
            if (conversation._id === result2.conversation._id) {
              return { ...conversation, title: result2.conversation.title };
            }

            return conversation;
          });
        });
      } catch (err) {
        console.error('Title generation failed:', err);
      }
    };

    generateTitle();
  }, [
    chat,
    conversation?.title,
    conversation?.isTitleGenerated,
    conversationId,
  ]);

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
