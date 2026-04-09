'use client';

import { ChevronLeft } from 'lucide-react';
import AISideBar from '@/components/common/aiSidebar/AISideBar';
import {
  selectOpenSidebar,
  setOpenSidebar,
  selectSelectedInteractionMode,
  setSelectedInteractionMode,
} from '@/features/agents/agentsSlice';
import useAppSelector from '@/hooks/useAppSelector';
import useAppDispatch from '@/hooks/useAppDispatch';
import ChatBox from '@/components/common/Chatbox';
import Drawer from '@/components/common/Modal';
import TextInputMethod from '@/components/common/TextInputMethod';
import AudioInputMethod from '@/components/common/AudioInputMethod';
import { useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { type Conversation } from '@/types/conversation';
import { type Mode } from '@/features/agents/agentsSlice';

const AiWorkspace = () => {
  const [loading, setLoading] = useState(true);
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const isSidebarOpen = useAppSelector(selectOpenSidebar);
  const [chat, setChat] = useState<Record<string, string>[]>([]);
  const [streamMessage, setStreamMessage] = useState('');
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const interactionMode = useAppSelector(selectSelectedInteractionMode);
  const searchParam = useSearchParams();
  const conversationId = searchParam.get('conversation_id');
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
      const response = await fetch(`/api/conversation/${conversationId}`);
      const result = await response.json();

      setConversation(result.conversation);

      console.log('Conversation', result.conversation);

      if (!response.ok) {
        router.replace(`/ai-assistant?mode=${mode || interactionMode}`);
        return;
      }

      setLoading(false);
    };

    fetchConversation();
  }, [conversationId, router, interactionMode, mode]);

  useEffect(() => {
    const ele = chatContainerRef.current;
    if (!ele) return;

    if (ele.scrollHeight > ele.clientHeight) {
      ele.scrollBy({
        top: ele.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, []);

  return (
    <main className="md:pr-1 md:pl-2">
      <div className="flex items-center gap-2">
        <aside className="hidden h-screen w-104 overflow-x-visible pt-18 pb-0.5 md:block">
          <AISideBar loading={loading} conversation={conversation} />
        </aside>
        <section
          className={`section__chat rounded-primary relative flex h-screen w-full flex-col items-center`}
        >
          <div className="section__chat-box relative w-full basis-full overflow-auto">
            <div
              ref={chatContainerRef}
              className={`pretty-scrollbar relative h-full w-full overflow-auto px-2 pt-20 ${interactionMode === 'text' ? 'pb-20' : 'pb-8'} md:px-4`}
            >
              {chat.length > 0 &&
                chat.map((item, index) => (
                  <ChatBox key={index} writer={item.role} chat={item.content} />
                ))}

              {streamMessage !== '' && (
                <ChatBox writer="system" chat={streamMessage} />
              )}
            </div>

            <div
              className={`${mode === 'text' || interactionMode === 'text' ? 'h-30' : 'h-20'} pointer-events-none absolute right-0 bottom-0 left-0 z-20 bg-linear-to-t from-black from-15% to-transparent to-70%`}
            />
          </div>
          {mode === 'text' || interactionMode === 'text' ? (
            <TextInputMethod />
          ) : (
            <AudioInputMethod setStream={setStreamMessage} setChat={setChat} />
          )}
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
            <AISideBar loading={loading} conversation={conversation} />
          </div>
        </>
      </Drawer>
    </main>
  );
};

export default AiWorkspace;
