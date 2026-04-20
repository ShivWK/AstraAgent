import { useRef, useState } from 'react';
import { Payload } from './useChatSocket';

type PropsType = {
  sendMessage: (val: Payload) => void;
  stopStream: () => void;
};

const usePCMRecorder = ({ sendMessage, stopStream }: PropsType) => {
  const [recording, setRecording] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  // const toBase64 = (buffer: ArrayBuffer) => {
  //   let binary = '';
  //   const bytes = new Uint8Array(buffer);
  //   const chunkSize = 8192;

  //   for (let i = 0; i < bytes.length; i += chunkSize) {
  //     binary += String.fromCharCode(...bytes.slice(i, i + chunkSize));
  //   }

  //   return btoa(binary);
  // };

  const startRecording = async () => {
    if (recording) return;
    sendMessage({ type: 'voice_start' });

    stopStream();

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    setStream(stream);

    const audioContext = new AudioContext({ sampleRate: 16000 });
    audioContextRef.current = audioContext;

    await audioContext.audioWorklet.addModule('/pcm-processor.js');

    const source = audioContext.createMediaStreamSource(stream);
    const workletNode = new AudioWorkletNode(audioContext, 'pcm-processor');

    source.connect(workletNode);
    workletNode.connect(audioContext.destination);

    workletNode.port.onmessage = (event) => {
      const pcm16 = event.data;

      sendMessage({
        type: 'voice_chunk',
        audio: pcm16.buffer,
      });
    };

    setRecording(true);
  };

  const stopRecording = () => {
    audioContextRef.current?.close();
    stream?.getTracks().forEach((t) => t.stop());

    sendMessage({ type: 'voice_end' });
    setRecording(false);
  };

  const interrupt = () => {
    stopStream();
  };

  return { startRecording, stopRecording, recording, interrupt, stream };
};

export default usePCMRecorder;
