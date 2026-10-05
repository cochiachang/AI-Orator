SESSIONS.push({
 "id": "s03",
 "order": 3,
 "date": "2025.11.08",
 "title": "n8n 自動化工作流",
 "icon": "🔗",
 "speaker": "Michael 老師（中部 AI Innovator 主辦）＋ 影片補充：JotForm 流程、HC「讓 AI 說人話」LINE × Telegram 電商入口",
 "summary": "用視覺化、免寫程式的 n8n 把 LINE 官方帳號、Gemini、Google Sheet 串起來，做出會自動回覆的聊天機器人；並延伸到表單審核流程（JotForm）與 LINE／Telegram 電商入口。",
 "concepts": [
  {
   "id": "c1",
   "title": "為什麼要學 n8n：從樂手變指揮家",
   "points": [
    "AI 擅長處理重複、有固定規則的事（報表、制式 email），這些工作正快速被自動化。",
    "機會在於：機器做事，誰來指揮？需要的是「知道怎麼用工具、設計流程，讓 AI 乖乖工作」的人。",
    "n8n 像所有 App 的「萬能遙控器」：開源、拖拉式視覺介面、不用寫程式，把平常用的軟體與 AI 服務串成專屬流程。",
    "三大好處：① 大幅提升個人生產力 ② 從被動使用 AI 變成主動打造 AI 解決方案 ③ 培養能應對未來的思考方式與核心技能（學習曲線低、成本低、職場價值高）。",
    "最終目標：從「被動的科技使用者」轉變為「主動的解決方案創造者」。"
   ],
   "quiz": [
    {
     "t": "multi",
     "q": "下列哪些是學 n8n 的三大好處？（多選）",
     "opts": [
      "大幅提升個人生產力",
      "打造專屬 AI 解決方案",
      "建立面對未來的關鍵技能",
      "一定能取代所有工程師"
     ],
     "a": [
      0,
      1,
      2
     ],
     "ex": "最後一項是誇大；三大好處為生產力、專屬 AI 解決方案、未來關鍵技能。"
    },
    {
     "t": "tf",
     "q": "n8n 的優勢之一是你完全不必寫程式碼，用拖拉的視覺化介面就能建立流程。",
     "a": true,
     "ex": "核心賣點就是視覺化、免程式碼。"
    }
   ]
  },
  {
   "id": "c2",
   "title": "n8n 基本概念：節點、工作流、Trigger、Webhook",
   "points": [
    "Workflow（工作流）＝由多個「節點（Node）」連成的流程；第一個節點通常是 Trigger（觸發）。",
    "Webhook：外部服務（如 LINE）把訊息「推」到 n8n 的一個網址。LINE 收到訊息 → 呼叫 Webhook URL → n8n 開始跑流程。",
    "Switch / If 節點：做邏輯判斷，分流（例如：文字走一條路、圖片走另一條路）。",
    "n8n 可串接約上千種服務，官方有 6000 多個現成範例模板可下載匯入；範例可複製（Ctrl+C）後貼進自己的畫布（Ctrl+V）。",
    "雲端版可免費試用 14 天；也可由老師的主機邀請 email 使用。",
    "若看不懂模板，可以丟給 AI 請它解釋；新版也有「用文字描述自動生成流程」的 AI 功能（需知道 switch＝邏輯判斷等關鍵字）。"
   ],
   "quiz": [
    {
     "t": "mc",
     "q": "Webhook 在 LINE × n8n 流程中的作用是？",
     "opts": [
      "讓 n8n 把訊息推給 Gemini",
      "讓 LINE 收到訊息後把資料送到 n8n 指定的網址",
      "用來儲存圖片",
      "產生 API Key"
     ],
     "a": 1,
     "ex": "Webhook URL 是 n8n 提供給 LINE 的接收端。"
    },
    {
     "t": "mc",
     "q": "流程中需要「依訊息是文字或圖片走不同路徑」，應使用哪類節點？",
     "opts": [
      "Switch／If 判斷節點",
      "Schedule 節點",
      "Sheet 節點",
      "Webhook 節點"
     ],
     "a": 0,
     "ex": "Switch/If 負責邏輯判斷與分流。"
    }
   ]
  },
  {
   "id": "c3",
   "title": "實作主線：LINE 官方帳號 × n8n × Gemini 聊天機器人",
   "points": [
    "流程：LINE 使用者傳訊 → LINE Webhook → n8n → Google Gemini → 回傳 → LINE 回覆給使用者。",
    "只需改三個地方：① 把 n8n 的 Production Webhook URL 貼到 LINE Messaging API 的 Webhook ② 把 LINE 的 Channel Access Token 填入 n8n 最後的 Send LINE 節點（Bearer Authentication）③ 把 Google Gemini API Key 填入 Gemini 節點。",
    "個人 LINE 帳號不能做，必須先用 manager.line.biz 建立「LINE 官方帳號」並啟用 Messaging API；回應設定中要打開「聊天」與「Webhook」。",
    "Gemini API Key 到 aistudio.google.com 的 Get API Key 建立；選 Gemini 的原因是不需要綁信用卡（ChatGPT/OpenAI 需信用卡並至少儲值 5 美元）。",
    "設定完成後，需 Activate（發佈）workflow 並確認 Production URL；之後 LINE 傳訊息就會自動收到 Gemini 回覆。"
   ],
   "tip": "三步驟口訣：URL 貼到 LINE、Token 貼到 n8n、Key 貼到 Gemini。",
   "quiz": [
    {
     "t": "order",
     "q": "LINE × n8n × Gemini 機器人的訊息流向，正確順序是？",
     "items": [
      "使用者在 LINE 傳訊息",
      "LINE 透過 Webhook 把訊息送到 n8n",
      "n8n 把內容丟給 Gemini 產生回覆",
      "n8n 透過 LINE 節點把回覆傳回使用者"
     ],
     "ex": "使用者 → LINE → n8n → Gemini → n8n → LINE → 使用者。"
    },
    {
     "t": "mc",
     "q": "在「LINE → n8n → Gemini → LINE」流程中，三段分別是什麼角色？",
     "opts": [
      "觸發（接收訊息）→ 處理（AI 產生回覆）→ 輸出（回傳給使用者）",
      "輸出 → 觸發 → 處理",
      "只有觸發，沒有處理",
      "全部都是人工"
     ],
     "a": 0,
     "ex": "自動化的基本結構：Trigger → Action（含 AI）→ Output。"
    }
   ]
  },
  {
   "id": "c4",
   "title": "API、Token 與認證觀念",
   "points": [
    "程式和程式之間靠 API 溝通；對方不認識你，就給你一把「鑰匙（Key／Token）」，它認鑰匙。",
    "LINE 的 Channel Access Token 要用 Bearer Authentication：標頭 Value 要寫成「Bearer 」＋Token，且「Bearer」的 B 要大寫，否則會出錯。",
    "LINE 內建的 n8n 節點已停止服務，影片 HC 的做法是改用 HTTP Request 節點呼叫 LINE API（Reply / Push）。",
    "Webhook 必須是連續網址（Path 不能有空格），並要設為 POST。",
    "所有金鑰屬於機密，不要公開貼在群組或截圖裡。"
   ],
   "quiz": [
    {
     "t": "mc",
     "q": "API Key 的比喻最貼切的是？",
     "opts": [
      "一把識別身分的鑰匙",
      "一張海報",
      "一個網站",
      "一個備份檔"
     ],
     "a": 0,
     "ex": "程式用鑰匙識別彼此。"
    },
    {
     "t": "mc",
     "q": "不同服務之間為什麼需要 API Key／Token 認證？",
     "opts": [
      "讓對方辨識呼叫者身分並控管權限",
      "讓程式跑得更快",
      "為了顯示廣告",
      "為了壓縮資料"
     ],
     "a": 0,
     "ex": "API 沒有人臉可辨識，用金鑰（Token）確認「誰在呼叫」。"
    },
    {
     "t": "tf",
     "q": "API Key 屬於機密，不應公開貼在群組或截圖。",
     "a": true,
     "ex": "外洩的金鑰可能被盜用、產生費用或資安風險。"
    }
   ]
  },
  {
   "id": "c5",
   "title": "除錯與共用主機的實務守則",
   "points": [
    "看 Execution（執行紀錄）判斷訊息有沒有進來；沒回應先檢查：Webhook URL 是否複製正確、Token 是否貼到正確位置、LINE「回應設定」的聊天與 Webhook 是否開啟。",
    "練習時多人共用同一台 n8n 主機：機器人名稱要加上自己的名字，Webhook 路徑要獨立，避免互相混淆。",
    "一個 LINE 帳號下可建立多個機器人（美食、發票…），每個機器人要各自設定一次。",
    "Test URL 與 Production URL 不同；正式使用要用 Production URL 並啟用流程。",
    "不用怕卡關：影片有錄影回放，可重複練習；有經驗的會員可輔導其他人。"
   ],
   "quiz": [
    {
     "t": "mc",
     "q": "機器人沒有回覆時，老師建議先看哪裡找線索？",
     "opts": [
      "Execution（執行紀錄）",
      "Facebook",
      "手機電量",
      "重新安裝 LINE"
     ],
     "a": 0,
     "ex": "看執行紀錄可知道訊息有沒有進入流程。"
    }
   ]
  },
  {
   "id": "c6",
   "title": "圖片辨識分支與 Garbage In, Garbage Out",
   "points": [
    "進階範例（卡路里機器人）：若訊息是文字 → 走 Gemini 回答；若是圖片 → 先下載圖片 → 用 OpenAI 影像分析估算卡路里 → 回傳 LINE，並把資料寫入 Google Sheet。",
    "通用公開模型只會做一般性回答，無法回答你產業的專業知識（例如採耳店的專業問題）——這就是 Garbage In, Garbage Out。",
    "解方：灌入自己的資料（像 NotebookLM 那樣依你提供的內容回答），也就是後來學的知識庫／RAG 做法。",
    "實務價值：下班後客服機器人回答簡單問題；表單報名後自動回信；串 Google 日曆做提醒。",
    "目前最大限制：只是把內容丟給模型再丟回來，模型可能產生幻覺，需要自己的資料來提高精準度。"
   ],
   "quiz": [
    {
     "t": "mc",
     "q": "Garbage In, Garbage Out 在這場課程中的意思是？",
     "opts": [
      "垃圾分類很重要",
      "只丟給通用模型、沒有自己專業資料，回答就會很一般",
      "n8n 會產生垃圾資料",
      "模型一定不會出錯"
     ],
     "a": 1,
     "ex": "要回答專業問題，需提供自己的資料。"
    },
    {
     "t": "tf",
     "q": "要讓機器人懂你的產業專業知識，下一步方向是灌入自己的資料，而不是只用公開模型。",
     "a": true,
     "ex": "類似 NotebookLM 或 RAG 的做法。"
    }
   ]
  },
  {
   "id": "c7",
   "title": "LINE × Telegram 電商入口：Flex Message 與自動化",
   "points": [
    "LINE 圖卡使用 Flex Message，最多一次傳 12 張卡片；可用 Flex Message Simulator 設計，再用「View as JSON」取得程式碼貼進 n8n。",
    "Telegram 用 sendPhoto 傳圖片，無法做出像 LINE 的圖卡，但不收傳輸費；LINE 免費訊息主動傳輸有限額（影片提到 200 則限制）。",
    "指令用 Switch 分流：文字「本月主打」或 Telegram Command 走商品流程，其他走 Chatbot——完全不耗 Token，只在聊天機器人那段耗用。",
    "庫存自動化：Schedule 每月 1 日 12:00 觸發 → 讀 Google Sheet（93 項商品）→ If 庫存大於 45 → 更新 On Sale 欄位。",
    "更新 Google Sheet 勾選欄位要傳「布林值（true/false）」，不是字串。時區要設定為台北，排程才準。",
    "兩邊後台不同：LINE 有 OA 後台與 Developers 後台；Telegram 的選單用 Bot Settings / Edit Commands 設定。"
   ],
   "quiz": [
    {
     "t": "mc",
     "q": "用 Switch 依關鍵字分流而不是 AI 分類，最大的好處是？",
     "opts": [
      "更有創意",
      "不消耗 Token，成本最低",
      "速度變慢",
      "可以免登入"
     ],
     "a": 1,
     "ex": "單純 Switch 判斷不需要呼叫模型。"
    },
    {
     "t": "order",
     "q": "每月庫存自動更新主打商品的流程，正確順序是？",
     "items": [
      "Schedule 每月 1 日定時觸發",
      "讀取 Google Sheet 商品資料",
      "If 判斷庫存是否大於 45",
      "更新 On Sale 欄位（布林值）"
     ],
     "ex": "觸發 → 讀資料 → 判斷 → 寫回。"
    }
   ]
  },
  {
   "id": "c8",
   "title": "JotForm：表單變成工作流程（審核＋歸檔）",
   "points": [
    "表單不只收資料，還能成為流程的起點：提交 → 主管審核 → 分派承辦 → 通知申請人 → 文件歸檔。",
    "條件邏輯（顯示/隱藏）：選擇「差旅費」才顯示出差起訖日；用「表單計算」算出天數，若 <0 顯示紅字提示（需加「兩日期皆已填寫」條件避免提前跳出）。",
    "簽名欄會把資料轉成具法律效力的 PDF，簽署後鎖定不可修改。",
    "「如果／否則」節點：報銷金額 >5000 → 部門總監審核；否則部門經理審核。審批有「審批並簽署」與「審批（同意/拒絕）」兩種。",
    "核准後 → 財務人員撥款 → 自動 email 通知申請人，並用 Google 雲端硬碟整合歸檔 PDF 與憑證；拒絕則寄「未獲核准」通知。",
    "提交資料可用表格、行事曆、卡片、圖表檢視；也可套用模板快速建立。"
   ],
   "quiz": [
    {
     "t": "mc",
     "q": "流程中使用「如果／否則（If/Else）」依條件分流（例如依金額送不同審核者），價值是？",
     "opts": [
      "把規則寫進流程，自動導向正確的處理者",
      "讓流程變慢",
      "只是為了美觀",
      "取代所有人工決策"
     ],
     "a": 0,
     "ex": "條件分支能把決策規則自動化。"
    },
    {
     "t": "mc",
     "q": "「表單作為工作流程起點」與單純收集問卷的差別是？",
     "opts": [
      "提交後可串接審批、通知、歸檔等後續自動化",
      "表單不能收集資料",
      "表單只能給自己看",
      "沒有差別"
     ],
     "a": 0,
     "ex": "表單只是入口，價值在於後續自動化流程。"
    }
   ]
  },
  {
   "id": "c9",
   "title": "學習路線與分會願景",
   "points": [
    "入門路徑：n8n 官網教學影片 → 免費社群論壇求助；多看範例流程（市面上有些流程價值數千美元，因為解決了商業痛點）。",
    "先想一個「最想自動化的事」，答案就是第一步。",
    "分會願景：今年學工具與應用，明年第一屆「畢業生」成為 trainer，帶下一屆幹部（從幼幼班到小班，再教幼幼班）。",
    "後續方向：更多學員的實際案例分享，以及能解決演講會之外的 project。"
   ],
   "quiz": []
  }
 ]
});
