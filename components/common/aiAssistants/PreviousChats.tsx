import Image from 'next/image';
import { logoForAgents } from '@/utils/text_assistants';
import { Conversation } from '@/types/conversation';
import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';

type PropsType = {
  history: Record<string, Record<string, string | Conversation[]>>;
};

const PreviousChats = ({ history }: PropsType) => {
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});
  const router = useRouter();

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

  const handleConversationClick = (
    id: string,
    mode: string,
    agentId: string,
  ) => {
    router.push(
      `/ai-workspace?conversation_id=${id}&mode=${mode}&agentId=${agentId}`,
    );
  };

  return (
    <div>
      <h2 className="mb-2 text-xl font-semibold md:text-2xl dark:text-white">
        Previous Conversations
      </h2>
      {Object.keys(history!).length === 0 ? (
        <p className="text-gray-400">No previous conversations</p>
      ) : (
        <div className="flex flex-col gap-6">
          {Object.entries(history!).map(([agentId, group]) => {
            const isOpen = openGroups[agentId];
            return (
              <div key={agentId}>
                {/* 🔹 Agent Header (clickable) */}
                <div
                  onClick={() => toggleGroup(agentId)}
                  className="mb-2 flex cursor-pointer items-center justify-between rounded-md p-2 transition hover:bg-gray-700/30"
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
                      className="h-12 w-12 rounded-full border-2 border-blue-400 object-cover shadow-[0_0_15px_2px_#155dfc]"
                    />

                    <div className="flex flex-col items-start leading-tight">
                      <span className="text-sm font-semibold text-white">
                        {group.agentName as string}
                      </span>
                      <span className="text-xs text-gray-400">
                        {group.agentTitle as string}
                      </span>
                    </div>
                  </div>

                  {/* 🔽 Arrow */}
                  <ChevronDown
                    className={`transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                    size={18}
                  />
                </div>

                {/* 🔹 Conversations List */}
                {isOpen && (
                  <div className="flex flex-col gap-2">
                    {(group.conversations as Conversation[]).map(
                      (conversation) => (
                        <div
                          onClick={() =>
                            handleConversationClick(
                              conversation._id,
                              conversation.mode,
                              conversation.agentId,
                            )
                          }
                          key={conversation._id}
                          className="cursor-pointer rounded-md bg-gray-500/40 px-3 py-2 text-start text-sm text-gray-200 transition hover:bg-gray-600/50"
                        >
                          {conversation.title || 'Untitled Conversation'}
                        </div>
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
