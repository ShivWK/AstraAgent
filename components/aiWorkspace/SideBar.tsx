import AISideBar from './AISideBar';
import { Dispatch, SetStateAction } from 'react';
import { Conversation } from '@/types/conversation';
import { Agent } from '@/types/agents';
import useAppDispatch from '@/hooks/useAppDispatch';
import useAppSelector from '@/hooks/useAppSelector';
import {
  selectOpenSidebar,
  selectSlideSidebar,
  setOpenSidebar,
  setSlideSidebar,
} from '@/features/agents/agentsSlice';
import { ChevronLeft } from 'lucide-react';
import { useSelector } from 'react-redux';

type PropsType = {
  loading: boolean;
  conversation: Conversation | null;
  conversationHistory: Conversation[] | null;
  setHistory: Dispatch<
    SetStateAction<{
      loading: boolean;
      conversation: Conversation | null;
      conversationHistory: Conversation[] | null;
      currentAgent: Agent | null;
    }>
  >;
  currentAgent: Agent | null;
};

const SideBar = ({
  loading,
  conversation,
  conversationHistory,
  setHistory,
  currentAgent,
}: PropsType) => {
  const dispatch = useAppDispatch();
  const openSidebar = useSelector(selectOpenSidebar);
  const slideOpenSidebar = useAppSelector(selectSlideSidebar);

  const divClickHandler = () => {
    dispatch(setSlideSidebar(false));
  };

  const animationENdHandler = (e: React.AnimationEvent<HTMLDivElement>) => {
    const classList = e.currentTarget.classList;

    if (classList.contains('animate-slideHide')) {
      dispatch(setOpenSidebar(false));
    }
  };

  return (
    <>
      <aside className="hidden h-dvh w-104 overflow-x-visible pt-19 pb-0.5 md:block">
        <AISideBar
          loading={loading}
          conversation={conversation}
          conversationHistory={conversationHistory}
          setHistory={setHistory}
          currentAgent={currentAgent}
        />
      </aside>
      {openSidebar && (
        <div
          onClick={divClickHandler}
          className="fixed top-0 left-0 z-60 flex h-full w-full items-center justify-center bg-black/60 md:hidden"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            onAnimationEnd={animationENdHandler}
            className={`fixed top-0 left-0 h-dvh w-3/4 py-2 backdrop-blur-xl ${slideOpenSidebar ? 'animate-slideShow' : 'animate-slideHide'}`}
          >
            <button
              className="mt-2 mb-2 ml-3 w-fit rounded-full bg-blue-900 p-2 text-white"
              onClick={() => dispatch(setSlideSidebar(false))}
            >
              <ChevronLeft size={27} aria-hidden="true" />
            </button>
            <div className="h-[92%] w-full p-1">
              <AISideBar
                loading={loading}
                conversation={conversation}
                conversationHistory={conversationHistory}
                setHistory={setHistory}
                currentAgent={currentAgent}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SideBar;
