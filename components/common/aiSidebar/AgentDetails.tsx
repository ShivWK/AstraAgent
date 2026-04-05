import Image from 'next/image';
import useAppSelector from '@/hooks/useAppSelector';
import { selectSelectedAgent } from '@/features/agents/agentsSlice';
import { Voice_assistant } from '@/utils/voice_assistants';
import { Text_assistant } from '@/utils/text_assistants';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { BrainCircuit } from 'lucide-react';

const AgentDetails = () => {
  type agent = Voice_assistant | Text_assistant | null;
  const selectedAgent: agent = useAppSelector(selectSelectedAgent);

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

      <div className="mt-3 rounded-lg bg-linear-to-tr from-blue-500 to-gray-400/30 p-2 backdrop-blur-md">
        <div className="rounded-primary w-full">
          <div className="mb-2 flex items-center gap-1">
            <BrainCircuit
              className="text-green-400"
              size={22}
              strokeWidth={2.5}
            />
            <p className="text-lg font-medium">Model Details</p>
          </div>
          <p className="text-sm">Current Model:</p>
          <p className="text-md -mt-0.5 font-medium">
            Trinity Large Preview (Default)
          </p>
          <p className="my-2 w-fit rounded-md border border-gray-300 bg-linear-to-tr from-green-200/20 to-green-400/50 px-2 py-0.5 font-medium">
            🎭 Conversational
          </p>

          <p className="line-clamp-2 leading-4.5 text-white">
            Best for chat, emotions, storytelling
          </p>
        </div>

        <div>
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
  );
};

export default AgentDetails;
