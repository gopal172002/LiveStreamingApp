import React from 'react';
import StreamControls from './components/StreamControls';
import VideoPlayer from './components/VideoPlayer';
import './styles/App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <VideoPlayer />
      <StreamControls />
    </div>
  );
};

export default App;
