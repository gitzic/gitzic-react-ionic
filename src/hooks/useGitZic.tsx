import React, { useState, createContext, useContext, useEffect } from 'react';
import { init, addListenerMidiSuccess, addListenerMidiError } from './GitZic';
import { sequenceData, SequenceData } from './GitZic/sequence';

// inspired by https://github.com/matthewshirley/react-midi-hook

interface Context {
    midi?: WebMidi.MIDIAccess;
    error?: any;
    sequence: SequenceData;
}

export const GitZicContext = createContext<Context>({
    sequence: sequenceData,
});

export function useGitZic() {
    return useContext(GitZicContext);
}

export function GitZicProvider({ children }: React.PropsWithChildren<{}>) {
    const [midi, setMidi] = useState<WebMidi.MIDIAccess>();
    const [error, setError] = useState<any>(false);

    const provided = {
        midi,
        error,
        sequence: sequenceData,
    };

    useEffect(() => {
        addListenerMidiSuccess(setMidi);
        addListenerMidiError(setError);
        init();
    }, []);

    return (
        <GitZicContext.Provider value={provided}>
            {children}
        </GitZicContext.Provider>
    );
}
