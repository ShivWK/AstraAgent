import {
  selectSelectedModel,
  setSelectedModel,
} from '@/features/agents/agentsSlice';
import styles from '../../app/ai-assistant/page.module.css';
import { type Text_assistant } from '@/utils/text_assistants';
import { type Voice_assistant } from '@/utils/voice_assistants';
import useAppDispatch from '@/hooks/useAppDispatch';
import useAppSelector from '@/hooks/useAppSelector';
import { Check, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

type PropsType = {
  assistants: Text_assistant[] | Voice_assistant[];
};

const ModelCards = ({ assistants }: PropsType) => {
  const selectedModel = useAppSelector(selectSelectedModel);
  const dispatch = useAppDispatch();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scrollPercentage, setScrollPercentage] = useState<number | null>(null);
  const [isOverflowing, setIsOverFlowing] = useState<boolean>(false);

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

  const cardClickHandler = (data: Text_assistant | Voice_assistant) => {
    dispatch(setSelectedModel(data));
  };
  return (
    <section className="relative h-fit">
      <div ref={containerRef} className={`${styles['carousel']}`}>
        <div
          className={`${styles['carousel_group']} my-5 gap-5 text-lg md:my-6 md:gap-8 md:pr-8 md:pl-4`}
        >
          {assistants.map((ai) => {
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
                  placeholder="blur"
                  blurDataURL="/blurImage.png"
                  className="h-34 w-34 rounded-full border-2 border-blue-400 object-contain shadow-[0_0_15px_2px_#155dfc]"
                />
                {selectedModel.find((object) => object.id === ai.id) && (
                  <Check
                    size={20}
                    strokeWidth={3}
                    className="absolute top-2 right-2 overflow-hidden rounded-full bg-linear-to-br from-[#8B75FE] via-[#5BDDFD] to-[#1F58FD] p-1"
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

      {isOverflowing && (
        <div className="absolute left-1/2 flex w-[23%] -translate-x-1/2 items-center gap-3 md:-bottom-7">
          <button
            onClick={() => scrollClickHandler(-1)}
            className="hidden transition-all duration-100 ease-in active:scale-90 md:block"
          >
            <ChevronLeft size={35} strokeWidth={2} className="text-blue-400" />
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
            <ChevronRight size={35} strokeWidth={2} className="text-blue-400" />
          </button>
        </div>
      )}
    </section>
  );
};

export default ModelCards;
