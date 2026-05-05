import Image from 'next/image';
import { logoForAgents } from '@/utils/text_assistants';
import { Conversation } from '@/types/conversation';
import { useState, useEffect, SetStateAction, Dispatch } from 'react';
import { ChevronDown } from 'lucide-react';
import PreviousChat from './PreviousChat';

type PropsType = {
  history: Record<string, Record<string, string | Conversation[]>>;
  hideHeading?: boolean;
  setHistory: Dispatch<
    SetStateAction<Record<
      string,
      Record<string, string | Conversation[]>
    > | null>
  >;
};

const PreviousChats = ({
  history,
  setHistory,
  hideHeading = false,
}: PropsType) => {
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});

  const toggleGroup = (agentId: string) => {
    setOpenGroups((prev) => ({
      ...prev,
      [agentId]: !prev[agentId],
    }));
  };

  useEffect(() => {
    const call = () => {
      const firstKey = Object.keys(history)[0];
      if (firstKey) {
        setOpenGroups({ [firstKey]: true });
      }
    };

    call();
  }, [history]);

  return (
    <div>
      <h2
        className={`mb-2 text-xl font-semibold md:text-2xl dark:text-white ${hideHeading && 'hidden'}`}
      >
        Previous Conversations
      </h2>
      {Object.keys(history!).length === 0 ? (
        <p className="text-gray-400">No previous conversations</p>
      ) : (
        <div className="flex flex-col gap-1">
          {Object.entries(history!).map(([agentId, group]) => {
            const isOpen = openGroups[agentId];
            return (
              <div
                key={agentId}
                className={`${openGroups[agentId] ? 'border-2' : 'border-none'} rounded-2xl p-1`}
              >
                <div
                  onClick={() => toggleGroup(agentId)}
                  className="mb-2 flex cursor-pointer items-center justify-between rounded-md bg-white/20 px-3 py-2 transition hover:bg-gray-500/30"
                >
                  <div className="flex items-center gap-3">
                    <Image
                      src={
                        logoForAgents[group.agentKey as string] ||
                        '/assistants/general_ai.png'
                      }
                      alt="Agent"
                      height={300}
                      width={300}
                      className="h-13.5 w-13.5 rounded-full border-2 border-blue-400 object-cover md:h-15 md:w-15"
                    />

                    <div className="flex flex-col items-start leading-tight">
                      <span className="font-semibold text-white">
                        {group.agentName as string}
                      </span>
                      <span className="text-sm text-gray-300">
                        {group.agentTitle as string}
                      </span>
                    </div>
                  </div>

                  <ChevronDown
                    className={`transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                    size={18}
                  />
                </div>

                {isOpen && (
                  <div className="flex flex-col gap-2">
                    {(group.conversations as Conversation[]).map(
                      (conversation) => (
                        <PreviousChat
                          key={conversation._id}
                          conversation={conversation}
                          setHistory={setHistory}
                        />
                      ),
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PreviousChats;
