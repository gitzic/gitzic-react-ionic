import React from 'react';

import { useGitZic } from '../../hooks/useGitZic';
import { evNumVal, evStrVal } from '../../utils/event';

import {
    setBeatCount,
    setOutputId,
    setStepsPerBeat,
} from '../../hooks/GitZic/sequence';
import { MAX_STEPS_PER_BEAT } from '../../hooks/GitZic';

const listStepsPerbeat = [1];
for (let val = MAX_STEPS_PER_BEAT; val > 1; val = val / 2) {
    listStepsPerbeat.push(val);
}
listStepsPerbeat.sort();

export const SeqOptions = () => {
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
                defaultValue={sequence.stepsPerBeat}
                onChange={evNumVal(setStepsPerBeat)}
            >
                {listStepsPerbeat.map((val) => (
                    <option key={`stepsPerBeat${val}`}>{val}</option>
                ))}
            </select>
            steps. Output:
            <select
                defaultValue={sequence.outputId}
                onChange={evStrVal(setOutputId)}
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
        </div>
    );
};
