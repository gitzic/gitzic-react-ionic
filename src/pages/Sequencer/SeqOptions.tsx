import React from 'react';

import { useGitZic } from '../../hooks/useGitZic';
import { evNumVal } from '../../utils/event';

import { setBeatCount } from '../../hooks/GitZic/sequence';
import { MAX_STEPS_PER_BEAT } from '../../hooks/GitZic';

const listStepsPerbeat = [1];
for (let val = MAX_STEPS_PER_BEAT; val > 1; val = val / 2) {
    listStepsPerbeat.push(val);
}
listStepsPerbeat.sort();

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
                {listStepsPerbeat.map((val) => (
                    <option key={`stepsPerBeat${val}`}>{val}</option>
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
    );
};
