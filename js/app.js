const TABS = [['c', 'Conteúdo', 'book', 'topics'], ['e', 'Exemplos', 'flask', 'examples'], ['a', 'Atividades', 'pencil', 'activities'], ['d', 'Desafios', 'trophy', 'challenges']];
const mod = (id) => MODULES.find((m) => m.id === id);
const qid = (m, i) => m.id + '-d' + i;
const norm = (s) => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
function prog(m) {
  let ok = 0, bad = 0;
  m.challenges.forEach((q, i) => { const a = ANS[qid(m, i)]; if (a != null) { if (a === q.c) ok++; else bad++; } });
  return { ok, bad, tot: m.challenges.length };
}
function allProg() { return MODULES.reduce((s, m) => { const p = prog(m); return { ok: s.ok + p.ok, bad: s.bad + p.bad, tot: s.tot + p.tot }; }, { ok: 0, bad: 0, tot: 0 }); }
const plural = (n, k) => ({ c: ['tópico', 'tópicos'], e: ['exemplo', 'exemplos'], a: ['atividade', 'atividades'], d: ['questão', 'questões'] }[k][n === 1 ? 0 : 1]);
const dots = (m) => `<div class="dots" aria-hidden="true">${m.challenges.map((q, i) => { const a = ANS[qid(m, i)]; return `<i class="${a == null ? '' : a === q.c ? 'ok' : 'bad'}"></i>`; }).join('')}</div>`;

/* ---------- casca ---------- */
function buildShell() {
  $('#app').innerHTML = `
  <header class="top">
    <button class="iconbtn menu-btn" id="menu" aria-label="Abrir menu dos módulos">${ic('menu')}</button>
    <a class="brand" href="#/">${ic('db', 26)}<b>ENADE Quest</b><small>Banco de Dados</small></a>
    <div class="search">${ic('search', 18)}<input id="q" type="search" placeholder="Buscar: ACID, cardinalidade, junção…" autocomplete="off" aria-label="Buscar em todos os módulos"><div class="results" id="res" role="listbox"></div></div>
    <button class="iconbtn" id="theme" aria-label="Alternar tema claro e escuro"></button>
  </header>
  <div class="scrim" id="scrim"></div>
  <div class="app">
    <nav class="side" id="side" aria-label="Módulos"></nav>
    <main id="view" tabindex="-1"></main>
  </div>`;
  $('#menu').onclick = () => toggleSide();
  $('#scrim').onclick = () => toggleSide(false);
  $('#theme').onclick = () => setTheme(document.documentElement.dataset.theme === 'dark' || (!document.documentElement.dataset.theme && matchMedia('(prefers-color-scheme: dark)').matches) ? 'light' : 'dark');
  syncThemeIcon();
  buildSide();
  const inp = $('#q'), res = $('#res');
  inp.addEventListener('input', () => {
    const v = norm(inp.value.trim());
    if (v.length < 2) { res.classList.remove('on'); return; }
    const hits = INDEX.filter((x) => x.n.includes(v)).slice(0, 9);
    res.innerHTML = hits.length ? hits.map((h) => `<a href="${h.href}" role="option"><b>${h.title}</b><small>${h.where}</small></a>`).join('') : '<div class="empty">Nada encontrado. Tente outra palavra.</div>';
    res.classList.add('on');
  });
  res.addEventListener('click', () => { res.classList.remove('on'); inp.value = ''; });
  document.addEventListener('click', (e) => { if (!e.target.closest('.search')) res.classList.remove('on'); });
}
function toggleSide(on) { const s = $('#side'); const v = on == null ? !s.classList.contains('on') : on; s.classList.toggle('on', v); $('#scrim').classList.toggle('on', v); }
function setTheme(t) { document.documentElement.dataset.theme = t; store.set('eq_theme', t); syncThemeIcon(); }
function syncThemeIcon() { const dark = document.documentElement.dataset.theme === 'dark' || (!document.documentElement.dataset.theme && matchMedia('(prefers-color-scheme: dark)').matches); $('#theme').innerHTML = ic(dark ? 'sun' : 'moon'); }
function buildSide() {
  const cur = (location.hash.split('/')[1] || '');
  $('#side').innerHTML = `<a class="homelink" href="#/">${ic('home')} Início</a><h2>Trilha de aulas</h2><ol class="trail">${MODULES.map((m) => `<li data-acc="${m.acc}"><a href="#/${m.id}/c" ${cur === m.id ? 'aria-current="page"' : ''}><span class="nb">${m.n}</span><span class="nm">${m.short}<small>${m.src}</small>${dots(m)}</span></a></li>`).join('')}</ol>`;
  $$('#side a').forEach((a) => a.addEventListener('click', () => toggleSide(false)));
}

