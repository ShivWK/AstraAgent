export const createKey = async (text: string, speaker: string) => {
  const normalized = text.trim().replace(/\s+/g, ' ');

  const encoder = new TextEncoder();
  const data = encoder.encode(normalized);

  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));

  const hash = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');

  return `tts_${speaker}_${hash}`;
};
