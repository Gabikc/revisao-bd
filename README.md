# Banco de Dados · Revisão por aula

Site de revisão de Banco de Dados com um módulo por aula. Cada módulo tem **Conteúdo**, **Exemplos práticos**, **Atividades** e **Desafios** (questões autorais de múltipla escolha).

## Estrutura

```
index.html          página única do site
css/style.css       estilos (tema claro e escuro)
js/lib.js           diagramas E-R, quizzes e widgets
js/app.js           navegação, busca e telas
js/main.js          inicia o site
js/gifs.js          caminhos das animações
js/modulos/         conteúdo de cada aula
  m1.js             Módulo 1  · Apresentação
  m2.js             Módulo 2  · Introdução a BD e SGBD
  m3.js             Módulo 3  · Modelo entidade-relacionamento
  m4.js             Módulo 4  · Prática E-R (Biblioteca)
  m5p.js            Módulo 5  · Prática E-R (Locadora e Hospital)
  m5l.js            Módulo 6  · Modelo lógico e mapeamento
  mfn.js            Módulo 7  · Normalização
  m9.js             Módulo 8  · Modelo físico e DDL
  m10.js            Módulo 9  · DML
  m11.js            Módulo 10 · DQL (consultas)
  m13.js            Módulo 11 · Subconsultas e funções
  m14.js            Módulo 12 · Joins externos e operações com conjuntos
  m15.js            Módulo 13 · SQL avançada (views, procedures, functions, triggers)
assets/gifs/        animações
```

## Como editar

- **Texto, tópicos, atividades e questões:** edite o arquivo da aula em `js/modulos/`.
  Cada módulo tem as listas `topics`, `examples`, `activities` e `challenges`.
- **Novo módulo:** crie um arquivo em `js/modulos/`, use `MODULES.push({...})` como nos existentes (campo `grp` define a seção da lista) e adicione o `<script>` no `index.html`, antes de `js/app.js`.
- **Nova questão:** acrescente um item em `challenges` com `stem` (enunciado), `opts` (alternativas),
  `c` (índice da correta, começando em 0), `e` (explicação) e `w` (comentário sobre as erradas, opcional).
- **Cores e fontes:** `css/style.css`, no início do arquivo.

## Publicar no GitHub Pages

1. Envie todos os arquivos para a raiz de um repositório público.
2. Em **Settings → Pages**, escolha **Deploy from a branch**, branch `main`, pasta `/ (root)`.
3. O site fica em `https://SEU-USUARIO.github.io/NOME-DO-REPOSITORIO/`.

## Observações

- O progresso dos desafios fica salvo no navegador de cada aluno (localStorage).
- Testar localmente: na pasta do projeto, `python3 -m http.server 8000` e abrir http://localhost:8000.
