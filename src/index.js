const WebSocket = require('ws');
const fs = require('fs');

const server = new WebSocket.Server({ port: 8080 });

// Store received audio chunks in a buffer
let audioBuffer = [];

// Handle new WebSocket connections
server.on('connection', (ws) => {
  console.log('Client connected');

  // Handle incoming binary data (audio chunks)
  ws.on('message', (message, isBinary) => {
    if (isBinary) {
      console.log(`Received audio chunk of size: ${message.length}`);
      audioBuffer.push(message); // Store the binary audio chunks

      // Send confirmation message
      ws.send('Audio chunk received');
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');

    // Optionally, you can save the received audio buffer to a file or process it
    const audioFile = Buffer.concat(audioBuffer);
    fs.writeFileSync('received_audio.wav', audioFile); // Save the audio as a .wav file
    console.log('Saved audio as "received_audio.wav"');
    
    // Clear the buffer after saving
    audioBuffer = [];
  });
});

console.log('WebSocket server running on ws://localhost:8080');
