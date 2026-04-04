import { useRef, useState } from 'react';

const usePCMRecorder = (socketRef: React.RefObject<WebSocket | null>) => {
  const [recording, setRecording] = useState(false);

  const audioContextRef = useRef<AudioContext | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    setStream(stream);

    const audioContext = new AudioContext({ sampleRate: 16000 });
    audioContextRef.current = audioContext;

    const source = audioContext.createMediaStreamSource(stream);

    const processor = audioContext.createScriptProcessor(4096, 1, 1);
    processorRef.current = processor;

    source.connect(processor);
    processor.connect(audioContext.destination);

    processor.onaudioprocess = (event) => {
      const inputData = event.inputBuffer.getChannelData(0);

      // Converting Float32 to Int16
      const int16Buffer = new Int16Array(inputData.length);

      for (let i = 0; i < inputData.length; i++) {
        int16Buffer[i] = Math.max(-1, Math.min(1, inputData[i])) * 32767;
      }

      // Converting to Base64
      const base64 = bufferToBase64(int16Buffer.buffer);

      if (socketRef.current?.readyState === WebSocket.OPEN) {
        socketRef.current.send(
          JSON.stringify({
            type: 'audio_chunk',
            data: base64,
          }),
        );
      }
    };

    setRecording(true);
  };

  const stopRecording = () => {
    processorRef.current?.disconnect();
    audioContextRef.current?.close();

    stream?.getTracks().forEach((tracks) => tracks.stop());
    setStream(null);

    setRecording(false);
  };

  return {
    startRecording,
    stopRecording,
    recording,
    stream,
  };
};

function bufferToBase64(buffer: ArrayBuffer) {
  let binary = '';
  const bytes = new Uint8Array(buffer);

  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }

  return btoa(binary);
}

export default usePCMRecorder;
