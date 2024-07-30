import React, { useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

const StreamControls: React.FC = () => {
  const [streaming, setStreaming] = useState(false);

  const startStreaming = () => {
    setStreaming(true);
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        socket.emit('stream', stream);
      })
      .catch(error => console.error('Error accessing media devices.', error));
  };

  const stopStreaming = () => {
    setStreaming(false);
    socket.emit('stop');
  };

  return (
    <div>
      <button onClick={startStreaming} disabled={streaming}>Start Streaming</button>
      <button onClick={stopStreaming} disabled={!streaming}>Stop Streaming</button>
    </div>
  );
};

export default StreamControls;
