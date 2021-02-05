import { event, eventKey } from './event';

export interface SequenceData {
    name: string;
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

export function getCurrentNotes(id: number) {
    return sequences[id].notes
        .filter((note) => isNoteOn(id, note) || isNoteOff(id, note))
        .sort((_, note) => (isNoteOff(id, note) && note.slide ? -1 : 1));
}

export function isNoteOn(id: number, { time }: Note) {
    return sequences[id].currentStep === time;
}

export function isNoteOff(id: number, { time, duration }: Note) {
    return sequences[id].currentStep === time + duration;
}

export function findIndexNote(id: number, note: Note) {
    return sequences[id].notes.findIndex(
        ({ time, midi }) => note.time === time && note.midi === midi,
    );
}

export function setOutputId(id: number) {
    return (outputId: string) => {
        sequences[id].outputId = outputId;
        event.emit(eventKey.onSeqChange, sequences);
    };
}

export function setOutputChannel(id: number) {
    return (channel: number) => {
        sequences[id].outputChannel = channel;
        event.emit(eventKey.onSeqChange, sequences);
    };
}

export function setBeatCount(id: number) {
    return (count: number) => {
        sequences[id].beatCount = count;
        event.emit(eventKey.onSeqChange, sequences);
    };
}

export function setStepsPerBeat(id: number) {
    return (count: number) => {
        sequences[id].stepsPerBeat = count;
        event.emit(eventKey.onSeqChange, sequences);
    };
}

export function setName(id: number) {
    return (name: string) => {
        sequences[id].name = name;
        event.emit(eventKey.onSeqChange, sequences);
    };
}

export function setNote(id: number) {
    return (note: Note) => {
        // when note change if duration reduce, need to check if it is not currently on, if yes need to off
        const index = findIndexNote(id, note);
        if (index === -1) {
            sequences[id].notes.push(note);
        } else if (!note.duration) {
            console.log('delete', sequences[id].notes[index]);
            delete sequences[id].notes[index];
        } else {
            sequences[id].notes[index] = note;
        }
        sequences[id].notes.sort((a, b) => a.time - b.time);
        // console.log('note', note);
        // console.log('sequences', sequences);
        event.emit(eventKey.onSeqChange, sequences);
    };
}

export const sequences: SequenceData[] = [
    {
        name: 'Test',
        outputId:
            '7401FE5A1CE0832F1A3DB57CE9C403EBE3B47A682B3F59F525B363594DFCB270',
        outputChannel: 0,
        currentStep: 0,
        beatCount: 4,
        stepsPerBeat: 4,
        displayedNotes: [64, 62, 60, 58, 50],
        notes: [
            // {
            //     midi: 60,
            //     duration: 0.25,
            //     time: 0,
            //     velocity: 90,
            // },
            {
                midi: 58,
                duration: 0.5,
                time: 0,
                velocity: 90,
                slide: true,
            },
            {
                midi: 62,
                duration: 0.5,
                time: 0.5,
                velocity: 90,
            },
            {
                midi: 64,
                duration: 1,
                time: 2,
                velocity: 127,
            },
        ],
    },
];
