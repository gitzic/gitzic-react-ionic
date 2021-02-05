import { event, eventKey } from './event';
import { SequenceData, sequenceData } from './sequence';
import { between } from './utils';

export const MAX_STEPS_PER_BEAT = 8;
const STEP = 1 / MAX_STEPS_PER_BEAT;

let interval: NodeJS.Timeout;

export interface Tempo {
    bpm: number;
    ms: number;
}

export interface Sequencer {
    tempo: Tempo;
}

export const sequencer: Sequencer = {
    tempo: {
        bpm: 100,
        ms: 150,
    },
};

export function initSeqencer() {
    setBpm(sequencer.tempo.bpm);
}

export function addListenerBPMchange(fn: (tempo: Tempo) => void) {
    event.addListener(eventKey.onBPMchange, fn);
}

export function setBpm(newBpm: number) {
    sequencer.tempo.bpm = between(newBpm, 10, 300);
    sequencer.tempo.ms = 60000 / (sequencer.tempo.bpm * MAX_STEPS_PER_BEAT);
    interval = setInterval(loop, sequencer.tempo.ms);
    event.emit(eventKey.onBPMchange, sequencer.tempo);
}

export function addListenerSeqChange(fn: (seq: SequenceData) => void) {
    event.addListener(eventKey.onSeqChange, fn);
}

function loop() {
    const newStep = sequenceData.currentStep + STEP;
    sequenceData.currentStep = newStep >= sequenceData.beatCount ? 0 : newStep;
    event.emit(eventKey.onSeqChange, sequenceData);
}
