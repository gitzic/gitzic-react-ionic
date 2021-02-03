import React from 'react';
import { IonButton, IonContent, IonIcon, IonPage } from '@ionic/react';
import { add } from 'ionicons/icons';

import { useGitZic } from '../../hooks/useGitZic';
import { noteMidi } from '../../hooks/GitZic/note';

import './Seq.css';
import { getSteps } from './utils';
import { SeqOptions } from './SeqOptions';
import { SeqNote } from './SeqNote';

export const SeqPage: React.FC = () => {
    const {
        sequence: { availableNotes, beatCount, notes },
    } = useGitZic();
    const [stepPerbeat, setStepPerBeat] = React.useState(4);
    return (
        <IonPage>
            <IonContent fullscreen>
                <div className="container">
                    <SeqOptions
                        setStepPerBeat={setStepPerBeat}
                        stepPerbeat={stepPerbeat}
                    />
                    <div className="seq">
                        {availableNotes.map((midi) => (
                            <SeqNote
                                midi={midi}
                                stepPerbeat={stepPerbeat}
                                beatCount={beatCount}
                                steps={getSteps(midi, notes)}
                            />
                        ))}
                        <br />
                        <IonButton size="small" fill="outline">
                            <IonIcon slot="start" icon={add} />
                            Add
                            <select defaultValue={60}>
                                {noteMidi.map((note, key) => (
                                    <option key={`note-${key}`} value={key}>
                                        {note}
                                    </option>
                                ))}
                            </select>
                        </IonButton>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    );
};
