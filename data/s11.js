SESSIONS.push({
 "id": "s11",
 "order": 11,
 "date": "2026.08.15（08.29 手把手）",
 "title": "Hermes AI Agent 個人 AI 助理建置",
 "icon": "🪽",
 "speaker": "小佳（Claire）老師",
 "summary": "第十一次例會：把課程濃縮成 1.5 小時，實作建置個人 AI 助理 Hermes。注意：講義 PDF（Hermes_AI_Agent_AIOrators.pdf）在來源中沒有可擷取文字，本頁僅整理有紀錄的準備事項與延伸活動，並連結前面學到的 Agent 概念。",
 "concepts": [
  {
   "id": "c1",
   "title": "課前準備與工具",
   "points": [
    "工具：Hermes Agent（Nous Research 推出的 AI Agent）與官方桌面軟體 Hermes Desktop。",
    "上課前請先看課程內容與簡報，並先下載 Hermes Desktop。",
    "模型來源兩種方式：直接使用現有付費帳號（如 ChatGPT Plus、Gemini），或申請免費的 OpenRouter API Key。",
    "課程由資策會「Hermes AI Agent Desktop：個人 AI 助理建置與實務應用」濃縮而成，地點為 TCCC 台灣文創訓練中心（台北長安館）。"
   ],
   "quiz": [
    {
     "t": "mc",
     "q": "OpenRouter 在這堂課中的角色是？",
     "opts": [
      "提供模型 API Key，串接各家模型",
      "提供實體會議室",
      "提供 Excel",
      "提供影片剪輯"
     ],
     "a": 0,
     "ex": "可申請免費 API Key；後續手把手也用 OpenRouter 節省成本。"
    },
    {
     "t": "tf",
     "q": "Hermes Agent 是只能用 ChatGPT 的封閉工具。",
     "a": false,
     "ex": "可用現有付費帳號（ChatGPT Plus、Gemini）或 OpenRouter API Key，支援不同模型來源。"
    }
   ]
  },
  {
   "id": "c2",
   "title": "個人 AI 助理與前面學過的 Agent 概念對照",
   "points": [
    "Agent ＝ 模型（大腦）＋ 工具 ＋ 記憶 ＋ 流程（參考第 2、6 場）：Hermes 同樣屬於「介面／框架」，聰明程度取決於背後接的模型。",
    "重要的安全原則（第 6 場）：使用獨立環境與帳號、重要限制寫進長期記憶、執行風險工具前需人類核准。",
    "排程能力（Cron Job）：讓 Agent 在固定時間自動檢查與執行（第 6 場「心跳與排程」）。",
    "成本觀念：用 OpenRouter 等路由服務，可依任務挑選較便宜的模型。"
   ],
   "quiz": [
    {
     "t": "mc",
     "q": "個人 AI 助理（Agent）的聰明程度主要取決於？",
     "opts": [
      "背後接的語言模型品質",
      "電腦顏色",
      "螢幕大小",
      "網頁字體"
     ],
     "a": 0,
     "ex": "框架本身沒有智慧，能力來自模型。"
    },
    {
     "t": "tf",
     "q": "只要是個人 AI Agent，就可以直接給它日常使用的主要帳號密碼，因為這樣最方便。",
     "a": false,
     "ex": "建議使用獨立環境與帳號，避免風險（第 6 場原則）。"
    }
   ]
  },
  {
   "id": "c3",
   "title": "8/29 手把手：Cron Job 機票監控與省成本案例",
   "points": [
    "8/29 線上手把手主題：Hermes 實作、Cron Job 機票監控與防封鎖設置。",
    "Cron Job 的概念：定時觸發 Agent 去做事，例如定期檢查機票價格並通知。",
    "防封鎖：定時存取網站時要留意被網站封鎖的風險，需要做相應的設置（細節請見講義與錄影）。",
    "Claire 老師分享心得：如何利用 Hermes 串接 OpenRouter，以約 19 倍較低成本批改 530 篇文章。"
   ],
   "quiz": []
  }
 ]
});
