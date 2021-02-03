import React from 'react';
import { noteMidi } from '../../hooks/GitZic/note';
import { Note } from '../../hooks/GitZic/sequence';

interface Props {
    beatCount: number;
    stepPerbeat: number;
    midi: number;
    steps: Note[];
}

export const SeqNote = ({ beatCount, stepPerbeat, midi, steps }: Props) => {
    return (
        <div className="note">
            <div className="note-name">{noteMidi[midi]}</div>
            <div className="steps">
                {[...new Array(beatCount * stepPerbeat)].map((_, key) => {
                    const slide = steps.find(
                        ({ time, duration }) =>
                            key > time * stepPerbeat &&
                            key < (time + duration) * stepPerbeat,
                    );
                    if (slide) {
                        return;
                    }
                    const step = steps.find(
                        ({ time }) => time * stepPerbeat === key,
                    );
                    const duration = step ? step.duration * stepPerbeat : 1;
                    return (
                        <div
                            className={`step ${step && 'active'}`}
                            key={`step-${key}`}
                            style={{
                                width: 30 * duration + 4 * (duration - 1),
                                backgroundColor: step
                                    ? '#F88'
                                    : Math.floor(key / stepPerbeat) % 2 === 0
                                    ? '#AAA'
                                    : undefined,
                            }}
                        ></div>
                    );
                })}
            </div>
        </div>
    );
};
