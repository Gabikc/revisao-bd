'use strict';
const MODULES = [];
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const store = {
  get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* sem armazenamento: segue em memória */ } },
};
let ANS = store.get('eq_ans_v1', {});
const saveAns = () => store.set('eq_ans_v1', ANS);

const ICONS = {
  menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  moon: '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>',
  chev: '<path d="M6 9l6 6 6-6"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>',
  book: '<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2V5zM4 19a2 2 0 0 1 2-2h13"/>',
  flask: '<path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3"/>',
  pencil: '<path d="M4 20l4-1 11-11-3-3L5 16l-1 4zM14 6l3 3"/>',
  trophy: '<path d="M8 4h8v5a4 4 0 0 1-8 0V4zM8 6H4v1a3 3 0 0 0 4 3M16 6h4v1a3 3 0 0 1-4 3M12 13v4M8 21h8M10 17h4"/>',
  home: '<path d="M3 11l9-8 9 8M5 10v10h14V10"/>',
  refresh: '<path d="M20 11a8 8 0 1 0-2.3 5.7M20 4v7h-7"/>',
  left: '<path d="M15 6l-6 6 6 6"/>', right: '<path d="M9 6l6 6-6 6"/>',
  db: '<ellipse cx="12" cy="6" rx="8" ry="3"/><path d="M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/>',
  bolt: '<path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z"/>',
};
const ic = (n, s = 20) => `<svg class="ic" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[n]}</svg>`;

