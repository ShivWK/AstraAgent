import {
  selectSelectedModel,
  setSelectedModel,
} from '@/features/agents/agentsSlice';
import styles from '../../app/ai-assistant/page.module.css';
import { type Assistant } from '@/utils/assistants';
import useAppDispatch from '@/hooks/useAppDispatch';
import useAppSelector from '@/hooks/useAppSelector';
import { CircleCheck } from 'lucide-react';
import { assistant } from '@/utils/assistants';
import Image from 'next/image';

const ModelCards = () => {
  const selectedModel = useAppSelector(selectSelectedModel);
  const dispatch = useAppDispatch();

  const cardClickHandler = (data: Assistant) => {
    dispatch(setSelectedModel(data));
  };
  return (
    <div className={`${styles['carousel']}`}>
      <div className={`${styles['carousel_group']} my-5 gap-5 md:my-6`}>
        {assistant.map((ai) => {
          return (
            <div
              onClick={() => cardClickHandler(ai)}
              key={ai.id}
              className="flex shrink-0 transform cursor-pointer flex-col items-center gap-1 rounded-2xl border-2 border-blue-400 p-3 shadow-[0_0_10px_1px_#155dfc] backdrop-blur-md transition-all duration-100 ease-linear select-none hover:scale-105"
            >
              <Image
                src={ai.icon}
                alt={`A ${ai.title} AI assistant`}
                height={300}
                width={300}
                quality={100}
                className="h-36 w-36 rounded-full border-2 border-blue-400 object-contain shadow-[0_0_15px_2px_#155dfc]"
              />

              <p className="mt-2 flex items-center gap-2 text-lg">
                <span>{ai.name}</span>
                {selectedModel.find((object) => object.id === ai.id) && (
                  <CircleCheck
                    size={20}
                    strokeWidth={2}
                    className="overflow-hidden rounded-full bg-linear-to-br from-[#8B75FE] via-[#5BDDFD] to-[#1F58FD]"
                  />
                )}
              </p>
              <p className="text-lg font-semibold">{ai.title}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ModelCards;
