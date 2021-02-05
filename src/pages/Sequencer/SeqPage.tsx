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
        sequence: { displayedNotes, beatCount, notes, currentStep, stepsPerBeat },
    } = useGitZic();
    return (
        <IonPage>
            <IonContent fullscreen>
                <div className="container">
                    <SeqOptions />
                    <div className="seq">
                        {displayedNotes.map((midi) => (
                            <SeqNote
                                key={`SeqNote-${midi}`}
                                midi={midi}
                                stepsPerBeat={stepsPerBeat}
                                beatCount={beatCount}
                                steps={getSteps(midi, notes)}
                            />
                        ))}
                        <SeqTime
                            stepsPerBeat={stepsPerBeat}
                            beatCount={beatCount}
                            currentStep={currentStep}
                        />
                        <br />
                        <SeqAddNote excludeNotes={displayedNotes} />
                    </div>
                </div>
            </IonContent>
        </IonPage>
    );
};
