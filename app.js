(() => {
'use strict';
/* ---------- 工具 ---------- */
const KEY = 'aio-learn-v1';
const sessions = window.SESSIONS.slice().sort((a, b) => a.order - b.order);
const byId = Object.fromEntries(sessions.map(s => [s.id, s]));

let st = { res: {}, theme: null, fold: false };
try { Object.assign(st, JSON.parse(localStorage.getItem(KEY) || '{}')); } catch (e) {}
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) {} };

function el(tag, props, ...kids) {
  const n = document.createElement(tag);
  for (const [k, v] of Object.entries(props || {})) {
    if (v == null || v === false) continue;
    if (k === 'class') n.className = v;
    else if (k === 'html') n.innerHTML = v;
    else if (k.startsWith('on')) n.addEventListener(k.slice(2), v);
    else n.setAttribute(k, v === true ? '' : v);
  }
  for (const c of kids.flat()) if (c != null && c !== false) n.append(c.nodeType ? c : document.createTextNode(c));
  return n;
}
const mount = (node, ...kids) => node.replaceChildren(...kids.flat(Infinity).filter(c => c != null && c !== false));
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.random() * (i + 1) | 0; [a[i], a[j]] = [a[j], a[i]]; } return a; };
const same = (a, b) => a.length === b.length && a.every((x, i) => x === b[i]);

/* ---------- 題庫索引 ---------- */
const allQ = [];
sessions.forEach(s => s.concepts.forEach((c, ci) => c.quiz.forEach((q, qi) => {
  allQ.push({ id: `${s.id}.${c.id}.${qi}`, q, s, c, ci });
})));
const qOf = (s, c) => allQ.filter(x => x.s === s && (!c || x.c === c));
const isOk = id => st.res[id] && st.res[id].ok === true;
const stat = list => ({ total: list.length, done: list.filter(x => isOk(x.id)).length });
const pct = list => { const t = stat(list); return t.total ? Math.round(t.done / t.total * 100) : 0; };
function record(id, ok) {
  const r = st.res[id] || { right: 0, wrong: 0 };
  ok ? r.right++ : r.wrong++; r.ok = ok; st.res[id] = r; save(); refreshProgress();
}
const wrongList = () => allQ.filter(x => st.res[x.id] && st.res[x.id].ok === false);

