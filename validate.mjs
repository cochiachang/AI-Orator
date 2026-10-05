import fs from 'fs'; import vm from 'vm';
const ctx = { window: {} }; ctx.window = ctx; vm.createContext(ctx);
for (const f of ['helpers',...Array.from({length:12},(_,i)=>'s'+String(i+1).padStart(2,'0'))]) vm.runInContext(fs.readFileSync('data/'+f+'.js','utf8'), ctx, {filename:f});
let errs=0, nq=0, nc=0; const err=m=>{console.log('ERR',m);errs++};
for (const s of ctx.SESSIONS){
  for (const c of s.concepts){ nc++; if(!c.points.length) err(s.id+c.id+' no points');
    c.quiz.forEach((q,i)=>{ nq++; const w=`${s.id}.${c.id}.${i}`;
      if(q.t==='mc'){ if(!Array.isArray(q.opts)||q.opts.length<2) err(w+' opts'); if(!(Number.isInteger(q.a)&&q.a>=0&&q.a<q.opts.length)) err(w+' a'); }
      else if(q.t==='multi'){ if(!Array.isArray(q.a)||!q.a.length||q.a.some(x=>x<0||x>=q.opts.length)) err(w+' multi'); }
      else if(q.t==='tf'){ if(typeof q.a!=='boolean') err(w+' tf'); }
      else if(q.t==='order'){ if(!Array.isArray(q.items)||q.items.length<2) err(w+' order'); }
      else err(w+' type'); if(!q.ex) err(w+' no ex'); });
  }
}
console.log('sessions',ctx.SESSIONS.length,'concepts',nc,'questions',nq,'errors',errs);
// answer position distribution for mc
const pos=[0,0,0,0]; ctx.SESSIONS.forEach(s=>s.concepts.forEach(c=>c.quiz.forEach(q=>{if(q.t==='mc')pos[q.a]++;}))); console.log('mc correct idx dist',pos);
