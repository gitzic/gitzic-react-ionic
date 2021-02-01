import React, { useState, createContext, useContext, useEffect } from 'react';
import { init, addListenerMidiSuccess, addListenerMidiError } from './GitZic';

// inspired by https://github.com/matthewshirley/react-midi-hook

export const GitZicContext = createContext<any>({});

export function useGitZic() {
    return useContext(GitZicContext);
}

export function GitZicProvider({ children }: React.PropsWithChildren<{}>) {
    const [midi, setMidi] = useState<WebMidi.MIDIAccess>();
    const [error, setError] = useState<any>(false);

    const provided = {
        midi,
        error,
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
