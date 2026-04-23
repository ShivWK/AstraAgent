import { useRef, useState } from 'react';

const useTts = (speaker = 'shubh') => {
  // voice can be "shubh", "ritu"
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  const cleanupAudion = () => {
    if (!audioRef.current) return;

    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  };

  const play = async (id: string, text: string) => {
    if (activeId == id && audioRef.current) {
      if (audioRef.current.paused) {
        await audioRef.current.play();
        setIsPaused(false);
      } else {
        audioRef.current.pause();
        setIsPaused(true);
      }

      return;
    }

    cleanupAudion();

    const key = `tts_${id}`;

    setLoadingId(id);
    setActiveId(id);
    setIsPaused(false);

    try {
      let audioBase64: string | null = null;

      const cached = localStorage.getItem(key);

      if (cached) {
        audioBase64 = cached;

        setLoadingId(null);
        setActiveId(id);
      } else {
        const res = await fetch('api/tts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            text,
            speaker,
          }),
        });

        const result = await res.json();

        if (!res.ok) {
          throw new Error(result.message);
        }

        audioBase64 = result.audio;

        try {
          localStorage.setItem(key, audioBase64 as string);
        } catch {
          console.log('TTS cache full');
        }

        setLoadingId(null);
        setActiveId(id);
      }

      const audio = new Audio(`data:audio/mp3;base64,${audioBase64}`);
      audioRef.current = audio;

      audio.ontimeupdate = () => {
        if (!audio.duration) return;
        setProgress(audio.currentTime / audio.duration);
      };

      audio.onended = () => {
        setActiveId(null);
        setProgress(0);
        setIsPaused(false);
      };

      await audio.play();
      setIsPaused(false);
    } catch (err) {
      console.log('Error in TTS', err);
      setLoadingId(null);
      //   use toast
    }
  };

  const pause = () => {
    if (!audioRef.current) return;

    audioRef.current?.pause();
    setIsPaused(true);
  };

  const resume = async () => {
    if (!audioRef.current) return;

    await audioRef.current?.play();
    setIsPaused(true);
  };

  const stop = () => {
    cleanupAudion();

    setIsPaused(false);
    setActiveId(null);
    setLoadingId(null);
    setProgress(0);
  };

  return {
    play,
    pause,
    resume,
    stop,
    progress,
    isPaused,
    loadingId,
    activeId,
  };
};

export default useTts;
