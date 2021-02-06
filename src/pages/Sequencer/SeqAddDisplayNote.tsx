import React from 'react';
import { IonButton, IonIcon } from '@ionic/react';
import { add } from 'ionicons/icons';

import { noteMidi } from '../../hooks/Zic/note';
import { setDisplayNote } from '../../hooks/Zic/sequence';
import { evNumVal } from '../../utils/event';

interface Props {
    excludeNotes: number[];
    currentSeq: number;
}

export const SeqAddDisplayNote = ({ excludeNotes, currentSeq }: Props) => {
    const list = noteMidi
        .map((note, midi) => ({ note, midi }))
        .filter(({ midi }) => !excludeNotes.includes(midi));

    const defaultMidi = list[Math.floor(list.length / 2)].midi;

    const [selMidi, setSelMidi] = React.useState<number>(-1);

    return (
        <>
            <select value={defaultMidi} onChange={evNumVal(setSelMidi)}>
                {list.map(({ note, midi }) => (
                    <option key={`note-${midi}`} value={midi}>
                        {note}
                    </option>
                ))}
            </select>
            <IonButton
                size="small"
                fill="outline"
                onClick={() => {
                    setDisplayNote(currentSeq)(
                        selMidi === -1 ? defaultMidi : selMidi,
                    );
                    setSelMidi(-1);
                }}
            >
                <IonIcon slot="start" icon={add} />
                Add {selMidi > -1 ? noteMidi[selMidi] : noteMidi[defaultMidi]}
            </IonButton>
        </>
    );
};
