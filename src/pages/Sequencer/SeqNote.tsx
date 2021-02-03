import React from 'react';
import { noteMidi } from '../../hooks/GitZic/note';

interface Props {
    beatCount: number;
    stepPerbeat: number;
    midi: number;
}

export const SeqNote = ({ beatCount, stepPerbeat, midi }: Props) => {
    return (
        <div className="note">
            <div className="note-name">{noteMidi[midi]}</div>
            <div className="steps">
                {[...new Array(beatCount * stepPerbeat)].map((_, key) => (
                    <div className="step" key={`step-${key}`}></div>
                ))}
            </div>
        </div>
    );
};
