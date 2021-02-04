import React from 'react';
import { IonButton, IonIcon } from '@ionic/react';
import { add } from 'ionicons/icons';

import { noteMidi } from '../../hooks/GitZic/note';

interface Props {
    excludeNotes: number[];
}

export const SeqAddNote = ({ excludeNotes }: Props) => {
    const list = noteMidi
        .map((note, midi) => ({ note, midi }))
        .filter(({ midi }) => !excludeNotes.includes(midi));
    return (
        <IonButton size="small" fill="outline">
            <IonIcon slot="start" icon={add} />
            Add
            <select defaultValue={list[Math.floor(list.length/2)].midi}>
                {list.map(({ note, midi }) => (
                    <option key={`note-${midi}`} value={midi}>
                        {note}
                    </option>
                ))}
            </select>
        </IonButton>
    );
};
