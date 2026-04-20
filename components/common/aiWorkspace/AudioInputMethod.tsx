import { Mic, CircleStop } from 'lucide-react';
import useMicLevel from '@/hooks/useMicLevel';
import useAudioRecorder from '@/hooks/useAudioRecorder';
import { Payload } from '@/hooks/useChatSocket';

type PropType = {
  sendMessage: (val: Payload) => void;
  stopStream: () => void;
};

const AudioInputMethod = ({ sendMessage, stopStream }: PropType) => {
  const { startRecording, stopRecording, recording, stream } = useAudioRecorder(
    { sendMessage, stopStream },
  );
  const level = useMicLevel(stream);

  const micClickHandler = async () => {
    if (recording) {
      stopRecording();
      console.log('Audio recoding stop');
    } else {
      startRecording();
    }
  };

  return (
    <div className="relative z-40 flex w-full items-center justify-center bg-linear-to-b from-black via-blue-600/30 to-black p-12 md:p-9">
      <button
        aria-label="microphone"
        onClick={micClickHandler}
        style={{
          boxShadow: `0 0 ${level / 2}px rgba(59,130,246,0.8)`,
          transform: recording ? `scale(${1 + level / 240})` : '',
        }}
        className="btn-continue no-hover -mt-8 transform rounded-full bg-blue-900 p-3 transition-transform duration-0 ease-in-out before:h-[108%] before:w-[108%] after:h-[108%] after:w-[108%] active:scale-95 md:p-4 md:before:h-[110%] md:before:w-[110%] md:after:h-[110%] md:after:w-[110%]"
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
