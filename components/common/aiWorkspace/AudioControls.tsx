import { Play, Pause } from 'lucide-react';

type PropsType = {
  messageId: string;
  activeId: string | null;
  isPaused: boolean;
  progress: number;
  pause: () => void;
  resume: () => void;
  seek: (val: number) => void;
};

const AudioControls = ({
  messageId,
  activeId,
  isPaused,
  progress,
  pause,
  resume,
  seek,
}: PropsType) => {
  const isActive = activeId === messageId;

  if (!isActive) return null;

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const clientX = e.clientX - rect.left;
    const width = rect.width;

    const percent = clientX / width;
    seek(percent);
  };

  return (
    <div className="animate-fadeIn absolute bottom-1.5 left-1 flex w-[77%] items-center gap-2 rounded-md bg-white/10 py-1.5 pr-2.5 pl-2 backdrop-blur-md md:w-[75%]">
      {isPaused ? (
        <button onClick={resume} className="transition active:scale-95">
          <Play size={16} />
        </button>
      ) : (
        <button onClick={pause} className="transition active:scale-95">
          <Pause size={16} />
        </button>
      )}

      <div
        onClick={handleClick}
        className="relative h-1 flex-1 cursor-pointer overflow-hidden rounded bg-white/40"
      >
        <div
          className="absolute top-0 left-0 h-full bg-blue-400 transition-[width] duration-75"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
    </div>
  );
};

export default AudioControls;
