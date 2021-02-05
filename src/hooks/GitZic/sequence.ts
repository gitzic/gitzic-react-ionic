import { event, eventKey } from "./event";

export interface SequenceData {
    beatCount: number;
    stepsPerBeat: number;
    displayedNotes: number[];
    notes: Note[];
    currentStep: number;
}

export interface Note {
    midi: number;
    duration: number;
    time: number;
}

export function setBeatCount(count: number) {
    sequenceData.beatCount = count;
    event.emit(eventKey.onSeqChange, sequenceData);
}

export function setStepsPerBeat(count: number) {
    sequenceData.stepsPerBeat = count;
    event.emit(eventKey.onSeqChange, sequenceData);
}

export const sequenceData: SequenceData = {
    currentStep: 0,
    beatCount: 4,
    stepsPerBeat: 4,
    displayedNotes: [64, 62, 60, 58, 50],
    notes: [
        {
            midi: 60,
            duration: 0.25,
            time: 0,
        },
        {
            midi: 58,
            duration: 0.5,
            time: 0,
        },
        {
            midi: 62,
            duration: 0.5,
            time: 0.5,
        },
        {
            midi: 64,
            duration: 1,
            time: 2,
        },
    ],
};
