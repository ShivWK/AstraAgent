import { useRef, useState } from 'react';

const usePCMRecorder = (socketRef: React.RefObject<WebSocket | null>) => {
  const [recording, setRecording] = useState(false);

  const audioContextRef = useRef<AudioContext | null>(null);
  const workletNodeRef = useRef<AudioWorkletNode | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  // let bufferQueue: Int16Array[] = [];

  const startRecording = async () => {
    // const resultStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    // setStream(resultStream)
    // const audioContext = new AudioContext({ sampleRate: 16000 });
    // audioContextRef.current = audioContext;
    // await audioContext.audioWorklet.addModule('/pcm-processor.js');
    // const source = audioContext.createMediaStreamSource(resultStream);
    // const workletNode = new AudioWorkletNode(audioContext, 'pcm-processor');
    // workletNodeRef.current = workletNode;
    // source.connect(workletNode);
    // workletNode.connect(audioContext.destination);
    // workletNode.port.onmessage = (event) => {
    //   const chunk = event.data; // Int16Array
    //   bufferQueue.push(chunk);
    //   const totalLength = bufferQueue.reduce((acc, arr) => acc + arr.length, 0);
    //   // 🔥 send ~50ms chunks (800 samples)
    //   if (totalLength >= 800) {
    //     const combined = new Int16Array(totalLength);
    //     let offset = 0;
    //     for (const arr of bufferQueue) {
    //       combined.set(arr, offset);
    //       offset += arr.length;
    //     }
    //     // bufferQueue = [];
    //     if (socketRef.current?.readyState === WebSocket.OPEN) {
    //       socketRef.current.send(combined.buffer);
    //     }
    //   }
    // };
    // setRecording(true);
  };

  const stopRecording = () => {
    workletNodeRef.current?.disconnect();
    audioContextRef.current?.close();
    setRecording(false);
  };

  return {
    startRecording,
    stopRecording,
    recording,
    stream,
  };
};

export default usePCMRecorder;
