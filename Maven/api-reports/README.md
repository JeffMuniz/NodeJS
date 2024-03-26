# mac-api-reports

## Commits Guideline

Nós possuímos regras e padrões sobre como as nossas mensagens de commit devem ser formatadas. Isso nós oferece uma melhor experiência na hora de acompaharmos o history do projeto.

Utilizamos o padrão de [conventional commits](https://www.conventionalcommits.org/), logo todos os commits neste repositório deverão seguir essa convenção.

### Formato do Commit

Cada mensagem de commit pode conter um **header**. O header possui um formato especial que pode conter um **type**, uma **task** (task ou história do jira) e um **subject**.

```
<type>(<task>): <subject>
```

> ⚠️ O **type** e o **subject** são obrigatórios.

Exemplo:

`docs(POR-1956): change README about CICD`

### Tipos de Commits

| Tipo    | Função                                                                      |
| ------- | --------------------------------------------------------------------------- |
| _feat_  | Uma nova implementação / feature                                            |
| _build_ | Modificações que afetam as ferramentas de build                             |
| _ci_    | Modificações nos arquivos e nos scripts de configuração de CI               |
| _docs_  | Modificações em documentações e afins                                       |
| _fix_   | Correção de um bug                                                          |
| _perf_  | Modificações de código para otimizar performance                            |
| _impr_  | Modificações que não necessariamente é um fix ou nova feature               |
| _style_ | Mudanças que não modifiquem lógica (white-space, formatting, prettier, etc) |
| _test_  | Testes que foram adicionados ou corrigidos                                  |
| _chore_ | Uma modificação geral que não se enquandra em nenhum outro padrão           |

## 1. Instalando Plugins do Editor

Para desenvolver esse projeto, você precisará instalar os seguintes plugins no seu editor.

> ⚠️ No momento todos utilizamos VSCode, caso você use algum editor diferente, inserir aqui o equivalente dos plugins abaixo

| Plugin                 | Obrigatório |
| ---------------------- | ----------- |
| Prettier               | \*          |
| GitLens                |             |
| VS Live Share          |             |
| Bracket Pair Colorizer |             |
