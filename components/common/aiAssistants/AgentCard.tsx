import { Agent } from '@/types/agents';
import { useState, Dispatch, SetStateAction } from 'react';
import Image from 'next/image';
import { TrashIcon, Check } from 'lucide-react';
import useAppSelector from '@/hooks/useAppSelector';
import { selectSelectedAgent } from '@/features/agents/agentsSlice';

type PropsType = {
  cardClickHandler: (val: Agent) => void;
  activeCardId: string | null;
  setActiveCardId: Dispatch<SetStateAction<string | null>>;
  setAgents: Dispatch<SetStateAction<Agent[]>>;
  ai: Agent;
};

const AgentCard = ({
  cardClickHandler,
  setAgents,
  ai,
  setActiveCardId,
  activeCardId,
}: PropsType) => {
  const selectedAgent = useAppSelector(selectSelectedAgent);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const crossClickHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (deleteLoading) return;
    setDeleteLoading(true);
    e.stopPropagation();

    try {
      const response = await fetch(`/api/agents/${ai._id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setAgents((prv) => {
        return [...prv.filter((obj) => obj._id !== ai._id)];
      });
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
      } else {
        console.log('Random error in delete', err);
      }
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleCardClick = () => {
    if (deleteLoading) return;
    setActiveCardId((prev) => (prev === ai._id ? null : ai._id));
    cardClickHandler(ai);
  };

  return (
    <div
      onClick={handleCardClick}
      key={ai._id}
      className={`group rounded-primary relative flex w-45 shrink-0 grow-0 transform cursor-pointer flex-col items-center gap-1 border-2 border-blue-400 px-4 py-3 shadow-[0_0_10px_1px_#155dfc] backdrop-blur-md transition-all duration-100 ease-linear select-none hover:scale-105 ${deleteLoading && 'opacity-50'}`}
    >
      {ai.createdBy && (
        <button
          aria-label="Delete Agent"
          onClick={crossClickHandler}
          className={`absolute top-2 left-2 opacity-0 transition-all duration-100 ease-linear group-hover:opacity-100 ${activeCardId === ai._id ? 'opacity-100' : ''}`}
        >
          <TrashIcon aria-hidden="true" size={16} />
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
        className="h-34 w-34 rounded-full border-2 border-blue-400 object-cover shadow-[0_0_15px_2px_#155dfc]"
      />
      {selectedAgent?._id === ai._id && (
        <Check
          size={20}
          strokeWidth={3}
          className="absolute top-2 right-2 overflow-hidden rounded-full bg-linear-to-br from-[#8B75FE] via-[#5BDDFD] to-[#1F58FD] p-1"
        />
      )}
      <p className="mt-2 w-[99%] truncate text-center">{ai.name}</p>
      <p className="w-[99%] truncate text-center font-medium">{ai.title}</p>
    </div>
  );
};

export default AgentCard;