/* ---------- 題目元件 ---------- */
function renderQuestion(item, opts = {}) {
  const { q, id } = item;
  const box = el('div', { class: 'q' });
  const tagTxt = { mc: '單選', tf: '是非', multi: '多選', order: '排序' }[q.t];
  const stem = el('div', { class: 'stem' }, el('span', { class: 'tag' }, tagTxt), q.q);
  const area = el('div');
  box.append(stem, area);
  if (opts.context) stem.before(el('div', { class: 'meta', style: 'margin-bottom:6px' }, el('span', {}, `${item.s.icon} ${item.s.title}`), el('span', {}, item.c.title)));

  function finish(ok, extraNode) {
    box.classList.remove('ok', 'bad'); box.classList.add(ok ? 'ok' : 'bad');
    const fb = el('div', { class: 'fb ' + (ok ? 'ok' : 'bad') }, ok ? '✅ 答對了！' : '❌ 再想想', q.ex ? el('span', { class: 'ex' }, '解析：' + q.ex) : null);
    const acts = el('div', { class: 'actions' });
    if (!opts.noRetry) acts.append(el('button', { class: 'btn ghost small', onclick: () => { box.classList.remove('ok', 'bad'); build(); } }, '🔁 再試一次'));
    area.append(fb, acts);
    record(id, ok);
    if (opts.onAnswered) opts.onAnswered(ok, acts);
  }

  function build() {
    area.replaceChildren();
    if (q.t === 'mc' || q.t === 'tf') {
      const labels = q.t === 'tf' ? ['正確', '錯誤'] : q.opts;
      const correctIdx = q.t === 'tf' ? (q.a ? 0 : 1) : q.a;
      const order = q.t === 'tf' ? [0, 1] : shuffle(labels.map((_, i) => i));
      const wrap = el('div', { class: 'opts' });
      const btns = order.map((oi, pos) => {
        const b = el('button', { class: 'opt', type: 'button' }, el('span', { class: 'mark' }, String.fromCharCode(65 + pos)), el('span', {}, labels[oi]));
        b.addEventListener('click', () => {
          btns.forEach(x => x.disabled = true);
          const ok = oi === correctIdx;
          b.classList.add(ok ? 'right' : 'wrong');
          if (!ok) btns[order.indexOf(correctIdx)].classList.add('right');
          finish(ok);
        });
        return b;
      });
      wrap.append(...btns); area.append(wrap);
    } else if (q.t === 'multi') {
      const order = shuffle(q.opts.map((_, i) => i));
      const sel = new Set();
      const wrap = el('div', { class: 'opts' });
      const btns = order.map((oi, pos) => {
        const b = el('button', { class: 'opt', type: 'button' }, el('span', { class: 'mark' }, '✓'), el('span', {}, q.opts[oi]));
        b.addEventListener('click', () => { sel.has(oi) ? sel.delete(oi) : sel.add(oi); b.classList.toggle('sel'); submit.disabled = !sel.size; });
        return b;
      });
      const submit = el('button', { class: 'btn small', disabled: true, onclick: () => {
        btns.forEach(x => x.disabled = true); submit.remove();
        const ans = new Set(q.a);
        btns.forEach((b, pos) => {
          const oi = order[pos]; b.classList.remove('sel');
          if (ans.has(oi)) b.classList.add('right'); else if (sel.has(oi)) b.classList.add('wrong');
        });
        finish(sel.size === ans.size && [...sel].every(x => ans.has(x)));
      } }, '送出答案');
      wrap.append(...btns); area.append(wrap, el('div', { class: 'actions' }, submit));
    } else if (q.t === 'order') {
      let pool = shuffle(q.items.map((_, i) => i));
      if (q.items.length > 1) while (same(pool, q.items.map((_, i) => i))) pool = shuffle(pool);
      const picked = [];
      const poolBox = el('div', { class: 'chips' }), ansBox = el('div', { class: 'chips' });
      const check = el('button', { class: 'btn small', disabled: true }, '檢查順序');
      const reset = el('button', { class: 'btn ghost small', type: 'button' }, '重新排');
      const draw = locked => {
        poolBox.replaceChildren(...pool.filter(i => !picked.includes(i)).map(i =>
          el('button', { class: 'chip', type: 'button', onclick: () => { picked.push(i); draw(); } }, q.items[i])));
        ansBox.replaceChildren(...picked.map((i, n) =>
          el('button', { class: 'chip ans', type: 'button', onclick: () => { picked.splice(n, 1); draw(); } }, el('span', { class: 'n' }, n + 1), q.items[i])));
        check.disabled = picked.length !== q.items.length;
      };
      reset.onclick = () => { picked.length = 0; draw(); };
      check.onclick = () => {
        const ok = picked.every((v, n) => v === n);
        check.remove(); reset.remove();
        ansBox.replaceChildren(...picked.map((v, n) => el('button', { class: 'chip ' + (v === n ? 'right' : 'wrong'), disabled: true }, el('span', { class: 'n' }, n + 1), q.items[v])));
        poolBox.replaceChildren(); area.querySelector('.order-zone .lbl')?.remove();
        const sol = el('div', { class: 'order-zone' }, el('div', { class: 'lbl' }, '正確順序：'), el('div', { class: 'chips' }, q.items.map((t, n) => el('div', { class: 'chip right' }, el('span', { class: 'n' }, n + 1), t))));
        finish(ok);
        if (!ok) area.insertBefore(sol, area.querySelector('.fb'));
      };
      area.append(el('div', { class: 'order-zone' },
        el('div', { class: 'lbl' }, '依序點選項目（點已選的可取消）：'), poolBox,
        el('div', { class: 'lbl' }, '你的排序：'), ansBox),
        el('div', { class: 'actions' }, check, reset));
      draw();
    }
  }
  build();
  return box;
}

