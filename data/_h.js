// 題型輔助函式：mc 單選、tf 是非、multi 多選、order 排序（作者端依正確順序撰寫，畫面會自動打亂）
window.SESSIONS = window.SESSIONS || [];
window.Q = {
  mc: (q, opts, a, ex) => ({ t: 'mc', q, opts, a, ex }),
  tf: (q, a, ex) => ({ t: 'tf', q, a, ex }),
  multi: (q, opts, a, ex) => ({ t: 'multi', q, opts, a, ex }),
  order: (q, items, ex) => ({ t: 'order', q, items, ex }),
};
