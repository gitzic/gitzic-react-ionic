import React from 'react';

interface Props {
    beatCount: number;
    stepPerbeat: number;
    currentTime: number;
}

export const SeqTime = ({ beatCount, stepPerbeat, currentTime }: Props) => {
    return (
        <div className="note time">
            <div className="note-name"></div>
            <div className="steps">
                {[...new Array(beatCount * stepPerbeat)].map((_, key) => {
                    // console.log('yo', currentTime, key / stepPerbeat);
                    return (
                        <div
                            className={`step ${
                                currentTime === key / stepPerbeat && 'active'
                            }`}
                            key={`time-${key}`}
                        ></div>
                    );
                })}
            </div>
        </div>
    );
};
