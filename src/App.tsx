// src/App.tsx
import React, { useEffect, useRef, useState } from 'react';
import DrumPad from '../src/components/DrumPad';
import '../src/css/App.css'; // Import your CSS file for styling
import 'rc-slider/assets/index.css';

// Add this component at the top of App.tsx
interface SoundSelectorProps {
  onSelect: (soundIndex: number) => void;
}

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


  const [stepSequencer, setStepSequencer] = useState<boolean[][]>(
    Array.from({ length: 16 }, () => Array(drumSounds.length).fill(false))
  );

  // Add this component at the top of App.tsx
  interface SoundSelectorProps {
    onSelect: (soundIndex: number) => void;
    selectedSoundIndex: number | null;
  }

  const SoundSelector: React.FC<SoundSelectorProps> = ({ onSelect, selectedSoundIndex }) => {
    return (
      <div className="sound-selector">
        {drumSounds.map((sound, index) => (
          <button
            key={index}
            onClick={() => onSelect(index)}
            className={selectedSoundIndex === index ? 'selected' : ''}
          >
            {sound.replace('.wav', '').replace(/([A-Z])/g, ' $1').trim()}
          </button>
        ))}
      </div>
    );
  };

  const [selectedSoundIndex, setSelectedSoundIndex] = useState<number | null>(null);

  const handleSoundSelect = (index: number) => {
    setSelectedSoundIndex(index);
    // Reset all steps when a new sound is selected
    setStepSequencer((prev) => prev.map(() => Array(drumSounds.length).fill(false)));
  };



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
