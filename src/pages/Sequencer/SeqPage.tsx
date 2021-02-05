import React, { useState } from 'react';
import { IonContent, IonPage } from '@ionic/react';

import { useGitZic } from '../../hooks/useGitZic';

import './Seq.css';
import { getSteps } from './utils';
import { SeqOptions } from './SeqOptions';
import { SeqNote } from './SeqNote';
import { SeqAddNote } from './SeqAddNote';
import { SeqTime } from './SeqTime';
import { Note } from '../../hooks/GitZic/sequence';

export const SeqPage: React.FC = () => {
    const {
        sequence: {
            displayedNotes,
            beatCount,
            notes,
            currentStep,
            stepsPerBeat,
        },
    } = useGitZic();
    const [selectedNote, setSelectedNote] = useState<Note>();
    return (
        <IonPage>
            <IonContent fullscreen>
                <div className="container">
                    <SeqOptions selectedNote={selectedNote} />
                    <div className="seq">
                        {displayedNotes.map((midi) => (
                            <SeqNote
                                key={`SeqNote-${midi}`}
                                midi={midi}
                                stepsPerBeat={stepsPerBeat}
                                beatCount={beatCount}
                                steps={getSteps(midi, notes)}
                                selectedNote={selectedNote}
                                setSelectedNote={setSelectedNote}
                            />
                        ))}
                        <SeqTime
                            stepsPerBeat={stepsPerBeat}
                            beatCount={beatCount}
                            currentStep={currentStep}
                        />
                    </div>
                    <SeqAddNote excludeNotes={displayedNotes} />
                </div>
            </IonContent>
        </IonPage>
    );
};
