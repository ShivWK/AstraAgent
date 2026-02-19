import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';
import { useEffect, useState } from 'react';
import { Mic } from 'lucide-react';

const AudioInputMethod = () => {
  const [level, setLevel] = useState(0);
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    if (!listening) return;

    let audioContext: AudioContext | null = null;
    let analyser: AnalyserNode | null = null;
    let dataArray: Uint8Array<ArrayBuffer> | null = null;
    let source: MediaStreamAudioSourceNode | null = null;
    let rafId: number | null = null;
    let stream: MediaStream | null = null;

    async function init() {
      stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      audioContext = new AudioContext();
      analyser = audioContext.createAnalyser();

      source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);

      analyser.fftSize = 256;
      dataArray = new Uint8Array(
        analyser.frequencyBinCount,
      ) as Uint8Array<ArrayBuffer>;

      function update() {
        if (!analyser || !dataArray) return;
        analyser.getByteFrequencyData(dataArray);

        let sum = 0;
        for (let i = 0; i < dataArray.length; i++) {
          sum += dataArray[i];
        }

        const avg = sum / dataArray.length;
        setLevel(avg);

        rafId = requestAnimationFrame(update);
      }

      update();
    }

    init();

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      stream?.getTracks().forEach((track) => track.stop());
      audioContext?.close();
    };
  }, [listening]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doe not support speech recognition.</span>;
  }

  const startListening = () => {
    SpeechRecognition.startListening({ continuous: true });
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
  };

  console.log('level', level);

  return (
    <div className="rounded-primary relative flex w-full items-center justify-center bg-linear-to-b from-black via-blue-600/30 to-black p-9">
      <button
        aria-label="microphone"
        onClick={startListening}
        className={`${listening && 'btn-continue'} btn-continue no-hover transform rounded-full bg-blue-900 p-3 transition-transform duration-150 ease-in-out before:h-[108%] before:w-[108%] after:h-[108%] after:w-[108%] active:scale-95 md:p-4 md:before:h-[110%] md:before:w-[110%] md:after:h-[110%] md:after:w-[110%]`}
      >
        <Mic aria-hidden="true" size={70} strokeWidth={1} />
      </button>
      {listening && (
        <button
          onClick={stopListening}
          className="rounded-primary absolute top-34 bg-red-700 px-2 py-0.5 md:top-36"
        >
          Stop
        </button>
      )}
    </div>
  );
};

export default AudioInputMethod;
