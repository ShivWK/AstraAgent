import { useEffect, useState } from 'react';

const useMicLevel = (stream: MediaStream | null) => {
  const [level, setLevel] = useState(0);

  useEffect(() => {
    if (!stream) return;

    let rafId: number;
    const audioContext = new AudioContext();
    const analyser = audioContext.createAnalyser();

    const source = audioContext.createMediaStreamSource(stream!);
    source.connect(analyser);

    analyser.fftSize = 256;
    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    function update() {
      if (!analyser || !dataArray) return;
      analyser.getByteTimeDomainData(dataArray);

      let sum = 0;
      for (let i = 0; i < dataArray.length; i++) {
        sum += dataArray[i];
      }

      const avg = sum / dataArray.length;
      setLevel(avg);
      rafId = requestAnimationFrame(update);
    }

    update();

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      audioContext?.close();
    };
  }, [stream]);

  return level;
};

export default useMicLevel;
