// src/app/components/ChordDisplay.tsx
import { Note } from '@/lib/chordLogic';
import StaffDisplay from './StaffDisplay';

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
             {/* 添加五線譜顯示 */}
            <div style={{ marginTop: '20px' }}>
                <h3>五線譜圖</h3>
                <StaffDisplay chordNotes={notes} width={400} height={150} />
            </div>
        </div>
    );
}