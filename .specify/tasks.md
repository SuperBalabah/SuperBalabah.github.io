# 📋 Tasks: Harvard MPH Polymath Portfolio

- [x] **任務 1: 專案基礎腳手架與依賴安裝**
  - **說明：** 初始化 Vite + React + TypeScript 專案於 `portfolio/`，安裝 `lucide-react`, `framer-motion`, `clsx` 等必要套件。
  - **預期修改檔案：** `portfolio/package.json`, `portfolio/vite.config.ts`
  - **驗證方式：** 執行 `npm run build` 通過。

- [x] **任務 2: 建立 Taste-Skill 設計系統 Tokens & CSS (Dark/Light 雙模式)**
  - **說明：** 建立 `index.css` 與設計 Tokens，包含 HSL 變數、網格微紋理 (Noise Grid)、1px 微光邊框、毛玻璃 `backdrop-blur`、襯線體 (Editorial Serif) 及響應式 layout。
  - **預期修改檔案：** `portfolio/src/index.css`
  - **驗證方式：** 驗證深淺色主體樣式 class 及字體階層切換正確。

- [x] **任務 3: 建立模擬數據資料庫 (10+ 程式專案, 4 原創曲, 35+ Covers, 公衛專案)**
  - **說明：** 在 `src/data/works.ts` 建立 40+ 筆高品質範例資料，包含標題、分類、標籤、學習時數、聽歌連結與案例解說。
  - **預期修改檔案：** `portfolio/src/data/works.ts`, `portfolio/src/types/work.ts`
  - **驗證方式：** 匯入並傳回 40+ 筆型別安全的資料物件。

- [x] **任務 4: 實作常駐式全頁音訊播放器元件 (AudioPlayer Context)**
  - **說明：** 打造極簡高質感播放器，支援播放/暫停、曲目切換、全頁動態音波動畫與播放清單。
  - **預期修改檔案：** `portfolio/src/context/AudioContext.tsx`, `portfolio/src/components/AudioPlayer.tsx`
  - **驗證方式：** 點擊任何卡片上的播放按鈕可順暢觸發底欄播放器音效與音波視覺。

- [x] **任務 5: 實作 Hero 區 (15-Sec Executive Summary) 與雙模式切換**
  - **說明：** 打造衝擊招生官前 3 秒的「博學多才宣言區」，包含個人定位標語、快捷數字統計（12+ 程式 / 4 原創 / 38+ Cover）與 Dark/Light Mode 切換鈕。
  - **預期修改檔案：** `portfolio/src/components/HeroSection.tsx`, `portfolio/src/components/Header.tsx`
  - **驗證方式：** 畫面呈現高品質報章雜誌質感，點擊切換主題無誤。

- [x] **任務 6: 實作 Taste-Skill Bento Grid 卡片牆與動態過濾器**
  - **說明：** 打造非對稱 Bento Grid 佈局，支援按標籤 (`All`, `Featured`, `Code`, `Original`, `Covers`, `Public Health`) 過濾與關鍵字搜尋。
  - **預期修改檔案：** `portfolio/src/components/WorkGrid.tsx`, `portfolio/src/components/WorkCard.tsx`, `portfolio/src/components/FilterBar.tsx`
  - **驗證方式：** 點擊過濾標籤卡片能流暢進行 Framer Motion 重排動畫。

- [x] **任務 7: 實作雜誌風詳細頁側邊欄 (Detail Case Study Drawer)**
  - **說明：** 點擊任意卡片從右側滑出滿版/半版 detail 抽屜，包含自學歷程、程式碼片段展示、聽歌體驗與公衛洞察結語。
  - **預期修改檔案：** `portfolio/src/components/DetailDrawer.tsx`
  - **驗證方式：** 點擊卡片順暢開啟側邊欄，支援 Esc 或點擊遮罩關閉。

- [x] **任務 8: 整合與響應式微調與建置驗證**
  - **說明：** 整合所有組件於 `App.tsx`，驗證手機與電腦端版面，確保 `npm run build` 通過。
  - **預期修改檔案：** `portfolio/src/App.tsx`
  - **驗證方式：** 執行 `npm run build` 成功產生 dist。
