import React, { useEffect, useRef } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

const VideoPlayer: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    socket.on('stream', (stream: any) => {
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    });

    return () => {
      socket.off('stream');
    };
  }, []);

  return (
    <video ref={videoRef} autoPlay muted />
  );
};

export default VideoPlayer;
