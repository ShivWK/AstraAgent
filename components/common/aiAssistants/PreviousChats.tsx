import Image from 'next/image';
import { logoForAgents } from '@/utils/text_assistants';
import { Conversation } from '@/types/conversation';
import { useState, useEffect, SetStateAction, Dispatch } from 'react';
import { ChevronDown, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

type PropsType = {
  history: Record<string, Record<string, string | Conversation[]>>;
  setHistory: Dispatch<
    SetStateAction<Record<
      string,
      Record<string, string | Conversation[]>
    > | null>
  >;
};

const PreviousChats = ({ history, setHistory }: PropsType) => {
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

  const crossClickHandler = async (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string,
    agentId: string,
  ) => {
    e.stopPropagation();
    try {
      const response = await fetch(
        `/api/conversation/delete_conversation?id=${id}`,
        {
          method: 'DELETE',
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setHistory((prv) => {
        if (!prv?.[agentId]) return prv;

        const conversations = prv[agentId].conversations || [];
        return {
          ...prv,
          [agentId]: {
            ...prv[agentId],
            conversations: (conversations as Conversation[]).filter(
              (obj) => obj._id !== id,
            ),
          },
        };
      });
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
      } else {
        console.log('Random error in delete', err);
      }
    }
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
                <div
                  onClick={() => toggleGroup(agentId)}
                  className="mb-2 flex cursor-pointer items-center justify-between rounded-md bg-white/20 p-2 transition hover:bg-gray-700/30"
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
                          className="flex cursor-pointer items-center justify-between rounded-md bg-gray-500/40 px-2 py-1.5 text-start text-sm text-gray-200 transition hover:bg-gray-600/50"
                        >
                          <span className="line-clamp-1 basis-full">
                            {conversation.title || 'Untitled Conversation'}
                          </span>
                          <button
                            aria-label="Delete Chat"
                            onClick={(e) =>
                              crossClickHandler(e, conversation._id, agentId)
                            }
                            className="rounded-full bg-gray-700/50 p-0.5"
                          >
                            <X aria-hidden="true" size={18} />
                          </button>
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
