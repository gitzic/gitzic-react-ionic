import { event, eventKey } from './event';
import { sequenceData } from './sequence';
import { between } from './utils';

export const MAX_STEPS_PER_BEAT = 8;

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

export function addListenerInterval(fn: (time: number) => void) {
    event.addListener(eventKey.onInterval, fn);
}

function loop() {
    const ms = 1 / MAX_STEPS_PER_BEAT;
    const newTime = sequenceData.currentTime + ms;
    sequenceData.currentTime = newTime >= sequenceData.beatCount ? 0 : newTime;
    event.emit(eventKey.onInterval, sequenceData.currentTime);
}