/* ---------- 版面片段 ---------- */
const bar = p => el('div', { class: 'bar' }, el('i', { style: `width:${p}%` }));
function bolden(text) {
  const i = text.indexOf('：');
  if (i > 0 && i <= 16) return `<b>${esc(text.slice(0, i))}</b>：${esc(text.slice(i + 1))}`;
  return esc(text);
}
const esc = s => s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

/* ---------- 側欄 ---------- */
const sidebar = document.getElementById('sidebar');
const app = document.getElementById('app');
function renderSidebar(active) {
  const w = wrongList().length;
  mount(sidebar,
    el('a', { class: 'nav-item' + (active === 'home' ? ' active' : ''), href: '#/' }, el('span', { class: 'ico' }, '🏠'), '總覽'),
    el('a', { class: 'nav-item' + (active === 'review' ? ' active' : ''), href: '#/review' }, el('span', { class: 'ico' }, '🎯'), '綜合測驗'),
    el('a', { class: 'nav-item' + (active === 'wrong' ? ' active' : ''), href: '#/review?wrong=1' }, el('span', { class: 'ico' }, '📕'), '錯題本', el('span', { class: 'pct' }, w ? w + ' 題' : '')),
    el('h4', {}, '年度場次'),
    sessions.map(s => el('a', { class: 'nav-item' + (active === s.id ? ' active' : ''), href: '#/s/' + s.id, 'data-sid': s.id },
      el('span', { class: 'ico' }, s.icon),
      el('span', {}, s.title, el('small', {}, s.date)),
      el('span', { class: 'pct' }, pct(qOf(s)) + '%')))
  );
}
function refreshProgress() {
  const route = currentRoute();
  renderSidebar(route.active);
  document.querySelectorAll('[data-concept]').forEach(n => {
    const [sid, cid] = n.dataset.concept.split('.');
    const list = qOf(byId[sid], byId[sid].concepts.find(c => c.id === cid));
    const t = stat(list), done = t.total > 0 && t.done === t.total;
    const badge = n.querySelector('.badge'); if (badge) { badge.textContent = !t.total ? '📖 閱讀' : done ? '✅ 已掌握' : `${t.done}/${t.total} 題`; badge.classList.toggle('done', done); }
    const chip = document.querySelector(`.toc a[data-c="${cid}"]`); if (chip) chip.classList.toggle('done', done);
  });
  const sp = document.querySelector('[data-sprog]');
  if (sp) { const s = byId[sp.dataset.sprog]; const p = pct(qOf(s)); sp.querySelector('.bar i').style.width = p + '%'; sp.querySelector('.pp').textContent = `${stat(qOf(s)).done}/${qOf(s).length} 題已答對（${p}%）`; }
}

