import { Copy, CheckCheck } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
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
      <div className="mx-auto mb-8 max-w-[80%] animate-pulse overflow-x-auto text-gray-400">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
          components={{
            p: ({ children }) => <p className="my-4">{children}</p>,
            ul: ({ children }) => (
              <ul className="list-disc pl-5">{children}</ul>
            ),
            ol: ({ children }) => (
              <ol className="list-decimal pl-5">{children}</ol>
            ),
            li: ({ children }) => <li className="mb-1">{children}</li>,
          }}
        >
          {chat}
        </ReactMarkdown>
      </div>
    );
  }

  const isUser = writer === 'user';

  return (
    <div
      className={`mb-5 flex w-full ${isUser ? 'justify-end' : 'w-full justify-start'}`}
    >
      <div className="relative max-w-[85%] rounded-xl bg-gray-600/50 p-1 pb-10">
        <div className="pretty-scrollbar w-full overflow-x-auto rounded-xl bg-blue-900 p-3 pb-10 leading-6 wrap-break-word text-white">
          {writer === 'user' ? (
            <p className="wrap-break-word whitespace-pre-wrap">{chat}</p>
          ) : (
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
              components={{
                p: ({ children }) => <p className="my-4">{children}</p>,
                ul: ({ children }) => (
                  <ul className="list-disc pl-5">{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal pl-5">{children}</ol>
                ),
                li: ({ children }) => <li className="mb-1">{children}</li>,
              }}
            >
              {chat}
            </ReactMarkdown>
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
