SESSIONS.push({
 "id": "s12",
 "order": 12,
 "date": "2026.09.19",
 "title": "AI Skill 介紹與運用",
 "icon": "🧩",
 "speaker": "小佳（Claire）老師等（AI Skill 101＋Skill 撰寫須知）",
 "summary": "最新一場：Prompt、Skill、Agent 的差別；什麼工作適合 Skill 化；Skill 結構心法（Trigger／Goal／SOP／Rules／Resources／QA）；以及打包 Skill 的 11 個常見坑與檢查表。",
 "concepts": [
  {
   "id": "c1",
   "title": "Prompt、Skill、Agent 三者的差別",
   "points": [
    "Prompt：告訴 AI「現在幫我做這一次」。下次換主題可能又要重新下 Prompt。",
    "Skill：告訴 AI「以後遇到這類事情，都照這套方法做」——把標準 SOP 打包。例：meeting-theme-skill 規定使用時機、輸入資料、沒想法時先給 3 個選項、Introduction 長度、Theme question 必須是開放式、提供視覺化描述產生封面圖、最終輸出格式；使用者只要說「Help me prepare a theme about AI」。",
    "Agent：不只回答，而是判斷「為了完成這個目標，我現在該做什麼」。例：準備例會 → 有 Theme 嗎？沒有→用 meeting-theme-skill；需要 Agenda→agenda-generator-skill；需要宣傳→meeting-poster-skill；檢查日期、主題、場地是否一致 → 完成 meeting package。",
    "關係：Agent 會呼叫多個 Skills，Skill 內含 SOP；Prompt 是單次指令。"
   ],
   "quiz": [
    {
     "t": "mc",
     "q": "「以後遇到這類事情，都照這套方法做」描述的是？",
     "opts": [
      "Skill",
      "Prompt",
      "Agent",
      "Token"
     ],
     "a": 0,
     "ex": "Skill＝標準 SOP 打包。"
    },
    {
     "t": "mc",
     "q": "「為了完成這個目標，我現在該做什麼」是哪一個的思維？",
     "opts": [
      "Agent",
      "Prompt",
      "Skill",
      "Template"
     ],
     "a": 0,
     "ex": "Agent 判斷目標、決定步驟與使用哪些 Skill。"
    },
    {
     "t": "mc",
     "q": "「現在幫我做這一次」最像哪一種？",
     "opts": [
      "Prompt",
      "Skill",
      "Agent",
      "Plugin"
     ],
     "a": 0,
     "ex": "Prompt 是一次性指令。"
    },
    {
     "t": "tf",
     "q": "在 Toastmasters 例子中，Agent 可以依序決定使用主題、議程、海報等多個 Skill，並檢查資料是否一致。",
     "a": true,
     "ex": "這就是 Agent 的任務規劃與協調。"
    }
   ]
  },
  {
   "id": "c2",
   "title": "什麼工作適合 Skill 化：RSRR 特徵",
   "points": [
    "候選工作最好符合 3 個以上：Repeated（會重複做）、Structured（有一定流程）、Rule-based（有你的規則、偏好或 SOP）、Reusable（未來還會再用）。",
    "練習：想想「有哪些事情我已經請 AI 做超過三次？」例：每週整理新聞、寫會議紀錄、做課程封面、整理 Excel 資料、寫社群貼文、寫 meeting introduction、整理客戶訪談、建立簡報。",
    "打包前提：流程自己至少完整做過 3 次且步驟穩定；流程還在變就別急著包。"
   ],
   "quiz": [
    {
     "t": "multi",
     "q": "下列哪些是適合 Skill 化工作的特徵？（多選）",
     "opts": [
      "Repeated 會重複做",
      "Structured 有一定流程",
      "Rule-based 有你的規則或 SOP",
      "只會做一次、沒有規則"
     ],
     "a": [
      0,
      1,
      2
     ],
     "ex": "還有 Reusable：未來還會再用。"
    },
    {
     "t": "mc",
     "q": "什麼時候「不要急著」把流程包成 Skill？",
     "opts": [
      "流程還在變動、自己還沒穩定做過幾次",
      "流程已做過 3 次且穩定",
      "工作會重複進行",
      "有明確 SOP"
     ],
     "a": 0,
     "ex": "流程還沒穩定時打包只會固化錯誤。"
    }
   ]
  },
  {
   "id": "c3",
   "title": "Skill 結構心法：Trigger、Goal、SOP、Rules、Resources、QA",
   "points": [
    "Trigger：何時使用？（在 description 描述清楚）",
    "Goal：要完成什麼？",
    "SOP：怎麼做？",
    "Rules：有哪些限制？",
    "Resources：可以參考什麼？",
    "QA：怎麼知道做對了？",
    "範例（文章轉簡報）：Trigger＝使用者提供文章並要求製作簡報；SOP＝閱讀 → 找核心訊息 → 建立故事線 → 拆成 8–12 頁 → 每頁一個主要訊息 → 配置視覺 → 產出 → 檢查；Rules＝每頁不超過 5 個 bullet、不貼原文段落、圖表優先、不捏造數據；Resources＝公司 PPT template、品牌色、Logo、優良範例；QA＝忠於原文、檢查溢字、版型一致、圖表匹配。"
   ],
   "quiz": [
    {
     "t": "order",
     "q": "Skill 結構心法的順序（講義列舉）是？",
     "items": [
      "Trigger",
      "Goal",
      "SOP",
      "Rules",
      "Resources",
      "QA"
     ],
     "ex": "何時用 → 目標 → 怎麼做 → 限制 → 參考 → 品質檢查。"
    },
    {
     "t": "mc",
     "q": "「不得捏造文章沒有的數據」屬於哪一項？",
     "opts": [
      "Rules",
      "Trigger",
      "Resources",
      "Goal"
     ],
     "a": 0,
     "ex": "限制與禁止事項屬於 Rules。"
    },
    {
     "t": "mc",
     "q": "「檢查頁面是否溢字」屬於？",
     "opts": [
      "QA",
      "SOP",
      "Trigger",
      "Resources"
     ],
     "a": 0,
     "ex": "品質檢查屬於 QA。"
    }
   ]
  },
  {
   "id": "c4",
   "title": "企業級 Agent 專案結構（Toastmasters Club Agent 範例）",
   "points": [
    "Agent 層：Instructions／Routing Rules（判斷意圖、需要哪些 Skills、決定順序、保存 Club Profile、檢查最後輸出）。",
    "技能：club-website、meeting-poster、meeting-theme、new-member-kit、agenda-generator、deployment。",
    "專案目錄：CLAUDE.md（seed，20–40 行：讀什麼、寫什麼、不准做什麼）；club/（唯一真實來源，不是 skill：profile.yaml、members.json、meetings/YYYY-MM-DD.yaml）；.claude/commands（順序寫死的主流程）；.claude/skills（真的需要創意或判斷的才做成 skill：meeting-theme、agenda-builder、club-copy）；render/（呼叫既有工具，不重寫）；verify/（腳本，exit 0 才算過）。",
    "設計原則：資料（真實來源）與技能分開；固定流程寫成 command；確定性驗證寫成腳本。"
   ],
   "quiz": [
    {
     "t": "mc",
     "q": "在範例專案結構中，「唯一真實來源」放在？",
     "opts": [
      "club/（profile.yaml、members.json、meetings/）",
      "verify/",
      "render/",
      "CLAUDE.md"
     ],
     "a": 0,
     "ex": "真實資料放 club/，不是 skill。"
    },
    {
     "t": "mc",
     "q": "哪類工作才建議做成 skill（在此範例）？",
     "opts": [
      "真的需要創意或判斷的（如 meeting-theme、agenda-builder）",
      "所有固定步驟",
      "所有資料",
      "都不用"
     ],
     "a": 0,
     "ex": "順序固定的主流程寫成 commands；需要判斷與創意的才是 skill。"
    }
   ]
  },
  {
   "id": "c5",
   "title": "建立與安裝 Skill：Claude／ChatGPT／對話建立",
   "points": [
    "建立與安裝有 Claude 與 ChatGPT 兩種平台流程；也可「透過對話」建立。",
    "最有效的建立法：先實際做一次給 AI 看，做完再說「把剛剛這個流程包成 skill」，讓它從真實操作紀錄反推步驟，你再補漏。",
    "Claude Code 有內建 skill-creator：帶你走「訪談 → 草稿 → 測試 → 看結果 → 改 → 再測」，並可優化 description 的觸發率。",
    "練習：修改「文章圖解（infographic）Skill」——把 Plugin 與 Logo 的品牌主色統一改為深綠 #1F5A45，保留紅色批註、黃色標記、白色背景，同步更新所有色彩設定並驗證後重新打包，再安裝並用它將文章轉資訊圖。",
    "練習文章：Dan Koe「一日人生重啟協議」——早晨心理挖掘、日間中斷自動導航、晚間整合與遊戲化。"
   ],
   "quiz": [
    {
     "t": "mc",
     "q": "新手建立 Skill 的最有效方法是？",
     "opts": [
      "先實際做一次給 AI 看，再說「把剛剛這個流程包成 skill」",
      "只用嘴巴描述流程",
      "直接複製別人的 Skill 不修改",
      "先寫 1000 行說明"
     ],
     "a": 0,
     "ex": "用真實操作紀錄反推 SOP 比空想描述好。"
    },
    {
     "t": "mc",
     "q": "Claude Code 內建的 skill-creator 帶你走的循環是？",
     "opts": [
      "訪談 → 草稿 → 測試 → 看結果 → 改 → 再測",
      "下載 → 安裝 → 刪除",
      "註冊 → 付費 → 登出",
      "貼上 → 送出"
     ],
     "a": 0,
     "ex": "還會幫忙優化 description 的觸發率。"
    }
   ]
  },
  {
   "id": "c6",
   "title": "Skill 撰寫須知（上）：description 與觸發",
   "points": [
    "description 是「唯一常駐在 AI 記憶裡」的內容，AI 靠它決定要不要打開 skill；要寫「做什麼＋使用者講什麼話時要用」，語氣稍微強勢，因為模型傾向「該用卻沒用」。",
    "寫法三級：弱（產生簡報的工具）→ 中（把大綱轉成 pptx，提到簡報／投影片／deck 時使用）→ 推（…只要使用者提供大綱、條列、章節標題，或提到簡報／一頁一頁，就使用本 skill，即使他沒有明講「簡報」）。",
    "「推」有兩半：涵蓋面（同義詞、口語、英文、情境描述）＋語氣（明確降低門檻的指令句，如「即使他沒有明講…」）。",
    "推過頭代價：誤觸發、與其他 skill 互搶；所以要配「邊界」（Do NOT use for…）——正面推＋負面圍。",
    "觸發天花板：太簡單的單步任務本來就不會觸發 skill；測試 prompt 要夠有份量。",
    "「什麼時候用」不要寫在正文——正文只有觸發後才載入，要全部放 description。",
    "判斷推得夠不夠：拿不明講 skill 名字的真實口吻 prompt 去測。"
   ],
   "tip": "正面推 + 負面圍：description 寫「何時用」＋「何時不要用」。",
   "quiz": [
    {
     "t": "mc",
     "q": "為什麼「什麼時候用」要寫在 description 而不是正文？",
     "opts": [
      "正文只有在 skill 被觸發之後才會載入，觸發條件寫在正文等於沒寫",
      "正文太長",
      "因為 description 比較好看",
      "因為正文不能寫中文"
     ],
     "a": 0,
     "ex": "description 才是常駐、用來判斷是否觸發的內容。"
    },
    {
     "t": "mc",
     "q": "下列哪個 description 屬於「推」的寫法？",
     "opts": [
      "產生簡報的工具",
      "把大綱轉成 pptx。使用者提到簡報時使用。",
      "把大綱轉成 pptx。只要使用者提供大綱或提到一頁一頁，就使用本 skill，即使沒明講「簡報」",
      "簡報"
     ],
     "a": 2,
     "ex": "關鍵是「即使他沒有明講…」降低判斷門檻。"
    },
    {
     "t": "mc",
     "q": "「推過頭」的代價之一是？",
     "opts": [
      "誤觸發或與其他 skill 互搶",
      "檔案變小",
      "速度變快",
      "不會觸發"
     ],
     "a": 0,
     "ex": "所以要配一句邊界（Do NOT use for…）。"
    },
    {
     "t": "mc",
     "q": "測試觸發時，應該怎麼寫測試 prompt？",
     "opts": [
      "用真實使用者口吻，不明講 skill 名字",
      "直接說「請使用 XX skill」",
      "只寫「讀這個檔」",
      "隨便寫"
     ],
     "a": 0,
     "ex": "「請使用 XX skill」是作弊寫法；太簡單的單步任務也不會觸發。"
    }
   ]
  },
  {
   "id": "c7",
   "title": "Skill 撰寫須知（下）：11 個常見坑",
   "points": [
    "① description 太含蓄 ② 把「什麼時候用」寫在正文 ③ 沒把腦中隱性知識講出來（解法：實際做一次給 AI 看再反推）④ 過度貼合單一範例（overfitting）⑤ 一份 SKILL.md 塞爆（超過約 500 行就該拆，細節放 references/）⑥ 該寫成程式的寫成自然語言（確定性動作寫進 scripts/）⑦ 滿篇 MUST／絕對不可（講「為什麼」比堆命令有效）⑧ 寫死路徑與環境假設 ⑨ 一個 skill 想包山包海 ⑩ 沒測就當做完（至少 2–3 個真實 prompt，並跑無 skill 對照組）⑪ 改版時順手改名字（xxx-v2 會讓觸發與引用全亂，沿用原名）。",
    "必須講清楚的事：觸發時機、輸入、輸出（最好給 template）、步驟順序、判斷規則、品質標準、依賴、不要做什麼、1–3 組真實範例。",
    "打包前檢查：流程做過 3 次且穩定、能講出做對與做壞的差別、有 1–3 組真實輸入與成品。",
    "測試檢查：跑對照組確認有加分；拿沒用過的新輸入測試；改完重跑同一組，確認沒有修 A 壞 B。"
   ],
   "quiz": [
    {
     "t": "mc",
     "q": "SKILL.md 超過約多少行就該拆分？",
     "opts": [
      "約 500 行",
      "約 50 行",
      "約 5000 行",
      "不用拆"
     ],
     "a": 0,
     "ex": "細節、規格表、變體放到 references/。"
    },
    {
     "t": "mc",
     "q": "確定性、重複性的動作（改檔名、格式轉換、數值計算、驗證）應該怎麼處理？",
     "opts": [
      "寫成 scripts/ 底下的腳本",
      "每次叫模型用想的",
      "放進正文",
      "省略"
     ],
     "a": 0,
     "ex": "模型每次想的結果會有微妙差異。"
    },
    {
     "t": "mc",
     "q": "為什麼要跑「沒有 skill」的對照組？",
     "opts": [
      "確認 skill 真的有加分，而不是模型本來就會",
      "增加費用",
      "因為規定",
      "為了嚇 AI"
     ],
     "a": 0,
     "ex": "否則不知道 skill 有沒有價值。"
    },
    {
     "t": "mc",
     "q": "更新 Skill 版本時，建議怎麼命名？",
     "opts": [
      "沿用原名，避免 xxx-v2 讓觸發與引用混亂",
      "每次改新名字",
      "加上日期後綴",
      "刪除重建"
     ],
     "a": 0,
     "ex": "改版沿用原名。"
    },
    {
     "t": "mc",
     "q": "「過度貼合單一範例（overfitting）」指什麼？",
     "opts": [
      "用一份檔案反覆調整，最後 skill 只對那份有效",
      "寫得太簡潔",
      "用太多腳本",
      "用太多範例"
     ],
     "a": 0,
     "ex": "Skill 是要用一百次的，不是重播那一次對話。"
    },
    {
     "t": "tf",
     "q": "在 SKILL.md 中堆滿大寫的 MUST／絕對不可，通常比解釋「為什麼」更有效。",
     "a": false,
     "ex": "命令堆多了模型反而顧此失彼；講原因更有效。"
    }
   ]
  }
 ]
});
