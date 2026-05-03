'use client';

import { ChevronLeft, ArrowDown } from 'lucide-react';
import AISideBar from '@/components/common/aiWorkspace/AISideBar';
import {
  selectOpenSidebar,
  setOpenSidebar,
  setSelectedInteractionMode,
} from '@/features/agents/agentsSlice';
import useAppSelector from '@/hooks/useAppSelector';
import useAppDispatch from '@/hooks/useAppDispatch';
import ChatBox from '@/components/common/aiWorkspace/Chatbox';
import Modal from '@/components/common/Modal';
import TextInputMethod from '@/components/common/aiWorkspace/TextInputMethod';
import { useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { type Mode } from '@/features/agents/agentsSlice';
import SampleQuestions from './SampleQuestions';
import useFetchData from '@/hooks/useFetchData';
import ChatSkeleton from '@/components/skeletons/ChatSkeleton';
import useToast from '@/hooks/useToast';
import { showToast } from '@/utils/showToast';
import useTts from '@/hooks/useTts';

import useSocket from '@/hooks/useSocket';

const AiWorkspace = () => {
  const { ToastContainer, triggerToast } = useToast('top-right');
  const searchParam = useSearchParams();
  const conversationId = searchParam.get('conversation_id');
  const agentId = searchParam.get('agentId');
  const mode = searchParam.get('mode');

  const isSidebarOpen = useAppSelector(selectOpenSidebar);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isAtBottom, setIsAtBottom] = useState(false);

  const {
    chat,
    streamMessage,
    error,
    sendMessage,
    stopStream,
    setChat,
    connected,
    streaming,
    modelLoading,
    setError,
    aiStarted,
  } = useSocket(conversationId as string);

  const {
    loading,
    currentAgent,
    conversation,
    conversationHistory,
    hasMessage,
    interactionMode,
    setHasMessage,
    setState,
  } = useFetchData({ conversationId, mode, agentId, setChat, chat });

  const {
    play,
    pause,
    resume,
    stop,
    seek,
    progress,
    isPaused,
    loadingId,
    activeId,
  } = useTts();

  useEffect(() => {
    const ele = containerRef.current;
    if (!ele || loading || !hasMessage) return;

    ele.scrollTo({
      top: ele.scrollHeight,
      behavior: 'smooth',
    });
  }, [loading, hasMessage]);

  useEffect(() => {
    if (!interactionMode && mode) {
      dispatch(setSelectedInteractionMode(mode as Mode));
    } else if (!interactionMode && !mode) {
      router.push('/mode-selection');
    }
  }, [dispatch, interactionMode, mode, router]);

  useEffect(() => {
    if (!error) return;

    showToast({
      message:
        (error as string) ||
        'Model not available. Please switch to another model.',
      type: 'error',
      trigger: triggerToast,
    });

    setError(null);
  }, [error, setError, triggerToast]);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    if (isAtBottom) {
      element.scrollTo({
        top: element.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [streamMessage, chat, isAtBottom]);

  const isNearBottom = (ele: HTMLDivElement) => {
    const THRESHOLD = 100;
    return ele.scrollHeight - ele.scrollTop - ele.clientHeight < THRESHOLD;
  };

  const scrollHandler = () => {
    const el = containerRef.current;
    if (!el) return;

    const atBottom = isNearBottom(el);
    setIsAtBottom(atBottom);
  };

  const downButtonClickHandler = () => {
    const ele = containerRef.current;
    if (!ele) return;

    ele.scrollTo({
      top: ele.scrollHeight,
      behavior: 'smooth',
    });

    setIsAtBottom(true);
  };

  console.log('Modal Loading', modelLoading);

  return (
    <>
      <main className="md:pr-1 md:pl-2">
        <div className="flex items-center gap-2">
          <aside className="hidden h-screen w-104 overflow-x-visible pt-18 pb-0.5 md:block">
            <AISideBar
              loading={loading}
              conversation={conversation}
              conversationHistory={conversationHistory}
              setHistory={setState}
              currentAgent={currentAgent}
            />
          </aside>
          <section
            className={`section__chat rounded-primary relative flex h-screen w-full flex-col items-center`}
          >
            <div className="section__chat-box relative w-full basis-full overflow-auto">
              {!hasMessage && connected && (
                <SampleQuestions
                  setHasMessages={setHasMessage}
                  sendMessage={sendMessage}
                  loading={loading}
                  connected={connected}
                  sampleQuestions={currentAgent?.sampleQuestions}
                  mode={mode || interactionMode}
                />
              )}
              <div
                ref={containerRef}
                onScroll={scrollHandler}
                className={`pretty-scrollbar relative h-full w-full overflow-auto px-2 pt-20 pb-32 md:px-4`}
              >
                {(loading || !connected) && <ChatSkeleton />}

                {chat.length > 0 &&
                  connected &&
                  chat.map((item, index) => {
                    const writer = item.role as 'assistant' | 'user' | 'system';

                    if (writer === 'assistant') {
                      return (
                        <ChatBox
                          key={index}
                          writer="assistant"
                          chat={item}
                          play={play}
                          activeId={activeId}
                          stop={stop}
                          loadingId={loadingId}
                          isPaused={isPaused}
                          progress={progress}
                          pause={pause}
                          resume={resume}
                          seek={seek}
                        />
                      );
                    }

                    if (writer === 'user') {
                      return <ChatBox key={index} writer="user" chat={item} />;
                    }

                    return (
                      <ChatBox
                        key={index}
                        writer="system"
                        chat={item.content}
                      />
                    );
                  })}

                {modelLoading && !streaming && (
                  <div className="mb-4 flex items-center gap-2">
                    <div className="h-3.5 w-3.5 animate-pulse rounded-full bg-white/70" />
                    <p className="text-gray-400">
                      {aiStarted ? 'Astra is typing...' : 'Thinking...'}
                    </p>
                  </div>
                )}

                {streamMessage !== '' && (
                  <ChatBox writer="system" chat={streamMessage} />
                )}
              </div>

              <div className="pointer-events-none absolute right-0 bottom-0 left-0 z-20 h-30 bg-linear-to-t from-black from-15% to-transparent to-70%" />
            </div>
            <TextInputMethod
              setHasMessage={setHasMessage}
              sendMessage={sendMessage}
              stopStream={stopStream}
              streaming={streaming}
              loading={modelLoading}
              dbLoading={loading}
              connected={connected}
            />
            {!isAtBottom && !loading && hasMessage && (
              <button
                onClick={downButtonClickHandler}
                aria-label="Go to bottom"
                className="absolute bottom-22 left-1/2 -translate-x-1/2 transform animate-bounce rounded-full bg-gray-700/70 p-1 opacity-90 md:bottom-28"
              >
                <ArrowDown aria-hidden="true" strokeWidth={1.5} />
              </button>
            )}
          </section>
        </div>
        <Modal
          open={isSidebarOpen}
          onClose={() => dispatch(setOpenSidebar(false))}
          showClasses="translate-x-0"
          hideClasses="-translate-x-full"
          className="fixed top-0 left-0 h-screen w-3/4 py-2 backdrop-blur-xl"
        >
          <>
            <button
              className="mt-2 mb-2 ml-3 w-fit rounded-full bg-blue-900 p-2"
              onClick={() => dispatch(setOpenSidebar(false))}
            >
              <ChevronLeft size={27} aria-hidden="true" />
            </button>
            <div className="h-[92%] w-full p-1">
              <AISideBar
                loading={loading}
                conversation={conversation}
                conversationHistory={conversationHistory}
                setHistory={setState}
                currentAgent={currentAgent}
              />
            </div>
          </>
        </Modal>
      </main>
      {ToastContainer}
    </>
  );
};

export default AiWorkspace;
