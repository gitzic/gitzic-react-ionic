import React from 'react';
import { IonButton, IonIcon } from '@ionic/react';
import { add } from 'ionicons/icons';

import { noteMidi } from '../../hooks/GitZic/note';
import { setDisplayNote } from '../../hooks/GitZic/sequence';
import { evNumVal } from '../../utils/event';

interface Props {
    excludeNotes: number[];
    currentSeq: number;
}

export const SeqAddDisplayNote = ({ excludeNotes, currentSeq }: Props) => {
    const list = noteMidi
        .map((note, midi) => ({ note, midi }))
        .filter(({ midi }) => !excludeNotes.includes(midi));

    const [selMidi, setSelMidi] = React.useState(
        list[Math.floor(list.length / 2)].midi,
    );

    return (
        <IonButton
            size="small"
            fill="outline"
            onClick={() => {
                setDisplayNote(currentSeq)(selMidi);
            }}
        >
            <IonIcon slot="start" icon={add} />
            Add
            <select defaultValue={selMidi} onChange={evNumVal(setSelMidi)}>
                {list.map(({ note, midi }) => (
                    <option key={`note-${midi}`} value={midi}>
                        {note}
                    </option>
                ))}
            </select>
        </IonButton>
    );
};
