create table relatorio
(
    id              uuid not null
        constraint relatorio_pkey
        primary key,
    descricao       varchar(255),
    dias_expurgo    integer,
    formato_arquivo varchar(255),
    id_jasper       varchar(255),
    nome_relatorio  varchar(255),
    callback        varchar(255),
    tipo_dados      varchar(255),
    versao          varchar(255)
);

create table relatorio_solicitacao
(
    chave_pesquisa    uuid not null
        constraint relatorio_solicitacao_pkey
        primary key,
    chave_externa     varchar(255),
    dados_solicitacao json,
    data_solicitacao  timestamp,
    email             varchar(255),
    id_chave_s3       varchar(255),
    status            varchar(255),
    tempogeracaorel   integer,
    usuario           varchar(255),
    id_relatorio      uuid
        constraint fkt6epv8gqd6y9pu6yydhxmlc2l
        references relatorio
);

INSERT INTO relatorio (id, descricao, dias_expurgo, formato_arquivo, id_jasper, nome_relatorio, callback, tipo_dados,
                       versao)
VALUES ('b7f1e3b4-4d50-4dd5-9f1e-e2933a703793', 'RELATORIO CARGA PDF', 365, 'PDF', '0dc823009fa7a040291636a83cc6b0d8',
        'RelatorioCargaPDF', 'ASSINCRONO', 'QUERY', '1.0');
INSERT INTO relatorio (id, descricao, dias_expurgo, formato_arquivo, id_jasper, nome_relatorio, callback, tipo_dados,
                       versao)
VALUES ('070bcfb8-6568-11eb-ae93-0242ac130002', 'RELATORIO CARGA XLS', 365, 'XLSX', 'bf0ad1704030a1ba8be24639ada867fb',
        'RelatorioCargaXLS', 'ASSINCRONO', 'QUERY', '1.0');
INSERT INTO relatorio (id, descricao, dias_expurgo, formato_arquivo, id_jasper, nome_relatorio, callback, tipo_dados,
                       versao)
VALUES ('0bf93f6d-5be5-4d4e-a339-594250d90960', 'RELATORIO CARGA PAP PDF', 365, 'PDF',
        '0dc823009fa7a040291636a83cc6b0d8', 'RelatorioCargaPAPPDF', 'ASSINCRONO', 'QUERY', '1.0');
INSERT INTO relatorio (id, descricao, dias_expurgo, formato_arquivo, id_jasper, nome_relatorio, callback, tipo_dados,
                       versao)
VALUES ('995f62f2-e8b1-4bf3-9fa6-342c3f038eb4', 'RELATORIO CARGA PAP XLS', 365, 'XLSX',
        'bf0ad1704030a1ba8be24639ada867fb', 'RelatorioCargaPAPXLS', 'ASSINCRONO', 'QUERY', '1.0');

INSERT INTO relatorio_solicitacao (chave_pesquisa, chave_externa, dados_solicitacao, data_solicitacao, email,
                                   id_chave_s3, status, usuario, id_relatorio)
VALUES ('5bdab8d3-12c7-4ad5-922b-41145d733fc6', '5bdab8d3-12c7-4ad5-922b-41145d733fc6', '{
  "Id_Cargamaceficio": "334421"
}', '2021-01-27 16:10:08.844474', 'felipe@email.com', '0fcacc7b4ca0f9f0499c110dff067baa', 'EM_PROCESSAMENTO', 'felipe',
        'b7f1e3b4-4d50-4dd5-9f1e-e2933a703793');


INSERT INTO relatorio_solicitacao (chave_pesquisa, chave_externa, dados_solicitacao, data_solicitacao, email,
                                   id_chave_s3, status, usuario, id_relatorio)
VALUES ('6632740c-fe43-460b-98e4-20efc4320acc', 'cf481af5-6fea-456e-83b9-7c546f8f1c28', '{
  "Id_Cargamaceficio": "334421"
}', '2021-01-27 16:10:08.844474', 'felipe@email.com', '0fcacc7b4ca0f9f0499c110dff067baa', 'CONCLUIDO', 'felipe',
        'b7f1e3b4-4d50-4dd5-9f1e-e2933a703793');

INSERT INTO relatorio_solicitacao (chave_pesquisa, chave_externa, dados_solicitacao, data_solicitacao, email,
                                  status, usuario, id_relatorio)
VALUES ('723359af-b75a-4fce-b08e-06f36e381ba0', 'cf481af5-6fea-456e-83b9-7c546f8f1c28', '{
  "Id_Cargamaceficio": "334421"
}', '2021-01-27 16:10:08.844474', 'felipe@email.com', 'CONCLUIDO', 'felipe',
        'b7f1e3b4-4d50-4dd5-9f1e-e2933a703793');


INSERT INTO relatorio_solicitacao (chave_pesquisa, chave_externa, dados_solicitacao, data_solicitacao, email,
                                   id_chave_s3, status, usuario, id_relatorio)
VALUES ('84d16721-6cc0-4eb2-b7c7-aa1f8e5329bb', '84d16721-6cc0-4eb2-b7c7-aa1f8e5329bb', '{
  "Id_Cargamaceficio": "334421"
}', '2021-01-27 16:10:08.844474', 'felipe@email.com', '0fcacc7b4ca0f9f0499c110dff067baa', 'EM_PROCESSAMENTO', 'felipe',
        'b7f1e3b4-4d50-4dd5-9f1e-e2933a703793');





        INSERT INTO relatorio_solicitacao (chave_pesquisa, chave_externa, dados_solicitacao, data_solicitacao, email,
                                           id_chave_s3, status, usuario, id_relatorio)
        VALUES ('569d9756-9498-4176-b42b-76ee8f91a546', '569d9756-9498-4176-b42b-76ee8f91a546', '{
          "Id_Cargamaceficio": "334421"
        }', '2021-01-27 16:10:08.844474', 'felipe@email.com', '0fcacc7b4ca0f9f0499c110dff067baa', 'ERRO', 'felipe',
                'b7f1e3b4-4d50-4dd5-9f1e-e2933a703793');