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
  const [stepSequencers, setStepSequencers] = useState<boolean[][][]>(
    Array.from({ length: drumSounds.length }, () =>
      Array.from({ length: 16 }, () => Array(drumSounds.length).fill(false))
    )
  );

  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleSoundSelect = (index: number) => {
    setSelectedSoundIndex(index);
    setCurrentStep(0);
  };

  const play = () => {
    setIsPlaying((prev) => !prev);
    setCurrentStep(0);

    const intervalId = setInterval(() => {
      if (isPlaying) {
        drumSounds.forEach((sound, soundIndex) => {
          if (stepSequencers[soundIndex][currentStep]) {
            const soundInstance = new Howl({
              src: [`/sounds/${sound}`],
              volume: controlsRef.current.volume / 100,
              rate: 0,
            });
            soundInstance.play();
          }
        });
        setCurrentStep((prev) => (prev + 1) % 16);
      } else {
        clearInterval(intervalId);
      }
    }, /* Calculate delay based on BPM */);
  };


  return (
    <div className="drum-machine">
      <h1>Drum Machine</h1>
      <button onClick={play}>{isPlaying ? 'Pause' : 'Play'}</button>
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
        {drumSounds.map((sound, soundIndex) => (
          <div key={soundIndex} className="step">
            {Array.from({ length: 16 }).map((_, stepIndex) => (
              <button
                key={stepIndex}
                className={stepIndex === currentStep ? 'selected' : ''}
                onClick={() => {
                  setStepSequencers((prev) =>
                    prev.map((soundRow, rowIndex) =>
                      rowIndex === selectedSoundIndex
                        ? [
                          ...soundRow.slice(0, stepIndex),
                          !soundRow[stepIndex],
                          ...soundRow.slice(stepIndex + 1),
                        ].map((value) => (Array.isArray(value) ? value : [value]))
                        : soundRow
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

