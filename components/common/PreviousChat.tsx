import { Ellipsis, Pencil, Trash } from 'lucide-react';
import { useState } from 'react';

type PropsType = {
  chat: string;
};

const PreviousChat = ({ chat }: PropsType) => {
  const [openDropdown, setOpenDropdown] = useState(false);

  return (
    <li className="rounded-primary relative flex shrink-0 cursor-pointer items-center px-2 py-1">
      <button className="line-clamp-1 text-start">{chat}</button>
      <button
        onClick={() => setOpenDropdown(!openDropdown)}
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
        <button className="rounded-primary flex transform items-center gap-1 py-1 pr-4 pl-2 text-start transition-all duration-100 ease-linear hover:bg-white/20 active:scale-95">
          <Pencil size={16} />
          <span>Rename</span>
        </button>
        <button className="rounded-primary flex transform items-center gap-1 py-1 pr-4 pl-2 text-start text-red-400 transition-all duration-100 ease-linear hover:bg-white/20 active:scale-95">
          <Trash size={16} />
          <span>Delete</span>
        </button>
      </div>
    </li>
  );
};

export default PreviousChat;
