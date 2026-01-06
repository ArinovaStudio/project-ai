export async function startPCMStream(
  onChunk: (pcm16: Float32Array) => void
) {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

  const audioCtx = new AudioContext(); // browser native rate (usually 48k)
  const source = audioCtx.createMediaStreamSource(stream);
  const processor = audioCtx.createScriptProcessor(4096, 1, 1);

  processor.onaudioprocess = (e) => {
    const input = e.inputBuffer.getChannelData(0);
    const downsampled = downsampleBuffer(
      input,
      audioCtx.sampleRate,
      16000
    );
    onChunk(downsampled);
  };

  source.connect(processor);
  processor.connect(audioCtx.destination);

  return { ctx: audioCtx, stream, processor };
}

/* 🔥 Proper downsampling */
function downsampleBuffer(
  buffer: Float32Array,
  inputRate: number,
  outputRate: number
) {
  if (outputRate === inputRate) return buffer;

  const ratio = inputRate / outputRate;
  const newLength = Math.round(buffer.length / ratio);
  const result = new Float32Array(newLength);

  let offset = 0;
  for (let i = 0; i < newLength; i++) {
    const nextOffset = Math.round((i + 1) * ratio);
    let sum = 0;
    let count = 0;

    for (let j = offset; j < nextOffset && j < buffer.length; j++) {
      sum += buffer[j];
      count++;
    }

    result[i] = sum / count;
    offset = nextOffset;
  }

  return result;
}
