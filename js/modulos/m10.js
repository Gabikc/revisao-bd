(function () {
  const BASE = [['001', 'Pedro', '99338822'], ['002', 'Maria', '98392922'], ['003', 'João', '90020332']];
  MODULES.push({
    id: 'a10', n: '10', acc: 'mint', grp: 'SQL na prática', src: 'Aula 10', short: 'DML',
    title: 'DML: inserindo, atualizando e excluindo dados',
    blurb: 'Os comandos que manipulam os dados dentro das tabelas: INSERT, UPDATE e DELETE, o AUTO_INCREMENT e o cuidado com a cláusula WHERE.',
    topics: [
      { g: 'Manipulação de dados', t: 'O que é DML', h:
        `<p><b>DML</b> (Data Manipulation Language) define os comandos usados para manipular os dados do banco: <b>INSERT</b>, <b>UPDATE</b> e <b>DELETE</b>.</p>` +
        boxes([['INSERT', 'Adiciona tuplas'], ['UPDATE', 'Altera valores'], ['DELETE', 'Remove tuplas']], 'grid3') },
      { t: 'INSERT', h:
        `<p>Adiciona uma tupla em uma tabela. Se os valores forem informados <b>na ordem correta</b> das colunas, não é preciso listar as colunas.</p>` +
        sql("INSERT INTO <nomeTabela> [listaColunas]\n  VALUES (<listaValoresAtômicos>);") +
        sql("-- sem lista de colunas (ordem da tabela)\nINSERT INTO cliente VALUES (20194853, 'Maria', 30);\n\n-- com lista de colunas\nINSERT INTO cliente (cpf, nome, idade) VALUES (20194854, 'José', 28);\n\n-- várias linhas de uma vez\nINSERT INTO cliente (cpf, nome, idade)\n  VALUES (20194855, 'Paulo', 18), (20197432, 'João', 25);") +
        tip('Informar a lista de colunas é mais seguro: o comando continua correto se alguém mudar a ordem das colunas da tabela.') },
      { t: 'AUTO_INCREMENT', h:
        `<p>Gera automaticamente números únicos para a chave primária. É definido na criação da tabela.</p>` +
        sql("CREATE TABLE produto (\n  codigo SMALLINT AUTO_INCREMENT PRIMARY KEY,\n  tipo VARCHAR(40),\n  preco DECIMAL(10,2)\n);\n\nINSERT INTO produto (tipo, preco) VALUES ('alimentação', 6);") +
        `<p>Em uma tabela já criada, ou para mudar o próximo valor:</p>` +
        sql("ALTER TABLE produto MODIFY codigo SMALLINT AUTO_INCREMENT;\nALTER TABLE produto AUTO_INCREMENT = 20;") },
      { t: 'UPDATE', h:
        `<p>Altera valores de atributos com base em critérios. <b>Sem WHERE, o UPDATE vale para todas as tuplas da tabela.</b></p>` +
        sql("UPDATE <nomeTabela>\nSET <atributo> = <novoValor>\n[WHERE <condição>];") +
        sql("UPDATE cliente\nSET telefone = '0101010101'\nWHERE cod_cliente = '001';") +
        `<div class="grid2">${T(['cod_cliente', 'nome', 'telefone'], BASE, { cap: 'Antes' })}${T(['cod_cliente', 'nome', 'telefone'], [['001', 'Pedro', '0101010101'], BASE[1], BASE[2]], { cap: 'Depois', hl: [0] })}</div>` },
      { t: 'DELETE', h:
        `<p>Remove tuplas de uma relação. <b>Sem WHERE, todas as tuplas são excluídas</b> (a tabela continua existindo, vazia).</p>` +
        sql("DELETE FROM <nomeTabela>\n[WHERE <condição>];") +
        sql("DELETE FROM cliente\nWHERE nome = 'Maria';") +
        `<div class="grid2">${T(['cod_cliente', 'nome', 'telefone'], BASE, { cap: 'Antes', hl: [1] })}${T(['cod_cliente', 'nome', 'telefone'], [BASE[0], BASE[2]], { cap: 'Depois' })}</div>` },
      { t: 'Cuidados ao manipular dados', h:
        ul(['<b>WHERE esquecido</b> em UPDATE ou DELETE altera ou apaga a tabela inteira. Escreva o WHERE primeiro, ou teste a condição com um SELECT antes.', 'As restrições da Aula 9 continuam valendo: inserir PK repetida, nulo em NOT NULL ou FK inexistente é recusado.', 'Excluir uma linha que é referenciada por chave estrangeira em outra tabela é recusado pela integridade referencial.']) +
        note('Os três pontos são consequência direta do que o slide diz sobre WHERE e do que foi visto em DDL.', 'Complemento') },
      { g: 'Prática', t: 'Atividades propostas', h:
        ul(['Povoar o banco de dados criado na tarefa anterior: <b>5 linhas</b> em cada tabela, <b>2 updates</b> e <b>2 deletes</b> com condições diferentes.', 'Criar o BD <b>Marinha</b>; os dados a serem inseridos estão disponíveis no Classroom.']) +
        `<p>O banco da Marinha é o mesmo usado nos exercícios de consulta da Aula 11 (marinheiros, barcos e reservas).</p>` },
    ],
    examples: [
      { t: 'Simulador de INSERT, UPDATE e DELETE', d: 'Execute comandos na tabela cliente, com e sem WHERE, e observe quantas linhas são afetadas.', mount(el) {
        let rows = BASE.map((r) => r.slice()), flash = {}, msg = '', bad = false, last = '';
        const draw = () => {
          el.innerHTML = `<div class="seg" id="sg"><button data-m="i" aria-pressed="true">INSERT</button><button data-m="u" aria-pressed="false">UPDATE</button><button data-m="d" aria-pressed="false">DELETE</button></div><div id="fm" style="margin-top:10px"></div>
          ${last ? sql(last) : ''}${msg ? `<div class="banner ${bad ? 'bad' : 'ok'}">${msg}</div>` : ''}<div class="tblwrap"><table><thead><tr><th>cod_cliente</th><th>nome</th><th>telefone</th></tr></thead><tbody>${rows.length ? rows.map((r) => `<tr class="${flash[r[0]] || ''}">${r.map((c) => `<td>${c}</td>`).join('')}</tr>`).join('') : '<tr><td colspan="3" class="empty">Tabela vazia</td></tr>'}</tbody></table></div><button class="smallbtn" id="rs">Restaurar tabela</button>`;
          $('#rs', el).onclick = () => { rows = BASE.map((r) => r.slice()); flash = {}; msg = ''; last = ''; draw(); };
          const mode = (m) => {
            $$('#sg button', el).forEach((b) => b.setAttribute('aria-pressed', b.dataset.m === m));
            const f = $('#fm', el);
            if (m === 'i') f.innerHTML = `<div class="ctrl"><input type="text" id="a" placeholder="cod_cliente" size="10"><input type="text" id="b" placeholder="nome" size="10"><input type="text" id="c" placeholder="telefone" size="12"><button class="btn" id="go">Executar INSERT</button></div>`;
            if (m === 'u') f.innerHTML = `<div class="ctrl"><label>SET telefone = <input type="text" id="c" value="0101010101" size="12"></label><label><input type="checkbox" id="w" checked> usar WHERE</label><label>cod_cliente = <input type="text" id="a" value="001" size="6"></label><button class="btn" id="go">Executar UPDATE</button></div>`;
            if (m === 'd') f.innerHTML = `<div class="ctrl"><label><input type="checkbox" id="w" checked> usar WHERE</label><label>nome = <input type="text" id="a" value="Maria" size="10"></label><button class="btn" id="go">Executar DELETE</button></div>`;
            $('#go', el).onclick = () => {
              flash = {}; bad = false;
              if (m === 'i') {
                const a = $('#a', el).value.trim(), b = $('#b', el).value.trim(), c = $('#c', el).value.trim();
                if (!a || !b) { msg = 'Informe ao menos cod_cliente e nome.'; bad = true; last = ''; return draw(); }
                if (rows.some((r) => r[0] === a)) { msg = `Erro: chave primária duplicada (${a}).`; bad = true; last = `INSERT INTO cliente VALUES ('${a}', '${b}', '${c}');`; return draw(); }
                rows.push([a, b, c]); flash[a] = 'new'; last = `INSERT INTO cliente VALUES ('${a}', '${b}', '${c}');`; msg = '1 linha inserida.';
              } else if (m === 'u') {
                const w = $('#w', el).checked, a = $('#a', el).value.trim(), c = $('#c', el).value.trim(); let n = 0;
                rows.forEach((r) => { if (!w || r[0] === a) { r[2] = c; flash[r[0]] = 'new'; n++; } });
                last = `UPDATE cliente\nSET telefone = '${c}'` + (w ? `\nWHERE cod_cliente = '${a}';` : ';'); msg = `${n} linha(s) afetada(s).` + (!w ? ' Sem WHERE, todas as linhas foram alteradas!' : ''); bad = !w;
              } else {
                const w = $('#w', el).checked, a = $('#a', el).value.trim(); const n = rows.filter((r) => !w || r[1] === a).length;
                rows = rows.filter((r) => w && r[1] !== a); last = 'DELETE FROM cliente' + (w ? `\nWHERE nome = '${a}';` : ';'); msg = `${n} linha(s) excluída(s).` + (!w ? ' Sem WHERE, a tabela inteira foi esvaziada!' : ''); bad = !w;
              }
              draw();
            };
          };
          $$('#sg button', el).forEach((b) => b.onclick = () => mode(b.dataset.m));
          mode(el.dataset.mode || 'i');
        };
        el.dataset.mode = 'i';
        draw();
        $$('#sg button', el);
        el.addEventListener('click', (e) => { const b = e.target.closest('#sg button'); if (b) el.dataset.mode = b.dataset.m; });
      } },
      { t: 'AUTO_INCREMENT em ação', d: 'Insira linhas sem informar o código e mude o próximo valor.', mount(el) {
        let rows = [], next = 1;
        const draw = () => {
          el.innerHTML = `${sql('INSERT INTO produto (tipo, preco) VALUES (\'alimentação\', 6);')}<div class="ctrl"><button class="btn" id="ins">INSERT sem informar o código</button><button class="smallbtn" id="al">ALTER TABLE produto AUTO_INCREMENT = 20</button><button class="smallbtn" id="rs">Recomeçar</button></div><div class="rel-out">Próximo código a ser gerado: <b>${next}</b></div>${T(['codigo', 'tipo', 'preco'], rows.length ? rows : [['', '', '']])}`;
          $('#ins', el).onclick = () => { rows.push([next, 'alimentação', '6,00']); next++; draw(); };
          $('#al', el).onclick = () => { next = 20; draw(); };
          $('#rs', el).onclick = () => { rows = []; next = 1; draw(); };
        };
        draw();
      } },
    ],
    activities: [
      { t: 'Qual comando DML?', d: 'Indique o comando para cada tarefa.', kind: 'classify',
        cfg: { choices: ['INSERT', 'UPDATE', 'DELETE'], items: [
          { t: 'Cadastrar um novo cliente.', a: 0, why: 'Adiciona uma tupla.' },
          { t: 'Mudar o telefone do cliente 001.', a: 1, why: 'Altera valores de atributo.' },
          { t: 'Remover os clientes chamados Maria.', a: 2, why: 'Remove tuplas.' },
          { t: 'Aumentar em 10% o preço de todos os produtos.', a: 1, why: 'Alteração sem WHERE vale para todas as linhas.' },
          { t: 'Cadastrar dois clientes com um só comando.', a: 0, why: 'INSERT aceita vários grupos de VALUES.' },
          { t: 'Esvaziar a tabela mantendo a estrutura, usando DML.', a: 2, why: 'DELETE sem WHERE apaga todas as tuplas.' },
        ] } },
      { t: 'Escreva o comando', d: 'Tente escrever e depois confira (tabela cliente com cod_cliente, nome e telefone).', kind: 'qa', items: [
        ['Inserir o cliente 004, Lucas, telefone 91234567.', sql("INSERT INTO cliente (cod_cliente, nome, telefone)\nVALUES ('004', 'Lucas', '91234567');")],
        ['Alterar para 98888888 o telefone do cliente Pedro.', sql("UPDATE cliente\nSET telefone = '98888888'\nWHERE nome = 'Pedro';")],
        ['Excluir o cliente de código 003.', sql("DELETE FROM cliente\nWHERE cod_cliente = '003';")],
        ['O que acontece se eu escrever DELETE FROM cliente; e executar?', '<p>Todas as linhas são excluídas, pois não há condição. A estrutura da tabela permanece (diferente de DROP TABLE).</p>'],
        ['Como definir o próximo código automático da tabela produto como 20?', sql('ALTER TABLE produto AUTO_INCREMENT = 20;')],
      ] },
      { t: 'Checklist do povoamento', d: 'Confira se o seu trabalho cumpre o que foi pedido.', kind: 'check',
        cfg: { items: ['Pelo menos 5 linhas inseridas em cada tabela.', 'As tabelas “pai” foram povoadas antes das que têm chave estrangeira.', '2 comandos UPDATE, cada um com WHERE.', '2 comandos DELETE com condições diferentes.', 'Banco Marinha criado e povoado com os dados do Classroom.'] } },
    ],
    challenges: [
      { stem: 'Quais comandos compõem a DML (Data Manipulation Language)?',
        opts: ['CREATE, ALTER e DROP.', 'INSERT, UPDATE e DELETE.', 'SELECT, JOIN e UNION.', 'GRANT e REVOKE.', 'TRUNCATE e RENAME.'], c: 1,
        e: '<p>DML manipula dados: INSERT, UPDATE e DELETE. CREATE, ALTER, DROP, TRUNCATE e RENAME são DDL; SELECT é DQL.</p>' },
      { stem: 'O comando UPDATE cliente SET telefone = \'0101010101\'; é executado sem cláusula WHERE. O que acontece?',
        opts: ['O comando é recusado pelo SGBD.', 'Apenas a primeira linha é alterada.', 'O telefone de todos os clientes é alterado.', 'A tabela é removida.', 'Nenhuma linha é alterada.'], c: 2,
        e: '<p>Sem WHERE, o UPDATE é aplicado a todas as tuplas da tabela.</p>' },
      { stem: 'Qual é o efeito do comando DELETE FROM cliente; (sem WHERE)?',
        opts: ['Remove a tabela cliente do banco.', 'Remove somente a primeira linha.', 'Remove todas as linhas, mantendo a estrutura da tabela.', 'Gera erro de sintaxe.', 'Remove somente linhas com valores nulos.'], c: 2,
        e: '<p>Sem condição, todas as tuplas são excluídas. A tabela continua existindo, vazia. Apagar a tabela seria DROP TABLE.</p>' },
      { stem: 'Sobre o INSERT, é correto afirmar que:',
        opts: ['Sempre exige a lista de colunas.', 'Se os valores forem informados na ordem correta, não é necessário especificar as colunas.', 'Só insere uma linha por comando.', 'Altera linhas já existentes.', 'Só funciona em tabelas sem chave primária.'], c: 1,
        e: '<p>Sem lista de colunas, os valores seguem a ordem das colunas da tabela. Também é possível inserir várias linhas, separando os grupos de VALUES por vírgula.</p>' },
      { stem: 'Uma tabela produto foi criada com a coluna codigo SMALLINT AUTO_INCREMENT PRIMARY KEY. Para inserir um novo produto, o que é correto?',
        opts: ['Informar sempre o valor de codigo.', 'Não informar o codigo: o SGBD gera um número único automaticamente.', 'Usar UPDATE para gerar o código.', 'O código gerado pode se repetir.', 'AUTO_INCREMENT só funciona em colunas de texto.'], c: 1,
        e: '<p>AUTO_INCREMENT realiza a geração automática de números únicos para a chave primária.</p>' },
      { stem: 'Qual comando altera o valor inicial do próximo AUTO_INCREMENT da tabela produto para 20?',
        opts: ['UPDATE produto SET AUTO_INCREMENT = 20;', 'ALTER TABLE produto AUTO_INCREMENT = 20;', 'INSERT INTO produto AUTO_INCREMENT 20;', 'DROP AUTO_INCREMENT 20;', 'TRUNCATE produto 20;'], c: 1,
        e: '<p>É uma alteração de estrutura, feita com ALTER TABLE.</p>' },
      { stem: 'Um analista precisa excluir apenas os clientes de nome “Maria”. Qual comando é o mais adequado?',
        opts: ['DELETE FROM cliente;', 'DELETE FROM cliente WHERE nome = \'Maria\';', 'DROP TABLE cliente;', 'TRUNCATE TABLE cliente;', 'UPDATE cliente SET nome = NULL;'], c: 1,
        e: '<p>A cláusula WHERE restringe a exclusão às tuplas que satisfazem a condição.</p>' },
    ],
  });
})();
