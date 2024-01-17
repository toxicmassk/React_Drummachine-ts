import React, { useEffect, useRef, useState } from 'react';
import DrumPad from '../src/components/DrumPad';
import '../src/css/App.css';
import 'rc-slider/assets/index.css';
import { Howl } from 'howler';
import SoundSelector from './components/SoundSelector'; // Import the SoundSelector component

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
    controlsRef.current = controls;
  }, [controls]);

  const [stepSequencer, setStepSequencer] = useState<boolean[][]>(
    Array.from({ length: 16 }, () => Array(drumSounds.length).fill(false))
  );

  const [selectedSoundIndex, setSelectedSoundIndex] = useState<number | null>(null);

  const handleSoundSelect = (index: number) => {
    setSelectedSoundIndex(index);
    setStepSequencer((prev) => prev.map(() => Array(drumSounds.length).fill(false)));
  };

  const play = () => {
    const intervalId = setInterval(() => {
      stepSequencer.forEach((steps, stepIndex) => {
        steps.forEach((selected, soundIndex) => {
          if (selected) {
            const soundInstance = new Howl({
              src: [`/sounds/${drumSounds[soundIndex]}`],
              volume: controlsRef.current.volume / 100,
              rate: 0,
            });
            soundInstance.play();
          }
        });
      });
      index = (index + 1) % 16;
    }, /* Calculate delay based on BPM */);

    // ... existing code
  };

  return (
    <div className="drum-machine">
      <h1>Drum Machine</h1>
      <button onClick={() => play()}>Play</button>
      <input
        type="range"
        min="0"
        max="100"
        onChange={(event) => {
          setControls((prevControls) => ({ ...prevControls, volume: Number(event.target.value) }));
        }}
      />
      <div className="drum-pad-container">
        {drumSounds.map((sound, index) => (
          <DrumPad key={index} soundFile={sound} />
        ))}
      </div>
      <SoundSelector onSelect={handleSoundSelect} selectedSoundIndex={selectedSoundIndex} />
      <div className="step-sequencer">
        {stepSequencer.map((steps, stepIndex) => (
          <div key={stepIndex} className="step">
            {steps.map((selected, soundIndex) => (
              <button
                key={soundIndex}
                className={selected ? 'selected' : ''}
                onClick={() => {
                  setStepSequencer((prev) =>
                    prev.map((row, rowIndex) =>
                      rowIndex === stepIndex
                        ? row.map((value, colIndex) => (colIndex === selectedSoundIndex ? !value : value))
                        : row
                    )
                  );
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;

