import { Copy, CheckCheck, BrainCircuit, User } from 'lucide-react';
import ResponseFormatter from './ResponseFormatter';
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
      <div className="relative mx-auto mb-8 max-w-[95%] animate-pulse overflow-x-auto rounded-lg border px-4 py-3 text-gray-400 md:max-w-[85%]">
        <BrainCircuit
          aria-hidden="true"
          className="absolute top-2 left-2 text-gray-400"
          size={18}
          strokeWidth={2.5}
        />
        <ResponseFormatter chat={chat} />
      </div>
    );
  }

  const isUser = writer === 'user';

  return (
    <div
      className={`mb-5 flex w-full ${isUser ? 'justify-end' : 'w-full justify-start'}`}
    >
      <div className="relative max-w-[95%] rounded-xl bg-gray-600/50 p-1 pb-10 md:max-w-[85%]">
        <div className="pretty-scrollbar w-full overflow-x-auto rounded-xl bg-blue-900 p-3 px-4 leading-6 wrap-break-word text-white">
          {writer === 'user' ? (
            <>
              <User
                aria-hidden="true"
                className="absolute right-3 bottom-3 text-green-400"
                size={18}
                strokeWidth={2.5}
              />
              <p className="wrap-break-word whitespace-pre-wrap">{chat}</p>
            </>
          ) : (
            <>
              <BrainCircuit
                aria-hidden="true"
                className="absolute top-2 left-2 text-green-400"
                size={18}
                strokeWidth={2.5}
              />
              <ResponseFormatter chat={chat} />
            </>
          )}

          <div
            className={`absolute flex ${isUser ? (copied ? 'bottom-3 left-3' : 'bottom-2 left-2') : copied ? 'right-3 bottom-3' : 'right-2 bottom-2'} absolute`}
          >
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
    </div>
  );
};

export default ChatBox;
