# 📝 Specification: Harvard MPH Application Polymath Portfolio

## 🎯 專案目標 (Goal & Purpose)
為申請 Harvard MPH（哈佛公共衛生碩士）打造一個極具「Taste-Skill 抗俗套質感」的個人作品集網站 **《Polymath Story Console（博學故事控制台）》**。
此網站旨在 3 秒內抓住哈佛招生官（Adcom）的眼球，將申請者無競賽得獎包袱的自學程式（10+項）、原創音樂（3-4首）、音樂 Cover（30-40+首）與公衛熱情，包裝成「強烈的好奇心、極陡峭的自學曲線與跨領域解決問題能力」。

---

## 🛠️ 核心範疇與邊界 (In-Scope & Out-of-Scope)

### 包含項目 (In-Scope)
1. **Taste-Skill 設計哲學 UI**：
   - 拒絕預設 AI 模板化（無通用紫藍漸層、無呆板居中三卡片）。
   - 非對稱 Bento Grid 報章雜誌風卡片牆 (`DESIGN_VARIANCE`)。
   - 深色 (Dark Mode) 與淺色 (Light Mode) 雙模式一鍵無縫切換。
   - 質感調色盤（HSL 配色、1px 微光邊框、底紋噪點質感、毛玻璃 `backdrop-blur`）。
   - 襯線體 (Editorial Serif) 與現代無襯線 (Sans-serif) / 等寬字體 (Monospace) 撞色搭配。
2. **15 秒招生官精華速覽區 (15-Second Executive Summary)**：
   - 頁首顯眼標語與 3 句精選摘要，提供強烈視覺與文字記憶點。
3. **客製化沉浸式音訊播放列 (Persistent Audio Player & Visualizer)**：
   - 全頁常駐音訊播放元件，可切換原創曲與 Cover，帶有音波微動畫。
4. **精選 vs. 完整庫分類過濾系統 (Filter & Category System)**：
   - 支援 `精選 (Featured)`, `程式 (Code)`, `原創音樂 (Original)`, `Cover 作品 (Covers)`, `公衛與跨領域 (Public Health)` 標籤切換與搜尋。
5. **雜誌風細節滑出頁 (Editorial Case Study Drawer)**：
   - 點擊卡片彈出質感側邊欄，展示「痛點 ➔ 48小時自學技術 ➔ 產出與效益」。
6. **模擬豐富數據集 (Mock Rich Dataset)**：
   - 內建 10+ 程式專案、4 首原創歌曲、30+ Cover 曲目及公衛日誌示範資料。

### 不包含項目 (Out-of-Scope)
- 真實資料庫後端（採用高效前台純靜態 JSON / State 驅動）。
- 複雜的第三方登入/會員系統。

---

## 🚥 使用者體驗與驗證標準 (UX & Acceptance Criteria)
- [ ] 招生官在 3 秒內可從 Hero 區了解 applicant 的核心品牌（Polymath by Curiosity, Public Health by Choice）。
- [ ] 播放器可流暢播放音檔，過濾切換卡片時音樂不中斷。
- [ ] 深色/淺色模式切換滑順，均保持符合 `taste-skill` 的高視覺質感。
- [ ] 分類過濾流暢，能輕鬆瀏覽 40+ 個作品而不顯雜亂。
- [ ] 手機端 (Mobile) 與電腦端 (Desktop) 均具備極佳響應式體驗。
