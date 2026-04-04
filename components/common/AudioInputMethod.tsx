import { useEffect, useRef } from 'react';
import { Mic, CircleStop } from 'lucide-react';
import useMicLevel from '@/hooks/useMicLevel';
import hark from 'hark';
import usePCMRecorder from '@/hooks/usePcmRecorder';

type PropType = {
  setMessage: (val: string) => void;
};

const AudioInputMethod = ({ setMessage }: PropType) => {
  const socketRef = useRef<WebSocket | null>(null);
  const { startRecording, stopRecording, recording, stream } =
    usePCMRecorder(socketRef);
  const level = useMicLevel(stream);

  // console.log("level", level)

  useEffect(() => {
    socketRef.current = new WebSocket(process.env.NEXT_PUBLIC_WS_URL as string);

    socketRef.current.onopen = () => {
      console.log('Connected');
    };

    socketRef.current.onmessage = (msg) => {
      const parsed = JSON.parse(msg.data);

      if (parsed.type === 'live_text') {
        console.log('Received live text', parsed.data);
        setMessage(parsed.data);
      }
    };

    return () => {
      socketRef.current?.close();
    };
  }, [setMessage]);

  useEffect(() => {
    if (!stream) return;

    const speechEvents = hark(stream);

    speechEvents.on('speaking', () => {
      console.log('Speaking');
    });

    speechEvents.on('stopped_speaking', () => {
      console.log('Stopped Speaking');

      socketRef.current?.send(JSON.stringify({ type: 'end_of_speech' }));
    });

    return () => {
      speechEvents.stop();
    };
  }, [stream]);

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
