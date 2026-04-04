import { useState, useRef } from 'react';

const useAudioRecorder = (socketRef: React.RefObject<WebSocket | null>) => {
  const [recording, setRecording] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });

    setStream(stream);

    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0 && socketRef.current?.readyState === 1) {
        const reader = new FileReader();

        reader.onloadend = () => {
          const base64 = (reader.result as string).split(',')[1];
          console.log('Sending chunk...');

          socketRef.current?.send(
            JSON.stringify({
              type: 'audio_chunk',
              data: base64,
            }),
          );
        };

        reader.readAsDataURL(event.data);
      }
    };

    mediaRecorder.start(250);
    setRecording(true);
  };

  const stopRecording = () => {
    if (!mediaRecorderRef.current) return;

    mediaRecorderRef.current.stop();
    setRecording(false);

    stream?.getTracks().forEach((tracks) => tracks.stop());
    setStream(null);
  };

  return { startRecording, stopRecording, recording, stream: stream };
};

export default useAudioRecorder;
