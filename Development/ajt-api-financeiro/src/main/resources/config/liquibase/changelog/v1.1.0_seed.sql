INSERT INTO status(id, nome, descricao, data_criacao, data_modificacao) VALUES (1, 'Pendente', 'Pendente de aprovação', now(), now());
INSERT INTO status(id, nome, descricao, data_criacao, data_modificacao) VALUES (2, 'Em Processamento', 'Solicitação em andamento das aprovações', now(), now());
INSERT INTO status(id, nome, descricao, data_criacao, data_modificacao) VALUES (3, 'Aprovado', 'Processo aprovado', now(), now());
INSERT INTO status(id, nome, descricao, data_criacao, data_modificacao) VALUES (4, 'Recusado', 'Processo recusado', now(), now());
INSERT INTO status(id, nome, descricao, data_criacao, data_modificacao) VALUES (5, 'Em Execução', 'Solicitação em execução', now(), now());
INSERT INTO status(id, nome, descricao, data_criacao, data_modificacao) VALUES (9, 'Erro', 'Processo apresentou erro', now(), now());

INSERT INTO tipo(id, nome, descricao, ativo, data_criacao, data_modificacao) VALUES (1, 'EC', 'Estabelecimento comercial', true, now(), now());
INSERT INTO tipo(id, nome, descricao, ativo, data_criacao, data_modificacao) VALUES (2, 'Portador', 'Cliente portador dos produtos mac', true, now(), now());
INSERT INTO tipo(id, nome, descricao, ativo, data_criacao, data_modificacao) VALUES (3, 'RH', 'Empresas que contratam serviços/produtos mac', true, now(), now());
