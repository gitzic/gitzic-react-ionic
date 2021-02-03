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
                    const step = steps.find(({ time }) => time * stepPerbeat === key);
                    return <div className={`step ${step && 'active'}`} key={`step-${key}`}></div>;
                })}
            </div>
        </div>
    );
};
