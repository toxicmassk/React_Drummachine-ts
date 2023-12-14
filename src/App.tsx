// src/App.tsx
import React, { useEffect, useRef, useState } from 'react';
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

  const [controls, setControls] = useState({
    volume: 50,
    pitch: 0,
    decay: 0.5,
    filter: 0,
  });
  let index = 0;
  const controlsRef = useRef(controls);
  useEffect(() => {
    controlsRef.current = controls

  }, [controls]);
  // TODO: 1) Create empty / each undefined sequences array with 16 rows and 16 columns (now we have 2/4),
  // TODO: 2) Handle undefined for not exisitng wav.file, if sequence at current index is undefined, dont instantinate and dont play
  // TODO: 3) Global change on pitch
  // TODO: 4) Change intervall delay with slider(bpm switch) global asset 
  const sequences = [
    ['BassDrum.wav', undefined, 'BassDrum.wav', undefined],
    ['Clap.wav', 'Clap.wav', 'Clap.wav', 'Clap.wav']
  ]
  const play = () => {
    setInterval(() => {
      sequences.map(sequence => {
        const soundInstance = new Howl({
          src: [`/sounds/${sequence[index % 4]}`],
          volume: controlsRef.current.volume / 100,
          rate: 0,
        })
        soundInstance.play();
      });
      index += 1;
    }, 1000)
  };

  return (
    <div className="drum-machine">
      <h1>Drum Machine</h1>
      <button onClick={() => {
        play()
      }}> play</button>
      <input type='range' min='0' max='100' onChange={(event) => {
        setControls((prevControls) => ({ ...prevControls, volume: Number(event.target.value) }));
      }} />
      <div className="drum-pad-container">
        {drumSounds.map((sound, index) => (
          <DrumPad key={index} soundFile={sound} />

        ))}
      </div>
    </div>
  );
};

export default App;
