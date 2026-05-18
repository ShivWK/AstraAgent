import { Spinner } from '@/components/ui/spinner';
import useAudioRecorder from '@/hooks/useAudioRecorder';
import { Payload } from '@/hooks/useSocket';
import useMicLevel from '@/hooks/useMicLevel';
import { ArrowUpFromDot, X, Mic } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import DotBounceLoader from '../common/DotBounceLoader';
import useAppSelector from '@/hooks/useAppSelector';
import { selectTheme } from '@/features/theme/themeSlice';
import themeResolver from '@/utils/themeResolver';

type PropType = {
  setHasMessage: (val: boolean) => void;
  sendMessage: (val: Payload) => void;
  stopStream: () => void;
  streaming: boolean;
  loading: boolean;
  dbLoading: boolean;
  connected: boolean;
};

const TextInputMethod = ({
  setHasMessage,
  sendMessage,
  stopStream,
  streaming,
  loading,
  dbLoading,
  connected,
}: PropType) => {
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const [text, setText] = useState('');
  const { startRecording, stopRecording, recording, stream, sttLoading } =
    useAudioRecorder(setText);
  const level = useMicLevel(stream);

  const currentTheme = useAppSelector(selectTheme);

  const MAX_HEIGHT = 200;

  useEffect(() => {
    const call = () => {
      const ele = inputRef.current;
      if (!ele) return;

      ele.style.height = 'auto';
      const newHeight = Math.min(ele.scrollHeight, MAX_HEIGHT);
      ele.style.height = newHeight + 'px';
      ele.style.overflowY = ele.scrollHeight > MAX_HEIGHT ? 'auto' : 'hidden';
    };

    call();
  }, [text]);

  const messageSender = () => {
    const trimmed = text.trim();
    if (!trimmed) return;

    sendMessage({ type: 'text_message', message: text });
    setText('');
    inputRef.current?.blur();
    setHasMessage(true);
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

  const intensity = Math.min(1, level / 180);

  const resolvedTheme =
    currentTheme === 'system' ? themeResolver() : currentTheme;
  const isLight = resolvedTheme === 'light';

  return (
    <form
      onSubmit={handleSubmit}
      onKeyDown={keyDownHandler}
      className={`absolute bottom-3 left-1/2 z-40 flex w-[95%] -translate-x-1/2 flex-col items-end gap-0.5 rounded-xl border-2 border-white p-1 transition-all duration-150 md:bottom-4 md:w-[88%] dark:border-blue-900`}
      style={{
        background: recording
          ? `linear-gradient(
              120deg,
              rgba(${90 + intensity * 120},130,255,${0.45 + intensity * 0.35}),
              rgba(139,92,246,${0.3 + intensity * 0.35}),
              rgba(59,130,246,${0.2 + intensity * 0.25})
            ), 
            ${isLight ? '#B1D0F5' : '#000'}`
          : isLight
            ? '#B1D0F5'
            : '#000',
        boxShadow: recording
          ? `
              0 0 ${12 + intensity * 20}px rgba(59,130,246,0.8),
              0 0 ${20 + intensity * 25}px rgba(139,92,246,0.35)
            `
          : undefined,
        transition: 'all 80ms linear',
      }}
    >
      <textarea
        ref={inputRef}
        disabled={recording || !connected}
        rows={1}
        onChange={(e) => setText(e.target.value)}
        value={text}
        className={`wrap-break-words 'self-center' pretty-scrollbar w-full resize-none p-1 text-black outline-none placeholder:text-gray-600 dark:text-white dark:placeholder:text-gray-500`}
        aria-label="Enter Query"
        placeholder={
          sttLoading
            ? 'Transcribing...'
            : !connected || dbLoading
              ? 'Connecting...'
              : recording
                ? 'Listening...'
                : 'Enter query'
        }
      />

      <div className="flex w-full items-center justify-between">
        <div
          className="transform rounded-full transition-all duration-75"
          style={{
            transform: recording ? `scale(${1 + intensity * 0.5})` : 'scale(1)',
          }}
        >
          <button
            type="button"
            onClick={micBtnClickHandler}
            disabled={streaming || loading || !connected}
            className={`transform rounded-md p-1.5 ${recording ? 'bg-black/50' : 'bg-blue-500 dark:bg-blue-900'} text-white transition-all duration-150 ease-linear active:scale-95 disabled:cursor-none disabled:opacity-50 ${loading || sttLoading || !connected ? 'cursor-wait opacity-70' : 'cursor-pointer'}`}
          >
            {recording ? (
              <X aria-hidden="true" className="size-5.5 md:size-4.5" />
            ) : sttLoading ? (
              <Spinner className="size-5.5 md:size-4.5" />
            ) : (
              <Mic aria-hidden="true" className="size-5.5 md:size-4.5" />
            )}
          </button>
        </div>

        {streaming && (
          <div className="-mb-0.5">
            <DotBounceLoader allColor="text-black dark:text-gray-400" />
          </div>
        )}

        <button
          type="button"
          onClick={handleSubmit}
          disabled={(!text.trim() && !streaming) || !connected}
          className={`flex items-center gap-1.5 rounded-md bg-blue-500 p-1.5 px-2.5 text-white disabled:cursor-not-allowed disabled:opacity-70 md:text-sm dark:bg-blue-900 ${loading && !streaming ? 'cursor-wait opacity-70' : 'cursor-pointer'}`}
        >
          {loading ? (
            streaming ? (
              <>
                <span>Writing...</span>
                <X aria-hidden="true" size={18} />
              </>
            ) : (
              <>
                <span>Processing...</span>
                <Spinner className="size-4.5" />
              </>
            )
          ) : (
            <>
              <span>Send</span>
              <ArrowUpFromDot
                aria-hidden="true"
                size={18}
                className="rotate-45 transform"
              />
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default TextInputMethod;
