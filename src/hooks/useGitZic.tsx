import React, { useState, createContext, useContext, useEffect } from 'react';
import { loadSequences } from './Git';
import {
    init,
    addListenerMidiSuccess,
    addListenerMidiError,
    Tempo,
    sequencer,
    addListenerBPMchange,
    addListenerSeqChange,
    addListenerTrackschange,
    Track,
    defaultTracks,
} from './Zic';
import { sequences as sequencesDefault, SequenceData } from './Zic/sequence';

// inspired by https://github.com/matthewshirley/react-midi-hook

interface Context {
    midi?: WebMidi.MIDIAccess;
    error?: any;
    sequences: SequenceData[];
    tempo: Tempo;
    tracks: Track[];
}

export const GitZicContext = createContext<Context>({
    sequences: sequencesDefault,
    tracks: defaultTracks,
    tempo: sequencer.tempo,
});

export function useGitZic() {
    return useContext(GitZicContext);
}

export function GitZicProvider({ children }: React.PropsWithChildren<{}>) {
    const [midi, setMidi] = useState<WebMidi.MIDIAccess>();
    const [error, setError] = useState<any>(false);
    const [tempo, setTempo] = useState<Tempo>(sequencer.tempo);
    const [sequences, setSequences] = useState<SequenceData[]>(
        sequencesDefault,
    );
    const [tracks, setTracks] = useState<Track[]>(defaultTracks);

    const provided = {
        midi,
        error,
        tempo,
        tracks,
        sequences,
    };

    useEffect(() => {
        addListenerMidiSuccess(setMidi);
        addListenerMidiError(setError);
        addListenerBPMchange(setTempo);
        addListenerSeqChange((seq) => {
            setSequences([...seq]);
        });
        addListenerTrackschange((newTracks) => {
            setTracks([...newTracks]);
        });
        init();
        loadSequences();
    }, []);

    return (
        <GitZicContext.Provider value={provided}>
            {children}
        </GitZicContext.Provider>
    );
}
