// src/app/components/NoteSelector.tsx
import { ALL_NOTES, Note } from '@/lib/chordLogic';

interface NoteSelectorProps {
  selectedRoot: Note;
  onNoteSelect: (note: Note) => void;
}

export default function NoteSelector({ selectedRoot, onNoteSelect }: NoteSelectorProps) {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">1. Select Root Note</h2>
      <div className="flex flex-wrap gap-2">
        {ALL_NOTES.map((note) => (
          <button
            key={note}
            onClick={() => onNoteSelect(note as Note)}
            className={`px-4 py-2 rounded-md font-mono transition-colors ${
              selectedRoot === note
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            {note}
          </button>
        ))}
      </div>
    </div>
  );
}