class AudioProcessor extends AudioWorkletProcessor {
    process(inputs, outputs, parameters) {
      const input = inputs[0];  // The first input (microphone)
      const inputChannel = input[0];  // The first channel
  
      if (inputChannel) {
        // Send audio data back to the main thread (for WebSocket)
        this.port.postMessage(inputChannel);
      }
  
      return true;  // Keep processing
    }
  }
  
  registerProcessor('audio-processor', AudioProcessor);
  