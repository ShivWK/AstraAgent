import { Copy, CheckCheck, BrainCircuit, User } from 'lucide-react';
import ResponseFormatter from './ResponseFormatter';
import { useState } from 'react';
import PlayButton from './PlayButton';
import AudioControls from './AudioControls';

type PropsType = UserType | AgentType | SystemType;

type UserType = {
  writer: 'user';
  chat: Record<string, string>;
};

type SystemType = {
  writer: 'system';
  chat: string;
};

type AgentType = {
  writer: 'assistant';
  chat: Record<string, string>;
  activeId: string | null;
  loadingId: string | null;
  isPaused: boolean;
  progress: number;
  play: (id: string, text: string) => Promise<void>;
  stop: () => void;
  pause: () => void;
  resume: () => void;
  seek: (val: number) => void;
};

const ChatBox = (props: PropsType) => {
  const { writer, chat } = props;
  const isUser = writer === 'user';

  const [copied, setCopied] = useState(false);

  const handleCopyClick = async () => {
    try {
      if (writer === 'assistant' || writer === 'user') {
        await navigator.clipboard.writeText(chat.content);
      } else {
        await navigator.clipboard.writeText(chat);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  if (writer === 'system') {
    return (
      <div className="relative mr-auto mb-8 max-w-[95%] animate-pulse overflow-x-auto rounded-lg border px-4 py-3 text-gray-400 md:max-w-[85%]">
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

  return (
    <div
      className={`mb-5 flex w-full ${isUser ? 'justify-end' : 'w-full justify-start'}`}
    >
      <div className="relative max-w-[95%] rounded-xl bg-gray-800 p-1 pb-10 md:max-w-[85%]">
        <div className="pretty-scrollbar w-full overflow-x-auto rounded-xl bg-blue-900 p-3 px-4 leading-6 wrap-break-word text-white">
          {writer === 'user' ? (
            <>
              <User
                aria-hidden="true"
                className="absolute right-3 bottom-3 text-green-400"
                size={18}
                strokeWidth={2.5}
              />
              <p className="wrap-break-word whitespace-pre-wrap">
                {chat.content}
              </p>
            </>
          ) : (
            <>
              <BrainCircuit
                aria-hidden="true"
                className="absolute top-2 left-2 text-green-400"
                size={18}
                strokeWidth={2.5}
              />
              <ResponseFormatter chat={chat.content} />
            </>
          )}

          {writer === 'assistant' &&
            props.loadingId === null &&
            props.activeId === chat._id && (
              <AudioControls
                messageId={chat._id}
                activeId={props.activeId}
                isPaused={props.isPaused}
                progress={props.progress}
                pause={props.pause}
                resume={props.resume}
                seek={props.seek}
              />
            )}

          {writer === 'assistant' && (
            <PlayButton
              messageId={chat._id}
              message={chat.content}
              play={props.play}
              stop={props.stop}
              activeId={props.activeId}
              loadingId={props.loadingId}
            />
          )}

          <div
            className={`absolute ${isUser ? (copied ? 'bottom-2 left-3' : 'bottom-1 left-2') : copied ? 'right-3 bottom-2' : 'right-2 bottom-1'}`}
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
                className="mt-1.5 transform rounded-md p-1 transition-all duration-150 ease-linear hover:bg-white/20 active:scale-95"
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