/* ---------- 頁面：首頁 ---------- */
function pageHome() {
  const t = stat(allQ);
  const answered = Object.keys(st.res).length;
  let right = 0, tries = 0; Object.values(st.res).forEach(r => { right += r.right; tries += r.right + r.wrong; });
  const nextS = sessions.find(s => pct(qOf(s)) < 100) || sessions[0];
  const nConcepts = sessions.reduce((n, s) => n + s.concepts.length, 0);
  mount(app,
    el('section', { class: 'hero' },
      el('h1', {}, '🎙️ AI Orators 年度學習複習站'),
      el('p', { class: 'lead' }, `從 2025/09 到 2026/09，共 ${sessions.length} 個主題、${nConcepts} 個關鍵概念、${allQ.length} 道測驗題。每個概念先讀重點、立刻小測驗，答錯可以馬上重試；進度與錯題會自動儲存在這台瀏覽器。`),
      el('div', { class: 'toolbar' },
        el('a', { class: 'btn', href: '#/s/' + nextS.id }, answered ? '▶ 繼續學習：' + nextS.title : '▶ 從第一場開始'),
        el('a', { class: 'btn ghost', href: '#/review' }, '🎯 綜合測驗'),
        el('a', { class: 'btn ghost', href: '#/review?wrong=1' }, '📕 只考錯題')),
      el('div', { class: 'stats' },
        el('div', { class: 'stat' }, el('b', {}, `${t.done}/${t.total}`), el('span', {}, '題已答對')),
        el('div', { class: 'stat' }, el('b', {}, pct(allQ) + '%'), el('span', {}, '整體掌握度')),
        el('div', { class: 'stat' }, el('b', {}, tries ? Math.round(right / tries * 100) + '%' : '—'), el('span', {}, '歷史答對率')),
        el('div', { class: 'stat' }, el('b', {}, wrongList().length), el('span', {}, '錯題待複習')))),
    el('div', { class: 'grid' }, sessions.map(s => {
      const p = pct(qOf(s));
      return el('a', { class: 'card', href: '#/s/' + s.id },
        el('div', { class: 'date' }, `${String(s.order).padStart(2, '0')} · ${s.date}`),
        el('div', { class: 't' }, `${s.icon} ${s.title}`),
        el('div', { class: 's' }, s.summary),
        bar(p), el('div', { class: 'meta' }, el('span', {}, `${s.concepts.length} 個概念 · ${qOf(s).length} 題`), el('span', {}, p + '%')));
    })),
    el('div', { class: 'toolbar' }, el('button', { class: 'btn ghost small', onclick: () => { if (confirm('確定要清除所有作答進度與錯題紀錄嗎？')) { st.res = {}; save(); route(); } } }, '🗑️ 清除進度')),
    el('footer', { class: 'note' }, '內容整理自 AI Orators 進階分會 2025–2026 年度工作坊的講義、簡報與逐字稿。部分檔案（如純圖片簡報）沒有可擷取的文字，相關場次已在頁面中註明；詳細內容請以原始講義與錄影為準。')
  );
}

