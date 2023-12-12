// src/App.tsx
import React from 'react';
import DrumPad from './DrumPad';

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
        <div>
            <h1>React Drum Machine</h1>
            <div className="drum-machine">
                {drumSounds.map((sound, index) => (
                    <DrumPad key={index} soundFile={sound} />
                ))}
            </div>
        </div>
    );
};

export default App;
