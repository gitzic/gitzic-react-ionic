import { initMIDI } from './midi';
import { initSeqencer } from './sequencer';

export * from './midi';
export * from './event';
export * from './sequencer';

export function init() {
    initMIDI();
    initSeqencer();
}
