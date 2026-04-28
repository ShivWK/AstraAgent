import { useCallback, useEffect, useRef, useState } from 'react';
import { useSession } from 'next-auth/react';

export type Payload = {
  type: 'text_message';
  message: string;
};

export type Message = {
  role: 'user' | 'assistant';
  content: string;
};

type ServerMessage =
  | { type: 'ai_start' }
  | { type: 'ai_message'; message: string }
  | { type: 'ai_end' }
  | { type: 'error'; message: string }
  | { type: 'usage'; tokensUsed: number };

const MAX_RECONNECT_ATTEMPTS = 5;
const RECONNECT_INTERVAL = 2000;

const useChatSocket = (conversationId: string) => {
  const { data: session, update } = useSession();

  const socketRef = useRef<WebSocket | null>(null);
  const reconnectAttemptsRef = useRef(0);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const streamRef = useRef('');
  const connectRef = useRef<() => void>(() => {});

  const [modelLoading, setModelLoading] = useState(false);
  const [streaming, setStreaming] = useState(false);
  const [chat, setChat] = useState<Message[]>([]);
  const [streamMessage, setStreamMessage] = useState('');
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearReconnectTimeout = () => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }
  };

  const resetStreamingState = () => {
    setStreaming(false);
    setModelLoading(false);
    streamRef.current = '';
    setStreamMessage('');
  };

  const cleanupSocket = () => {
    const socket = socketRef.current;
    if (!socket) return;

    socket.onopen = null;
    socket.onmessage = null;
    socket.onerror = null;
    socket.onclose = null;

    socket.close();
    socketRef.current = null;
  };

  const scheduleReconnect = useCallback(() => {
    if (reconnectAttemptsRef.current >= MAX_RECONNECT_ATTEMPTS) {
      setError('Unable to reconnect. Please refresh the page.');
      return;
    }

    clearReconnectTimeout();

    reconnectAttemptsRef.current += 1;
    reconnectTimeoutRef.current = setTimeout(() => {
      connectRef.current();
    }, RECONNECT_INTERVAL);
  }, []);

  const handleMessage = useCallback(
    async (e: MessageEvent) => {
      try {
        const parsed: ServerMessage = JSON.parse(e.data);

        switch (parsed.type) {
          case 'ai_start':
            streamRef.current = '';
            setStreamMessage('');
            setStreaming(true);
            break;

          case 'ai_message':
            streamRef.current += parsed.message;
            setStreamMessage(streamRef.current);
            break;

          case 'ai_end': {
            const finalAnswer = streamRef.current;

            if (finalAnswer.trim()) {
              setChat((prv) => [
                ...prv,
                { role: 'assistant', content: finalAnswer },
              ]);
            }

            resetStreamingState();
            break;
          }

          case 'usage':
            await update();
            break;

          case 'error':
            setError(parsed.message);
            resetStreamingState();
            console.log('Error occurred:', parsed.message);
            break;
        }
      } catch (err) {
        console.error('Error parsing message:', err);
        setError('Invalid server response');
        resetStreamingState();
      }
    },
    [update],
  );

  const connect = useCallback(() => {
    const token = session?.accessToken;
    if (!token) return;

    cleanupSocket();

    try {
      const socket = new WebSocket(
        `${process.env.NEXT_PUBLIC_WS_SERVER_URL}?token=${token}`,
      );
      socketRef.current = socket;

      socket.onopen = () => {
        console.log('WebSocket connected');
        setConnected(true);
        reconnectAttemptsRef.current = 0;
        setError(null);
      };

      socket.onmessage = handleMessage;

      socket.onerror = (err) => {
        setError('WebSocket error. Please try again later.');
        console.error('WebSocket error:', err);
      };

      socket.onclose = (event) => {
        setConnected(false);
        resetStreamingState();
        scheduleReconnect();

        console.log(
          `WebSocket closed (code: ${event.code}, reason: ${event.reason})`,
        );
      };
    } catch (err) {
      console.error('WebSocket connection error:', err);
      return;
    }
  }, [session?.accessToken, handleMessage, scheduleReconnect]);

  useEffect(() => {
    connectRef.current = connect;
  }, [connect]);

  useEffect(() => {
    if (session?.accessToken) {
      connect();
    }

    return () => {
      clearReconnectTimeout();
      cleanupSocket();
    };
  }, [session?.accessToken, connect]);

  const sendMessage = useCallback(
    (payload: Payload) => {
      const socket = socketRef.current;

      if (!socket || socket.readyState !== WebSocket.OPEN) {
        setError('Connection not ready.');
        return;
      }

      setError(null);
      setModelLoading(true);

      setChat((prev) => [...prev, { role: 'user', content: payload.message }]);

      socket.send(
        JSON.stringify({
          type: payload.type,
          conversationId,
          message: payload.message,
        }),
      );
    },
    [conversationId],
  );

  const stopStream = useCallback(() => {
    const socket = socketRef.current;

    if (!socket || socket.readyState !== WebSocket.OPEN) return;

    socket.send(JSON.stringify({ type: 'stop', conversationId }));
  }, [conversationId]);

  const reconnect = useCallback(() => {
    reconnectAttemptsRef.current = 0;
    connect();
  }, [connect]);

  return {
    chat,
    streamMessage,
    streaming,
    modelLoading,
    connected,
    error,
    sendMessage,
    stopStream,
    setChat,
    setStreamMessage,
    setError,
    reconnect,
  };
};

export default useChatSocket;