/* ---------- índice de busca ---------- */
let INDEX = [];
function buildIndex() {
  const strip = (h) => h.replace(/<[^>]+>/g, ' ').replace(/&[a-z]+;/g, ' ');
  MODULES.forEach((m) => {
    m.topics.forEach((t, i) => INDEX.push({ title: t.t, where: `${m.src} · Conteúdo`, href: `#/${m.id}/c/${i}`, n: norm(t.t + ' ' + strip(t.h)) }));
    m.examples.forEach((t, i) => INDEX.push({ title: t.t, where: `${m.src} · Exemplo prático`, href: `#/${m.id}/e/${i}`, n: norm(t.t + ' ' + strip(t.d || '')) }));
    m.activities.forEach((t, i) => INDEX.push({ title: t.t, where: `${m.src} · Atividade`, href: `#/${m.id}/a/${i}`, n: norm(t.t + ' ' + strip(t.d || '') + ' ' + (t.items ? t.items.map((x) => x[0] + ' ' + strip(x[1])).join(' ') : '')) }));
  });
}

/* ---------- home ---------- */
let flashPick = null;
function renderHome() {
  document.title = 'ENADE Quest · Revisão de Banco de Dados';
  const ap = allProg();
  const first = MODULES.find((m) => prog(m).ok + prog(m).bad < prog(m).tot) || MODULES[0];
  $('#view').innerHTML = `
  <section class="hero">
    <div>
      <h1>Revise Banco de Dados para o ENADE, uma aula por vez</h1>
      <p>Seis módulos, um por aula. Cada um traz o conteúdo dos slides, exemplos que você pode mexer, atividades com correção e desafios no formato de prova.</p>
      <div class="btnrow"><a class="btn" href="#/${first.id}/c">${ap.ok + ap.bad ? 'Continuar de onde parei' : 'Começar pela Aula 1'}</a><a class="btn ghost" href="#/a5l/e">Ir direto ao laboratório de álgebra</a></div>
      <p style="margin:16px 0 0;font-size:.95rem">Você respondeu <b>${ap.ok + ap.bad}</b> de <b>${ap.tot}</b> desafios e acertou <b>${ap.ok}</b>.</p>
    </div>
    <div class="gifbox"><img src="${GIF.bounce}" alt="Banco de dados animado quicando"></div>
  </section>
  <section class="flash" aria-labelledby="fl"><h2 id="fl">${ic('bolt')} Questão relâmpago</h2><div id="flq"></div><div style="margin:0 0 6px"><button class="smallbtn" id="fln">Sortear outra questão</button></div></section>
  <h2 class="sec">Módulos</h2>
  <div class="mods">${MODULES.map((m) => { const p = prog(m); return `<a class="mcard" data-acc="${m.acc}" href="#/${m.id}/c"><div style="display:flex;gap:12px;align-items:center"><span class="nb lg">${m.n}</span><div><h3>${m.short}</h3><small style="color:var(--muted)">${m.src}</small></div></div><p>${m.blurb}</p><div class="stats"><span class="chip">${m.topics.length} tópicos</span><span class="chip">${m.examples.length} exemplos</span><span class="chip">${m.activities.length} atividades</span><span class="chip">${p.tot} desafios</span></div>${dots(m)}</a>`; }).join('')}</div>
  <h2 class="sec">Como cada módulo funciona</h2>
  <div class="how"><div><b>${ic('book', 18)} Conteúdo</b>O que cada slide ensina, em tópicos que abrem e fecham.</div><div><b>${ic('flask', 18)} Exemplos</b>Simuladores e casos resolvidos para você mexer.</div><div><b>${ic('pencil', 18)} Atividades</b>Exercícios com resposta na hora ou para conferir depois.</div><div><b>${ic('trophy', 18)} Desafios</b>Questões no estilo ENADE com gabarito comentado.</div></div>
  <footer>Material baseado nos slides das Aulas 1 a 5 de Modelagem e Projeto de Banco de Dados. As questões dos desafios são autorais, escritas para esta revisão.</footer>`;
  const drawFlash = (again) => {
    if (!flashPick || again) { const pool = []; MODULES.forEach((m) => m.challenges.forEach((q, i) => pool.push([m, q, i]))); flashPick = pool[Math.floor(Math.random() * pool.length)]; }
    const [m, q, i] = flashPick;
    $('#flq').innerHTML = `<div class="q-head"><span>${m.src} · ${m.short}</span></div><div id="flm"></div>`;
    renderMCQ($('#flm'), q, qid(m, i), () => { buildSide(); });
  };
  drawFlash(false);
  $('#fln').onclick = () => drawFlash(true);
}

