(function () {
  const AL = [['001', 'Maria', 18, '9999'], ['002', 'José', 23, '4444'], ['003', 'João', 45, '2222'], ['004', 'Pedro', 13, '6454'], ['005', 'Luiza', 37, '2333']];
  const ALH = ['codigo', 'nome', 'idade', 'telefone'];
  const FUN = [['001', 'Maria', 23, '001'], ['002', 'José', 34, '001'], ['003', 'João', 67, '002'], ['004', 'Pedro', 54, '002'], ['005', 'Luiza', 32, '002'], ['006', 'Ana', 28, '003']];
  const CUR = [['001', 'Inglês', 100], ['002', 'Alemão', 120], ['003', 'Francês', 90], ['004', 'Italiano', 100]];
  const ALU = [['001', 'Maria', '9999', '003'], ['002', 'José', '4444', '003'], ['003', 'João', '2222', '004'], ['004', 'Pedro', '6454', '001']];

  /* ---- banco da atividade prática: streaming de música ---- */
  const STR_ART = [['1', 'Luedji Luna', 'Brasil'], ['2', 'Tim Maia', 'Brasil'],
    ['3', 'Rosalía', 'Espanha'], ['4', 'Bad Bunny', 'Porto Rico'], ['5', 'Elza Soares', 'Brasil']];
  const STR_ALB = [['10', 'Um Corpo No Mundo', '2017', '1'], ['11', 'Racional Vol. 1', '1975', '2'],
    ['12', 'MOTOMAMI', '2022', '3'], ['13', 'Un Verano Sin Ti', '2022', '4'],
    ['14', 'A Mulher do Fim do Mundo', '2015', '5'], ['15', 'Bom Mesmo É Estar Debaixo D\'Água', '2020', '1']];
  const STR_MUS = [['100', 'Um Corpo No Mundo', '281', '10'], ['101', 'Banho de Folhas', '247', '10'],
    ['102', 'Imunização Racional', '214', '11'], ['103', 'SAOKO', '135', '12'],
    ['104', 'DESPECHÁ', '158', '12'], ['105', 'Tití Me Preguntó', '243', '13'],
    ['106', 'A Mulher do Fim do Mundo', '268', '14'], ['107', 'Chico', '198', '15']];
  const STR_USU = [['1000', 'Rafaela Nunes', 'rafa@mail.com', 'premium', '2024-02-10'],
    ['1001', 'Caio Moura', 'caio@mail.com', 'gratuito', '2025-01-05'],
    ['1002', 'Diana Alves', null, 'premium', '2023-08-22'],
    ['1003', 'Noah Prado', 'noah@mail.com', 'familia', '2025-06-30'],
    ['1004', 'Vitória Lima', 'vi@mail.com', 'gratuito', '2024-11-14']];


  MODULES.push({
    id: 'a11', acc: 'yel', grp: 'SQL na prática', short: 'DQL: consultas',
    title: 'DQL: consultando dados com SELECT',
    blurb: 'Do SELECT básico a operadores, ordenação, funções de agregação, GROUP BY, HAVING e a primeira junção entre tabelas.',
    topics: [
      { g: 'Consulta básica', t: 'SELECT, FROM e WHERE', h:
        `<p>O <b>SELECT</b> realiza consultas. A cláusula <b>FROM</b> indica de quais tabelas vêm as informações e a <b>WHERE</b> filtra pela condição.</p>` +
        sql("SELECT * FROM aluno;                    -- todos os atributos\nSELECT nome, idade FROM aluno;          -- só algumas colunas\n\nSELECT <colunas>\nFROM <tabelas>\nWHERE <condição>;                        -- atributo operador valor") +
        T(ALH, AL, { cap: 'aluno (usada nos exemplos)' }) +
        sql("SELECT idade FROM aluno WHERE nome = 'João';   -- 45\nSELECT * FROM aluno WHERE idade > 18;") +
        anim('sqlSelect', '<b>Passo a passo.</b> O banco testa a condição linha por linha; quem passa segue para o resultado. Repare que Maria tem 18 e fica de fora, porque o operador é <code>&gt;</code> e não <code>&gt;=</code>.') },
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
        sql("SELECT nome FROM aluno ORDER BY nome;            -- João, José, Luiza, Maria, Pedro\nSELECT nome, idade FROM aluno ORDER BY idade DESC;\n\n-- departamentos que têm funcionários alocados\nSELECT DISTINCT cod_dep FROM funcionario;  -- 001, 002, 003") +
        anim('sqlOrder', '<b>Passo a passo.</b> As linhas trocam de lugar até ficarem em ordem de idade. Sem ORDER BY não existe ordem garantida, mesmo que o resultado pareça ordenado na tela.') },
      { g: 'Funções e agrupamento', t: 'Funções de agregação', h:
        `<p>MAX, MIN, SUM, AVG e COUNT computam <b>um único valor</b> a partir de um conjunto de valores de um atributo.</p>` +
        sql("SELECT MIN(idade), MAX(idade) FROM aluno;   -- 13 e 45\nSELECT AVG(idade) FROM aluno;             -- 27,2\nSELECT SUM(idade) FROM aluno;             -- 136\nSELECT COUNT(*) FROM aluno WHERE telefone = '2222';  -- 1") },
      { t: 'GROUP BY', h:
        `<p>Define subgrupos para obter o resultado das funções agregadas. Os atributos de agrupamento devem aparecer também no SELECT; <b>só as funções de agregação</b> podem aparecer no SELECT sem estar no GROUP BY.</p>` +
        sql('SELECT cod_dep, COUNT(*)\nFROM funcionario\nGROUP BY cod_dep\nORDER BY cod_dep;') +
        T(['cod_dep', 'COUNT(*)'], [['001', 2], ['002', 3], ['003', 1]], { cap: 'Quantidade de funcionários por departamento (dados do simulador)' }) +
        anim('sqlGroup', '<b>Passo a passo.</b> As linhas com o mesmo departamento viram um grupo só, e a contagem é feita dentro de cada grupo. Seis funcionários resultam em três linhas.') },
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
      { g: 'Prática', t: 'Atividade prática: streaming de música', h:
        `<p>Um serviço de streaming guarda artistas, álbuns, músicas, usuários e reproduções. Você vai escrever as consultas desse banco na aba <b>Atividades</b>: são 15 tarefas em dificuldade crescente, do SELECT simples até junção com agrupamento.</p>` +
        `<p>O esquema é este:</p>` +
        T(['Tabela', 'Colunas', 'Observações'], [
          ['artista', 'id_artista (PK), nome, pais', 'Um artista tem vários álbuns.'],
          ['album', 'id_album (PK), titulo, ano, id_artista (FK)', 'Cada álbum pertence a um artista.'],
          ['musica', 'id_musica (PK), titulo, duracao_seg, id_album (FK)', 'Duração guardada em segundos.'],
          ['usuario', 'id_usuario (PK), nome, email, plano, data_cadastro', 'O e-mail pode ser nulo; o plano é gratuito, premium ou familia.'],
          ['reproducao', 'id_reproducao (PK), id_usuario (FK), id_musica (FK), data_hora', 'Uma linha por vez que alguém ouviu uma música.'],
        ]) +
        note('O script que cria e povoa o banco está na primeira tarefa da aba Atividades. Monte o banco no MySQL ou no DBeaver e escreva cada consulta antes de abrir o gabarito.', 'Como fazer') +
        T(['id_artista', 'nome', 'pais'], STR_ART, { cap: 'artista' }) +
        T(['id_album', 'titulo', 'ano', 'id_artista'], STR_ALB, { cap: 'album' }) +
        T(['id_musica', 'titulo', 'duracao_seg', 'id_album'], STR_MUS, { cap: 'musica' }) +
        T(['id_usuario', 'nome', 'email', 'plano', 'data_cadastro'],
          STR_USU.map((u) => [u[0], u[1], u[2] === null ? '<i>NULL</i>' : u[2], u[3], u[4]]), { cap: 'usuario' }) },
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
      { t: 'Atividade prática: streaming de música', d: 'Quinze tarefas em dificuldade crescente sobre o banco de um serviço de streaming. Escreva cada consulta no SGBD antes de abrir o gabarito — a resposta só aparece quando você clica.', kind: 'qa', items: [
        ['0. Monte o banco: script de criação e carga',
          `<p>Rode este script no MySQL ou no DBeaver antes de começar. Ele cria as cinco tabelas e insere os dados usados nas tarefas.</p>` + sql("CREATE DATABASE IF NOT EXISTS streaming\n  CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;\nUSE streaming;\n\nCREATE TABLE artista (\n  id_artista INT PRIMARY KEY,\n  nome       VARCHAR(80) NOT NULL,\n  pais       VARCHAR(40)\n);\n\nCREATE TABLE album (\n  id_album   INT PRIMARY KEY,\n  titulo     VARCHAR(120) NOT NULL,\n  ano        SMALLINT,\n  id_artista INT,\n  FOREIGN KEY (id_artista) REFERENCES artista (id_artista)\n);\n\nCREATE TABLE musica (\n  id_musica    INT PRIMARY KEY,\n  titulo       VARCHAR(120) NOT NULL,\n  duracao_seg  SMALLINT CHECK (duracao_seg > 0),\n  id_album     INT,\n  FOREIGN KEY (id_album) REFERENCES album (id_album)\n);\n\nCREATE TABLE usuario (\n  id_usuario    INT PRIMARY KEY,\n  nome          VARCHAR(80) NOT NULL,\n  email         VARCHAR(120),\n  plano         VARCHAR(20) NOT NULL,\n  data_cadastro DATE NOT NULL\n);\n\nCREATE TABLE reproducao (\n  id_reproducao INT PRIMARY KEY AUTO_INCREMENT,\n  id_usuario    INT,\n  id_musica     INT,\n  data_hora     DATETIME NOT NULL,\n  FOREIGN KEY (id_usuario) REFERENCES usuario (id_usuario),\n  FOREIGN KEY (id_musica)  REFERENCES musica  (id_musica)\n);\n\nINSERT INTO artista VALUES\n  (1,'Luedji Luna','Brasil'), (2,'Tim Maia','Brasil'), (3,'Rosalía','Espanha'),\n  (4,'Bad Bunny','Porto Rico'), (5,'Elza Soares','Brasil');\n\nINSERT INTO album VALUES\n  (10,'Um Corpo No Mundo',2017,1), (11,'Racional Vol. 1',1975,2),\n  (12,'MOTOMAMI',2022,3), (13,'Un Verano Sin Ti',2022,4),\n  (14,'A Mulher do Fim do Mundo',2015,5),\n  (15,'Bom Mesmo É Estar Debaixo D''Água',2020,1);\n\nINSERT INTO musica VALUES\n  (100,'Um Corpo No Mundo',281,10), (101,'Banho de Folhas',247,10),\n  (102,'Imunização Racional',214,11), (103,'SAOKO',135,12),\n  (104,'DESPECHÁ',158,12), (105,'Tití Me Preguntó',243,13),\n  (106,'A Mulher do Fim do Mundo',268,14), (107,'Chico',198,15);\n\nINSERT INTO usuario VALUES\n  (1000,'Rafaela Nunes','rafa@mail.com','premium','2024-02-10'),\n  (1001,'Caio Moura','caio@mail.com','gratuito','2025-01-05'),\n  (1002,'Diana Alves',NULL,'premium','2023-08-22'),\n  (1003,'Noah Prado','noah@mail.com','familia','2025-06-30'),\n  (1004,'Vitória Lima','vi@mail.com','gratuito','2024-11-14');\n\nINSERT INTO reproducao (id_usuario, id_musica, data_hora) VALUES\n  (1000,100,'2025-09-01 08:12:00'), (1000,101,'2025-09-01 08:17:00'),\n  (1000,103,'2025-09-02 21:40:00'), (1001,105,'2025-09-02 19:05:00'),\n  (1001,105,'2025-09-03 19:10:00'), (1001,104,'2025-09-03 19:13:00'),\n  (1002,106,'2025-09-04 07:55:00'), (1002,100,'2025-09-05 07:58:00'),\n  (1002,107,'2025-09-05 08:30:00'), (1003,102,'2025-09-06 22:00:00'),\n  (1003,103,'2025-09-07 22:04:00'), (1004,105,'2025-09-08 12:00:00');")],
        ['1. Liste o título e a duração de todas as músicas.',
          `<p><b>Dica.</b> É o SELECT mais simples: escolha as colunas e diga de qual tabela.</p>` + sql('SELECT titulo, duracao_seg\nFROM musica;') + `<p style="color:var(--muted)">Nenhum filtro: todas as linhas da tabela aparecem.</p>`],
        ['2. Mostre apenas os artistas que não são do Brasil.',
          `<p><b>Dica.</b> Use o operador de diferença no WHERE. Em SQL ele é <> (alguns SGBDs aceitam != também).</p>` + sql("SELECT nome, pais\nFROM artista\nWHERE pais <> 'Brasil';") + `<p style="color:var(--muted)">Atenção: se algum país fosse NULL, essa linha não apareceria, porque NULL não se compara.</p>`],
        ['3. Liste as músicas com duração entre 200 e 260 segundos.',
          `<p><b>Dica.</b> BETWEEN inclui as duas pontas.</p>` + sql('SELECT titulo, duracao_seg\nFROM musica\nWHERE duracao_seg BETWEEN 200 AND 260;') + `<p style="color:var(--muted)">BETWEEN 200 AND 260 é o mesmo que duracao_seg >= 200 AND duracao_seg <= 260.</p>`],
        ['4. Encontre os usuários que ainda não cadastraram e-mail.',
          `<p><b>Dica.</b> Campo vazio e campo nulo são coisas diferentes. Nulo não se testa com o sinal de igual.</p>` + sql('SELECT nome, plano\nFROM usuario\nWHERE email IS NULL;') + `<p style="color:var(--muted)">WHERE email = NULL não devolveria nada: toda comparação com NULL resulta em desconhecido.</p>`],
        ['5. Liste os álbuns lançados a partir de 2020, do mais recente para o mais antigo.',
          `<p><b>Dica.</b> Filtre com WHERE e ordene com ORDER BY; DESC inverte a ordem.</p>` + sql('SELECT titulo, ano\nFROM album\nWHERE ano >= 2020\nORDER BY ano DESC;') + `<p style="color:var(--muted)">Sem ORDER BY não existe ordem garantida, mesmo que o resultado pareça ordenado.</p>`],
        ['6. Mostre os planos que existem na base, sem repetir nenhum.',
          `<p><b>Dica.</b> Há uma palavra-chave que elimina linhas repetidas no resultado.</p>` + sql('SELECT DISTINCT plano\nFROM usuario;') + `<p style="color:var(--muted)">São cinco usuários, mas apenas três planos distintos: gratuito, premium e familia.</p>`],
        ['7. Liste o título de cada música e a duração em minutos, com a coluna chamada duracao_min.',
          `<p><b>Dica.</b> Você pode fazer contas dentro do SELECT e dar um nome ao resultado com AS.</p>` + sql('SELECT titulo,\n       duracao_seg / 60 AS duracao_min\nFROM musica;') + `<p style="color:var(--muted)">Para arredondar, use ROUND(duracao_seg / 60, 1). O apelido criado aqui não pode ser usado no WHERE, só no ORDER BY.</p>`],
        ['8. Encontre os usuários cujo nome começa com a letra N.',
          `<p><b>Dica.</b> LIKE compara texto com um padrão; o % substitui qualquer quantidade de caracteres.</p>` + sql("SELECT nome\nFROM usuario\nWHERE nome LIKE 'N%';") + `<p style="color:var(--muted)">'N%' é começa com N. '%N' seria termina com N e '%N%' seria contém N.</p>`],
        ['9. Quantas músicas existem no catálogo?',
          `<p><b>Dica.</b> Uma função de agregação resolve em uma linha.</p>` + sql('SELECT COUNT(*) AS total_musicas\nFROM musica;') + `<p style="color:var(--muted)">COUNT(*) conta todas as linhas. COUNT(duracao_seg) ignoraria as linhas em que a duração fosse nula.</p>`],
        ['10. Qual é a duração média das músicas e qual é a mais longa?',
          `<p><b>Dica.</b> Duas funções de agregação podem aparecer no mesmo SELECT.</p>` + sql('SELECT AVG(duracao_seg) AS media,\n       MAX(duracao_seg) AS mais_longa\nFROM musica;') + `<p style="color:var(--muted)">AVG devolve a média e MAX o maior valor. Nenhuma coluna comum pode entrar aqui sem GROUP BY.</p>`],
        ['11. Conte quantos usuários existem em cada plano.',
          `<p><b>Dica.</b> Para contar por categoria, é preciso formar grupos antes.</p>` + sql('SELECT plano, COUNT(*) AS qtd\nFROM usuario\nGROUP BY plano;') + `<p style="color:var(--muted)">A coluna plano aparece no SELECT sem função de agregação, então ela precisa estar no GROUP BY.</p>`],
        ['12. Mostre apenas os planos que têm mais de um usuário.',
          `<p><b>Dica.</b> O filtro agora é sobre o grupo, não sobre a linha. WHERE não aceita função de agregação.</p>` + sql('SELECT plano, COUNT(*) AS qtd\nFROM usuario\nGROUP BY plano\nHAVING COUNT(*) > 1;') + `<p style="color:var(--muted)">WHERE filtra linhas antes do agrupamento; HAVING filtra grupos depois. Essa diferença é a que mais cai em prova.</p>`],
        ['13. Liste o título de cada álbum junto com o nome do artista.',
          `<p><b>Dica.</b> Duas tabelas, ligadas pela chave estrangeira. Dá para escrever com JOIN ou com vírgula no FROM.</p>` + sql('SELECT al.titulo, ar.nome AS artista\nFROM album al\nJOIN artista ar ON al.id_artista = ar.id_artista;') + `<p style="color:var(--muted)">A versão implícita seria FROM album al, artista ar WHERE al.id_artista = ar.id_artista. O resultado é o mesmo.</p>`],
        ['14. Liste o nome de cada artista e quantos álbuns ele tem, do maior para o menor.',
          `<p><b>Dica.</b> Junte as duas tabelas, agrupe pelo artista e conte. Depois ordene pelo apelido da contagem.</p>` + sql('SELECT ar.nome,\n       COUNT(al.id_album) AS qtd_albuns\nFROM artista ar\nJOIN album al ON ar.id_artista = al.id_artista\nGROUP BY ar.nome\nORDER BY qtd_albuns DESC;') + `<p style="color:var(--muted)">Luedji Luna aparece com 2 álbuns e os demais com 1. Repare que o ORDER BY pode usar o apelido, porque é a última etapa executada.</p>`],
        ['15. Mostre as três músicas mais ouvidas, com o número de reproduções.',
          `<p><b>Dica.</b> Junte musica e reproducao, agrupe pela música, conte e limite o resultado.</p>` + sql('SELECT m.titulo,\n       COUNT(*) AS vezes\nFROM musica m\nJOIN reproducao r ON m.id_musica = r.id_musica\nGROUP BY m.titulo\nORDER BY vezes DESC\nLIMIT 3;') + `<p style="color:var(--muted)">LIMIT é do MySQL; no SQL Server seria SELECT TOP 3 e no Oracle, FETCH FIRST 3 ROWS ONLY.</p>`],
      ] },
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
