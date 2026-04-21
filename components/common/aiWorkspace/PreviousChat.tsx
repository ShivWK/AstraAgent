import { Ellipsis, Pencil, Trash } from 'lucide-react';
import { useState } from 'react';
import { type Conversation } from '@/types/conversation';
import { Dispatch, SetStateAction } from 'react';
import RenameModal from './RenameModal';
import { useRouter } from 'next/navigation';

type PropsType = {
  chat: string;
  id: string;
  setHistory: Dispatch<SetStateAction<Conversation[] | null>>;
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
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter();

  const moreOptionsClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setOpenDropdown(!openDropdown);
  };

  const handleDeleteOperation = async () => {
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

      setHistory((prv) => prv!.filter((chat) => chat._id !== id));
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
      } else {
        console.log('Random error in delete', err);
      }
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
        className={`rounded-primary relative flex shrink-0 cursor-pointer items-center justify-between gap-1 px-1 py-1 transition-all duration-150 ease-linear ${currentConversation?._id === id ? 'bg-white/20' : 'hover:bg-white/20'}`}
      >
        <button
          onClick={handleOpenConversation}
          className="line-clamp-1 basis-full text-start"
        >
          {chat}
        </button>
        <button
          onClick={moreOptionsClickHandler}
          aria-haspopup="menu"
          aria-controls="chat-menu"
          aria-label="More options"
          aria-expanded="false"
        >
          <Ellipsis aria-hidden="true" />
        </button>

        <div
          className={`${openDropdown ? 'block' : 'hidden'} rounded-primary absolute top-7 right-1 z-50 flex flex-col p-2 dark:bg-blue-900`}
          id="chat-menu"
        >
          <button
            onClick={handleRenameClick}
            className="rounded-primary flex transform items-center gap-1 py-1 pr-4 pl-2 text-start transition-all duration-100 ease-linear hover:bg-white/20 active:scale-95"
          >
            <Pencil size={16} />
            <span>Rename</span>
          </button>
          <button
            onClick={handleDeleteOperation}
            className="rounded-primary flex transform items-center gap-1 py-1 pr-4 pl-2 text-start text-red-400 transition-all duration-100 ease-linear hover:bg-white/20 active:scale-95"
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
      />
    </>
  );
};

export default PreviousChat;