/* ---------- 頁面：場次 ---------- */
function pageSession(sid, cid) {
  const s = byId[sid];
  if (!s) return pageHome();
  const idx = sessions.indexOf(s), prev = sessions[idx - 1], next = sessions[idx + 1];
  const p = pct(qOf(s)); const t = stat(qOf(s));
  const note = /注意：/.test(s.summary);
  mount(app,
    el('div', { class: 'crumbs' }, el('a', { href: '#/' }, '總覽'), ' › ', `第 ${s.order} 場`),
    el('div', { class: 'session-head' },
      el('div', { class: 'big' }, s.icon),
      el('div', { style: 'flex:1;min-width:240px' },
        el('div', { class: 'meta' }, el('span', {}, '📅 ' + s.date)),
        el('h1', {}, s.title),
        el('div', { class: 'meta', style: 'justify-content:flex-start;gap:10px;font-size:.9rem' }, '🎤 ' + s.speaker))),
    el('p', { class: 'lead' }, s.summary.replace(/注意：.*$/, '').trim()),
    note ? el('div', { class: 'warnbox' }, '⚠️ ' + s.summary.slice(s.summary.indexOf('注意：'))) : null,
    el('div', { 'data-sprog': s.id, style: 'margin-top:14px' }, bar(p), el('div', { class: 'meta', style: 'margin-top:4px' }, el('span', { class: 'pp' }, `${t.done}/${qOf(s).length} 題已答對（${p}%）`))),
    el('div', { class: 'toc' }, s.concepts.map((c, i) => el('a', { href: `#/s/${s.id}/${c.id}`, 'data-c': c.id, class: qOf(s, c).length && stat(qOf(s, c)).done === qOf(s, c).length ? 'done' : '' }, `${i + 1}. ${c.title}`))),
    el('div', { class: 'toolbar' },
      el('button', { class: 'btn ghost small', onclick: () => { st.fold = !st.fold; save(); document.querySelectorAll('details.pts').forEach(d => d.open = !st.fold); } }, '📖 展開／收合所有重點（先測驗再看重點）'),
      el('a', { class: 'btn small', href: `#/review?scope=${s.id}` }, '🎯 本場綜合測驗')),
    s.concepts.map((c, i) => {
      const list = qOf(s, c), tt = stat(list), done = tt.total > 0 && tt.done === tt.total;
      return el('section', { class: 'concept', id: `c-${c.id}`, 'data-concept': `${s.id}.${c.id}` },
        el('header', {}, el('div', { class: 'no' }, i + 1), el('h2', {}, c.title), el('span', { class: 'badge' + (done ? ' done' : '') }, !tt.total ? '📖 閱讀' : done ? '✅ 已掌握' : `${tt.done}/${tt.total} 題`)),
        el('div', { class: 'body' },
          el('details', { class: 'pts', open: !st.fold }, el('summary', {}, '重點整理'),
            el('ul', { class: 'points' }, c.points.map(x => el('li', { html: bolden(x) }))),
            c.tip ? el('div', { class: 'tip' }, c.tip) : null)),
        list.length ? el('div', { class: 'quiz' }, el('h3', {}, '✍️ 小測驗', el('small', {}, `（${list.length} 題，答完立即看解析）`)),
          list.map(item => renderQuestion(item))) : null);
    }),
    el('div', { class: 'toolbar', style: 'justify-content:space-between;margin-top:30px' },
      prev ? el('a', { class: 'btn ghost', href: '#/s/' + prev.id }, '← ' + prev.title) : el('span'),
      next ? el('a', { class: 'btn ghost', href: '#/s/' + next.id }, next.title + ' →') : el('span'))
  );
  if (cid) { const n = document.getElementById('c-' + cid); if (n) setTimeout(() => n.scrollIntoView({ behavior: 'smooth', block: 'start' }), 30); }
}

