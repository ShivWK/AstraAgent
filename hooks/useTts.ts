import { useSession } from 'next-auth/react';
import { useRef, useState } from 'react';

const ttsCache = new Map<string, string>();

const useTts = (speaker = 'shubh') => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { update } = useSession();

  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  const cleanupAudio = () => {
    if (!audioRef.current) return;

    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  };

  const play = async (id: string, text: string) => {
    if (loadingId) return;
    if (activeId === id && audioRef.current) {
      if (audioRef.current.paused) {
        await audioRef.current.play();
        setIsPaused(false);
      } else {
        audioRef.current.pause();
        setIsPaused(true);
      }
      return;
    }

    cleanupAudio();

    const key = `tts_${id}_${speaker}`;

    setLoadingId(id);
    setActiveId(null);
    setIsPaused(false);

    try {
      let audioBase64: string | null = null;

      if (ttsCache.has(key)) {
        audioBase64 = ttsCache.get(key)!;

        setLoadingId(null);
        setActiveId(id);
      } else {
        const res = await fetch('/api/tts', {
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
        ttsCache.set(key, audioBase64!);
        await update();

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

      const MAX_SIZE = 5;

      if (ttsCache.size > MAX_SIZE) {
        const firstKey = ttsCache.keys().next().value;
        ttsCache.delete(firstKey!);
      }
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
    setIsPaused(false);
  };

  const stop = () => {
    cleanupAudio();

    setIsPaused(false);
    setActiveId(null);
    setLoadingId(null);
    setProgress(0);
    audioRef.current = null;
  };

  const seek = (percent: number) => {
    if (!audioRef.current || !audioRef.current.duration) return;

    audioRef.current.currentTime = percent * audioRef.current.duration;
  };

  return {
    play,
    pause,
    resume,
    stop,
    seek,
    progress,
    isPaused,
    loadingId,
    activeId,
  };
};

export default useTts;
