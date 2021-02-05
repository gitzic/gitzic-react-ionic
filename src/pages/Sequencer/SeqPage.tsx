import React, { useState } from 'react';
import { IonContent, IonPage } from '@ionic/react';

import { useGitZic } from '../../hooks/useGitZic';

import './Seq.css';
import { getSteps } from './utils';
import { SeqOptions } from './SeqOptions';
import { SeqNote } from './SeqNote';
import { SeqAddDisplayNote } from './SeqAddDisplayNote';
import { SeqTime } from './SeqTime';
import { Note } from '../../hooks/GitZic/sequence';

export const SeqPage: React.FC = () => {
    const { sequences } = useGitZic();
    const [currentSeq, setCurrentSeq] = useState<number>(0);
    const [selectedNote, setSelectedNote] = useState<Note>();
    const {
        displayedNotes,
        beatCount,
        notes,
        currentStep,
        stepsPerBeat,
    } = sequences[currentSeq];
    return (
        <IonPage>
            <IonContent fullscreen>
                <div className="container">
                    <SeqOptions
                        selectedNote={selectedNote}
                        setSelectedNote={setSelectedNote}
                        currentSeq={currentSeq}
                        setCurrentSeq={setCurrentSeq}
                    />
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
                    <SeqAddDisplayNote
                        excludeNotes={displayedNotes}
                        currentSeq={currentSeq}
                    />
                </div>
            </IonContent>
        </IonPage>
    );
};
