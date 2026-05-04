import { useState, Dispatch, SetStateAction } from 'react';
import { X } from 'lucide-react';
import { Spinner } from '@/components/ui/spinner';
import { useRouter } from 'next/navigation';
import { Conversation } from '@/types/conversation';

type PropsType = {
  conversation: Conversation;
  setHistory: Dispatch<
    SetStateAction<Record<
      string,
      Record<string, string | Conversation[]>
    > | null>
  >;
};

const PreviousChat = ({ conversation, setHistory }: PropsType) => {
  const [deleteLoading, setDeleteLoading] = useState(false);
  const router = useRouter();

  const handleConversationClick = (
    id: string,
    mode: string,
    agentId: string,
  ) => {
    if (deleteLoading) return;
    router.push(
      `/ai-workspace?conversation_id=${id}&mode=${mode}&agentId=${agentId}`,
    );
  };

  const crossClickHandler = async (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string,
    agentId: string,
  ) => {
    if (deleteLoading) return;
    setDeleteLoading(true);
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
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div
      onClick={() =>
        handleConversationClick(
          conversation._id,
          conversation.mode,
          conversation.agentId,
        )
      }
      className={`flex cursor-pointer items-center justify-between rounded-md bg-gray-500/40 px-2 py-1.5 text-start text-sm text-gray-200 transition hover:bg-gray-600/50 ${deleteLoading && 'opacity-50'}`}
    >
      <span className="line-clamp-1 basis-full">
        {conversation.title || 'Untitled Conversation'}
      </span>
      <button
        aria-label="Delete Chat"
        onClick={(e) =>
          crossClickHandler(e, conversation._id, conversation.agentId)
        }
        className="rounded-full bg-gray-700/50 p-0.5"
      >
        {deleteLoading ? (
          <Spinner className="size-5" />
        ) : (
          <X aria-hidden="true" size={19.5} />
        )}
      </button>
    </div>
  );
};

export default PreviousChat;
