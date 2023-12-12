// src/App.tsx
import React from 'react';
import DrumPad from '../src/components/DrumPad';
import '../src/css/App.css'; // Import your CSS file for styling
import 'rc-slider/assets/index.css';

const App: React.FC = () => {
  const drumSounds = [
    'BassDrum.wav',
    'SnareDrum.wav',
    'LowTom.wav',
    'MidTom.wav',
    'HighTom.wav',
    'RimShot.wav',
    'Clap.wav',
    'Closed HiHat.wav',
    'Open HiHat.wav',
  ];

  return (
    <div className="drum-machine">
      <h1>Drum Machine</h1>
      <div className="drum-pad-container">
        {drumSounds.map((sound, index) => (
          <DrumPad key={index} soundFile={sound} />
        ))}
      </div>
    </div>
  );
};

export default App;
