import React from 'react';
import { noteMidi } from '../../hooks/GitZic/note';
import { Note } from '../../hooks/GitZic/sequence';
import { MAX_STEPS_PER_BEAT, STEP_TICK } from '../../hooks/GitZic/sequencer';

interface Props {
    beatCount: number;
    stepsPerBeat: number;
    midi: number;
    steps: Note[];
    setSelectedNote: React.Dispatch<React.SetStateAction<Note | undefined>>;
    selectedNote: Note | undefined;
}

export const SeqNote = ({
    beatCount,
    stepsPerBeat,
    midi,
    steps,
    setSelectedNote,
    selectedNote,
}: Props) => {
    return (
        <div className="note">
            <div className="note-name">{noteMidi[midi]}</div>
            <div className="steps">
                {[...new Array(beatCount * stepsPerBeat)].map((_, key) => {
                    const slide = steps.find(
                        ({ time, duration }) =>
                            key > time * stepsPerBeat &&
                            key < (time + duration) * stepsPerBeat,
                    );
                    if (slide) {
                        return;
                    }
                    const step = steps.find(
                        ({ time }) => time * stepsPerBeat === key,
                    );
                    const duration = step ? step.duration * stepsPerBeat : 1;
                    const even = Math.floor(key / stepsPerBeat) % 2 === 0;
                    const time =
                        key * STEP_TICK * (MAX_STEPS_PER_BEAT / stepsPerBeat);
                    return (
                        <div
                            className={`step ${step && 'active'} ${
                                even && 'even'
                            } ${
                                selectedNote?.midi === midi &&
                                selectedNote.time === time &&
                                'selected'
                            }`}
                            key={`step-${key}`}
                            onClick={() =>
                                setSelectedNote({
                                    ...(step || {
                                        midi,
                                        duration: 0,
                                        time,
                                        velocity: 100,
                                    }),
                                })
                            }
                            style={{
                                width: 30 * duration + 4 * (duration - 1),
                            }}
                        ></div>
                    );
                })}
            </div>
        </div>
    );
};
