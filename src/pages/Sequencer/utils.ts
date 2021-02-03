import { SequenceData } from '../../hooks/GitZic/sequence';

export function getNotes({ notes }: SequenceData) {
    return [...new Set(notes.map(({ midi }) => midi))].sort().reverse();
}
