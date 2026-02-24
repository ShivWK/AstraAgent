'use client';

import { ChevronLeft } from 'lucide-react';
import AISideBar from '@/components/common/AISideBar';
import {
  selectOpenSidebar,
  setOpenSidebar,
  selectSelectedInteractionMode,
} from '@/features/agents/agentsSlice';
import useAppSelector from '@/hooks/useAppSelector';
import useAppDispatch from '@/hooks/useAppDispatch';
import ChatBox from '@/components/common/Chatbox';
import Drawer from '@/components/common/Modal';
import TextInputMethod from '@/components/common/TextInputMethod';
import AudioInputMethod from '@/components/common/AudioInputMethod';
import { useEffect, useRef, useState } from 'react';

const Pages = () => {
  const isSidebarOpen = useAppSelector(selectOpenSidebar);
  const [chat, setChat] = useState<string | null>(null);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const interactionMode = useAppSelector(selectSelectedInteractionMode);
  const dispatch = useAppDispatch();

  const closeHandler = () => {
    dispatch(setOpenSidebar(false));
    window.history.back();
  };

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
    <main className="md:px-2">
      <div className="flex items-center gap-2">
        <aside className="hidden h-screen w-104 overflow-x-visible pt-18 pb-0.5 md:block">
          <AISideBar />
        </aside>
        <section
          className={`section__chat rounded-primary relative flex h-screen w-full flex-col items-center ${interactionMode === 'text' && ''}`}
        >
          <div className="section__chat-box relative w-full basis-full overflow-auto">
            <div
              ref={chatContainerRef}
              className={`max-md:hide-scrollbar pretty-scrollbar h-full w-full overflow-auto px-2 pt-20 ${interactionMode === 'text' ? 'pb-20' : 'pb-1'} md:px-4`}
            >
              {chat && <ChatBox writer="agent" chat={chat} />}
              <ChatBox
                writer="user"
                chat="Lorem ipsum dolor sit amet consectetur adipisicing elit. Id qui placeat labore inventore magnam voluptatem, ullam nulla eius ipsum dicta?"
              />

              <ChatBox
                writer="agent"
                chat="Lorem ipsum dolor sit amet consectetur adipisicing elit. Id qui placeat labore inventore magnam voluptatem, ullam nulla eius ipsum dicta?"
              />

              <ChatBox
                writer="user"
                chat="Lorem ipsum dolor sit amet consectetur adipisicing elit. Id qui placeat labore inventore magnam voluptatem, ullam nulla eius ipsum dicta?"
              />

              <ChatBox
                writer="agent"
                chat="Lorem ipsum dolor sit amet consectetur adipisicing elit. Id qui placeat labore inventore magnam voluptatem, ullam nulla eius ipsum dicta?"
              />

              <ChatBox
                writer="user"
                chat="Lorem ipsum dolor sit amet consectetur adipisicing elit. Id qui placeat labore inventore magnam voluptatem, ullam nulla eius ipsum dicta?"
              />
            </div>

            <div
              className={`${interactionMode === 'text' ? 'h-30' : 'h-20'} pointer-events-none absolute right-0 bottom-0 left-0 z-20 bg-linear-to-t from-black to-transparent to-70%`}
            />
          </div>
          {interactionMode === 'text' ? (
            <TextInputMethod />
          ) : (
            <AudioInputMethod setMessage={setChat} />
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
          <div className="h-[92%] w-full p-2">
            <AISideBar />
          </div>
        </>
      </Drawer>
    </main>
  );
};

export default Pages;
