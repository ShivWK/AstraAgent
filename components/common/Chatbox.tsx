import { CopyPlus } from 'lucide-react';

type PropsType = {
  writer: string;
  chat: string;
};

const ChatBox = ({ writer, chat }: PropsType) => {
  return (
    <div
      className={`${writer === 'agent' ? 'float-start' : 'float-end'} mb-5 max-w-[85%] rounded-xl bg-blue-900 p-3 text-lg text-white after:clear-both after:table md:max-w-2/3`}
    >
      <p>{chat}</p>
      <button
        aria-label="Copy"
        title="copy"
        className={`mt-3 ${writer === 'agent' ? 'float-end' : 'float-start'} cursor-pointer`}
      >
        <CopyPlus aria-hidden="true" strokeWidth={1.5} size={18} />
      </button>
    </div>
  );
};

export default ChatBox;
