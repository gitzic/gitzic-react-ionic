import React from 'react';
import { IonButton, IonContent, IonIcon, IonPage } from '@ionic/react';
import { add } from 'ionicons/icons';

import { useGitZic } from '../../hooks/useGitZic';
import { noteMidi } from '../../hooks/GitZic/note';

import './Seq.css';
import { getSteps } from './utils';
import { SeqOptions } from './SeqOptions';
import { SeqNote } from './SeqNote';
import { SeqAddNote } from './SeqAddNote';

export const SeqPage: React.FC = () => {
    const {
        sequence: { displayedNotes, beatCount, notes },
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
                        {displayedNotes.map((midi) => (
                            <SeqNote
                                key={`SeqNote-${midi}`}
                                midi={midi}
                                stepPerbeat={stepPerbeat}
                                beatCount={beatCount}
                                steps={getSteps(midi, notes)}
                            />
                        ))}
                        <br />
                        <SeqAddNote excludeNotes={displayedNotes} />
                    </div>
                </div>
            </IonContent>
        </IonPage>
    );
};
