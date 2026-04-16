import { Spinner } from '@/components/ui/spinner';
import { Payload } from '@/hooks/useChatSocket';
import { ArrowUpFromDot, X } from 'lucide-react';
import { useState } from 'react';

type PropType = {
  sendMessage: (val: Payload) => void;
  stopStream: () => void;
  streaming: boolean;
  setCanScroll: (val: boolean) => void;
  loading: boolean;
};

const TextInputMethod = ({
  sendMessage,
  stopStream,
  streaming,
  setCanScroll,
  loading,
}: PropType) => {
  const [text, setText] = useState('');

  const messageSender = () => {
    const trimmed = text.trim();
    if (!trimmed) return;

    sendMessage({ type: 'text_message', message: text });
    setText('');
    setCanScroll(true);
  };

  const handleSubmit = () => {
    if (streaming) stopStream();
    else {
      messageSender();
      setText('');
    }
  };

  const keyDownHandler = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!streaming) {
        messageSender();
        setText('');
        setCanScroll(true);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      onKeyDown={keyDownHandler}
      className="absolute bottom-5 left-1/2 z-40 flex max-h-[40%] w-[95%] -translate-x-1/2 items-end gap-2 rounded-2xl border-2 border-blue-900 bg-black py-2 pr-2 pl-4 md:bottom-6 md:w-[88%]"
    >
      <textarea
        rows={1}
        onChange={(e) => setText(e.target.value)}
        value={text}
        className="wrap-break-words field-sizing-content max-h-full flex-1 resize-none self-center overflow-auto border border-none border-white text-lg outline-none"
        aria-label="Enter Query"
        placeholder="Enter query"
      />

      <button
        type="button"
        onClick={handleSubmit}
        disabled={!text.trim() && !streaming}
        className={`rounded-lg bg-blue-900 p-2.5 disabled:opacity-50 ${loading && !streaming ? 'cursor-wait opacity-70' : 'cursor-pointer'}`}
      >
        {loading ? (
          streaming ? (
            <X aria-hidden="true" />
          ) : (
            <Spinner className="size-6" />
          )
        ) : (
          <ArrowUpFromDot aria-hidden="true" />
        )}
      </button>
    </form>
  );
};

export default TextInputMethod;
