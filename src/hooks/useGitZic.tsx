import React, { useState, createContext, useContext, useEffect } from 'react';
import { init, addListenerMidiSuccess, addListenerMidiError, Tempo, sequencer, addListenerBPMchange } from './GitZic';
import { sequenceData, SequenceData } from './GitZic/sequence';

// inspired by https://github.com/matthewshirley/react-midi-hook

interface Context {
    midi?: WebMidi.MIDIAccess;
    error?: any;
    sequence: SequenceData;
    tempo: Tempo;
}

export const GitZicContext = createContext<Context>({
    sequence: sequenceData,
    tempo: sequencer.tempo,
});

export function useGitZic() {
    return useContext(GitZicContext);
}

export function GitZicProvider({ children }: React.PropsWithChildren<{}>) {
    const [midi, setMidi] = useState<WebMidi.MIDIAccess>();
    const [error, setError] = useState<any>(false);
    const [tempo, setTempo] = useState<Tempo>(sequencer.tempo);

    const provided = {
        midi,
        error,
        tempo,
        sequence: sequenceData,
    };

    useEffect(() => {
        addListenerMidiSuccess(setMidi);
        addListenerMidiError(setError);
        addListenerBPMchange(setTempo);
        init();
    }, []);

    return (
        <GitZicContext.Provider value={provided}>
            {children}
        </GitZicContext.Provider>
    );
}
