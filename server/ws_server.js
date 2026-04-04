import { WebSocketServer } from 'ws';
import WebSocket from 'ws';

const wss = new WebSocketServer({ port: 8080 });

const SARVAM_API_KEY = 'sk_pw92ouxh_K9lKGaMYYTeDhHRyWFOBms1S';

let transcription = '';
let silenceTimer = null;

wss.on('connection', (ws) => {
  console.log('🟢 Client connected');

  const sarvamConnection = new WebSocket(
    'wss://api.sarvam.ai/speech-to-text/ws?model=saaras:v3&language-code=unknown',
    {
      headers: {
        'Api-Subscription-Key': SARVAM_API_KEY,
      },
    },
  );

  sarvamConnection.on('open', () => {
    console.log('Connected to Sarvam WebSocket');
  });

  sarvamConnection.on('error', (err) => {
    console.error('Error with Sarvam WebSocket connection', err);
  });

  sarvamConnection.on('message', (data) => {
    const parsed = JSON.parse(data.toString());

    if (parsed.type === 'data') {
      const text = parsed.data.transcript;
      transcription += text + ' ';

      if (silenceTimer) clearTimeout(silenceTimer);

      silenceTimer = setTimeout(() => {
        console.log(
          'No speech detected for 1.5 seconds, sending transcription to client',
        );
        ws.send(
          JSON.stringify({
            type: 'live_text',
            data: transcription.trim(),
          }),
        );

        transcription = '';
      }, 2500);
    }
  });

  ws.on('message', (data) => {
    try {
      const parsed = JSON.parse(data.toString());

      if (parsed.type === 'audio_chunk') {
        if (sarvamConnection.readyState !== WebSocket.OPEN) {
          console.error(
            'Sarvam connection is not open, cannot send audio chunk',
          );
          return;
        }

        // console.log("Got audio chunk")

        sarvamConnection.send(
          JSON.stringify({
            audio: {
              data: parsed.data,
              sample_rate: '16000',
              encoding: 'audio/wav',
            },
          }),
        );
      }

      if (parsed.type === 'end_of_speech') {
        console.log('End of speech detected, flushing Sarvam connection');

        sarvamConnection.send(JSON.stringify({ type: 'flush' }));
      }
    } catch {
      console.log('🎤 Received chunk:', data.byteLength);
    }
  });

  ws.on('close', () => {
    console.log('🔴 Client disconnected');
  });
});
