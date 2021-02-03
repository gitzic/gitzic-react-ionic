import { Note } from '../../hooks/GitZic/sequence';

export function getSteps( midi: number, notes: Note[]) {
    return notes.filter(note => note.midi === midi);
}
