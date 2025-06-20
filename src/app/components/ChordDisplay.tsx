// src/app/components/ChordDisplay.tsx
import { Note } from '@/lib/chordLogic';

interface ChordDisplayProps {
    rootNote: Note;
    chordType: string;
    notes: Note[];
}

export default function ChordDisplay({ rootNote, chordType, notes }: ChordDisplayProps) {
    if (notes.length === 0) {
        return null;
    }

    return (
        <div className="mt-8 p-6 bg-gray-100 rounded-lg">
            <h3 className="text-2xl font-bold">
                {rootNote} {chordType}
            </h3>
            <p className="text-xl mt-2">
                Notes: <span className="font-mono tracking-widest">{notes.join(' - ')}</span>
            </p>
        </div>
    );
}