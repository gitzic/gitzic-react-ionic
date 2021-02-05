import React, { useState, createContext, useContext, useEffect } from 'react';
import {
    init,
    addListenerMidiSuccess,
    addListenerMidiError,
    Tempo,
    sequencer,
    addListenerBPMchange,
    addListenerSeqChange,
} from './GitZic';
import { sequences as sequencesDefault, SequenceData } from './GitZic/sequence';

// inspired by https://github.com/matthewshirley/react-midi-hook

interface Context {
    midi?: WebMidi.MIDIAccess;
    error?: any;
    sequences: SequenceData[];
    tempo: Tempo;
}

export const GitZicContext = createContext<Context>({
    sequences: sequencesDefault,
    tempo: sequencer.tempo,
});

export function useGitZic() {
    return useContext(GitZicContext);
}

export function GitZicProvider({ children }: React.PropsWithChildren<{}>) {
    const [midi, setMidi] = useState<WebMidi.MIDIAccess>();
    const [error, setError] = useState<any>(false);
    const [tempo, setTempo] = useState<Tempo>(sequencer.tempo);
    const [sequences, setSequences] = useState<SequenceData[]>(sequencesDefault);

    const provided = {
        midi,
        error,
        tempo,
        sequences,
    };

    useEffect(() => {
        addListenerMidiSuccess(setMidi);
        addListenerMidiError(setError);
        addListenerBPMchange(setTempo);
        addListenerSeqChange((seq) => { setSequences([...seq]);  });
        init();
    }, []);

    return (
        <GitZicContext.Provider value={provided}>
            {children}
        </GitZicContext.Provider>
    );
}
