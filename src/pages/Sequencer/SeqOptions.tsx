import React from 'react';
import { IonButton } from '@ionic/react';

import { useGitZic } from '../../hooks/useGitZic';
import { evNumVal, evStrVal } from '../../utils/event';

import {
    addNew,
    Note,
    setBeatCount,
    setNote,
    setOutputChannel,
    setOutputId,
    setStepsPerBeat,
} from '../../hooks/Zic/sequence';
import { MAX_STEPS_PER_BEAT } from '../../hooks/Zic';
import { SeqEditName } from './SeqEditName';
import { SeqSave } from './SeqSave';

const listStepsPerbeat = getListStepsPerbeat();

function getListStepsPerbeat(val = MAX_STEPS_PER_BEAT) {
    const list = [1];
    for (; val > 1; val = val / 2) {
        list.push(val);
    }
    return list.sort();
}

interface Props {
    selectedNote: Note | undefined;
    setSelectedNote: React.Dispatch<React.SetStateAction<Note | undefined>>;
    currentSeq: number;
    setCurrentSeq: React.Dispatch<React.SetStateAction<number>>;
}

export const SeqOptions = ({
    selectedNote,
    setSelectedNote,
    currentSeq,
    setCurrentSeq,
}: Props) => {
    const { midi, sequences } = useGitZic();
    const {
        name,
        beatCount,
        stepsPerBeat,
        outputId,
        outputChannel,
    } = sequences[currentSeq];
    return (
        <div>
            <SeqSave />
            <select
                value={currentSeq}
                onChange={evStrVal((val) => {
                    if (val === 'new') {
                        addNew();
                        setCurrentSeq(sequences.length);
                    } else {
                        setCurrentSeq(Number(val));
                    }
                })}
            >
                {sequences.map(({ name }, key) => (
                    <option key={`seq-name-${key}`} value={key}>
                        {name}
                    </option>
                ))}
                <option value="new">New</option>
            </select>
            <SeqEditName currentSeq={currentSeq} value={name} />
            <select
                defaultValue={beatCount}
                onChange={evNumVal(setBeatCount(currentSeq))}
            >
                {[...new Array(16)].map((_, key) => (
                    <option key={`beat-${key}`}>{key + 1}</option>
                ))}
            </select>
            beats of
            <select
                defaultValue={stepsPerBeat}
                onChange={evNumVal(setStepsPerBeat)}
            >
                {listStepsPerbeat.map((val) => (
                    <option key={`stepsPerBeat${val}`}>{val}</option>
                ))}
            </select>
            steps. Output:
            <select
                value={outputId}
                onChange={evStrVal(setOutputId(currentSeq))}
            >
                <option value="">None</option>
                {Array.from(midi?.outputs.values() || []).map(
                    ({ id, name }) => (
                        <option key={`midiOutput-${id}`} value={id}>
                            {name}
                        </option>
                    ),
                )}
            </select>
            <select
                defaultValue={outputChannel}
                onChange={evNumVal(setOutputChannel)}
            >
                {[...new Array(16)].map((_, key) => (
                    <option key={`channel-${key}`} value={key}>
                        channel {key + 1}
                    </option>
                ))}
            </select>
            {selectedNote && (
                <>
                    Step length:
                    <select
                        value={selectedNote.duration * stepsPerBeat}
                        onChange={evNumVal((value) => {
                            const note = {
                                ...selectedNote,
                                duration: value / stepsPerBeat,
                            };
                            setSelectedNote(note);
                            setNote(currentSeq)(note);
                        })}
                    >
                        {[
                            ...new Array(
                                1 +
                                    stepsPerBeat * beatCount -
                                    selectedNote.time * stepsPerBeat,
                            ),
                        ].map((_, key) => (
                            <option key={`step-length-${key}`}>{key}</option>
                        ))}
                    </select>
                    {selectedNote.duration > 0 && (
                        <>
                            <IonButton
                                size="small"
                                style={{
                                    height: 20,
                                    marginTop: -8,
                                    padding: 0,
                                }}
                                color={selectedNote.slide ? 'danger' : 'light'}
                                onClick={() => {
                                    const note = {
                                        ...selectedNote,
                                        slide: !selectedNote.slide,
                                    };
                                    setSelectedNote(note);
                                    setNote(currentSeq)(note);
                                }}
                            >
                                Slide
                            </IonButton>{' '}
                            velocity:
                            <select
                                value={selectedNote.velocity}
                                onChange={evNumVal((velocity) => {
                                    const note = {
                                        ...selectedNote,
                                        velocity,
                                    };
                                    setSelectedNote(note);
                                    setNote(currentSeq)(note);
                                })}
                            >
                                {[...new Array(127)].map((_, key) => (
                                    <option key={`step-velocity-${key}`}>
                                        {key + 1}
                                    </option>
                                ))}
                            </select>
                        </>
                    )}
                </>
            )}
        </div>
    );
};
