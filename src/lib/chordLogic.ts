// src/lib/chordLogic.ts

// 定義所有音名
export const ALL_NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

// 定義半音重音 ex:C# = Db
export const EQUAL_TONE_NOTES: Record<string, string> = {
    'C#': 'Db',
    'D#': 'Eb',
    'F#': 'Gb',
    'G#': 'Ab',
    'A#': 'Bb',
    'B#': 'C',
    'Cb': 'B',
    'Db': 'C#',
    'Eb': 'D#',
    'Gb': 'F#',
    'Ab': 'G#',
    'Bb': 'A#',
    'C': 'B#',
};

// 基本音名循環，用於計算度數位置 (C -> D -> E -> F -> G -> A -> B)
export const LETTER_CYCLE = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];


// 定義和弦公式的名稱與其音程結構 (以半音為單位)
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
    '9th': [0, 4, 7, 10, 14],        // Dominant 9th
    'Major 9th': [0, 4, 7, 11, 14],
    'Minor 9th': [0, 3, 7, 10, 14],
    '11th': [0, 4, 7, 10, 14, 17],   // 基於 Dominant 7th
    '13th': [0, 4, 7, 10, 14, 17, 21],

};

// 輔助映射：音程的半音數 -> 它在和弦中的「度數」位置 (1-7)
// 這代表了其基礎字母的偏移量
// 抓取預期音名對照表
export const INTERVAL_TO_DEGREE_OFFSET: Record<number, number> = {
    0: 0, // 根音，0度偏移
    1: 1, // 小二度 (通常不直接用於三和弦，但字母差1個)
    2: 1, // 大二度 (D)
    3: 2, // 小三度 (Eb) - 字母差2個 (C -> E)
    4: 2, // 大三度 (E) - 字母差2個 (C -> E)
    5: 3, // 完全四度 (F) - 字母差3個
    6: 3, // 增四度 (F#) - 字母差3個
    7: 4, // 完全五度 (G) - 字母差4個
    8: 4, // 增五度 (G#) - 字母差4個
    9: 5, // 大六度 (A) - 字母差5個
    10: 6, // 小七度 (Bb) - 字母差6個
    11: 6, // 大七度 (B) - 字母差6個
};

// 定義音符型別，只能是 ALL_NOTES 裡的其中一個
export type Note = typeof ALL_NOTES[number];
// 方便我們在 UI 上選擇(僅可選物件的KEY)
export const CHORD_TYPES = Object.keys(CHORD_FORMULAS);


/**
 * 輔助函數：從音符名稱中獲取其基礎字母 (去除所有升降記號)
 */
export function getBaseLetter(note: Note): string {
    // 簡單地取音名第一個字元，並轉為大寫
    return note.charAt(0).toUpperCase();
}

/**
 * 計算和弦內音
 * @param rootNote 傳入選擇之根音
 * @param chordType 傳入選擇的和弦類型
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


    // --- 計算 expectedNoteNames(計算符合預期的音名) 的邏輯開始 ---

    // 1. 讀取現在的 rootNote 去除升降，得到其基礎字母
    const rootBaseLetter = getBaseLetter(rootNote);

    // 2. 找到根音基礎字母在 LETTER_CYCLE 中的索引
    const rootLetterIndex = LETTER_CYCLE.indexOf(rootBaseLetter);

    // 3. 讀取現在的和弦公式，計算並吐出預期的音名骨架 (去除任何升降)
    const expectedNoteNames: string[] = formula.map(intervalSemitones => {
        // 獲取當前音程應有的「度數偏移」
        const degreeOffset = INTERVAL_TO_DEGREE_OFFSET[intervalSemitones];

        if (degreeOffset === undefined) {
            // 如果某個音程沒有在 INTERVAL_TO_DEGREE_OFFSET 中定義，
            // 表示我們的資料有缺失。這裡應該發出警告或處理錯誤。
            console.warn(`音程半音數 ${intervalSemitones} 缺少度數偏移定義。`);
            // 為了讓程式繼續運行，我們可以返回一個未知或預設的字母，
            // 但這會影響最終結果的準確性。
            return 'UNKNOWN'; // 這裡應該根據實際情況選擇如何處理未定義的音程
        }

        // 計算這個音在 LETTER_CYCLE 中預期的字母索引
        const expectedLetterIndex = (rootLetterIndex + degreeOffset) % LETTER_CYCLE.length;

        // 從 LETTER_CYCLE 中獲取這個音的預期基礎字母
        return LETTER_CYCLE[expectedLetterIndex];
    });

    // --- expectedNoteNames 的邏輯結束 ---


    // --- 計算最終結果的邏輯開始 ---

    return formula.map((interval, i) => {
        const actualNoteIndex = (rootIndex + interval) % 12;
        const currentCalculatedNote = ALL_NOTES[actualNoteIndex]; // 目前計算出的音名 (例如 C#, D#, F# 等)

        const expectedLetter = expectedNoteNames[i]; // 當前音在和弦中預期的基礎字母 (例如 C, E, G)
        const currentNoteBaseLetter = getBaseLetter(currentCalculatedNote); // 當前音計算出的基礎字母

        // 1. 如果是根音 (interval 為 0)，則直接返回根音名稱，不做任何轉換
        // 這是為了確保你輸入的根音顯示不受等音規則影響 (例如輸入 D# 就顯示 D#，不會變 Eb)
        if (interval === 0) {
            return rootNote;
        }

        // 2. 如果當前計算出的音的基礎字母與預期的基礎字母不匹配
        // 例如：C minor 的第三個音，計算出 D# (基礎字母 D)，但預期基礎字母是 E
        if (currentNoteBaseLetter !== expectedLetter) {
            // 嘗試查找這個音的等音
            const alternativeNote = EQUAL_TONE_NOTES[currentCalculatedNote];

            // 如果存在等音 (例如 D# 的等音是 Eb)
            // 並且這個等音的基礎字母與預期字母匹配 (例如 Eb 的基礎字母是 E，與預期 E 匹配)
            if (alternativeNote && getBaseLetter(alternativeNote) === expectedLetter) {
                return alternativeNote as Note; // 使用等音 (例如 Eb)
            }
            // 如果等音不存在，或者等音的基礎字母仍然不匹配，那麼就返回原始計算出的音
            // 這可能發生在複雜和弦或資料不夠完整的情況下
            // 例如 Cb (B), Fb (E) 這種在 EQUAL_TONE_NOTES 中沒有定義的
        }

        // 3. 如果基礎字母已經匹配，或者沒有等音可以匹配，就返回原始計算出的音名
        // 例如：D# Minor 7th，F# (基礎字母 F)，預期 F，匹配，所以返回 F#
        return currentCalculatedNote;
    });
}