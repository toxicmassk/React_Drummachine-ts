// src/DrumPad.tsx
import React, { useState, useEffect } from 'react';
import { Howl } from 'howler';

interface DrumPadProps {
    soundFile: string;
}

const DrumPad: React.FC<DrumPadProps> = ({ soundFile }) => {
    const [sound, setSound] = useState<Howl | null>(null);

    useEffect(() => {
        const sound = new Howl({ src: [`/sounds/${soundFile}`] });
        setSound(sound);

        return () => {
            // Cleanup sound on unmount
            sound.unload();
        };
    }, [soundFile]);

    const playSound = () => {
        if (sound) {
            sound.play();
        }
    };

    return (
        <button onClick={playSound}>
            {soundFile.replace('.wav', '').replace(/([A-Z])/g, ' $1').trim()}
        </button>
    );
};

export default DrumPad;

