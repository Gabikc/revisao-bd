(function () {
  const TYPES = ['INT', 'BIGINT', 'SMALLINT', 'CHAR(3)', 'CHAR(11)', 'VARCHAR(20)', 'VARCHAR(255)', 'DECIMAL(10,2)', 'DATE', 'DATETIME'];

  MODULES.push({
    id: 'a9', n: '6', acc: 'cor', grp: 'SQL na prática', src: 'Aula 9', short: 'Modelo físico e DDL',
    title: 'Modelo físico e DDL: criando as estruturas',
    blurb: 'Do modelo lógico ao banco de verdade no SGBD: a linguagem SQL, tipos de dados, restrições de integridade e os comandos CREATE, ALTER, DROP e TRUNCATE.',
    topics: [
      { g: 'Do lógico ao físico', t: 'Projeto de BD e o modelo físico', h:
        flow(['Mini-mundo', 'Análise de requisitos', 'Modelo conceitual', 'Modelo lógico', 'Modelo físico']) +
        `<p><b>Modelo físico</b> é a criação de um banco de dados em um Sistema Gerenciador de Banco de Dados (SGBD). A sintaxe da linguagem SQL depende do SGBD utilizado.</p>` },
      { t: 'Instalação: MySQL + DBeaver', h:
        ul(['MySQL Server (todas as plataformas): <a href="https://dev.mysql.com/downloads/mysql/" target="_blank" rel="noopener">dev.mysql.com/downloads/mysql</a>', 'DBeaver (todas as plataformas): <a href="https://dbeaver.io/download/" target="_blank" rel="noopener">dbeaver.io/download</a>', 'Tutorial de instalação MySQL Server + DBeaver (Windows): <a href="https://www.youtube.com/watch?v=uK4KQCPjR0A" target="_blank" rel="noopener">vídeo</a>', 'Tutorial MySQL Server (macOS): <a href="https://fiodevida.com/como-instalar-o-mysql-no-macos/" target="_blank" rel="noopener">artigo</a> · DBeaver (macOS): <a href="https://www.youtube.com/watch?v=9RlhPWgOtrg" target="_blank" rel="noopener">vídeo</a>']) },
      { t: 'A linguagem SQL', h:
        `<p><b>SQL</b> (Structured Query Language) é o padrão para bancos de dados relacionais. Apesar de “query” no nome, <b>não é apenas de consulta</b>: também define e manipula dados. É fundamentada no modelo relacional e na álgebra relacional (união, interseção, seleção, junção…).</p>` +
        `<p>Inicialmente chamada SEQUEL (Structured English Query Language), foi desenvolvida por pesquisadores da IBM durante o desenvolvimento do sistema R.</p>` +
        T(['Versão', 'Novidade'], [['SQL-86', 'Primeiro padrão ISO e ANSI (1986)'], ['SQL-89', 'Aperfeiçoamentos'], ['SQL-92 (SQL2)', 'Padrão amplamente adotado'], ['SQL-99 (SQL3)', 'Lançado em 2000: tipos de dados complexos e características de orientação a objetos'], ['SQL:2003', 'XML'], ['SQL:2008', 'Tipos espaciais, funções analíticas, segurança'], ['SQL:2011', 'Expressões temporais, JSON, OLAP'], ['SQL:2019', 'Grafos, mais JSON, arrays multidimensionais']]) },
      { t: 'As categorias da linguagem', h:
        boxes([['DDL', 'Data Definition Language: define as estruturas (CREATE, ALTER, DROP, RENAME, TRUNCATE). É o assunto desta aula.'], ['DML', 'Data Manipulation Language: manipula os dados (INSERT, UPDATE, DELETE). Aula 10.'], ['DQL', 'Data Query Language: consulta os dados (SELECT). Aulas 11 a 14.']], 'grid3') },
      { g: 'DDL: definindo estruturas', t: 'Tipos de dados no MySQL', h:
        T(['Tipo', 'Especificação', 'Tipo', 'Especificação'], [
          ['CHAR', 'String (0 – 255)', 'INT', 'Inteiro (−2.147.483.648 a 2.147.483.647)'], ['VARCHAR', 'String', 'BIGINT', 'Inteiro grande'], ['TINYTEXT', 'String (0 – 255)', 'FLOAT', 'Decimal (precisão de até 23 dígitos)'],
          ['TEXT', 'String (0 – 65.535)', 'DOUBLE', 'Decimal (24 a 53 dígitos)'], ['BLOB', 'Binário (0 – 65.535)', 'DECIMAL', '“DOUBLE” armazenado como string'], ['MEDIUMTEXT', 'String (0 – 16.777.215)', 'DATE', 'AAAA-MM-DD'],
          ['LONGTEXT', 'String (0 – 4.294.967.295)', 'DATETIME', 'AAAA-MM-DD HH:MM:SS'], ['TINYINT', 'Inteiro (−128 a 127)', 'TIMESTAMP', 'AAAAMMDDHHMMSS'], ['SMALLINT', 'Inteiro (−32.768 a 32.767)', 'TIME', 'HH:MM:SS'],
          ['MEDIUMINT', 'Inteiro (−8.388.608 a 8.388.607)', 'ENUM / SET', 'Uma opção / seleção de opções pré-definidas'],
        ]) + note('No slide, VARCHAR aparece como 0 a 255, como CHAR. Nas versões atuais do MySQL o VARCHAR aceita tamanhos maiores; confira na documentação da sua versão. A diferença prática: CHAR(n) tem tamanho fixo e VARCHAR(n) ocupa só o necessário.', 'Atenção') },
      { t: 'Comandos DDL', h:
        T(['Comando', 'Para quê'], [['CREATE', 'Criar esquemas, tabelas, views e índices'], ['ALTER', 'Atualizar essas estruturas'], ['DROP', 'Remover a estrutura'], ['RENAME', 'Renomear'], ['TRUNCATE', 'Remover todas as linhas de uma tabela, sem condição']]) },
      { t: 'Restrições de integridade', h:
        `<p>Garantem que as mudanças feitas no banco não resultem em perda de consistência.</p>` +
        T(['Integridade', 'Regra', 'Exemplo'], [
          ['Domínio', 'O valor deve obedecer ao domínio da coluna (inteiro, real, alfanumérico, data…)', 'idade INT'],
          ['Nulo', 'Define se o campo pode ser nulo. Campos da PK nunca podem', 'nome NOT NULL'],
          ['Chave', 'Valores de chave primária e alternativa são únicos', 'PRIMARY KEY, UNIQUE'],
          ['Referencial', 'Valores de uma FK devem existir na PK da tabela referenciada', 'matrícula.código_aluno → aluno.código'],
          ['Semântica', 'Regras do negócio, implementadas com regras e triggers', '“Nenhum aluno em mais de um curso”; “carga horária máxima de 120 horas”'],
        ]) },
      { t: 'Constraints: tabela e sintaxe', h:
        T(['Constraint', 'Efeito'], [['NOT NULL', 'O campo não pode ser nulo'], ['UNIQUE', 'Valores da coluna não podem se repetir'], ['PRIMARY KEY', 'Identifica a chave primária da tabela'], ['FOREIGN KEY', 'Cria o vínculo com outra tabela'], ['CHECK', 'Determina uma regra de validação'], ['DEFAULT', 'Valor padrão da coluna']]) +
        sql("nome_coluna tipo_dado NOT NULL\nnome_coluna tipo_dado UNIQUE\nnome_coluna tipo_dado PRIMARY KEY\nnome_coluna tipo_dado CHECK (condição)\nnome_coluna tipo_dado DEFAULT valor\nFOREIGN KEY (nome_coluna) REFERENCES tabela(coluna)\n\n-- exemplo nomeado\nCONSTRAINT pessoa_idade CHECK (idade > 18)\n\n-- eliminar uma constraint\nALTER TABLE tabela DROP tipoConstraint nomeConstraint;") },
      { t: 'Criando o banco e as tabelas', h:
        sql('CREATE DATABASE nome_do_banco;  -- ou CREATE SCHEMA') +
        `<p>Nem todo usuário pode criar esquemas e elementos de esquema: os privilégios são concedidos pelo administrador do sistema ou DBA.</p>` +
        boxes([['Nome da tabela', 'Único no banco. Começa com letra, tem de 1 a 30 caracteres, não é palavra reservada e não existe no esquema.'], ['Nome da coluna', 'Único dentro da tabela. Pode existir coluna com o mesmo nome em tabelas diferentes.']]) +
        sql("CREATE TABLE [IF NOT EXISTS] tabela (\n  atributo1 tipo1 [CONSTRAINTS],\n  atributo2 tipo2 [CONSTRAINTS],\n  [CONSTRAINTS]\n);") +
        `<p>Duas formas equivalentes:</p>` +
        sql("CREATE TABLE filme (\n  cod CHAR(3) PRIMARY KEY,\n  nome VARCHAR(255) NOT NULL,\n  diretor VARCHAR(255) NOT NULL\n);") +
        sql("CREATE TABLE filme (\n  cod CHAR(3) NOT NULL,\n  nome VARCHAR(255) NOT NULL,\n  diretor VARCHAR(255) NOT NULL,\n  CONSTRAINT PK_filme PRIMARY KEY (cod)\n);") },
      { t: 'DEFAULT', h:
        `<p>Define um valor padrão para a coluna. Pode ser literal, expressão ou até função SQL, e o tipo deve ser igual ao da coluna.</p>` +
        sql("CREATE TABLE cliente (\n  id_cliente INT PRIMARY KEY,\n  cpf CHAR(11),\n  nome VARCHAR(20),\n  cidade VARCHAR(30) DEFAULT 'Recife'\n);") +
        `<p>Se um cliente for inserido sem informar a cidade, ela fica “Recife”.</p>` },
      { t: 'ALTER TABLE', h:
        `<p>Altera ou adiciona atributos e constraints de uma tabela.</p>` +
        T(['Comando', 'Descrição'], [['ADD', 'Adiciona coluna ou restrição'], ['MODIFY', 'Modifica a definição de uma coluna'], ['DROP tipoConstraint', 'Apaga uma restrição'], ['DROP COLUMN', 'Apaga uma coluna'], ['RENAME TO', 'Altera o nome da tabela'], ['RENAME COLUMN', 'Altera o nome da coluna']]) +
        sql("ALTER TABLE estudante ADD data_alt DATETIME DEFAULT CURRENT_TIMESTAMP;\nALTER TABLE estudante DROP COLUMN telefone;\nALTER TABLE pessoa RENAME COLUMN nome TO nomeCompleto;\nALTER TABLE pessoa MODIFY nomeCompleto VARCHAR(100);") +
        note('O slide escreve o primeiro exemplo de forma resumida (“add data_alt default SYSDATE”). Em MySQL é preciso informar o tipo da coluna, como acima.', 'Atenção') },
      { t: 'DROP × TRUNCATE', h:
        sql("DROP TABLE estudantes;      -- apaga a tabela inteira: estrutura e dados\nTRUNCATE TABLE estudantes;  -- apaga só os dados; a estrutura permanece") +
        tip('DROP remove a definição e os dados. TRUNCATE remove apenas as linhas, sem condição, e a tabela continua existindo.') },
      { g: 'Prática', t: 'Atividades propostas', h:
        `<p><b>Atividade 1.</b> Crie o banco de dados do modelo lógico; na tabela Pessoa, altere o atributo nome para nomeCompleto; adicione na tabela Prédio o atributo area_lazer VARCHAR(10); crie uma restrição de checagem para area_lazer que aceite apenas SIM ou NÃO.</p><p><b>Atividade 2 (para casa).</b> Crie o banco do modelo lógico; renomeie nome para nomeCompleto; adicione em Paciente o atributo telefone VARCHAR(20); remova telefone de Médico; altere o tipo de algum atributo.</p><p>Há uma sugestão de resolução na aba <b>Atividades</b>.</p>` },
    ],
    examples: [
      { t: 'Gerador de CREATE TABLE', d: 'Monte as colunas e veja o comando SQL se formando.', mount(el) {
        const rows = [['cod', 'CHAR(3)', 1, 1, 0, ''], ['nome', 'VARCHAR(255)', 0, 1, 0, ''], ['diretor', 'VARCHAR(255)', 0, 1, 0, ''], ['ano', 'INT', 0, 0, 0, '']];
        el.innerHTML = `<div class="ctrl"><label>Tabela: <input type="text" id="tn" value="filme" size="12"></label><label><input type="checkbox" id="cn"> chave primária nomeada (CONSTRAINT)</label></div>
          <div class="gen-grid"><b></b><b>Coluna</b><b>Tipo</b><b>PK</b><b>NOT NULL</b><b>UNIQUE</b><b>DEFAULT</b>${rows.map((r, i) => `<input type="checkbox" data-i="${i}" data-k="on" checked aria-label="usar coluna"><input type="text" class="tinput" data-i="${i}" data-k="n" value="${r[0]}"><select data-i="${i}" data-k="t">${TYPES.map((t) => `<option ${t === r[1] ? 'selected' : ''}>${t}</option>`).join('')}</select><input type="checkbox" data-i="${i}" data-k="pk" ${r[2] ? 'checked' : ''}><input type="checkbox" data-i="${i}" data-k="nn" ${r[3] ? 'checked' : ''}><input type="checkbox" data-i="${i}" data-k="uq" ${r[4] ? 'checked' : ''}><input type="text" class="tinput" data-i="${i}" data-k="df" value="" placeholder="ex.: 'Recife'">`).join('')}</div><div id="o"></div>`;
        const g = (i, k) => $(`[data-i="${i}"][data-k="${k}"]`, el);
        const upd = () => {
          const cols = rows.map((_, i) => i).filter((i) => g(i, 'on').checked).map((i) => ({ n: g(i, 'n').value.trim() || 'coluna' + (i + 1), t: g(i, 't').value, pk: g(i, 'pk').checked, nn: g(i, 'nn').checked, uq: g(i, 'uq').checked, df: g(i, 'df').value.trim() }));
          const named = $('#cn', el).checked, pks = cols.filter((c) => c.pk);
          const lines = cols.map((c) => `  ${c.n} ${c.t}` + (c.pk && !named && pks.length === 1 ? ' PRIMARY KEY' : (c.nn || c.pk) && c.pk ? ' NOT NULL' : c.nn ? ' NOT NULL' : '') + (c.uq ? ' UNIQUE' : '') + (c.df ? ` DEFAULT ${c.df}` : ''));
          if ((named && pks.length) || pks.length > 1) lines.push(`  CONSTRAINT PK_${$('#tn', el).value.trim() || 'tabela'} PRIMARY KEY (${pks.map((c) => c.n).join(', ')})`);
          $('#o', el).innerHTML = sql(`CREATE TABLE ${$('#tn', el).value.trim() || 'tabela'} (\n${lines.join(',\n')}\n);`) + (pks.length > 1 ? '<p style="color:var(--muted);font-size:.9rem">Duas ou mais colunas marcadas como PK formam uma chave primária composta.</p>' : '');
        };
        $$('input,select', el).forEach((x) => x.addEventListener('input', upd)); upd();
      } },
      { t: 'Laboratório de restrições', d: 'Tente inserir linhas na tabela cliente e veja qual constraint reage.', mount(el) {
        let data = [[1, '00323', 'Pedro', 30, 'Recife'], [2, '88484', 'Maria', 25, 'Curitiba']];
        const draw = (msg, ok) => {
          el.innerHTML = `${sql("CREATE TABLE cliente (\n  id_cliente INT PRIMARY KEY,\n  cpf CHAR(11) UNIQUE,\n  nome VARCHAR(20) NOT NULL,\n  idade INT CHECK (idade > 18),\n  cidade VARCHAR(30) DEFAULT 'Recife'\n);")}${T(['id_cliente', 'cpf', 'nome', 'idade', 'cidade'], data, { cap: 'cliente' })}
          <div class="ctrl"><input type="text" id="f1" placeholder="id_cliente" size="10"><input type="text" id="f2" placeholder="cpf" size="10"><input type="text" id="f3" placeholder="nome" size="10"><input type="text" id="f4" placeholder="idade" size="6"><input type="text" id="f5" placeholder="cidade (vazio = padrão)" size="18"><button class="btn" id="ins">INSERT</button><button class="smallbtn" id="rs">Restaurar</button></div><div>${msg ? `<div class="banner ${ok ? 'ok' : 'bad'}">${msg}</div>` : ''}</div>`;
          $('#rs', el).onclick = () => { data = [[1, '00323', 'Pedro', 30, 'Recife'], [2, '88484', 'Maria', 25, 'Curitiba']]; draw('', true); };
          $('#ins', el).onclick = () => {
            const v = [1, 2, 3, 4, 5].map((i) => $('#f' + i, el).value.trim());
            if (!v[0]) return draw('PRIMARY KEY: id_cliente não pode ser nulo (integridade de nulo e de chave).', false);
            if (!/^\d+$/.test(v[0])) return draw('Domínio: id_cliente é INT; recebeu um valor que não é número.', false);
            if (data.some((r) => String(r[0]) === v[0])) return draw(`PRIMARY KEY: já existe o id_cliente ${v[0]} (integridade de chave).`, false);
            if (v[1] && data.some((r) => r[1] === v[1])) return draw(`UNIQUE: o cpf ${v[1]} já está cadastrado.`, false);
            if (!v[2]) return draw('NOT NULL: o nome é obrigatório.', false);
            if (v[3] && !/^\d+$/.test(v[3])) return draw('Domínio: idade é INT.', false);
            if (v[3] && +v[3] <= 18) return draw(`CHECK (idade > 18): ${v[3]} não satisfaz a regra de validação.`, false);
            data.push([+v[0], v[1] || null, v[2], v[3] ? +v[3] : null, v[4] || 'Recife']);
            draw(v[4] ? 'Linha inserida.' : 'Linha inserida. A cidade não foi informada, então o DEFAULT “Recife” foi aplicado.', true);
          };
        };
        draw('', true);
      } },
      { t: 'DROP × TRUNCATE ao vivo', d: 'Veja a diferença entre apagar os dados e apagar a tabela.', mount(el) {
        const base = [[1, 'Ana'], [2, 'Bruno'], [3, 'Carla']];
        let st = { rows: base.slice(), exists: true, msg: '' };
        const draw = () => {
          el.innerHTML = `<div class="ctrl"><button class="btn" id="tr">TRUNCATE TABLE estudantes</button><button class="btn ghost" id="dr">DROP TABLE estudantes</button><button class="btn ghost" id="se">SELECT * FROM estudantes</button><button class="smallbtn" id="rs">Recriar</button></div>
          <div class="rel-out">${st.exists ? `Tabela <b>estudantes</b> existe: ${st.rows.length} linha(s).` : 'A tabela <b>estudantes</b> não existe mais (estrutura e dados foram removidos).'}</div>${st.msg ? `<div class="banner ${st.bad ? 'bad' : 'ok'}">${st.msg}</div>` : ''}${st.show ? T(['id', 'nome'], st.rows) : ''}`;
          $('#tr', el).onclick = () => { st = st.exists ? { ...st, rows: [], msg: 'TRUNCATE executado: os dados sumiram, a estrutura continua.', bad: false, show: false } : { ...st, msg: "Erro: tabela 'estudantes' não existe.", bad: true, show: false }; draw(); };
          $('#dr', el).onclick = () => { st = st.exists ? { rows: [], exists: false, msg: 'DROP executado: a tabela inteira foi removida.', bad: false } : { ...st, msg: "Erro: tabela 'estudantes' não existe.", bad: true }; draw(); };
          $('#se', el).onclick = () => { st = st.exists ? { ...st, msg: `SELECT devolveu ${st.rows.length} linha(s).`, bad: false, show: st.rows.length > 0 } : { ...st, msg: "Erro 1146: tabela 'estudantes' não existe.", bad: true, show: false }; draw(); };
          $('#rs', el).onclick = () => { st = { rows: base.slice(), exists: true, msg: '' }; draw(); };
        };
        draw();
      } },
    ],
    activities: [
      { t: 'Qual constraint resolve?', d: 'Relacione cada regra à constraint adequada.', kind: 'classify',
        cfg: { choices: ['NOT NULL', 'UNIQUE', 'PRIMARY KEY', 'FOREIGN KEY', 'CHECK', 'DEFAULT'], items: [
          { t: 'O nome do cliente é obrigatório.', a: 0, why: 'NOT NULL impede valor nulo.' },
          { t: 'Dois clientes não podem ter o mesmo cpf (a PK é outra coluna).', a: 1, why: 'UNIQUE impede repetição de valores.' },
          { t: 'Identifica cada linha de forma única e nunca nula.', a: 2, why: 'É a chave primária.' },
          { t: 'cod_curso do aluno deve existir na tabela curso.', a: 3, why: 'Integridade referencial.' },
          { t: 'A idade deve ser maior que 18.', a: 4, why: 'CHECK define a regra de validação.' },
          { t: 'Se a cidade não for informada, assume “Recife”.', a: 5, why: 'DEFAULT define o valor padrão.' },
        ] } },
      { t: 'Qual comando DDL?', d: 'Escolha o comando correspondente à tarefa.', kind: 'classify',
        cfg: { choices: ['CREATE', 'ALTER', 'DROP', 'TRUNCATE'], items: [
          { t: 'Criar a tabela Filme.', a: 0, why: 'CREATE TABLE.' },
          { t: 'Adicionar a coluna telefone em Paciente.', a: 1, why: 'ALTER TABLE … ADD.' },
          { t: 'Apagar a tabela inteira, estrutura e dados.', a: 2, why: 'DROP TABLE.' },
          { t: 'Apagar todas as linhas, mantendo a tabela.', a: 3, why: 'TRUNCATE TABLE.' },
          { t: 'Renomear a coluna nome para nomeCompleto.', a: 1, why: 'ALTER TABLE … RENAME COLUMN.' },
          { t: 'Remover a coluna telefone de Médico.', a: 1, why: 'ALTER TABLE … DROP COLUMN.' },
        ] } },
      { t: 'Qual integridade?', d: 'Classifique cada regra pelo tipo de integridade.', kind: 'classify',
        cfg: { choices: ['Domínio', 'Nulo', 'Chave', 'Referencial', 'Semântica'], items: [
          { t: 'O campo idade só aceita números inteiros.', a: 0, why: 'O valor deve obedecer ao domínio da coluna.' },
          { t: 'Campos que compõem a PK não podem ser nulos.', a: 1, why: 'Integridade de nulo.' },
          { t: 'Os valores de chave primária e alternativa não se repetem.', a: 2, why: 'Integridade de chave.' },
          { t: 'Todo código_aluno em matrícula deve existir em aluno.', a: 3, why: 'FK deve existir na PK referenciada.' },
          { t: 'Nenhum aluno pode estar matriculado em mais de um curso.', a: 4, why: 'Regra do negócio, implementada com regras e triggers.' },
          { t: 'A carga horária máxima de uma disciplina é de 120 horas.', a: 4, why: 'Regra do negócio (semântica).' },
        ] } },
      { t: 'Sugestão de resolução das atividades', d: 'Os modelos lógicos das atividades não estão nos slides, então as tabelas abaixo são exemplos para ilustrar cada comando.', kind: 'qa', items: [
        ['Atividade 1: renomear nome para nomeCompleto em Pessoa', sql('ALTER TABLE Pessoa RENAME COLUMN nome TO nomeCompleto;')],
        ['Atividade 1: adicionar area_lazer em Prédio e restringir a SIM ou NÃO', sql("ALTER TABLE Predio ADD COLUMN area_lazer VARCHAR(10);\nALTER TABLE Predio ADD CONSTRAINT chk_area_lazer CHECK (area_lazer IN ('SIM', 'NÃO'));")],
        ['Atividade 2: telefone em Paciente, remover de Médico e mudar um tipo', sql('ALTER TABLE Paciente ADD telefone VARCHAR(20);\nALTER TABLE Medico DROP COLUMN telefone;\nALTER TABLE Paciente MODIFY nome VARCHAR(100);')],
        ['Criar um banco e uma tabela com chave estrangeira', sql("CREATE DATABASE clinica;\nUSE clinica;\nCREATE TABLE medico (\n  crm CHAR(8) PRIMARY KEY,\n  nome VARCHAR(60) NOT NULL\n);\nCREATE TABLE consulta (\n  id INT PRIMARY KEY,\n  crm CHAR(8) NOT NULL,\n  data_consulta DATE,\n  FOREIGN KEY (crm) REFERENCES medico(crm)\n);")],
      ] },
    ],
    challenges: [
      { stem: 'Qual é a diferença entre os comandos DROP TABLE estudantes e TRUNCATE TABLE estudantes?',
        opts: ['Não há diferença.', 'DROP apaga apenas os dados; TRUNCATE apaga a tabela.', 'DROP apaga a tabela inteira, inclusive a estrutura; TRUNCATE apaga apenas os dados.', 'Ambos apagam apenas a estrutura.', 'TRUNCATE exige cláusula WHERE.'], c: 2,
        e: '<p>DROP remove definição e dados. TRUNCATE remove todas as linhas, sem condição, e mantém a tabela.</p>' },
      { stem: 'Qual comando permite adicionar uma nova coluna a uma tabela já existente?',
        opts: ['INSERT INTO', 'UPDATE', 'ALTER TABLE … ADD', 'SELECT', 'TRUNCATE TABLE'], c: 2,
        e: '<p>ALTER TABLE altera a estrutura; ADD acrescenta colunas ou restrições. INSERT e UPDATE mexem nos dados.</p>' },
      { stem: 'Em uma tabela matrícula, cada código de aluno deve corresponder a um aluno cadastrado na tabela aluno. Que tipo de integridade garante isso?',
        opts: ['Integridade de domínio.', 'Integridade de nulo.', 'Integridade de chave.', 'Integridade referencial.', 'Integridade semântica.'], c: 3,
        e: '<p>Os valores de uma chave estrangeira devem aparecer na chave primária da tabela referenciada.</p>' },
      { stem: 'Deseja-se garantir, no banco, que a idade de uma pessoa seja sempre maior que 18. Qual constraint é a mais adequada?',
        opts: ['NOT NULL', 'UNIQUE', 'PRIMARY KEY', 'CHECK', 'DEFAULT'], c: 3,
        e: '<p>CHECK determina uma regra de validação, como CONSTRAINT pessoa_idade CHECK (idade > 18).</p>' },
      { stem: 'Na criação da tabela cliente, a coluna cidade foi definida como VARCHAR(30) DEFAULT \'Recife\'. Se um cliente for inserido sem informar a cidade, o que ocorre?',
        opts: ['A inserção é recusada.', 'A cidade fica nula.', 'A cidade recebe o valor “Recife”.', 'A tabela é apagada.', 'O cliente anterior é atualizado.'], c: 2,
        e: '<p>DEFAULT define o valor aplicado quando a coluna não é informada no INSERT.</p>' },
      { stem: 'Sobre a chave primária e o valor nulo, é correto afirmar que:',
        opts: ['A PK pode conter valores nulos desde que seja única.', 'Os campos que compõem a PK não podem ser nulos.', 'Só chaves estrangeiras exigem valores não nulos.', 'NOT NULL é incompatível com PRIMARY KEY.', 'Nulos são sempre proibidos em qualquer coluna.'], c: 1,
        e: '<p>A integridade de nulo especifica se um campo pode ser nulo; para campos da PK, nunca pode.</p>' },
      { stem: 'Qual dos comandos a seguir pertence à DDL (Data Definition Language)?',
        opts: ['SELECT', 'INSERT', 'UPDATE', 'DELETE', 'CREATE TABLE'], c: 4,
        e: '<p>CREATE, ALTER, DROP, RENAME e TRUNCATE são DDL. INSERT, UPDATE e DELETE são DML; SELECT é DQL.</p>' },
      { stem: 'Sobre a linguagem SQL, é correto afirmar que:',
        opts: ['É usada apenas para consultas, apesar do nome.', 'É o padrão para bancos relacionais e serve também para definição e manipulação de dados.', 'Foi criada exclusivamente para bancos orientados a grafos.', 'Não possui padrão ISO/ANSI.', 'Não tem relação com a álgebra relacional.'], c: 1,
        e: '<p>Apesar do “query” no nome, a SQL também define e manipula dados e é fundamentada na álgebra relacional. Teve primeira padronização ISO/ANSI em 1986 (SQL-86).</p>' },
      { stem: 'Em relação aos nomes de tabelas e colunas, assinale a alternativa correta.',
        opts: ['Duas colunas da mesma tabela podem ter o mesmo nome.', 'Duas tabelas do mesmo esquema podem ter o mesmo nome.', 'Colunas com o mesmo nome podem existir em tabelas diferentes.', 'O nome da tabela pode ser uma palavra reservada.', 'O nome da tabela pode começar com número.'], c: 2,
        e: '<p>O nome de uma coluna deve ser único dentro da tabela, mas o mesmo nome pode ser usado em tabelas diferentes. O nome da tabela é único no esquema, começa com letra e não é palavra reservada.</p>' },
    ],
  });
})();
