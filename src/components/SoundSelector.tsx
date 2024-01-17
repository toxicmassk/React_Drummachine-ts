// SoundSelector.tsx
import React from 'react';

interface SoundSelectorProps {
    onSelect: (soundIndex: number) => void;
    selectedSoundIndex: number | null;
}

const SoundSelector: React.FC<SoundSelectorProps> = ({ onSelect, selectedSoundIndex }) => {
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

export default SoundSelector;
