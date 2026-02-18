import { Mic } from 'lucide-react';

const AudioInputMethod = () => {
  return (
    <div className="rounded-primary relative flex w-full items-center justify-center bg-linear-to-b from-blue-600/15 via-blue-500/10 to-transparent p-8">
      <button
        aria-label="microphone"
        className="btn-continue transform rounded-full bg-blue-900 p-4 transition-transform duration-150 ease-in-out before:h-[105%] before:w-[105%] after:h-[105%] after:w-[105%] active:scale-95 md:before:h-[110%] md:before:w-[110%] md:after:h-[110%] md:after:w-[110%]"
      >
        <Mic aria-hidden="true" size={70} strokeWidth={1} />
      </button>
    </div>
  );
};

export default AudioInputMethod;
