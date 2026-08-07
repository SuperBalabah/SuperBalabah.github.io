# 🗺️ Technical Plan: Harvard MPH Polymath Portfolio

## 📐 系統架構與技術選型 (Tech Stack & Architecture)

- **前端框架**：Vite + React (TypeScript)
- **視覺與 CSS**：Vanilla CSS + CSS Modules / Tailored Utility Custom Design Tokens（包含 HSL 變數、Glassmorphism、1px Border Glow、Custom Scrollbar）
- **圖示庫**：Lucide React
- **動畫庫**：Framer Motion (實作 Taste-Skill 之 Spring Motion 與 Drawer 滑動)
- **音訊驅動**：HTML5 Audio API + Custom Audio Context / Animated Waves Visualizer

### 數據結構模型 (Data Schema)

```typescript
export interface WorkItem {
  id: string;
  title: string;
  category: 'code' | 'original' | 'cover' | 'public_health';
  tags: string[];
  featured: boolean;
  summary: string;
  description: string;
  date: string;
  learningDuration?: string; // e.g., "Learned & Built in 48 Hours"
  techStack?: string[];
  audioUrl?: string;
  audioDuration?: string;
  demoUrl?: string;
  githubUrl?: string;
  metrics?: string; // e.g., "1,200+ Active Users", "Used by 5 Labs"
  imageBg: string;
}
```

---

## ⚡ 風險評估與防震墊 (Risks & Mitigations)

1. **大量作品 (40+ Cover & 10+ Code) 載入效能問題**
   - **防範**：採用分頁/動態加載（Virtual Scroll or Paginated Filter），預設僅載入核心視覺元資料，圖片使用輕量 SVG / WebP 優化。
2. **音訊播放在分頁切換時中斷**
   - **防範**：將 `AudioPlayerContext` 提升至 React 樹根節點，與過濾選單狀態完全解耦，確保瀏覽與搜尋時播放器常駐且不中斷。
3. **無真實音訊檔問題**
   - **防範**：內建極致美觀的合成音波/無著作權音源範例（合成 HTML5 Web Audio Synthesizer 音效或高品質免版權音檔），方便用戶後續一鍵替換自己的 MP3 檔案。
