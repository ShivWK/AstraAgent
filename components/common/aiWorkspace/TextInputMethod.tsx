import { Spinner } from '@/components/ui/spinner';
import useAudioRecorder from '@/hooks/useAudioRecorder';
import { Payload } from '@/hooks/useChatSocket';
import useMicLevel from '@/hooks/useMicLevel';
import { ArrowUpFromDot, X, Mic } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

type PropType = {
  sendMessage: (val: Payload) => void;
  stopStream: () => void;
  streaming: boolean;
  loading: boolean;
};

const TextInputMethod = ({
  sendMessage,
  stopStream,
  streaming,
  loading,
}: PropType) => {
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const [text, setText] = useState('');
  const [columnLayout, setColumnLayout] = useState(false);
  const { startRecording, stopRecording, recording, stream, sttLoading } =
    useAudioRecorder(setText);
  const level = useMicLevel(stream);

  const MAX_HEIGHT = 200;

  useEffect(() => {
    const call = () => {
      const ele = inputRef.current;
      if (!ele) return;

      ele.style.height = 'auto';
      const newHeight = Math.min(ele.scrollHeight, MAX_HEIGHT);
      ele.style.height = newHeight + 'px';
      ele.style.overflowY = ele.scrollHeight > MAX_HEIGHT ? 'auto' : 'hidden';

      const BUFFER = 10;

      setColumnLayout((prev) => {
        if (ele.scrollHeight > MAX_HEIGHT + BUFFER) return true;
        if (ele.scrollHeight < MAX_HEIGHT - BUFFER) return false;
        return prev;
      });
    };

    call();
  }, [text]);

  const messageSender = () => {
    const trimmed = text.trim();
    if (!trimmed) return;

    sendMessage({ type: 'text_message', message: text });
    setText('');
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
      }
    }
  };

  const micBtnClickHandler = () => {
    console.log('Clicked');
    if (!recording) {
      startRecording();
    } else {
      stopRecording();
    }
  };

  const intensity = Math.min(1, level / 180); // normalize mic level

  const bgOpacity = 0.25 + intensity * 0.35; // 0.25 → 0.6
  const glowSize = 10 + intensity * 25; // 10px → 35px

  return (
    <form
      onSubmit={handleSubmit}
      onKeyDown={keyDownHandler}
      className={`absolute bottom-5 left-1/2 z-40 flex ${columnLayout ? 'flex-col gap-1 p-3' : 'flex-row gap-1 p-2 pl-3'} w-[95%] -translate-x-1/2 items-end rounded-2xl border-2 border-blue-900 transition-all duration-200 md:bottom-6 md:w-[88%]`}
      style={{
        background: recording
          ? `linear-gradient(
          120deg,
          rgba(59,130,246,${bgOpacity}),
          rgba(99,102,241,0.25)
        )`
          : undefined,

        boxShadow: recording
          ? `0 0 ${glowSize}px rgba(59,130,246,0.6)`
          : undefined,
      }}
    >
      <textarea
        ref={inputRef}
        disabled={recording}
        rows={1}
        onChange={(e) => setText(e.target.value)}
        value={text}
        className={`wrap-break-words resize-none ${!columnLayout ? 'self-center' : 'pr-1'} pretty-scrollbar w-full text-lg outline-none`}
        aria-label="Enter Query"
        placeholder="Enter query"
      />

      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={micBtnClickHandler}
          disabled={!!text.trim() || streaming || loading}
          className={`transform rounded-full bg-gray-900 p-1.5 transition-all duration-150 ease-linear active:scale-95 disabled:cursor-none disabled:opacity-50 ${loading || sttLoading ? 'cursor-wait opacity-70' : 'cursor-pointer'}`}
          style={{
            transform: recording
              ? `scale(${1 + intensity * 0.02})`
              : 'scale(1)',
          }}
        >
          {recording ? (
            sttLoading ? (
              <Spinner className="size-4.5" />
            ) : (
              <X aria-hidden="true" size={18} />
            )
          ) : (
            <Mic aria-hidden="true" size={18} />
          )}
        </button>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={!text.trim() && !streaming}
          className={`rounded-lg bg-blue-900 p-2 disabled:opacity-50 ${loading && !streaming ? 'cursor-wait opacity-70' : 'cursor-pointer'}`}
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
      </div>
    </form>
  );
};

export default TextInputMethod;
