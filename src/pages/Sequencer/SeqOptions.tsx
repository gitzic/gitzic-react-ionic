import React from 'react';

import { useGitZic } from '../../hooks/useGitZic';
import { evNumVal, evStrVal } from '../../utils/event';

import {
    Note,
    setBeatCount,
    setOutputChannel,
    setOutputId,
    setStepsPerBeat,
} from '../../hooks/GitZic/sequence';
import { MAX_STEPS_PER_BEAT, STEP_TICK } from '../../hooks/GitZic';
import { IonToggle } from '@ionic/react';

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
}

export const SeqOptions = ({ selectedNote }: Props) => {
    const {
        midi,
        sequence: { beatCount, stepsPerBeat, outputId, outputChannel },
    } = useGitZic();
    return (
        <div>
            <select defaultValue={beatCount} onChange={evNumVal(setBeatCount)}>
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
            <select value={outputId} onChange={evStrVal(setOutputId)}>
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
                    <select>
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
                    <input checked={selectedNote.slide} type="checkbox" /> slide
                </>
            )}
        </div>
    );
};
