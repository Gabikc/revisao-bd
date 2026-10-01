(function () {
  const CARGO = [['001', 'Programador'], ['002', 'Secretaria'], ['003', 'Ux Designer'], ['004', 'Designer']];
  const FUN = [['001', 'Maria', 23, '002'], ['002', 'João', 34, '001'], ['003', 'José', 67, '004'], ['004', 'Pedro', 41, '001'], ['005', 'Lúcia', 38, '003']];
  const CUR = [['001', 'Inglês', 100], ['002', 'Alemão', 120], ['003', 'Francês', 90], ['004', 'Italiano', 100]];
  const ALU = [['001', 'Maria', '9999', '003'], ['002', 'José', '4444', '003'], ['003', 'João', '2222', '004'], ['004', 'Pedro', '6454', '001']];
  const pad = (s, n, ch, left) => { s = String(s); while (s.length < n) s = left ? ch + s : s + ch; return s.slice(0, n); };

  const FNS = [
    ['ABS', 'n', ['n'], [-7.5], (a) => Math.abs(a[0])],
    ['CEIL', 'n', ['n'], [4.2], (a) => Math.ceil(a[0])],
    ['FLOOR', 'n', ['n'], [4.8], (a) => Math.floor(a[0])],
    ['MOD', 'm, n', ['m', 'n'], [10, 3], (a) => a[0] % a[1]],
    ['POWER', 'm, expoente', ['m', 'expoente'], [2, 3], (a) => Math.pow(a[0], a[1])],
    ['SQRT', 'n', ['n'], [16], (a) => Math.sqrt(a[0])],
    ['SIGN', 'n', ['n'], [-7], (a) => Math.sign(a[0])],
    ['ROUND', 'n, m', ['n', 'm'], [3.14159, 2], (a) => Math.round(a[0] * Math.pow(10, a[1])) / Math.pow(10, a[1])],
    ['TRUNCATE', 'n, m', ['n', 'm'], [3.789, 1], (a) => Math.trunc(a[0] * Math.pow(10, a[1])) / Math.pow(10, a[1])],
    ['CONCAT', 'col1, col2', ['col1', 'col2'], ['Banco', ' de Dados'], (a) => a[0] + a[1], 1],
    ['SUBSTR', 'col, início, qtd', ['col', 'início', 'qtd'], ['Banco', 1, 3], (a) => String(a[0]).substr(a[1] - 1, a[2]), 0, 1],
    ['LENGTH', 'col', ['col'], ['Banco'], (a) => String(a[0]).length, 1],
    ['UPPER', 'col', ['col'], ['recife'], (a) => String(a[0]).toUpperCase(), 1],
    ['LOWER', 'col', ['col'], ['RECIFE'], (a) => String(a[0]).toLowerCase(), 1],
    ['REPLACE', 'col, cadeia1, cadeia2', ['col', 'cadeia1', 'cadeia2'], ['2025-03-01', '-', '/'], (a) => String(a[0]).split(a[1]).join(a[2]), 1],
    ['LPAD', 'col, tam, char', ['col', 'tam', 'char'], ['7', 3, '0'], (a) => pad(a[0], a[1], a[2], true), 1],
    ['RPAD', 'col, tam, char', ['col', 'tam', 'char'], ['7', 3, '*'], (a) => pad(a[0], a[1], a[2], false), 1],
    ['DATEDIFF', 'data1, data2', ['data1', 'data2'], ['2025-03-10', '2025-03-01'], (a) => Math.round((new Date(a[0]) - new Date(a[1])) / 86400000), 1],
    ['DATE_ADD', 'data, dias', ['data', 'dias (INTERVAL n DAY)'], ['2025-03-01', 10], (a) => { const d = new Date(a[0]); d.setDate(d.getDate() + Number(a[1])); return d.toISOString().slice(0, 10); }, 1],
  ];

  MODULES.push({
    id: 'a13', n: '13', acc: 'vio', grp: 'SQL na prática', src: 'Aula 13', short: 'Subconsultas e funções',
    title: 'Subconsultas e funções do SQL',
    blurb: 'Consultas dentro de consultas: IN, ANY, ALL, EXISTS e subconsultas correlacionadas, mais as funções numéricas, de texto e de data.',
    topics: [
      { g: 'Subconsultas', t: 'O que é uma subconsulta', h:
        `<p>Uma <b>subconsulta</b> (ou consulta aninhada) é um comando SELECT incluído em outro SELECT, UPDATE, INSERT ou DELETE, ou dentro de outra subconsulta, tudo no mesmo comando SQL.</p><p>É usada quando valores do banco precisam ser obtidos para então serem usados em uma condição, ou quando se precisa de um conjunto de linhas.</p>` +
        T(['Tipo', 'Retorna'], [['Escalar', 'Um único valor'], ['Única linha', 'Várias colunas, mas só uma linha'], ['Tabela', 'Uma ou mais colunas e múltiplas linhas']]) },
      { t: 'Subconsulta escalar e de única linha', h:
        `<p>Quando a subconsulta devolve um único valor, ela pode ser comparada com os operadores comuns (=, &lt;, &gt;…).</p>` +
        sql("SELECT codigo, nome\nFROM aluno\nWHERE codigo = (SELECT codigo\n                FROM aluno\n                WHERE nome LIKE '%Maria');   -- = 001, resulta em Ana Maria") +
        note('No slide a subconsulta seleciona “codigo, nome”. Para comparar com = um único valor, ela deve devolver apenas uma coluna, como acima.', 'Atenção') +
        sql("-- funcionários mais velhos que a média\nSELECT nome FROM funcionario\nWHERE idade > (SELECT AVG(idade) FROM funcionario);") },
      { t: 'IN e NOT IN', h:
        `<p>Compara um valor com uma lista ou com o resultado de uma subconsulta: procura o valor em um subconjunto.</p>` +
        `<div class="grid2">${T(['codigo', 'nome'], CARGO, { cap: 'cargo' })}${T(['codigo', 'nome', 'idade', 'cod_cargo'], FUN.slice(0, 4), { cap: 'funcionario' })}</div>` +
        sql("SELECT nome\nFROM funcionario\nWHERE cod_cargo IN (SELECT codigo\n                     FROM cargo\n                     WHERE nome = 'Programador');   -- João e Pedro") },
      { t: 'ANY / SOME', h:
        `<p>São sinônimos: a condição é verdadeira se a comparação valer para <b>algum</b> valor do conjunto retornado pela subconsulta.</p>` +
        sql("SELECT nome\nFROM funcionario\nWHERE idade = SOME (SELECT idade\n                      FROM funcionario\n                      WHERE cod_cargo = 001);") +
        `<p>A subconsulta devolve {34, 41}; a consulta externa traz quem tem idade 34 ou 41: <b>João e Pedro</b>.</p>` },
      { t: 'ALL', h:
        `<p>Compara um valor com <b>todos</b> os valores da lista ou subconsulta.</p>` +
        sql("SELECT nome, idade\nFROM funcionario\nWHERE idade > ALL (SELECT idade\n                      FROM funcionario\n                      WHERE cod_cargo = 001);") +
        `<p>Idades dos programadores: {34, 41}. Só quem tem mais de 41 anos satisfaz: <b>José (67)</b>. Lúcia (38) não passa de 41.</p>` +
        tip('= ANY equivale a IN. &lt;&gt; ALL equivale a NOT IN.') },
      { t: 'Subconsultas correlacionadas', h:
        `<p>Quando a condição do WHERE da consulta aninhada <b>referencia um atributo da consulta externa</b>, as duas estão correlacionadas.</p>` +
        ul(['Útil quando interessa saber se <i>alguma</i> linha é retornada, não a quantidade.', 'É executada <b>uma vez para cada linha</b> da consulta externa.', 'A não correlacionada é executada uma vez, antes da consulta externa.']) },
      { t: 'EXISTS e NOT EXISTS', h:
        `<p>Projetadas para uso apenas com subconsultas: verificam se o resultado da consulta aninhada é vazio. O resultado é booleano: <b>EXISTS</b> é verdadeiro se houver pelo menos uma tupla; <b>NOT EXISTS</b> é verdadeiro se não houver nenhuma.</p>` +
        `<div class="grid2">${T(['codigo', 'descricao', 'carga_hr'], CUR, { cap: 'curso' })}${T(['matricula', 'nome', 'telefone', 'cod_curso'], ALU, { cap: 'aluno' })}</div>` +
        sql("-- cursos que não têm nenhum aluno matriculado\nSELECT c.codigo, c.descricao\nFROM curso c\nWHERE NOT EXISTS (SELECT *\n                  FROM aluno a\n                  WHERE a.cod_curso = c.codigo);   -- Alemão") },
      { g: 'Funções do SQL', t: 'Funções numéricas', h:
        T(['Função', 'Retorna'], [['ABS(n)', 'valor absoluto'], ['CEIL(n)', 'inteiro imediatamente superior ou igual'], ['FLOOR(n)', 'inteiro imediatamente inferior ou igual'], ['MOD(m, n)', 'resto da divisão de m por n'], ['POWER(m, expoente)', 'potência'], ['SQRT(n)', 'raiz quadrada'], ['SIGN(n)', '−1, 1 ou 0 conforme o sinal'], ['ROUND(n, m)', 'n arredondado para m decimais'], ['TRUNCATE(n, m)', 'n truncado para m decimais'], ['COALESCE(col, valor)', 'substitui nulo por outro valor']]) },
      { t: 'Funções literais (texto)', h:
        T(['Função', 'Retorna'], [['CONCAT(col1, col2)', 'col1 concatenada com col2'], ['SUBSTR(col, início, qtd)', 'parte de uma cadeia'], ['LENGTH(col)', 'número de caracteres'], ['LOWER(col) / UPPER(col)', 'minúsculas / maiúsculas'], ['REPLACE(col, cadeia1, cadeia2)', 'substitui caracteres'], ['COALESCE(col, valor)', 'substitui nulo por outro valor'], ['LPAD(col, tam, char) / RPAD', 'completa à esquerda / à direita até o tamanho']]) },
      { t: 'Funções de data', h:
        T(['Função', 'Retorna'], [['CURDATE()', 'data atual'], ['NOW() ou SYSDATE()', 'data e hora atuais'], ['CURTIME()', 'horário atual'], ['DATEDIFF(col1, col2)', 'intervalo entre duas datas'], ['DATE_ADD(col, INTERVAL n DAY)', 'soma dias a uma data'], ['DAYNAME(col)', 'nome do dia'], ['EXTRACT(YEAR FROM col)', 'ano, mês ou dia da data'], ['DATE_FORMAT(col, formato)', 'formata a data']]) +
        `<p>Teste várias dessas funções na calculadora da aba <b>Exemplos</b>.</p>` },
    ],
    examples: [
      { t: 'IN, ANY e ALL linha a linha', d: 'A subconsulta devolve as idades dos programadores (cargo 001). Escolha o operador e veja quem passa.', mount(el) {
        const inner = FUN.filter((r) => r[3] === '001').map((r) => r[2]);
        const OPS = { 'IN': (v) => inner.includes(v), '= ANY': (v) => inner.some((x) => v === x), '> ANY': (v) => inner.some((x) => v > x), '> ALL': (v) => inner.every((x) => v > x), '< ALL': (v) => inner.every((x) => v < x), 'NOT IN': (v) => !inner.includes(v) };
        el.innerHTML = `${sql("SELECT nome, idade FROM funcionario\nWHERE idade <operador> (SELECT idade FROM funcionario\n                        WHERE cod_cargo = 001);")}<div class="ctrl"><span>Operador:</span><div class="seg" id="sg">${Object.keys(OPS).map((k, i) => `<button data-k="${k}" aria-pressed="${i === 0}">${k}</button>`).join('')}</div></div><div class="rel-out">Resultado da subconsulta: <b>{${inner.join(', ')}}</b></div><div id="o"></div>`;
        const upd = (k) => {
          $$('#sg button', el).forEach((b) => b.setAttribute('aria-pressed', b.dataset.k === k));
          const ok = FUN.map((r) => OPS[k](r[2]));
          $('#o', el).innerHTML = T(['nome', 'idade', `idade ${k} {${inner.join(', ')}}`, 'passa?'], FUN.map((r, i) => [r[1], r[2], ok[i] ? 'verdadeiro' : 'falso', ok[i] ? '✔' : '✘']), { hl: ok.map((o, i) => (o ? i : -1)).filter((i) => i >= 0) }) + `<div class="banner ok">Retorna: ${FUN.filter((_, i) => ok[i]).map((r) => r[1]).join(', ') || 'nenhuma linha'}</div>`;
        };
        $$('#sg button', el).forEach((b) => b.onclick = () => upd(b.dataset.k)); upd('IN');
      } },
      { t: 'Subconsulta correlacionada: EXISTS por linha', d: 'A subconsulta roda uma vez para cada curso da consulta externa. Avance linha a linha.', mount(el) {
        let i = 0, mode = 'NOT EXISTS';
        const draw = () => {
          const rows = CUR.map((c) => ({ c, n: ALU.filter((a) => a[3] === c[0]).length }));
          const done = rows.slice(0, i), cur = rows[i];
          const pass = (r) => (mode === 'EXISTS' ? r.n > 0 : r.n === 0);
          el.innerHTML = `${sql(`SELECT c.codigo, c.descricao\nFROM curso c\nWHERE ${mode} (SELECT * FROM aluno a\n  ${' '.repeat(mode.length + 6)}WHERE a.cod_curso = c.codigo);`)}<div class="ctrl"><div class="seg" id="sg"><button data-m="NOT EXISTS" aria-pressed="${mode === 'NOT EXISTS'}">NOT EXISTS</button><button data-m="EXISTS" aria-pressed="${mode === 'EXISTS'}">EXISTS</button></div><button class="smallbtn" id="nx" ${i >= rows.length ? 'disabled' : ''}>Executar para a próxima linha</button><button class="smallbtn" id="rs">Recomeçar</button></div>
          ${T(['codigo', 'descricao', 'alunos encontrados pela subconsulta', `${mode}?`, 'entra no resultado?'], rows.map((r, k) => (k < i ? [r.c[0], r.c[1], r.n, r.n > 0 ? 'EXISTS verdadeiro' : 'subconsulta vazia', pass(r) ? 'sim' : 'não'] : [r.c[0], r.c[1], '…', '…', '…'])), { hl: rows.map((r, k) => (k < i && pass(r) ? k : -1)).filter((k) => k >= 0), dim: rows.map((_, k) => (k >= i ? k : -1)).filter((k) => k >= 0) })}
          <p style="color:var(--muted);font-size:.92rem">${i < rows.length ? `Próxima: a subconsulta vai procurar alunos com cod_curso = ${cur.c[0]} (${cur.c[1]}).` : `Fim: ${rows.filter(pass).map((r) => r.c[1]).join(', ') || 'nenhum curso'} ${rows.filter(pass).length === 1 ? 'entra' : 'entram'} no resultado.`}</p>`;
          $('#nx', el).onclick = () => { i++; draw(); };
          $('#rs', el).onclick = () => { i = 0; draw(); };
          $$('#sg button', el).forEach((b) => b.onclick = () => { mode = b.dataset.m; i = 0; draw(); });
        };
        draw();
      } },
      { t: 'Calculadora de funções SQL', d: 'Escolha uma função, ajuste os argumentos e veja o resultado.', mount(el) {
        el.innerHTML = `<div class="ctrl"><label>Função: <select id="fn">${FNS.map((f, i) => `<option value="${i}">${f[0]}</option>`).join('')}</select></label></div><div class="ctrl" id="ar"></div><div id="o"></div>`;
        const fill = () => { const f = FNS[+$('#fn', el).value]; $('#ar', el).innerHTML = f[2].map((n, i) => `<label>${n} <input type="text" data-i="${i}" value="${f[3][i]}" size="12"></label>`).join(''); $$('#ar input', el).forEach((x) => x.addEventListener('input', run)); run(); };
        const run = () => {
          const f = FNS[+$('#fn', el).value], raw = $$('#ar input', el).map((x) => x.value);
          const args = raw.map((v, i) => (f[5] || (f[3][i] !== undefined && typeof f[3][i] === 'string') ? v : Number(v)));
          let r; try { r = f[4](args); } catch (e) { r = 'erro'; }
          if (typeof r === 'number' && !isFinite(r)) r = 'NULL / indefinido';
          const q = f[0] === 'DATE_ADD' ? `SELECT DATE_ADD('${raw[0]}', INTERVAL ${raw[1]} DAY);` : `SELECT ${f[0]}(${raw.map((v, i) => (typeof f[3][i] === 'string' ? `'${v}'` : v)).join(', ')});`;
          $('#o', el).innerHTML = sql(q) + `<div class="banner ok">Resultado: ${String(r) === '' ? '(vazio)' : r}</div>`;
        };
        $('#fn', el).onchange = fill; fill();
      } },
    ],
    activities: [
      { t: 'Qual operador usar?', d: 'Escolha o operador mais adequado à pergunta.', kind: 'classify',
        cfg: { choices: ['IN', 'ANY / SOME', 'ALL', 'EXISTS / NOT EXISTS'], items: [
          { t: 'Funcionários cujo cargo está entre os cargos chamados “Programador”.', a: 0, why: 'Procura o valor em um conjunto.' },
          { t: 'Funcionários com idade maior que a idade de todos os programadores.', a: 2, why: 'A comparação vale para todos os valores.' },
          { t: 'Funcionários com idade maior que a de algum programador.', a: 1, why: 'Basta valer para um valor do conjunto.' },
          { t: 'Cursos que não possuem nenhum aluno matriculado.', a: 3, why: 'Interessa se há ou não linha, não a quantidade.' },
          { t: 'Cargos para os quais existe pelo menos um funcionário.', a: 3, why: 'EXISTS com subconsulta correlacionada.' },
        ] } },
      { t: 'Que tipo de subconsulta?', d: 'Classifique pelo que a subconsulta retorna.', kind: 'classify',
        cfg: { choices: ['Escalar', 'Única linha', 'Tabela'], items: [
          { t: '(SELECT AVG(idade) FROM funcionario)', a: 0, why: 'Um único valor.' },
          { t: '(SELECT codigo FROM cargo WHERE nome = \'Programador\')', a: 2, why: 'Em geral pode devolver várias linhas, por isso é usada com IN.' },
          { t: '(SELECT nome, idade FROM funcionario WHERE codigo = 004)', a: 1, why: 'Várias colunas, mas uma única linha.' },
          { t: '(SELECT idade FROM funcionario WHERE cod_cargo = 001)', a: 2, why: 'Várias linhas (34 e 41).' },
        ] } },
      { t: 'Escreva a consulta', d: 'Usando cargo(codigo, nome) e funcionario(codigo, nome, idade, cod_cargo).', kind: 'qa', items: [
        ['Nomes dos funcionários que são Programadores, usando IN.', sql("SELECT nome FROM funcionario\nWHERE cod_cargo IN (SELECT codigo FROM cargo WHERE nome = 'Programador');")],
        ['Funcionários mais velhos que todos os programadores.', sql('SELECT nome, idade FROM funcionario\nWHERE idade > ALL (SELECT idade FROM funcionario WHERE cod_cargo = 001);')],
        ['Cargos que não têm nenhum funcionário, usando NOT EXISTS.', sql('SELECT c.nome FROM cargo c\nWHERE NOT EXISTS (SELECT * FROM funcionario f WHERE f.cod_cargo = c.codigo);')],
        ['Mostrar o nome em maiúsculas e a idade daqui a 5 anos.', sql("SELECT UPPER(nome) AS nome, idade + 5 AS idade_em_5_anos\nFROM funcionario;")],
        ['Substituir telefone nulo por “sem telefone”.', sql("SELECT nome, COALESCE(telefone, 'sem telefone') FROM aluno;")],
      ] },
    ],
    challenges: [
      { stem: 'Quanto ao retorno, uma subconsulta escalar:',
        opts: ['Retorna várias colunas e várias linhas.', 'Retorna um único valor.', 'Retorna várias colunas, mas apenas uma linha.', 'Não retorna nada.', 'Só pode ser usada em comandos DDL.'], c: 1,
        e: '<p>Escalar: um único valor. Única linha: várias colunas, uma linha. Tabela: uma ou mais colunas e múltiplas linhas.</p>' },
      { stem: 'Dadas as tabelas cargo (001 Programador, 002 Secretaria, …) e funcionario (João e Pedro com cod_cargo 001), a consulta SELECT nome FROM funcionario WHERE cod_cargo IN (SELECT codigo FROM cargo WHERE nome = \'Programador\'); retorna:',
        opts: ['Todos os funcionários.', 'Somente os funcionários cujo cargo é Programador (João e Pedro).', 'Somente os cargos.', 'Nenhuma linha.', 'Somente funcionários sem cargo.'], c: 1,
        e: '<p>A subconsulta devolve o código 001; o IN retém os funcionários com cod_cargo 001.</p>' },
      { stem: 'Os funcionários João e Pedro, programadores, têm 34 e 41 anos. A condição idade = SOME (SELECT idade … WHERE cod_cargo = 001) retorna verdadeiro para quem tem:',
        opts: ['Idade igual a 34 ou a 41.', 'Idade maior que 41.', 'Idade menor que 34.', 'Idade igual a 34 e a 41 ao mesmo tempo.', 'Qualquer idade.'], c: 0,
        e: '<p>ANY/SOME é verdadeiro se a comparação valer para algum valor do conjunto {34, 41}.</p>' },
      { stem: 'Na mesma situação, a condição idade > ALL (34, 41) é verdadeira para quem tem:',
        opts: ['Mais de 34 anos.', 'Mais de 41 anos.', 'Exatamente 34 ou 41.', 'Menos de 34.', 'Qualquer idade.'], c: 1,
        e: '<p>ALL exige que a comparação valha para todos os valores. Ser maior que 34 e que 41 ao mesmo tempo equivale a ser maior que 41.</p>' },
      { stem: 'Qual afirmativa descreve corretamente uma subconsulta correlacionada?',
        opts: ['É executada uma única vez, antes da consulta externa.', 'Referencia um atributo da consulta externa e é executada uma vez para cada linha dela.', 'Não pode usar a cláusula WHERE.', 'Só funciona com UPDATE.', 'Substitui o GROUP BY.'], c: 1,
        e: '<p>A condição da consulta aninhada usa um atributo da externa, por isso é reavaliada para cada linha externa. A não correlacionada executa uma vez.</p>' },
      { stem: 'Para listar os cursos que não têm nenhum aluno matriculado, a melhor opção é:',
        opts: ['WHERE EXISTS com subconsulta correlacionada sobre aluno.', 'WHERE NOT EXISTS com subconsulta correlacionada sobre aluno.', 'GROUP BY aluno.', 'DELETE FROM curso.', 'ORDER BY curso.'], c: 1,
        e: '<p>NOT EXISTS é verdadeiro quando a subconsulta (alunos do curso) não devolve nenhuma linha.</p>' },
      { stem: 'O que EXISTS retorna, quando aplicado a uma subconsulta?',
        opts: ['O número de linhas da subconsulta.', 'A primeira linha da subconsulta.', 'Verdadeiro se a subconsulta retornar pelo menos uma tupla, e falso caso contrário.', 'A soma dos valores da subconsulta.', 'Sempre falso.'], c: 2,
        e: '<p>EXISTS devolve um valor booleano e não se importa com a quantidade de linhas.</p>' },
      { stem: 'A função COALESCE(telefone, \'sem telefone\') é usada para:',
        opts: ['Concatenar duas colunas.', 'Substituir um valor nulo por outro valor.', 'Calcular o resto da divisão.', 'Arredondar um número.', 'Remover espaços do texto.'], c: 1,
        e: '<p>COALESCE devolve o primeiro valor não nulo: se telefone for nulo, usa “sem telefone”.</p>' },
    ],
  });
})();
