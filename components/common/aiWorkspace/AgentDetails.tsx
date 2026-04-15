import Image from 'next/image';
import { modelOptions, type ModelOption } from '@/utils/text_assistants';
import { type Conversation } from '@/types/conversation';
import { type Agent } from '@/types/agents';
import AgentDetailsSkeleton from '@/components/skeletons/AgentDetailsSkeleton';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { BrainCircuit, ChevronDown } from 'lucide-react';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import ReadMore from '../ReadMore';

type PropsType = {
  conversation: Conversation | null;
  currentAgent: Agent | null;
  loading: boolean;
  openDropDown: boolean;
  setOpenDropDown: Dispatch<SetStateAction<boolean>>;
};

const AgentDetails = ({
  openDropDown,
  setOpenDropDown,
  conversation,
  currentAgent: selectedAgent,
  loading,
}: PropsType) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [height, setHeight] = useState(0);
  const [currentModel, setCurrentModel] = useState<ModelOption | null>(null);

  useEffect(() => {
    const call = () => {
      setCurrentModel(modelOptions[conversation?.defaultAgentModel as string]);
    };

    call();
  }, [loading, conversation]);

  useEffect(() => {
    if (containerRef.current) {
      if (openDropDown) {
        setHeight(containerRef.current.scrollHeight);
      } else {
        setHeight(0);
      }
    }
  }, [openDropDown]);

  const modelDetailsContainerClickHandler = (
    e: React.MouseEvent<HTMLDivElement>,
  ) => {
    e.stopPropagation();
    if (openDropDown) return;
    setOpenDropDown(!openDropDown);
  };

  if (loading) return <AgentDetailsSkeleton />;

  return (
    <div className="section__agent-card dark:bg-primary-dark-bg h-auto rounded-lg p-2">
      <div
        onClick={(e) => e.stopPropagation()}
        className="section__agent-card rounded-primary dark:bg-primary-dark-bg mt-1 flex w-full flex-col items-center gap-2 md:flex-row md:gap-4 md:pl-2"
      >
        <Image
          src={selectedAgent?.icon || '/assistants/general_ai.png'}
          alt="General Ai agent"
          height={300}
          width={300}
          quality={100}
          placeholder="blur"
          blurDataURL="/blurImage.png"
          className="h-28 w-28 rounded-full border-2 border-blue-400 object-cover shadow-[0_0_15px_2px_#155dfc] md:h-23 md:w-23"
        />

        <div>
          <p className="line-clamp-1 text-xl font-semibold max-md:text-center md:text-2xl">
            {(selectedAgent?.name[0] as string)?.toUpperCase() +
              selectedAgent?.name.slice(1)}
          </p>
          <div className="flex items-center max-md:gap-1 max-md:text-sm md:flex-col md:items-start">
            <p className="max-md:text-center md:font-medium">Current Agent</p>
            <span className="md:hidden">:</span>
            <p className="line-clamp-1 italic max-md:text-center md:-mt-1">
              {selectedAgent?.title}
            </p>
          </div>
        </div>
      </div>

      <div className="my-2 w-full">
        <ReadMore
          text={selectedAgent?.description || 'No description available.'}
        />
      </div>

      <div
        className="mt-3 w-full overflow-hidden rounded-lg bg-linear-to-tr from-blue-500 to-gray-400/30 backdrop-blur-md"
        style={{
          height: height === 0 ? '3.5rem' : `${height}px`,
          transition: 'height 0.25s linear',
        }}
      >
        <div
          ref={containerRef}
          onClick={modelDetailsContainerClickHandler}
          className={`relative p-2 ${openDropDown ? 'cursor-default' : 'cursor-pointer'}`}
        >
          <button
            className={`absolute top-2 right-2 transform transition-all duration-250 ease-linear ${openDropDown ? '-rotate-180' : ''}`}
            aria-label="Open Drop Down"
            onClick={() => setOpenDropDown(!openDropDown)}
          >
            <ChevronDown aria-hidden="true" size={20} />
          </button>
          <div className="rounded-primary w-full">
            <div
              className={`mb-2 flex items-center gap-1 ${openDropDown ? 'block' : 'hidden'}`}
            >
              <BrainCircuit
                className="text-green-400"
                size={22}
                strokeWidth={2.5}
              />
              <p className="text-lg font-medium">Model Details</p>
            </div>

            <div className="flex w-[85%] flex-wrap items-center gap-0.5">
              <p className="text-sm">Current Model</p>
              <span>:</span>
              <p className="text-md -mt-0.5 font-medium">
                {currentModel?.name}
                {selectedAgent?.model === currentModel?.id && ' (Default)'}
              </p>
            </div>

            <p
              className={`my-2 w-fit rounded-md border border-gray-300 bg-linear-to-tr from-green-400/40 ${currentModel?.color} px-2 py-0.5 font-medium`}
            >
              {currentModel?.label}
            </p>

            <p className="line-clamp-2 leading-4.5 text-white">
              {currentModel?.description}
            </p>
          </div>

          <div>
            <Select>
              <SelectTrigger className="mt-4 w-full rounded-md px-3 py-2 shadow-[0_0_10px_0px_#05df72] placeholder:text-gray-400 hover:bg-gray-600/50 dark:bg-gray-700">
                <SelectValue placeholder="SELECT A DIFFERENT MODEL..." />
              </SelectTrigger>
              <SelectContent position="popper" className="z-10000">
                <SelectGroup>
                  {Object.entries(modelOptions).map(([key, model]) => {
                    const isDefault = selectedAgent?.model === model?.id;

                    return (
                      <SelectItem
                        key={key}
                        value={model.id}
                        disabled={isDefault}
                        className="flex justify-between"
                      >
                        <span>{model.name}</span>
                        <span className="text-xs opacity-70">
                          {model.label.slice(2)}
                        </span>
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentDetails;