/* ---------- blocos de conteúdo ---------- */
const tip = (t, l = 'Cai no ENADE') => `<div class="callout"><b>${l}</b><div>${t}</div></div>`;
const trap = (t, l = 'Pegadinha') => `<div class="callout trap"><b>${l}</b><div>${t}</div></div>`;
const note = (t, l = 'Anotação') => `<div class="callout note"><b>${l}</b><div>${t}</div></div>`;
const boxes = (arr, cls = 'grid2') => `<div class="${cls}">${arr.map((b) => `<div class="box"><b class="h">${b[0]}</b><p>${b[1]}</p></div>`).join('')}</div>`;
const ul = (a) => `<ul>${a.map((x) => `<li>${x}</li>`).join('')}</ul>`;
const ol = (a) => `<ol>${a.map((x) => `<li>${x}</li>`).join('')}</ol>`;
function T(headers, rows, o = {}) {
  const hl = o.hl || [], dim = o.dim || [];
  return (o.cap ? `<div class="tbl-cap">${o.cap}</div>` : '') + `<div class="tblwrap"><table><thead><tr>${headers.map((h) => `<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.map((r, i) => `<tr class="${hl.includes(i) ? 'hl' : ''} ${dim.includes(i) ? 'dim' : ''}">${r.map((c) => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
}
const code = (s) => `<pre class="code">${s}</pre>`;
/* esquema relacional: '*col' = PK, '^col' = FK */
function sch(name, cols, refs = []) {
  const c = cols.map((x) => (x.startsWith('*^') ? `<u class="fk">${x.slice(2)}</u>` : x[0] === '*' ? `<u>${x.slice(1)}</u>` : x[0] === '^' ? `<span class="fk">${x.slice(1)}</span>` : x)).join(', ');
  return `<div class="sch"><div class="l">${name}(${c})</div>${refs.map((r) => `<div class="r">${r}</div>`).join('')}</div>`;
}
const flow = (a) => `<div class="flow">${a.map((x, i) => (i ? '<span class="ar">' + ic('right', 16) + '</span>' : '') + `<span class="n">${x}</span>`).join('')}</div>`;
const qa = (q, a) => `<details class="qa"><summary><span>${q}</span>${ic('chev', 18)}</summary><div class="qa-a">${a}</div></details>`;

/* ---------- diagrama E-R (SVG) ---------- */
function edgePt(n, tx, ty) {
  const dx = tx - n.x, dy = ty - n.y;
  if (!dx && !dy) return [n.x, n.y];
  const hw = n.w / 2, hh = n.h / 2;
  let k;
  if (n.t === 'a' || n.t === 'g') k = 1 / Math.sqrt((dx * dx) / (hw * hw) + (dy * dy) / (hh * hh));
  else if (n.t === 'r') k = 1 / (Math.abs(dx) / hw + Math.abs(dy) / hh);
  else k = Math.min(hw / Math.max(Math.abs(dx), 1e-9), hh / Math.max(Math.abs(dy), 1e-9));
  return [n.x + dx * k, n.y + dy * k];
}
function cardLabel(p, q, txt) {
  const dx = q[0] - p[0], dy = q[1] - p[1], d = Math.hypot(dx, dy) || 1, ux = dx / d, uy = dy / d;
  let px = -uy, py = ux;
  if (Math.abs(uy) > 0.75) { if (px < 0) { px = -px; py = -py; } } else if (py > 0) { px = -px; py = -py; }
  const x = p[0] + ux * 24 + px * 12, y = p[1] + uy * 24 + py * 12;
  return `<text class="card" x="${x.toFixed(1)}" y="${(y + 4).toFixed(1)}" text-anchor="middle">${txt}</text>`;
}
function er(spec) {
  const step = spec.step == null ? 99 : spec.step;
  const W = spec.w || 600, H = spec.h || 200, N = {};
  spec.nodes.forEach((n0) => {
    let n = Object.assign({ s: 1 }, n0);
    if (n.up && step >= n.up[0]) n = Object.assign(n, n.up[1]);
    if (n.ws != null && step >= n.ws) n.t = 'w';
    const L = (n.l || '').split('\n').reduce((a, b) => Math.max(a, b.length), 0);
    if (!n.w) n.w = n.t === 'e' || n.t === 'w' ? Math.max(96, L * 9 + 30) : n.t === 'r' ? Math.max(92, L * 8.6 + 46) : n.t === 'a' ? Math.max(58, L * 6.8 + 22) : n.t === 'g' ? 26 : 100;
    if (!n.h) n.h = n.t === 'e' ? 44 : n.t === 'w' ? 48 : n.t === 'r' ? 54 : n.t === 'a' ? 28 : n.t === 'g' ? 26 : 60;
    N[n.id] = n;
  });
  const vis = (n) => n && n.s <= step;
  let boxes = '', lines = '', shapes = '', labels = '';
  const showLab = step >= (spec.ls == null ? 0 : spec.ls);
  spec.edges.forEach((e) => {
    const [a, b, la, lb, o = {}] = e;
    const A = N[a], B = N[b];
    if (!vis(A) || !vis(B) || (o.s || 0) > step) return;
    const thin = A.t === 'a' || B.t === 'a' ? ' thin' : '';
    let p0, p1, mid;
    if (o.via) {
      p0 = edgePt(A, o.via[0], o.via[1]); p1 = edgePt(B, o.via[0], o.via[1]);
      lines += `<path class="ln${thin}" d="M${p0[0].toFixed(1)} ${p0[1].toFixed(1)} L${o.via[0]} ${o.via[1]} L${p1[0].toFixed(1)} ${p1[1].toFixed(1)}"/>`;
      if (showLab && la) labels += cardLabel(p0, o.via, la);
      if (showLab && lb) labels += cardLabel(p1, o.via, lb);
    } else {
      p0 = edgePt(A, B.x, B.y); p1 = edgePt(B, A.x, A.y);
      lines += `<line class="ln${thin}" x1="${p0[0].toFixed(1)}" y1="${p0[1].toFixed(1)}" x2="${p1[0].toFixed(1)}" y2="${p1[1].toFixed(1)}"/>`;
      if (showLab && la) labels += cardLabel(p0, p1, la);
      if (showLab && lb) labels += cardLabel(p1, p0, lb);
    }
  });
  Object.values(N).forEach((n) => {
    if (!vis(n)) return;
    const x = n.x, y = n.y, w = n.w, h = n.h, lines_ = (n.l || '').split('\n');
    const tx = (cls, dy = 5) => lines_.map((t, i) => `<tspan x="${x}" dy="${i ? 15 : dy - (lines_.length - 1) * 7.5}">${t}</tspan>`).join('');
    if (n.t === 'e') shapes += `<rect class="ent" x="${x - w / 2}" y="${y - h / 2}" width="${w}" height="${h}"/><text class="entT" y="${y}">${tx('entT')}</text>`;
    else if (n.t === 'w') shapes += `<rect class="ent" x="${x - w / 2}" y="${y - h / 2}" width="${w}" height="${h}" style="stroke:var(--cor)"/><rect class="weak" x="${x - w / 2 + 5}" y="${y - h / 2 + 5}" width="${w - 10}" height="${h - 10}"/><text class="entT" y="${y}">${tx('entT')}</text>`;
    else if (n.t === 'r') shapes += `<polygon class="rel" points="${x},${y - h / 2} ${x + w / 2},${y} ${x},${y + h / 2} ${x - w / 2},${y}"/><text class="relT" y="${y}">${tx('relT')}</text>`;
    else if (n.t === 'a') {
      const dash = n.d ? ' stroke-dasharray="4 3"' : '', und = n.k ? ' text-decoration="underline"' : n.p ? ' text-decoration="underline" style="text-decoration-style:dashed"' : '';
      shapes += `${n.m ? `<ellipse class="att2" cx="${x}" cy="${y}" rx="${w / 2 + 4}" ry="${h / 2 + 4}"/>` : ''}<ellipse class="att" cx="${x}" cy="${y}" rx="${w / 2}" ry="${h / 2}"${dash}/><text class="attT" x="${x}" y="${y + 4}"${und}>${n.l}</text>`;
    } else if (n.t === 'g') shapes += `<circle class="gen" cx="${x}" cy="${y}" r="13"/><text class="genT" x="${x}" y="${y + 5}">${n.l}</text>`;
    else if (n.t === 'box') boxes += `<rect class="agg" x="${x - w / 2}" y="${y - h / 2}" width="${w}" height="${h}" rx="10"/><text class="aggT" x="${x - w / 2 + 10}" y="${y - h / 2 + 16}">${n.l}</text>`;
    else if (n.t === 'cap') shapes += `<text class="cap" x="${x}" y="${y}">${n.l}</text>`;
  });
  const svg = `<svg class="er" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(spec.alt || 'Diagrama entidade-relacionamento')}" xmlns="http://www.w3.org/2000/svg">${boxes}${lines}${shapes}${labels}</svg>`;
  return `<div class="erwrap"><div class="ern" style="min-width:${Math.min(W, spec.minw || 520)}px">${svg}</div></div>`;
}
/* diagrama binário rápido: A -R- B. atributos: '*k' chave, '~d' derivado, '+m' multivalorado */
function bin(A, B, R, ca, cb, o = {}) {
  const nodes = [{ id: 'A', t: 'e', l: A, x: 110, y: 66 }, { id: 'R', t: 'r', l: R, x: 300, y: 66 }, { id: 'B', t: 'e', l: B, x: 490, y: 66 }];
  const edges = [['A', 'R', ca], ['R', 'B', '', cb]];
  const add = (list, id, bx) => (list || []).forEach((s, i, arr) => {
    const f = s[0], k = '*~+'.includes(f), l = k ? s.slice(1) : s, nid = id + i;
    nodes.push({ id: nid, t: 'a', l, k: f === '*', d: f === '~', m: f === '+', x: bx + (i - (arr.length - 1) / 2) * 104, y: id === 'r' ? 148 : 148 });
    edges.push([id === 'r' ? 'R' : id.toUpperCase(), nid]);
  });
  add(o.aA, 'a', 110); add(o.aR, 'r', 300); add(o.aB, 'b', 490);
  return er({ w: 600, h: (o.aA || o.aR || o.aB) ? 176 : 118, nodes, edges, alt: `${A} ${R} ${B}` });
}

