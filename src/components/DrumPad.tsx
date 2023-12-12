// src/DrumPad.tsx
import React, { useState, useEffect } from 'react';
import { Howl } from 'howler';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import '../css/DrumPad.css'; // Import the CSS file for DrumPad

interface DrumPadProps {
    soundFile: string;
}

const DrumPad: React.FC<DrumPadProps> = ({ soundFile }) => {
    const [sound, setSound] = useState<Howl | null>(null);
    const [controls, setControls] = useState({
        level: 50,
        pitch: 0,
        decay: 0.5,
        filter: 0,
    });

    useEffect(() => {
        const soundInstance = new Howl({
            src: [`/sounds/${soundFile}`],
            volume: controls.level / 100,
            rate: Math.pow(2, controls.pitch),
            onend: () => {
                setControls((prevControls) => ({ ...prevControls, level: 50, pitch: 0, decay: 0.5, filter: 0 }));
            },
        });
        setSound(soundInstance);

        return () => {
            soundInstance.unload();
        };
    }, [soundFile, controls]);

    const playSound = () => {
        if (sound) {
            sound.play();
        }
    };

    const handleControlChange = (key: keyof typeof controls, value: number | number[]) => {
        // Use the first value if it's an array
        const resolvedValue = Array.isArray(value) ? value[0] : value;
        setControls((prevControls) => ({ ...prevControls, [key]: resolvedValue }));
    };

    return (
        <div className="drum-pad">
            <button onClick={playSound}>
                {soundFile.replace('.wav', '').replace(/([A-Z])/g, ' $1').trim()}
            </button>
            <div className="controls">
                <label>Level</label>
                <Slider
                    min={0}
                    max={100}
                    value={controls.level}
                    onChange={(value) => handleControlChange('level', value)}
                    range={false}
                />

                <label>Pitch</label>
                <Slider
                    min={-12}
                    max={12}
                    value={controls.pitch}
                    onChange={(value) => handleControlChange('pitch', value)}
                    range={false}
                />

                <label>Decay</label>
                <Slider
                    min={0}
                    max={1}
                    step={0.01}
                    value={controls.decay}
                    onChange={(value) => handleControlChange('decay', value)}
                    range={false}
                />

                <label>Filter</label>
                <Slider
                    min={0}
                    max={100}
                    value={controls.filter}
                    onChange={(value) => handleControlChange('filter', value)}
                    range={false}
                />
            </div>
        </div>
    );
};

export default DrumPad;