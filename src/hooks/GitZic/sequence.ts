import { event, eventKey } from './event';

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
    velocity: number;
}

export function setBeatCount(count: number) {
    sequenceData.beatCount = count;
    event.emit(eventKey.onSeqChange, sequenceData);
}

export function setStepsPerBeat(count: number) {
    sequenceData.stepsPerBeat = count;
    event.emit(eventKey.onSeqChange, sequenceData);
}

export function getCurrentNotes() {
    return sequenceData.notes.filter(
        (note) => isNoteOn(note) || isNoteOff(note),
    );
}

export function isNoteOn({ time }: Note) {
    return sequenceData.currentStep === time;
}

export function isNoteOff({ time, duration }: Note) {
    return sequenceData.currentStep === time + duration;
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
            velocity: 100,
        },
        {
            midi: 58,
            duration: 0.5,
            time: 0,
            velocity: 100,
        },
        {
            midi: 62,
            duration: 0.5,
            time: 0.5,
            velocity: 100,
        },
        {
            midi: 64,
            duration: 1,
            time: 2,
            velocity: 127,
        },
    ],
};
