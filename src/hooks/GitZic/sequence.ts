import { event, eventKey } from './event';

export interface SequenceData {
    outputId: string;
    outputChannel: number;
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
    slide?: boolean;
}

export function setOutputId(id: string) {
    sequenceData.outputId = id;
    event.emit(eventKey.onSeqChange, sequenceData);
}

export function setOutputChannel(channel: number) {
    sequenceData.outputChannel = channel;
    event.emit(eventKey.onSeqChange, sequenceData);
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
    return sequenceData.notes
        .filter((note) => isNoteOn(note) || isNoteOff(note))
        .sort((_, note) => (isNoteOff(note) && note.slide ? -1 : 1));
}

export function isNoteOn({ time }: Note) {
    return sequenceData.currentStep === time;
}

export function isNoteOff({ time, duration }: Note) {
    return sequenceData.currentStep === time + duration;
}

export const sequenceData: SequenceData = {
    outputId:
        '7401FE5A1CE0832F1A3DB57CE9C403EBE3B47A682B3F59F525B363594DFCB270',
    outputChannel: 0,
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
            slide: true,
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
