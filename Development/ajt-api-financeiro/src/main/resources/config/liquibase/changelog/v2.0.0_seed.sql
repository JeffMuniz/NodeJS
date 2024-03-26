
CREATE TABLE motivo (
  id INTEGER   NOT NULL ,
  id_tipo INTEGER   NOT NULL ,
  operacao INTEGER   NOT NULL ,
  nome VARCHAR   NOT NULL ,
  descricao VARCHAR   NOT NULL ,
  ativo BOOLEAN NOT NULL DEFAULT false,
  data_criacao TIMESTAMP   NOT NULL ,
  data_modificacao TIMESTAMP   NOT NULL   ,
PRIMARY KEY(id)      ,
  FOREIGN KEY(id_tipo)
    REFERENCES tipo(id)
);

INSERT INTO motivo(id, id_tipo, operacao, nome, descricao, ativo, data_criacao, data_modificacao) VALUES (1, 1, 1, 'Reembolso MDR', 'EC / CRÉDITO - Reembolso MDR', true, now(), now());
INSERT INTO motivo(id, id_tipo, operacao, nome, descricao, ativo, data_criacao, data_modificacao) VALUES (2, 1, 1, 'Pagamento não efetuado', 'EC / CRÉDITO - Pagamento não efetuado', true, now(), now());
INSERT INTO motivo(id, id_tipo, operacao, nome, descricao, ativo, data_criacao, data_modificacao) VALUES (3, 1, 1, 'Reembolso tarifa', 'EC / CRÉDITO - Reembolso tarifa', true, now(), now());
INSERT INTO motivo(id, id_tipo, operacao, nome, descricao, ativo, data_criacao, data_modificacao) VALUES (4, 1, 1, 'Ajuste manual', 'EC / CRÉDITO - Ajuste manual', true, now(), now());
INSERT INTO motivo(id, id_tipo, operacao, nome, descricao, ativo, data_criacao, data_modificacao) VALUES (5, 1, 2, 'Pagamento duplicado', 'EC / DÉBITO - Pagamento duplicado', true, now(), now());
INSERT INTO motivo(id, id_tipo, operacao, nome, descricao, ativo, data_criacao, data_modificacao) VALUES (6, 1, 2, 'Cobraça tarifa', 'EC / DÉBITO - Cobraça tarifa', true, now(), now());
INSERT INTO motivo(id, id_tipo, operacao, nome, descricao, ativo, data_criacao, data_modificacao) VALUES (7, 1, 2, 'Ajuste manual', 'EC / DÉBITO - Ajuste manual', true, now(), now());
INSERT INTO motivo(id, id_tipo, operacao, nome, descricao, ativo, data_criacao, data_modificacao) VALUES (8, 2, 1, 'Carga em duplicidade', 'PORTADOR / CRÉDITO - Carga em duplicidade', true, now(), now());
INSERT INTO motivo(id, id_tipo, operacao, nome, descricao, ativo, data_criacao, data_modificacao) VALUES (9, 2, 2, 'Correção carga indevida', 'PORTADOR / DÉBITO - Correção carga indevida', true, now(), now());
INSERT INTO motivo(id, id_tipo, operacao, nome, descricao, ativo, data_criacao, data_modificacao) VALUES (10, 2, 2, 'Correção carga indevida', 'PORTADOR / DÉBITO - Correção carga indevida', true, now(), now());
INSERT INTO motivo(id, id_tipo, operacao, nome, descricao, ativo, data_criacao, data_modificacao) VALUES (991, 1, 0, 'Motivo EC indefinido', '', false, now(), now());
INSERT INTO motivo(id, id_tipo, operacao, nome, descricao, ativo, data_criacao, data_modificacao) VALUES (992, 2, 0, 'Motivo PORTADOR indefinido', '', false, now(), now());
INSERT INTO motivo(id, id_tipo, operacao, nome, descricao, ativo, data_criacao, data_modificacao) VALUES (993, 3, 0, 'Motivo RH indefinido', '', false, now(), now());


ALTER TABLE cliente
ADD COLUMN descricao_conta VARCHAR;

ALTER TABLE ajuste_financeiro
ADD COLUMN id_motivo INTEGER;

UPDATE ajuste_financeiro SET id_motivo = 991 where id_motivo is null and id_tipo = 1;
UPDATE ajuste_financeiro SET id_motivo = 992 where id_motivo is null and id_tipo = 2;
UPDATE ajuste_financeiro SET id_motivo = 993 where id_motivo is null and id_tipo = 3;

ALTER TABLE ajuste_financeiro
ALTER COLUMN id_motivo SET NOT NULL;

ALTER TABLE ajuste_financeiro
ADD FOREIGN KEY(id_motivo)
    REFERENCES motivo(id);
