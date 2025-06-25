# 🎸 Chord Tone Helper / 五線譜和弦顯示與播放工具

https://chord-tone-search.vercel.app/

## 🚀 專案簡介

這是一個基於 React 和 Next.js 開發的互動式 Web 應用程式，旨在幫助音樂學習者和開發者理解和弦結構，並將其視覺化為標準五線譜，同時提供和弦音的播放功能。

使用者可以選擇不同的根音和和弦類型，應用程式會即時計算出該和弦包含的所有音符，並在五線譜上清晰地顯示出來。未來將加入音訊播放功能，讓使用者不僅能「看」到和弦，還能「聽」到和弦。

---

## ✨ 功能特色 (已實現 / 開發中)

- **和弦音計算**: 根據選定的根音 (Root) 和和弦類型 (Chord Type)，精確計算出組成和弦的所有音符。
- **五線譜視覺化**: 使用 [VexFlow](https://www.vexflow.com/) 函式庫，將和弦音符優雅地呈現在標準高音譜號的五線譜上。
- **自動八度推斷**: 智慧判斷和弦音符的相對八度，確保在五線譜上的合理排列。
- **自動變音記號**: 正確顯示和弦音符所需的升記號 (`#`) 或降記號 (`b`)。
- **音訊播放 (開發中)**:
  - 目前正在實作和弦音符的播放功能，讓使用者能夠聆聽所選和弦的聲音。
  - 將支援預載入音訊採樣並即時播放。

---

## 🛠️ 使用技術

這個專案主要使用了以下技術棧：

- **前端框架**: [React](https://react.dev/)
- **網頁框架**: [Next.js](https://nextjs.org/) (用於伺服器端渲染和檔案系統路由)
- **型別定義**: [TypeScript](https://www.typescriptlang.org/) (提供更好的程式碼品質和開發體驗)
- **音樂符號渲染**: [VexFlow](https://www.vexflow.com/) (強大的 JavaScript 函式庫，用於在 Web 上渲染音樂符號)
- **音訊處理**: [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) (用於瀏覽器內的音訊操作和播放)
- **版本控制**: [Git](https://git-scm.com/) / [GitHub](https://github.com/)

---
