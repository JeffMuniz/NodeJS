# Changelog ajt-api-financeiro
Todas as alterações relacionadas a API de ajuste financeiro estão nesse arquivo

Utilizando como base o [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
e o projeto [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [v1.5.0] - 2021-02-24

### Feature
- Retirando mascara de servicos GET (MEE-1201)

## [v1.4.0] - 2020-19-02

### Feature
- Atualização dos nomes dos motivos de ajuste a credito e ajustando formatação dos motivos conforme padrão do sistema
- Adicionando nova versão do liquibase para os ajustes acima.
- Incremento de path midle na versão para novas features de 1.3.0 para 1.4.0
## [v1.3.0] - 2020-10-02

### Feature
- Inclusão de novos motivos de ajuste a debito
- Correção de dependencias duplicadas
- Incremento de path midle na versão para novas features de 1.2.1 para 1.3.0
- Comentário no gitignore em cima de exclusão de todos os arquivos da pasta, isso estava bloqueando novas inclusões de arquivos sql no liquibase

## [v1.2.1] - 2020-07-01

### Feature
- Fluxo de erro ao sensibilizar Conductor

## [v1.2.0] - 2020-06-15

### Feature
- Nova funcionalidade de ajuste RH

## [v1.1.0] - 2020-06-02

### Feature
- Nova funcionalidade de anexar documento ao S3


## [v1.0.0] - 2020-05-29

### Feature
- Fluxo de inclusão e consulta de ajuste financeiro ao EC


