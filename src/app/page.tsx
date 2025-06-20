// src/app/page.tsx
'use client'; // 因為我們用到了 useState，所以需要宣告為客戶端元件

import { useState, useMemo } from 'react';
import NoteSelector from './components/NoteSelector';
import ChordTypeSelector from './components/ChordTypeSelector';
import ChordDisplay from './components/ChordDisplay';
import { Note, getChordNotes, CHORD_TYPES, ALL_NOTES } from '@/lib/chordLogic';

export default function HomePage() {
  // 狀態管理
  const [selectedRoot, setSelectedRoot] = useState<Note>(ALL_NOTES[0] as Note);
  const [selectedChordType, setSelectedChordType] = useState<string>(CHORD_TYPES[0]);

  // 使用 useMemo 來避免不必要的重複計算，只有在依賴項改變時才重新計算
  const chordNotes = useMemo(() => {
    return getChordNotes(selectedRoot, selectedChordType);
  }, [selectedRoot, selectedChordType]);

  return (
    <main className="container mx-auto p-4 md:p-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold">Chord Tone 查詢器</h1>
        <p className="text-gray-600 mt-2">點擊需要查找的和弦即可快速找出和弦內音</p>
      </header>

      <div className="max-w-2xl mx-auto">
        <NoteSelector
          selectedRoot={selectedRoot}
          onNoteSelect={setSelectedRoot}
        />

        <ChordTypeSelector
          selectedChordType={selectedChordType}
          onChordTypeSelect={setSelectedChordType}
        />

        <ChordDisplay
          rootNote={selectedRoot}
          chordType={selectedChordType}
          notes={chordNotes}
        />
      </div>
      
      <footer className="text-center mt-12 text-gray-500">
        <p>Built with Next.js, React, Tailwind CSS, and TypeScript.</p>
      </footer>
    </main>
  );
}