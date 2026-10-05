(function () {
  /* ---------- diagramas reutilizáveis ---------- */
  const dAtrib = er({ w: 700, h: 250, alt: 'Entidade Pessoa com atributos simples, chave, derivado, multivalorado e composto', nodes: [
    { id: 'P', t: 'e', l: 'Pessoa', x: 340, y: 44 },
    { id: 'a1', t: 'a', l: 'cpf', k: 1, x: 70, y: 125 }, { id: 'a2', t: 'a', l: 'nome', x: 160, y: 125 }, { id: 'a3', t: 'a', l: 'dt_nasc', x: 255, y: 125 },
    { id: 'a4', t: 'a', l: 'idade', d: 1, x: 350, y: 125 }, { id: 'a5', t: 'a', l: 'telefone', m: 1, x: 450, y: 125 }, { id: 'a6', t: 'a', l: 'endereço', x: 580, y: 125 },
    { id: 'b1', t: 'a', l: 'rua', x: 510, y: 205 }, { id: 'b2', t: 'a', l: 'bairro', x: 585, y: 205 }, { id: 'b3', t: 'a', l: 'cidade', x: 660, y: 205 },
  ], edges: [['P', 'a1'], ['P', 'a2'], ['P', 'a3'], ['P', 'a4'], ['P', 'a5'], ['P', 'a6'], ['a6', 'b1'], ['a6', 'b2'], ['a6', 'b3']] });
  const dAuto = (a, b, ca, cb, ea, eb, name = 'gerencia') => er({ w: 600, h: 215, alt: 'Auto-relacionamento', nodes: [
    { id: 'F', t: 'e', l: name === 'gerencia' ? 'Funcionário' : 'Produto', x: 300, y: 170 }, { id: 'R', t: 'r', l: name, x: 300, y: 62 },
    { id: 'c1', t: 'cap', l: ea, x: 120, y: 50 }, { id: 'c2', t: 'cap', l: eb, x: 480, y: 50 },
  ], edges: [['F', 'R', ca, '', { via: [175, 62] }], ['F', 'R', cb, '', { via: [425, 62] }]] });
  const dTern1 = er({ w: 600, h: 240, alt: 'Ternário Professor, Disciplina e Aluno', nodes: [
    { id: 'P', t: 'e', l: 'Professor', x: 100, y: 60 }, { id: 'D', t: 'e', l: 'Disciplina', x: 500, y: 60 }, { id: 'A', t: 'e', l: 'Aluno', x: 300, y: 200 }, { id: 'R', t: 'r', l: 'ministra', x: 300, y: 92 },
  ], edges: [['P', 'R', '(1,N)'], ['D', 'R', '(1,N)'], ['A', 'R', '(1,N)']] });
  const dTern2 = er({ w: 600, h: 240, alt: 'Ternário cliente, conta e agência', nodes: [
    { id: 'C', t: 'e', l: 'Cliente', x: 100, y: 60 }, { id: 'T', t: 'e', l: 'Conta', x: 500, y: 60 }, { id: 'G', t: 'e', l: 'Agência', x: 300, y: 200 }, { id: 'R', t: 'r', l: 'cli_conta', x: 300, y: 92 },
  ], edges: [['C', 'R', '(1,N)'], ['T', 'R', '(1,N)'], ['G', 'R', '(1,1)']] });
  const dGen = (tag, sup, s1, s2, at) => er({ w: 600, h: 262, alt: 'Generalização/especialização', nodes: [
    { id: 'S', t: 'e', l: sup, x: 300, y: 40 }, { id: 'G', t: 'g', l: tag, x: 300, y: 108 }, { id: 'A', t: 'e', l: s1, x: 170, y: 175 }, { id: 'B', t: 'e', l: s2, x: 430, y: 175 },
  ].concat(at), edges: [['S', 'G'], ['G', 'A'], ['G', 'B']].concat(at.map((a) => [a.of, a.id])) });
  const dFraca = er({ w: 600, h: 180, alt: 'Entidade fraca Dependente', nodes: [
    { id: 'E', t: 'e', l: 'Empregado', x: 110, y: 66 }, { id: 'R', t: 'r', l: 'possui', x: 300, y: 66 }, { id: 'D', t: 'w', l: 'Dependente', x: 490, y: 66 },
    { id: 'a', t: 'a', l: 'matrícula', k: 1, x: 110, y: 145 }, { id: 'b', t: 'a', l: 'nome', p: 1, x: 490, y: 145 },
  ], edges: [['E', 'R', '(1,1)'], ['R', 'D', '', '(0,N)'], ['E', 'a'], ['D', 'b']] });
  const dAgg = er({ w: 600, h: 330, alt: 'Agregação: Consulta emite Receita', nodes: [
    { id: 'BOX', t: 'box', l: 'Consulta (agregação)', x: 300, y: 78, w: 570, h: 112 },
    { id: 'M', t: 'e', l: 'Médico', x: 110, y: 90 }, { id: 'C', t: 'r', l: 'Consulta', x: 300, y: 90 }, { id: 'P', t: 'e', l: 'Paciente', x: 490, y: 90 },
    { id: 'E', t: 'r', l: 'Emite', x: 300, y: 215 }, { id: 'RC', t: 'e', l: 'Receita', x: 300, y: 295 },
  ], edges: [['M', 'C', '(0,N)'], ['C', 'P', '', '(0,N)'], ['E', 'BOX', '', '(1,1)'], ['RC', 'E', '(0,N)']] });
  const dCor1 = bin('Carro', 'Cor', 'possui', '(0,N)', '(1,1)');
  const dCor2 = er({ w: 600, h: 120, alt: 'Carro com atributo cor', nodes: [{ id: 'C', t: 'e', l: 'Carro', x: 300, y: 80 }, { id: 'a', t: 'a', l: 'cor', x: 300, y: 25 }], edges: [['C', 'a']] });
  const dImov1 = er({ w: 600, h: 130, alt: 'Imóvel com atributo tipo', nodes: [{ id: 'I', t: 'e', l: 'Imóvel', x: 300, y: 90 }, { id: 'a', t: 'a', l: 'tipo', x: 300, y: 30 }], edges: [['I', 'a']] });
  const dImov2 = dGen('t', 'Imóvel', 'Casa', 'Apartamento', [{ id: 'x', t: 'a', l: 'tamanho_lote', x: 170, y: 240, of: 'A' }, { id: 'y', t: 'a', l: 'prédio', x: 430, y: 240, of: 'B' }]);
  const dTotal = dGen('t', 'Cliente', 'Pessoa física', 'Pessoa jurídica', [{ id: 'x1', t: 'a', l: 'código', k: 1, x: 190, y: 40, of: 'S' }, { id: 'x2', t: 'a', l: 'nome', x: 410, y: 40, of: 'S' }, { id: 'x3', t: 'a', l: 'rg', x: 120, y: 245, of: 'A' }, { id: 'x4', t: 'a', l: 'sexo', x: 210, y: 245, of: 'A' }, { id: 'x5', t: 'a', l: 'cnpj', x: 430, y: 245, of: 'B' }]);
  const dParcial = dGen('p', 'Funcionário', 'Secretária', 'Motorista', []);

  MODULES.push({
    id: 'a3', acc: 'mint', short: 'Modelo entidade-relacionamento',
    title: 'Modelagem conceitual: modelo entidade-relacionamento',
    blurb: 'Entidades, atributos, relacionamentos e cardinalidades, mais os casos especiais que sempre aparecem em prova: auto-relacionamento, ternário, generalização, entidade fraca e agregação.',
    topics: [
      { g: 'Modelagem conceitual', t: 'Modelos semânticos e objetivos da modelagem conceitual', h:
        `<p>Modelos semânticos são modelos conceituais com maior capacidade de representar um problema, pois têm conceitos elaborados e formalizados. Surgiram para dar sentido (semântica) à descrição de um BD. Exemplos: o modelo entidade-relacionamento e o diagrama de classes da UML.</p><h4>Objetivos da modelagem conceitual</h4>` +
        ul(['Representar um domínio observado e descrever o significado e o relacionamento dos dados.', 'Servir de instrumento de comunicação entre equipe, usuário e cliente.', 'Capturar aspectos de relacionamento entre os objetos observados.', 'Servir de referência para criar as estruturas de dados.', 'Estabelecer conceitos únicos a partir de diferentes visões.', 'Favorecer a verificação e a validação.']) },
      { t: 'O modelo entidade-relacionamento (Peter Chen, 1976)', h:
        `<p>Proposto por Peter Chen em 1976 (<i>The Entity Relationship Model: Towards the Unified View of Data</i>), é o modelo mais pesquisado e usado em bases de dados. Baseia-se na teoria relacional (Codd, 1970), é simples e de fácil compreensão e foi feito para facilitar o projeto de BD, com a representação lógica da estrutura de forma simplificada. O resultado gráfico é o <b>DER</b> (diagrama entidade-relacionamento).</p>` +
        `<p>No modelo E-R, os dados são descritos como <b>entidades, atributos e relacionamentos</b>.</p>` +
        bin('Cliente', 'Pedido', 'realiza', '(1,1)', '(0,N)', { aA: ['*cpf', 'nome'], aB: ['*número', 'data'] }) +
        boxes([['Retângulo', 'Entidade'], ['Losango', 'Relacionamento'], ['Elipse', 'Atributo (sublinhado se é identificador)']], 'grid3') },
      { g: 'Entidades e atributos', t: 'Entidade e instância', h:
        `<p><b>Entidade</b> é qualquer coisa do mundo real sobre a qual queremos guardar informações. Pode ser concreta (cliente, livro) ou abstrata (empréstimo, conta) e possui uma identificação única.</p><p><b>Instância</b> é uma ocorrência da entidade. No BD relacional, a entidade é uma tabela e cada linha é uma instância.</p>` +
        T(['Nome', 'Email', 'Telefone'], [['Ana Souza', 'ana@exemplo.com', '0000-2233'], ['Carlos Lima', 'carlos@exemplo.com', '0302-2220']], { cap: 'Entidade Professor (colunas = atributos, linhas = instâncias)' }) },
      { t: 'Atributos e domínio', h:
        `<p><b>Atributos</b> são o conjunto de características (propriedades) que representa uma entidade: as informações relevantes para o sistema. Um atributo é um dado associado a cada ocorrência de uma entidade <i>ou de um relacionamento</i>. Cada atributo tem um <b>domínio</b>: o conjunto de valores permitidos.</p>` + dAtrib +
        `<p style="color:var(--muted);font-size:.92rem">No diagrama: <b>cpf</b> sublinhado é identificador; <b>idade</b> tracejado é derivado; <b>telefone</b> com elipse dupla é multivalorado; <b>endereço</b> é composto por rua, bairro e cidade.</p>` +
        boxes([['Domínio: idade', 'números menores de 130'], ['Domínio: preço', 'números reais positivos'], ['Domínio: altura', 'reais positivos menores que 2,5']], 'grid3') },
      { t: 'Os quatro pares de atributos', h:
        boxes([['Simples x composto', 'Simples é indivisível (nome do cliente, preço). Composto se divide em partes com significado próprio: endereço = rua, bairro, cidade, estado. Seu valor é a junção das partes.'], ['Monovalorado x multivalorado', 'Monovalorado tem um único valor (cpf, identidade). Multivalorado pode ter um conjunto de valores (telefone).'], ['Armazenado x derivado', 'Armazenado não depende de outros (data de nascimento, salário, altura e peso). Derivado é calculado a partir de outros: idade, faixa salarial, IMC.'], ['Identificador (chave)', 'Identifica a entidade unicamente. Costuma ter valores distintos em cada ocorrência: identidade, cpf, código.']]) +
        tip('“Idade” a partir da data de nascimento é o exemplo clássico de atributo derivado. “Telefone” é o clássico de multivalorado.') },
      { g: 'Relacionamentos', t: 'Relacionamento', h:
        `<p>Relacionamento é uma <b>associação entre duas ou mais entidades</b>, representada por um losango. Cada instância do relacionamento é a associação de instâncias das entidades. Ex.: o professor Fulano leciona a disciplina Banco de Dados.</p>` +
        ul(['Venda <b>possui</b> Produtos', 'Piloto <b>pilota</b> Avião', 'Funcionário <b>pertence</b> a Departamento', 'Professor <b>coordena</b> Curso', 'Autor <b>escreve</b> Obra', 'Diretor <b>dirige</b> Filme', 'Editora <b>publica</b> Livro']) },
      { t: 'Cardinalidade máxima: 1:1, 1:N e N:N', h:
        `<p>Dado o relacionamento R entre A e B: com quantos elementos de B se relaciona cada elemento de A, e vice-versa? A cardinalidade é o número de ocorrências de uma entidade que podem estar associadas a uma ocorrência da outra.</p>` +
        `<h4>1:1</h4><p>Um funcionário só gerencia um departamento; um departamento só é gerenciado por um funcionário.</p>` + bin('Funcionário', 'Departamento', 'gerencia', '(1,1)', '(1,1)') +
        `<h4>1:N</h4><p>Uma empresa possui uma ou mais filiais; cada filial é de apenas uma empresa.</p>` + bin('Empresa', 'Filial', 'possui', '(1,1)', '(1,N)') +
        `<h4>N:N</h4><p>Uma nota fiscal tem um ou mais produtos; um produto está em uma ou mais notas fiscais.</p>` + bin('Nota fiscal', 'Produto', 'contém', '(1,N)', '(1,N)') +
        T(['NOTA FISCAL', 'Produtos'], [['001', 'caderno, lapiseira'], ['002', 'lapiseira'], ['003', 'lapiseira, marca-texto']], { cap: 'Exemplo N:N' }) },
      { t: 'Relacionamento N:N com atributo', h:
        `<p>Um atributo só pode ser determinado a partir da associação entre duas entidades quando pertence ao relacionamento. <b>Se o atributo existe antes de qualquer associação, ele pertence à entidade.</b></p>` +
        bin('DVD', 'Cliente', 'loca', '(0,N)', '(0,N)', { aR: ['data_locação'] }) +
        T(['Atributo', 'Pertence a', 'Dono'], [['nome, cpf, endereço, telefone', 'entidade', 'Cliente'], ['título, duração, diretor', 'entidade', 'DVD'], ['data_locação, data_devolução', 'relacionamento', 'loca']], { hl: [2] }) +
        note('Outro exemplo: aluno participa de curso. Atributos de “participa”: data de inscrição, quantidade de faltas e média final.') },
      { t: 'Cardinalidade mínima: opcional x obrigatória', h:
        `<p>A cardinalidade <b>máxima</b> indica quantas ocorrências (1 ou N) podem se associar. A <b>mínima</b> diz se a participação é obrigatória (1) ou opcional (0). Pares possíveis: (0,1), (1,1), (0,N) e (1,N). O par fica <b>ao lado de uma entidade</b> e diz com quantas ocorrências <i>dela</i> cada ocorrência da outra entidade se relaciona.</p>` +
        `<h4>Opcionalidade</h4><p>Um livro é escrito por pelo menos uma pessoa, podendo ser por várias. Uma pessoa escreve nenhum livro ou vários.</p>` + bin('Pessoa', 'Livro', 'autoria', '(1,N)', '(0,N)') +
        `<h4>Obrigatoriedade</h4><p>Um aluno deve estudar em apenas uma escola. Uma escola deve ter ao menos um aluno.</p>` + bin('Escola', 'Aluno', 'estuda', '(1,1)', '(1,N)') +
        tip('Leia o par ao lado de uma entidade perguntando “cada ocorrência da outra entidade se liga a quantas ocorrências desta?”. O (1,1) ao lado de Escola diz que cada aluno estuda em exatamente 1 escola; o (1,N) ao lado de Aluno diz que cada escola tem ao menos 1 aluno.') },
      { g: 'Relacionamentos especiais', t: 'Auto-relacionamento', h:
        `<p>Os participantes do relacionamento são da <b>mesma entidade</b> (relacionamento recursivo). É preciso reconhecer os <b>papéis</b> diferentes que as ocorrências assumem.</p>` +
        dAuto('', '', '(1,1)', '(0,N)', 'é gerente', 'são gerenciados') +
        `<p>Um funcionário gerencia 0 ou vários funcionários (papel gerente); cada funcionário é gerenciado por 1 e apenas 1 funcionário (papel gerenciado). Em cada linha de papel, o par diz quantas ocorrências daquele papel se ligam a uma ocorrência do outro: o (1,1) em “é gerente” indica que cada funcionário tem exatamente 1 gerente.</p>` +
        dAuto('', '', '(0,N)', '(0,N)', 'componente', 'composto', 'compõe') +
        `<p>Outro exemplo: em uma indústria, um produto é composto de vários outros produtos (componentes); um componente pode participar da composição de muitos produtos.</p>` },
      { t: 'Relacionamento ternário', h:
        `<p>Só se usa quando há, <b>de fato</b>, participação de todas as ocorrências das três entidades no mesmo evento. Um ternário <b>não pode ser transformado em binário</b>. Poucas vezes é necessário e exige muita análise.</p>` + dTern1 +
        `<p>Outro exemplo: um cliente pode ter diversas contas, cada uma em uma agência específica; uma conta pode pertencer a diferentes clientes.</p>` + dTern2 },
      { t: 'Generalização e especialização', h:
        `<p>Representam objetos do mundo real com os mesmos atributos que podem ser organizados em hierarquia. Uma entidade pode ter subgrupos significativos. Há <b>herança de atributos</b>: a entidade especializada tem seus atributos mais os da genérica.</p>` +
        `<p><b>Especialização:</b> as subclasses são formadas por características que as distinguem. <b>Generalização:</b> as diferenças são suprimidas e as características comuns formam uma superclasse.</p>` +
        `<h4>Total (t)</h4><p>Toda ocorrência da entidade genérica tem ocorrência em uma das especializadas. Todo cliente é pessoa física ou jurídica.</p>` + dTotal +
        `<h4>Parcial (p)</h4><p>Nem toda ocorrência da genérica está em uma especializada. Nem todo funcionário é motorista ou secretária.</p>` + dParcial },
      { t: 'Entidade fraca', h:
        `<p>Depende de outra entidade para existir e não tem atributos suficientes para se identificar. A chave primária é a junção da chave da entidade dominante (identificadora) mais um <b>discriminador</b>.</p>` + dFraca +
        `<p>Dependente é a entidade fraca; Empregado é a identificadora. Outro exemplo: Operação em relação a Conta Corrente.</p>` },
      { t: 'Entidade associativa (agregação)', h:
        `<p>No modelo E-R <b>não se pode associar dois relacionamentos</b>: relacionamento é associação entre entidades. A <b>entidade associativa</b> (ou agregação) trata um relacionamento como se fosse uma entidade, permitindo que ele se associe a outra.</p>` +
        trap('Ligar “Consulta” diretamente a “Receita” sem agregar é o erro clássico: seria relação entre dois relacionamentos.', 'Erro comum') + dAgg },
      { g: 'Boas práticas de modelagem', t: 'Atributo ou entidade? O caso da cor', h:
        `<p>“Cor” pode ser um atributo de Carro ou uma entidade relacionada a Carro.</p>` + dCor2 + dCor1 +
        `<p>Regra prática: se cor só tem um valor descritivo e nada mais, atributo. Se for ter atributos próprios (código, código RGB) ou se relacionar com outras entidades, entidade.</p>` },
      { t: 'Atributo ou especialização? O caso do imóvel', h:
        `<p>“Tipo” pode ser um atributo de Imóvel ou virar uma especialização (Casa e Apartamento).</p>` + dImov1 + dImov2 +
        `<p>Se os tipos têm atributos ou relacionamentos diferentes (tamanho do lote na casa, prédio no apartamento), a especialização compensa. Se são iguais em tudo, basta o atributo.</p>` },
      { t: 'Outros modelos e notações', h:
        `<p>Não existe apenas o modelo E-R: vários foram propostos, com variações na representação gráfica, na sintaxe e na semântica.</p>` +
        ul(['Notação da engenharia da informação (James Martin)', 'MERISE (notação europeia)', 'Modelo proposto por Peter Chen', 'UML (diagrama de classes)']) +
        `<p>Nas notações de “pé de galinha”, os símbolos da ponta da linha indicam: um ou mais, zero ou mais, zero ou um, um e apenas um. Ferramenta usada na prática: <b>brModelo</b>.</p>` },
    ],
    examples: [
      { t: 'Marque as entidades', d: 'Toque nas palavras que representam entidades do texto e depois confira.', mount(el) {
        const txt = 'Uma loja possui vários produtos. Vários vendedores trabalham na loja realizando vendas para diversos clientes.';
        const ent = ['loja', 'produtos', 'vendedores', 'clientes'];
        const toks = txt.split(/(\s+)/);
        el.innerHTML = `<div class="words">${toks.map((t) => /^\s+$/.test(t) ? t : `<button class="w" data-w="${t.replace(/[.,]/g, '').toLowerCase()}">${t}</button>`).join('')}</div><div class="ctrl"><button class="btn" id="ck">Conferir</button><button class="smallbtn" id="rs">Limpar</button></div><div id="o"></div>`;
        $$('.w', el).forEach((b) => b.onclick = () => { const on = !b.classList.contains('on'); $$('.w[data-w="' + b.dataset.w + '"]', el).forEach((x) => x.classList.toggle('on', on)); });
        $('#rs', el).onclick = () => { $$('.w', el).forEach((b) => b.className = 'w'); $('#o', el).innerHTML = ''; };
        $('#ck', el).onclick = () => {
          const okS = new Set(), wrS = new Set(), miS = new Set(); let ok = 0, wrong = 0, miss = 0;
          $$('.w', el).forEach((b) => { const isE = ent.includes(b.dataset.w), on = b.classList.contains('on'); b.className = 'w'; if (isE && on) { b.classList.add('right'); okS.add(b.dataset.w); } else if (isE) { b.classList.add('miss'); miS.add(b.dataset.w); } else if (on) { b.classList.add('wrong'); wrS.add(b.dataset.w); } }); ok = okS.size; miss = miS.size; wrong = wrS.size;
          $('#o', el).innerHTML = `<div class="banner ${ok === 4 && !wrong ? 'ok' : 'bad'}">${ok} de 4 entidades marcadas${wrong ? `, ${wrong} marcação(ões) a mais` : ''}${miss ? `, ${miss} faltando (em vermelho)` : ''}.</div><p style="color:var(--muted);font-size:.92rem">Entidades: loja, produto, vendedor e cliente. “Vendas” é o evento que liga vendedor, cliente e produto: aparece como relacionamento (ou entidade associativa), não como uma quinta entidade simples.</p>`;
        };
      } },
      { t: 'Leitor de cardinalidade', d: 'Escolha o par (mínimo, máximo) de cada lado e veja a frase que ele significa.', mount(el) {
        const P = [['Aluno', 'Alunos', 'Escola', 'Escolas', 'estuda em', 'tem'], ['Pessoa', 'Pessoas', 'Livro', 'Livros', 'escreve', 'é escrito por'], ['Funcionário', 'Funcionários', 'Departamento', 'Departamentos', 'trabalha em', 'tem'], ['Empresa', 'Empresas', 'Filial', 'Filiais', 'possui', 'pertence a']];
        const sel = (id, mn, mx) => `<select id="${id}"><option value="0" ${mn === '0' ? 'selected' : ''}>0</option><option value="1" ${mn === '1' ? 'selected' : ''}>1</option></select> , <select id="${id}x"><option value="1" ${mx === '1' ? 'selected' : ''}>1</option><option value="N" ${mx === 'N' ? 'selected' : ''}>N</option></select>`;
        el.innerHTML = `<div class="ctrl"><label>Situação: <select id="pr">${P.map((p, i) => `<option value="${i}">${p[0]} e ${p[2]}</option>`).join('')}</select></label></div>
          <div class="grid2"><div class="box"><b class="h" id="ha"></b><div class="ctrl">( ${sel('mA', '1', 'N')} )</div></div><div class="box"><b class="h" id="hb"></b><div class="ctrl">( ${sel('mB', '1', '1')} )</div></div></div><div class="rel-out" id="out"></div><div id="dg"></div>`;
        const ph = (mn, mx, sg, pl) => (mx === '1' ? (mn === '0' ? `0 ou 1 ${sg}` : `exatamente 1 ${sg}`) : (mn === '0' ? `0 ou mais ${pl}` : `1 ou mais ${pl}`));
                const upd = () => {
          const p = P[+$('#pr', el).value], a0 = $('#mA', el).value, a1 = $('#mAx', el).value, b0 = $('#mB', el).value, b1 = $('#mBx', el).value;
          $('#ha', el).textContent = `Par ao lado de ${p[0]}`; $('#hb', el).textContent = `Par ao lado de ${p[2]}`;
          const tipo = a1 === '1' && b1 === '1' ? '1:1' : a1 === 'N' && b1 === 'N' ? 'N:N' : '1:N';
          const lado1 = tipo === '1:N' ? (a1 === 'N' ? p[2] : p[0]) : null;
          $('#out', el).innerHTML = `<p>O par ao lado de <b>${p[0]}</b> diz: cada <b>${p[2].toLowerCase()}</b> ${p[5]} <b>${ph(a0, a1, p[0].toLowerCase(), p[1].toLowerCase())}</b>.</p><p>O par ao lado de <b>${p[2]}</b> diz: cada <b>${p[0].toLowerCase()}</b> ${p[4]} <b>${ph(b0, b1, p[2].toLowerCase(), p[3].toLowerCase())}</b>.</p><p>Participação de ${p[0]}: <b>${b0 === '1' ? 'obrigatória' : 'opcional'}</b>. Participação de ${p[2]}: <b>${a0 === '1' ? 'obrigatória' : 'opcional'}</b>. Tipo: <b>${tipo}</b>${lado1 ? ` (lado 1: ${lado1})` : ''}.</p>`;
          $('#dg', el).innerHTML = bin(p[0], p[2], p[4].split(' ')[0], `(${a0},${a1})`, `(${b0},${b1})`);
        };
        $$('select', el).forEach((s) => s.onchange = upd); upd();
      } },
      { t: 'Casos resolvidos', d: 'Enunciados curtos, o raciocínio e o diagrama correspondente.', mount(el) {
        const C = [
          ['Indústria: produto composto de produtos', 'Em uma indústria, um produto é composto de vários outros produtos (componentes); um produto componente pode participar da composição de muitos produtos.', ['Só existe uma entidade: Produto.', 'O produto se relaciona com ele mesmo: auto-relacionamento, com papéis composto e componente.', 'Um composto tem vários componentes e um componente entra em vários compostos: N:N, ambos (0,N).'], dAuto('', '', '(0,N)', '(0,N)', 'componente', 'composto', 'compõe')],
          ['Banco: cliente, conta e agência', 'Um cliente pode possuir diversas contas, cada uma localizada em uma agência específica do banco; uma conta pode pertencer a diferentes clientes.', ['Três entidades participam do mesmo fato: cliente + conta + agência.', 'Não dá para quebrar em binários sem perder a informação de qual conta de qual cliente está em qual agência.', 'Cada par cliente-conta fica em exatamente uma agência: (1,1) do lado de Agência.'], dTern2],
          ['Escola e aluno', 'Um aluno deve obrigatoriamente estudar em apenas uma escola. Uma escola deve ter ao menos um aluno.', ['Cada aluno estuda em exatamente uma escola → (1,1), escrito ao lado de Escola.', 'Cada escola tem pelo menos um aluno, podendo ter vários → (1,N), escrito ao lado de Aluno.', 'É um relacionamento 1:N com Escola do lado 1.'], bin('Escola', 'Aluno', 'estuda', '(1,1)', '(1,N)')],
          ['Livro e autoria', 'Um livro é escrito por pelo menos uma pessoa, podendo ser por várias. Uma pessoa escreve nenhum livro ou vários.', ['Cada livro tem pelo menos uma pessoa como autora → (1,N), escrito ao lado de Pessoa.', 'Cada pessoa escreve nenhum livro ou vários → (0,N), escrito ao lado de Livro.', 'N:N, com participação opcional para Pessoa.'], bin('Pessoa', 'Livro', 'autoria', '(1,N)', '(0,N)')],
          ['Médico, paciente, consulta e receita', 'Cada consulta pode gerar uma receita.', ['Consulta é uma associação entre Médico e Paciente.', 'Um relacionamento não se liga a outro relacionamento: usa-se agregação.', 'A agregação Consulta se relaciona com a entidade Receita.'], dAgg],
        ];
        el.innerHTML = `<div class="ctrl"><label>Caso: <select id="cs">${C.map((c, i) => `<option value="${i}">${c[0]}</option>`).join('')}</select></label></div><div id="cb"></div>`;
        const upd = () => { const c = C[+$('#cs', el).value]; $('#cb', el).innerHTML = `<div class="box"><p><b>Enunciado:</b> ${c[1]}</p></div><h4 style="margin:12px 0 4px;font-family:var(--hf)">Como raciocinar</h4>${ol(c[2])}${c[3]}`; };
        $('#cs', el).onchange = upd; upd();
      } },
    ],
    activities: [
      { t: 'Que tipo de atributo é este?', d: 'Classifique cada atributo.', kind: 'classify',
        cfg: { choices: ['Simples', 'Composto', 'Multivalorado', 'Derivado', 'Identificador'], items: [
          { t: 'Nome do cliente', a: 0, why: 'Não se divide em partes com significado próprio.' },
          { t: 'Endereço (rua, bairro, cidade, estado)', a: 1, why: 'Pode ser dividido em subpartes menores.' },
          { t: 'Telefone (pessoa com vários números)', a: 2, why: 'Pode existir um conjunto de valores.' },
          { t: 'Idade, calculada da data de nascimento', a: 3, why: 'Depende de outro atributo (data de nascimento).' },
          { t: 'CPF', a: 4, why: 'Identifica a pessoa unicamente.' },
          { t: 'IMC', a: 3, why: 'Calculado a partir de altura e peso.' },
          { t: 'Preço de um produto', a: 0, why: 'Atômico e monovalorado.' },
          { t: 'Faixa salarial', a: 3, why: 'Derivada do salário.' },
        ] } },
      { t: 'O atributo pertence à entidade ou ao relacionamento?', d: 'Lembre da regra: se existe antes da associação, é da entidade.', kind: 'classify',
        cfg: { choices: ['Entidade', 'Relacionamento'], items: [
          { t: 'Nome do cliente (DVD × Cliente)', a: 0, why: 'O cliente tem nome mesmo sem locar nada.' },
          { t: 'data_locação', a: 1, why: 'Só existe quando o cliente loca o DVD.' },
          { t: 'Título do DVD', a: 0, why: 'Existe antes de qualquer locação.' },
          { t: 'data_devolução', a: 1, why: 'Depende da locação.' },
          { t: 'Data de inscrição do aluno no curso', a: 1, why: 'Só existe na associação aluno-curso.' },
          { t: 'Média final do aluno no curso', a: 1, why: 'É determinada pela participação do aluno naquele curso.' },
          { t: 'Duração do DVD', a: 0, why: 'Característica do DVD em si.' },
        ] } },
      { t: 'Qual é a cardinalidade?', d: 'Cada frase diz com quantas ocorrências uma entidade se relaciona. Escolha o par (mínimo, máximo) e note ao lado de qual entidade ele fica no diagrama.', kind: 'classify',
        cfg: { choices: ['(0,1)', '(1,1)', '(0,N)', '(1,N)'], items: [
          { t: 'Um aluno deve estudar em apenas uma escola (par ao lado de Escola).', a: 1, why: 'Obrigatório e único: cada aluno se liga a exatamente 1 escola.' },
          { t: 'Uma escola deve ter ao menos um aluno (par ao lado de Aluno).', a: 3, why: 'Obrigatório, podendo ser vários: cada escola se liga a 1 ou mais alunos.' },
          { t: 'Uma pessoa escreve nenhum livro ou vários (par ao lado de Livro).', a: 2, why: 'Opcional, podendo ser vários.' },
          { t: 'Um livro é escrito por pelo menos uma pessoa (par ao lado de Pessoa).', a: 3, why: 'Obrigatório, podendo ser várias.' },
          { t: 'Um funcionário gerencia 0 ou vários funcionários (papel gerente).', a: 2, why: 'Opcional, vários.' },
          { t: 'Cada funcionário é gerenciado por 1 e apenas 1 funcionário (papel gerenciado).', a: 1, why: 'Obrigatório e único.' },
        ] } },
      { t: 'Perguntas para fixar', d: 'Responda de cabeça e confira.', kind: 'qa', items: [
        ['Um ternário pode ser trocado por relacionamentos binários?', '<p>Não. Se todas as ocorrências das três entidades participam simultaneamente do mesmo evento, decompor em binários perde informação.</p>'],
        ['Qual a diferença entre generalização e especialização?', '<p>Especialização parte da entidade genérica e cria subclasses por características que as distinguem. Generalização parte das subclasses, suprime as diferenças e cria a superclasse com o que é comum. O resultado no diagrama é o mesmo.</p>'],
        ['Quando usar entidade fraca?', '<p>Quando a entidade depende de outra para existir e não possui atributos suficientes para se identificar (ex.: Dependente de Empregado). Sua chave é a da forte mais um discriminador.</p>'],
        ['Como ligar Consulta a Receita se um relacionamento não liga a outro?', '<p>Agregando: a Consulta (relacionamento entre Médico e Paciente) passa a ser tratada como uma entidade associativa, que então se relaciona com Receita.</p>'],
        ['Diferença entre atributo derivado e armazenado?', '<p>Armazenado tem valor próprio (data de nascimento). Derivado é calculado de outros (idade = data atual − data de nascimento).</p>'],
        ['Total ou parcial: “nem todo funcionário é motorista ou secretária”?', '<p>Parcial: existem funcionários que não estão em nenhuma das especializadas.</p>'],
      ] },
    ],
    challenges: [
      { stem: 'Em uma entidade Aluno, o sistema precisa apresentar a idade do aluno, mas não deseja armazená-la, pois ela muda com o tempo. Para isso, é guardada a data de nascimento e a idade é calculada a partir da data atual. Como a idade deve ser classificada no modelo E-R?',
        opts: ['Atributo identificador.', 'Atributo multivalorado.', 'Atributo composto.', 'Atributo derivado.', 'Atributo do relacionamento.'], c: 3,
        e: '<p>Atributo derivado é o que depende de outros atributos (idade depende da data de nascimento e da data atual).</p>',
        w: ['Identificador distingue ocorrências; idade se repete.', 'Multivalorado teria conjunto de valores.', 'Composto se divide em partes, o que não ocorre com idade.'] },
      { stem: 'Ao modelar a entidade Cliente, o analista percebe que cada cliente pode ter vários números de telefone. Como esse atributo deve ser representado?',
        opts: ['Como atributo simples.', 'Como atributo multivalorado.', 'Como atributo derivado.', 'Como entidade fraca obrigatoriamente.', 'Como generalização total.'], c: 1,
        e: '<p>Quando pode existir um conjunto de valores para o atributo, ele é multivalorado.</p>',
        w: ['Simples e monovalorado teria um só valor.', 'Derivado é calculado de outro atributo.', 'Entidade fraca e generalização tratam de dependência e hierarquia.'] },
      { stem: 'Considere: “Um livro é escrito por pelo menos uma pessoa, podendo ser escrito por várias. Uma pessoa pode não escrever nenhum livro ou escrever vários.” Quais pares de cardinalidade ficam desenhados ao lado de Livro e ao lado de Pessoa, respectivamente, no relacionamento autoria?',
        opts: ['Livro (1,1) e Pessoa (0,1).', 'Livro (1,N) e Pessoa (0,N).', 'Livro (0,N) e Pessoa (1,N).', 'Livro (1,1) e Pessoa (1,N).', 'Livro (0,1) e Pessoa (0,N).'], c: 2,
        e: '<p>O par ao lado de Pessoa diz quantas pessoas escrevem cada livro: pelo menos uma, podendo ser várias → (1,N). O par ao lado de Livro diz quantos livros cada pessoa escreve: nenhum ou vários → (0,N).</p>',
        w: ['A alternativa B inverte os lados: coloca o (1,N) ao lado de Livro.', 'As demais trocam mínimos ou limitam o máximo a 1, contrariando o enunciado.'] },
      { stem: 'Em um modelo, afirma-se que “nem todo funcionário é motorista ou secretária; pode haver funcionários que não sejam nenhum dos dois”. Essa afirmação descreve qual tipo de generalização/especialização?',
        opts: ['Total.', 'Parcial.', 'Ternária.', 'Recursiva.', 'Associativa.'], c: 1,
        e: '<p>Na especialização parcial, nem toda ocorrência da entidade genérica tem uma ocorrência correspondente em uma especializada.</p>',
        w: ['Total exigiria que todo funcionário fosse motorista ou secretária.', 'Ternária, recursiva e associativa são outros conceitos.'] },
      { stem: 'Em um sistema de cursos, deseja-se registrar a data de inscrição de cada aluno em cada curso. Alunos podem se inscrever em vários cursos e cursos têm vários alunos. Onde deve ficar o atributo data de inscrição?',
        opts: ['Na entidade Aluno.', 'Na entidade Curso.', 'No relacionamento entre Aluno e Curso.', 'Como atributo identificador de Aluno.', 'Em uma generalização de Aluno.'], c: 2,
        e: '<p>A data só é conhecida a partir da associação entre um aluno e um curso; portanto, é atributo do relacionamento N:N.</p>',
        w: ['Em Aluno ou Curso, a data teria valor único, mas há uma data por par aluno-curso.'] },
      { stem: 'Em um hospital, médicos e pacientes se associam por meio de consultas. Cada consulta, isto é, cada ocorrência dessa associação, pode gerar uma receita. Como o modelo E-R não permite associar um relacionamento diretamente a outro relacionamento, qual recurso deve ser utilizado?',
        opts: ['Atributo multivalorado na entidade Paciente.', 'Entidade associativa (agregação) sobre o relacionamento Consulta.', 'Generalização total entre Médico e Paciente.', 'Entidade fraca de Paciente identificada só pelo discriminador.', 'Auto-relacionamento na entidade Médico.'], c: 1,
        e: '<p>A agregação trata o relacionamento Consulta como uma entidade, que então pode se relacionar com Receita.</p>',
        w: ['Multivalorado não cria relação com Receita.', 'Generalização organiza tipos de uma mesma entidade.', 'Entidade fraca exige uma entidade forte cuja chave complete a sua.', 'Auto-relacionamento liga a entidade a ela mesma.'] },
      { stem: 'Sobre relacionamentos ternários no modelo E-R, assinale a alternativa correta.',
        opts: ['Sempre podem ser substituídos por três relacionamentos binários sem perda de informação.', 'São indicados quando todas as ocorrências das três entidades participam simultaneamente do mesmo evento.', 'Ligam apenas entidades fracas.', 'Não admitem cardinalidades.', 'Só existem em modelos lógicos, nunca no conceitual.'], c: 1,
        e: '<p>O ternário só se justifica quando há participação simultânea das três entidades; e não pode ser convertido em binário sem perder informação.</p>',
        w: ['A está errada por definição.', 'C, D e E não correspondem ao conceito.'] },
      { stem: 'Uma entidade Dependente não possui atributos suficientes para se identificar sozinha. Sua identificação depende do Empregado a que está ligada, combinada com um atributo local (por exemplo, o nome). Que tipo de entidade é Dependente?',
        opts: ['Entidade associativa.', 'Entidade forte.', 'Entidade fraca.', 'Superclasse de uma generalização.', 'Relacionamento ternário.'], c: 2,
        e: '<p>Entidade fraca depende de outra para existir; sua chave é a da entidade identificadora mais um discriminador.</p>',
        w: ['Associativa é um relacionamento tratado como entidade.', 'Forte se identifica sozinha.'] },
    ],
  });
})();
