import { useState, useRef, useEffect } from 'react';

export type Payload = {
  type: string;
  message: string;
};

const useChatSocket = (conversationId: string) => {
  const socketRef = useRef<WebSocket | null>(null);

  const [streaming, setStreaming] = useState(false);
  const [chat, setChat] = useState<Record<string, string>[]>([]);
  const [streamMessage, setStreamMessage] = useState('');
  const [error, setError] = useState('');
  const streamRef = useRef('');

  useEffect(() => {
    const socket = new WebSocket(
      process.env.NEXT_PUBLIC_WS_SERVER_URL as string,
    );
    socketRef.current = socket;

    socketRef.current.onmessage = (msg) => {
      const parsed = JSON.parse(msg.data);

      switch (parsed.type) {
        case 'ai_start':
          console.log('Ai start');
          streamRef.current = '';
          setStreamMessage('');
          setStreaming(true);
          break;

        case 'ai_stream':
          console.log('Ai streaming');
          streamRef.current += parsed.chunk;
          setStreamMessage(streamRef.current);
          setStreaming(true);
          break;

        case 'ai_end':
          console.log('Ai end');
          const finalAnswer = streamRef.current;

          setChat((prv) => {
            return [...prv, { role: 'assistant', content: finalAnswer }];
          });

          streamRef.current = '';
          setStreamMessage('');
          setStreaming(false);
          break;

        case 'error':
          setError(parsed.message);
          setStreaming(false);
          console.log('Error occurred', parsed.message);
          break;
      }
    };

    return () => socket.close();
  }, []);

  const msgSender = (payload: Payload) => {
    socketRef.current?.send(
      JSON.stringify({
        type: payload.type,
        message: payload.message,
        conversationId,
      }),
    );
  };

  const sendMessage = (payload: Payload) => {
    if (payload.type === 'text_message') {
      setChat((prv) => [...prv, { role: 'user', content: payload.message }]);

      msgSender(payload);
      return;
    }

    msgSender(payload);
  };

  const stopStream = () => {
    socketRef.current?.send(JSON.stringify({ type: 'stop' }));
  };

  return {
    chat,
    streamMessage,
    error,
    sendMessage,
    stopStream,
    setChat,
    setStreamMessage,
    streaming,
  };
};

export default useChatSocket;
