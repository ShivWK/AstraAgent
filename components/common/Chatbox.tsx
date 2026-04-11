import { Copy, CheckCheck } from 'lucide-react';
import { useState } from 'react';

type PropsType = {
  writer: string;
  chat: string;
};

const ChatBox = ({ writer, chat }: PropsType) => {
  const [copied, setCopied] = useState(false);

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(chat);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  if (writer === 'system') {
    return (
      <div className="mx-auto mb-8 max-w-[80%] animate-pulse text-center text-gray-400">
        {chat}
      </div>
    );
  }

  const isUser = writer === 'user';

  return (
    <div
      className={`mb-5 flex w-full ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div className="max-w-[95%] rounded-xl bg-blue-900 p-3 text-white md:max-w-2/3">
        <p className="leading-6 wrap-break-word whitespace-pre-wrap">{chat}</p>

        <div className={`flex ${isUser ? 'justify-start' : 'justify-end'}`}>
          {copied ? (
            <CheckCheck
              className="mt-3.5"
              aria-hidden="true"
              strokeWidth={1.5}
              size={18}
            />
          ) : (
            <button
              aria-label="Copy"
              title="copy"
              onClick={handleCopyClick}
              className={`mt-1.5 transform rounded-md p-1 transition-all duration-150 ease-linear hover:bg-white/20 active:scale-95`}
            >
              <Copy aria-hidden="true" strokeWidth={1.5} size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
