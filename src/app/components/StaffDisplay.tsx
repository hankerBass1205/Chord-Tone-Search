// src/app/components/StaffDisplay.tsx
//使用VexFlow來繪製五線譜！

import React, { useEffect, useRef } from 'react';
import { Renderer, Stave, Formatter, Voice, StaveNote, Accidental } from 'vexflow'; 
import { Note, LETTER_CYCLE, getBaseLetter } from '../../lib/chordLogic'; 

interface StaffDisplayProps {
    chordNotes: Note[];
    width?: number;
    height?: number;
}

const StaffDisplay: React.FC<StaffDisplayProps> = ({ chordNotes, width = 500, height = 200 }) => {

    //React的方式來「抓取」要放五線譜 SVG 的 <div>。
    const containerRef = useRef<HTMLDivElement>(null);


    //確保只在和弦音變換時重新渲染(其實還有偵測長寬但沒有輸入)
    useEffect(() => {
        if (!containerRef.current || chordNotes.length === 0) {
            return;
        }

        const container = containerRef.current;
        // 清空既有的 SVG 元素
        container.innerHTML = ''; 

        // 初始化SVG畫布
        const factory = new Renderer(container, Renderer.Backends.SVG);
        factory.resize(width, height);
        const renderer = factory.getContext();


        //畫出五線譜框架 包含譜號及拍號
        const stave = new Stave(10, 0, width - 20);
        stave.addClef("treble").addTimeSignature("4/4");
        stave.setContext(renderer).draw();

        //音符格式陣列 如：C/4
        const vexFlowKeysForStaveNote: string[] = []; 
        //升降記號陣列
        const accidentalSymbols: (string | null)[] = []; 

        //初始音高 以中央Ｃ4為基準
        let currentOctave = 4; 
        let prevLetterIndex: number | null = null; 


        //用迴圈去確定音高！
        chordNotes.forEach((note) => {
            //先將當前的音去除升降號
            const baseLetter = getBaseLetter(note);
            //找到當前的音在音名中的索引
            const currentLetterIndex = LETTER_CYCLE.indexOf(baseLetter);

            //如果有前一個音 並且索引直比較大就加八度
            if (prevLetterIndex !== null && currentLetterIndex < prevLetterIndex) {
                currentOctave++;
            }

            // --- Fix here: Change 'let' to 'const' for noteLetter ---
            const noteLetter = note.charAt(0).toLowerCase(); 
            let symbol: string | null = null; 

            if (note.length > 1) { 
                const suffix = note.substring(1); 
                if (suffix === '#' || suffix === 'b') {
                    symbol = suffix;
                }
            }
            
            const vexFlowKeyString = `${noteLetter}/${currentOctave}`; 
            vexFlowKeysForStaveNote.push(vexFlowKeyString); 
            accidentalSymbols.push(symbol); 
            
            prevLetterIndex = currentLetterIndex;
        });

        const chordStaveNote = new StaveNote({
            keys: vexFlowKeysForStaveNote, 
            duration: "w" 
        });
        
        accidentalSymbols.forEach((symbol, i) => {
            if (symbol) {
                chordStaveNote.addModifier(new Accidental(symbol), i);
            }
        });

        const vexFlowStaveNotes = [chordStaveNote]; 

        const voice = new Voice(); 
        voice.setMode(Voice.Mode.SOFT); 
        
        voice.addTickables(vexFlowStaveNotes);
        
        new Formatter().joinVoices([voice]).format([voice], width - 30);

        voice.draw(renderer, stave);
    }, [chordNotes, width, height]);

    return <div ref={containerRef} style={{ width, height }}></div>;
};

export default StaffDisplay;