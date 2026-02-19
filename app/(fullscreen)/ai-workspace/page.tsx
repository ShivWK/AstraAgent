'use client';

import { ChevronLeft } from 'lucide-react';
import TextAISideBar from '@/components/common/TextAISideBar';
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
import AudioInputMethod from '@/components/common/AudioInputMenthod';

const Pages = () => {
  const isSidebarOpen = useAppSelector(selectOpenSidebar);
  const interactionMode = useAppSelector(selectSelectedInteractionMode);
  const dispatch = useAppDispatch();

  const closeHandler = () => {
    dispatch(setOpenSidebar(false));
    window.history.back();
  };

  return (
    <main className="md:px-2">
      <div className="flex items-center gap-2">
        <aside className="hidden h-screen w-104 overflow-x-visible pt-20 pb-0.5 md:block">
          <TextAISideBar />
        </aside>
        <section
          className={`section__chat rounded-primary flex h-screen w-full flex-col items-center ${interactionMode === 'text' && 'gap-2 pb-5'}`}
        >
          <div className="section__chat-box relative basis-full overflow-auto">
            <div className="pretty-scrollbar h-full overflow-auto px-1 pt-20 pb-1 md:px-4">
              <ChatBox
                writer="agent"
                chat="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequuntur necessitatibus, cupiditate suscipit corporis neque nam quisquam quaerat expedita voluptas mollitia! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequuntur necessitatibus, cupiditate suscipit corporis neque nam quisquam quaerat expedita voluptas mollitia!"
              />

              <ChatBox
                writer="agent"
                chat="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequuntur necessitatibus, cupiditate suscipit corporis neque nam quisquam quaerat expedita voluptas mollitia!"
              />

              <ChatBox
                writer="user"
                chat="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequuntur necessitatibus, cupiditate suscipit corporis neque nam quisquam quaerat expedita voluptas mollitia!"
              />

              <ChatBox
                writer="agent"
                chat="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequuntur necessitatibus, cupiditate suscipit corporis neque nam quisquam quaerat expedita voluptas mollitia!"
              />
            </div>
            <div
              className={`${interactionMode === 'text' ? 'hidden' : 'block'} pointer-events-none absolute right-0 bottom-0 left-0 z-20 h-20 bg-linear-to-t from-black to-transparent to-40%`}
            />
          </div>
          {interactionMode !== 'text' ? (
            <TextInputMethod />
          ) : (
            <AudioInputMethod />
          )}
        </section>
      </div>
      <Drawer
        open={isSidebarOpen}
        onClose={closeHandler}
        showClasses="translate-x-0"
        hideClasses="-translate-x-full"
        className="relative top-0 left-0 h-screen w-3/4 py-2 backdrop-blur-xl"
      >
        <>
          <button
            className="mt-2 mb-2 ml-3 w-fit rounded-full bg-blue-900 p-2"
            onClick={closeHandler}
          >
            <ChevronLeft size={27} aria-hidden="true" />
          </button>
          <div className="h-[92%] w-full p-2">
            <TextAISideBar />
          </div>
        </>
      </Drawer>
    </main>
  );
};

export default Pages;
