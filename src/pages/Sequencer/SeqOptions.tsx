import React from 'react';

import { useGitZic } from '../../hooks/useGitZic';
import { evNumVal } from '../../utils/event';

import { setBeatCount } from '../../hooks/GitZic/sequence';

interface Props {
    setStepPerBeat: React.Dispatch<React.SetStateAction<number>>;
    stepPerbeat: number;
}

export const SeqOptions = ({ setStepPerBeat, stepPerbeat }: Props) => {
    const { midi, sequence } = useGitZic();
    return (
        <div>
            <select
                defaultValue={sequence.beatCount}
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
    );
};
