/* Barista job prep — app logic (vanilla JS, no build) */
(function(){
"use strict";

/* ================= utils ================= */
const $ = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const shuffle = a => { a = a.slice(); for (let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];} return a; };
const pick = a => a[Math.floor(Math.random()*a.length)];
const rnd = (a,b) => a + Math.floor(Math.random()*(b-a+1));
const hash = s => { let h=5381; for (let i=0;i<s.length;i++) h=((h<<5)+h+s.charCodeAt(i))|0; return "h"+(h>>>0).toString(36); };
const app = () => $("#app");
function twice(btn, msg){ if (btn.dataset.armed){ return true; } btn.dataset.armed="1"; const o=btn.textContent; btn.textContent=msg; setTimeout(()=>{ if(btn.isConnected){ delete btn.dataset.armed; btn.textContent=o; } },3000); return false; }
function toast(msg){ const t=$("#toast"); t.textContent=msg; t.classList.add("on"); clearTimeout(toast._t); toast._t=setTimeout(()=>t.classList.remove("on"),1600); }
const ICON_PLAY = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z"/></svg>';
const ICON_SLOW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M4 15c0-4 3.5-7 8-7s8 3 8 7"/><path d="M3 15h18"/><circle cx="8" cy="18" r="1.5" fill="currentColor"/></svg>';

/* ================= storage ================= */
const KEY = "barista-prep-v1";
let S = { stats:{}, star:{}, check:{}, settings:{rate:0.95, voice:"", showKo:false} };
try { const raw = localStorage.getItem(KEY); if (raw) S = Object.assign(S, JSON.parse(raw)); } catch(e){}
S.settings = Object.assign({rate:0.95, voice:"", showKo:false}, S.settings||{});
function save(){ try { localStorage.setItem(KEY, JSON.stringify(S)); } catch(e){} }
function record(id, ok){ const s = S.stats[id] || {ok:0, ng:0}; ok ? s.ok++ : s.ng++; s.last = ok?1:0; s.t = Date.now(); S.stats[id]=s; save(); }
const isWrong = id => S.stats[id] && S.stats[id].last === 0;
const isDone = id => S.stats[id] && S.stats[id].last === 1;

/* ================= speech ================= */
const TTS = {
  voices: [],
  ok: "speechSynthesis" in window,
  load(){ if(!this.ok) return; this.voices = speechSynthesis.getVoices().filter(v => /^en/i.test(v.lang)); },
  voice(){
    if (!this.voices.length) this.load();
    const v = this.voices;
    if (S.settings.voice){ const f = v.find(x => x.name === S.settings.voice); if (f) return f; }
    return v.find(x => /en[-_]AU/i.test(x.lang) && /karen|lee|catherine|natural|google/i.test(x.name))
        || v.find(x => /en[-_]AU/i.test(x.lang))
        || v.find(x => /en[-_]GB/i.test(x.lang))
        || v.find(x => /en[-_]US/i.test(x.lang)) || v[0];
  },
  speak(text, opt={}){
    return new Promise(res => {
      if (!this.ok){ toast("이 브라우저는 음성 재생을 지원하지 않아요"); return res(); }
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      const v = this.voice(); if (v){ u.voice = v; u.lang = v.lang; } else u.lang = "en-AU";
      u.rate = (opt.rate || S.settings.rate) * (opt.slow ? 0.72 : 1);
      u.pitch = opt.pitch || 1;
      const btn = opt.btn; if (btn) btn.classList.add("speaking");
      let done = false; const fin = () => { if (done) return; done = true; if (btn) btn.classList.remove("speaking"); res(); };
      u.onend = fin; u.onerror = fin;
      setTimeout(fin, 1500 + text.length * 140);
      speechSynthesis.speak(u);
    });
  },
  stop(){ if (this.ok) speechSynthesis.cancel(); }
};
if (TTS.ok){ TTS.load(); speechSynthesis.onvoiceschanged = () => TTS.load(); }
// say-text: 화면 표기와 다르게 읽어야 하는 경우
function sayable(en){ return en.replace(/\$(\d+)\.(\d\d)/g, (m,d,c)=> moneyWords(+d, +c)).replace(/\bTFN\b/g,"T F N"); }
function playBtn(text, cls=""){ return `<button class="play ${cls}" data-say="${esc(text)}" aria-label="재생">${ICON_PLAY}</button>`; }
document.addEventListener("click", e => {
  const b = e.target.closest("[data-say]"); if (!b) return;
  e.preventDefault(); TTS.speak(sayable(b.dataset.say), {btn:b, slow: b.hasAttribute("data-slow")});
});

/* ================= text compare (WFD style) ================= */
const NUM = {zero:0,one:1,two:2,three:3,four:4,five:5,six:6,seven:7,eight:8,nine:9,ten:10,eleven:11,twelve:12,thirteen:13,fourteen:14,fifteen:15,sixteen:16,seventeen:17,eighteen:18,nineteen:19,twenty:20,thirty:30,forty:40,fifty:50,sixty:60,seventy:70,eighty:80,ninety:90,hundred:100};
const CONTR = {"i'm":"i am","you're":"you are","we're":"we are","they're":"they are","it's":"it is","that's":"that is","what's":"what is","there's":"there is","where's":"where is","i'll":"i will","you'll":"you will","we'll":"we will","it'll":"it will","that'll":"that will","they'll":"they will","i've":"i have","we've":"we have","you've":"you have","i'd":"i would","you'd":"you would","we'd":"we would","can't":"can not","cannot":"can not","don't":"do not","doesn't":"does not","didn't":"did not","isn't":"is not","aren't":"are not","wasn't":"was not","weren't":"were not","haven't":"have not","hasn't":"has not","won't":"will not","wouldn't":"would not","couldn't":"could not","shouldn't":"should not","let's":"let us","cuz":"because","'cause":"because","ok":"okay","yeah":"yes","yep":"yes"};
const SPELL = {flavor:"flavour",flavors:"flavours",apologize:"apologise",kilometers:"kilometres",kilometer:"kilometre",color:"colour",cafe:"café",cafes:"cafés",channelling:"channeling",takeaway:"takeaway",grey:"gray"};
function tokens(s){
  let t = String(s).toLowerCase().replace(/[’‘`]/g,"'").replace(/[“”]/g,'"')
    .replace(/take[\s-]+away/g,"takeaway").replace(/one[\s-]+on[\s-]+one/g,"one on one")
    .replace(/\$/g," ").replace(/(\d)\s*(kg|g)\b/g,"$1 $2").replace(/-/g," ")
    .replace(/[^a-z0-9'.\/:é\s]/g," ");
  let w = t.split(/\s+/).map(x => x.replace(/^[.'\/:]+|[.'\/:]+$/g,"")).filter(Boolean);
  const out = [];
  w.forEach(x => {
    if (CONTR[x]) { out.push(...CONTR[x].split(" ")); return; }
    if (/'s$/.test(x) && !CONTR[x]) x = x.replace(/'s$/,"");
    x = x.replace(/s'$/,"s");
    if (SPELL[x]) x = SPELL[x];
    if (x in NUM) x = String(NUM[x]);
    if (x === "an") x = "a";
    out.push(x);
  });
  return out;
}
function diffWords(expected, typed){
  const raw = expected.split(/\s+/).filter(Boolean);
  // map each normalized token back to display words
  const E = [], disp = [];
  raw.forEach(r => { const tk = tokens(r); if (!tk.length) return; tk.forEach((k,i) => { E.push(k); disp.push(i===0 ? r : ""); }); });
  const T = tokens(typed), tdisp = T.slice();
  const n=E.length, m=T.length, dp=Array.from({length:n+1},()=>new Array(m+1).fill(0));
  for (let i=n-1;i>=0;i--) for (let j=m-1;j>=0;j--) dp[i][j] = E[i]===T[j] ? dp[i+1][j+1]+1 : Math.max(dp[i+1][j], dp[i][j+1]);
  const parts=[]; let i=0,j=0,hit=0;
  while (i<n || j<m){
    if (i<n && j<m && E[i]===T[j]){ parts.push({k:"ok", w:disp[i]}); hit++; i++; j++; }
    else if (j<m && (i>=n || dp[i][j+1] >= dp[i+1][j])){ parts.push({k:"extra", w:tdisp[j]}); j++; }
    else { parts.push({k:"miss", w:disp[i]}); i++; }
  }
  const extras = parts.filter(p=>p.k==="extra").length;
  return { parts: parts.filter(p => p.w !== ""), hit, total:n, extras, perfect: hit===n && extras===0 };
}
function renderDiff(d){
  return `<div class="diff">${d.parts.map(p => `<span class="w ${p.k}">${esc(p.w)}</span>`).join(" ")}</div>
  <div class="legend"><span class="w ok">맞음</span> <span class="w miss">빠짐/틀림</span> <span class="w extra">더 쓴 단어</span> · 숫자는 3 / three 둘 다 정답</div>`;
}
const firstLetters = en => en.split(/\s+/).map(w => w.replace(/^([^A-Za-z0-9]*)([A-Za-z0-9]).*?([.,?!]*)$/, "$1$2$3")).join(" ");

/* ================= data → units ================= */
function splitSentences(en){ return en.match(/[^.?!]+[.?!]+["']?|[^.?!]+$/g).map(s=>s.trim()).filter(Boolean); }
const IV_UNITS = [];   // 한→영 / 답변 단위
const IV_Q = [];       // 질문 단위
INTERVIEW.forEach(sec => sec.items.forEach(it => {
  const qid = hash("q|"+it.q.en);
  IV_Q.push({id:qid, sec:sec.sec, en:it.q.en, ko:it.q.ko, item:it, kind:"q"});
  it.a.forEach((a,k) => IV_UNITS.push({id:hash("a|"+a.en+"|"+it.q.en), sec:sec.sec, en:a.en, ko:a.ko, tip:it.tip, q:it.q, kind:"a"}));
}));
const PH_UNITS = [];
PHRASES.forEach(sec => sec.items.forEach(p => PH_UNITS.push({id:hash("p|"+p.en), sec:sec.sec, en:p.en, ko:p.ko, tip:p.tip})));
const NAME_UNITS = NAMES.map(([en,ko]) => ({id:hash("n|"+en), en, ko}));

/* ================= router ================= */
const routes = {};
let cleanup = null;
function go(){
  TTS.stop(); if (cleanup){ try{cleanup();}catch(e){} cleanup=null; }
  const h = (location.hash||"#home").slice(1).split("/")[0] || "home";
  $$("#nav a").forEach(a => a.classList.toggle("on", a.getAttribute("href") === "#"+h));
  const on = $("#nav a.on"); if (on) on.scrollIntoView({inline:"center", block:"nearest"});
  (routes[h] || routes.home)();
  window.scrollTo(0,0);
}
window.addEventListener("hashchange", go);

/* ================= generic drill =================
   units: [{id,en,ko,tip,q?}], mode: dict | ko2en | qa
*/
function drill(units, mode, opts={}){
  if (!units.length){ toast("연습할 문장이 없어요"); return; }
  const title = opts.title || "";
  let idx = 0, checked = false, results = [];
  const back = opts.back || (() => go());
  const modeName = {dict:"🎧 듣고 받아쓰기", ko2en:"✍️ 한국어 보고 영어로", qa:"💬 질문 듣고 답하기"}[mode];
  function render(){
    const u = units[idx]; checked = false;
    const qa = mode==="qa" && u.q;
    app().innerHTML = `
      <div class="drill-top">
        <button class="btn ghost sm" id="dBack">← 그만</button>
        <div class="bar"><i style="width:${(idx/units.length)*100}%"></i></div>
        <span class="small muted">${idx+1}/${units.length}</span>
      </div>
      <div class="card">
        <div class="row small muted" style="margin-bottom:4px"><span class="tag">${esc(modeName)}</span><span>${esc(title)}</span>
          <span class="grow"></span><button class="btn ghost sm" id="dStar">${S.star[u.id]?"★":"☆"}</button></div>
        <div class="prompt">
          ${qa ? `<div class="ctx">면접관 질문 — 듣고 영어로 답해보세요</div>
                  <div class="row" style="justify-content:center;gap:14px">${playBtn(u.q.en,"big")}<button class="play" data-say="${esc(u.q.en)}" data-slow aria-label="느리게">${ICON_SLOW}</button></div>
                  <div style="margin-top:10px"><button class="btn sm ghost" id="dShowQ">질문 텍스트 보기</button></div>
                  <div id="qText" hidden><div class="small" style="margin-top:4px"><b>${esc(u.q.en)}</b></div><div class="small muted">${esc(u.q.ko)}</div><div class="small muted" style="margin-top:6px">💡 모범답안 뜻: ${esc(u.ko)}</div></div>`
          : mode==="dict" ? `<div class="ctx">${u.q ? "Q. "+esc(u.q.ko) : "들리는 문장을 그대로 적어보세요"}</div>
                  <div class="row" style="justify-content:center;gap:14px">${playBtn(u.en,"big")}<button class="play" data-say="${esc(u.en)}" data-slow aria-label="느리게">${ICON_SLOW}</button></div>
                  <div class="small muted" id="koHint" style="margin-top:10px" ${S.settings.showKo?"":"hidden"}>${esc(u.ko||"")}</div>
                  ${u.ko?`<button class="btn sm ghost" id="dKo">${S.settings.showKo?"뜻 숨기기":"뜻 보기"}</button>`:""}`
          : `${u.q ? `<div class="ctx">Q. ${esc(u.q.en)} <button class="play" style="width:28px;height:28px;vertical-align:middle" data-say="${esc(u.q.en)}">${ICON_PLAY}</button></div>`:""}
             <div class="ko-big">${esc(u.ko)}</div>
             <div style="margin-top:8px"><button class="btn sm ghost" id="dHint">첫 글자 힌트</button></div>
             <div class="hint" id="hint" hidden>${esc(firstLetters(u.en))}</div>`}
        </div>
        <textarea id="dIn" rows="3" placeholder="영어로 입력…" autocapitalize="sentences" autocomplete="off" spellcheck="false"></textarea>
        <div class="row" style="margin-top:10px">
          <button class="btn ghost" id="dSkip">모르겠어요</button><span class="grow"></span>
          <button class="btn pri" id="dCheck">확인</button>
        </div>
        <div class="kbd">Enter = 확인 / 다음 · Shift+Enter = 줄바꿈</div>
        <div id="dRes"></div>
      </div>`;
    $("#dBack").onclick = () => finish(true);
    $("#dStar").onclick = e => { S.star[u.id] = !S.star[u.id]; if(!S.star[u.id]) delete S.star[u.id]; save(); e.target.textContent = S.star[u.id]?"★":"☆"; };
    const k = $("#dKo"); if (k) k.onclick = () => { const h=$("#koHint"); h.hidden=!h.hidden; k.textContent = h.hidden?"뜻 보기":"뜻 숨기기"; };
    const hb = $("#dHint"); if (hb) hb.onclick = () => { $("#hint").hidden = false; hb.remove(); };
    const sq = $("#dShowQ"); if (sq) sq.onclick = () => { $("#qText").hidden=false; sq.remove(); };
    $("#dCheck").onclick = () => checked ? next() : check(false);
    $("#dSkip").onclick = () => checked ? next() : check(true);
    const inp = $("#dIn");
    inp.addEventListener("keydown", e => { if (e.key==="Enter" && !e.shiftKey && !e.isComposing){ e.preventDefault(); checked ? next() : check(false); } });
    if (mode==="dict") setTimeout(()=>{ const b=$(".play.big"); if (b && opts.autoplay!==false && idx>0) b.click(); }, 250);
    if (mode==="qa" && idx>0) setTimeout(()=>{ const b=$(".play.big"); if (b) b.click(); }, 250);
    if (mode!=="dict" && mode!=="qa") inp.focus();
  }
  function check(skip){
    const u = units[idx]; checked = true;
    const typed = skip ? "" : $("#dIn").value;
    const d = diffWords(u.en, typed);
    const pct = d.total ? Math.round(d.hit/d.total*100) : 0;
    const ok = d.perfect;
    record(u.id, ok); results.push({u, ok, pct});
    $("#dRes").innerHTML = `<div class="result">
      <div class="row"><span class="score ${ok?"ok":pct>=70?"mid":"ng"}">${ok?"완벽해요!":pct+"%"}</span><span class="muted small">${d.hit}/${d.total} 단어${d.extras?` · 더 쓴 단어 ${d.extras}`:""}</span></div>
      ${typed ? renderDiff(d) : ""}
      <div class="row" style="margin-top:8px;align-items:flex-start">${playBtn(u.en)}<div class="grow"><div style="font-weight:700">${esc(u.en)}</div><div class="small muted">${esc(u.ko||"")}</div>${u.tip?`<div class="small" style="color:var(--accent)">💡 ${esc(u.tip)}</div>`:""}</div></div>
    </div>`;
    $("#dCheck").textContent = idx+1 < units.length ? "다음 →" : "결과 보기";
    $("#dSkip").textContent = "다음";
    $("#dCheck").focus({preventScroll:true});
    if (mode!=="dict") TTS.speak(sayable(u.en));
  }
  function next(){ if (idx+1 < units.length){ idx++; render(); } else finish(false); }
  function finish(early){
    TTS.stop();
    if (!results.length){ back(); return; }
    const okN = results.filter(r=>r.ok).length;
    const wrong = results.filter(r=>!r.ok).map(r=>r.u);
    app().innerHTML = `<h2>${early?"중간 결과":"끝! 수고했어요"}</h2>
      <div class="card"><div class="big-num">${okN} / ${results.length}</div><div class="muted small">완벽하게 맞힌 문장</div>
      <div class="row" style="margin-top:12px">
        ${wrong.length?`<button class="btn pri" id="fRetry">틀린 ${wrong.length}개 다시</button>`:""}
        <button class="btn" id="fAgain">처음부터 다시</button><button class="btn ghost" id="fBack">목록으로</button></div></div>
      ${wrong.length?`<h3>다시 볼 문장</h3><div class="card">${wrong.map(u=>`<div class="li">${playBtn(u.en)}<div><div class="en">${esc(u.en)}</div><div class="ko">${esc(u.ko||"")}</div></div></div>`).join("")}</div>`:""}`;
    const r = $("#fRetry"); if (r) r.onclick = () => drill(wrong, mode, opts);
    $("#fAgain").onclick = () => drill(units, mode, opts);
    $("#fBack").onclick = back;
  }
  render();
}

/* ======== shared: filter + mode picker for sentence sets ======== */
function setPage({key, title, lead, secs, units, modes, listRender, extraTop=""}){
  const st = setPage[key] || (setPage[key] = {sec:"전체", mode:modes[0][0], filter:"all", shuffle:true});
  function pool(){
    let u = units.filter(x => st.sec==="전체" || x.sec===st.sec);
    if (st.filter==="wrong") u = u.filter(x => isWrong(x.id));
    if (st.filter==="new") u = u.filter(x => !S.stats[x.id]);
    if (st.filter==="star") u = u.filter(x => S.star[x.id]);
    return u;
  }
  function render(){
    const all = units.filter(x => st.sec==="전체" || x.sec===st.sec);
    const done = all.filter(x=>isDone(x.id)).length, wrong = all.filter(x=>isWrong(x.id)).length;
    const p = pool();
    app().innerHTML = `<h2>${title}</h2><p class="lead">${lead}</p>${extraTop}
      <div class="chips">${["전체",...secs].map(s=>`<button class="chip ${st.sec===s?"on":""}" data-sec="${esc(s)}">${esc(s)}</button>`).join("")}</div>
      <div class="card">
        <div class="seg">${modes.map(([m,l])=>`<button class="${st.mode===m?"on":""}" data-mode="${m}">${l}</button>`).join("")}</div>
        <div class="row small" style="margin-bottom:10px">
          <select id="fSel" class="btn sm" style="padding:6px 8px">
            <option value="all">전체 ${all.length}</option><option value="new">안 해본 것 ${all.filter(x=>!S.stats[x.id]).length}</option>
            <option value="wrong">틀린 것 ${wrong}</option><option value="star">★ 표시 ${all.filter(x=>S.star[x.id]).length}</option></select>
          <label class="row" style="gap:4px"><input type="checkbox" id="fShuf" ${st.shuffle?"checked":""}> 섞기</label>
          <span class="grow"></span><span class="muted">맞힘 ${done} · 틀림 ${wrong}</span>
        </div>
        <button class="btn pri" style="width:100%" id="go" ${p.length?"":"disabled"}>${p.length}문장 연습 시작</button>
      </div>
      <h3>전체 보기 <span class="small muted">— 눌러서 듣기</span></h3>
      <div id="list"></div>`;
    $("#fSel").value = st.filter;
    $$("[data-sec]").forEach(b => b.onclick = () => { st.sec = b.dataset.sec; render(); });
    $$("[data-mode]").forEach(b => b.onclick = () => { st.mode = b.dataset.mode; render(); });
    $("#fSel").onchange = e => { st.filter = e.target.value; render(); };
    $("#fShuf").onchange = e => { st.shuffle = e.target.checked; };
    $("#go").onclick = () => { let u = pool(); if (st.shuffle) u = shuffle(u); drill(u, st.mode, {title: st.sec, back: render}); };
    $("#list").innerHTML = listRender(st.sec, (u) => drill([u], st.mode, {title:st.sec, back: render}));
    $$("[data-one]").forEach(b => b.onclick = () => { const u = units.find(x=>x.id===b.dataset.one); drill([u], st.mode, {title:st.sec, back: render}); });
  }
  render();
}
const markOf = id => isDone(id) ? '<span class="tag ok">✓</span>' : isWrong(id) ? '<span class="tag ng">✗</span>' : "";

/* ================= pages ================= */
routes.interview = () => setPage({
  key:"iv", title:"면접 필수 영어", lead:"한국어를 보고 영어로 답하면서, 유창해질 때까지 연습 또 연습!",
  secs: INTERVIEW.map(s=>s.sec), units: IV_UNITS,
  modes:[["ko2en","✍️ 한→영"],["qa","💬 질문 듣고 답"],["dict","🎧 받아쓰기"]],
  listRender: (sec) => INTERVIEW.filter(s=>sec==="전체"||s.sec===sec).map(s => `<h3>${esc(s.sec)}</h3><div class="card">${
    s.items.map(it => `<div class="li" style="display:block">
      <div class="row qa-q">${playBtn(it.q.en)}<div class="grow"><div>Q. ${esc(it.q.en)}</div><div class="ko" style="font-weight:400">${esc(it.q.ko)}</div></div></div>
      ${it.a.map(a => { const u = IV_UNITS.find(x=>x.en===a.en && x.q===it.q); return `<div class="qa-a row" style="align-items:flex-start">${playBtn(a.en)}<div class="grow"><div class="en">${esc(a.en)} ${markOf(u.id)}</div><div class="ko">${esc(a.ko)}</div></div><button class="btn sm ghost" data-one="${u.id}">연습</button></div>`; }).join("")}
      ${it.tip?`<div class="tip">💡 ${esc(it.tip)}</div>`:""}
    </div>`).join("")}</div>`).join("")
});

routes.phrases = () => setPage({
  key:"ph", title:"매장 영어", lead:"첫날 많이 쓰는 말 · 서비스 플로우 · 결제 · 직원끼리 쓰는 말",
  secs: PHRASES.map(s=>s.sec), units: PH_UNITS,
  modes:[["dict","🎧 받아쓰기"],["ko2en","✍️ 한→영"]],
  extraTop: `<a class="card row" href="#dialog" style="text-decoration:none;color:inherit"><span style="font-size:22px">💬</span><div class="grow"><b>대화 롤플레이</b><div class="small muted">주문 받기 · 계산하기 대화를 손님과 주고받기</div></div><span class="muted">→</span></a>`,
  listRender: (sec) => PHRASES.filter(s=>sec==="전체"||s.sec===sec).map(s => `<h3>${esc(s.sec)}</h3><div class="card">${
    s.items.map(p => { const id = hash("p|"+p.en); return `<div class="li">${playBtn(p.en)}<div class="grow"><div class="en">${esc(p.en)} ${markOf(id)}</div><div class="ko">${esc(p.ko)}</div>${p.tip?`<div class="tip">💡 ${esc(p.tip)}</div>`:""}</div><button class="btn sm ghost" data-one="${id}">연습</button></div>`; }).join("")}</div>`).join("")
});

/* ---------- dialogue ---------- */
routes.dialog = () => {
  const st = routes.dialog.st || (routes.dialog.st = {d:0});
  let stop = false; cleanup = () => { stop = true; TTS.stop(); };
  function menu(){
    const D = DIALOGUES[st.d];
    app().innerHTML = `<h2>대화 롤플레이</h2><p class="lead">하루에 수십 번 쓰게 될 대화패턴. 손님 말은 자동으로 들려주고, 내 차례엔 직접 써요.</p>
      <div class="seg">${DIALOGUES.map((d,i)=>`<button class="${st.d===i?"on":""}" data-d="${i}">${esc(d.title)}</button>`).join("")}</div>
      <div class="card">
        <div class="row"><button class="btn pri grow" id="rB">☕ 내가 바리스타</button><button class="btn grow" id="rC">🙋 내가 손님</button></div>
        <div class="row" style="margin-top:8px"><button class="btn grow" id="listen">▶ 전체 듣기</button><label class="row small" style="gap:4px"><input type="checkbox" id="showKo" ${S.settings.showKo?"checked":""}> 한국어 같이 보기</label></div>
      </div>
      <div class="card bubbles">${D.lines.map((l,i)=>bubble(l,i,true)).join("")}</div>
      <div class="small muted">파란 말풍선 = 바리스타, 초록 = 손님</div>`;
    $$("[data-d]").forEach(b => b.onclick = () => { st.d = +b.dataset.d; menu(); });
    $("#showKo").onchange = e => { S.settings.showKo = e.target.checked; save(); menu(); };
    $("#rB").onclick = () => role("B"); $("#rC").onclick = () => role("C");
    $("#listen").onclick = async () => {
      stop = false;
      for (let i=0;i<D.lines.length && !stop;i++){
        $$(".bub").forEach(b=>b.classList.remove("now")); const el = $(`.bub[data-i="${i}"]`); if (!el) break; el.classList.add("now"); el.scrollIntoView({block:"center",behavior:"smooth"});
        await TTS.speak(sayable(D.lines[i].en), {pitch: D.lines[i].who==="C"?1.15:0.95}); await wait(350);
      }
      $$(".bub").forEach(b=>b.classList.remove("now"));
    };
  }
  function bubble(l,i,show){
    const ko = S.settings.showKo ? `<span class="k">${esc(l.ko)}</span>` : "";
    return `<div class="bub ${l.who} ${show?"":"hidden-line"}" data-i="${i}" ${show?`data-say="${esc(l.en)}"`:""}><span class="who">${l.who==="B"?"BARISTA":"CUSTOMER"}</span>${show?esc(l.en):"내 차례 — 아래에 써보세요"}${show?ko:""}</div>`;
  }
  async function role(me){
    const D = DIALOGUES[st.d]; stop = false;
    let shown = []; let score = {ok:0, n:0};
    app().innerHTML = `<div class="drill-top"><button class="btn ghost sm" id="rBack">← 그만</button><b class="grow">${esc(D.title)} · ${me==="B"?"나는 바리스타":"나는 손님"}</b></div>
      <div class="card bubbles" id="bb"></div><div id="turn"></div>`;
    $("#rBack").onclick = () => { stop = true; TTS.stop(); menu(); };
    const bb = $("#bb");
    for (let i=0;i<D.lines.length && !stop;i++){
      const l = D.lines[i];
      if (l.who !== me){
        bb.insertAdjacentHTML("beforeend", bubble(l,i,true));
        bb.lastElementChild.scrollIntoView({block:"end",behavior:"smooth"});
        await TTS.speak(sayable(l.en), {pitch: l.who==="C"?1.15:0.95}); await wait(250);
      } else {
        bb.insertAdjacentHTML("beforeend", bubble(l,i,false));
        const res = await myTurn(l);
        if (stop) return;
        score.n++; if (res) score.ok++;
        const el = bb.lastElementChild; el.outerHTML = bubble(l,i,true);
      }
    }
    if (stop) return;
    $("#turn").innerHTML = `<div class="card"><div class="big-num">${score.ok} / ${score.n}</div><div class="muted small">내 대사를 완벽하게 말한 횟수</div>
      <div class="row" style="margin-top:10px"><button class="btn pri" id="again">다시 하기</button><button class="btn" id="swap">역할 바꾸기</button><button class="btn ghost" id="mn">처음으로</button></div></div>`;
    $("#again").onclick = () => role(me); $("#swap").onclick = () => role(me==="B"?"C":"B"); $("#mn").onclick = menu;
  }
  function myTurn(l){
    return new Promise(res => {
      const t = $("#turn");
      t.innerHTML = `<div class="card"><div class="small muted">뜻: ${esc(l.ko)} <button class="btn sm ghost" id="h">첫 글자 힌트</button></div><div class="hint" id="hh" hidden>${esc(firstLetters(l.en))}</div>
        <textarea id="ti" rows="2" placeholder="내 대사를 영어로…" autocomplete="off" spellcheck="false" style="margin-top:6px"></textarea>
        <div class="row" style="margin-top:8px"><button class="btn ghost" id="tskip">모르겠어요</button><span class="grow"></span><button class="btn pri" id="tok">말하기</button></div><div id="tr"></div></div>`;
      $("#h").onclick = () => { $("#hh").hidden=false; };
      const ti = $("#ti"); ti.focus();
      let done = false;
      const submit = (skip) => {
        if (done){ t.innerHTML=""; res(t._ok); return; }
        done = true;
        const d = diffWords(l.en, skip ? "" : ti.value); t._ok = d.perfect;
        record(hash("dlg|"+l.en), d.perfect);
        $("#tr").innerHTML = `<div class="result">${skip?"":renderDiff(d)}<div style="font-weight:700;margin-top:4px">${esc(l.en)}</div></div>`;
        $("#tok").textContent = "계속 →"; $("#tskip").remove();
        TTS.speak(sayable(l.en), {pitch: l.who==="C"?1.15:0.95});
      };
      $("#tok").onclick = () => submit(false);
      $("#tskip").onclick = () => submit(true);
      ti.addEventListener("keydown", e => { if (e.key==="Enter" && !e.shiftKey && !e.isComposing){ e.preventDefault(); submit(false); } });
    });
  }
  menu();
};
const wait = ms => new Promise(r=>setTimeout(r,ms));

/* ---------- names ---------- */
routes.names = () => {
  const st = routes.names.st || (routes.names.st = {mode:"listen", ctx:true});
  function menu(){
    const done = NAME_UNITS.filter(u=>isDone(u.id)).length, wrong = NAME_UNITS.filter(u=>isWrong(u.id)).length;
    app().innerHTML = `<h2>손님 이름</h2><p class="lead">"Can I get your name?" 하고 들은 이름을 컵에 바로 적을 수 있게.</p>
      <div class="card">
        <div class="seg"><button data-m="listen" class="${st.mode==="listen"?"on":""}">🎧 듣고 스펠링</button><button data-m="ko" class="${st.mode==="ko"?"on":""}">🔤 한글 발음 보고 스펠링</button></div>
        <label class="row small" style="gap:6px;margin-bottom:10px"><input type="checkbox" id="ctx" ${st.ctx?"checked":""}> 실전처럼 문장으로 듣기 ("It's Lochlan.")</label>
        <div class="row"><button class="btn pri grow" id="all">전체 ${NAME_UNITS.length}개</button><button class="btn grow" id="wr" ${wrong?"":"disabled"}>틀린 ${wrong}개</button></div>
        <div class="small muted" style="margin-top:8px">맞힘 ${done} · 틀림 ${wrong}</div>
      </div>
      <h3>이름표 <span class="small muted">— 눌러서 듣기</span></h3>
      <div class="card" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:0 12px">${NAME_UNITS.map(u=>`<div class="li" style="align-items:center">${playBtn(u.en)}<div><div class="en">${esc(u.en)} ${markOf(u.id)}</div><div class="ko">${esc(u.ko)}</div></div></div>`).join("")}</div>
      <p class="small muted">한글 발음 일부(Matthew, Stephen, Farida, Stan)는 실제 발음에 가깝게 고쳤어요.</p>`;
    $$("[data-m]").forEach(b=>b.onclick=()=>{st.mode=b.dataset.m; menu();});
    $("#ctx").onchange = e => st.ctx = e.target.checked;
    $("#all").onclick = () => run(shuffle(NAME_UNITS));
    $("#wr").onclick = () => run(shuffle(NAME_UNITS.filter(u=>isWrong(u.id))));
  }
  function run(list){
    let i = 0, ok = 0, wrongs = [];
    const say = u => st.ctx ? pick([`It's ${u.en}.`, `${u.en}.`, `It's ${u.en}, thanks.`]) : u.en;
    function one(){
      const u = list[i]; let checked=false;
      app().innerHTML = `<div class="drill-top"><button class="btn ghost sm" id="bk">← 그만</button><div class="bar"><i style="width:${i/list.length*100}%"></i></div><span class="small muted">${i+1}/${list.length}</span></div>
        <div class="card"><div class="prompt">
          ${st.mode==="listen" ? `<div class="ctx">B: Can I get your name?</div><div class="row" style="justify-content:center;gap:14px">${playBtn(say(u),"big")}<button class="play" data-say="${esc(u.en)}" data-slow>${ICON_SLOW}</button></div>`
            : `<div class="ctx">이 발음의 이름을 영어로</div><div class="ko-big" style="font-size:30px">${esc(u.ko)}</div>`}
        </div>
        <input type="text" id="ni" placeholder="이름 스펠링" autocomplete="off" autocapitalize="words" spellcheck="false">
        <div class="row" style="margin-top:10px"><button class="btn ghost" id="ns">모르겠어요</button><span class="grow"></span><button class="btn pri" id="nc">확인</button></div><div id="nr"></div></div>`;
      $("#bk").onclick = menu;
      const ni = $("#ni");
      const check = (skip) => {
        if (checked){ i++; i<list.length ? one() : end(); return; }
        checked = true;
        const v = skip ? "" : ni.value.trim();
        const good = v.toLowerCase() === u.en.toLowerCase();
        record(u.id, good); if (good) ok++; else wrongs.push(u);
        $("#nr").innerHTML = `<div class="result row">${playBtn(u.en)}<div><div class="score ${good?"ok":"ng"}" style="font-size:22px">${good?"정답!":"아쉬워요"}</div><div style="font-size:22px;font-weight:800;letter-spacing:.5px">${esc(u.en)}</div><div class="muted small">${esc(u.ko)}${v&&!good?` · 내가 쓴 것: ${esc(v)}`:""}</div></div></div>`;
        $("#nc").textContent = "다음 →"; $("#ns").remove();
        if (st.mode==="ko") TTS.speak(u.en);
      };
      $("#nc").onclick = () => check(false); $("#ns").onclick = () => check(true);
      ni.addEventListener("keydown", e => { if (e.key==="Enter" && !e.isComposing){ e.preventDefault(); check(false); } });
      if (st.mode==="listen"){ if (i>0) setTimeout(()=>$(".play.big")?.click(),250); } else ni.focus();
    }
    function end(){
      app().innerHTML = `<h2>끝!</h2><div class="card"><div class="big-num">${ok} / ${list.length}</div>
        <div class="row" style="margin-top:10px">${wrongs.length?`<button class="btn pri" id="rw">틀린 ${wrongs.length}개 다시</button>`:""}<button class="btn" id="mn">처음으로</button></div></div>
        ${wrongs.length?`<div class="card">${wrongs.map(u=>`<div class="li">${playBtn(u.en)}<div><div class="en">${esc(u.en)}</div><div class="ko">${esc(u.ko)}</div></div></div>`).join("")}</div>`:""}`;
      const r=$("#rw"); if(r) r.onclick=()=>run(shuffle(wrongs)); $("#mn").onclick=menu;
    }
    one();
  }
  menu();
};

/* ---------- cup marking ---------- */
const OPT_BY = {}; CUP_OPTIONS.forEach(o => { if (o.code) OPT_BY[o.code]=o; });
const CANON = {}; // any token → canonical code
CUP_MENU.forEach(m => { CANON[m.code.toUpperCase()]=m.code; (m.alt||[]).forEach(a=>CANON[a.toUpperCase()]=m.code); });
CUP_OPTIONS.forEach(o => { if(!o.code) return; CANON[o.code.toUpperCase()]=o.code; (o.alt||[]).forEach(a=>CANON[a.toUpperCase()]=o.code); });
CANON.SMAC="SM"; CANON.LMAC="LM"; CANON.Q34F="3/4F"; CANON.Q34WK="3/4WK";
// 설탕 n스푼(nS)·샷 n개 추가(Xn) 같은 숫자 옵션
function mkOpt(code){
  if (OPT_BY[code]) return OPT_BY[code];
  let m;
  if ((m = code.match(/^(\d+(?:\.5)?)S$/))){ const n=m[1]; return {code, ko:`설탕 ${n}스푼`, group:"sweet", say:`with ${n==="1.5"?"one and a half":nw(+n)} sugars`, dk:`${n} Sugars`}; }
  if ((m = code.match(/^X(\d)$/))){ const n=+m[1]; return {code, ko:`${n}샷 추가`, group:"shot", say:`with ${nw(n)} extra shots`, dk:`${n} Extra Shots`}; }
  return {code, ko:code, group:"?"};
}
function canonTok(t){
  t = t.toUpperCase(); let m;
  if (CANON[t]) return CANON[t];
  if ((m = t.match(/^(\d+(?:\.5)?)S$/))) return m[1]==="1" ? "1S" : m[1]+"S";
  if ((m = t.match(/^X(\d)$/))) return m[1]==="1" ? "X1" : "X"+m[1];
  if (/^!+$/.test(t) || /^X+H$/.test(t)) return "XH";
  return null;
}
function markTokens(input){
  const s = String(input).toUpperCase()
    .replace(/(X|EXTRA)\s*FROTH(Y)?/g,"XFROTH").replace(/VERY\s*FLAT/g,"VFLAT")
    .replace(/3\/4\s*F(ULL)?\b/g," Q34F ").replace(/3\/4\s*(WK|STRENGTH)?/g," Q34WK ")
    .replace(/\bCHAI\s*D\b/g,"CH DIRTY").replace(/\bS\s*\/\s*MAC\b/g,"SMAC").replace(/\bL\s*\/\s*MAC\b/g,"LMAC");
  return s.split(/[\s\/,]+/).filter(Boolean);
}
function cupSVG(text, w=118){
  const lines = text.split("\n");
  const fs = lines.length > 3 ? 19 : 22;
  const startY = 112 - (lines.length-1)*fs*0.55;
  return `<svg class="cup" style="width:${w}px" viewBox="0 0 120 190" aria-label="${esc(text.replace(/\n/g," "))}">
    <defs><linearGradient id="cg" x1="0" x2="1"><stop offset="0" stop-color="#e9e5df"/><stop offset=".45" stop-color="#fff"/><stop offset="1" stop-color="#dcd6ce"/></linearGradient></defs>
    <path d="M18 34 L102 34 L92 182 Q60 188 28 182 Z" fill="url(#cg)" stroke="#cfc7bc"/>
    <rect x="12" y="20" width="96" height="16" rx="5" fill="#f4f1ec" stroke="#cfc7bc"/>
    <rect x="22" y="12" width="76" height="10" rx="4" fill="#f9f7f3" stroke="#d8d1c7"/>
    ${lines.map((l,i)=>`<text x="60" y="${startY+i*fs*1.1}" text-anchor="middle" font-family="${"Marker Felt, Chalkboard SE, Comic Sans MS, cursive"}" font-size="${fs}" font-weight="700" fill="#2a221d">${esc(l)}</text>`).join("")}
  </svg>`;
}
function genOrder(opts={}){
  let menu = CUP_MENU.filter(x=>x.kind!=="kid");
  if (opts.basic) menu = menu.filter(x=>!["BB","CB","IM","GTS","LGG"].includes(x.code));
  const m = pick(menu);
  const o = {drink:m, milk:null, opts:[]};
  const milkable = ["milk","choc","iced"].includes(m.kind);
  const coffee = m.kind==="milk" || m.kind==="black";
  const add = c => { if (!o.opts.find(x=>x.group===mkOpt(c).group)) o.opts.push(mkOpt(c)); };
  if (milkable && Math.random()<0.6) o.milk = pick(CUP_OPTIONS.filter(x=>x.group==="milk" && x.code));
  if (coffee && Math.random()<0.35) add(pick(["X1","X1","X2","ST","WK","3/4WK"]));
  if (coffee && Math.random()<0.12) add("DC");
  if (m.code==="Ch" && Math.random()<0.3) add("DIRTY");
  if (!["black","iced","brew"].includes(m.kind) && Math.random()<0.35) add(pick(["XH","XH","HOT","WARM"]));
  if (Math.random()<0.4) add(pick(["1S","2S","3S","1.5S","+HON","="]));
  if (["milk","iced"].includes(m.kind) && Math.random()<0.18) add(pick(["CAR","V"]));
  if ((m.kind==="tea" || m.code==="LB" || m.kind==="brew") && Math.random()<0.45) add("DOM");
  if (["C"].includes(m.code) && Math.random()<0.2) add("XFROTH");
  if (["FW","L"].includes(m.code) && Math.random()<0.12) add(pick(["VFLAT","3/4F"]));
  if (!o.milk && !o.opts.length && Math.random()<0.6) return genOrder(opts);
  return o;
}
const markCode = c => ({XFROTH:"X froth", VFLAT:"very flat"}[c] || c);
function orderMark(o){ return [o.drink.code + (o.milk?"/"+o.milk.code:""), ...o.opts.map(x=>markCode(x.code))].join("\n"); }
function orderKo(o){ return [o.drink.ko, o.milk?o.milk.ko:null, ...o.opts.map(x=>x.ko)].filter(Boolean).join(" · "); }
function orderEn(o){
  const pre = o.opts.filter(x=>x.pre).map(x=>x.say);
  const post = o.opts.filter(x=>!x.pre);
  let name = (/English|Earl|Sencha/.test(o.drink.name) ? o.drink.name : o.drink.name.toLowerCase()) + (o.drink.kind==="tea" ? " tea" : "");
  const words = [...pre, o.milk?o.milk.say:null, name].filter(Boolean).join(" ");
  const art = /^[aeiou]/i.test(words) ? "an" : "a";
  const adj = post.filter(x=>["temp","foam","fill"].includes(x.group)).map(x=>x.say);
  const withs = post.filter(x=>!["temp","foam","fill"].includes(x.group)).map(x=>x.say);
  let s = `${pick(["Can I get","Could I get","Can I please get","I'll have"])} ${art} ${words}`; const polite = /please/.test(s);
  if (adj.length) s += ", " + adj.join(", ");
  if (withs.length) s += ", " + withs.join(" and ").replace(/ and with /g," and ");
  return s + (s.startsWith("I'll") ? ", thanks." : polite ? "?" : ", please?");
}
function checkMark(o, input){
  const toks = markTokens(input);
  if (!toks.length) return {ok:false, why:"아무것도 안 썼어요"};
  const drink = canonTok(toks[0]);
  const want = [o.drink.code, ...(o.milk?[o.milk.code]:[]), ...o.opts.map(x=>x.code)].sort();
  const got = toks.map(t => canonTok(t) || "?"+t);
  const ok = drink===o.drink.code && JSON.stringify(got.slice().sort())===JSON.stringify(want);
  let why = "";
  if (!ok){
    const unknown = got.filter(g=>g[0]==="?").map(g=>g.slice(1));
    const missing = want.filter(w=>!got.includes(w)), extra = got.filter(g=>g[0]!=="?" && !want.includes(g));
    if (drink!==o.drink.code) why += "메뉴 코드가 맨 앞에 와야 해요. ";
    if (missing.length) why += "빠진 것: " + missing.map(c=>`${markCode(c)}(${(CUP_MENU.find(m=>m.code===c)||mkOpt(c)).ko||""})`).join(", ")+". ";
    if (extra.length) why += "필요 없는 것: " + extra.map(markCode).join(", ")+". ";
    if (unknown.length) why += "모르는 코드: " + unknown.join(", ")+". ";
  }
  return {ok, why};
}
/* ---- 도켓 ---- */
const SMALL_ONLY = ["E","D","SM","P","MAG","LM","B"];
function genDocket(){
  const type = pick(["ta","ta","ta","dine","dine","delivery"]);
  const n = Math.random()<0.4 ? 2 : 1;
  const drinks = Array.from({length:n}, () => {
    const o = genOrder({basic:true});
    const sizable = !SMALL_ONLY.includes(o.drink.code);
    const size = sizable ? pick(CUP_SIZES) : null;
    let cup = type==="dine" ? "dine" : "ta";
    let taNote = false;
    if (type==="dine" && sizable && Math.random()<0.3){ cup = "ta"; taNote = true; }
    return {o, size, cup, taNote, sizable};
  });
  const food = Math.random()<0.45 ? pick(DOCKET_FOOD) : null;
  const d = new Date(Date.now() - rnd(0,600)*60000);
  return {type, drinks, food, name: pick(DOCKET_NAMES), table: Math.random()<0.5 ? "#"+rnd(1,24) : "T"+rnd(1,20),
    app: pick(["UBER EATS","DOORDASH","MENULOG"]), code: Math.random().toString(36).slice(2,7).toUpperCase(),
    time: d.toLocaleTimeString("en-AU",{hour:"2-digit",minute:"2-digit"}), date: d.toLocaleDateString("en-AU",{day:"numeric",month:"short",year:"numeric"})};
}
function docketHTML(k){
  const sizeTxt = s => pick([s.oz, s.name, s.oz]);
  const lines = k.drinks.map(dr => {
    const mods = [];
    if (dr.taNote) mods.push(`T/A ${dr.size.name}`);
    else if (dr.size && k.type!=="dine") mods.push(sizeTxt(dr.size));
    else if (dr.size && k.type==="dine" && Math.random()<0.5) mods.push(dr.size.name==="Small"?"Regular":dr.size.name);
    if (dr.o.milk) mods.push(dr.o.milk.dk);
    dr.o.opts.forEach(x => mods.push(x.dk || x.code));
    return `<div class="dk-item">1 × ${esc(dr.o.drink.name)}</div>${mods.map(m=>`<div class="dk-mod">${esc(m)}</div>`).join("")}`;
  }).join("") + (k.food ? `<div class="dk-item">1 × ${esc(k.food[0])}</div>${k.food[1]?`<div class="dk-mod">${esc(k.food[1])}</div>`:""}` : "");
  let head;
  if (k.type==="dine") head = `<div class="dk-big">${esc(k.table)}</div><div class="dk-sm">${esc(k.date)}  ${esc(k.time)}</div><div class="dk-rule">EAT IN</div>`;
  else if (k.type==="ta") head = `<div class="dk-big">${esc(k.name)}</div><div class="dk-sm">${esc(k.date)}  ${esc(k.time)}</div><div class="dk-rule">TAKE AWAY</div>`;
  else head = `<div class="dk-app">${esc(k.app)}</div><div class="dk-inv">${esc(k.code)}</div><div class="dk-rule">DELIVERY</div><div class="dk-sm">Customer</div><div class="dk-name">${esc(k.name)}</div>`;
  return `<div class="docket">${head}<div class="dk-body">${lines}</div><div class="dk-foot">BAR · Square Register</div></div>`;
}
routes.cup = () => {
  const st = routes.cup.st || (routes.cup.st = {tab:"docket"});
  const tabs = [["docket","🧾 도켓→컵"],["order","🎧 주문→마킹"],["read","👀 컵 읽기"],["code","🔤 코드 퀴즈"],["table","📋 코드표"],["real","☕ 실전 컵"]];
  function shell(inner){
    app().innerHTML = `<h2>컵 마킹</h2><p class="lead">코드 외우기 → 주문 듣고 바로 적기 → 컵 보고 읽기 순서로. <b>매장마다 코드가 다르니</b> 트라이얼 때 꼭 확인!</p>
      <div class="chips">${tabs.map(([k,l])=>`<button class="chip ${st.tab===k?"on":""}" data-t="${k}">${l}</button>`).join("")}</div><div id="cupBody"></div>`;
    $$("[data-t]").forEach(b=>b.onclick=()=>{st.tab=b.dataset.t; routes.cup();});
    $("#cupBody").innerHTML = inner;
  }
  if (st.tab==="docket"){
    let k, done=false, streak = st.dStreak||0;
    function nextQ(){
      k = genDocket(); done=false;
      shell(`<div class="card">
        <div class="small muted" style="margin-bottom:8px">도켓을 보고 ① 어떤 컵을 꺼낼지 ② 사이즈 ③ 테이크어웨이면 컵에 적을 마킹까지. 연속 ${streak}</div>
        <div class="dk-wrap">${docketHTML(k)}</div>
        ${k.drinks.map((dr,i)=>`<div class="dk-q" data-i="${i}">
          <b>${i+1}. ${esc(dr.o.drink.name)}</b>
          <div class="seg" style="margin:6px 0"><button data-cup="dine">☕ 매장컵(도자기)</button><button data-cup="ta">🥤 T/A 컵</button></div>
          ${dr.sizable?`<div class="seg sz" style="margin:0 0 6px" hidden>${CUP_SIZES.map(s=>`<button data-sz="${s.k}">${s.k} · ${s.oz}</button>`).join("")}</div>`:""}
          <input type="text" class="mk" placeholder="컵 마킹 (예: FW/O X1)" autocomplete="off" autocapitalize="characters" spellcheck="false" style="font-family:var(--hand);font-size:19px" hidden>
          <div class="dk-r"></div></div>`).join("")}
        <div class="row" style="margin-top:10px"><button class="btn ghost sm" id="dkTip">도켓 읽는 법</button><span class="grow"></span><button class="btn pri" id="dkOk">확인</button></div>
        <div id="dkTipBox" class="small" hidden style="margin-top:8px;background:var(--soft);padding:10px;border-radius:10px">
          • 맨 위가 <b>숫자(#9)·테이블(T5)</b> → 매장에서 마시는 손님 → 도자기컵<br>• 맨 위가 <b>사람 이름</b> → 테이크어웨이 → T/A 컵에 마킹<br>• <b>배달앱(Uber Eats 등)</b> → 무조건 테이크어웨이<br>• 다인인이어도 <b>T/A Medium</b>처럼 적혀 있으면 T/A 컵! 항상 더블체크<br>• 사이즈: Small 8oz(1샷) · Medium 12oz(2샷) · Large 16oz(3샷)<br>• 우유 종류가 없으면 풀크림 → 아무것도 안 씀</div>
      </div>`);
      $("#dkTip").onclick = () => { $("#dkTipBox").hidden = !$("#dkTipBox").hidden; };
      $$(".dk-q").forEach(q => {
        $$("[data-cup]", q).forEach(b => b.onclick = () => { if (done) return; q.dataset.cup = b.dataset.cup; $$("[data-cup]", q).forEach(x=>x.classList.toggle("on", x===b));
          const ta = b.dataset.cup==="ta"; const sz=$(".sz",q); if (sz) sz.hidden=!ta; $(".mk",q).hidden=!ta; if (ta) $(".mk",q).focus(); });
        $$("[data-sz]", q).forEach(b => b.onclick = () => { if (done) return; q.dataset.sz = b.dataset.sz; $$("[data-sz]", q).forEach(x=>x.classList.toggle("on", x===b)); });
        $(".mk",q).addEventListener("keydown", e => { if (e.key==="Enter" && !e.isComposing){ e.preventDefault(); $("#dkOk").click(); } });
      });
      $("#dkOk").onclick = () => {
        if (done) return nextQ();
        done = true; let allOk = true;
        k.drinks.forEach((dr,i) => {
          const q = $(`.dk-q[data-i="${i}"]`), msgs = [];
          const cupOk = q.dataset.cup === dr.cup;
          if (!cupOk) msgs.push(dr.cup==="ta" ? (dr.taNote ? "다인인이지만 T/A라고 적혀 있어요 → T/A 컵" : "이름/배달 도켓 → T/A 컵") : "번호·테이블 도켓 → 매장컵");
          let szOk = true, mkOk = true, why = "";
          if (dr.cup==="ta"){
            if (dr.sizable){ szOk = q.dataset.sz === dr.size.k; if (!szOk) msgs.push(`사이즈는 ${dr.size.ko}`); }
            const r = checkMark(dr.o, $(".mk",q).value); mkOk = r.ok; why = r.why;
          }
          const ok = cupOk && szOk && mkOk; if (!ok) allOk = false;
          record(hash("docket|"+orderMark(dr.o)+dr.cup), ok);
          $(".dk-r", q).innerHTML = `<div class="result row" style="align-items:center;gap:12px;margin-top:6px">${dr.cup==="ta"?cupSVG(orderMark(dr.o),84):'<div style="font-size:40px;width:84px;text-align:center">☕</div>'}
            <div class="grow"><div class="score ${ok?"ok":"ng"}" style="font-size:18px">${ok?"정답!":"이렇게 해요"}</div>
            <div class="small">${dr.cup==="ta"?`T/A 컵${dr.size?" · "+esc(dr.size.ko):""}`:"매장컵 (마킹 안 함)"} · ${esc(orderKo(dr.o))}</div>
            ${msgs.length?`<div class="small" style="color:var(--ng)">${esc(msgs.join(" / "))}</div>`:""}
            ${dr.cup==="ta" && !mkOk ? `<div class="small" style="color:var(--ng)">마킹: ${esc(why)}</div>`:""}</div></div>`;
        });
        streak = st.dStreak = allOk ? streak+1 : 0;
        $("#dkOk").textContent = "다음 도켓 →";
        if (k.food) $(".dk-wrap").insertAdjacentHTML("afterend", `<div class="small muted" style="margin:6px 0">🍞 ${esc(k.food[0])}는 음식이라 컵 마킹 없음</div>`);
      };
    }
    nextQ(); return;
  }
  if (st.tab==="table"){
    shell(`<div class="card"><b>메뉴</b><table class="codetable">${CUP_MENU.map(m=>`<tr><td class="c">${esc(m.code)}</td><td>${esc(m.name)}<div class="small muted">${esc(m.ko)}</div></td></tr>`).join("")}</table></div>
      <div class="card"><b>옵션</b> <span class="small muted">— 우유는 메뉴 뒤에 / 로, 나머지는 아랫줄에</span><table class="codetable">${CUP_OPTIONS.map(o=>`<tr><td class="c">${esc(o.code||"생략")}${o.alt?`<div class="small muted" style="font-family:inherit;font-size:12px">${esc(o.alt.join(", "))}</div>`:""}</td><td>${esc(o.name)}<div class="small muted">${esc(o.ko)}${o.note?" · "+esc(o.note):""}</div></td></tr>`).join("")}</table>
      <p class="small muted">Extra hot은 !, !!(Lava hot), !!!(Volcano hot)처럼 느낌표 개수로 쓰기도 해요. 1/4 strength = 1/4 wk.</p></div>`);
    return;
  }
  if (st.tab==="real"){
    shell(`<p class="small muted">올려준 사진 속 컵이에요. 먼저 스스로 읽어보고, 눌러서 해석 확인. <span class="tag">추정</span> 표시는 매장마다 뜻이 다를 수 있어요.</p>
      <div class="cupwrap">${CUP_EXAMPLES.map((c,i)=>`<div class="cupcard" data-c="${i}">${cupSVG(c.mark,100)}<div class="read muted">눌러서 확인</div></div>`).join("")}</div>`);
    $$("[data-c]").forEach(el=>el.onclick=()=>{ const c=CUP_EXAMPLES[+el.dataset.c]; $(".read",el).innerHTML = `${esc(c.read)} ${c.sure?"":'<span class="tag">추정</span>'}`; $(".read",el).classList.remove("muted"); });
    return;
  }
  if (st.tab==="code"){
    const pool = [...CUP_MENU.filter(m=>m.kind!=="kid"||1).map(m=>({code:m.code, name:m.name, ko:m.ko, alt:m.alt})), ...CUP_OPTIONS.filter(o=>o.code)];
    let q, dir = st.codeDir || "name2code", streak = 0;
    function nextQ(){
      q = pick(pool);
      shell(`<div class="card"><div class="seg"><button data-dir="name2code" class="${dir==="name2code"?"on":""}">이름 보고 코드 쓰기</button><button data-dir="code2name" class="${dir==="code2name"?"on":""}">코드 보고 고르기</button></div>
        <div class="prompt">${dir==="name2code" ? `<div class="ko-big">${esc(q.name)}</div><div class="muted">${esc(q.ko)}</div>` : `<div style="font-family:var(--hand);font-size:44px;font-weight:700;color:var(--accent)">${esc(q.code)}</div>`}</div>
        ${dir==="name2code" ? `<input type="text" id="ci" placeholder="코드 (예: FW)" autocomplete="off" autocapitalize="characters" spellcheck="false"><div class="row" style="margin-top:10px"><span class="small muted" id="stk">연속 ${streak}</span><span class="grow"></span><button class="btn pri" id="cc">확인</button></div>`
          : `<div class="choices">${shuffle([q, ...shuffle(pool.filter(p=>p!==q)).slice(0,3)]).map(c=>`<button class="choice" data-n="${esc(c.name)}">${esc(c.name)} <span class="muted small">${esc(c.ko)}</span></button>`).join("")}</div><div class="small muted" style="margin-top:8px">연속 ${streak}</div>`}
        <div id="cr"></div></div>`);
      $$("[data-dir]").forEach(b=>b.onclick=()=>{dir=st.codeDir=b.dataset.dir; nextQ();});
      if (dir==="name2code"){
        const ci=$("#ci"); ci.focus(); let done=false;
        const go2=()=>{ if(done) return nextQ(); done=true; const v=ci.value.trim().toUpperCase(); const ok = CANON[v]===q.code || (q.code && v===q.code.toUpperCase());
          streak = ok?streak+1:0; record(hash("code|"+q.code), ok);
          $("#cr").innerHTML=`<div class="result"><span class="score ${ok?"ok":"ng"}" style="font-size:20px">${ok?"정답":"정답은"}</span> <span style="font-family:var(--hand);font-size:26px;font-weight:700">${esc(q.code)}</span>${q.alt?` <span class="small muted">(또는 ${esc(q.alt.join(", "))})</span>`:""}</div>`; $("#cc").textContent="다음 →"; };
        $("#cc").onclick=go2; ci.addEventListener("keydown",e=>{if(e.key==="Enter"&&!e.isComposing){e.preventDefault();go2();}});
      } else {
        $$(".choice").forEach(b=>b.onclick=()=>{ if($(".choice.right")) return nextQ(); const ok=b.dataset.n===q.name; streak=ok?streak+1:0; record(hash("code|"+q.code), ok);
          $$(".choice").forEach(x=>{ if(x.dataset.n===q.name) x.classList.add("right"); }); if(!ok) b.classList.add("wrong");
          $("#cr").innerHTML=`<div class="kbd">아무 보기나 누르면 다음 문제</div>`; });
      }
    }
    nextQ(); return;
  }
  if (st.tab==="read"){
    let o, streak = st.rStreak||0;
    function nextQ(){
      o = genOrder();
      const right = orderKo(o);
      const set = new Set([right]); let guard=0;
      while (set.size<4 && guard++<50){ const m = mutate(o); set.add(orderKo(m)); }
      shell(`<div class="card"><div class="row" style="align-items:center;gap:16px"><div>${cupSVG(orderMark(o))}</div><div class="grow"><b>이 컵은 무슨 주문일까요?</b><div class="small muted">연속 ${streak}</div></div></div>
        <div class="choices" style="margin-top:10px">${shuffle([...set]).map(t=>`<button class="choice" data-k="${esc(t)}">${esc(t)}</button>`).join("")}</div><div id="rr"></div></div>`);
      $$(".choice").forEach(b=>b.onclick=()=>{ if($(".choice.right")) return nextQ(); const ok=b.dataset.k===right; streak=st.rStreak=ok?streak+1:0; record(hash("read|"+orderMark(o)), ok);
        $$(".choice").forEach(x=>{ if(x.dataset.k===right) x.classList.add("right"); }); if(!ok) b.classList.add("wrong");
        $("#rr").innerHTML = `<div class="result row">${playBtn(orderEn(o))}<div class="grow small">${esc(orderEn(o))}</div></div><div class="kbd">아무 보기나 누르면 다음 문제</div>`; });
    }
    function mutate(o){
      const m = {drink:o.drink, milk:o.milk, opts:o.opts.slice()};
      const r = Math.random();
      if (r<0.3) m.drink = pick(CUP_MENU.filter(x=>x.kind===o.drink.kind && x!==o.drink)) || pick(CUP_MENU);
      else if (r<0.55 && (o.drink.kind==="milk"||o.drink.kind==="choc")) m.milk = pick(CUP_OPTIONS.filter(x=>x.group==="milk"&&x.code&&x!==o.milk));
      else if (r<0.8 && m.opts.length){ const i=rnd(0,m.opts.length-1); const g=m.opts[i].group; const alt=CUP_OPTIONS.filter(x=>x.group===g&&x!==m.opts[i]&&x.code); if (alt.length) m.opts[i]=pick(alt); else m.opts.splice(i,1); }
      else { const add = pick(["X1","XH","1S","2S","DC","ST"]); if (!m.opts.find(x=>x.code===add)) m.opts.push(mkOpt(add)); else m.opts = m.opts.filter(x=>x.code!==add); }
      return m;
    }
    nextQ(); return;
  }
  // order → mark
  let o, streak = st.oStreak||0;
  function nextQ(){
    o = genOrder(); const en = orderEn(o); let done=false;
    shell(`<div class="card"><div class="prompt"><div class="ctx">손님 주문을 듣고 컵에 적을 마킹을 써보세요</div>
        <div class="row" style="justify-content:center;gap:14px">${playBtn(en,"big")}<button class="play" data-say="${esc(en)}" data-slow>${ICON_SLOW}</button></div>
        <div style="margin-top:8px"><button class="btn sm ghost" id="showEn">문장 보기</button></div><div class="small" id="enT" hidden>${esc(en)}</div></div>
      <input type="text" id="mi" placeholder="예: FW/O XH 1S" autocomplete="off" autocapitalize="characters" spellcheck="false" style="font-family:var(--hand);font-size:20px">
      <div class="small muted" style="margin-top:6px">메뉴/우유 를 먼저, 나머지는 띄어쓰기로. 순서는 상관없어요. 일반 우유는 안 써요.</div>
      <div class="row" style="margin-top:10px"><span class="small muted">연속 ${streak}</span><span class="grow"></span><button class="btn ghost" id="mskip">모르겠어요</button><button class="btn pri" id="mc">확인</button></div><div id="mr"></div></div>`);
    $("#showEn").onclick=()=>{$("#enT").hidden=false; $("#showEn").remove();};
    const mi=$("#mi");
    const check=(skip)=>{ if(done) return nextQ(); done=true; const r = skip?{ok:false,why:""}:checkMark(o, mi.value); streak=st.oStreak=r.ok?streak+1:0; record(hash("order|"+orderMark(o)), r.ok);
      $("#mr").innerHTML = `<div class="result row" style="align-items:center;gap:14px">${cupSVG(orderMark(o),96)}<div class="grow"><div class="score ${r.ok?"ok":"ng"}" style="font-size:20px">${r.ok?"정답!":"이렇게 적어요"}</div><div class="small">${esc(orderKo(o))}</div>${r.why?`<div class="small" style="color:var(--ng);margin-top:4px">${esc(r.why)}</div>`:""}<div class="small muted" style="margin-top:4px">${esc(en)}</div></div></div>`;
      $("#mc").textContent="다음 →"; const sk=$("#mskip"); if(sk) sk.remove(); };
    $("#mc").onclick=()=>check(false); $("#mskip").onclick=()=>check(true);
    mi.addEventListener("keydown",e=>{if(e.key==="Enter"&&!e.isComposing){e.preventDefault();check(false);}});
    setTimeout(()=>$(".play.big")?.click(), 300);
  }
  nextQ();
};

/* ---------- money ---------- */
const DENOMS = [ // cents
  {v:10000,t:"note",label:"$100",color:"#3f9a6a"},{v:5000,t:"note",label:"$50",color:"#e3b13b"},{v:2000,t:"note",label:"$20",color:"#e0613f"},
  {v:1000,t:"note",label:"$10",color:"#3f7fc9"},{v:500,t:"note",label:"$5",color:"#c56fb0"},
  {v:200,t:"coin",label:"$2",gold:true,mm:20.5},{v:100,t:"coin",label:"$1",gold:true,mm:25},
  {v:50,t:"coin",label:"50c",mm:31.65,dodeca:true},{v:20,t:"coin",label:"20c",mm:28.65},{v:10,t:"coin",label:"10c",mm:23.6},{v:5,t:"coin",label:"5c",mm:19.41}
];
const DBY = Object.fromEntries(DENOMS.map(d=>[d.v,d]));
function fmt(c){ return "$" + (c/100).toFixed(2); }
function moneySVG(d, scale=2.2, showLabel=true){
  if (d.t==="note"){
    const w = 64*scale/2.2, h = 34*scale/2.2;
    return `<svg width="${w}" height="${h}" viewBox="0 0 64 34"><rect x="1" y="1" width="62" height="32" rx="4" fill="${d.color}" opacity=".9"/><rect x="40" y="5" width="18" height="24" rx="3" fill="#fff" opacity=".35"/>${showLabel?`<text x="21" y="22" text-anchor="middle" font-size="14" font-weight="800" fill="#fff">${d.label}</text>`:""}</svg>`;
  }
  const r = d.mm*scale/2, s = r*2+4, c = s/2;
  const fill = d.gold ? "#d9b04c" : "#c9ccd1", stroke = d.gold ? "#a88326" : "#8d939b";
  let shape;
  if (d.dodeca){ const pts=[]; for(let i=0;i<12;i++){const a=Math.PI*2*i/12+Math.PI/12; pts.push((c+r*Math.cos(a)).toFixed(1)+","+(c+r*Math.sin(a)).toFixed(1));} shape=`<polygon points="${pts.join(" ")}" fill="${fill}" stroke="${stroke}" stroke-width="1.5"/>`; }
  else shape = `<circle cx="${c}" cy="${c}" r="${r}" fill="${fill}" stroke="${stroke}" stroke-width="1.5"/><circle cx="${c}" cy="${c}" r="${r-3}" fill="none" stroke="${stroke}" stroke-width=".7" opacity=".6"/>`;
  return `<svg width="${s}" height="${s}" viewBox="0 0 ${s} ${s}">${shape}${showLabel?`<text x="${c}" y="${c+4.5}" text-anchor="middle" font-size="${Math.max(10,r*0.55)}" font-weight="800" fill="${d.gold?"#6b4f0f":"#4a4f56"}">${d.label}</text>`:""}</svg>`;
}
function roundCash(c){ const r = c % 5; return r===0 ? c : (r<=2 ? c - r : c + (5-r)); } // AU 5c rounding (1,2↓ 3,4↑ 6,7↓ 8,9↑)
function bestChange(c){ const out=[]; for (const d of DENOMS){ while (c>=d.v){ out.push(d.v); c-=d.v; } } return out; }
const ONES = ["zero","one","two","three","four","five","six","seven","eight","nine","ten","eleven","twelve","thirteen","fourteen","fifteen","sixteen","seventeen","eighteen","nineteen"];
const TENS = ["","","twenty","thirty","forty","fifty","sixty","seventy","eighty","ninety"];
function nw(n){ if (n<20) return ONES[n]; if (n<100) return TENS[Math.floor(n/10)] + (n%10?"-"+ONES[n%10]:""); return ONES[Math.floor(n/100)]+" hundred"+(n%100?" and "+nw(n%100):""); }
function moneyWords(d, c, style){
  style = style || pick(["short","short","long"]);
  if (c===0) return `${nw(d)} dollar${d===1?"":"s"}`;
  if (d===0) return `${nw(c)} cents`;
  if (style==="long") return `${nw(d)} dollar${d===1?"":"s"} ${nw(c)}`;
  return `${nw(d)} ${c<10?"oh "+nw(c):nw(c)}`;
}
// 사진 속 금고 배치 (위: 지폐 / 가운데·아래: 동전)
const DRAWER = [
  {cls:"note", cols:"1fr 1fr 1fr 1fr 1fr", slots:[null,5000,2000,1000,500]},
  {cls:"", cols:"1.6fr 2fr 1.5fr 1fr", slots:[200,20,10,5]},
  {cls:"", cols:"1fr 1fr", slots:[100,50]}
];
routes.money = () => {
  const st = routes.money.st || (routes.money.st = {tab:"change", odd:false});
  const tabs = [["change","🧾 거스름돈"],["drawer","🗄 금고 위치"],["coins","🪙 동전·지폐"],["hear","🎧 금액 듣기"]];
  function shell(inner){
    app().innerHTML = `<h2>돈</h2><p class="lead">호주 달러 동전·지폐 구별, 금고 칸 위치, 거스름돈 계산까지.</p>
      <div class="chips">${tabs.map(([k,l])=>`<button class="chip ${st.tab===k?"on":""}" data-t="${k}">${l}</button>`).join("")}</div><div id="mb"></div>`;
    $$("[data-t]").forEach(b=>b.onclick=()=>{st.tab=b.dataset.t; routes.money();});
    $("#mb").innerHTML = inner;
  }
  function drawerHTML(label){
    return `<div class="drawer">${DRAWER.map(r=>`<div class="drow" style="grid-template-columns:${r.cols}">${r.slots.map(v=>`<div class="slot ${r.cls}" data-v="${v??""}">${v===null?'<span class="small" style="font-weight:600;color:#7c7168">영수증</span>':label(v)}</div>`).join("")}</div>`).join("")}</div>`;
  }
  if (st.tab==="coins"){
    shell(`<div class="card"><b>크기·색으로 구별하기</b>
      <div class="coinbar" style="margin:12px 0">${DENOMS.filter(d=>d.t==="coin").map(d=>`<div class="money-btn">${moneySVG(d,2.4)}<span>${d.label}</span></div>`).join("")}</div>
      <ul class="small" style="padding-left:18px;margin:6px 0">
        <li><b>금색 동전은 $1, $2 두 개뿐.</b> 그런데 <b>$2가 $1보다 작아요</b> (가장 헷갈리는 포인트)</li>
        <li><b>50c는 12각형</b>이고 동전 중 가장 커요</li>
        <li>은색은 작은 순서대로 5c &lt; 10c &lt; 20c &lt; 50c</li>
        <li>1c, 2c는 없어요 → 현금 계산은 5c 단위로 반올림</li></ul>
      <div class="coinbar" style="margin-top:10px">${DENOMS.filter(d=>d.t==="note").map(d=>`<div class="money-btn">${moneySVG(d,2.2)}</div>`).join("")}</div>
      <div class="small muted">지폐 색: $5 보라·분홍, $10 파랑, $20 빨강·주황, $50 노랑, $100 초록</div></div>
      <div class="card" id="cq"></div>`);
    let streak=0;
    const quiz = () => {
      const d = pick(DENOMS.filter(x=>x.t==="coin"));
      $("#cq").innerHTML = `<b>이 동전은 얼마?</b> <span class="small muted">(숫자 없이 크기·색·모양만) · 연속 ${streak}</span>
        <div style="display:flex;justify-content:center;align-items:center;gap:18px;margin:14px 0;min-height:90px">${moneySVG(d,2.6,false)}<span class="small muted">비교용 →</span>${moneySVG(DBY[10],2.6,true)}</div>
        <div class="choices" style="grid-template-columns:repeat(3,1fr)">${["$2","$1","50c","20c","10c","5c"].map(l=>`<button class="choice" style="text-align:center" data-l="${l}">${l}</button>`).join("")}</div>`;
      $$("#cq .choice").forEach(b=>b.onclick=()=>{ if($("#cq .choice.right")) return quiz(); const ok=b.dataset.l===d.label; streak=ok?streak+1:0;
        $$("#cq .choice").forEach(x=>{if(x.dataset.l===d.label)x.classList.add("right");}); if(!ok)b.classList.add("wrong"); });
    };
    quiz(); return;
  }
  if (st.tab==="drawer"){
    shell(`<div class="card"><div class="seg" id="dseg"><button data-dm="learn">외우기</button><button data-dm="find">위치 찾기</button><button data-dm="name">칸 맞히기</button></div>
      <div class="row"><b class="grow" id="dq"></b><span class="small muted" id="ds"></span></div>
      <p class="small muted" style="margin:4px 0 10px">올려준 사진 속 금고 배치 기준이에요. 매장마다 다를 수 있으니 첫날 꼭 확인!</p>
      <div id="dw"></div><div class="row" style="margin-top:10px"><span class="grow"></span><button class="btn sm ghost" id="dphoto">사진 보기</button></div></div>`);
    let mode = st.dmode || "learn", streak = 0, target;
    const label = v => mode==="learn" ? (DBY[v].t==="note" ? moneySVG(DBY[v],1.8) : moneySVG(DBY[v],1.25)) : '<span class="q">?</span>';
    function q(){
      if (!$("#dw")) return;
      $$("#dseg button").forEach(b=>b.classList.toggle("on", b.dataset.dm===mode));
      $("#dw").innerHTML = drawerHTML(label);
      $("#ds").textContent = mode==="learn" ? "" : "연속 " + streak;
      const vals = DRAWER.flatMap(r=>r.slots).filter(v=>v!==null);
      if (mode==="learn"){ $("#dq").textContent = "배치 외우기 — 지폐는 위, 동전은 아래"; return; }
      target = pick(vals);
      if (mode==="find"){
        $("#dq").innerHTML = `<span style="font-size:20px">${DBY[target].label}</span> 는 어디에 있을까?`;
        $$("#dw .slot").forEach(s=>s.onclick=()=>{ if (s.dataset.v==="" ) return; const ok=+s.dataset.v===target; streak=ok?streak+1:0;
          const right = $(`#dw .slot[data-v="${target}"]`); right.classList.add("right"); right.innerHTML = DBY[target].label; if(!ok){ s.classList.add("wrong"); s.innerHTML=DBY[+s.dataset.v].label; }
          setTimeout(q, ok?650:1400); });
      } else {
        const el = $(`#dw .slot[data-v="${target}"]`); el.classList.add("hl");
        $("#dq").textContent = "노란 칸에는 뭐가 들어갈까?";
        $("#dw").insertAdjacentHTML("afterend", `<div class="choices" id="dch" style="grid-template-columns:repeat(3,1fr);margin-top:10px">${vals.map(v=>`<button class="choice" style="text-align:center" data-v="${v}">${DBY[v].label}</button>`).join("")}</div>`);
        $$("#dch .choice").forEach(b=>b.onclick=()=>{ const ok=+b.dataset.v===target; streak=ok?streak+1:0; b.classList.add(ok?"right":"wrong"); el.classList.add(ok?"right":"wrong"); el.innerHTML=DBY[target].label;
          setTimeout(()=>{ $("#dch")?.remove(); q(); }, ok?650:1400); });
      }
    }
    $$("#dseg button").forEach(b=>b.onclick = () => { $("#dch")?.remove(); mode = st.dmode = b.dataset.dm; streak = 0; q(); });
    $("#dphoto").onclick = () => viewer("금고 사진", [{src:"materials/cash-drawer.jpg"}]);
    q(); return;
  }
  if (st.tab==="hear"){
    let streak=0;
    function q(){
      const cents = pick([rnd(3,25)*50, rnd(30,450)*10, rnd(1,30)*100, rnd(60,800)*5]);
      const d = Math.floor(cents/100), c = cents%100;
      const say = `${pick(["That'll be","That's","Your total is","That comes to"])} ${moneyWords(d,c)}${pick(["."," please.",". Cash or card?"])}`;
      let done=false;
      shell(`<div class="card"><div class="prompt"><div class="ctx">금액을 듣고 숫자로 적어보세요 · 연속 ${streak}</div>
        <div class="row" style="justify-content:center;gap:14px">${playBtn(say,"big")}<button class="play" data-say="${esc(say)}" data-slow>${ICON_SLOW}</button></div></div>
        <input type="text" id="hi" inputmode="decimal" placeholder="예: 17.50" autocomplete="off"><div class="row" style="margin-top:10px"><span class="grow"></span><button class="btn pri" id="hc">확인</button></div><div id="hr"></div></div>`);
      const hi=$("#hi");
      const check=()=>{ if(done) return q(); done=true; const v=Math.round(parseFloat(hi.value.replace(/[^0-9.]/g,""))*100); const ok=v===cents; streak=ok?streak+1:0;
        $("#hr").innerHTML=`<div class="result"><span class="score ${ok?"ok":"ng"}" style="font-size:22px">${ok?"정답":"정답은"} ${fmt(cents)}</span><div class="small muted">"${esc(say)}"</div><div class="small muted" style="margin-top:4px">호주에선 $4.50을 보통 "four fifty"라고 짧게 말해요.</div></div>`; $("#hc").textContent="다음 →"; };
      $("#hc").onclick=check; hi.addEventListener("keydown",e=>{if(e.key==="Enter"){e.preventDefault();check();}});
      setTimeout(()=>$(".play.big")?.click(),300);
    }
    q(); return;
  }
  // change
  let streak = st.cStreak||0;
  function q(){
    let price = st.odd ? rnd(150,4500) : pick([rnd(8,90)*50, rnd(30,450)*10]);
    const cashPrice = roundCash(price);
    const notes = [500,1000,2000,5000,10000].filter(n=>n>=cashPrice);
    let paid = Math.random()<0.75 ? notes[0] : (notes[1]||notes[0]);
    if (Math.random()<0.2 && cashPrice%100){ const extra = (cashPrice%100 > 50 ? 0 : 50); if (paid - cashPrice + extra >= 0 && extra) paid += extra; }
    const change = paid - cashPrice;
    if (change===0) return q();
    let given = [];
    const priceLine = price!==cashPrice ? `<div class="small" style="color:var(--ex)">현금이라 ${fmt(price)} → <b>${fmt(cashPrice)}</b>로 반올림</div>` : "";
    shell(`<div class="card">
      <div class="row" style="align-items:flex-end"><div class="grow"><div class="small muted">금액</div><div class="big-num">${fmt(price)}</div>${priceLine}</div>
        <div style="text-align:right"><div class="small muted">손님이 낸 돈</div><div class="big-num" style="color:var(--accent)">${fmt(paid)}</div></div></div>
      <div class="row small muted" style="margin:6px 0 10px">${playBtn(`That'll be ${moneyWords(Math.floor(price/100),price%100,"short")}.`)} <span>B: "That'll be ${esc(moneyWords(Math.floor(price/100),price%100,"short"))}."</span></div>
      <b class="small">거스름돈을 눌러서 건네주세요</b>
      <div class="coinbar" style="margin:8px 0">${DENOMS.filter(d=>d.v<=5000).map(d=>`<button class="money-btn" data-add="${d.v}">${moneySVG(d, d.t==="note"?1.7:1.5)}</button>`).join("")}</div>
      <div class="given" id="gv"><span class="small muted">여기에 쌓여요 (누르면 빼기)</span></div>
      <div class="row" style="margin-top:8px"><span>건넨 돈: <b id="gs">$0.00</b></span><span class="grow"></span><button class="btn ghost sm" id="gclr">비우기</button><button class="btn pri" id="gok">건네주기</button></div>
      <div id="gr"></div>
      <label class="row small muted" style="gap:6px;margin-top:12px"><input type="checkbox" id="odd" ${st.odd?"checked":""}> 센트 끝자리가 있는 가격도 (5c 반올림 연습)</label>
      <div class="small muted" style="margin-top:4px">반올림 규칙: 끝자리 1·2 → 내림(0), 3·4 → 올림(5), 6·7 → 내림(5), 8·9 → 올림(10). 카드 결제는 반올림 없음.</div></div>`);
    const redraw = () => { const sum = given.reduce((a,b)=>a+b,0); $("#gs").textContent = fmt(sum);
      $("#gv").innerHTML = given.length ? given.map((v,i)=>`<button class="money-btn" data-rm="${i}">${moneySVG(DBY[v], DBY[v].t==="note"?1.4:1.2)}</button>`).join("") : '<span class="small muted">여기에 쌓여요 (누르면 빼기)</span>';
      $$("[data-rm]").forEach(b=>b.onclick=()=>{ given.splice(+b.dataset.rm,1); redraw(); }); };
    $$("[data-add]").forEach(b=>b.onclick=()=>{ if ($("#gok").dataset.done) return; given.push(+b.dataset.add); given.sort((a,b)=>b-a); redraw(); });
    $("#gclr").onclick=()=>{ given=[]; redraw(); };
    $("#odd").onchange=e=>{ st.odd=e.target.checked; q(); };
    $("#gok").onclick=()=>{
      const g=$("#gok"); if (g.dataset.done) return q();
      const sum = given.reduce((a,b)=>a+b,0), ok = sum===change, best = bestChange(change);
      streak = st.cStreak = ok?streak+1:0; g.dataset.done="1"; g.textContent="다음 →";
      $("#gr").innerHTML = `<div class="result"><div class="score ${ok?"ok":"ng"}" style="font-size:22px">${ok?"정답!":"거스름돈은 "+fmt(change)}</div>
        ${ok && given.length>best.length?`<div class="small" style="color:var(--ex)">맞았어요! 더 적은 개수로 줄 수도 있어요 ↓</div>`:""}
        ${!ok?`<div class="small muted">${fmt(paid)} − ${fmt(cashPrice)} = ${fmt(change)} (내가 준 돈: ${fmt(sum)})</div>`:""}
        <div class="coinbar" style="margin-top:6px">${best.map(v=>moneySVG(DBY[v], DBY[v].t==="note"?1.3:1.15)).join("")}</div>
        <div class="small muted">연속 ${streak} · 건네면서: "Here's your change, ${esc(moneyWords(Math.floor(change/100),change%100,"short"))}."</div></div>`;
    };
  }
  q();
};

/* ---------- files (자료실) ---------- */
const DB = {
  db:null,
  open(){ return new Promise((res,rej)=>{ if(this.db) return res(this.db); try{ const r=indexedDB.open("barista-files",1); r.onupgradeneeded=()=>r.result.createObjectStore("files",{keyPath:"id"}); r.onsuccess=()=>{this.db=r.result;res(this.db);}; r.onerror=()=>rej(r.error);}catch(e){rej(e);} }); },
  async all(){ const db=await this.open(); return new Promise((res,rej)=>{ const q=db.transaction("files").objectStore("files").getAll(); q.onsuccess=()=>res(q.result.sort((a,b)=>b.added-a.added)); q.onerror=()=>rej(q.error); }); },
  async put(f){ const db=await this.open(); return new Promise((res,rej)=>{ const t=db.transaction("files","readwrite"); t.objectStore("files").put(f); t.oncomplete=res; t.onerror=()=>rej(t.error); }); },
  async del(id){ const db=await this.open(); return new Promise((res,rej)=>{ const t=db.transaction("files","readwrite"); t.objectStore("files").delete(id); t.oncomplete=res; t.onerror=()=>rej(t.error); }); }
};
function viewer(title, pages, extra){
  const m = document.createElement("div"); m.className="modal";
  m.innerHTML = `<div class="mbar"><div class="t">${esc(title)}</div>${extra||""}<button class="btn sm" id="mx">닫기 ✕</button></div><div class="mbody">${pages.map(p=>p.iframe?`<iframe src="${p.iframe}"></iframe>`:`<img src="${p.src}" loading="lazy" alt="">`).join("")}</div>`;
  document.body.appendChild(m); document.body.style.overflow="hidden";
  const close=()=>{ m.remove(); document.body.style.overflow=""; window.removeEventListener("keydown",k); };
  const k=e=>{ if(e.key==="Escape") close(); }; window.addEventListener("keydown",k);
  $("#mx",m).onclick=close;
  return {close, el:m};
}
function pageViewer(m){
  const key = "pg|"+m.title;
  const extra = `<select class="btn sm" id="pj" style="max-width:96px">${m.pages.map((_,i)=>`<option value="${i}">${i+1} / ${m.pages.length}</option>`).join("")}</select>${m.pdf?`<a class="btn sm" href="${m.pdf}" target="_blank" rel="noopener">PDF</a>`:""}`;
  const v = viewer(m.title, [], extra);
  const body = $(".mbody", v.el);
  body.innerHTML = m.pages.map((src,i)=>`<div data-pg="${i}" style="position:relative;max-width:1100px;margin:0 auto"><img src="${src}" loading="lazy" alt="" style="min-height:200px"><span style="position:absolute;right:8px;bottom:16px;background:rgba(0,0,0,.6);color:#fff;font-size:12px;padding:2px 8px;border-radius:8px">${i+1}</span></div>`).join("");
  const pj = $("#pj", v.el);
  pj.onchange = () => body.querySelector(`[data-pg="${pj.value}"]`).scrollIntoView();
  let last = 0; try { last = +localStorage.getItem(KEY+key) || 0; } catch(e){}
  if (last) setTimeout(()=>{ pj.value = last; body.querySelector(`[data-pg="${last}"]`)?.scrollIntoView(); toast(`${last+1}쪽부터 이어서`); }, 60);
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting){ const n=+e.target.dataset.pg; pj.value=n; try{ localStorage.setItem(KEY+key, n); }catch(err){} } }), {root:body, threshold:0.5});
  $$("[data-pg]", body).forEach(el=>io.observe(el));
}
routes.files = async () => {
  const icon = t => /pdf/.test(t) ? "PDF" : /image/.test(t) ? "IMG" : /audio/.test(t) ? "♪" : /video/.test(t) ? "▶" : "FILE";
  app().innerHTML = `<h2>자료실</h2><p class="lead">받아둔 자료를 앱 안에서 바로 열어볼 수 있어요.</p>
    <div class="row" style="margin-bottom:8px"><button class="btn sm" id="saveAll">⬇︎ 자료 전부 폰에 저장 (약 30MB)</button><button class="btn sm ghost" id="howInstall2">📲 폰 설치 방법</button></div>
    <input type="search" id="fq" placeholder="자료 이름 검색" style="margin-bottom:6px">
    <div id="builtin">${[...new Set(MATERIALS.map(m=>m.group))].map(g=>`<h3>${esc(g)}</h3><div class="card">${MATERIALS.map((m,i)=>m.group!==g?"":`<div class="file" data-m="${i}" data-name="${esc(m.title)}"><div class="ic"><img src="${m.type==="pages"?m.pages[0]:m.src}" alt="" loading="lazy"></div><div class="grow"><b>${esc(m.title)}</b><div class="small muted">${m.type==="pages"?m.pages.length+"쪽":"이미지"}${m.note?" · "+esc(m.note):""}</div></div><span class="muted">›</span></div>`).join("")}</div>`).join("")}</div>
    <h3>내가 추가한 자료</h3>
    <div class="card"><label class="btn pri" style="width:100%">＋ 파일 추가 (PDF·이미지·음성 등)<input type="file" id="up" multiple hidden></label>
      <div class="small muted" style="margin-top:8px">추가한 파일은 이 기기·이 브라우저 안에만 저장돼요. 다른 기기에서도 보려면 파일을 Claude에게 보내서 기본 자료에 넣어달라고 하세요.</div>
      <div id="mine" style="margin-top:6px"></div></div>`;
  $$("[data-m]").forEach(el=>el.onclick=()=>{ const m=MATERIALS[+el.dataset.m];
    if (m.type==="pages") pageViewer(m);
    else viewer(m.title, [{src:m.src}]); });
  $("#saveAll").onclick = e => saveAllOffline(e.currentTarget); $("#howInstall2").onclick = installGuide;
  $("#fq").oninput = e => { const q=e.target.value.trim(); $$("#builtin .file").forEach(el=>el.hidden = q && !el.dataset.name.includes(q)); $$("#builtin h3").forEach(h=>{ const c=h.nextElementSibling; h.hidden=c.hidden=![...c.children].some(x=>!x.hidden); }); };
  const urls = []; cleanup = () => urls.forEach(u=>URL.revokeObjectURL(u));
  async function list(){
    let files=[]; try { files = await DB.all(); } catch(e){ $("#mine").innerHTML = `<div class="empty small">이 브라우저에선 파일 저장을 쓸 수 없어요.</div>`; return; }
    if (!files.length){ $("#mine").innerHTML = `<div class="empty small">아직 추가한 자료가 없어요</div>`; return; }
    $("#mine").innerHTML = files.map(f=>`<div class="file" data-f="${f.id}"><div class="ic">${icon(f.type)}</div><div class="grow"><b style="word-break:break-all">${esc(f.name)}</b><div class="small muted">${(f.size/1024/1024).toFixed(1)}MB · ${new Date(f.added).toLocaleDateString("ko-KR")}</div></div><button class="btn sm ghost" data-del="${f.id}">삭제</button></div>`).join("");
    $$("[data-f]").forEach(el=>el.onclick=e=>{
      if (e.target.closest("[data-del]")) return;
      const f = files.find(x=>x.id===el.dataset.f); const u = URL.createObjectURL(f.blob); urls.push(u);
      if (/image/.test(f.type)) viewer(f.name, [{src:u}]);
      else if (/audio/.test(f.type)){ const v=viewer(f.name, []); v.el.querySelector(".mbody").innerHTML=`<audio controls src="${u}" style="width:100%;margin-top:30px"></audio>`; }
      else if (/video/.test(f.type)){ const v=viewer(f.name, []); v.el.querySelector(".mbody").innerHTML=`<video controls playsinline src="${u}" style="width:100%"></video>`; }
      else if (/pdf/.test(f.type)) viewer(f.name, [{iframe:u}], `<a class="btn sm" href="${u}" target="_blank" rel="noopener">새 탭</a>`);
      else { const v=viewer(f.name, []); v.el.querySelector(".mbody").innerHTML=`<div class="empty" style="color:#fff">이 형식은 미리보기가 안 돼요.<br><br><a class="btn" href="${u}" target="_blank" rel="noopener">새 탭에서 열기</a></div>`; }
    });
    $$("[data-del]").forEach(b=>b.onclick=async e=>{ e.stopPropagation(); if (!twice(b, "한 번 더 누르면 삭제")) return; await DB.del(b.dataset.del); list(); });
  }
  $("#up").onchange = async e => {
    const fs = Array.from(e.target.files||[]);
    try { for (const f of fs) await DB.put({id: hash(f.name+f.size+Date.now()), name:f.name, type:f.type||"", size:f.size, added:Date.now(), blob:f}); toast(fs.length+"개 추가했어요"); }
    catch(err){ toast("저장 실패: 용량이 너무 클 수 있어요"); }
    e.target.value=""; list();
  };
  list();
};

/* ---------- home ---------- */
routes.home = () => {
  const today = new Date().toISOString().slice(0,10);
  if (S.check.date !== today) S.check = {date:today, done:[]};
  const pct = (arr) => arr.length ? Math.round(arr.filter(u=>isDone(u.id)).length/arr.length*100) : 0;
  const cards = [
    ["#interview","💼 면접 필수 영어", `${IV_UNITS.length}개 답변`, pct(IV_UNITS)],
    ["#phrases","🗣 매장 영어", `${PH_UNITS.length}문장`, pct(PH_UNITS)],
    ["#dialog","💬 대화 롤플레이", `${DIALOGUES.length}개 대화`, null],
    ["#names","🔤 손님 이름", `${NAME_UNITS.length}명`, pct(NAME_UNITS)],
    ["#cup","☕ 컵 마킹", "주문 듣고 적기", null],
    ["#money","💵 돈", "거스름돈·금고", null],
    ["#files","📁 자료실", `교본·후기 등 ${MATERIALS.length}개`, null]
  ];
  const wrongN = [...IV_UNITS, ...PH_UNITS].filter(u=>isWrong(u.id)).length;
  app().innerHTML = `<h2>오늘도 한 바퀴 ☕</h2><p class="lead">면접 → 매장 영어 → 이름·컵·돈 순서로 돌려보세요.</p>
    ${wrongN?`<div class="card row"><div class="grow"><b>틀린 문장 ${wrongN}개</b><div class="small muted">면접 + 매장 영어 오답만 모아서 다시</div></div><button class="btn pri" id="wr">오답 복습</button></div>`:""}
    <div class="home-grid">${cards.map(([h,t,s,p])=>`<a class="home-card" href="${h}"><b>${t}</b><div class="muted">${s}</div>${p!==null?`<div class="pct"><div class="bar"><i style="width:${p}%"></i></div><div class="small muted" style="margin-top:3px">${p}% 맞힘</div></div>`:""}</a>`).join("")}</div>
    ${standalone() ? "" : `<div class="card row"><span style="font-size:24px">📲</span><div class="grow"><b>폰에 앱으로 설치하기</b><div class="small muted">홈 화면에 아이콘으로 두고 바로 열기</div></div><button class="btn sm" id="howInstall">방법</button></div>`}
    <h3>바리스타 경력 없는 사람들 잘 들어라</h3>
    <div class="card small">${MINDSET.map(t=>`<p style="margin:0 0 8px">${esc(t)}</p>`).join("")}<p style="margin:0" class="muted">→ "Is there anything I can help with?" 입에 달고 다니기 ${playBtn("Is there anything I can help with?")}</p></div>
    <h3>출근 체크리스트 <span class="small muted">— 매일 초기화</span></h3>
    <div class="card" id="cl">${CHECKLIST.map((c,i)=>`<label class="check ${S.check.done.includes(i)?"done":""}"><input type="checkbox" data-ck="${i}" ${S.check.done.includes(i)?"checked":""}><span>${esc(c)}</span></label>`).join("")}
      <div class="small muted" style="margin-top:8px" id="ckn"></div></div>`;
  const upd = () => $("#ckn").textContent = `${S.check.done.length} / ${CHECKLIST.length} 완료`;
  upd();
  $$("[data-ck]").forEach(b=>b.onchange=()=>{ const i=+b.dataset.ck; S.check.done = b.checked ? [...new Set([...S.check.done,i])] : S.check.done.filter(x=>x!==i); save(); b.closest(".check").classList.toggle("done",b.checked); upd(); });
  const hi=$("#howInstall"); if (hi) hi.onclick=installGuide;
  const w=$("#wr"); if (w) w.onclick=()=>drill(shuffle([...IV_UNITS,...PH_UNITS].filter(u=>isWrong(u.id))), "ko2en", {title:"오답 복습", back:()=>go()});
};

/* ---------- install / offline ---------- */
function standalone(){ try { return matchMedia("(display-mode: standalone)").matches || navigator.standalone === true; } catch(e){ return false; } }
function installGuide(){
  const sh = document.createElement("div"); sh.className="sheet";
  const inFrame = window.top !== window.self;
  sh.innerHTML = `<div class="in"><div class="row"><b class="grow">📲 폰에 앱으로 설치하기</b><button class="btn ghost sm" id="sx">닫기</button></div>
    ${inFrame ? `<p class="small" style="background:var(--ex-bg);padding:10px;border-radius:10px">지금은 Claude 안에서 열린 화면이라 설치가 안 돼요. GitHub에 올린 주소(예: designersongji-pixel.github.io/barista-prep)를 폰 브라우저로 열고 아래 순서대로 하세요.</p>` : ""}
    <p class="small"><b>아이폰 (Safari)</b><br>① 아래쪽 <b>공유 버튼(□↑)</b> → ② <b>홈 화면에 추가</b> → ③ 오른쪽 위 <b>추가</b></p>
    <p class="small"><b>안드로이드 (Chrome)</b><br>① 오른쪽 위 <b>⋮</b> → ② <b>홈 화면에 추가</b> 또는 <b>앱 설치</b></p>
    <p class="small muted">설치하면 WFD 앱처럼 홈 화면 아이콘으로 열려요. 한 번 열어둔 화면과 자료는 인터넷이 약해도 열려요. 자료실 맨 위 <b>자료 전부 폰에 저장</b>을 누르면 교본·후기까지 미리 저장돼요.</p></div>`;
  document.body.appendChild(sh); sh.onclick = e => { if (e.target===sh) sh.remove(); }; $("#sx",sh).onclick = () => sh.remove();
}
async function saveAllOffline(btn){
  if (!("caches" in window) || !navigator.serviceWorker || !navigator.serviceWorker.controller){ toast("설치한 앱(또는 GitHub 주소)에서만 저장할 수 있어요"); return; }
  const urls = [...new Set(MATERIALS.flatMap(m => m.type==="pages" ? m.pages : [m.src]))];
  const c = await caches.open("barista-v3"); let n = 0; btn.disabled = true;
  for (const u of urls){ try { if (!(await c.match(u))){ const r = await fetch(u); if (r.ok) await c.put(u, r); } } catch(e){} n++; if (n%5===0 || n===urls.length) btn.textContent = `저장 중… ${n}/${urls.length}`; }
  btn.textContent = "✓ 자료 전부 저장됨"; toast("이제 인터넷 없이도 자료를 볼 수 있어요");
}

/* ---------- settings ---------- */
$("#btnSettings").onclick = () => {
  TTS.load();
  const sh = document.createElement("div"); sh.className="sheet";
  const v = TTS.voice();
  sh.innerHTML = `<div class="in"><div class="row"><b class="grow">음성 설정</b><button class="btn ghost sm" id="sx">닫기</button></div>
    <div class="small muted" style="margin:6px 0 4px">목소리 (호주 en-AU 추천)</div>
    <select id="sv" class="btn" style="width:100%;justify-content:flex-start"><option value="">자동 (호주 → 영국 → 미국)</option>${TTS.voices.map(x=>`<option value="${esc(x.name)}" ${S.settings.voice===x.name?"selected":""}>${esc(x.name)} · ${esc(x.lang)}</option>`).join("")}</select>
    <div class="small muted" style="margin:12px 0 4px">속도 <b id="rv">${S.settings.rate.toFixed(2)}</b></div>
    <input type="range" id="sr" min="0.6" max="1.3" step="0.05" value="${S.settings.rate}" style="width:100%">
    <div class="row" style="margin-top:12px"><button class="btn" data-say="Hi, how are you? What can I get for you today?">▶ 들어보기</button><span class="grow"></span><span class="small muted">${v?esc(v.name):"음성 없음"}</span></div>
    <p class="small muted" style="margin-top:12px">아이폰은 설정 → 손쉬운 사용 → 읽기 및 말하기 → 음성 → 영어 → '영어(오스트레일리아)'에서 Karen/Lee 같은 고품질 음성을 내려받으면 더 자연스러워요.</p>
    <hr style="border:0;border-top:1px solid var(--line);margin:14px 0"><button class="btn sm ghost" id="reset" style="color:var(--ng)">학습 기록 초기화</button></div>`;
  document.body.appendChild(sh);
  sh.onclick = e => { if (e.target===sh) sh.remove(); };
  $("#sx",sh).onclick = () => sh.remove();
  $("#sv",sh).onchange = e => { S.settings.voice = e.target.value; save(); };
  $("#sr",sh).oninput = e => { S.settings.rate = +e.target.value; $("#rv",sh).textContent = S.settings.rate.toFixed(2); save(); };
  $("#reset",sh).onclick = e => { if (twice(e.target, "한 번 더 누르면 전부 지워져요")){ S.stats={}; S.star={}; save(); sh.remove(); go(); } };
};

go();
})();