/* ---------- módulo ---------- */
function renderModule(m, tab, idx) {
  document.title = `${m.src} · ${m.short} · ENADE Quest`;
  const tabDef = TABS.find((t) => t[0] === tab) || TABS[0];
  const idxNum = idx == null ? null : +idx;
  const k = MODULES.indexOf(m), prev = MODULES[k - 1], next = MODULES[k + 1];
  $('#view').innerHTML = `<div data-acc="${m.acc}">
    <div class="mhead"><span class="nb lg">${m.n}</span><div><h1>${m.title}</h1><div class="src">${m.src}</div></div></div>
    <p class="blurb">${m.blurb}</p>
    <nav class="tabs" role="tablist">${TABS.map((t) => `<a class="tab" role="tab" aria-selected="${t[0] === tabDef[0]}" href="#/${m.id}/${t[0]}">${ic(t[2], 20)}${t[1]}<span>${m[t[3]].length} ${plural(m[t[3]].length, t[0])}</span></a>`).join('')}</nav>
    <div id="panel"></div>
    <div class="pager">${prev ? `<a href="#/${prev.id}/c"><small>Módulo anterior</small><b>${prev.src}: ${prev.short}</b></a>` : '<span></span>'}${next ? `<a class="nx" href="#/${next.id}/c"><small>Próximo módulo</small><b>${next.src}: ${next.short}</b></a>` : ''}</div></div>`;
  const P = $('#panel');
  if (tabDef[0] === 'c') {
    let html = `<div class="toolbar"><button class="smallbtn" id="xa">Abrir todos</button><button class="smallbtn" id="xc">Fechar todos</button></div>`, lastG = null;
    m.topics.forEach((t, i) => {
      if (t.g && t.g !== lastG) { html += `<h2 class="group">${t.g}</h2>`; lastG = t.g; }
      html += `<details class="topic" id="t${i}" ${i === idxNum ? 'open' : ''}><summary><span>${t.t}</span>${ic('chev', 18)}</summary><div class="prose">${t.h}</div></details>`;
    });
    P.innerHTML = html;
    $('#xa').onclick = () => $$('details.topic', P).forEach((d) => (d.open = true));
    $('#xc').onclick = () => $$('details.topic', P).forEach((d) => (d.open = false));
  } else if (tabDef[0] === 'e') {
    P.innerHTML = m.examples.map((e, i) => `<section class="lab" id="e${i}"><h3>${e.t}</h3><p class="lead">${e.d || ''}</p><div class="body" id="eb${i}"></div></section>`).join('');
    m.examples.forEach((e, i) => e.mount($('#eb' + i)));
  } else if (tabDef[0] === 'a') {
    P.innerHTML = m.activities.map((a, i) => `<section class="lab" id="a${i}"><h3>${a.t}</h3><p class="lead">${a.d || ''}</p><div class="body" id="ab${i}"></div></section>`).join('');
    m.activities.forEach((a, i) => {
      const el = $('#ab' + i);
      if (a.kind === 'classify') renderClassify(el, a.cfg);
      else if (a.kind === 'check') renderChecklist(el, a.cfg);
      else if (a.kind === 'qa') el.innerHTML = a.items.map((x) => qa(x[0], x[1])).join('');
      else el.innerHTML = a.html || '';
    });
  } else {
    const p = prog(m);
    P.innerHTML = `<div class="score" id="sc"></div>${m.challenges.map((q, i) => `<article class="q" id="d${i}"><div class="q-head"><span>Questão ${i + 1} de ${m.challenges.length}</span><span>${q.tag || 'Questão autoral'}</span></div><div class="qb"></div></article>`).join('')}`;
    const upd = () => { const p2 = prog(m); const done = p2.ok + p2.bad; $('#sc').innerHTML = `<b>${p2.ok} de ${p2.tot} certas</b><div class="bar"><i style="width:${p2.tot ? p2.ok / p2.tot * 100 : 0}%"></i></div><span>${done} respondidas</span><button class="smallbtn" id="rst">${ic('refresh', 14)} Zerar módulo</button>`; $('#rst').onclick = () => { m.challenges.forEach((_, i) => delete ANS[qid(m, i)]); saveAns(); renderModule(m, 'd'); buildSide(); }; buildSide(); };
    m.challenges.forEach((q, i) => renderMCQ($$('.qb', P)[i], q, qid(m, i), upd));
    upd();
  }
  if (idxNum != null) {
    const target = $('#' + ({ c: 't' }[tabDef[0]] || tabDef[0]) + idxNum);
    if (target) setTimeout(() => target.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60);
  } else window.scrollTo(0, 0);
}

function route() {
  const parts = location.hash.replace(/^#\/?/, '').split('/').filter(Boolean);
  const m = parts[0] && mod(parts[0]);
  buildSide();
  if (!m) renderHome(); else renderModule(m, parts[1] || 'c', parts[2]);
}
function boot() {
  const t = store.get('eq_theme', null); if (t) document.documentElement.dataset.theme = t;
  buildShell(); buildIndex();
  window.addEventListener('hashchange', route);
  route();
}
