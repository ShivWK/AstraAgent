import { setSelectedAgent } from '@/features/agents/agentsSlice';

import useAppDispatch from '@/hooks/useAppDispatch';
import { ChevronLeft, ChevronRight, CirclePlus } from 'lucide-react';
import Image from 'next/image';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { type Agent } from '@/types/agents';
import SessionInstructionModal from './SessionInstructionModel';
import NewAgentCreationModel from './NewAgentCreationModel';
import AgentCard from './AgentCard';
import { Conversation } from '@/types/conversation';
import { useSearchParams } from 'next/navigation';

type PropsType = {
  assistants: Agent[];
  setAgents: Dispatch<SetStateAction<Agent[]>>;
  setHistory: Dispatch<
    SetStateAction<Record<
      string,
      Record<string, string | Conversation[]>
    > | null>
  >;
};

const AgentCards = ({ assistants, setAgents, setHistory }: PropsType) => {
  const searchParams = useSearchParams();
  const createAgent = searchParams.get('createAgent');
  const dispatch = useAppDispatch();
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [scrollPercentage, setScrollPercentage] = useState<number | null>(null);
  const [isOverflowing, setIsOverFlowing] = useState<boolean>(false);
  const [openInstructionModel, setOpenInstructionModel] = useState(false);
  const [openCreationModel, setOpenCreationModel] = useState(false);
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  useEffect(() => {
    const call = () => {
      if (createAgent) {
        setOpenCreationModel(true);
      }
    };

    call();
  }, [createAgent]);

  const calPercentage = (sl: number, sw: number, cw: number) => {
    const totalViewed = ((sl + cw) / sw) * 100;
    return totalViewed;
  };

  const scrollClickHandler = (dir: number) => {
    if (!containerRef.current) return;
    const ele = containerRef.current;

    ele.scrollBy({
      left: dir * 150,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    if (!containerRef.current) return;
    const ele = containerRef.current;

    const scrollHandler = () => {
      const {
        scrollWidth: scrollW,
        scrollLeft: scrollL,
        clientWidth: clientW,
      } = ele;
      if (clientW < scrollW) setIsOverFlowing(true);
      setScrollPercentage(calPercentage(scrollL, scrollW, clientW));
    };

    scrollHandler();

    ele.addEventListener('scroll', scrollHandler);
    ele.addEventListener('resize', scrollHandler);

    return () => {
      ele.removeEventListener('scroll', scrollHandler);
      ele.removeEventListener('resize', scrollHandler);
    };
  }, []);

  const cardClickHandler = (data: Agent) => {
    dispatch(setSelectedAgent(data));
    setOpenInstructionModel(true);
  };

  const newAgentCreationClickHandler = () => {
    setOpenCreationModel(true);
  };

  return (
    <>
      <section className="relative h-fit">
        <div ref={containerRef} className="carousel hide-scrollbar">
          <div className="carousel_group hide-scrollbar my-5 gap-5 text-lg md:my-6 md:gap-8 md:pr-8 md:pl-4">
            <div
              onClick={newAgentCreationClickHandler}
              className={`rounded-primary flex w-45 shrink-0 grow-0 transform cursor-pointer flex-col items-center gap-1 border-2 border-blue-400 px-4 py-3 shadow-[0_0_10px_1px_#155dfc] backdrop-blur-md transition-all duration-100 ease-linear select-none`}
            >
              <div className="relative overflow-hidden rounded-full">
                <div className="absolute h-full w-full bg-blue-400/65">
                  &nbsp;
                </div>
                <Image
                  src="/assistants/general_ai.png"
                  alt={`A general AI assistant`}
                  height={300}
                  width={300}
                  quality={100}
                  placeholder="blur"
                  blurDataURL="/blurImage.png"
                  className="h-34 w-34 rounded-full border-2 border-blue-400 object-cover shadow-[0_0_15px_2px_#155dfc]"
                  loading="lazy"
                />
                <CirclePlus
                  size={60}
                  strokeWidth={1}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform text-white"
                />
              </div>

              <p className="mt-2 w-[99%] truncate text-center">Your Agent</p>
              <p className="w-[99%] truncate text-center font-medium">
                Create New
              </p>
            </div>

            {assistants?.map((ai) => {
              return (
                <AgentCard
                  key={ai._id}
                  setActiveCardId={setActiveCardId}
                  activeCardId={activeCardId}
                  ai={ai}
                  setAgents={setAgents}
                  cardClickHandler={cardClickHandler}
                  setHistory={setHistory}
                />
              );
            })}
          </div>
        </div>

        {isOverflowing && (
          <div className="absolute left-1/2 flex w-[23%] -translate-x-1/2 items-center gap-3 md:-bottom-7">
            <button
              onClick={() => scrollClickHandler(-1)}
              className="hidden transition-all duration-100 ease-in active:scale-90 md:block"
            >
              <ChevronLeft
                size={35}
                strokeWidth={2}
                className="text-blue-400"
              />
            </button>

            <div className="h-2 w-full rounded-2xl border border-blue-400">
              <div
                className={`h-full rounded-2xl bg-blue-400 transition-all duration-200 ease-linear`}
                style={{
                  width: `${scrollPercentage}%`,
                }}
              ></div>
            </div>

            <button
              onClick={() => scrollClickHandler(1)}
              className="hidden transition-all duration-100 ease-in active:scale-90 md:block"
            >
              <ChevronRight
                size={35}
                strokeWidth={2}
                className="text-blue-400"
              />
            </button>
          </div>
        )}
      </section>
      <SessionInstructionModal
        open={openInstructionModel}
        setOpen={setOpenInstructionModel}
      />

      <NewAgentCreationModel
        open={openCreationModel}
        setOpen={setOpenCreationModel}
        setAgents={setAgents}
      />
    </>
  );
};

export default AgentCards;
