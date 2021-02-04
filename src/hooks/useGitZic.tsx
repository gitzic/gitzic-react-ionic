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
import { sequenceData, SequenceData } from './GitZic/sequence';

// inspired by https://github.com/matthewshirley/react-midi-hook

interface Context {
    midi?: WebMidi.MIDIAccess;
    error?: any;
    sequence: SequenceData;
    tempo: Tempo;
    seq: SequenceData;
}

export const GitZicContext = createContext<Context>({
    sequence: sequenceData,
    tempo: sequencer.tempo,
    seq: sequenceData,
});

export function useGitZic() {
    return useContext(GitZicContext);
}

export function GitZicProvider({ children }: React.PropsWithChildren<{}>) {
    const [midi, setMidi] = useState<WebMidi.MIDIAccess>();
    const [error, setError] = useState<any>(false);
    const [tempo, setTempo] = useState<Tempo>(sequencer.tempo);
    const [seq, setSeq] = useState<SequenceData>(sequenceData);

    const provided = {
        midi,
        error,
        tempo,
        seq,
        sequence: sequenceData,
    };

    useEffect(() => {
        addListenerMidiSuccess(setMidi);
        addListenerMidiError(setError);
        addListenerBPMchange(setTempo);
        addListenerSeqChange((seq) => { setSeq({...seq});  });
        init();
    }, []);

    return (
        <GitZicContext.Provider value={provided}>
            {children}
        </GitZicContext.Provider>
    );
}
