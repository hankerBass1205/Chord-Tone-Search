// src/lib/chordLogic.ts

// 定義所有音名
export const ALL_NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

// 定義重音 ex:C# = Db
export const EQUAL_TONE_NOTES : Record<string, string> = {
    'C#': 'Db',
    'D#': 'Eb',
    'F#': 'Gb',
    'G#': 'Ab',
    'A#': 'Bb',
};

// 定義音符型別，只能是 ALL_NOTES 裡的其中一個
export type Note = typeof ALL_NOTES[number];

// 定義和弦類型的名稱與其音程結構 (以半音為單位)
// 0: 根音, 1: 小二度, 2: 大二度, 3: 小三度, 4: 大三度, 5: 完全四度...
export const CHORD_FORMULAS: Record<string, number[]> = {
    'Major': [0, 4, 7],
    'Minor': [0, 3, 7],
    'Major 7th': [0, 4, 7, 11],
    'Minor 7th': [0, 3, 7, 10],
    'Dominant 7th': [0, 4, 7, 10],
    'Sus2': [0, 2, 7],
    'Sus4': [0, 5, 7],
    'Diminished': [0, 3, 6],
};

// 方便我們在 UI 上選擇
export const CHORD_TYPES = Object.keys(CHORD_FORMULAS);

/**
 * 計算和弦內音
 * @param rootNote 根音
 * @param chordType 和弦類型
 * @returns 組成該和弦的音符陣列
 */
export function getChordNotes(rootNote: Note, chordType: string): Note[] {
    const rootIndex = ALL_NOTES.indexOf(rootNote);
    if (rootIndex === -1) {
        return []; // 如果找不到根音，回傳空陣列
    }

    const formula = CHORD_FORMULAS[chordType];
    if (!formula) {
        return []; // 如果找不到和弦類型，回傳空陣列
    }

    return formula.map(interval => {
        const noteIndex = (rootIndex + interval) % 12;
        return ALL_NOTES[noteIndex];
    });
}