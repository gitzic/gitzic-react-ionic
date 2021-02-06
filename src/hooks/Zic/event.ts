import EventEmitter from 'eventemitter3';

export const event = new EventEmitter();

export enum eventKey {
    onMIDISuccess = 'onMIDISuccess',
    onMIDIError = 'onMIDIError',
    onBPMchange = 'onBPMchange',
    onSeqChange = 'onSeqChange',
}

// ToDo move listenner in an array
