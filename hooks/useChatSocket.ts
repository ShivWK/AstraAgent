import { useState, useRef, useEffect } from 'react';

const useChatSocket = (conversationId: string) => {
  const socketRef = useRef<WebSocket | null>(null);

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
          streamRef.current = '';
          setStreamMessage('');
          break;

        case 'ai_stream':
          streamRef.current += parsed.chunk;
          setStreamMessage(streamRef.current);
          break;

        case 'ai_end':
          setChat((prv) => {
            return [...prv, { role: 'assistant', content: streamRef.current }];
          });
          streamRef.current = '';
          setStreamMessage('');
          break;

        case 'error':
          setError(parsed.message);
          console.log('Error occurred', parsed.message);
          break;
      }
    };

    return () => socket.close();
  }, []);
};
