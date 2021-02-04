import React, { useState, createContext, useContext, useEffect } from 'react';
import {
    init,
    addListenerMidiSuccess,
    addListenerMidiError,
    Tempo,
    sequencer,
    addListenerBPMchange,
    addListenerInterval,
} from './GitZic';
import { sequenceData, SequenceData } from './GitZic/sequence';

// inspired by https://github.com/matthewshirley/react-midi-hook

interface Context {
    midi?: WebMidi.MIDIAccess;
    error?: any;
    sequence: SequenceData;
    tempo: Tempo;
    time: number;
}

export const GitZicContext = createContext<Context>({
    sequence: sequenceData,
    tempo: sequencer.tempo,
    time: 0,
});

export function useGitZic() {
    return useContext(GitZicContext);
}

export function GitZicProvider({ children }: React.PropsWithChildren<{}>) {
    const [midi, setMidi] = useState<WebMidi.MIDIAccess>();
    const [error, setError] = useState<any>(false);
    const [tempo, setTempo] = useState<Tempo>(sequencer.tempo);
    const [time, setTime] = useState<number>(0);

    const provided = {
        midi,
        error,
        tempo,
        time,
        sequence: sequenceData,
    };

    useEffect(() => {
        addListenerMidiSuccess(setMidi);
        addListenerMidiError(setError);
        addListenerBPMchange(setTempo);
        addListenerInterval(setTime);
        init();
    }, []);

    return (
        <GitZicContext.Provider value={provided}>
            {children}
        </GitZicContext.Provider>
    );
}
