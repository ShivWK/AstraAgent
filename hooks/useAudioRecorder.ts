import { useState, useRef } from 'react';

const useAudioRecorder = () => {
  const [recording, setRecording] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunk = useRef<Blob[]>([]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });

    setStream(stream);

    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;

    mediaRecorder.ondataavailable = (event) => {
      chunk.current.push(event.data);
    };

    mediaRecorder.start();
    setRecording(true);
  };

  const stopRecording = (): Promise<Blob> => {
    return new Promise((resolve) => {
      if (!mediaRecorderRef.current) return;

      mediaRecorderRef.current.onstop = () => {
        const audioData = new Blob(chunk.current, {
          type: 'audio/webm',
        });

        chunk.current = [];
        setRecording(false);

        stream?.getTracks().forEach((tracks) => tracks.stop());
        setStream(null);
        resolve(audioData);
      };

      mediaRecorderRef.current.stop();
    });
  };

  return { startRecording, stopRecording, recording, stream: stream };
};

export default useAudioRecorder;
