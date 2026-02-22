import { useEffect, useState } from 'react';
import { Mic, CircleStop } from 'lucide-react';
import useAudioRecorder from '@/hooks/useAudioRecorder';
import useMicLevel from '@/hooks/useMicLevel';

type PropType = {
  setMessage: (val: string) => void;
};

const AudioInputMethod = ({ setMessage }: PropType) => {
  const { startRecording, stopRecording, recording } = useAudioRecorder();
  const level = useMicLevel(recording);
  const [audio, setAudio] = useState<Blob | null>(null);

  const micClickHandler = async () => {
    if (recording) {
      const audioData = await stopRecording();
      console.log('Audio recoding', audioData);

      setAudio(audioData);

      const audioURL = URL.createObjectURL(audioData);
      const audio = new Audio(audioURL);
      audio.play();
    } else {
      startRecording();
    }
  };

  return (
    <div className="rounded-primary relative z-40 flex w-full items-center justify-center bg-linear-to-b from-black via-blue-600/30 to-black p-12 md:p-9">
      <button
        aria-label="microphone"
        onClick={micClickHandler}
        style={{
          boxShadow: `0 0 ${level / 2}px rgba(59,130,246,0.8)`,
          transform: recording ? `scale(${1 + level / 200})` : '',
        }}
        className={`${recording && 'btn-continue'} btn-continue no-hover transform rounded-full bg-blue-900 p-3 transition-transform duration-[0.05s] ease-in-out before:h-[108%] before:w-[108%] after:h-[108%] after:w-[108%] active:scale-95 md:p-4 md:before:h-[110%] md:before:w-[110%] md:after:h-[110%] md:after:w-[110%]`}
      >
        {recording ? (
          <CircleStop aria-hidden="true" size={70} strokeWidth={1} />
        ) : (
          <Mic aria-hidden="true" size={70} strokeWidth={1} />
        )}
      </button>
    </div>
  );
};

export default AudioInputMethod;
