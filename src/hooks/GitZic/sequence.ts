export interface SequenceData {
    beatCount: number;
    displayedNotes: number[];
    notes: Note[];
    currentTime: number;
}

export interface Note {
    midi: number;
    duration: number;
    time: number;
}

export function setBeatCount(count: number) {}

export const sequenceData: SequenceData = {
    currentTime: 0,
    beatCount: 4,
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
