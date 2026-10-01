(function () {
  const situacao = (n) => (n >= 70 ? 'APROVADO' : n >= 40 ? 'PROVA FINAL' : 'REPROVADO');

  MODULES.push({
    id: 'a15', acc: 'mint', grp: 'SQL na prática', short: 'SQL avançada',
    title: 'SQL avançada: views, procedures, functions e triggers',
    blurb: 'Objetos que ficam guardados no banco: visões, procedimentos e funções com variáveis, condicionais e laços, e gatilhos que reagem a INSERT, UPDATE e DELETE.',
    topics: [
      { g: 'Views', t: 'O que é uma view', h:
        `<p>Uma <b>visão</b> é uma tabela derivada de outra(s) tabela(s), que podem ser tabelas básicas ou outras visões. É uma <b>tabela virtual</b>: não existe fisicamente. As tuplas são realmente armazenadas nas tabelas base.</p>` +
        `<h4>Vantagens</h4>` + ul(['Restringe o acesso a um conjunto predeterminado de colunas de uma tabela.', 'Esconde dados complexos ou salva consultas complexas (por exemplo, um join de várias tabelas).', 'Simplifica os comandos para o usuário.', 'Apresenta os dados em outra perspectiva e permite renomear colunas.']) },
      { t: 'Sintaxe e operações com views', h:
        sql("CREATE [OR REPLACE] VIEW <nome> [(lista_colunas)]\nAS <expressão de consulta>\n[WITH [CASCADED | LOCAL] CHECK OPTION];") +
        `<p><b>WITH CHECK OPTION</b> não deixa as operações violarem a condição de filtro (WHERE) da visão: verifica, na inserção pela view, se os valores obedecem às restrições. CASCADED e LOCAL controlam como a condição passa entre views encadeadas.</p>` +
        sql("SELECT * FROM <nome da view>;          -- consulta como se fosse tabela\nALTER VIEW <nome> AS <consulta>;           -- altera\nDROP VIEW <nome>;                          -- elimina") +
        ul(['As visões refletem as atualizações das tabelas base.', 'Depois de criadas, em algumas circunstâncias, podem ser usadas em INSERT, UPDATE e DELETE.']) +
        sql("CREATE VIEW pessoa_fem AS\nSELECT mat_pessoa, nome, data_nascimento\nFROM pessoa\nWHERE sexo = 'F';\n\nSELECT * FROM pessoa_fem;") },
      { g: 'Procedures e functions', t: 'Procedimentos (stored procedures)', h:
        `<p>Um <b>procedimento</b> é um grupo de comandos que executa uma tarefa e pode ser invocado por um nome. Permite agrupar rotinas afins (encapsulamento). Aplicações: validação de dados, controle de acesso, execução de comandos complexos.</p>` +
        sql("CREATE PROCEDURE nome_procedure (parametros)\n  statements;\n\nCALL nome_procedure (parametros);   -- executar\nDROP PROCEDURE nome_procedure;      -- excluir") +
        sql("-- nome e curso do aluno, a partir da matrícula\nCREATE PROCEDURE dados_aluno (matricula SMALLINT)\n  SELECT p.nome AS Nome_Aluno, c.nome AS Nome_Curso\n  FROM pessoa p\n    JOIN aluno a ON mat_pessoa = mat_aluno\n    JOIN curso c ON a.cod_curso = c.cod_curso\n  WHERE mat_pessoa = matricula;\n\nCALL dados_aluno(1010);") },
      { t: 'Funções (functions)', h:
        `<p>Semelhante ao procedimento, mas <b>retorna um valor</b>. Pode ser chamada diretamente em um SELECT ou como parte de uma expressão.</p>` +
        sql("CREATE FUNCTION nome_função (parametros)\nRETURNS tipo_dado\n  statements\n  RETURN valor;\n\nSELECT nome_função (parametros);   -- executar") +
        sql("-- quanto falta para a nota máxima (100)\nCREATE FUNCTION para_NMax (nota SMALLINT)\nRETURNS SMALLINT\n  RETURN 100 - nota;\n\nSELECT para_NMax(70);                          -- 30\nSELECT mat_aluno, para_NMax(nota) FROM aluno_turma;") +
        T(['', 'Procedure', 'Function'], [['Retorna valor?', 'Não (pode exibir resultados)', 'Sim, com RETURN'], ['Como executar', 'CALL nome(...)', 'SELECT nome(...) ou dentro de expressões']]) },
      { t: 'Blocos: BEGIN, END e DELIMITER', h:
        `<p>Blocos reúnem vários comandos dentro de procedimentos e funções, entre <b>BEGIN</b> e <b>END</b>. Como dentro do bloco há vários comandos terminados em “;”, é preciso trocar o delimitador com <b>DELIMITER</b>, para o MySQL entender onde o procedimento termina.</p>` +
        sql("DELIMITER $$\nCREATE PROCEDURE dados_aluno_disciplina (matricula SMALLINT)\nBEGIN\n  SELECT p.nome AS Nome_Aluno, c.nome AS Nome_Curso\n  FROM pessoa p JOIN aluno a ON mat_pessoa = mat_aluno\n    JOIN curso c ON a.cod_curso = c.cod_curso\n  WHERE mat_pessoa = matricula;\n\n  SELECT d.nome AS disciplina, ano_semestre, nota\n  FROM aluno_turma a JOIN disciplina d\n    ON a.cod_curso = d.cod_curso AND a.cod_disciplina = d.cod_disciplina\n  WHERE mat_aluno = matricula;\nEND $$\nDELIMITER ;\n\nCALL dados_aluno_disciplina(1010);") },
      { t: 'Variáveis', h:
        `<p>São limitadas ao bloco em que foram declaradas. Usa-se <b>DECLARE</b>, logo após o BEGIN, com os mesmos tipos do MySQL. O valor muda com <b>SET</b> ou com <b>INTO</b> em um SELECT.</p>` +
        sql("DECLARE nome_variavel tipodado;") +
        sql("DELIMITER $$\nCREATE PROCEDURE dados_aluno_curso (matricula SMALLINT)\nBEGIN\n  DECLARE CURSO SMALLINT;\n  SELECT cod_curso INTO CURSO\n  FROM pessoa p JOIN aluno a ON mat_pessoa = mat_aluno\n  WHERE mat_aluno = matricula;\n  SELECT * FROM curso WHERE cod_curso = CURSO;\nEND $$\nDELIMITER ;") },
      { t: 'IF-THEN-ELSE e CASE', h:
        sql("IF <expressão booleana 1> THEN <instruções 1>;\n[ELSEIF <expressão 2> THEN <instruções 2>;]\n[ELSE <instruções 3>;]\nEND IF;") +
        note('O slide escreve ELSIF na sintaxe geral, mas em MySQL a palavra é ELSEIF, como no exemplo do próprio slide.', 'Atenção') +
        sql("DELIMITER $$\nCREATE FUNCTION aluno_nota (nota SMALLINT)\nRETURNS VARCHAR(15)\nBEGIN\n  DECLARE situacao VARCHAR(15);\n  IF nota >= 70 THEN SET situacao = 'APROVADO';\n  ELSEIF nota >= 40 THEN SET situacao = 'PROVA FINAL';\n  ELSE SET situacao = 'REPROVADO';\n  END IF;\n  RETURN situacao;\nEND $$\nDELIMITER ;\n\nSELECT aluno_nota(60);   -- PROVA FINAL") +
        `<p>A mesma função com <b>CASE</b>:</p>` +
        sql("  CASE\n    WHEN nota >= 70 THEN SET situacao = 'APROVADO';\n    WHEN nota >= 40 THEN SET situacao = 'PROVA FINAL';\n    ELSE SET situacao = 'REPROVADO';\n  END CASE;") },
      { t: 'Laços: LOOP, REPEAT e WHILE', h:
        `<p>Executam a mesma sequência de instruções várias vezes. Executam <b>infinitamente</b> a menos que haja instrução de saída, e podem ser aninhados.</p>` +
        T(['Laço', 'Quando testa a condição', 'Saída'], [['LOOP', 'Não testa: roda até um LEAVE', 'LEAVE rótulo'], ['REPEAT … UNTIL cond', 'Depois de cada volta (executa ao menos uma vez)', 'UNTIL verdadeiro'], ['WHILE cond DO', 'Antes de cada volta (pode não executar)', 'condição falsa']]) +
        sql("-- LOOP\nLOOP_EXEMPLO: LOOP\n  SET CONTADOR = CONTADOR + 1;\n  SET CALCULO = CALCULO - 1;\n  IF CONTADOR >= ITERACOES THEN LEAVE LOOP_EXEMPLO; END IF;\nEND LOOP LOOP_EXEMPLO;\n\n-- REPEAT\nREPEAT\n  SET CONTADOR = CONTADOR + 1;\n  SET CALCULO = CALCULO - 1;\nUNTIL CONTADOR >= ITERACOES\nEND REPEAT;\n\n-- WHILE\nWHILE CONTADOR < ITERACOES DO\n  SET CONTADOR = CONTADOR + 1;\n  SET CALCULO = CALCULO - 1;\nEND WHILE;") +
        `<p>Nos exemplos, a função parte de CALCULO = 100 e subtrai 1 a cada volta. Veja o comportamento no simulador de laços.</p>` },
      { t: 'ITERATE', h:
        `<p>Permite “pular” os comandos restantes da iteração atual de um laço (semelhante ao <code>continue</code> do Python). Contrasta com LEAVE, que sai do laço.</p>` +
        sql("LOOP_EXEMPLO: WHILE CONTADOR < ITERACOES DO\n  SET CONTADOR = CONTADOR + 1;\n  IF CONTADOR = 3 THEN\n    ITERATE LOOP_EXEMPLO;   -- pula o SELECT desta volta\n  END IF;\n  SELECT CONTADOR;\nEND WHILE;") +
        `<p>Com 5 iterações, o procedimento exibe 1, 2, 4 e 5: a terceira contagem não é mostrada.</p>` },
      { g: 'Triggers', t: 'O que é um trigger', h:
        `<p>Triggers (gatilhos) oferecem uma técnica procedural para especificar e manter <b>restrições de integridade mais complexas</b>. Ficam armazenados no BD e são executados imediatamente <b>antes ou depois</b> de um comando DML em uma tabela. São invocados automaticamente.</p>` +
        ul(['Criar o conteúdo de uma coluna derivada de outras colunas.', 'Criar validações envolvendo várias tabelas.', 'Criar logs do uso de uma tabela.', 'Atualizar outras tabelas em função de inclusão ou alteração na tabela atual.']) },
      { t: 'Ação do trigger: OLD, NEW, BEFORE e AFTER', h:
        ul(['A ação pode referenciar os valores <b>antigos (OLD)</b> e <b>novos (NEW)</b> das tuplas inseridas, deletadas ou atualizadas.', 'Eventos de UPDATE podem ser limitados a um atributo ou conjunto de atributos.', 'A ação só roda se o evento ocorrer e a condição for verdadeira.', '<b>BEFORE</b>: dispara imediatamente antes de o dado ser inserido; <b>AFTER</b>: imediatamente depois.', 'Pode haver vários gatilhos para uma mesma tabela.']) +
        T(['Evento', 'OLD', 'NEW'], [['INSERT', 'não existe', 'valores inseridos'], ['UPDATE', 'valores antes', 'valores depois'], ['DELETE', 'valores excluídos', 'não existe']]) +
        trap('Restrições de uso: um trigger não pode executar COMMIT, ROLLBACK ou SAVEPOINT; o SELECT só pode ser usado com INTO; e é preciso cuidado com o efeito cascata (um trigger disparando outro).') },
      { t: 'Sintaxe e exemplos de trigger', h:
        sql("CREATE TRIGGER nome_trigger\n[BEFORE | AFTER] [INSERT | UPDATE | DELETE]\nON nome_tabela\nFOR EACH ROW\n  declarações;\n\nDROP TRIGGER nome_trigger;") +
        `<h4>Data de agendamento futura</h4>` +
        sql("DELIMITER //\nCREATE TRIGGER tr_dt_futura\nBEFORE INSERT ON agendamento\nFOR EACH ROW\nBEGIN\n  DECLARE hoje VARCHAR(10);\n  SELECT DATE_FORMAT(SYSDATE(), '%Y-%m-%d') INTO hoje;\n  IF NEW.data_ag < hoje THEN\n    SET NEW.cpf_atd = NULL;\n  END IF;\nEND //\nDELIMITER ;") +
        `<h4>Backup antes de excluir</h4>` +
        sql("CREATE TABLE ATENDENTE_BK (\n  cpf VARCHAR(11) PRIMARY KEY,\n  nome VARCHAR(100),\n  idade SMALLINT,\n  cidade VARCHAR(20)\n);\n\nCREATE TRIGGER tr_inserir_AtBK\nBEFORE DELETE ON atendente\nFOR EACH ROW\n  INSERT INTO ATENDENTE_BK\n  VALUES (OLD.CPF, OLD.NOME, OLD.IDADE, OLD.CIDADE);") },
      { g: 'Atividades resolvidas', t: 'Função, procedimento, view e triggers', h:
        `<p>Os enunciados e as resoluções dos slides estão na aba <b>Atividades</b>: créditos totais do aluno (função), pesquisa de projeto (procedimento), resultado do vestibular (view) e validação da nota do vestibular (trigger), além do trigger de log de ementas.</p>` },
    ],
    examples: [
      { t: 'Função com IF-ELSEIF', d: 'Mude a nota e veja qual ramo da função aluno_nota é executado.', mount(el) {
        el.innerHTML = `<div class="ctrl"><label>nota <input type="range" id="n" min="0" max="100" value="60"> <b id="nv">60</b></label></div><div id="o"></div>`;
        const upd = () => {
          const n = +$('#n', el).value; $('#nv', el).textContent = n;
          const br = n >= 70 ? 0 : n >= 40 ? 1 : 2, tags = ['nota >= 70', 'nota >= 40', 'ELSE'];
          $('#o', el).innerHTML = T(['Ramo', 'Condição', 'Resultado', 'Executado?'], [['IF', 'nota >= 70', 'APROVADO', br === 0 ? 'sim' : 'não'], ['ELSEIF', 'nota >= 40', 'PROVA FINAL', br === 1 ? 'sim' : 'não'], ['ELSE', 'caso contrário', 'REPROVADO', br === 2 ? 'sim' : 'não']], { hl: [br], dim: [0, 1, 2].filter((i) => i !== br) }) + sql(`SELECT aluno_nota(${n});   -- ${situacao(n)}`) + `<p style="color:var(--muted);font-size:.9rem">Os ramos são testados em ordem; o primeiro verdadeiro (${tags[br]}) é executado e os demais são ignorados.</p>`;
        };
        $('#n', el).addEventListener('input', upd); upd();
      } },
      { t: 'Simulador de laços', d: 'Escolha o tipo de laço e o número de iterações, e acompanhe o valor retornado. Teste WHILE e REPEAT com 0 iterações.', mount(el) {
        el.innerHTML = `<div class="ctrl"><div class="seg" id="sg">${['LOOP', 'REPEAT', 'WHILE', 'WHILE + ITERATE'].map((k, i) => `<button data-k="${k}" aria-pressed="${i === 0}">${k}</button>`).join('')}</div><label>ITERACOES <input type="number" id="it" value="5" min="0" max="12" style="width:80px"></label></div><div id="o"></div>`;
        let kind = 'LOOP';
        const upd = () => {
          const it = Math.max(0, Math.min(12, +$('#it', el).value || 0)); let c = 0, calc = 100; const rows = [], shown = [];
          if (kind === 'LOOP') { for (;;) { c++; calc--; rows.push([c, calc, c >= it ? 'LEAVE' : '']); if (c >= it) break; } }
          else if (kind === 'REPEAT') { do { c++; calc--; rows.push([c, calc, c >= it ? 'UNTIL verdadeiro: sai' : '']); } while (!(c >= it)); }
          else if (kind === 'WHILE') { while (c < it) { c++; calc--; rows.push([c, calc, '']); } }
          else { while (c < it) { c++; if (c === 3) { rows.push([c, '—', 'ITERATE: pula o SELECT']); continue; } shown.push(c); rows.push([c, '—', 'SELECT CONTADOR → ' + c]); } }
          const code_ = { LOOP: 'EX_LOOP', REPEAT: 'EX_REPEAT', WHILE: 'EX_WHILE', 'WHILE + ITERATE': 'EX_ITERATE' }[kind];
          const head = kind === 'WHILE + ITERATE' ? `CALL ${code_}(${it});` : `SELECT ${code_}(${it});   -- retorna ${calc}`;
          $('#o', el).innerHTML = sql(head) + (rows.length ? T(['volta (CONTADOR)', kind === 'WHILE + ITERATE' ? 'exibe' : 'CALCULO', 'observação'], rows.map((r) => [r[0], r[1], r[2]]), { dim: rows.map((r, i) => (r[2].startsWith('ITERATE') ? i : -1)).filter((i) => i >= 0) }) : '<div class="empty">O laço não executou nenhuma volta.</div>') + `<p style="color:var(--muted);font-size:.9rem">${kind === 'WHILE + ITERATE' ? `Valores exibidos: ${shown.join(', ') || 'nenhum'}.` : kind === 'WHILE' && it === 0 ? 'WHILE testa antes: com 0 iterações o corpo nunca roda e a função devolve 100.' : kind === 'REPEAT' && it === 0 ? 'REPEAT testa depois: mesmo com 0 iterações o corpo roda uma vez (retorna 99).' : kind === 'LOOP' && it === 0 ? 'LOOP só testa depois do corpo no exemplo: roda uma vez (retorna 99).' : 'CALCULO começa em 100 e diminui 1 por volta.'}</p>`;
        };
        $$('#sg button', el).forEach((b) => b.onclick = () => { kind = b.dataset.k; $$('#sg button', el).forEach((x) => x.setAttribute('aria-pressed', x === b)); upd(); });
        $('#it', el).addEventListener('input', upd); upd();
      } },
      { t: 'View que acompanha a tabela', d: 'Cadastre pessoas e veja a view pessoa_fem refletir a tabela base sem você fazer nada.', mount(el) {
        let rows = [['1', 'Ana', 'F'], ['2', 'Bruno', 'M'], ['3', 'Clara', 'F']];
        const draw = () => {
          el.innerHTML = `${sql("CREATE VIEW pessoa_fem AS\nSELECT mat_pessoa, nome FROM pessoa WHERE sexo = 'F';")}<div class="ctrl"><input type="text" id="nm" placeholder="nome" size="10"><select id="sx"><option>F</option><option>M</option></select><button class="btn" id="ad">INSERT em pessoa</button></div><div class="grid2">${T(['mat_pessoa', 'nome', 'sexo'], rows, { cap: 'pessoa (tabela base, armazenada)' })}${T(['mat_pessoa', 'nome'], rows.filter((r) => r[2] === 'F').map((r) => [r[0], r[1]]), { cap: 'pessoa_fem (view, virtual)' })}</div>`;
          $('#ad', el).onclick = () => { const n = $('#nm', el).value.trim(); if (!n) return; rows.push([String(rows.length + 1), n, $('#sx', el).value]); draw(); };
        };
        draw();
      } },
      { t: 'Triggers em ação', d: 'Dois exemplos do slide: um BEFORE DELETE que guarda backup e um BEFORE INSERT que valida a nota do vestibular.', mount(el) {
        let at = [['55588899900', 'Rita', 31, 'Recife'], ['11122233344', 'Caio', 27, 'Olinda'], ['99900011122', 'Alice', 45, 'Recife']], bk = [], al = [[9490, 8.5, 2]], msg = '', bad = false, tab = 'bk';
        const draw = () => {
          el.innerHTML = `<div class="seg" id="sg"><button data-t="bk" aria-pressed="${tab === 'bk'}">BEFORE DELETE (backup)</button><button data-t="nt" aria-pressed="${tab === 'nt'}">BEFORE INSERT (nota)</button></div><div id="pn" style="margin-top:12px"></div>`;
          $$('#sg button', el).forEach((b) => b.onclick = () => { tab = b.dataset.t; msg = ''; draw(); });
          const p = $('#pn', el);
          if (tab === 'bk') {
            p.innerHTML = sql("CREATE TRIGGER tr_inserir_AtBK\nBEFORE DELETE ON atendente\nFOR EACH ROW\n  INSERT INTO ATENDENTE_BK\n  VALUES (OLD.CPF, OLD.NOME, OLD.IDADE, OLD.CIDADE);") + `<div class="grid2"><div>${T(['cpf', 'nome', 'idade', 'cidade', ''], at.map((r) => r.concat([`<button class="smallbtn" data-d="${r[0]}">DELETE</button>`])), { cap: 'atendente' })}</div><div>${T(['cpf', 'nome', 'idade', 'cidade'], bk.length ? bk : [['', '', '', '']], { cap: 'atendente_bk' })}</div></div>${msg ? `<div class="banner ok">${msg}</div>` : ''}<button class="smallbtn" id="rs">Restaurar</button>`;
            $$('[data-d]', p).forEach((b) => b.onclick = () => { const r = at.find((x) => x[0] === b.dataset.d); bk.push(r); at = at.filter((x) => x !== r); msg = `Antes de excluir ${r[1]}, o trigger copiou OLD.cpf, OLD.nome, OLD.idade e OLD.cidade para atendente_bk.`; draw(); });
            $('#rs', p).onclick = () => { at = [['55588899900', 'Rita', 31, 'Recife'], ['11122233344', 'Caio', 27, 'Olinda'], ['99900011122', 'Alice', 45, 'Recife']]; bk = []; msg = ''; draw(); };
          } else {
            p.innerHTML = sql("CREATE TRIGGER VerificaNota BEFORE INSERT ON aluno\nFOR EACH ROW\nBEGIN\n  IF NEW.nota_vestibular > 10 OR NEW.nota_vestibular < 0 THEN\n    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Nota inválida';\n  END IF;\nEND") + `<div class="ctrl"><input type="text" id="mt" placeholder="matricula_aluno" size="14" value="9492"><input type="text" id="nv" placeholder="nota_vestibular" size="14" value="11"><button class="btn" id="in">INSERT em aluno</button><button class="smallbtn" id="rs">Restaurar</button></div>${msg ? `<div class="banner ${bad ? 'bad' : 'ok'}">${msg}</div>` : ''}${T(['matricula_aluno', 'nota_vestibular', 'codigo_curso'], al, { cap: 'aluno' })}`;
            $('#in', p).onclick = () => { const m = $('#mt', p).value.trim(), n = parseFloat($('#nv', p).value.replace(',', '.')); if (!m || isNaN(n)) { msg = 'Informe matrícula e nota numéricas.'; bad = true; return draw(); }
              if (n > 10 || n < 0) { msg = 'Erro 1644 (45000): Nota inválida. O trigger interrompeu o INSERT e a linha não foi gravada.'; bad = true; } else { al.push([m, n, 4]); msg = 'Nota válida: o INSERT foi concluído.'; bad = false; } draw(); };
            $('#rs', p).onclick = () => { al = [[9490, 8.5, 2]]; msg = ''; draw(); };
          }
        };
        draw();
      } },
    ],
    activities: [
      { t: 'View, procedure, function ou trigger?', d: 'Escolha o objeto mais adequado a cada necessidade.', kind: 'classify',
        cfg: { choices: ['View', 'Procedure', 'Function', 'Trigger'], items: [
          { t: 'Divulgar o resultado do vestibular mostrando só nome e nota.', a: 0, why: 'Restringe as colunas e salva a consulta.' },
          { t: 'Calcular os créditos totais de um aluno e usar o valor num SELECT.', a: 2, why: 'Retorna um valor e pode ser chamada num SELECT.' },
          { t: 'Exibir os dados de um projeto a partir do título, chamando com CALL.', a: 1, why: 'Grupo de comandos invocado por nome, sem retorno obrigatório.' },
          { t: 'Gravar automaticamente em um log toda alteração de ementa.', a: 3, why: 'Ação automática ligada a um evento DML.' },
          { t: 'Impedir a inserção de nota maior que 10.', a: 3, why: 'Validação disparada antes do INSERT.' },
          { t: 'Esconder um join complexo de várias tabelas atrás de um nome simples.', a: 0, why: 'Consulta guardada como tabela virtual.' },
        ] } },
      { t: 'Atividades dos slides, com resolução', d: 'Resoluções apresentadas nos slides (o esquema do banco acadêmico não está no material, então confira os nomes de tabelas e colunas).', kind: 'qa', items: [
        ['Função: créditos totais do aluno (cadeira = 5, projeto = 1, monitoria = 2)', sql("DELIMITER $$\nCREATE FUNCTION creditos_totais(id_aluno INT) RETURNS INT\nDETERMINISTIC\nBEGIN\n  DECLARE total_credits INT DEFAULT 0;\n  DECLARE disciplinas INT DEFAULT 0;\n  DECLARE projetos INT DEFAULT 0;\n  DECLARE monitorias INT DEFAULT 0;\n  SELECT COUNT(at.codigo_disciplina), COUNT(at.codigo_projeto)\n    INTO disciplinas, projetos\n  FROM aluno_turma at\n  WHERE at.matricula_aluno = id_aluno;\n  SELECT COUNT(m.codigo_disciplina) INTO monitorias\n  FROM monitoria m\n  WHERE m.matricula_aluno = id_aluno;\n  SET total_credits = (5 * disciplinas) + (1 * projetos) + (2 * monitorias);\n  RETURN total_credits;\nEND $$\nDELIMITER ;\n\nSELECT creditos_totais(1717) AS TotalCreditos;")],
        ['Procedimento: receber o título de um projeto e imprimir seus dados', sql("DELIMITER $$\nCREATE PROCEDURE pesquisa_projeto (IN titulo VARCHAR(60))\nBEGIN\n  DECLARE v_codigo_projeto INT;\n  DECLARE v_titulo VARCHAR(60);\n  DECLARE v_conceito VARCHAR(7);\n  DECLARE v_hp VARCHAR(30);\n  SELECT p.codigo_projeto, p.titulo, p.conceito, p.hp\n    INTO v_codigo_projeto, v_titulo, v_conceito, v_hp\n  FROM projeto p\n  WHERE p.titulo LIKE titulo;\n  SELECT CONCAT('COD: ', v_codigo_projeto, ' - TIT: ', v_titulo,\n                ' - CON: ', v_conceito, ' - HP: ', v_hp);\nEND $$\nDELIMITER ;\n\nCALL pesquisa_projeto('Algema');")],
        ['View: só nome e nota do vestibular, para divulgar o resultado final', sql('CREATE VIEW resultado_final AS\nSELECT P.NOME, A.nota_vestibular\nFROM pessoa p, aluno a\nWHERE P.matricula_pessoa = A.matricula_aluno;\n\nSELECT * FROM resultado_final;')],
        ['Trigger: não permitir nota do vestibular maior que 10 nem menor que 0', sql("DELIMITER $$\nCREATE TRIGGER VerificaNota BEFORE INSERT ON aluno\nFOR EACH ROW\nBEGIN\n  IF NEW.nota_vestibular > 10 OR NEW.nota_vestibular < 0 THEN\n    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Nota inválida';\n  END IF;\nEND $$\nDELIMITER ;\n\nINSERT INTO aluno (matricula_aluno, nota_vestibular, codigo_curso) VALUES (9492, 11, 4);   -- erro: Nota inválida")],
        ['Trigger: guardar em log toda atualização da ementa das disciplinas (data, ementa antiga, código). O slide só traz o enunciado; esta é uma sugestão.', sql("CREATE TABLE log_ementa (\n  data_alteracao DATETIME,\n  ementa_antiga TEXT,\n  codigo_disciplina INT\n);\n\nDELIMITER $$\nCREATE TRIGGER tr_log_ementa\nBEFORE UPDATE ON disciplina\nFOR EACH ROW\nBEGIN\n  IF OLD.ementa <> NEW.ementa THEN\n    INSERT INTO log_ementa\n    VALUES (NOW(), OLD.ementa, OLD.cod_disciplina);\n  END IF;\nEND $$\nDELIMITER ;")],
      ] },
      { t: 'Perguntas para fixar', d: 'Responda e depois confira.', kind: 'qa', items: [
        ['Uma view armazena dados?', '<p>Não. É uma tabela virtual: guarda apenas a consulta. Os dados continuam nas tabelas base, e a view reflete suas atualizações.</p>'],
        ['Qual a diferença entre procedure e function?', '<p>A function retorna um valor (RETURNS/RETURN) e pode ser usada dentro de um SELECT ou de uma expressão. A procedure é executada com CALL e agrupa comandos.</p>'],
        ['Para que serve o DELIMITER?', '<p>Dentro do corpo de uma rotina há vários comandos terminados em “;”. Trocando o delimitador (por exemplo, para $$), o MySQL entende que o CREATE só termina em END $$.</p>'],
        ['Qual a diferença entre WHILE e REPEAT?', '<p>WHILE testa a condição antes de cada volta e pode não executar nenhuma. REPEAT testa ao final (UNTIL) e executa ao menos uma vez.</p>'],
        ['O que são OLD e NEW em um trigger?', '<p>OLD guarda os valores da linha antes do evento (UPDATE, DELETE); NEW guarda os valores novos (INSERT, UPDATE).</p>'],
        ['Por que um trigger não pode fazer COMMIT ou ROLLBACK?', '<p>Ele roda dentro da transação do comando que o disparou; quem confirma ou desfaz é a transação, não o gatilho.</p>'],
      ] },
    ],
    challenges: [
      { stem: 'Sobre uma view (visão) em SQL, é correto afirmar que:',
        opts: ['Armazena fisicamente uma cópia dos dados.', 'É uma tabela virtual derivada de outras tabelas, que reflete as atualizações das tabelas base.', 'Não pode ser consultada com SELECT.', 'Só pode ser criada sobre uma única tabela.', 'Substitui a necessidade de chaves primárias.'], c: 1,
        e: '<p>A visão não existe de forma física; as tuplas ficam nas tabelas base, e a view reflete suas mudanças.</p>' },
      { stem: 'Qual é uma vantagem do uso de views?',
        opts: ['Aumentar a redundância dos dados.', 'Restringir o acesso a um conjunto predeterminado de colunas e esconder consultas complexas.', 'Eliminar a necessidade de índices.', 'Impedir qualquer consulta ao banco.', 'Duplicar as tabelas base.'], c: 1,
        e: '<p>Views limitam colunas visíveis, escondem joins complexos e simplificam os comandos do usuário.</p>' },
      { stem: 'Qual é a principal diferença entre uma function e uma procedure em MySQL?',
        opts: ['A function retorna um valor e pode ser usada em um SELECT ou em uma expressão.', 'A procedure sempre retorna um valor inteiro.', 'A function só pode ser executada com CALL.', 'Não há diferença.', 'A procedure não aceita parâmetros.'], c: 0,
        e: '<p>Function: RETURNS/RETURN e uso em expressões. Procedure: executada com CALL.</p>' },
      { stem: 'Por que é necessário usar DELIMITER ao criar procedimentos e funções com blocos BEGIN … END no cliente MySQL?',
        opts: ['Para que o procedimento seja executado mais rápido.', 'Porque dentro do bloco há vários comandos terminados em “;” e é preciso indicar onde o CREATE realmente termina.', 'Para criptografar o procedimento.', 'Para impedir o uso de variáveis.', 'Porque BEGIN não funciona sem DELIMITER em tabelas vazias.'], c: 1,
        e: '<p>Alterar o delimitador evita que o “;” interno encerre o comando CREATE antes da hora.</p>' },
      { stem: 'Na função aluno_nota (IF nota >= 70 → APROVADO; ELSEIF nota >= 40 → PROVA FINAL; ELSE → REPROVADO), o que retorna SELECT aluno_nota(60)?',
        opts: ['APROVADO', 'PROVA FINAL', 'REPROVADO', 'NULL', 'Erro'], c: 1,
        e: '<p>60 não é ≥ 70, mas é ≥ 40: o ramo ELSEIF é executado.</p>' },
      { stem: 'A função EX_WHILE(ITERACOES) começa com CALCULO = 100 e, a cada volta de WHILE CONTADOR < ITERACOES, subtrai 1. O que retorna SELECT EX_WHILE(0)?',
        opts: ['99', '100', '0', '101', 'Erro'], c: 1,
        e: '<p>WHILE testa a condição antes: com 0 iterações o corpo nunca executa e CALCULO continua 100. Em um REPEAT, o corpo executaria uma vez.</p>' },
      { stem: 'Num laço de 1 a 5 em que, quando CONTADOR = 3, executa-se ITERATE antes de um SELECT CONTADOR, quais valores são exibidos?',
        opts: ['1, 2, 3, 4, 5', '1, 2, 4, 5', '1, 2', '3', '4, 5'], c: 1,
        e: '<p>ITERATE pula o restante da volta atual (como o continue do Python); a contagem 3 não é exibida.</p>' },
      { stem: 'Sobre triggers, assinale a alternativa correta.',
        opts: ['São chamados manualmente com CALL.', 'São executados automaticamente antes ou depois de um comando DML em uma tabela.', 'Podem executar COMMIT e ROLLBACK livremente.', 'Só podem existir um por tabela.', 'Não podem acessar os valores da linha afetada.'], c: 1,
        e: '<p>Triggers são disparados automaticamente por eventos DML. Podem existir vários por tabela e acessam OLD e NEW. Não executam COMMIT, ROLLBACK ou SAVEPOINT.</p>' },
      { stem: 'Deseja-se guardar, em uma tabela de backup, os dados de cada atendente antes que ele seja excluído da tabela atendente. Qual trigger atende a isso?',
        opts: ['BEFORE INSERT, usando NEW.', 'AFTER UPDATE, usando NEW.', 'BEFORE DELETE, usando OLD.', 'AFTER INSERT, usando OLD.', 'BEFORE DELETE, usando NEW.'], c: 2,
        e: '<p>No DELETE só existem os valores OLD (a linha excluída), e o BEFORE garante a cópia antes da remoção.</p>' },
      { stem: 'Uma regra exige impedir que alguém insira uma nota de vestibular maior que 10 ou menor que 0. Qual é a solução apresentada para isso?',
        opts: ['Uma view com WHERE.', 'Um trigger BEFORE INSERT que, ao detectar o valor inválido, interrompe o INSERT com SIGNAL.', 'Um TRUNCATE na tabela aluno.', 'Uma função que apaga a nota.', 'Um comando ALTER TABLE DROP COLUMN.'], c: 1,
        e: '<p>O trigger examina NEW.nota_vestibular antes da inserção e usa SIGNAL SQLSTATE \'45000\' para recusá-la.</p>' },
    ],
  });
})();
