import { Dispatch, SetStateAction, useRef, useState } from 'react';

const useAudioRecorder = (onResult: Dispatch<SetStateAction<string>>) => {
  const [recording, setRecording] = useState(false);
  const [sttLoading, setSttLoading] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const startRecording = async () => {
    if (recording) return;

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    setStream(stream);

    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;
    chunksRef.current = [];

    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        chunksRef.current.push(e.data);
      }
    };

    mediaRecorder.onstop = async () => {
      const audioBlob = new Blob(chunksRef.current, {
        type: 'audio/webm',
      });

      stream?.getTracks().forEach((t) => t.stop());
      setStream(null);

      const formData = new FormData();
      formData.append('file', audioBlob);

      setSttLoading(true);
      const res = await fetch('/api/stt', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      onResult((prv) => {
        if (prv === '') {
          return data.text;
        } else {
          return prv + ' ' + data.text;
        }
      });
      setSttLoading(false);
    };

    // Error handling in API, also error boundary is remaining to be build

    mediaRecorder.start();
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setRecording(false);

    stream?.getTracks().forEach((t) => t.stop());
    setStream(null);
  };

  return { startRecording, stopRecording, recording, stream, sttLoading };
};

export default useAudioRecorder;
