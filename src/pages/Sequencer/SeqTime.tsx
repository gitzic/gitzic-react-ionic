import React from 'react';

interface Props {
    beatCount: number;
    stepsPerBeat: number;
    currentStep: number;
}

export const SeqTime = ({ beatCount, stepsPerBeat, currentStep }: Props) => {
    return (
        <div className="note time">
            <div className="note-name"></div>
            <div className="steps">
                {[...new Array(beatCount * stepsPerBeat)].map((_, key) => {
                    const isActive =
                        currentStep >= key / stepsPerBeat &&
                        currentStep < (key + 1) / stepsPerBeat;
                    return (
                        <div
                            className={`step ${isActive && 'active'}`}
                            key={`time-${key}`}
                        ></div>
                    );
                })}
            </div>
        </div>
    );
};
