'use client';

import { ChevronLeft, ArrowDown } from 'lucide-react';
import AISideBar from '@/components/common/aiSidebar/AISideBar';
import {
  selectOpenSidebar,
  setOpenSidebar,
  selectSelectedInteractionMode,
  setSelectedInteractionMode,
} from '@/features/agents/agentsSlice';
import useAppSelector from '@/hooks/useAppSelector';
import useAppDispatch from '@/hooks/useAppDispatch';
import ChatBox from '@/components/common/aiWorkspace/Chatbox';
import Drawer from '@/components/common/Modal';
import TextInputMethod from '@/components/common/aiWorkspace/TextInputMethod';
import AudioInputMethod from '@/components/common/aiWorkspace/AudioInputMethod';
import { useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { type Conversation } from '@/types/conversation';
import { type Mode } from '@/features/agents/agentsSlice';
import useChatSocket from '@/hooks/useChatSocket';

const AiWorkspace = () => {
  const searchParam = useSearchParams();
  const conversationId = searchParam.get('conversation_id');
  const agentId = searchParam.get('agentId');

  const {
    chat,
    streamMessage,
    error,
    sendMessage,
    stopStream,
    setChat,
    setStreamMessage,
    streaming,
  } = useChatSocket(conversationId as string);

  const [loading, setLoading] = useState(true);
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [conversationHistory, setConversationHistory] = useState<
    Conversation[] | null
  >(null);
  const [canScroll, setCanScroll] = useState(true);
  const hasAutoScrolled = useRef(false);
  const isSidebarOpen = useAppSelector(selectOpenSidebar);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const interactionMode = useAppSelector(selectSelectedInteractionMode);
  const mode = searchParam.get('mode');
  const dispatch = useAppDispatch();
  const router = useRouter();

  const closeHandler = () => {
    dispatch(setOpenSidebar(false));
    window.history.back();
  };

  useEffect(() => {
    if (!interactionMode && mode) {
      dispatch(setSelectedInteractionMode(mode as Mode));
    } else if (!interactionMode && !mode) {
      router.push('/mode-selection');
    }
  }, [dispatch, interactionMode, mode, router]);

  useEffect(() => {
    const fetchConversation = async () => {
      try {
        const [conversation, conversations] = await Promise.all([
          fetch(`/api/conversation/${conversationId}`),
          fetch(
            `/api/conversation/with_agent?mode=${interactionMode || mode}&agentId=${agentId}`,
          ),
        ]);

        const [singleData, manyData] = await Promise.all([
          conversation.json(),
          conversations.json(),
        ]);

        setConversation(singleData.conversation);
        setConversationHistory(manyData.conversation);
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
  }, [conversationId, router, interactionMode, mode, agentId]);

  console.log('history conversations', conversationHistory);

  const isNearBottom = (ele: HTMLDivElement) => {
    return ele.scrollHeight - ele.scrollTop - ele.clientHeight < 100;
  };

  useEffect(() => {
    const element = bottomRef.current;
    if (!element) return;

    if (isNearBottom(element) && canScroll) {
      hasAutoScrolled.current = true;
      element.scrollIntoView({
        behavior: 'smooth',
      });
    }

    setTimeout(() => {
      hasAutoScrolled.current = false;
    }, 2000);
  }, [streamMessage, chat, canScroll]);

  // const scrollHandler = () => {
  //   if (hasAutoScrolled.current) return;
  //   setCanScroll(false);
  // }

  // console.log('Chat state', chat);

  return (
    <main className="md:pr-1 md:pl-2">
      <div className="flex items-center gap-2">
        <aside className="hidden h-screen w-104 overflow-x-visible pt-18 pb-0.5 md:block">
          <AISideBar
            loading={loading}
            conversation={conversation}
            conversationHistory={conversationHistory}
            setHistory={setConversationHistory}
          />
        </aside>
        <section
          className={`section__chat rounded-primary relative flex h-screen w-full flex-col items-center`}
        >
          <div className="section__chat-box relative w-full basis-full overflow-auto">
            <div
              // onScroll={scrollHandler}
              className={`pretty-scrollbar relative h-full w-full overflow-auto px-2 pt-20 ${interactionMode === 'text' ? 'pb-24' : 'pb-8'} md:px-4`}
            >
              {chat.length > 0 &&
                chat.map((item, index) => (
                  <ChatBox key={index} writer={item.role} chat={item.content} />
                ))}

              {streamMessage !== '' && (
                <ChatBox writer="system" chat={streamMessage} />
              )}

              <div ref={bottomRef} />
            </div>

            <div
              className={`${mode === 'text' || interactionMode === 'text' ? 'h-30' : 'h-20'} pointer-events-none absolute right-0 bottom-0 left-0 z-20 bg-linear-to-t from-black from-15% to-transparent to-70%`}
            />
          </div>
          {mode === 'text' || interactionMode === 'text' ? (
            <TextInputMethod
              error={error}
              sendMessage={sendMessage}
              stopStream={stopStream}
              streaming={streaming}
              setCanScroll={setCanScroll}
            />
          ) : (
            <AudioInputMethod setStream={setStreamMessage} setChat={setChat} />
          )}
          {/* {!canScroll && (
            <button
              onClick={() => setCanScroll(true)}
              aria-label="Go to bottom"
              className="absolute bottom-26 md:bottom-28 left-1/2 -translate-x-1/2 transform animate-bounce rounded-full bg-gray-700/50 p-1 opacity-80"
            >
              <ArrowDown aria-hidden="true" strokeWidth={1.5} />
            </button>
          )} */}
        </section>
      </div>
      <Drawer
        open={isSidebarOpen}
        onClose={closeHandler}
        showClasses="translate-x-0"
        hideClasses="-translate-x-full"
        className="fixed top-0 left-0 h-screen w-3/4 py-2 backdrop-blur-xl"
      >
        <>
          <button
            className="mt-2 mb-2 ml-3 w-fit rounded-full bg-blue-900 p-2"
            onClick={closeHandler}
          >
            <ChevronLeft size={27} aria-hidden="true" />
          </button>
          <div className="h-[92%] w-full p-1">
            <AISideBar
              loading={loading}
              conversation={conversation}
              conversationHistory={conversationHistory}
              setHistory={setConversationHistory}
            />
          </div>
        </>
      </Drawer>
    </main>
  );
};

export default AiWorkspace;