/* ---------- 頁面：綜合測驗 ---------- */
function pageReview(params) {
  const wrongOnly = params.get('wrong') === '1';
  const scope0 = params.get('scope') || 'all';
  const form = { scope: scope0, n: wrongOnly ? 'all' : '10', wrong: wrongOnly };
  const sSel = el('select', {}, el('option', { value: 'all' }, '全部場次'), sessions.map(s => el('option', { value: s.id, selected: s.id === scope0 }, `${s.order}. ${s.title}`)));
  const nSel = el('select', {}, ['5', '10', '20', '30', 'all'].map(v => el('option', { value: v, selected: v === form.n }, v === 'all' ? '全部' : v + ' 題')));
  const wChk = el('input', { type: 'checkbox', checked: wrongOnly });
  const info = el('div', { class: 'meta', style: 'justify-content:flex-start' });
  const upd = () => { const n = pool().length; info.textContent = `符合條件：${n} 題`; go.disabled = !n; };
  const pool = () => allQ.filter(x => (sSel.value === 'all' || x.s.id === sSel.value) && (!wChk.checked || (st.res[x.id] && st.res[x.id].ok === false)));
  const go = el('button', { class: 'btn', onclick: () => {
    let d = shuffle(pool()); if (nSel.value !== 'all') d = d.slice(0, +nSel.value); runDeck(d);
  } }, '開始測驗');
  [sSel, nSel, wChk].forEach(x => x.addEventListener('change', upd));
  mount(app,
    el('div', { class: 'crumbs' }, el('a', { href: '#/' }, '總覽'), ' › ', wrongOnly ? '錯題本' : '綜合測驗'),
    el('h1', {}, wrongOnly ? '📕 錯題本' : '🎯 綜合測驗'),
    el('p', { class: 'lead' }, '從題庫隨機抽題，不看重點直接作答，檢視你真正記住了多少。答錯的題目會進入錯題本，可隨時再練習。'),
    el('div', { class: 'setup' },
      el('div', { class: 'field' }, el('label', {}, '範圍'), sSel),
      el('div', { class: 'field' }, el('label', {}, '題數'), nSel),
      el('label', { class: 'check' }, wChk, '只考我答錯過的題目'),
      info, el('div', {}, go)));
  upd();
}
function runDeck(deck) {
  let i = 0, score = 0; const wrong = [];
  const draw = () => {
    if (i >= deck.length) return finish();
    const item = deck[i];
    const next = el('button', { class: 'btn', style: 'display:none', onclick: () => { i++; draw(); } }, i + 1 === deck.length ? '看成績' : '下一題 →');
    const qn = renderQuestion(item, { context: true, noRetry: true, onAnswered: (ok, acts) => {
      if (ok) score++; else wrong.push(item);
      acts.append(next); next.style.display = '';
    } });
    mount(app,
      el('div', { class: 'crumbs' }, el('a', { href: '#/review' }, '← 結束測驗')),
      el('div', { class: 'progress-line' }, bar(Math.round(i / deck.length * 100)), el('span', { class: 'meta' }, `${i + 1} / ${deck.length}`)),
      qn);
    window.scrollTo(0, 0);
  };
  const finish = () => {
    const p = Math.round(score / deck.length * 100);
    mount(app,
      el('h1', {}, '測驗完成'),
      el('div', { class: 'result' }, `${score} / ${deck.length}（${p}%）`),
      el('p', { class: 'lead' }, p === 100 ? '🎉 全對！太厲害了。' : p >= 80 ? '👍 很不錯，把錯題再看一次就更穩了。' : '💪 繼續加油，回到該場次重讀重點再測一次。'),
      wrong.length ? el('div', {}, el('h2', {}, '需要加強的題目'), el('div', { class: 'wlist' }, wrong.map(w =>
        el('a', { href: `#/s/${w.s.id}/${w.c.id}` }, w.q.q, el('small', {}, `${w.s.icon} ${w.s.title} › ${w.c.title}`))))) : null,
      el('div', { class: 'toolbar' }, el('a', { class: 'btn', href: '#/review' }, '再測一次'), el('a', { class: 'btn ghost', href: '#/review?wrong=1' }, '📕 練習錯題'), el('a', { class: 'btn ghost', href: '#/' }, '回總覽')));
    window.scrollTo(0, 0);
  };
  draw();
}

/* ---------- 路由 ---------- */
function currentRoute() {
  const h = location.hash.replace(/^#/, '') || '/';
  const [path, qs] = h.split('?'); const parts = path.split('/').filter(Boolean);
  const params = new URLSearchParams(qs || '');
  if (!parts.length) return { active: 'home', fn: () => pageHome() };
  if (parts[0] === 's') return { active: parts[1], fn: () => pageSession(parts[1], parts[2]) };
  if (parts[0] === 'review') return { active: params.get('wrong') === '1' ? 'wrong' : 'review', fn: () => pageReview(params) };
  return { active: 'home', fn: () => pageHome() };
}
function route() {
  document.body.classList.remove('nav-open');
  const r = currentRoute(); renderSidebar(r.active); r.fn();
  if (!/^#\/s\/[^/]+\/.+/.test(location.hash)) window.scrollTo(0, 0);
}
window.addEventListener('hashchange', route);

/* ---------- 主題與選單 ---------- */
const root = document.documentElement;
if (st.theme) root.dataset.theme = st.theme;
document.getElementById('themeBtn').onclick = () => {
  const dark = (root.dataset.theme || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')) === 'dark';
  st.theme = dark ? 'light' : 'dark'; root.dataset.theme = st.theme; save();
};
document.getElementById('menuBtn').onclick = () => document.body.classList.toggle('nav-open');
document.getElementById('scrim').onclick = () => document.body.classList.remove('nav-open');

route();
})();
