import Image from 'next/image';
import useAppSelector from '@/hooks/useAppSelector';
import { selectSelectedAgent } from '@/features/agents/agentsSlice';
import { modelOptions } from '@/utils/text_assistants';
import { type Conversation } from '@/types/conversation';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { BrainCircuit, ChevronDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Agent } from '@/types/agents';
import ReadMore from '../ReadMore';

type PropsType = {
  loading: boolean;
  conversation: Conversation | null;
};

const AgentDetails = ({ loading, conversation }: PropsType) => {
  type agent = Agent | null;
  const selectedAgent: agent = useAppSelector(selectSelectedAgent);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [height, setHeight] = useState(0);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [currentModel, setCurrentModel] = useState(
    modelOptions[selectedAgent?.model as string],
  );

  useEffect(() => {
    if (containerRef.current) {
      if (openDropdown) {
        setHeight(containerRef.current.scrollHeight);
      } else {
        setHeight(0);
      }
    }
  }, [openDropdown]);

  const modelDetailsContainerClickHandler = (
    e: React.MouseEvent<HTMLDivElement>,
  ) => {
    e.stopPropagation();
    if (openDropdown) return;
    setOpenDropdown(!openDropdown);
  };

  if (!selectedAgent) return null;

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
            {selectedAgent?.name[0].toUpperCase() +
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
          className={`relative p-2 ${openDropdown ? 'cursor-default' : 'cursor-pointer'}`}
        >
          <button
            className={`absolute top-2 right-2 transform transition-all duration-250 ease-linear ${openDropdown ? '-rotate-180' : ''}`}
            aria-label="Open Drop Down"
            onClick={() => setOpenDropdown(!openDropdown)}
          >
            <ChevronDown aria-hidden="true" size={20} />
          </button>
          <div className="rounded-primary w-full">
            <div
              className={`mb-2 flex items-center gap-1 ${openDropdown ? 'block' : 'hidden'}`}
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

          <div className="z-80">
            <Select>
              <SelectTrigger className="mt-4 w-full rounded-md px-3 py-2 shadow-[0_0_10px_0px_#05df72] placeholder:text-gray-400 hover:bg-gray-600/50 dark:bg-gray-700">
                <SelectValue placeholder="SELECT A DIFFERENT MODEL..." />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
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
