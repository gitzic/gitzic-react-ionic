import React from 'react';
import { IonContent, IonPage } from '@ionic/react';

import { useGitZic } from '../../hooks/useGitZic';

import './Seq.css';
import { getSteps } from './utils';
import { SeqOptions } from './SeqOptions';
import { SeqNote } from './SeqNote';
import { SeqAddNote } from './SeqAddNote';
import { SeqTime } from './SeqTime';

export const SeqPage: React.FC = () => {
    const {
        sequence: { displayedNotes, beatCount, notes, currentTime },
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
                        <SeqTime
                            stepPerbeat={stepPerbeat}
                            beatCount={beatCount}
                            currentTime={currentTime}
                        />
                        <br />
                        <SeqAddNote excludeNotes={displayedNotes} />
                    </div>
                </div>
            </IonContent>
        </IonPage>
    );
};
