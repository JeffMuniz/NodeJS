--changeset author:ajuste-financeiro
--liquibase formatted sql

CREATE TABLE status
(
    id               INTEGER   NOT NULL,
    nome             VARCHAR   NOT NULL,
    descricao        VARCHAR   NOT NULL,
    data_criacao     TIMESTAMP NOT NULL,
    data_modificacao TIMESTAMP NOT NULL,
    PRIMARY KEY (id)
);


CREATE TABLE tipo (
  id INTEGER   NOT NULL ,
  nome VARCHAR   NOT NULL ,
  descricao VARCHAR   NOT NULL ,
  ativo BOOLEAN NOT NULL DEFAULT false,
  data_criacao TIMESTAMP   NOT NULL ,
  data_modificacao TIMESTAMP   NOT NULL   ,
PRIMARY KEY(id));


CREATE TABLE cliente (
  id SERIAL  NOT NULL ,
  nome VARCHAR   NOT NULL ,
  cpf VARCHAR    ,
  cnpj VARCHAR    ,
  id_conta INTEGER    ,
  data_criacao TIMESTAMP   NOT NULL ,
  data_modificacao TIMESTAMP   NOT NULL   ,
PRIMARY KEY(id));


CREATE TABLE ajuste_financeiro (
  id SERIAL  NOT NULL ,
  id_tipo INTEGER   NOT NULL ,
  id_cliente INTEGER   NOT NULL ,
  id_status INTEGER   NOT NULL   ,
  login_usuario VARCHAR   NOT NULL ,
  nome_usuario VARCHAR   NOT NULL ,
  id_solicitacao INTEGER   NOT NULL ,
  operacao INTEGER   NOT NULL ,
  chave_documento VARCHAR    ,
  codigo_transacao INTEGER    ,
  observacao VARCHAR    ,
  valor DECIMAL   NOT NULL ,
  data_vencimento TIMESTAMP    ,
  data_finalizacao TIMESTAMP    ,
  data_criacao TIMESTAMP   NOT NULL ,
  data_modificacao TIMESTAMP   NOT NULL   ,

PRIMARY KEY(id)      ,
  FOREIGN KEY(id_tipo)
    REFERENCES tipo(id),
  FOREIGN KEY(id_cliente)
    REFERENCES cliente(id),
  FOREIGN KEY(id_status)
    REFERENCES status (id),
  CONSTRAINT valid_operacao_check CHECK (operacao = ANY (ARRAY[1, 2]))
);


CREATE INDEX ajuste_fk_tipo ON ajuste_financeiro (id_tipo);
CREATE INDEX ajuste_fk_cliente ON ajuste_financeiro (id_cliente);
CREATE INDEX ajuste_fk_status ON ajuste_financeiro (id_status);

