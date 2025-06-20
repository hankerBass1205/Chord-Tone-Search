// src/app/components/ChordTypeSelector.tsx
import { CHORD_TYPES } from '@/lib/chordLogic';

interface ChordTypeSelectorProps {
    selectedChordType: string;
    onChordTypeSelect: (chordType: string) => void;
}

export default function ChordTypeSelector({ selectedChordType, onChordTypeSelect }: ChordTypeSelectorProps) {
    return (
        <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">2. Select Chord Type</h2>
            <div className="flex flex-wrap gap-2">
                {CHORD_TYPES.map((type) => (
                    <button
                        key={type}
                        onClick={() => onChordTypeSelect(type)}
                        className={`px-4 py-2 rounded-md transition-colors ${
                            selectedChordType === type
                                ? 'bg-green-500 text-white'
                                : 'bg-gray-200 hover:bg-gray-300'
                        }`}
                    >
                        {type}
                    </button>
                ))}
            </div>
        </div>
    );
}