import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';
import { useEffect, useState } from 'react';
import { Mic, CircleStop } from 'lucide-react';

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
    const NOISE_THRESHOLD = 15;

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
        if (avg > NOISE_THRESHOLD) {
          setLevel(avg - NOISE_THRESHOLD);
        }

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

  useEffect(() => {
    const recognition = SpeechRecognition.getRecognition();

    if (!recognition) return;
    recognition.onend = () => {
      if (listening) {
        SpeechRecognition.startListening({
          continuous: true,
          language: 'en-IN',
          interimResults: true,
        });
      }
    };
  }, [listening]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doe not support speech recognition.</span>;
  }

  const micClickHandler = () => {
    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      resetTranscript();
      SpeechRecognition.startListening({
        continuous: true,
        language: 'en-IN',
        interimResults: true,
      });
    }
  };

  console.log('level', level, transcript);

  return (
    <div className="rounded-primary relative flex w-full items-center justify-center bg-linear-to-b from-black via-blue-600/30 to-black p-9">
      <button
        aria-label="microphone"
        onClick={micClickHandler}
        style={{
          boxShadow: `0 0 ${level / 2}px rgba(59,130,246,0.8)`,
          transform: listening ? `scale(${1 + level / 200})` : '',
        }}
        className={`${listening && 'btn-continue'} btn-continue no-hover transform rounded-full bg-blue-900 p-3 transition-transform duration-[0.05s] ease-in-out before:h-[108%] before:w-[108%] after:h-[108%] after:w-[108%] active:scale-95 md:p-4 md:before:h-[110%] md:before:w-[110%] md:after:h-[110%] md:after:w-[110%]`}
      >
        {listening ? (
          <CircleStop aria-hidden="true" size={70} strokeWidth={1} />
        ) : (
          <Mic aria-hidden="true" size={70} strokeWidth={1} />
        )}
      </button>
    </div>
  );
};

export default AudioInputMethod;
