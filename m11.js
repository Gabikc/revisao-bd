(function () {
  const AL = [['001', 'Maria', 18, '9999'], ['002', 'José', 23, '4444'], ['003', 'João', 45, '2222'], ['004', 'Pedro', 13, '6454'], ['005', 'Luiza', 37, '2333']];
  const ALH = ['codigo', 'nome', 'idade', 'telefone'];
  const FUN = [['001', 'Maria', 23, '001'], ['002', 'José', 34, '001'], ['003', 'João', 67, '002'], ['004', 'Pedro', 54, '002'], ['005', 'Luiza', 32, '002'], ['006', 'Ana', 28, '003']];
  const CUR = [['001', 'Inglês', 100], ['002', 'Alemão', 120], ['003', 'Francês', 90], ['004', 'Italiano', 100]];
  const ALU = [['001', 'Maria', '9999', '003'], ['002', 'José', '4444', '003'], ['003', 'João', '2222', '004'], ['004', 'Pedro', '6454', '001']];

  const MARINHA = [
    ['Encontre os nomes e as idades de todos os marinheiros.', 'SELECT nome, idade\nFROM marinheiro;'],
    ['Encontre todos os marinheiros com avaliação igual a “bom”.', "SELECT *\nFROM marinheiro\nWHERE avaliacao = 'bom';"],
    ['Encontre os nomes dos marinheiros que reservaram o barco 103.', 'SELECT m.nome\nFROM marinheiro m JOIN reserva r ON m.idMarinheiro = r.idMarinheiro\nWHERE r.idBarco = 103;'],
    ['Encontre os idMarinheiro dos marinheiros que reservaram um barco vermelho.', "SELECT DISTINCT r.idMarinheiro\nFROM reserva r JOIN barco b ON r.idBarco = b.idBarco\nWHERE b.cor = 'vermelho';"],
    ['Encontre os nomes dos marinheiros que reservaram um barco vermelho.', "SELECT DISTINCT m.nome\nFROM marinheiro m\n  JOIN reserva r ON m.idMarinheiro = r.idMarinheiro\n  JOIN barco b ON r.idBarco = b.idBarco\nWHERE b.cor = 'vermelho';"],
    ['Encontre as cores dos barcos reservados por Lubber.', "SELECT DISTINCT b.cor\nFROM marinheiro m\n  JOIN reserva r ON m.idMarinheiro = r.idMarinheiro\n  JOIN barco b ON r.idBarco = b.idBarco\nWHERE m.nome = 'Lubber';"],
    ['Encontre os nomes dos marinheiros que reservaram pelo menos um barco.', 'SELECT DISTINCT m.nome\nFROM marinheiro m JOIN reserva r ON m.idMarinheiro = r.idMarinheiro;'],
    ['Encontre as idades dos marinheiros cujos nomes começam ou terminam com B e têm no mínimo três caracteres.', "SELECT idade\nFROM marinheiro\nWHERE LENGTH(nome) >= 3\n  AND (nome LIKE 'B%' OR nome LIKE '%B');"],
    ['Encontre a idade média de todos os marinheiros.', 'SELECT AVG(idade)\nFROM marinheiro;'],
    ['Encontre a idade média dos marinheiros com idade maior que 27.', 'SELECT AVG(idade)\nFROM marinheiro\nWHERE idade > 27;'],
    ['Encontre a quantidade total de marinheiros.', 'SELECT COUNT(*)\nFROM marinheiro;'],
    ['Encontre o número de nomes diferentes de marinheiros.', 'SELECT COUNT(DISTINCT nome)\nFROM marinheiro;'],
    ['Encontre a idade do marinheiro mais jovem para cada nível de avaliação.', 'SELECT avaliacao, MIN(idade)\nFROM marinheiro\nGROUP BY avaliacao;'],
    ['Idade do marinheiro mais jovem com no mínimo 18 anos, para cada nível de avaliação com no mínimo dois marinheiros desse tipo.', 'SELECT avaliacao, MIN(idade)\nFROM marinheiro\nWHERE idade >= 18\nGROUP BY avaliacao\nHAVING COUNT(*) >= 2;'],
    ['Para cada barco vermelho, encontre o número de reservas desse barco.', "SELECT b.idBarco, COUNT(*) AS reservas\nFROM barco b JOIN reserva r ON b.idBarco = r.idBarco\nWHERE b.cor = 'vermelho'\nGROUP BY b.idBarco;"],
    ['Idade média dos marinheiros de cada nível de avaliação que tenha no mínimo dois marinheiros.', 'SELECT avaliacao, AVG(idade)\nFROM marinheiro\nGROUP BY avaliacao\nHAVING COUNT(*) >= 2;'],
    ['Encontre o id dos marinheiros que tenham idade maior que a média.', 'SELECT idMarinheiro\nFROM marinheiro\nWHERE idade > (SELECT AVG(idade) FROM marinheiro);'],
    ['Nome dos marinheiros que realizaram mais de 3 reservas de barcos cujas cores estejam entre (vermelho, verde, azul).', "SELECT m.nome\nFROM marinheiro m\n  JOIN reserva r ON m.idMarinheiro = r.idMarinheiro\n  JOIN barco b ON r.idBarco = b.idBarco\nWHERE b.cor IN ('vermelho', 'verde', 'azul')\nGROUP BY m.idMarinheiro, m.nome\nHAVING COUNT(*) > 3;"],
    ['De acordo com as cores dos barcos, selecione a média das idades dos marinheiros que os reservaram.', 'SELECT b.cor, AVG(m.idade)\nFROM marinheiro m\n  JOIN reserva r ON m.idMarinheiro = r.idMarinheiro\n  JOIN barco b ON r.idBarco = b.idBarco\nGROUP BY b.cor;'],
  ];

  MODULES.push({
    id: 'a11', acc: 'yel', grp: 'SQL na prática', short: 'DQL: consultas',
    title: 'DQL: consultando dados com SELECT',
    blurb: 'Do SELECT básico a operadores, ordenação, funções de agregação, GROUP BY, HAVING e a primeira junção entre tabelas.',
    topics: [
      { g: 'Consulta básica', t: 'SELECT, FROM e WHERE', h:
        `<p>O <b>SELECT</b> realiza consultas. A cláusula <b>FROM</b> indica de quais tabelas vêm as informações e a <b>WHERE</b> filtra pela condição.</p>` +
        sql("SELECT * FROM aluno;                    -- todos os atributos\nSELECT nome, idade FROM aluno;          -- só algumas colunas\n\nSELECT <colunas>\nFROM <tabelas>\nWHERE <condição>;                        -- atributo operador valor") +
        T(ALH, AL, { cap: 'aluno (usada nos exemplos)' }) +
        sql("SELECT idade FROM aluno WHERE nome = 'João';   -- 45\nSELECT * FROM aluno WHERE idade > 18;") },
      { t: 'Operadores lógicos e relacionais', h:
        `<div class="grid2">${T(['Lógico', 'Significado'], [['AND', 'e'], ['OR', 'ou'], ['NOT', 'não']])}${T(['Relacional', 'Significado'], [['=', 'igual a'], ['<> ou !=', 'diferente'], ['>', 'maior que'], ['>=', 'maior ou igual'], ['<', 'menor que'], ['<=', 'menor ou igual']])}</div>` },
      { t: 'Renomeando com AS e atributos calculados', h:
        `<p>A palavra-chave <b>AS</b> dá um nome (apelido) a uma coluna, tabela ou expressão e melhora a legibilidade. Também é possível usar expressões aritméticas no SELECT.</p>` +
        sql("SELECT nome AS \"NomeAluno\", idade FROM aluno;\n\n-- atributo calculado\nSELECT nome, idade + 2 AS \"Idade daqui a dois anos\" FROM aluno;\n\n-- alias de tabela\nSELECT a.nome, p.nome FROM aluno a, professor p;") },
      { g: 'Operadores', t: 'BETWEEN e NOT BETWEEN', h:
        `<p>Seleciona valores dentro de um intervalo (os limites <b>estão incluídos</b>).</p>` + sql('SELECT * FROM aluno\nWHERE idade BETWEEN 10 AND 20;') + T(ALH, [AL[0], AL[3]], { cap: 'Resultado: Maria (18) e Pedro (13)' }) },
      { t: 'LIKE e NOT LIKE', h:
        `<p>Só trabalham sobre colunas de <b>caractere</b> e aceitam curingas:</p>` + boxes([['%', 'substitui um texto: nenhum, um ou vários caracteres. “LAPIS%” casa com LAPIS PRETO e LAPIS BORRACHA.'], ['_', 'substitui exatamente um caractere. “T_M” casa com Tim e Tom.']]) +
        sql("SELECT * FROM aluno WHERE nome LIKE 'J%';  -- José e João") },
      { t: 'IN e NOT IN', h: `<p>Seleciona os dados contidos em um conjunto de valores.</p>` + sql("SELECT telefone FROM aluno\nWHERE nome IN ('Maria', 'Luiza');  -- 9999 e 2333") },
      { t: 'IS NULL e IS NOT NULL', h:
        `<p>Testam se um valor é nulo.</p>` + sql('SELECT codigo, nome FROM aluno WHERE telefone IS NULL;  -- Carmem') +
        trap('Para testar nulo use IS NULL. A comparação telefone = NULL nunca é verdadeira, pois NULL representa valor desconhecido.', 'Complemento') },
      { t: 'ORDER BY e DISTINCT', h:
        `<p><b>ORDER BY</b> ordena o resultado, por nome de coluna ou número da coluna, em ordem ASC (padrão) ou DESC. <b>DISTINCT</b> elimina linhas repetidas.</p>` +
        sql("SELECT nome FROM aluno ORDER BY nome;            -- João, José, Luiza, Maria, Pedro\nSELECT nome, idade FROM aluno ORDER BY idade DESC;\n\n-- departamentos que têm funcionários alocados\nSELECT DISTINCT cod_dep FROM funcionario;  -- 001, 002, 003") },
      { g: 'Funções e agrupamento', t: 'Funções de agregação', h:
        `<p>MAX, MIN, SUM, AVG e COUNT computam <b>um único valor</b> a partir de um conjunto de valores de um atributo.</p>` +
        sql("SELECT MIN(idade), MAX(idade) FROM aluno;   -- 13 e 45\nSELECT AVG(idade) FROM aluno;             -- 27,2\nSELECT SUM(idade) FROM aluno;             -- 136\nSELECT COUNT(*) FROM aluno WHERE telefone = '2222';  -- 1") },
      { t: 'GROUP BY', h:
        `<p>Define subgrupos para obter o resultado das funções agregadas. Os atributos de agrupamento devem aparecer também no SELECT; <b>só as funções de agregação</b> podem aparecer no SELECT sem estar no GROUP BY.</p>` +
        sql('SELECT cod_dep, COUNT(*)\nFROM funcionario\nGROUP BY cod_dep\nORDER BY cod_dep;') +
        T(['cod_dep', 'COUNT(*)'], [['001', 2], ['002', 3], ['003', 1]], { cap: 'Quantidade de funcionários por departamento (dados do simulador)' }) },
      { t: 'HAVING', h:
        `<p>Aplica condições sobre <b>cada grupo</b>. Deve ser usada junto com GROUP BY, e só os grupos que satisfazem a condição são recuperados.</p>` +
        sql('SELECT cod_dep, COUNT(*)\nFROM funcionario\nGROUP BY cod_dep\nHAVING COUNT(*) >= 2;   -- departamentos 001 e 002') +
        note('O enunciado do slide diz “maior que 2”, mas a consulta e o resultado mostrados usam “≥ 2” (pelo menos dois funcionários). Aqui seguimos a consulta.', 'Atenção') +
        trap('O predicado do HAVING só pode envolver funções de agregação ou colunas do agrupamento. HAVING idade >= 20 gera erro; para filtrar linhas individuais use WHERE.') },
      { t: 'Ordem de processamento', h:
        ol(['As linhas que satisfazem o <b>WHERE</b> são selecionadas.', 'Os grupos são formados pelo <b>GROUP BY</b> e as funções de agregação são aplicadas a cada grupo.', 'Os grupos que não satisfazem o <b>HAVING</b> são descartados.', 'Mostram-se as colunas e agregações listadas no <b>SELECT</b> (e então o ORDER BY ordena).']) +
        tip('WHERE filtra linhas antes de agrupar; HAVING filtra grupos depois. Essa diferença cai com frequência.') },
      { g: 'Junção de tabelas', t: 'Junção implícita e explícita', h:
        `<p>Junta duas ou mais tabelas ligando a chave primária de uma à chave estrangeira de outra, quando a consulta precisa acessar mais de uma tabela.</p>` +
        boxes([['Implícita', 'A relação entre as tabelas é escrita no WHERE.'], ['Explícita', 'Usa JOIN (ou INNER JOIN) com a cláusula ON.']]) +
        sql("-- implícita\nSELECT a.nome, c.descricao, c.carga_hr\nFROM aluno a, curso c\nWHERE a.cod_curso = c.codigo;\n\n-- explícita\nSELECT a.nome, c.descricao, c.carga_hr\nFROM aluno a JOIN curso c ON a.cod_curso = c.codigo;") +
        `<div class="grid2">${T(['codigo', 'descricao', 'carga_hr'], CUR, { cap: 'curso' })}${T(['matricula', 'nome', 'telefone', 'cod_curso'], ALU, { cap: 'aluno' })}</div>` +
        sql("-- alunos cujo nome inicia com P\nSELECT a.nome, a.telefone, c.descricao\nFROM aluno a JOIN curso c ON a.cod_curso = c.codigo\nWHERE a.nome LIKE 'P%';   -- Pedro, 6454, Inglês") },
      { g: 'Prática', t: 'Exercícios de consulta: marinheiros', h:
        `<p>A lista tem 19 exercícios sobre o banco da Marinha (marinheiros, barcos e reservas). As consultas completas estão na aba <b>Atividades</b>.</p>` },
    ],
    examples: [
      { t: 'Montador de consultas SELECT', d: 'Escolha colunas, filtro e ordenação e veja o SQL gerado e o resultado.', mount(el) {
        const T6 = AL.concat([['006', 'Carmem', 20, null]]);
        const conds = { none: 'sem filtro', gt: 'idade >', bt: 'idade BETWEEN', lk: 'nome LIKE', in: 'nome IN', nl: 'telefone IS NULL', nn: 'telefone IS NOT NULL' };
        el.innerHTML = `<div class="ctrl"><span>Colunas:</span>${ALH.map((c, i) => `<label><input type="checkbox" data-c="${i}" ${i === 1 || i === 2 ? 'checked' : ''}> ${c}</label>`).join('')}</div>
        <div class="ctrl"><label>WHERE <select id="cd">${Object.entries(conds).map(([k, v]) => `<option value="${k}">${v}</option>`).join('')}</select></label><input type="text" id="v1" size="10" value="18"><span id="et" hidden>e</span><input type="text" id="v2" size="6" value="25" hidden></div>
        <div class="ctrl"><label>ORDER BY <select id="ob"><option value="">(nenhum)</option><option value="1">nome</option><option value="2">idade</option></select></label><label><select id="dir"><option>ASC</option><option>DESC</option></select></label></div><div id="o"></div>`;
        const like = (p, s) => new RegExp('^' + p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/%/g, '.*').replace(/_/g, '.') + '$', 'i').test(s);
        const upd = () => {
          const cols = $$('input[data-c]', el).filter((x) => x.checked).map((x) => +x.dataset.c);
          const cd = $('#cd', el).value, v1 = $('#v1', el).value.trim(), v2 = $('#v2', el).value.trim();
          $('#v1', el).hidden = ['none', 'nl', 'nn'].includes(cd); $('#et', el).hidden = $('#v2', el).hidden = cd !== 'bt';
          if (cd === 'lk' && $('#v1', el).dataset.k !== 'lk') { $('#v1', el).value = 'J%'; $('#v1', el).dataset.k = 'lk'; }
          if (cd === 'in' && $('#v1', el).dataset.k !== 'in') { $('#v1', el).value = 'Maria, Luiza'; $('#v1', el).dataset.k = 'in'; }
          if (['gt', 'bt'].includes(cd) && !/^\d/.test($('#v1', el).value)) { $('#v1', el).value = '18'; $('#v1', el).dataset.k = 'gt'; }
          const a = $('#v1', el).value.trim();
          let rows = T6.slice(), w = '';
          if (cd === 'gt') { rows = rows.filter((r) => r[2] > +a); w = `idade > ${+a}`; }
          if (cd === 'bt') { rows = rows.filter((r) => r[2] >= +a && r[2] <= +v2); w = `idade BETWEEN ${+a} AND ${+v2}`; }
          if (cd === 'lk') { rows = rows.filter((r) => like(a, r[1])); w = `nome LIKE '${a}'`; }
          if (cd === 'in') { const L = a.split(',').map((s) => s.trim().toLowerCase()); rows = rows.filter((r) => L.includes(r[1].toLowerCase())); w = `nome IN (${a.split(',').map((s) => `'${s.trim()}'`).join(', ')})`; }
          if (cd === 'nl') { rows = rows.filter((r) => r[3] === null); w = 'telefone IS NULL'; }
          if (cd === 'nn') { rows = rows.filter((r) => r[3] !== null); w = 'telefone IS NOT NULL'; }
          const ob = $('#ob', el).value, dir = $('#dir', el).value;
          if (ob) rows.sort((x, y) => (x[+ob] > y[+ob] ? 1 : x[+ob] < y[+ob] ? -1 : 0) * (dir === 'DESC' ? -1 : 1));
          if (!cols.length) { $('#o', el).innerHTML = '<div class="empty">Marque ao menos uma coluna.</div>'; return; }
          const q = `SELECT ${cols.length === 4 ? '*' : cols.map((c) => ALH[c]).join(', ')}\nFROM aluno` + (w ? `\nWHERE ${w}` : '') + (ob ? `\nORDER BY ${ALH[+ob]} ${dir}` : '') + ';';
          $('#o', el).innerHTML = sql(q) + (rows.length ? T(cols.map((c) => ALH[c]), rows.map((r) => cols.map((c) => (r[c] === null ? '<span class="null">NULL</span>' : r[c])))) : '<div class="empty">Nenhuma linha atende à condição.</div>') + `<p style="color:var(--muted);font-size:.9rem">${rows.length} linha(s). A tabela aqui tem a aluna Carmem (sem telefone) para testar IS NULL.</p>`;
        };
        $$('input,select', el).forEach((x) => x.addEventListener('input', upd)); upd();
      } },
      { t: 'GROUP BY e HAVING passo a passo', d: 'Veja a ordem de processamento: WHERE, formação dos grupos, HAVING e SELECT.', mount(el) {
        el.innerHTML = `${T(['codigo', 'nome', 'idade', 'cod_dep'], FUN, { cap: 'funcionario' })}<div class="ctrl"><label>Agregação <select id="fn"><option>COUNT(*)</option><option>AVG(idade)</option><option>MAX(idade)</option><option>SUM(idade)</option></select></label><label>WHERE idade ≥ <input type="range" id="w" min="0" max="60" step="1" value="0"> <b id="wv">0</b></label><label>HAVING agregação ≥ <input type="number" id="h" value="2" min="0" style="width:80px"></label></div><div id="o"></div>`;
        const calc = (fn, rs) => (fn === 'COUNT(*)' ? rs.length : fn === 'AVG(idade)' ? Math.round(rs.reduce((s, r) => s + r[2], 0) / rs.length * 10) / 10 : fn === 'MAX(idade)' ? Math.max(...rs.map((r) => r[2])) : rs.reduce((s, r) => s + r[2], 0));
        const upd = () => {
          const fn = $('#fn', el).value, w = +$('#w', el).value, h = +$('#h', el).value; $('#wv', el).textContent = w;
          const rows = FUN.filter((r) => r[2] >= w), g = {}; rows.forEach((r) => (g[r[3]] = g[r[3]] || []).push(r));
          const grp = Object.entries(g).map(([d, rs]) => [d, rs, calc(fn, rs)]), keep = grp.filter((x) => x[2] >= h);
          const q = `SELECT cod_dep, ${fn}\nFROM funcionario\n` + (w ? `WHERE idade >= ${w}\n` : '') + `GROUP BY cod_dep\nHAVING ${fn} >= ${h};`;
          $('#o', el).innerHTML = sql(q) + `<div class="grid2"><div class="box"><b class="h">1. WHERE</b><p>${rows.length} de ${FUN.length} linhas passam.</p></div><div class="box"><b class="h">2. GROUP BY</b><p>${grp.length} grupo(s): ${grp.map((x) => `${x[0]} (${x[1].length})`).join(', ') || 'nenhum'}.</p></div><div class="box"><b class="h">3. HAVING</b><p>${keep.length} de ${grp.length} grupo(s) ficam; descartados: ${grp.filter((x) => x[2] < h).map((x) => x[0]).join(', ') || 'nenhum'}.</p></div><div class="box"><b class="h">4. SELECT</b><p>Mostra cod_dep e ${fn} para os grupos restantes.</p></div></div>` + (keep.length ? T(['cod_dep', fn], keep.map((x) => [x[0], x[2]]), { cap: 'Resultado' }) : '<div class="empty">Nenhum grupo satisfaz o HAVING.</div>');
        };
        $$('input,select', el).forEach((x) => x.addEventListener('input', upd)); upd();
      } },
    ],
    activities: [
      { t: 'WHERE, GROUP BY, HAVING ou ORDER BY?', d: 'Escolha a cláusula adequada.', kind: 'classify',
        cfg: { choices: ['WHERE', 'GROUP BY', 'HAVING', 'ORDER BY'], items: [
          { t: 'Filtrar os alunos com idade maior que 18.', a: 0, why: 'Filtra linhas individuais.' },
          { t: 'Obter a quantidade de funcionários por departamento.', a: 1, why: 'Forma subgrupos para aplicar COUNT.' },
          { t: 'Manter somente departamentos com pelo menos 2 funcionários.', a: 2, why: 'Condição sobre o resultado da agregação, por grupo.' },
          { t: 'Mostrar os nomes em ordem alfabética.', a: 3, why: 'Ordena o resultado.' },
          { t: 'Descartar funcionários com menos de 20 anos antes de calcular a média.', a: 0, why: 'Filtro de linhas, antes do agrupamento.' },
          { t: 'Manter só os níveis de avaliação cuja média de idade passa de 30.', a: 2, why: 'Condição sobre AVG, que é por grupo.' },
        ] } },
      { t: 'Qual função de agregação?', d: 'Relacione a pergunta à função.', kind: 'classify',
        cfg: { choices: ['COUNT', 'SUM', 'AVG', 'MIN / MAX'], items: [
          { t: 'Quantos alunos existem?', a: 0, why: 'COUNT(*) conta linhas.' },
          { t: 'Qual o total das idades?', a: 1, why: 'SUM soma os valores.' },
          { t: 'Qual a idade média?', a: 2, why: 'AVG calcula a média.' },
          { t: 'Qual a idade do aluno mais novo?', a: 3, why: 'MIN devolve o menor valor.' },
          { t: 'Qual a maior idade da turma?', a: 3, why: 'MAX devolve o maior valor.' },
        ] } },
      { t: 'Lista de exercícios: marinheiros', d: 'Assumindo o esquema marinheiro(idMarinheiro, nome, avaliacao, idade), barco(idBarco, nome, cor) e reserva(idMarinheiro, idBarco, data), que é o usual desse exercício. Os dados reais estão no Classroom, então confira os nomes das colunas.', kind: 'qa',
        items: MARINHA.map((q, i) => [`${i + 1}. ${q[0]}`, sql(q[1])]) },
      { t: 'Erros comuns', d: 'Por que estes comandos falham ou enganam?', kind: 'qa', items: [
        ['SELECT cod_dep, COUNT(*) FROM funcionario GROUP BY cod_dep HAVING idade >= 20; dá erro. Por quê?', '<p>O HAVING só pode usar funções de agregação ou colunas do agrupamento. “idade” é uma coluna de linha individual. Para filtrar linhas, use WHERE antes do GROUP BY.</p>'],
        ['SELECT nome, COUNT(*) FROM funcionario GROUP BY cod_dep; está certo?', '<p>Não. Toda coluna do SELECT que não é agregação deve estar no GROUP BY. “nome” não está e não faz sentido por grupo.</p>'],
        ['Por que WHERE telefone = NULL não devolve nada?', '<p>NULL é valor desconhecido e nenhuma comparação com = é verdadeira. Use IS NULL.</p>'],
        ['Qual a diferença entre COUNT(*) e COUNT(coluna)?', '<p>COUNT(*) conta todas as linhas do grupo. COUNT(coluna) conta só as linhas em que a coluna não é nula.</p>'],
      ] },
    ],
    challenges: [
      { stem: 'Considerando a tabela aluno (Maria 18, José 23, João 45, Pedro 13, Luiza 37), quantas linhas retorna: SELECT * FROM aluno WHERE idade BETWEEN 10 AND 20;',
        opts: ['1', '2', '3', '4', '5'], c: 1,
        e: '<p>BETWEEN inclui os limites. Satisfazem Maria (18) e Pedro (13): 2 linhas.</p>' },
      { stem: 'Na mesma tabela, o comando SELECT * FROM aluno WHERE nome LIKE \'J%\'; retorna:',
        opts: ['Somente José.', 'José e João.', 'Maria e Pedro.', 'Todos os alunos.', 'Nenhum aluno.'], c: 1,
        e: '<p>O curinga % substitui qualquer sequência de caracteres. Nomes que começam com J: José e João.</p>' },
      { stem: 'Para listar os alunos que não têm telefone cadastrado (valor nulo), a cláusula correta é:',
        opts: ['WHERE telefone = NULL', 'WHERE telefone = 0', 'WHERE telefone IS NULL', 'WHERE telefone LIKE NULL', 'WHERE telefone IN NULL'], c: 2,
        e: '<p>O teste de nulo é feito com IS NULL (ou IS NOT NULL).</p>' },
      { stem: 'Qual é a diferença essencial entre WHERE e HAVING?',
        opts: ['Não há diferença.', 'WHERE filtra linhas antes do agrupamento; HAVING filtra grupos depois da agregação.', 'HAVING filtra linhas e WHERE filtra grupos.', 'WHERE só funciona com GROUP BY.', 'HAVING pode ser usado sem funções de agregação sobre colunas individuais.'], c: 1,
        e: '<p>WHERE seleciona linhas; os grupos são formados; o HAVING descarta grupos que não satisfazem a condição.</p>' },
      { stem: 'Qual é a ordem de processamento correta de uma consulta com WHERE, GROUP BY e HAVING?',
        opts: ['HAVING, GROUP BY, WHERE', 'GROUP BY, WHERE, HAVING', 'WHERE, GROUP BY (com agregação), HAVING', 'WHERE, HAVING, GROUP BY', 'SELECT, WHERE, GROUP BY'], c: 2,
        e: '<p>Primeiro se filtram as linhas (WHERE), depois se formam os grupos e se aplicam as agregações, e por fim se descartam os grupos pelo HAVING.</p>' },
      { stem: 'Na tabela funcionario, os departamentos têm 2 (001), 3 (002) e 1 (003) funcionários. O que retorna: SELECT cod_dep, COUNT(*) FROM funcionario GROUP BY cod_dep HAVING COUNT(*) >= 2;',
        opts: ['Somente o departamento 002.', 'Os departamentos 001 e 002.', 'Os três departamentos.', 'Somente o departamento 003.', 'Erro de sintaxe.'], c: 1,
        e: '<p>Os grupos 001 (2) e 002 (3) satisfazem COUNT(*) ≥ 2; o 003 (1) é descartado.</p>' },
      { stem: 'Sobre as idades dos 5 alunos (18, 23, 45, 13, 37), qual o resultado de SELECT SUM(idade) FROM aluno;',
        opts: ['5', '27', '45', '136', '13'], c: 3,
        e: '<p>18 + 23 + 45 + 13 + 37 = 136. A média (AVG) seria 27,2.</p>' },
      { stem: 'A tabela funcionario tem as linhas (cod_dep): 001, 001, 002, 002, 002, 003. Quantas linhas retorna SELECT DISTINCT cod_dep FROM funcionario;',
        opts: ['1', '2', '3', '5', '6'], c: 2,
        e: '<p>DISTINCT elimina repetições: restam 001, 002 e 003.</p>' },
      { stem: 'As consultas abaixo produzem o mesmo resultado? (1) SELECT a.nome, c.descricao FROM aluno a, curso c WHERE a.cod_curso = c.codigo; (2) SELECT a.nome, c.descricao FROM aluno a JOIN curso c ON a.cod_curso = c.codigo;',
        opts: ['Não: só a (2) liga as tabelas.', 'Sim: a (1) é junção implícita e a (2) é junção explícita.', 'Não: a (1) gera erro de sintaxe.', 'Sim, mas só se houver GROUP BY.', 'Não: a (2) devolve mais linhas.'], c: 1,
        e: '<p>A relação entre as tabelas pode ser escrita no WHERE (implícita) ou com JOIN … ON (explícita). O resultado é o mesmo.</p>' },
      { stem: 'Por que o comando SELECT cod_dep, COUNT(*) FROM funcionario GROUP BY cod_dep HAVING idade >= 20; resulta em erro?',
        opts: ['Porque COUNT(*) não pode ser usada com GROUP BY.', 'Porque o predicado do HAVING só pode envolver funções de agregação ou colunas do agrupamento.', 'Porque falta o ORDER BY.', 'Porque HAVING só funciona com a cláusula LIKE.', 'Porque cod_dep não pode ser agrupado.'], c: 1,
        e: '<p>“idade” não é agregação nem coluna de agrupamento. Para filtrar linhas, use WHERE.</p>' },
    ],
  });
})();
