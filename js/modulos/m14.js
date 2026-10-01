(function () {
  const CARGO = [['001', 'Programador'], ['002', 'Secretaria'], ['003', 'Ux Designer'], ['004', 'Designer']];
  const FUN = [['001', 'Maria', '002'], ['002', 'João', '001'], ['003', 'José', '004'], ['004', 'Pedro', '001']];
  const FUN_X = FUN.concat([['005', 'Lia', null]]); // acréscimo: funcionária sem cargo, para ilustrar RIGHT e FULL
  const A = [['001', 'Maria'], ['002', 'Luiz']], B = [['002', 'Luiz'], ['003', 'Tadeu']];
  const nul = (v) => (v === null ? '<span class="null">NULL</span>' : v);

  MODULES.push({
    id: 'a14', n: '14', acc: 'cor', grp: 'SQL na prática', src: 'Aula 14', short: 'Joins e conjuntos',
    title: 'Joins externos e operações com conjuntos',
    blurb: 'Quando a junção comum perde linhas: LEFT, RIGHT e FULL OUTER JOIN. E como combinar resultados de consultas com UNION, UNION ALL, INTERSECT e MINUS.',
    topics: [
      { g: 'Junções externas', t: 'Da junção interna à externa', h:
        `<p>A junção comum (<b>INNER JOIN</b>) devolve só as linhas que têm correspondência nas duas tabelas. As tuplas sem par são perdidas.</p>` +
        `<p>A <b>junção externa</b> (OUTER JOIN) funciona de forma semelhante, mas <b>preserva as tuplas que seriam perdidas</b>, criando no resultado tuplas com valores nulos. Pode ser <b>LEFT</b>, <b>RIGHT</b> ou <b>FULL</b>.</p>` +
        T(['Tipo', 'Preserva'], [['INNER JOIN', 'Só os pares que combinam'], ['LEFT (OUTER) JOIN', 'Todas as linhas da tabela à esquerda'], ['RIGHT (OUTER) JOIN', 'Todas as linhas da tabela à direita'], ['FULL (OUTER) JOIN', 'Todas as linhas das duas tabelas']]) },
      { t: 'LEFT OUTER JOIN', h:
        `<p>Preserva as tuplas somente da relação nomeada <b>antes</b> (à esquerda) da operação.</p>` +
        `<div class="grid2">${T(['codigo', 'nome'], CARGO, { cap: 'cargo' })}${T(['codigo', 'nome', 'cod_cargo'], FUN, { cap: 'funcionario' })}</div>` +
        sql('-- todos os cargos e os funcionários alocados a eles\nSELECT c.nome, f.nome\nFROM cargo c LEFT JOIN funcionario f\n  ON c.codigo = f.cod_cargo;') +
        T(['cargo', 'nome'], [['Programador', 'João'], ['Programador', 'Pedro'], ['Secretaria', 'Maria'], ['Designer', 'José'], ['Ux Designer', nul(null)]], { cap: 'Resultado', hl: [4] }) +
        `<p>“Ux Designer” não tem funcionário, mas aparece no resultado com NULL.</p>` },
      { t: 'RIGHT OUTER JOIN', h:
        `<p>Preserva as tuplas somente da relação nomeada <b>depois</b> (à direita). É o espelho do LEFT: <code>A LEFT JOIN B</code> equivale a <code>B RIGHT JOIN A</code>.</p>` +
        sql('-- todos os funcionários, mesmo sem cargo\nSELECT c.nome, f.nome\nFROM cargo c RIGHT JOIN funcionario f\n  ON c.codigo = f.cod_cargo;') +
        tip('Para saber o que sobra, olhe qual tabela está do lado indicado pelo LEFT/RIGHT: as linhas dela sempre aparecem.') },
      { t: 'FULL OUTER JOIN', h:
        `<p>Preserva as tuplas de <b>ambas</b> as relações: pares que combinam, linhas só da esquerda (com NULL na direita) e linhas só da direita (com NULL na esquerda).</p>` +
        sql('SELECT c.nome, f.nome\nFROM cargo c FULL OUTER JOIN funcionario f\n  ON c.codigo = f.cod_cargo;') +
        note('O MySQL não possui FULL OUTER JOIN. A saída usual é unir um LEFT JOIN com um RIGHT JOIN: <code>... LEFT JOIN ... UNION ... RIGHT JOIN ...</code>.', 'Atenção') },
      { g: 'Operações com conjuntos', t: 'UNION e UNION ALL', h:
        `<p>Combinam os resultados de duas consultas.</p>` +
        boxes([['UNION', 'Retorna todas as linhas <b>não duplicadas</b> recuperadas pelas consultas (equivale a um DISTINCT).'], ['UNION ALL', 'Retorna todas as linhas, <b>incluindo as duplicadas</b>.']]) +
        `<div class="grid2">${T(['codigo', 'nome'], A, { cap: 'funcionarios' })}${T(['codigo', 'nome'], B, { cap: 'gerentes' })}</div>` +
        sql('SELECT codigo, nome FROM funcionarios\nUNION\nSELECT codigo, nome FROM gerentes;   -- Maria, Luiz, Tadeu') +
        sql('SELECT codigo, nome FROM funcionarios\nUNION ALL\nSELECT codigo, nome FROM gerentes;  -- Maria, Luiz, Luiz, Tadeu') },
      { t: 'INTERSECT e MINUS', h:
        boxes([['INTERSECT', 'Retorna somente as linhas <b>comuns</b> às duas consultas.'], ['MINUS', 'Pega o resultado do primeiro SELECT e <b>subtrai</b> as ocorrências idênticas do segundo.']]) +
        sql('SELECT codigo, nome FROM funcionarios\nINTERSECT\nSELECT codigo, nome FROM gerentes;   -- Luiz') +
        sql('SELECT codigo, nome FROM funcionarios\nMINUS\nSELECT codigo, nome FROM gerentes;       -- Maria') +
        note('MINUS é a palavra do Oracle; no padrão SQL e no MySQL recente o operador equivalente é EXCEPT (e INTERSECT só existe em versões mais novas do MySQL). Confira a versão do seu SGBD.', 'Atenção') },
      { t: 'Compatibilidade entre as consultas', h:
        `<p>Assim como na álgebra relacional (Aula 5), as consultas combinadas devem ser <b>compatíveis</b>: o mesmo número de colunas, na mesma ordem e com tipos compatíveis. Os nomes das colunas do resultado vêm da primeira consulta.</p>` },
      { g: 'Prática', t: 'Vamos praticar', h: `<p>A aula termina com prática dos joins e das operações de conjunto sobre os bancos já criados. Use os exercícios da aba <b>Atividades</b> para treinar.</p>` },
    ],
    examples: [
      { t: 'Visualizador de joins', d: 'Troque o tipo de junção e veja quais linhas entram no resultado. Acrescentamos a funcionária Lia, sem cargo, para ilustrar RIGHT e FULL.', mount(el) {
        const TYPES = ['INNER', 'LEFT', 'RIGHT', 'FULL'];
        el.innerHTML = `<div class="grid2">${T(['codigo', 'nome'], CARGO, { cap: 'cargo (esquerda)' })}${T(['codigo', 'nome', 'cod_cargo'], FUN_X.map((r) => [r[0], r[1], nul(r[2])]), { cap: 'funcionario (direita)' })}</div><div class="ctrl"><div class="seg" id="sg">${TYPES.map((t, i) => `<button data-t="${t}" aria-pressed="${i === 0}">${t} JOIN</button>`).join('')}</div></div><div id="o"></div>`;
        const upd = (t) => {
          $$('#sg button', el).forEach((b) => b.setAttribute('aria-pressed', b.dataset.t === t));
          const out = []; // [cargo, func, tipo]
          CARGO.forEach((c) => { const m = FUN_X.filter((f) => f[2] === c[0]); if (m.length) m.forEach((f) => out.push([c[1], f[1], 'par'])); else if (t === 'LEFT' || t === 'FULL') out.push([c[1], null, 'esq']); });
          if (t === 'RIGHT' || t === 'FULL') FUN_X.filter((f) => !CARGO.some((c) => c[0] === f[2])).forEach((f) => out.push([null, f[1], 'dir']));
          if (t === 'RIGHT') { const sorted = []; FUN_X.forEach((f) => { out.filter((o) => o[1] === f[1]).forEach((o) => sorted.push(o)); }); out.length = 0; sorted.forEach((o) => out.push(o)); }
          $('#o', el).innerHTML = sql(`SELECT c.nome AS cargo, f.nome AS funcionario\nFROM cargo c ${t} JOIN funcionario f\n  ON c.codigo = f.cod_cargo;`) + T(['cargo', 'funcionario'], out.map((o) => [nul(o[0]), nul(o[1])]), { hl: out.map((o, i) => (o[2] !== 'par' ? i : -1)).filter((i) => i >= 0) }) + `<p style="color:var(--muted);font-size:.9rem">${out.length} linha(s). Linhas destacadas: preservadas pela junção externa, com NULL do outro lado.${t === 'FULL' ? ' (No MySQL, simule com LEFT JOIN UNION RIGHT JOIN.)' : ''}</p>`;
        };
        $$('#sg button', el).forEach((b) => b.onclick = () => upd(b.dataset.t)); upd('INNER');
      } },
      { t: 'Operações com conjuntos', d: 'Escolha a operação entre as consultas de funcionários e gerentes.', mount(el) {
        const key = (r) => r.join('|');
        const OPS = {
          'UNION': () => { const s = new Set(), o = []; A.concat(B).forEach((r) => { if (!s.has(key(r))) { s.add(key(r)); o.push(r); } }); return o; },
          'UNION ALL': () => A.concat(B),
          'INTERSECT': () => A.filter((r) => B.some((x) => key(x) === key(r))),
          'MINUS (A − B)': () => A.filter((r) => !B.some((x) => key(x) === key(r))),
          'MINUS (B − A)': () => B.filter((r) => !A.some((x) => key(x) === key(r))),
        };
        el.innerHTML = `<div class="grid2">${T(['codigo', 'nome'], A, { cap: 'funcionarios' })}${T(['codigo', 'nome'], B, { cap: 'gerentes' })}</div><div class="ctrl"><div class="seg" id="sg">${Object.keys(OPS).map((k, i) => `<button data-k="${k}" aria-pressed="${i === 0}">${k}</button>`).join('')}</div></div><div id="o"></div>`;
        const upd = (k) => {
          $$('#sg button', el).forEach((b) => b.setAttribute('aria-pressed', b.dataset.k === k));
          const op = k.startsWith('MINUS') ? 'MINUS' : k, rev = k === 'MINUS (B − A)', r = OPS[k]();
          $('#o', el).innerHTML = sql(`SELECT codigo, nome FROM ${rev ? 'gerentes' : 'funcionarios'}\n${op}\nSELECT codigo, nome FROM ${rev ? 'funcionarios' : 'gerentes'};`) + T(['codigo', 'nome'], r.length ? r : [['', '']], { cap: `Resultado (${r.length} linha${r.length === 1 ? '' : 's'})` });
        };
        $$('#sg button', el).forEach((b) => b.onclick = () => upd(b.dataset.k)); upd('UNION');
      } },
    ],
    activities: [
      { t: 'Qual junção ou operação?', d: 'Escolha a opção que resolve cada pedido.', kind: 'classify',
        cfg: { choices: ['INNER JOIN', 'LEFT JOIN', 'UNION', 'UNION ALL', 'INTERSECT', 'MINUS'], items: [
          { t: 'Todos os cargos, mesmo os que não têm funcionário.', a: 1, why: 'LEFT JOIN preserva a tabela à esquerda (cargo).' },
          { t: 'Somente os funcionários que possuem cargo, com o nome do cargo.', a: 0, why: 'Só interessam os pares que combinam.' },
          { t: 'Pessoas que são funcionárias e também gerentes.', a: 4, why: 'Linhas comuns às duas consultas.' },
          { t: 'Funcionários que não são gerentes.', a: 5, why: 'Primeira consulta menos a segunda.' },
          { t: 'Lista única de todas as pessoas que são funcionárias ou gerentes, sem repetir.', a: 2, why: 'UNION elimina duplicatas.' },
          { t: 'Todas as linhas das duas consultas, mantendo as repetidas.', a: 3, why: 'UNION ALL não elimina duplicatas.' },
        ] } },
      { t: 'Escreva a consulta', d: 'Com cargo(codigo, nome), funcionario(codigo, nome, cod_cargo), funcionarios e gerentes.', kind: 'qa', items: [
        ['Todos os cargos e seus funcionários, incluindo cargos sem funcionários.', sql('SELECT c.nome AS cargo, f.nome AS funcionario\nFROM cargo c LEFT JOIN funcionario f ON c.codigo = f.cod_cargo;')],
        ['Somente os cargos que NÃO têm funcionários, com LEFT JOIN.', sql('SELECT c.nome\nFROM cargo c LEFT JOIN funcionario f ON c.codigo = f.cod_cargo\nWHERE f.codigo IS NULL;') + '<p>Os cargos sem par ficam com NULL nas colunas de funcionario; o filtro IS NULL deixa só eles.</p>'],
        ['Pessoas que são funcionárias e gerentes (INTERSECT).', sql('SELECT codigo, nome FROM funcionarios\nINTERSECT\nSELECT codigo, nome FROM gerentes;')],
        ['Funcionários que não são gerentes (MINUS).', sql('SELECT codigo, nome FROM funcionarios\nMINUS\nSELECT codigo, nome FROM gerentes;') + '<p>Em MySQL recente: troque MINUS por EXCEPT, ou use NOT EXISTS.</p>'],
        ['Qual a diferença entre UNION e UNION ALL no exemplo (Maria, Luiz) e (Luiz, Tadeu)?', '<p>UNION devolve 3 linhas (Maria, Luiz, Tadeu). UNION ALL devolve 4 (Maria, Luiz, Luiz, Tadeu), mantendo a repetida.</p>'],
      ] },
    ],
    challenges: [
      { stem: 'Qual é a função da junção externa (OUTER JOIN), em comparação com a junção interna?',
        opts: ['Eliminar todas as linhas sem correspondência.', 'Preservar tuplas que seriam perdidas na junção, completando com valores nulos.', 'Remover valores nulos do resultado.', 'Criar novas tabelas no banco.', 'Executar a junção apenas em subconsultas.'], c: 1,
        e: '<p>A junção externa mantém as tuplas sem correspondência, criando tuplas com valores nulos no resultado.</p>' },
      { stem: 'Na consulta SELECT c.nome, f.nome FROM cargo c LEFT JOIN funcionario f ON c.codigo = f.cod_cargo; o cargo “Ux Designer” não tem funcionários. O que ocorre com esse cargo?',
        opts: ['Não aparece no resultado.', 'Aparece com NULL no nome do funcionário.', 'Gera erro de execução.', 'Aparece com o nome de outro funcionário.', 'É removido da tabela cargo.'], c: 1,
        e: '<p>LEFT JOIN preserva todas as linhas da tabela à esquerda (cargo); sem correspondência, as colunas do funcionário ficam NULL.</p>' },
      { stem: 'Qual tabela tem todas as suas linhas preservadas em A RIGHT JOIN B?',
        opts: ['A', 'B', 'As duas', 'Nenhuma', 'Depende da chave primária'], c: 1,
        e: '<p>RIGHT JOIN preserva a relação nomeada depois (à direita), isto é, B.</p>' },
      { stem: 'Sejam funcionarios = {(001, Maria), (002, Luiz)} e gerentes = {(002, Luiz), (003, Tadeu)}. Quantas linhas retorna a união por UNION ALL e quantas retorna UNION?',
        opts: ['4 e 3', '3 e 4', '4 e 4', '3 e 3', '2 e 2'], c: 0,
        e: '<p>UNION ALL mantém todas as linhas (4, com Luiz repetido). UNION elimina duplicatas (3: Maria, Luiz, Tadeu).</p>' },
      { stem: 'Com os mesmos conjuntos, o que retorna a operação INTERSECT entre funcionarios e gerentes?',
        opts: ['Maria', 'Luiz', 'Tadeu', 'Maria, Luiz e Tadeu', 'Nenhuma linha'], c: 1,
        e: '<p>INTERSECT devolve apenas as linhas comuns às duas consultas: (002, Luiz).</p>' },
      { stem: 'Com os mesmos conjuntos, funcionarios MINUS gerentes retorna:',
        opts: ['Maria', 'Luiz', 'Tadeu', 'Maria e Tadeu', 'Nenhuma linha'], c: 0,
        e: '<p>MINUS subtrai do primeiro resultado as linhas idênticas do segundo. Sobra Maria. (A operação não é comutativa: gerentes MINUS funcionarios daria Tadeu.)</p>' },
      { stem: 'Para que duas consultas possam ser combinadas com UNION, é necessário que:',
        opts: ['Tenham o mesmo número de colunas, com tipos compatíveis.', 'Usem as mesmas tabelas.', 'Tenham o mesmo número de linhas.', 'Tenham a mesma cláusula WHERE.', 'Sejam subconsultas correlacionadas.'], c: 0,
        e: '<p>As consultas devem ser compatíveis: número de colunas igual e tipos compatíveis, na mesma ordem.</p>' },
    ],
  });
})();
