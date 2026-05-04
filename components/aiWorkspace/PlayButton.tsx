import { Volume2, X } from 'lucide-react';
import { Spinner } from '@/components/ui/spinner';

type PropsType = {
  messageId: string;
  message: string;
  activeId: string | null;
  loadingId: string | null;
  play: (id: string, text: string) => Promise<void>;
  stop: () => void;
};

const PlayButton = ({
  messageId,
  message,
  activeId,
  loadingId,
  play,
  stop,
}: PropsType) => {
  const isActive = activeId === messageId;
  const isLoading = loadingId === messageId;

  const handleClick = () => {
    if (isLoading || loadingId !== null) return;

    if (isActive) {
      stop();
    } else {
      play(messageId, message);
    }
  };

  return (
    <button
      className="absolute right-10 bottom-1.5 transform rounded-full border-none p-1 transition-all duration-150 ease-linear outline-none hover:bg-white/20 active:scale-95 disabled:pointer-events-none disabled:opacity-50 md:right-11"
      onClick={handleClick}
      disabled={isLoading || (loadingId !== null && loadingId !== messageId)}
    >
      {isLoading ? (
        <Spinner className="size-4.5" />
      ) : isActive ? (
        <X aria-hidden="true" size={18} />
      ) : (
        <Volume2 aria-hidden="true" strokeWidth={1.5} size={19} />
      )}
    </button>
  );
};

export default PlayButton;
