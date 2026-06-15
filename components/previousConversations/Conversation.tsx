import { useDeleteConversation } from '@/hooks/queries/conversation/useDeleteConversation';
import { useRouter } from 'next/navigation';
import { type Conversation } from '@/types/conversation';
import { X } from 'lucide-react';
import { Spinner } from '@/components/ui/spinner';

type PropsType = {
  conversation: Conversation;
};

const Conversation = ({ conversation }: PropsType) => {
  const { mutate, isPending, reset } = useDeleteConversation();
  const router = useRouter();

  const handleConversationClick = (
    id: string,
    mode: string,
    agentId: string,
  ) => {
    if (isPending) return;
    router.push(
      `/ai-workspace?conversation_id=${id}&mode=${mode}&agentId=${agentId}`,
    );
  };

  const crossClickHandler = async (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string,
  ) => {
    e.stopPropagation();
    mutate(id, {
      onSuccess: () => {
        reset();
      },
    });
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
      className={`flex cursor-pointer items-center justify-between rounded-md bg-gray-500/40 px-2 py-1.5 text-start text-sm text-gray-200 transition hover:bg-gray-600/50 ${isPending && 'opacity-50'}`}
    >
      <span className="line-clamp-1 basis-full select-none">
        {conversation.title || 'Untitled Conversation'}
      </span>
      <button
        aria-label="Delete Chat"
        onClick={(e) => crossClickHandler(e, conversation._id)}
        className="rounded-full bg-gray-700/50 p-0.5"
      >
        {isPending ? (
          <Spinner className="size-5" />
        ) : (
          <X aria-hidden="true" size={19.5} />
        )}
      </button>
    </div>
  );
};

export default Conversation;
