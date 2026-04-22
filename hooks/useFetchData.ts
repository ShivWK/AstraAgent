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
  const interactionMode = useAppSelector(selectSelectedInteractionMode);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [state, setState] = useState<{
    loading: boolean;
    conversation: Conversation | null;
    conversationHistory: Conversation[] | null;
    currentAgent: Agent | null;
  }>({
    loading: false,
    conversation: null,
    conversationHistory: null,
    currentAgent: null,
  });
  const [hasMessage, setHasMessage] = useState(false);

  const abortRef = useRef<AbortController | null>(null);
  const requestIdRef = useRef(0);
  const hasGeneratedTitleRef = useRef(false);

  const isReady = conversationId && agentId;

  useEffect(() => {
    if (!interactionMode && mode) {
      dispatch(setSelectedInteractionMode(mode as Mode));
    } else if (!interactionMode && !mode) {
      router.push('/mode-selection');
    }
  }, [interactionMode, mode, dispatch, router]);

  useEffect(() => {
    if (!isReady) return;

    abortRef.current?.abort();

    const controller = new AbortController();
    abortRef.current = controller;

    const currentRequestId = ++requestIdRef.current;

    const fetchData = async () => {
      setState((prev) => ({ ...prev, loading: true }));

      try {
        const [convRes, listRes, msgRes, agentRes] = await Promise.all([
          fetch(`/api/conversation/${conversationId}`, {
            signal: controller.signal,
          }),
          fetch(
            `/api/conversation/with_agent?mode=${
              interactionMode || mode
            }&agentId=${agentId}`,
            { signal: controller.signal },
          ),
          fetch(`/api/messages/${conversationId}`, {
            signal: controller.signal,
          }),
          fetch(`/api/agents/${agentId}`, {
            signal: controller.signal,
          }),
        ]);

        const [convData, listData, msgData, agentData] = await Promise.all([
          convRes.json(),
          listRes.json(),
          msgRes.json(),
          agentRes.json(),
        ]);

        // Each request gets a unique id (currentRequestId) captured in its closure.
        // requestIdRef.current always holds the latest request id.
        // When a response resolves, we compare both:
        // if they don’t match → it means a newer request was made → ignore stale result.
        // This prevents race conditions where older responses override newer data.

        if (requestIdRef.current !== currentRequestId) return;

        const messages = msgData.messages || [];

        setState({
          loading: false,
          conversation: convData.conversation,
          conversationHistory: listData.conversation,
          currentAgent: agentData.agent,
        });

        setChat(messages);
        setHasMessage(messages.length > 0);
      } catch (err: unknown) {
        if (err instanceof DOMException && err.name === 'AbortError') return;

        console.error(err);
        router.replace(`/ai-assistant?mode=${mode || interactionMode}`);
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [
    conversationId,
    agentId,
    interactionMode,
    mode,
    isReady,
    router,
    setChat,
  ]);

  useEffect(() => {
    if (!conversationId) return;

    setChat([]);
    setHasMessage(false);
    hasGeneratedTitleRef.current = false;
  }, [conversationId, setChat]);

  useEffect(() => {
    if (!chat || chat.length === 0 || hasGeneratedTitleRef.current) return;

    const shouldGenerate =
      chat.length >= 4 &&
      state.conversation?.title.trim() === 'New Chat' &&
      state.conversation?.isTitleGenerated === false;

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

        setState((prv) => {
          if (!prv.conversationHistory) return prv;

          return {
            ...prv,
            conversationHistory: prv.conversationHistory!.map((c) => {
              if (c._id === conversationId) {
                return { ...c, title };
              }

              return c;
            }),
          };
        });
      } catch (err) {
        console.error('Title generation failed:', err);
      }
    };

    generateTitle();
  }, [
    chat,
    state.conversation?.title,
    state.conversation?.isTitleGenerated,
    conversationId,
  ]);

  return {
    ...state,
    hasMessage,
    interactionMode,
    setHasMessage,
    setState,
  };
};

export default useFetchData;
