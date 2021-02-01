import { useCallback, useEffect, useState, useRef } from 'react';

// inspired by https://github.com/matthewshirley/react-midi-hook

export default function useMidi() {
    const [midi, setMidi] = useState<WebMidi.MIDIAccess>();
    const [error, setError] = useState<any>(false);

    if (!navigator.requestMIDIAccess) {
        throw new Error('This browser does not support MIDIAccess');
    }

    const initialize = useCallback(() => {
        return navigator
            .requestMIDIAccess({ sysex: false })
            .then(setMidi, setError);
    }, []);

    useEffect(() => {
        initialize();
    }, [initialize]);

    return { midi, error };
}
