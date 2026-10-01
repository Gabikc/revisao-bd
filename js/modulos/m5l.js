(function () {
  const CLI = [[1, 'João', 'Recife', '3333-1111'], [2, 'Paulo', 'São Paulo', '4444-2222'], [3, 'Maria', 'Fortaleza', '5555-3333'], [4, 'Ana', 'Recife', '6666-4444'], [5, 'Carlos', 'Natal', '7777-5555']];
  const NF = [[10, 1, 250], [11, 1, 90], [12, 3, 400], [13, 4, 150], [14, 5, 60]];
  const PIL = { Ana: ['A1', 'A2', 'A3'], Beto: ['A1', 'A2'], Caio: ['A2', 'A3'], Duda: ['A1', 'A2', 'A3', 'A4'] };
  const CID_C = ['Recife', 'São Paulo', 'Fortaleza', 'Natal'], CID_F = ['Recife', 'Natal', 'Salvador', 'Curitiba'];
  const tCli = (rows, hl) => T(['Id', 'Nome', 'Cidade', 'Telefone'], rows, hl);
  const opsym = '<b>σ</b> seleção · <b>π</b> projeção · <b>⋈</b> junção · <b>÷</b> divisão · <b>∪</b> união · <b>∩</b> interseção · <b>−</b> diferença';

  /* ---- diagramas do conversor ---- */
  const dTern = er({ w: 600, h: 240, alt: 'Ternário Professor, Disciplina e Aluno', nodes: [
    { id: 'P', t: 'e', l: 'Professor', x: 100, y: 60 }, { id: 'D', t: 'e', l: 'Disciplina', x: 500, y: 60 }, { id: 'A', t: 'e', l: 'Aluno', x: 300, y: 200 }, { id: 'R', t: 'r', l: 'ministra', x: 300, y: 92 },
  ], edges: [['P', 'R', '(1,N)'], ['D', 'R', '(1,N)'], ['A', 'R', '(1,N)']] });
  const dAutoG = er({ w: 600, h: 215, alt: 'Auto-relacionamento gerencia', nodes: [
    { id: 'F', t: 'e', l: 'Funcionário', x: 300, y: 170 }, { id: 'R', t: 'r', l: 'gerencia', x: 300, y: 62 }, { id: 'c1', t: 'cap', l: 'gerente', x: 120, y: 50 }, { id: 'c2', t: 'cap', l: 'gerenciado', x: 480, y: 50 },
  ], edges: [['F', 'R', '(0,N)', '', { via: [175, 62] }], ['F', 'R', '(0,1)', '', { via: [425, 62] }]] });
  const dAutoN = er({ w: 600, h: 215, alt: 'Auto-relacionamento compõe', nodes: [
    { id: 'F', t: 'e', l: 'Produto', x: 300, y: 170 }, { id: 'R', t: 'r', l: 'compõe', x: 300, y: 62 }, { id: 'c1', t: 'cap', l: 'composto', x: 120, y: 50 }, { id: 'c2', t: 'cap', l: 'componente', x: 480, y: 50 },
  ], edges: [['F', 'R', '(0,N)', '', { via: [175, 62] }], ['F', 'R', '(0,N)', '', { via: [425, 62] }]] });
  const dFr = er({ w: 600, h: 180, alt: 'Entidade fraca', nodes: [
    { id: 'E', t: 'e', l: 'Empregado', x: 110, y: 66 }, { id: 'R', t: 'r', l: 'possui', x: 300, y: 66 }, { id: 'D', t: 'w', l: 'Dependente', x: 490, y: 66 },
    { id: 'a', t: 'a', l: 'matrícula', k: 1, x: 110, y: 145 }, { id: 'b', t: 'a', l: 'nome', p: 1, x: 490, y: 145 },
  ], edges: [['E', 'R', '(0,N)'], ['R', 'D', '', '(1,1)'], ['E', 'a'], ['D', 'b']] });
  const dGen = er({ w: 600, h: 200, alt: 'Generalização de cliente', nodes: [
    { id: 'S', t: 'e', l: 'Cliente', x: 300, y: 36 }, { id: 'G', t: 'g', l: 't', x: 300, y: 100 }, { id: 'A', t: 'e', l: 'Pessoa física', x: 170, y: 165 }, { id: 'B', t: 'e', l: 'Pessoa jurídica', x: 430, y: 165 },
  ], edges: [['S', 'G'], ['G', 'A'], ['G', 'B']] });
  const dAgg = er({ w: 600, h: 330, alt: 'Agregação Consulta emite Receita', nodes: [
    { id: 'BOX', t: 'box', l: 'Consulta (agregação)', x: 300, y: 78, w: 570, h: 112 },
    { id: 'M', t: 'e', l: 'Médico', x: 110, y: 90 }, { id: 'C', t: 'r', l: 'Consulta', x: 300, y: 90 }, { id: 'P', t: 'e', l: 'Paciente', x: 490, y: 90 },
    { id: 'E', t: 'r', l: 'Emite', x: 300, y: 215 }, { id: 'RC', t: 'e', l: 'Receita', x: 300, y: 295 },
  ], edges: [['M', 'C', '(0,N)'], ['C', 'P', '', '(0,N)'], ['E', 'BOX', '', '(0,N)'], ['RC', 'E', '(1,1)']] });
  const dMult = er({ w: 600, h: 150, alt: 'Pessoa com telefone multivalorado', nodes: [
    { id: 'P', t: 'e', l: 'Pessoa', x: 300, y: 100 }, { id: 'a', t: 'a', l: 'cpf', k: 1, x: 200, y: 32 }, { id: 'b', t: 'a', l: 'nome', x: 300, y: 28 }, { id: 'c', t: 'a', l: 'telefone', m: 1, x: 410, y: 32 },
  ], edges: [['P', 'a'], ['P', 'b'], ['P', 'c']] });

  /* ---- casos do conversor ---- */
  const CASES = [
    { t: 'N:N (Nota fiscal × Produto)', er: bin('Nota fiscal', 'Produto', 'contém', '(1,N)', '(1,N)', { aR: ['quantidade'] }),
      rule: 'Relacionamento N:N vira uma <b>tabela própria</b>. Sua chave primária é composta pelas chaves das duas entidades (cada uma também é FK). Atributos do relacionamento entram nessa tabela.',
      sch: [sch('NotaFiscal', ['*num', 'data']), sch('Produto', ['*cod', 'descricao']), sch('Contem', ['*^num_nota', '*^cod_prod', 'quantidade'], ['num_nota referencia NotaFiscal', 'cod_prod referencia Produto'])] },
    { t: '1:N obrigatório (Escola (1,N) × Aluno (1,1))', er: bin('Escola', 'Aluno', 'estuda', '(1,N)', '(1,1)'),
      rule: 'A <b>chave estrangeira vai para a tabela do lado N</b> (a entidade cujo máximo é 1 no relacionamento), que aponta para o lado 1. Como Aluno tem (1,1), a FK é obrigatória (NOT NULL).',
      sch: [sch('Escola', ['*cod', 'nome']), sch('Aluno', ['*matricula', 'nome', '^cod_escola'], ['cod_escola referencia Escola, NOT NULL'])] },
    { t: '1:N opcional (Empresa (0,N) × Funcionário (0,1))', er: bin('Empresa', 'Funcionário', 'emprega', '(0,N)', '(0,1)'),
      rule: 'Mesma regra: FK no lado N. Como a participação do funcionário é opcional (0,1), a FK <b>pode ser nula</b>.',
      sch: [sch('Empresa', ['*cnpj', 'nome']), sch('Funcionario', ['*matr', 'nome', '^cnpj_empresa'], ['cnpj_empresa referencia Empresa, aceita nulo'])] },
    { t: '1:1 opcional dos dois lados (0,1) × (0,1)', er: bin('Funcionário', 'Computador', 'usa', '(0,1)', '(0,1)'),
      rule: 'Há três soluções: FK em uma das tabelas, FK na outra, ou <b>tabela própria</b> para o relacionamento. Com poucos casos de associação, a tabela própria evita muitos valores nulos. As chaves na tabela do relacionamento são únicas.',
      sch: [sch('Funcionario', ['*matr', 'nome']), sch('Computador', ['*patrimonio', 'modelo']), sch('Usa', ['*^matr', '^patrimonio'], ['matr referencia Funcionario', 'patrimonio referencia Computador, único'])] },
    { t: '1:1 com um lado obrigatório (0,1) × (1,1)', er: bin('Pessoa', 'Certidão', 'possui', '(0,1)', '(1,1)'),
      rule: 'A <b>FK vai para a tabela da entidade com participação obrigatória</b> (1,1), assim nunca é nula. Ela deve ser única (é um 1:1).',
      sch: [sch('Pessoa', ['*cpf', 'nome']), sch('Certidao', ['*numero', 'data', '^cpf_pessoa'], ['cpf_pessoa referencia Pessoa, único e NOT NULL'])] },
    { t: '1:1 obrigatório dos dois lados (1,1) × (1,1)', er: bin('Funcionário', 'Cartão de acesso', 'recebe', '(1,1)', '(1,1)'),
      rule: 'Solução mais comum: <b>fundir</b> as duas entidades em uma só tabela, pois uma não existe sem a outra.',
      sch: [sch('Funcionario', ['*matr', 'nome', 'num_cartao', 'data_emissao_cartao'])] },
    { t: 'Entidade fraca (Empregado × Dependente)', er: dFr,
      rule: 'A tabela da fraca recebe a chave da forte como FK, e sua <b>chave primária é composta</b>: chave da forte + discriminador.',
      sch: [sch('Empregado', ['*matricula', 'nome']), sch('Dependente', ['*^matricula', '*nome', 'dt_nascimento'], ['matricula referencia Empregado'])] },
    { t: 'Auto-relacionamento 1:N (Funcionário gerencia)', er: dAutoG,
      rule: 'Segue a regra do 1:N, mas a FK aponta para a <b>própria tabela</b>. Quem não tem gerente fica com nulo.',
      sch: [sch('Funcionario', ['*matr', 'nome', '^matr_gerente'], ['matr_gerente referencia Funcionario (a própria tabela), aceita nulo'])] },
    { t: 'Auto-relacionamento N:N (Produto compõe Produto)', er: dAutoN,
      rule: 'Como todo N:N, vira <b>tabela própria</b>, com duas FKs para a mesma tabela (uma por papel).',
      sch: [sch('Produto', ['*cod', 'nome']), sch('Composicao', ['*^cod_composto', '*^cod_componente', 'quantidade'], ['cod_composto referencia Produto', 'cod_componente referencia Produto'])] },
    { t: 'Relacionamento ternário', er: dTern,
      rule: 'Vira <b>tabela própria</b> com as chaves das três entidades. Quando as três são N, a chave primária é a combinação das três. Se uma delas tiver máximo 1 (como Agência em cliente-conta-agência), ela não entra na chave.',
      sch: [sch('Professor', ['*cod_prof', 'nome']), sch('Disciplina', ['*cod_disc', 'nome']), sch('Aluno', ['*matr', 'nome']), sch('Ministra', ['*^cod_prof', '*^cod_disc', '*^matr'], ['cada coluna referencia sua tabela de origem'])] },
    { t: 'Atributo multivalorado (telefone)', er: dMult,
      rule: 'Duas soluções: <b>tabela separada</b> com a chave da entidade + o valor (aceita qualquer quantidade), ou colunas repetidas na própria tabela (só se o número máximo de valores for pequeno e conhecido).',
      sch: [sch('Pessoa', ['*cpf', 'nome']), sch('Telefone', ['*^cpf', '*numero'], ['cpf referencia Pessoa'])] },
    { t: 'Agregação (Consulta emite Receita)', er: dAgg,
      rule: 'O relacionamento agregado vira uma tabela (como um N:N) e <b>sua chave primária é usada</b> como FK, composta, nas tabelas que se relacionam com ele.',
      sch: [sch('Medico', ['*crm', 'nome']), sch('Paciente', ['*prontuario', 'nome']), sch('Consulta', ['*^crm', '*^prontuario', '*data_hora'], ['crm referencia Medico', 'prontuario referencia Paciente']), sch('Receita', ['*cod', 'texto', '^crm', '^prontuario', '^data_hora'], ['(crm, prontuario, data_hora) referencia Consulta'])] },
    { t: 'Generalização (Cliente, PF e PJ)', er: dGen,
      rule: 'Há três opções: <b>(1)</b> uma tabela para toda a hierarquia, com coluna de tipo e nulos; <b>(2)</b> uma tabela para cada especialização, repetindo os atributos comuns; <b>(3)</b> uma tabela para a genérica e uma para cada especializada, cuja chave primária é também FK. A opção (3) é a mais geral.',
      sch: [sch('Cliente', ['*cod', 'nome', 'tipo']), sch('PessoaFisica', ['*^cod', 'rg', 'sexo'], ['cod referencia Cliente']), sch('PessoaJuridica', ['*^cod', 'cnpj'], ['cod referencia Cliente'])] },
  ];

  MODULES.push({
    id: 'a5l', acc: 'vio', short: 'Modelo lógico e mapeamento',
    title: 'Modelo lógico: relacional, álgebra e mapeamento do E-R',
    blurb: 'Do diagrama para as tabelas. Chaves e integridade, os operadores da álgebra relacional e as regras para transformar cada construção do modelo E-R em relações.',
    topics: [
      { g: 'Modelo relacional', t: 'O modelo relacional (Codd, 1970)', h:
        `<p>O modelo relacional foi proposto por E. F. Codd em 1970, no artigo <i>A Relational Model of Data for Large Shared Data Banks</i>. Ele descreve os dados em <b>relações</b>, que na prática são tabelas, independentemente de como são armazenados fisicamente.</p><p><a href="https://www.seas.upenn.edu/~zives/03f/cis550/codd.pdf" target="_blank" rel="noopener">Artigo de Codd (PDF)</a></p>` +
        tip('O modelo lógico depende do tipo de SGBD (aqui, relacional). O conceitual (E-R) não depende. É o nível intermediário do projeto.') },
      { t: 'Termos: relação, tupla, atributo, domínio', h:
        T(['Termo do modelo', 'Na prática'], [['Relação', 'Tabela'], ['Tupla', 'Linha (registro)'], ['Atributo', 'Coluna (campo)'], ['Domínio', 'Conjunto de valores permitidos para o atributo'], ['Grau', 'Número de atributos da relação'], ['Cardinalidade da relação', 'Número de tuplas']]) +
        T(['Id_Livro', 'ISBN', 'Título', 'Id_Editora'], [[1, '978-85-0001', 'Banco de Dados', 7], [2, '978-85-0002', 'Modelagem', 7], [3, '978-85-0003', 'Sistemas', 9]], { cap: 'Livro (3 tuplas, 4 atributos)' }) +
        note('Em uma relação não há tuplas repetidas e a ordem das linhas não importa.') },
      { t: 'Chaves', h:
        boxes([['Chave candidata', 'Qualquer atributo (ou conjunto) que identifica cada tupla unicamente. Uma tabela pode ter várias.'], ['Chave primária (PK)', 'A candidata escolhida para identificar as tuplas. Única e nunca nula.'], ['Chave alternativa', 'As candidatas que não foram escolhidas como primária.'], ['Chave estrangeira (FK)', 'Atributo que referencia a chave primária de outra tabela (ou da própria). É o que liga as tabelas.'], ['Chave composta', 'Chave formada por dois ou mais atributos (ex.: isbn + seq).'], ['Natural x sintética', 'Natural existe no mundo real (cpf, isbn). Sintética é criada pelo sistema (id autoincremental).']]) +
        `<p>Na tabela Livro acima, Id_Livro e ISBN são candidatas. Se Id_Livro é a primária, ISBN é <b>alternativa</b> e Id_Editora é <b>estrangeira</b> (aponta para Editora).</p>` },
      { g: 'Restrições de integridade', t: 'Tipos de restrição', h:
        T(['Restrição', 'O que garante'], [
          ['Integridade de domínio', 'O valor pertence ao domínio do atributo (tipo, faixa, formato).'],
          ['Integridade de vazio (NOT NULL)', 'O atributo não pode ficar sem valor.'],
          ['Unicidade (UNIQUE)', 'Nenhum valor se repete na coluna.'],
          ['Integridade de chave', 'A chave primária é única e não nula.'],
          ['Integridade referencial', 'Todo valor de FK existe como PK na tabela referenciada (ou é nulo, se permitido).'],
        ]) + tip('Inserir uma linha com FK inexistente, ou apagar uma linha referenciada, viola a integridade referencial.') },
      { t: 'CHECK e DEFAULT', h:
        `<p><b>CHECK</b> define uma condição que o valor deve satisfazer; <b>DEFAULT</b> define o valor usado quando nada é informado.</p>` +
        code('<span class="cm">-- idade entre 0 e 130; situação começa como pendente</span>\nCREATE TABLE Reserva (\n  id        INT PRIMARY KEY,\n  idade     INT CHECK (idade BETWEEN 0 AND 130),\n  situacao  VARCHAR(12) DEFAULT \'pendente\'\n);') },
      { g: 'Álgebra relacional', t: 'Visão geral dos operadores', h:
        `<p>A álgebra relacional é uma linguagem formal de consulta: cada operador recebe relações e devolve uma relação. Os operadores se dividem em <b>clássicos</b> (da teoria dos conjuntos) e <b>relacionais</b>.</p>` +
        boxes([['Relacionais', '<b>σ</b> seleção (filtra linhas) · <b>π</b> projeção (escolhe colunas) · <b>⋈</b> junção (combina tabelas) · <b>÷</b> divisão'], ['Conjuntos', '<b>∪</b> união · <b>∩</b> interseção · <b>−</b> diferença. Exigem relações <i>compatíveis</i>: mesmo número de atributos e domínios compatíveis.']]) +
        T(['Id', 'Nome', 'Cidade', 'Telefone'], CLI, { cap: 'Clientes (usada nos exemplos)' }) + T(['Id_nota', 'Id_cliente', 'Valor'], NF, { cap: 'NotaFiscal' }) },
      { t: 'Seleção (σ)', h:
        `<p>Escolhe as <b>linhas</b> que satisfazem uma condição. Mantém todas as colunas.</p><div class="expr">σ <sub>cidade = 'Recife'</sub> (Clientes)</div>` + tCli(CLI.filter((r) => r[2] === 'Recife')) + code('SELECT * FROM Clientes WHERE cidade = \'Recife\';') },
      { t: 'Projeção (π)', h:
        `<p>Escolhe as <b>colunas</b>. Como o resultado é um conjunto, <b>linhas repetidas são eliminadas</b>.</p><div class="expr">π <sub>nome, telefone</sub> (Clientes)</div>` + T(['Nome', 'Telefone'], CLI.map((r) => [r[1], r[3]])) + code('SELECT nome, telefone FROM Clientes;') +
        trap('π cidade (Clientes) devolve 4 linhas, não 5: Recife aparece uma só vez.') },
      { t: 'Junção (⋈)', h:
        `<p>Combina tuplas de duas relações que satisfazem uma condição (normalmente igualdade entre FK e PK). É o produto cartesiano seguido de uma seleção.</p><div class="expr">Clientes ⋈ <sub>Id = Id_cliente</sub> NotaFiscal</div>` +
        T(['Id', 'Nome', 'Id_nota', 'Valor'], NF.map((n) => { const c = CLI.find((x) => x[0] === n[1]); return [c[0], c[1], n[0], n[2]]; })) +
        code('SELECT c.id, c.nome, n.id_nota, n.valor\nFROM Clientes c JOIN NotaFiscal n ON c.id = n.id_cliente;') + note('Paulo (Id 2) não tem nota fiscal e não aparece no resultado da junção.') },
      { t: 'Divisão (÷)', h:
        `<p>Devolve os valores de um atributo que estão associados a <b>todos</b> os valores de outra relação. Use quando a pergunta tem “todos”.</p>` +
        T(['Piloto', 'Avião'], Object.entries(PIL).flatMap(([p, a]) => a.map((x) => [p, x])), { cap: 'PILOTA' }) + T(['Avião'], [['A1'], ['A2']], { cap: 'AVIÕES (divisor)' }) +
        `<div class="expr">PILOTA ÷ AVIÕES</div>` + T(['Piloto'], [['Ana'], ['Beto'], ['Duda']], { cap: 'Resultado: pilotos que pilotam A1 e A2' }) },
      { t: 'União, interseção e diferença', h:
        `<p>Operam sobre relações compatíveis. Com as cidades dos clientes {Recife, São Paulo, Fortaleza, Natal} e dos fornecedores {Recife, Natal, Salvador, Curitiba}:</p>` +
        T(['Operação', 'Significa', 'Resultado'], [['π cidade (Clientes) ∪ π cidade (Fornecedores)', 'em um conjunto ou no outro (sem repetir)', 'Recife, São Paulo, Fortaleza, Natal, Salvador, Curitiba'], ['π cidade (Clientes) ∩ π cidade (Fornecedores)', 'nos dois conjuntos', 'Recife, Natal'], ['π cidade (Clientes) − π cidade (Fornecedores)', 'no primeiro e não no segundo', 'São Paulo, Fortaleza']]) +
        trap('A diferença não é comutativa: A − B é diferente de B − A. A união e a interseção são.') },
      { g: 'Mapeamento E-R → relacional', t: 'Entidades e atributos', h:
        ul(['Cada <b>entidade</b> vira uma tabela.', 'Cada <b>atributo</b> vira uma coluna.', 'O <b>identificador</b> vira a chave primária.', 'Atributo composto: uma coluna para cada parte (rua, número, bairro).', 'Atributo derivado: em geral não é guardado (calculado na consulta).']) + sch('Cliente', ['*cpf', 'nome', 'rua', 'numero', 'bairro']) },
      { t: 'Atributo multivalorado', h: `<p>Duas soluções:</p>` + ol(['<b>Tabela separada</b> com a chave da entidade + o valor. Chave primária composta. Aceita qualquer quantidade de valores.', '<b>Colunas repetidas</b> (telefone1, telefone2) na própria tabela: só se o máximo de valores for pequeno e conhecido.']) + sch('Pessoa', ['*cpf', 'nome']) + sch('Telefone', ['*^cpf', '*numero'], ['cpf referencia Pessoa']) },
      { t: 'Relacionamentos N:N', h: `<p>Sempre viram <b>tabela própria</b>. Chave primária composta pelas chaves das duas entidades (que também são FK). Atributos do relacionamento entram nessa tabela.</p>` + sch('Livro', ['*isbn', 'titulo']) + sch('Autor', ['*cod', 'nome']) + sch('Autoria', ['*^isbn', '*^cod_autor'], ['isbn referencia Livro', 'cod_autor referencia Autor']) },
      { t: 'Relacionamentos 1:N', h: `<p>A <b>FK vai para o lado N</b> (a entidade com máximo 1 no relacionamento) e aponta para o lado 1. Atributos do relacionamento também vão para esse lado. Se o mínimo é 0, a FK aceita nulo; se é 1, NOT NULL.</p>` + sch('Escola', ['*cod', 'nome']) + sch('Aluno', ['*matricula', 'nome', '^cod_escola'], ['cod_escola referencia Escola, NOT NULL']) },
      { t: 'Relacionamentos 1:1', h:
        T(['Caso', 'Solução'], [['(0,1) × (0,1)', 'Três opções: FK em uma tabela, FK na outra, ou tabela própria. Com poucas associações, a tabela própria evita nulos.'], ['(1,1) × (0,1)', 'FK na tabela da entidade obrigatória (1,1), única e NOT NULL.'], ['(1,1) × (1,1)', 'Fundir as duas entidades em uma só tabela.']]) },
      { t: 'Entidade fraca', h: `<p>Chave primária composta: <b>chave da forte + discriminador</b>. A chave da forte é também FK.</p>` + sch('Empregado', ['*matricula', 'nome']) + sch('Dependente', ['*^matricula', '*nome', 'dt_nascimento'], ['matricula referencia Empregado']) },
      { t: 'Auto-relacionamento', h: `<p>1:N: FK na própria tabela. N:N: tabela própria com duas FKs para a mesma tabela.</p>` + sch('Funcionario', ['*matr', 'nome', '^matr_gerente'], ['matr_gerente referencia Funcionario']) + sch('Composicao', ['*^cod_composto', '*^cod_componente'], ['ambas referenciam Produto']) },
      { t: 'Relacionamento ternário e agregação', h:
        `<p><b>Ternário:</b> tabela própria com as chaves das três entidades. <b>Agregação:</b> o relacionamento agregado vira tabela e sua chave primária é usada como FK (composta) na tabela que se relaciona com a agregação.</p>` + sch('Ministra', ['*^cod_prof', '*^cod_disc', '*^matr']) + sch('Receita', ['*cod', 'texto', '^crm', '^prontuario', '^data_hora'], ['(crm, prontuario, data_hora) referencia Consulta']) },
      { t: 'Generalização e especialização', h:
        T(['Opção', 'Como fica', 'Quando serve'], [['1. Uma tabela para tudo', 'Todos os atributos numa tabela + coluna de tipo. Gera nulos.', 'Poucos atributos específicos.'], ['2. Tabela por especialização', 'Cada subclasse tem tabela com atributos herdados repetidos. Sem tabela da genérica.', 'Especialização total.'], ['3. Genérica + especializadas', 'Uma tabela para a genérica e uma por subclasse, com PK que é também FK.', 'Caso mais geral (total ou parcial).']]) },
      { t: 'Resumo das regras', h:
        T(['Construção no E-R', 'No modelo relacional'], [['Entidade', 'Tabela'], ['Atributo multivalorado', 'Tabela separada (ou colunas repetidas)'], ['N:N e ternário', 'Tabela própria com as chaves das entidades'], ['1:N', 'FK no lado N'], ['1:1', 'FK no lado obrigatório, tabela própria ou fusão'], ['Entidade fraca', 'PK composta (forte + discriminador)'], ['Auto-relacionamento', 'FK na própria tabela (1:N) ou tabela própria (N:N)'], ['Agregação', 'Tabela do relacionamento, com PK usada como FK'], ['Generalização', 'Uma tabela, uma por subclasse, ou genérica + subclasses']]) },
    ],
    examples: [
      { t: 'Laboratório de álgebra relacional', d: 'Mexa nos controles e veja a expressão, o SQL equivalente e o resultado.', mount(el) {
        const OPS = ['σ Seleção', 'π Projeção', '⋈ Junção', '÷ Divisão', '∪ ∩ − Conjuntos'];
        el.innerHTML = `<div class="op-tabs" id="tb">${OPS.map((o, i) => `<button data-i="${i}" aria-pressed="${i === 0}">${o}</button>`).join('')}</div><div id="ct"></div>`;
        const view = [
          () => `<div class="ctrl"><label>cidade = <select id="s1"><option value="">(todas)</option>${[...new Set(CLI.map((r) => r[2]))].map((c) => `<option>${c}</option>`).join('')}</select></label></div><div id="o"></div>`,
          () => `<div class="ctrl">${['Id', 'Nome', 'Cidade', 'Telefone'].map((c, i) => `<label><input type="checkbox" data-c="${i}" ${i === 1 || i === 2 ? 'checked' : ''}> ${c}</label>`).join('')}</div><div id="o"></div>`,
          () => `<div class="ctrl"><label>valor da nota ≥ <input type="range" id="s3" min="0" max="400" step="10" value="100"> <b id="v3">100</b></label></div><div id="o"></div>`,
          () => `<div class="ctrl">Aviões do divisor: ${['A1', 'A2', 'A3', 'A4'].map((a) => `<label><input type="checkbox" data-a="${a}" ${a === 'A1' || a === 'A2' ? 'checked' : ''}> ${a}</label>`).join('')}</div><div id="o"></div>`,
          () => `<div class="ctrl"><select id="s5"><option value="u">União ∪</option><option value="i">Interseção ∩</option><option value="a">Diferença Clientes − Fornecedores</option><option value="b">Diferença Fornecedores − Clientes</option></select></div><div id="o"></div>`,
        ];
        const upd = [
          () => { const c = $('#s1', el).value, r = c ? CLI.filter((x) => x[2] === c) : CLI; $('#o', el).innerHTML = `<div class="expr">σ <sub>${c ? "cidade = '" + c + "'" : 'verdadeiro'}</sub> (Clientes)<br><span class="sql">SELECT * FROM Clientes${c ? " WHERE cidade = '" + c + "'" : ''};</span></div>` + tCli(r); },
          () => { const cols = $$('input[data-c]', el).filter((x) => x.checked).map((x) => +x.dataset.c); const names = ['Id', 'Nome', 'Cidade', 'Telefone']; if (!cols.length) { $('#o', el).innerHTML = '<div class="empty">Marque ao menos uma coluna.</div>'; return; }
            const seen = new Set(), rows = []; CLI.forEach((r) => { const k = cols.map((c) => r[c]).join('|'); if (!seen.has(k)) { seen.add(k); rows.push(cols.map((c) => r[c])); } });
            $('#o', el).innerHTML = `<div class="expr">π <sub>${cols.map((c) => names[c].toLowerCase()).join(', ')}</sub> (Clientes)<br><span class="sql">SELECT DISTINCT ${cols.map((c) => names[c].toLowerCase()).join(', ')} FROM Clientes;</span></div>` + T(cols.map((c) => names[c]), rows) + (rows.length < CLI.length ? `<div class="banner ok">${CLI.length - rows.length} linha(s) repetida(s) foi(ram) eliminada(s).</div>` : ''); },
          () => { const m = +$('#s3', el).value; $('#v3', el).textContent = m; const rows = NF.filter((n) => n[2] >= m).map((n) => { const c = CLI.find((x) => x[0] === n[1]); return [c[0], c[1], n[0], n[2]]; });
            $('#o', el).innerHTML = `<div class="expr">σ <sub>valor ≥ ${m}</sub> (Clientes ⋈ <sub>Id = Id_cliente</sub> NotaFiscal)<br><span class="sql">SELECT c.id, c.nome, n.id_nota, n.valor FROM Clientes c JOIN NotaFiscal n ON c.id = n.id_cliente WHERE n.valor &gt;= ${m};</span></div>` + (rows.length ? T(['Id', 'Nome', 'Id_nota', 'Valor'], rows) : '<div class="empty">Nenhuma nota atende à condição.</div>') + '<p style="color:var(--muted);font-size:.9rem">Paulo não tem nota e nunca aparece na junção.</p>'; },
          () => { const div = $$('input[data-a]', el).filter((x) => x.checked).map((x) => x.dataset.a); const pil = Object.entries(PIL).filter(([, a]) => div.every((d) => a.includes(d))).map(([p]) => p);
            $('#o', el).innerHTML = `${T(['Piloto', 'Aviões que pilota'], Object.entries(PIL).map(([p, a]) => [p, a.join(', ')]), { cap: 'PILOTA', hl: Object.keys(PIL).map((p, i) => (pil.includes(p) && div.length ? i : -1)).filter((i) => i >= 0) })}<div class="expr">PILOTA ÷ {${div.join(', ')}}</div>` + (div.length ? `<div class="banner ${pil.length ? 'ok' : 'bad'}">${pil.length ? 'Pilotos que pilotam todos os aviões do divisor: ' + pil.join(', ') : 'Nenhum piloto pilota todos esses aviões.'}</div>` : '<div class="empty">Marque ao menos um avião no divisor.</div>'); },
          () => { const o = $('#s5', el).value, res = o === 'u' ? [...new Set(CID_C.concat(CID_F))] : o === 'i' ? CID_C.filter((c) => CID_F.includes(c)) : o === 'a' ? CID_C.filter((c) => !CID_F.includes(c)) : CID_F.filter((c) => !CID_C.includes(c));
            const ex = { u: 'π cidade (Clientes) ∪ π cidade (Fornecedores)', i: 'π cidade (Clientes) ∩ π cidade (Fornecedores)', a: 'π cidade (Clientes) − π cidade (Fornecedores)', b: 'π cidade (Fornecedores) − π cidade (Clientes)' }[o];
            const chips = (list, name) => `<div><h4>${name}</h4>${list.map((c) => `<span class="pill ${res.includes(c) ? 'in' : ''}">${c}</span>`).join('')}</div>`;
            $('#o', el).innerHTML = `<div class="sets">${chips(CID_C, 'Cidades de clientes')}${chips(CID_F, 'Cidades de fornecedores')}</div><div class="expr">${ex}</div><div class="banner ok">Resultado: ${res.join(', ')}</div><p style="color:var(--muted);font-size:.9rem">As duas relações são compatíveis: um atributo (cidade) com o mesmo domínio.</p>`; },
        ];
        const show = (i) => { $$('#tb button', el).forEach((b) => b.setAttribute('aria-pressed', +b.dataset.i === i)); $('#ct', el).innerHTML = view[i](); $$('#ct input,#ct select', el).forEach((x) => x.addEventListener('input', upd[i])); upd[i](); };
        $$('#tb button', el).forEach((b) => b.onclick = () => show(+b.dataset.i)); show(0);
      } },
      { t: 'Conversor E-R → tabelas', d: 'Escolha uma construção do diagrama E-R e veja a regra e as tabelas resultantes. Sublinhado amarelo é chave primária; rosa é chave estrangeira.', mount(el) {
        el.innerHTML = `<div class="ctrl"><label>Construção: <select id="cv">${CASES.map((c, i) => `<option value="${i}">${c.t}</option>`).join('')}</select></label></div><div id="o"></div>`;
        const upd = () => { const c = CASES[+$('#cv', el).value]; $('#o', el).innerHTML = `${c.er}<div class="rel-out"><p>${c.rule}</p></div><h4 style="font-family:var(--hf);margin:12px 0 4px">Tabelas</h4>${c.sch.join('')}`; };
        $('#cv', el).onchange = upd; upd();
      } },
      { t: 'A biblioteca em tabelas', d: 'Tente escrever a tabela de cabeça e depois abra para conferir o esquema e a regra usada.', mount(el) {
        const L = [
          ['Livro', sch('Livro', ['*isbn', 'titulo', 'editora']), 'Entidade vira tabela; ISBN é a chave primária.'],
          ['Autores do livro (atributo multivalorado)', sch('Autor_Livro', ['*^isbn', '*autor'], ['isbn referencia Livro']), 'Multivalorado vira tabela separada com a chave de Livro + o valor.'],
          ['Exemplar (entidade fraca)', sch('Exemplar', ['*^isbn', '*seq', 'data_aquisicao', '^cod_estante'], ['isbn referencia Livro', 'cod_estante referencia Estante']), 'Fraca: PK composta (ISBN + sequência). A FK para Estante vem do 1:N (Exemplar é o lado N).'],
          ['Estante', sch('Estante', ['*codigo', 'categoria']), 'Entidade comum.'],
          ['Usuário (endereço composto)', sch('Usuario', ['*cpf', 'nome', 'rua', 'numero', 'bairro']), 'Atributo composto vira uma coluna por parte.'],
          ['Empréstimo (1:N com Usuário)', sch('Emprestimo', ['*id', 'data', '^cpf_usuario'], ['cpf_usuario referencia Usuario, NOT NULL']), 'A FK vai para o lado N (Empréstimo), obrigatória por causa do (1,1).'],
          ['Empréstimo × Exemplar (N:N)', sch('Item_Emprestimo', ['*^id_emprestimo', '*^isbn', '*^seq'], ['id_emprestimo referencia Emprestimo', '(isbn, seq) referencia Exemplar']), 'N:N vira tabela própria; a FK para Exemplar é composta porque a chave de Exemplar é composta.'],
        ];
        el.innerHTML = L.map((x) => qa(x[0], x[1] + `<p style="margin:8px 0 0"><b>Regra:</b> ${x[2]}</p>`)).join('');
      } },
    ],
    activities: [
      { t: 'Qual operador da álgebra relacional?', d: 'Escolha o operador para cada consulta.', kind: 'classify',
        cfg: { choices: ['σ Seleção', 'π Projeção', '⋈ Junção', '÷ Divisão', '∪ União', '∩ Interseção', '− Diferença'], items: [
          { t: 'Listar somente os clientes que moram em Recife.', a: 0, why: 'Filtra linhas por condição.' },
          { t: 'Mostrar apenas as colunas nome e telefone dos clientes.', a: 1, why: 'Escolhe colunas.' },
          { t: 'Combinar clientes e notas fiscais pelo id do cliente.', a: 2, why: 'Liga tuplas de duas tabelas por uma condição.' },
          { t: 'Pilotos que pilotam todos os aviões de uma lista.', a: 3, why: 'Palavra-chave: “todos”.' },
          { t: 'Cidades onde há clientes ou fornecedores, sem repetir.', a: 4, why: 'Está em um conjunto ou no outro.' },
          { t: 'Cidades onde há clientes e também fornecedores.', a: 5, why: 'Está nos dois conjuntos.' },
          { t: 'Cidades com clientes mas sem fornecedores.', a: 6, why: 'Está no primeiro e não no segundo.' },
        ] } },
      { t: 'Que tipo de chave é esta?', d: 'Considere Livro(Id_Livro, ISBN, Título, Id_Editora), com Id_Livro como chave primária.', kind: 'classify',
        cfg: { choices: ['Primária', 'Alternativa', 'Estrangeira', 'Composta'], items: [
          { t: 'Id_Livro, escolhida para identificar as linhas.', a: 0, why: 'A candidata escolhida é a primária.' },
          { t: 'ISBN: único, poderia identificar, mas não foi escolhido.', a: 1, why: 'Candidata não escolhida = alternativa.' },
          { t: 'Id_Editora, que aponta para a tabela Editora.', a: 2, why: 'Referencia a PK de outra tabela.' },
          { t: '(isbn, seq) juntos identificando um exemplar.', a: 3, why: 'Vários atributos formando a chave.' },
        ] } },
      { t: 'Qual regra de mapeamento se aplica?', d: 'Relacione a construção do E-R com a solução no modelo relacional.', kind: 'classify',
        cfg: { choices: ['Tabela própria', 'FK no lado N', 'Fundir em uma tabela', 'PK composta com a da forte'], items: [
          { t: 'Relacionamento N:N.', a: 0, why: 'Chaves das duas entidades formam a PK.' },
          { t: 'Escola (1,N) × Aluno (1,1).', a: 1, why: 'A FK fica em Aluno.' },
          { t: 'Relacionamento 1:1 com (1,1) dos dois lados.', a: 2, why: 'Uma não existe sem a outra.' },
          { t: 'Entidade fraca Dependente.', a: 3, why: 'Chave da forte + discriminador.' },
          { t: 'Atributo multivalorado telefone.', a: 0, why: 'Tabela separada com a chave da entidade + o valor.' },
          { t: 'Relacionamento ternário.', a: 0, why: 'Tabela com as chaves das três entidades.' },
        ] } },
      { t: 'Escreva as expressões', d: 'Escreva em álgebra relacional (com Clientes e NotaFiscal) e abra para conferir.', kind: 'qa', items: [
        ['Nomes dos clientes de Recife.', '<div class="expr">π <sub>nome</sub> (σ <sub>cidade = \'Recife\'</sub> (Clientes))</div>'],
        ['Nome e valor das notas de pelo menos R$ 200.', '<div class="expr">π <sub>nome, valor</sub> (σ <sub>valor ≥ 200</sub> (Clientes ⋈ <sub>Id = Id_cliente</sub> NotaFiscal))</div>'],
        ['Ids dos clientes que não têm nota fiscal.', '<div class="expr">π <sub>Id</sub> (Clientes) − π <sub>Id_cliente</sub> (NotaFiscal)</div><p>Diferença entre os ids de todos os clientes e os ids que aparecem em notas.</p>'],
      ] },
      { t: 'Mapeie a vídeo locadora', d: 'Use o DER do módulo 5 e escreva as tabelas. Depois abra o gabarito.', kind: 'qa', items: [
        ['Gabarito: tabelas da locadora', sch('Cliente', ['*cpf', 'nome', 'rg', 'rua', 'numero', 'bairro']) + sch('Telefone_Cliente', ['*^cpf', '*telefone'], ['cpf referencia Cliente (multivalorado)']) + sch('Filme', ['*cod', 'nome', 'duracao']) + sch('Genero', ['*cod', 'descricao']) + sch('Filme_Genero', ['*^cod_filme', '*^cod_genero']) + sch('Copia', ['*cod', '^cod_filme'], ['cod_filme referencia Filme, NOT NULL (1:N)']) + sch('Emprestimo', ['*cod', 'data_emprestimo', 'data_devolucao', 'valor', '^cpf'], ['cpf referencia Cliente, NOT NULL']) + sch('Item_Emprestimo', ['*^cod_emprestimo', '*^cod_copia']) + sch('Reserva', ['*cod', 'data_reserva', 'data_prevista', 'situacao', '^cpf'], ['cpf referencia Cliente, NOT NULL']) + sch('Item_Reserva', ['*^cod_reserva', '*^cod_copia']) + '<p>“Quantidade” de Filme foi omitida por poder ser derivada da contagem de cópias; se for mantida, vira uma coluna de Filme.</p>'],
      ] },
      { t: 'Leitura: o artigo de Codd', d: 'Leitura complementar sugerida em aula.', kind: 'html', html:
        `<p><a href="https://www.seas.upenn.edu/~zives/03f/cis550/codd.pdf" target="_blank" rel="noopener">Abrir o artigo de Codd (PDF)</a></p>` + qa('Que problema o modelo relacional buscava resolver?', '<p>Proteger usuários e programas de terem de conhecer como os dados estão organizados fisicamente: a chamada independência de dados. O modelo descreve os dados por relações, sem depender da ordem, do índice ou do caminho de acesso.</p>') },
    ],
    challenges: [
      { stem: 'No modelo relacional, os termos “relação”, “tupla” e “atributo” correspondem, na prática de um SGBD, a, respectivamente:',
        opts: ['Coluna, linha e tabela.', 'Tabela, linha e coluna.', 'Linha, tabela e coluna.', 'Tabela, coluna e linha.', 'Banco, tabela e linha.'], c: 1,
        e: '<p>Relação = tabela, tupla = linha (registro), atributo = coluna (campo).</p>', w: ['As outras alternativas trocam a ordem dos termos.'] },
      { stem: 'A tabela Livro(Id_Livro, ISBN, Título, Id_Editora) tem Id_Livro definido como chave primária. Sabendo que o ISBN também é único para cada livro e que Id_Editora referencia a tabela Editora, é correto afirmar que:',
        opts: ['ISBN é chave estrangeira e Id_Editora é chave alternativa.', 'ISBN é chave alternativa e Id_Editora é chave estrangeira.', 'ISBN e Id_Editora são chaves primárias.', 'Id_Livro é chave estrangeira.', 'ISBN é chave composta.'], c: 1,
        e: '<p>ISBN é candidata que não foi escolhida como primária, portanto alternativa. Id_Editora aponta para outra tabela: estrangeira.</p>', w: ['Uma tabela só tem uma chave primária; composta é formada por mais de um atributo.'] },
      { stem: 'Uma tentativa de inserir na tabela Turma um registro cujo cod_disc não existe na tabela Disciplina é recusada pelo SGBD. Qual restrição de integridade foi violada?',
        opts: ['Integridade de domínio.', 'Integridade de vazio.', 'Integridade de chave.', 'Integridade referencial.', 'Unicidade.'], c: 3,
        e: '<p>Todo valor de chave estrangeira deve existir como chave primária na tabela referenciada. Isso é integridade referencial.</p>', w: ['As outras tratam de tipo/faixa, valor nulo, chave duplicada e valor repetido.'] },
      { stem: 'Considere as relações Clientes(Id, Nome, Cidade, Telefone) e NotaFiscal(Id_nota, Id_cliente, Valor). Qual expressão da álgebra relacional retorna apenas os nomes dos clientes que moram em Recife?',
        opts: ['σ nome (π cidade = \'Recife\' (Clientes))', 'π nome (σ cidade = \'Recife\' (Clientes))', 'π cidade = \'Recife\' (Clientes)', 'σ nome, cidade (Clientes)', 'Clientes ⋈ NotaFiscal'], c: 1,
        e: '<p>Primeiro a seleção σ escolhe as linhas de Recife; depois a projeção π fica só com a coluna nome.</p>', w: ['A e C trocam σ e π; D usa seleção para escolher colunas; E é uma junção.'] },
      { stem: 'A tabela Clientes tem 5 tuplas, e a cidade Recife aparece em duas delas. Quantas tuplas retorna π cidade (Clientes), considerando 4 cidades distintas?',
        opts: ['5', '4', '2', '1', '9'], c: 1,
        e: '<p>A projeção elimina tuplas repetidas, pois o resultado é um conjunto. Quatro cidades distintas: 4 tuplas.</p>', w: ['5 seria o resultado sem eliminar duplicatas (como SELECT sem DISTINCT).'] },
      { stem: 'Deseja-se descobrir quais pilotos estão habilitados a pilotar todos os aviões de uma determinada lista. Qual operador da álgebra relacional é o mais adequado?',
        opts: ['Seleção.', 'Projeção.', 'Divisão.', 'Diferença.', 'Interseção.'], c: 2,
        e: '<p>A divisão devolve os valores associados a todos os valores da relação divisor. A palavra “todos” é a pista.</p>', w: ['Seleção filtra linhas, projeção escolhe colunas, diferença e interseção comparam conjuntos.'] },
      { stem: 'Sejam A = π cidade (Clientes) e B = π cidade (Fornecedores). Qual expressão retorna as cidades em que há clientes, mas não há fornecedores?',
        opts: ['A ∪ B', 'A ∩ B', 'A − B', 'B − A', 'A ⋈ B'], c: 2,
        e: '<p>A − B contém os elementos de A que não estão em B.</p>', w: ['B − A daria o inverso; união e interseção não excluem elementos.'] },
      { stem: 'Para que os operadores de união, interseção e diferença possam ser aplicados a duas relações R e S, é necessário que:',
        opts: ['R e S tenham o mesmo nome.', 'R e S sejam compatíveis: mesmo número de atributos e domínios compatíveis.', 'R e S tenham a mesma chave primária.', 'R e S tenham o mesmo número de tuplas.', 'R seja obrigatoriamente subconjunto de S.'], c: 1,
        e: '<p>Esses operadores exigem relações compatíveis quanto ao número de atributos e aos domínios.</p>', w: ['Nome, chave e número de tuplas não são exigências.'] },
      { stem: 'No mapeamento do modelo E-R para o relacional, um relacionamento N:N entre Nota Fiscal e Produto, com o atributo quantidade, deve ser transformado em:',
        opts: ['Uma coluna quantidade em Produto.', 'Uma coluna quantidade em NotaFiscal.', 'Uma tabela própria, com as chaves de NotaFiscal e Produto (chave primária composta) e a coluna quantidade.', 'Uma fusão das duas entidades.', 'Duas tabelas sem chave estrangeira.'], c: 2,
        e: '<p>N:N vira tabela própria; as chaves das duas entidades formam a PK (e são FKs); atributos do relacionamento vão para ela.</p>', w: ['A quantidade depende do par nota-produto, então não cabe em nenhuma das duas tabelas isoladamente.'] },
      { stem: 'Em um relacionamento 1:N entre Escola (1,N) e Aluno (1,1), onde deve ficar a chave estrangeira no modelo relacional?',
        opts: ['Na tabela Escola, apontando para Aluno.', 'Na tabela Aluno, apontando para Escola, e não nula.', 'Em uma terceira tabela obrigatória.', 'Nas duas tabelas.', 'Em nenhuma; o relacionamento não é representado.'], c: 1,
        e: '<p>A FK vai para o lado N (Aluno) e, como a participação é (1,1), é obrigatória (NOT NULL).</p>', w: ['Na Escola seria preciso vários valores em uma coluna; a terceira tabela é desnecessária em 1:N.'] },
      { stem: 'Dependente é uma entidade fraca de Empregado, identificada pelo nome do dependente dentro de cada empregado. Qual deve ser a chave primária da tabela Dependente?',
        opts: ['Somente o nome.', 'Somente a matrícula do empregado.', 'A matrícula do empregado combinada com o nome do dependente.', 'A data de nascimento.', 'Nenhuma; entidade fraca não tem chave.'], c: 2,
        e: '<p>Chave da entidade forte + discriminador. A matrícula também é FK para Empregado.</p>', w: ['Só o nome se repetiria entre empregados; só a matrícula não distinguiria dois dependentes do mesmo empregado.'] },
      { stem: 'Ao mapear a entidade Pessoa, que possui o atributo multivalorado telefone (uma pessoa pode ter vários números), qual é uma solução adequada?',
        opts: ['Criar uma tabela Telefone com o cpf da pessoa como chave estrangeira e o número, com chave primária composta.', 'Guardar todos os números separados por vírgula em uma única coluna.', 'Remover o atributo do modelo.', 'Transformar telefone em chave primária de Pessoa.', 'Criar uma tabela Pessoa por telefone.'], c: 0,
        e: '<p>Multivalorado vira tabela separada com a chave da entidade + o valor; essa PK composta evita repetir o mesmo número para a mesma pessoa.</p>', w: ['B viola a atomicidade dos valores; as demais distorcem o modelo.'] },
      { stem: 'Na tabela Funcionario(matr, nome, matr_gerente), a coluna matr_gerente referencia a coluna matr da própria tabela. Que construção do modelo E-R foi mapeada?',
        opts: ['Um relacionamento ternário.', 'Uma generalização total.', 'Um auto-relacionamento 1:N (gerente e gerenciado).', 'Uma entidade fraca.', 'Um atributo multivalorado.'], c: 2,
        e: '<p>Em um auto-relacionamento 1:N, a FK está na mesma tabela e referencia sua própria chave primária.</p>', w: ['As demais construções produzem tabelas ou chaves diferentes.'] },
      { stem: 'Ao mapear uma generalização Cliente com especializações Pessoa Física e Pessoa Jurídica, uma das alternativas é criar uma tabela para a entidade genérica e uma tabela para cada especialização, em que a chave primária de cada especializada é também chave estrangeira para a genérica. Uma desvantagem da alternativa de usar uma única tabela para toda a hierarquia, em comparação com essa, é:',
        opts: ['Não permitir consultar clientes.', 'Gerar muitos valores nulos nas colunas específicas de cada tipo.', 'Exigir que existam tabelas de relacionamento N:N.', 'Impedir o uso de chave primária.', 'Obrigar o uso de entidade fraca.'], c: 1,
        e: '<p>Com uma só tabela, colunas específicas de PF ficam nulas nas linhas de PJ e vice-versa.</p>', w: ['As outras alternativas não são consequência dessa escolha.'] },
    ],
  });
})();