/* ---------- quiz de múltipla escolha ---------- */
function renderMCQ(el, q, id, onChange) {
  const draw = () => {
    const a = ANS[id];
    const done = a != null;
    el.innerHTML = `<div class="q-stem">${q.stem}</div><div class="opts">${q.opts.map((o, i) => {
      const cls = done ? (i === q.c ? 'ok' : (i === a ? 'bad' : '')) : '';
      return `<button class="opt ${cls}" data-i="${i}" ${done ? 'disabled' : ''}><span class="bub">${'ABCDE'[i]}</span><span class="opt-t">${o}</span></button>`;
    }).join('')}</div>${done ? `<div class="fb"><b class="res">${a === q.c ? 'Correto!' : 'Não foi dessa vez. A resposta é a letra ' + 'ABCDE'[q.c] + '.'}</b>${q.e}${q.w ? ul(q.w) : ''}<button class="smallbtn again">Tentar de novo</button></div>` : ''}`;
    $$('.opt', el).forEach((b) => b.addEventListener('click', () => { ANS[id] = +b.dataset.i; saveAns(); draw(); onChange && onChange(); }));
    const ag = $('.again', el);
    if (ag) ag.addEventListener('click', () => { delete ANS[id]; saveAns(); draw(); onChange && onChange(); });
  };
  draw();
}
/* ---------- classificar itens ---------- */
function renderClassify(el, cfg) {
  const st = {}; let right = 0, tot = 0;
  el.innerHTML = `${cfg.intro ? `<p class="lead" style="margin-top:0;color:var(--muted)">${cfg.intro}</p>` : ''}${cfg.items.map((it, i) => `<div class="cls-row" data-i="${i}"><div class="cls-t">${it.t}</div><div class="cls-c">${cfg.choices.map((c, j) => `<button class="pick" data-j="${j}">${c}</button>`).join('')}</div><div class="cls-why" hidden></div></div>`).join('')}<div class="score" style="margin:12px 0 0"><span id="sc">0 de ${cfg.items.length} respondidas</span><button class="smallbtn" id="rs">Recomeçar</button></div>`;
  $$('.cls-row', el).forEach((row) => {
    const it = cfg.items[+row.dataset.i];
    $$('.pick', row).forEach((b) => b.addEventListener('click', () => {
      if (st[row.dataset.i] != null) return;
      const j = +b.dataset.j; st[row.dataset.i] = j; tot++;
      $$('.pick', row).forEach((x, k) => { x.disabled = true; if (k === it.a) x.classList.add('ok'); else if (k === j) x.classList.add('bad'); });
      if (j === it.a) right++;
      const w = $('.cls-why', row); w.hidden = false; w.innerHTML = (j === it.a ? '<b>Certo.</b> ' : `<b>Resposta: ${cfg.choices[it.a]}.</b> `) + (it.why || '');
      $('#sc', el).textContent = `${right} acertos em ${tot} de ${cfg.items.length}`;
    }));
  });
  $('#rs', el).addEventListener('click', () => renderClassify(el, cfg));
}
/* ---------- checklist de autoavaliação ---------- */
function renderChecklist(el, cfg) {
  el.innerHTML = `${cfg.intro ? `<p style="margin-top:0;color:var(--muted)">${cfg.intro}</p>` : ''}${cfg.items.map((t, i) => `<label class="chk"><input type="checkbox" data-i="${i}"><span>${t}</span></label>`).join('')}<div class="score" style="margin:12px 0 0"><span id="cs">0 de ${cfg.items.length} itens conferidos</span><div class="bar"><i style="width:0%"></i></div></div>`;
  $$('input', el).forEach((c) => c.addEventListener('change', () => {
    const n = $$('input:checked', el).length; $('#cs', el).textContent = `${n} de ${cfg.items.length} itens conferidos`;
    $('.bar i', el).style.width = (n / cfg.items.length * 100) + '%';
  }));
}
/* ---------- passo a passo ---------- */
function renderStepper(el, cfg) {
  let i = 0;
  const draw = () => {
    const s = cfg.steps[i];
    el.innerHTML = `<div class="stepbar"><button class="smallbtn" id="pv" ${i === 0 ? 'disabled' : ''}>${ic('left', 16)} Anterior</button><div class="stepdots">${cfg.steps.map((_, k) => `<i class="${k <= i ? 'on' : ''}"></i>`).join('')}</div><button class="smallbtn" id="nx" ${i === cfg.steps.length - 1 ? 'disabled' : ''}>Próximo ${ic('right', 16)}</button></div><div class="stepinfo"><b>${i + 1}. ${s.t}</b><div>${s.d}</div></div>${cfg.render(i + 1)}`;
    $('#pv', el).onclick = () => { i--; draw(); };
    $('#nx', el).onclick = () => { i++; draw(); };
  };
  draw();
}
