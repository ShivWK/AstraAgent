import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';
import { Mic } from 'lucide-react';

const AudioInputMethod = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doe not support speech recognition.</span>;
  }

  const startListening = () => {
    SpeechRecognition.startListening();
  };

  const stopListeing = () => {
    SpeechRecognition.stopListening();
  };

  console.log(transcript);

  return (
    <div className="rounded-primary relative flex w-full items-center justify-center bg-linear-to-b from-blue-600/15 via-blue-500/10 to-transparent p-8">
      <button
        aria-label="microphone"
        onClick={startListening}
        className={`${listening && 'btn-continue'} no-hover transform rounded-full bg-blue-900 p-3 transition-transform duration-150 ease-in-out before:h-[108%] before:w-[108%] after:h-[108%] after:w-[108%] active:scale-95 md:p-4 md:before:h-[110%] md:before:w-[110%] md:after:h-[110%] md:after:w-[110%]`}
      >
        <Mic aria-hidden="true" size={70} strokeWidth={1} />
      </button>
      {listening && (
        <button
          onClick={startListening}
          className="rounded-primary absolute top-34 bg-red-700 px-2 py-0.5 md:top-36"
        >
          Stop
        </button>
      )}
    </div>
  );
};

export default AudioInputMethod;
