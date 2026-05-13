import { Ellipsis, Pencil, Trash } from 'lucide-react';
import { useRef, useState } from 'react';
import { type Conversation } from '@/types/conversation';
import { Dispatch, SetStateAction } from 'react';
import RenameModal from './RenameModal';
import { useRouter } from 'next/navigation';
import { type Agent } from '@/types/agents';
import useClickOutside from '@/hooks/useClickOutside';

type PropsType = {
  chat: string;
  id: string;
  setHistory: Dispatch<
    SetStateAction<{
      loading: boolean;
      conversation: Conversation | null;
      conversationHistory: Conversation[] | null;
      currentAgent: Agent | null;
    }>
  >;
  currentConversation: Conversation | null;
  agentId: string;
  mode: string | null;
};

const PreviousChat = ({
  chat,
  id,
  setHistory,
  currentConversation,
  agentId,
  mode,
}: PropsType) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [renameLoading, setRenameLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter();

  const popupRef = useRef<HTMLDivElement | null>(null);
  useClickOutside(popupRef, () => setOpenDropdown(false), openDropdown);

  const moreOptionsClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setOpenDropdown(true);
  };

  const handleDeleteOperation = async () => {
    try {
      setOpenDropdown(false);
      setDeleteLoading(true);
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
        if (!prv.conversationHistory) return prv;

        return {
          ...prv,
          conversationHistory: prv.conversationHistory!.filter(
            (chat) => chat._id !== id,
          ),
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

  const handleRenameClick = () => {
    setOpenModal(true);
    setOpenDropdown(false);
  };

  const handleOpenConversation = () => {
    router.push(
      `/ai-workspace?conversation_id=${id}&mode=${mode}&agentId=${agentId}`,
    );
  };

  return (
    <>
      <li
        className={`rounded-primary relative flex shrink-0 cursor-pointer items-center justify-between gap-1 px-1 py-1 transition-all duration-150 ease-linear ${currentConversation?._id === id ? 'bg-gray-200 dark:bg-white/20' : 'text-white hover:bg-gray-300/70 md:text-black hover:dark:bg-white/20 md:dark:text-white'}`}
      >
        <button
          onClick={handleOpenConversation}
          className={`line-clamp-1 basis-full text-start disabled:opacity-50 ${renameLoading && 'opacity-50'}`}
          disabled={deleteLoading}
        >
          {chat}
        </button>
        <button
          onClick={moreOptionsClickHandler}
          disabled={deleteLoading || renameLoading}
          aria-haspopup="menu"
          aria-controls="chat-menu"
          aria-label="More options"
          aria-expanded="false"
        >
          <Ellipsis aria-hidden="true" />
        </button>

        <div
          ref={popupRef}
          className={`${openDropdown ? 'block' : 'hidden'} absolute top-7.5 right-1 z-50 flex flex-col rounded-md bg-blue-500 p-2 dark:bg-blue-800`}
          id="chat-menu"
        >
          <div
            id="triangle"
            className="absolute -top-2 left-1/2 h-0 w-0 translate-x-[145%] border-r-12 border-b-12 border-l-12 border-r-transparent border-b-blue-500 border-l-transparent dark:border-b-blue-800"
          ></div>

          <button
            onClick={handleRenameClick}
            disabled={deleteLoading}
            className="rounded-primary flex transform items-center gap-1 py-1 pr-4 pl-2 text-start font-medium tracking-wider text-white transition-all duration-100 ease-linear hover:bg-white/20 active:scale-95 disabled:opacity-50"
          >
            <Pencil size={16} />
            <span>Rename</span>
          </button>
          <button
            onClick={handleDeleteOperation}
            disabled={deleteLoading}
            className="rounded-primary flex transform items-center gap-1 py-1 pr-4 pl-2 text-start font-medium tracking-wider text-red-400 transition-all duration-100 ease-linear hover:bg-white/20 active:scale-95 disabled:opacity-50"
          >
            <Trash size={16} />
            <span>Delete</span>
          </button>
        </div>
      </li>
      <RenameModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        initialValue={chat}
        conversationId={id}
        setHistory={setHistory}
        setRenameLoading={setRenameLoading}
      />
    </>
  );
};

export default PreviousChat;
