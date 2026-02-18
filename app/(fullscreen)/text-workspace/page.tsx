'use client';

import { ArrowUpFromDot, ChevronLeft } from 'lucide-react';
import TextAISideBar from '@/components/common/TextAISideBar';
import {
  selectOpenSidebar,
  setOpenSidebar,
} from '@/features/agents/agentsSlice';
import useAppSelector from '@/hooks/useAppSelector';
import useAppDispatch from '@/hooks/useAppDispatch';
import ChatBox from '@/components/common/Chatbox';
import Drawer from '@/components/common/Modal';

const Pages = () => {
  const isSidebarOpen = useAppSelector(selectOpenSidebar);
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
        <section className="section__chat rounded-primary flex h-screen w-full flex-col items-center gap-4 p-2 pb-5">
          <div className="section__chat-box pretty-scrollbar basis-full overflow-auto px-1 pt-20 pb-1 md:px-4">
            <ChatBox
              writer="agent"
              chat="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequuntur necessitatibus, cupiditate suscipit corporis neque nam quisquam quaerat expedita voluptas mollitia! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequuntur necessitatibus, cupiditate suscipit corporis neque nam quisquam quaerat expedita voluptas mollitia!"
            />

            <ChatBox
              writer="user"
              chat="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequuntur necessitatibus, cupiditate suscipit corporis neque nam quisquam quaerat expedita voluptas mollitia!"
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

            <ChatBox
              writer="user"
              chat="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequuntur necessitatibus, cupiditate suscipit corporis neque nam quisquam quaerat expedita voluptas mollitia!"
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

            <ChatBox
              writer="user"
              chat="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequuntur necessitatibus, cupiditate suscipit corporis neque nam quisquam quaerat expedita voluptas mollitia!"
            />

            <ChatBox
              writer="agent"
              chat="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequuntur necessitatibus, cupiditate suscipit corporis neque nam quisquam quaerat expedita voluptas mollitia!"
            />
          </div>
          <form className="flex w-[95%] items-end rounded-2xl border-2 border-blue-900 py-2 pr-2 pl-4 md:w-[90%]">
            <textarea
              rows={1}
              className="wrap-break-words field-sizing-content flex-1 resize-none self-center overflow-hidden border-none text-lg outline-none"
              aria-label="Enter Query"
              placeholder="Enter query"
            />

            <button className="rounded-lg bg-blue-900 p-2.5">
              <ArrowUpFromDot aria-hidden="true" />
            </button>
          </form>
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
