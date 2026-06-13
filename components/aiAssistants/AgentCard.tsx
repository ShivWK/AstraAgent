import { Agent } from '@/types/agents';
import { Dispatch, SetStateAction } from 'react';
import Image from 'next/image';
import { TrashIcon, Check } from 'lucide-react';
import useAppSelector from '@/hooks/useAppSelector';
import { selectSelectedAgent } from '@/features/agents/agentsSlice';
import { useDeleteAgent } from '@/hooks/queries/agent/useDeleteAgent';

type PropsType = {
  cardClickHandler: (val: Agent) => void;
  activeCardId: string | null;
  setActiveCardId: Dispatch<SetStateAction<string | null>>;
  ai: Agent;
};

const AgentCard = ({
  cardClickHandler,
  ai,
  setActiveCardId,
  activeCardId,
}: PropsType) => {
  const { mutate, isPending, reset } = useDeleteAgent();
  const selectedAgent = useAppSelector(selectSelectedAgent);

  const crossClickHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    mutate(ai._id, {
      onSuccess: (data) => {
        console.log(data); // doubt not executed
        reset();
      },
    });
  };

  const handleCardClick = () => {
    if (isPending) return;
    setActiveCardId((prev) => (prev === ai._id ? null : ai._id));
    cardClickHandler(ai);
  };

  return (
    <div
      onClick={handleCardClick}
      key={ai._id}
      className={`group rounded-primary border-agent-card-border hover:shadow-agent-card-hover bg-agent-card-bg relative flex w-45 shrink-0 grow-0 transform cursor-pointer flex-col items-center gap-1 border-2 px-4 py-3 shadow-[0_0_10px_1px_#155dfc] transition-all duration-100 ease-linear select-none hover:scale-105 ${isPending && 'opacity-50'}`}
    >
      {ai.createdBy && (
        <button
          aria-label="Delete Agent"
          onClick={crossClickHandler}
          className={`absolute top-2 left-2 opacity-0 transition-all duration-100 ease-linear group-hover:opacity-100 ${activeCardId === ai._id ? 'opacity-100' : ''}`}
        >
          <TrashIcon aria-hidden="true" size={16} className="text-white" />
        </button>
      )}

      <Image
        src={ai.icon}
        alt={`A ${ai.title} AI assistant`}
        height={300}
        width={300}
        quality={100}
        placeholder="blur"
        blurDataURL="/blurImage.png"
        className="h-34 w-34 rounded-full border-3 border-blue-400 object-cover md:border-4"
      />
      {selectedAgent?._id === ai._id && (
        <Check
          size={20}
          strokeWidth={3}
          className="absolute top-2 right-2 overflow-hidden rounded-full bg-linear-to-br from-[#8B75FE] via-[#5BDDFD] to-[#1F58FD] p-1"
        />
      )}
      <p className="mt-2 w-[99%] truncate text-center text-white">{ai.name}</p>
      <p className="w-[99%] truncate text-center font-medium text-gray-200">
        {ai.title}
      </p>
    </div>
  );
};

export default AgentCard;
