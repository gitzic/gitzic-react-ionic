import React from 'react';
import { noteMidi } from '../../hooks/GitZic/note';
import { Note } from '../../hooks/GitZic/sequence';

interface Props {
    beatCount: number;
    stepsPerBeat: number;
    midi: number;
    steps: Note[];
}

export const SeqNote = ({ beatCount, stepsPerBeat, midi, steps }: Props) => {
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
                    return (
                        <div
                            className={`step ${step && 'active'} ${
                                even && 'even'
                            }`}
                            key={`step-${key}`}
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
