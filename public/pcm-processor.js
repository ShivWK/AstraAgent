class PCMProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
  }

  process(inputs) {
    const input = inputs[0];
    console.log('processing...');

    if (!input || input.length === 0) return true;

    const channelData = input[0]; // mono

    // 🔽 Downsample 48kHz → 16kHz
    const downsampled = this.downsampleBuffer(channelData, 48000, 16000);

    // 🔽 Convert Float32 → Int16
    const pcm16 = this.floatTo16BitPCM(downsampled);

    // 🔽 Send to main thread
    this.port.postMessage(pcm16);

    return true;
  }

  downsampleBuffer(buffer, inputRate, outputRate) {
    if (outputRate === inputRate) return buffer;

    const sampleRateRatio = inputRate / outputRate;
    const newLength = Math.round(buffer.length / sampleRateRatio);
    const result = new Float32Array(newLength);

    let offsetResult = 0;
    let offsetBuffer = 0;

    while (offsetResult < result.length) {
      const nextOffsetBuffer = Math.round((offsetResult + 1) * sampleRateRatio);
      let accum = 0;
      let count = 0;

      for (
        let i = offsetBuffer;
        i < nextOffsetBuffer && i < buffer.length;
        i++
      ) {
        accum += buffer[i];
        count++;
      }

      result[offsetResult] = accum / count;
      offsetResult++;
      offsetBuffer = nextOffsetBuffer;
    }

    return result;
  }

  floatTo16BitPCM(float32Array) {
    const buffer = new ArrayBuffer(float32Array.length * 2);
    const view = new DataView(buffer);

    let offset = 0;

    for (let i = 0; i < float32Array.length; i++, offset += 2) {
      let s = Math.max(-1, Math.min(1, float32Array[i]));
      view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
    }

    return buffer;
  }
}

registerProcessor('pcm-processor', PCMProcessor);
