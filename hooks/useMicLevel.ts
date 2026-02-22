import { useEffect, useState } from 'react';

const useMicLevel = (recording: boolean) => {
  const [level, setLevel] = useState(0);

  useEffect(() => {
    if (!recording) return;

    let audioContext: AudioContext | null = null;
    let analyser: AnalyserNode | null = null;
    let dataArray: Uint8Array<ArrayBuffer> | null = null;
    let source: MediaStreamAudioSourceNode | null = null;
    let rafId: number | null = null;
    let stream: MediaStream | null = null;
    const NOISE_THRESHOLD = 0;

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
  }, [recording]);

  return level;
};

export default useMicLevel;
