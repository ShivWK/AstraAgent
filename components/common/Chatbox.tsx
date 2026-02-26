import { Copy, CheckCheck } from 'lucide-react';
import { useState } from 'react';

type PropsType = {
  writer: string;
  chat: string;
};

const ChatBox = ({ writer, chat }: PropsType) => {
  const [copied, setCopied] = useState(false);

  const handleCopyClick = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`${writer === 'agent' ? 'float-start' : 'float-end'} mb-5 max-w-[85%] rounded-xl bg-blue-900 p-2 text-lg text-white after:clear-both after:table md:max-w-2/3`}
    >
      <p className="leading-6">{chat}</p>
      {copied ? (
        <CheckCheck
          className={`mt-3.5 ${writer === 'agent' ? 'float-end' : 'float-start'}`}
          aria-hidden="true"
          strokeWidth={1.5}
          size={18}
        />
      ) : (
        <button
          aria-label="Copy"
          title="copy"
          onClick={() => handleCopyClick(chat)}
          className={`mt-1.5 ${writer === 'agent' ? 'float-end' : 'float-start'} transform cursor-pointer rounded-md p-1 transition-all duration-150 ease-linear hover:bg-white/20 active:scale-95`}
        >
          <Copy aria-hidden="true" strokeWidth={1.5} size={18} />
        </button>
      )}
    </div>
  );
};

export default ChatBox;
