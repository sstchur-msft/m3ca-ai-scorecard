#!/usr/bin/env node

import { createServer } from 'http';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';

const PORT = parseInt(process.env.SCORECARD_PORT || '3939', 10);
const ROOT = process.env.SCORECARD_ROOT || process.cwd();
const SCORECARD_FILE = join(ROOT, 'scorecard.json');
const CONTEXT_FILE = join(ROOT, 'scorecard-context.json');

function readJSON(path) {
	try { return existsSync(path) ? JSON.parse(readFileSync(path, 'utf-8')) : null; } catch { return null; }
}

function getHTML() {
	return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>★ AI Scorecard</title>
<style>
*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0f172a; color: #e2e8f0; }
.container { max-width: 1100px; margin: 0 auto; padding: 24px; }
header { text-align: center; padding: 32px 0 16px; }
header h1 { font-size: 2rem; margin: 0 0 6px; color: #f8fafc; }
header .subtitle { color: #94a3b8; font-size: 0.9rem; }
.summary { display: flex; gap: 12px; justify-content: center; margin: 20px 0; flex-wrap: wrap; }
.summary-card { background: #1e293b; border-radius: 10px; padding: 16px 24px; text-align: center; min-width: 100px; }
.summary-card .number { font-size: 1.8rem; font-weight: 700; }
.summary-card .label { font-size: 0.75rem; color: #94a3b8; margin-top: 2px; }
.c-yes { color: #4ade80; } .c-no { color: #f87171; } .c-partial { color: #fbbf24; } .c-unknown { color: #94a3b8; } .c-overall { color: #38bdf8; }
.stars { text-align: center; margin: 8px 0 24px; font-size: 2.5rem; letter-spacing: 4px; }
.star-filled { color: #fbbf24; }
.star-empty { color: #374151; }
.filters { display: flex; gap: 8px; justify-content: center; margin: 0 0 20px; flex-wrap: wrap; }
.filter-btn { padding: 6px 14px; border: 1px solid #334155; border-radius: 20px; background: transparent; color: #94a3b8; font-size: 0.8rem; cursor: pointer; transition: all 0.15s; }
.filter-btn:hover { border-color: #64748b; color: #e2e8f0; }
.filter-btn.active { background: #334155; color: #f8fafc; border-color: #64748b; }
.filter-group { display: flex; gap: 6px; align-items: center; }
.filter-label { color: #64748b; font-size: 0.75rem; text-transform: uppercase; margin-right: 4px; }
.search-bar { display: flex; justify-content: center; margin: 0 0 20px; }
.search-bar input { width: 400px; max-width: 90%; padding: 8px 14px; border: 1px solid #334155; border-radius: 8px; background: #1e293b; color: #e2e8f0; font-size: 0.85rem; outline: none; }
.search-bar input:focus { border-color: #38bdf8; }
.search-bar input::placeholder { color: #64748b; }
.category { background: #1e293b; border-radius: 12px; margin-bottom: 16px; overflow: hidden; }
.category.hidden { display: none; }
.category-header { display: flex; align-items: center; justify-content: space-between; padding: 14px 18px; background: #334155; cursor: pointer; user-select: none; }
.category-header h2 { margin: 0; font-size: 0.95rem; letter-spacing: 0.04em; color: #f8fafc; }
.category-header .cat-meta { display: flex; align-items: center; gap: 12px; }
.category-score { font-size: 1.2rem; font-weight: 700; color: #38bdf8; }
.category-body { max-height: 5000px; overflow: hidden; transition: max-height 0.3s ease; }
.category-body.collapsed { max-height: 0; }
table { width: 100%; border-collapse: collapse; font-size: 0.85rem; }
th { text-align: left; padding: 8px 14px; color: #94a3b8; font-size: 0.7rem; text-transform: uppercase; border-bottom: 1px solid #334155; }
td { padding: 8px 14px; border-bottom: 1px solid rgba(51,65,85,0.4); vertical-align: top; }
tr.hidden { display: none; }
tr:hover { background: rgba(56,189,248,0.04); }
.criterion-cell { max-width: 350px; }
.value-cell { width: 80px; text-align: center; }
.reasoning-cell { color: #94a3b8; font-size: 0.8rem; max-width: 300px; }
.badge { padding: 3px 10px; border-radius: 99px; font-size: 0.72rem; font-weight: 600; display: inline-block; }
.badge-Yes { background: #166534; color: #4ade80; }
.badge-No { background: #7f1d1d; color: #fca5a5; }
.badge-Partial { background: #713f12; color: #fde047; }
.badge-Unknown { background: #374151; color: #9ca3af; }
.context-toggle { background: none; border: none; color: #38bdf8; font-size: 0.75rem; cursor: pointer; padding: 2px 0; }
.context-toggle:hover { text-decoration: underline; }
.context-area { margin-top: 6px; display: none; }
.context-area.open { display: block; }
.context-area textarea { width: 100%; min-height: 60px; padding: 8px; border: 1px solid #334155; border-radius: 6px; background: #0f172a; color: #e2e8f0; font-size: 0.8rem; resize: vertical; font-family: inherit; }
.context-area textarea:focus { border-color: #38bdf8; outline: none; }
.save-bar { position: sticky; bottom: 0; background: #1e293b; border-top: 1px solid #334155; padding: 12px 24px; align-items: center; justify-content: space-between; display: none; z-index: 10; }
.save-bar.visible { display: flex; }
.save-btn { padding: 8px 20px; border: none; border-radius: 6px; background: #2563eb; color: white; font-size: 0.9rem; font-weight: 500; cursor: pointer; }
.save-btn:hover { background: #1d4ed8; }
.save-msg { color: #94a3b8; font-size: 0.85rem; }
.toast { position: fixed; bottom: 80px; left: 50%; transform: translateX(-50%); background: #166534; color: #4ade80; padding: 10px 24px; border-radius: 8px; font-size: 0.85rem; opacity: 0; transition: opacity 0.3s; pointer-events: none; z-index: 100; }
.toast.show { opacity: 1; }
footer { text-align: center; padding: 20px; color: #475569; font-size: 0.75rem; }
@media (max-width: 640px) {
  .container { padding: 12px; }
  .summary-card { padding: 12px 16px; min-width: 70px; }
  .summary-card .number { font-size: 1.4rem; }
  .search-bar input { width: 100%; }
}
</style>
</head>
<body>
<div class="container" id="app">
  <header>
    <h1>★ AI Scorecard</h1>
    <div class="subtitle" id="subtitle">Loading...</div>
  </header>
  <div class="stars" id="stars"></div>
  <div class="summary" id="summary"></div>
  <div class="search-bar"><input type="text" id="search" placeholder="Search criteria..." oninput="applyFilters()"></div>
  <div class="filters">
    <div class="filter-group">
      <span class="filter-label">Result:</span>
      <button class="filter-btn active" data-filter="all" onclick="setFilter('result',this)">All</button>
      <button class="filter-btn" data-filter="Yes" onclick="setFilter('result',this)">✅ Yes</button>
      <button class="filter-btn" data-filter="No" onclick="setFilter('result',this)">❌ No</button>
      <button class="filter-btn" data-filter="Partial" onclick="setFilter('result',this)">🟡 Partial</button>
      <button class="filter-btn" data-filter="Unknown" onclick="setFilter('result',this)">❓ Unknown</button>
    </div>
    <div class="filter-group">
      <span class="filter-label">Context:</span>
      <button class="filter-btn active" data-filter="all" onclick="setFilter('context',this)">All</button>
      <button class="filter-btn" data-filter="has" onclick="setFilter('context',this)">Has context</button>
      <button class="filter-btn" data-filter="none" onclick="setFilter('context',this)">No context</button>
    </div>
  </div>
  <div id="categories"></div>
  <div class="save-bar" id="saveBar">
    <span class="save-msg">You have unsaved context changes</span>
    <button class="save-btn" onclick="saveContext()">Save Context</button>
  </div>
  <div class="toast" id="toast"></div>
  <footer>AI Scorecard · Powered by Copilot CLI · <span id="criteriaCount">0</span> criteria</footer>
</div>
<script>
let scorecard = null, context = {}, activeFilters = { result: 'all', context: 'all' }, dirty = false, lastJSON = '';

async function load() {
  try {
    const [sc, ctx] = await Promise.all([fetch('/api/scorecard'), fetch('/api/context')]);
    if (sc.ok) scorecard = await sc.json();
    if (ctx.ok) { const d = await ctx.json(); if (d) context = d; }
    render();
  } catch(e) { document.getElementById('subtitle').textContent = 'Error: ' + e.message; }
}

function render() {
  if (!scorecard) return;
  const cats = scorecard.categories || [];
  const repo = scorecard.repoName || 'Unknown';
  const date = scorecard.generatedAt ? new Date(scorecard.generatedAt).toLocaleDateString() : new Date().toLocaleDateString();
  let tY=0, tN=0, tP=0, tU=0, total=0;
  cats.forEach(c => c.results.forEach(r => { total++; if(r.value==='Yes') tY++; else if(r.value==='No') tN++; else if(r.value==='Partial') tP++; else tU++; }));
  const pct = Math.round(((tY + tP*0.5) / total) * 100);
  const stars = pct >= 80 ? 3 : pct >= 50 ? 2 : pct >= 25 ? 1 : 0;

  document.getElementById('subtitle').textContent = repo + ' \\u00b7 Generated ' + date;
  document.getElementById('criteriaCount').textContent = total;
  document.getElementById('stars').innerHTML = Array.from({length:3}, (_,i) => '<span class="'+(i<stars?'star-filled':'star-empty')+'">\\u2605</span>').join('');
  document.getElementById('summary').innerHTML = card(pct+'%','Overall','c-overall')+card(tY,'Yes','c-yes')+card(tP,'Partial','c-partial')+card(tN,'No','c-no')+card(tU,'Unknown','c-unknown');

  let html = '';
  cats.forEach((cat, ci) => {
    const cY = cat.results.filter(r=>r.value==='Yes').length;
    const cP = cat.results.filter(r=>r.value==='Partial').length;
    const cPct = Math.round(((cY+cP*0.5)/cat.results.length)*100);
    const cStars = cPct>=80?3:cPct>=50?2:cPct>=25?1:0;
    let rows = '';
    cat.results.forEach(r => {
      const key = cat.name+'::'+r.criterion;
      const ctx = context[key]||'';
      rows += '<tr data-value="'+esc(r.value)+'" data-hasctx="'+(ctx?'has':'none')+'" data-criterion="'+esc(r.criterion.toLowerCase())+'">' +
        '<td class="criterion-cell">'+esc(r.criterion)+'<br><button class="context-toggle" onclick="toggleCtx(this)">'+(ctx?'\\ud83d\\udcdd Edit context':'+ Add context')+'</button><div class="context-area"><textarea data-key="'+esc(key)+'" oninput="markDirty()" placeholder="Add context for re-evaluation...">'+esc(ctx)+'</textarea></div></td>' +
        '<td class="value-cell"><span class="badge badge-'+r.value+'">'+r.value+'</span></td>' +
        '<td class="reasoning-cell">'+esc(r.reasoning||'')+'</td></tr>';
    });
    html += '<div class="category" data-cat="'+ci+'"><div class="category-header" onclick="toggleCat('+ci+')"><h2>'+esc(cat.name)+'</h2><div class="cat-meta"><span class="cat-stars">'+starIcons(cStars)+'</span><span class="category-score">'+cPct+'%</span></div></div><div class="category-body" id="catBody'+ci+'"><table><thead><tr><th>Criterion</th><th>Result</th><th>Reasoning</th></tr></thead><tbody>'+rows+'</tbody></table></div></div>';
  });
  document.getElementById('categories').innerHTML = html;
  applyFilters();
}

function card(n,l,c) { return '<div class="summary-card"><div class="number '+c+'">'+n+'</div><div class="label">'+l+'</div></div>'; }
function starIcons(n) { return Array.from({length:3},(_,i)=>'<span class="'+(i<n?'star-filled':'star-empty')+'">\\u2605</span>').join(''); }
function esc(s) { return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
function toggleCat(i) { document.getElementById('catBody'+i).classList.toggle('collapsed'); }
function toggleCtx(btn) { const a=btn.nextElementSibling; a.classList.toggle('open'); if(a.classList.contains('open')) a.querySelector('textarea').focus(); }

function setFilter(group, btn) {
  btn.parentElement.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  activeFilters[group] = btn.dataset.filter;
  applyFilters();
}

function applyFilters() {
  const s = document.getElementById('search').value.toLowerCase();
  document.querySelectorAll('tr[data-value]').forEach(tr => {
    let show = true;
    if (activeFilters.result!=='all' && tr.dataset.value!==activeFilters.result) show=false;
    if (activeFilters.context!=='all' && tr.dataset.hasctx!==activeFilters.context) show=false;
    if (s && !tr.dataset.criterion.includes(s)) show=false;
    tr.classList.toggle('hidden',!show);
  });
  document.querySelectorAll('.category').forEach(cat => { cat.classList.toggle('hidden', cat.querySelectorAll('tr[data-value]:not(.hidden)').length===0); });
}

function markDirty() { dirty=true; document.getElementById('saveBar').classList.add('visible'); }

async function saveContext() {
  const ctx = {};
  document.querySelectorAll('.context-area textarea').forEach(ta => { if(ta.value.trim()) ctx[ta.dataset.key]=ta.value.trim(); });
  context = ctx;
  try {
    await fetch('/api/context',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(ctx)});
    dirty=false;
    document.getElementById('saveBar').classList.remove('visible');
    showToast('\\u2705 Context saved! Return to Copilot CLI: "Re-evaluate the scorecard with the additional context"');
    document.querySelectorAll('tr[data-value]').forEach(tr => {
      const ta=tr.querySelector('textarea'); if(ta) tr.dataset.hasctx=ta.value.trim()?'has':'none';
      const btn=tr.querySelector('.context-toggle'); if(btn) btn.textContent=ta&&ta.value.trim()?'\\ud83d\\udcdd Edit context':'+ Add context';
    });
  } catch(e) { showToast('\\u274c Error: '+e.message); }
}

function showToast(msg) { const t=document.getElementById('toast'); t.textContent=msg; t.classList.add('show'); setTimeout(()=>t.classList.remove('show'),4000); }

setInterval(async()=>{try{const r=await fetch('/api/scorecard');if(r.ok){const t=await r.text();if(t!==lastJSON){lastJSON=t;scorecard=JSON.parse(t);render();showToast('\\ud83d\\udd04 Scorecard updated!');}}}catch{}},2000);
load().then(()=>{lastJSON=JSON.stringify(scorecard);});
</script>
</body>
</html>`;
}

const server = createServer((req, res) => {
	const url = new URL(req.url, 'http://localhost');
	if (req.method==='GET' && url.pathname==='/api/scorecard') { const d=readJSON(SCORECARD_FILE); res.writeHead(d?200:404,{'Content-Type':'application/json','Access-Control-Allow-Origin':'*'}); res.end(JSON.stringify(d||{error:'scorecard.json not found'})); return; }
	if (req.method==='GET' && url.pathname==='/api/context') { res.writeHead(200,{'Content-Type':'application/json','Access-Control-Allow-Origin':'*'}); res.end(JSON.stringify(readJSON(CONTEXT_FILE)||{})); return; }
	if (req.method==='POST' && url.pathname==='/api/context') { let b=''; req.on('data',c=>{b+=c;}); req.on('end',()=>{ try{writeFileSync(CONTEXT_FILE,JSON.stringify(JSON.parse(b),null,2));res.writeHead(200,{'Content-Type':'application/json','Access-Control-Allow-Origin':'*'});res.end('{"ok":true}');}catch(e){res.writeHead(400);res.end(JSON.stringify({error:e.message}));}}); return; }
	if (req.method==='OPTIONS') { res.writeHead(204,{'Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'GET,POST','Access-Control-Allow-Headers':'Content-Type'}); res.end(); return; }
	res.writeHead(200,{'Content-Type':'text/html'}); res.end(getHTML());
});

server.listen(PORT, () => {
	console.log('\\n  ★ AI Scorecard Server');
	console.log('  http://localhost:' + PORT);
	console.log('  Watching: ' + SCORECARD_FILE + '\\n');
});
