import React from 'react';
import { IonButton, IonContent, IonIcon, IonPage } from '@ionic/react';
import { add } from 'ionicons/icons';

import { useGitZic } from '../../hooks/useGitZic';
import { evNumVal } from '../../utils/event';
import { notes } from '../../hooks/GitZic/note';

import './Seq.css';

export const SeqPage: React.FC = () => {
    const { midi } = useGitZic();
    const [beatCount, setBeatCount] = React.useState(4);
    const [stepPerbeat, setStepPerBeat] = React.useState(4);
    return (
        <IonPage>
            <IonContent fullscreen>
                <div className="container">
                    <div>
                        <select
                            defaultValue={beatCount}
                            onChange={evNumVal(setBeatCount)}
                        >
                            {[...new Array(16)].map((_, key) => (
                                <option key={`beat-${key}`}>{key + 1}</option>
                            ))}
                        </select>
                        beats of
                        <select
                            defaultValue={stepPerbeat}
                            onChange={evNumVal(setStepPerBeat)}
                        >
                            <option>1</option>
                            <option>2</option>
                            <option>4</option>
                            <option>8</option>
                        </select>
                        steps. Output:
                        <select>
                            {Array.from(midi?.outputs.values() || []).map(
                                ({ id, name }) => (
                                    <option key={`midiOutput-${id}`} value={id}>
                                        {name}
                                    </option>
                                ),
                            )}
                        </select>
                    </div>
                    <style>{`
                    .seq .step:nth-child(${stepPerbeat}n) {
                        margin-right: 10px;
                    }
                    `}</style>
                    <div className="seq">
                        <div className="row">
                            <div className="steps-note">
                                <select defaultValue={60}>
                                    {notes.map((note, key) => (
                                        <option key={`note-${key}`} value={key}>
                                            {note}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="steps">
                                {[...new Array(beatCount * stepPerbeat)].map(
                                    (_, key) => (
                                        <div
                                            className="step"
                                            key={`step-${key}`}
                                        ></div>
                                    ),
                                )}
                            </div>
                        </div>
                        <br />
                        <IonButton size="small" fill="outline">
                            <IonIcon slot="start" icon={add} />
                            Add
                        </IonButton>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    );
};
