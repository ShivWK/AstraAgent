import {
  selectSelectedModel,
  setSelectedModel,
} from '@/features/agents/agentsSlice';
import styles from '../../app/ai-assistant/page.module.css';
import { type Assistant } from '@/utils/assistants';
import useAppDispatch from '@/hooks/useAppDispatch';
import useAppSelector from '@/hooks/useAppSelector';
import { CircleCheck, ChevronLeft, ChevronRight } from 'lucide-react';
import { assistant } from '@/utils/assistants';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const ModelCards = () => {
  const selectedModel = useAppSelector(selectSelectedModel);
  const dispatch = useAppDispatch();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scrollPercentage, setScrollPercentage] = useState<number | null>(48);

  const calPercentage = (sl: number, sw: number, cw: number) => {
    const totalViewed = ((sl + cw) / sw) * 100;
    return totalViewed;
  };

  useEffect(() => {
    if (!containerRef.current) return;
    const ele = containerRef.current;
    // const scrollW = ele.scrollWidth;
    // const scrollL = ele.scrollLeft;
    // const clientW = ele.clientWidth;

    // const totalViewed = ((scrollL + clientW) / scrollW) * 100;
    // setScrollPercentage(calPercentage(scrollL, scrollW, clientW));

    const scrollHandler = () => {
      const scrollW = ele.scrollWidth;
      const scrollL = ele.scrollLeft;
      const clientW = ele.clientWidth;

      console.log('scrollW', scrollW, 'scrollL', scrollL, 'clientW', clientW);
      // console.log("scroll %", calPercentage(scrollL, scrollW, clientW))
      setScrollPercentage(calPercentage(scrollL, scrollW, clientW));
    };

    ele.addEventListener('scroll', scrollHandler);
    return () => ele.removeEventListener('scroll', scrollHandler);
  }, []);

  const cardClickHandler = (data: Assistant) => {
    dispatch(setSelectedModel(data));
  };
  return (
    <section className="relative h-fit">
      <div ref={containerRef} className={`${styles['carousel']}`}>
        <div
          className={`${styles['carousel_group']} my-5 gap-5 pr-8 pl-4 text-lg md:my-6`}
        >
          {assistant.map((ai) => {
            return (
              <div
                onClick={() => cardClickHandler(ai)}
                key={ai.id}
                className="relative flex shrink-0 grow-0 transform cursor-pointer flex-col items-center gap-1 rounded-2xl border-2 border-blue-400 p-3 shadow-[0_0_10px_1px_#155dfc] backdrop-blur-md transition-all duration-100 ease-linear select-none hover:scale-105"
              >
                <Image
                  src={ai.icon}
                  alt={`A ${ai.title} AI assistant`}
                  height={300}
                  width={300}
                  quality={100}
                  className="h-34 w-34 rounded-full border-2 border-blue-400 object-contain shadow-[0_0_15px_2px_#155dfc]"
                />
                {selectedModel.find((object) => object.id === ai.id) && (
                  <CircleCheck
                    size={20}
                    strokeWidth={2}
                    className="absolute top-2 right-2 overflow-hidden rounded-full bg-linear-to-br from-[#8B75FE] via-[#5BDDFD] to-[#1F58FD]"
                  />
                )}
                <p className="mt-2 w-[99%] truncate text-center">{ai.name}</p>
                <p className="w-[99%] truncate text-center font-medium">
                  {ai.title}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="absolute -bottom-7 left-1/2 flex w-[23%] -translate-x-1/2 items-center gap-3">
        <button className="hidden md:block">
          <ChevronLeft size={35} strokeWidth={2} />
        </button>

        <div className="h-2 w-full rounded-2xl border border-blue-400">
          <div
            className={`h-full rounded-2xl bg-blue-400`}
            style={{
              width: `${scrollPercentage}%`,
            }}
          ></div>
        </div>

        <button className="hidden md:block">
          <ChevronRight size={35} strokeWidth={2} />
        </button>
      </div>
    </section>
  );
};

export default ModelCards;
