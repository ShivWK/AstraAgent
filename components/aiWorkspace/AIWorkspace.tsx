'use client';

import { ArrowDown } from 'lucide-react';
import { setSelectedInteractionMode } from '@/features/agents/agentsSlice';
import useAppDispatch from '@/hooks/useAppDispatch';
import ChatBox from '@/components/aiWorkspace/Chatbox';
import TextInputMethod from '@/components/aiWorkspace/TextInputMethod';
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
import SideBar from './SideBar';
import RenameModal from './RenameModal';
import useAppSelector from '@/hooks/useAppSelector';
import {
  closeRenameModal,
  selectRenameModalData,
} from '@/features/workspace/workspaceSlice';

const AiWorkspace = () => {
  const { ToastContainer, triggerToast } = useToast('top-right');
  const searchParam = useSearchParams();
  const conversationId = searchParam.get('conversation_id');
  const agentId = searchParam.get('agentId');
  const mode = searchParam.get('mode');

  const dispatch = useAppDispatch();
  const renameModalData = useAppSelector(selectRenameModalData);
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [isAtBottom, setIsAtBottom] = useState(false);
  const [overflowing, setOverflowing] = useState(false);

  const shouldAutoScrollRef = useRef(true);
  const lastScrollTopRef = useRef(0);

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
      message: 'Something went wrong. Try changing AI Model.',
      type: 'error',
      trigger: triggerToast,
    });

    setError(null);
  }, [error, setError, triggerToast]);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    if (shouldAutoScrollRef.current) {
      element.scrollTo({
        top: element.scrollHeight,
        behavior: streaming ? 'auto' : 'smooth',
      });
    }
  }, [streamMessage, chat, streaming]);

  useEffect(() => {
    const ele = containerRef.current;
    if (!ele) return;

    const wheelHandler = (e: WheelEvent) => {
      if (e.deltaY < 0) {
        shouldAutoScrollRef.current = false;
      }
    };

    ele.addEventListener('wheel', wheelHandler, { passive: true });

    return () => ele.removeEventListener('wheel', wheelHandler);
  }, []);

  useEffect(() => {
    const call = () => {
      const ele = containerRef.current;
      if (!ele) return;

      const scrollH = ele.scrollHeight;
      const clientH = ele.clientHeight;

      if (scrollH > clientH) {
        setOverflowing(true);
      }
    };

    call();
  }, [chat, hasMessage]);

  const ENABLE_THRESHOLD = 80;
  const DISABLE_THRESHOLD = 160;
  const SCROLL_BUFFER = 5;

  const scrollHandler = () => {
    const ele = containerRef.current;
    if (!ele) return;

    const currentScrollTop = ele.scrollTop;

    if (currentScrollTop < lastScrollTopRef.current - SCROLL_BUFFER) {
      shouldAutoScrollRef.current = false;
    }

    const distanceFromBottom =
      ele.scrollHeight - ele.scrollTop - ele.clientHeight;

    if (shouldAutoScrollRef.current) {
      if (distanceFromBottom > DISABLE_THRESHOLD) {
        shouldAutoScrollRef.current = false;
      }
    } else {
      if (distanceFromBottom < ENABLE_THRESHOLD) {
        shouldAutoScrollRef.current = true;
      }
    }

    setIsAtBottom(distanceFromBottom < ENABLE_THRESHOLD);
    lastScrollTopRef.current = currentScrollTop;
  };

  const downButtonClickHandler = () => {
    const ele = containerRef.current;
    if (!ele) return;

    shouldAutoScrollRef.current = true;

    ele.scrollTo({
      top: ele.scrollHeight,
      behavior: 'smooth',
    });

    lastScrollTopRef.current = ele.scrollTop;
    setIsAtBottom(true);
  };

  return (
    <>
      <main className="">
        <div className="flex items-center">
          <SideBar
            loading={loading}
            conversation={conversation}
            conversationHistory={conversationHistory}
            setHistory={setState}
            currentAgent={currentAgent}
          />
          <section
            className={`section__chat rounded-primary relative flex h-dvh w-full flex-col items-center`}
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
                  <div className="mb-5 flex items-center gap-2">
                    <div className="h-3.5 w-3.5 animate-pulse rounded-full bg-white dark:bg-white/70" />
                    <p className="font-medium tracking-wider text-white dark:text-gray-400">
                      {aiStarted ? 'Astra is typing...' : 'Thinking...'}
                    </p>
                  </div>
                )}

                {streamMessage !== '' && (
                  <ChatBox writer="system" chat={streamMessage} />
                )}
              </div>

              <div className="bg-workspace-fade pointer-events-none absolute right-0 bottom-0 left-0 z-20 h-30" />
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
            {!isAtBottom && !loading && overflowing && hasMessage && (
              <button
                onClick={downButtonClickHandler}
                aria-label="Go to bottom"
                className="absolute bottom-28 left-1/2 -translate-x-1/2 transform animate-bounce rounded-full border-2 border-white bg-gray-200/60 p-1 text-black opacity-90 md:bottom-28"
              >
                <ArrowDown aria-hidden="true" strokeWidth={1.5} />
              </button>
            )}
          </section>
        </div>
      </main>
      {ToastContainer}
      <RenameModal
        isOpen={renameModalData.open}
        onClose={() => dispatch(closeRenameModal())}
        initialValue={renameModalData.chat}
        conversationId={renameModalData.conversationId}
        setHistory={setState}
      />
    </>
  );
};

export default AiWorkspace;
