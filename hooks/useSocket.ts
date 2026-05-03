import { useSession } from 'next-auth/react';
import { useState, useRef, useEffect } from 'react';
import useAppDispatch from './useAppDispatch';
import { setTokens } from '@/features/auth/authSlice';

export type Payload = {
  type: 'text_message';
  message: string;
};

export type Message = {
  role: 'user' | 'assistant';
  content: string;
};

const useSocket = (conversationId: string) => {
  const { data: sessionData, update } = useSession();
  const dispatch = useAppDispatch();

  const updateRef = useRef(update);
  useEffect(() => {
    updateRef.current = update;
  }, [update]);

  const socketRef = useRef<WebSocket | null>(null);
  const [loading, setLoading] = useState(false);
  const [aiStarted, setAiStarted] = useState(false);
  const [streaming, setStreaming] = useState(false);
  const [chat, setChat] = useState<Message[]>([]);
  const [streamMessage, setStreamMessage] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [connected, setConnected] = useState(false);
  const streamRef = useRef('');

  useEffect(() => {
    const token = sessionData?.accessToken;
    if (!token) return;

    const socket = new WebSocket(
      `${process.env.NEXT_PUBLIC_WS_SERVER_URL}?token=${token}`,
    );
    socketRef.current = socket;

    socket.onopen = () => {
      setConnected(true);
      console.log('WS connected');
    };

    socket.onerror = (event) => {
      console.log('Error in connection', event);
      setError('Something went wrong. Please try after sometime');
      setConnected(false);
    };

    socket.onclose = () => {
      setConnected(false);
    };

    socket.onmessage = async (msg) => {
      const parsed = JSON.parse(msg.data);

      switch (parsed.type) {
        case 'ai_start':
          // console.log('Ai start');
          streamRef.current = '';
          setStreamMessage('');
          setAiStarted(true);
          break;

        case 'ai_stream':
          // console.log('Ai streaming');
          setAiStarted(false);
          streamRef.current += parsed.chunk;
          setStreamMessage(streamRef.current);
          setStreaming(true);
          break;

        case 'ai_end': {
          // console.log('Ai end');
          const finalAnswer = streamRef.current;

          setChat((prv) => {
            return [...prv, { role: 'assistant', content: finalAnswer }];
          });

          streamRef.current = '';
          setStreamMessage('');
          setAiStarted(false);
          setStreaming(false);
          setLoading(false);
          break;
        }

        case 'usage':
          dispatch(
            setTokens({
              type: 'decrement',
              currentValue: parsed.tokensUsed,
            }),
          );
          break;

        case 'error':
          setError(parsed.message);
          setStreaming(false);
          setLoading(false);
          console.log('Error occurred', parsed.message);
          break;
      }
    };

    return () => {
      socket.close();
    };
  }, [sessionData?.accessToken, dispatch]);

  const msgSender = (payload: Payload) => {
    socketRef.current?.send(
      JSON.stringify({
        type: payload.type,
        conversationId,
        message: payload.message,
      }),
    );
  };

  const sendMessage = (payload: Payload) => {
    if (socketRef.current?.readyState !== WebSocket.OPEN) return;
    setLoading(true);

    setChat((prv) => [...prv, { role: 'user', content: payload.message }]);
    msgSender(payload);
  };

  const stopStream = () => {
    socketRef.current?.send(JSON.stringify({ type: 'stop' }));
  };

  return {
    chat,
    connected,
    streamMessage,
    error,
    sendMessage,
    stopStream,
    setChat,
    setStreamMessage,
    streaming,
    modelLoading: loading,
    setError,
    aiStarted,
  };
};

export default useSocket;
