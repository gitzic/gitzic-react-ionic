import React from 'react';
import { IonContent, IonPage } from '@ionic/react';
import { useGitZic } from '../../hooks/useGitZic';
import { evNumVal } from '../../utils/event';
import { notes } from '../../hooks/GitZic/note';

import './Seq.css';

export const SeqPage: React.FC = () => {
    const { midi } = useGitZic();
    // console.log('Midi in tab1', midi);
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
                            {[...new Array(8)].map((_, key) => (
                                <option key={`step-${key}`}>{key + 1}</option>
                            ))}
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
                            <select defaultValue={60}>
                                {notes.map((note, key) => (
                                    <option key={`note-${key}`} value={key}>
                                        {note}
                                    </option>
                                ))}
                            </select>
                            <div>
                                {[...new Array(beatCount * stepPerbeat)].map(
                                    (_, key) => (
                                        <div className="step"></div>
                                    ),
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    );
};
