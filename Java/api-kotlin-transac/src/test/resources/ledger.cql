CREATE KEYSPACE IF NOT EXISTS test WITH REPLICATION = { 'class' : 'SimpleStrategy', 'replication_factor' : 1 };
DROP TABLE IF EXISTS test.transacao_contabil;
CREATE TABLE test.transacao_contabil
(
    cd_transacao          timeuuid,
    cd_evento             int,
    tp_evento             varchar,
    cd_transacao_anterior timeuuid,
    dt_evento             timestamp,
    dt_inclusao           timestamp,
    tx_valor              decimal,
    tx_saldo              decimal,
    tx_saldo_anterior     decimal,
    tp_operacao           text,
    ds_ledger             text,
    tx_total_credito_dia    decimal,
    tx_total_credito_mes    decimal,
    tx_total_credito_ano    decimal,
    primary key (ds_ledger, dt_inclusao, cd_transacao)
) WITH CLUSTERING ORDER BY (dt_inclusao DESC);
CREATE INDEX IF NOT EXISTS ON test.transacao_contabil(cd_evento);
CREATE INDEX IF NOT EXISTS ON test.transacao_contabil(tp_evento);
CREATE INDEX IF NOT EXISTS ON test.transacao_contabil(tp_operacao);
DROP TABLE IF EXISTS test.info_pedido_conciliacao;
CREATE TABLE test.info_pedido_conciliacao
(
    id_pedido                    decimal primary key,
    cd_carga_controle_financeiro int,
    cd_cliente_rh_carga          int,
    cd_cliente_rh_solic          int,
    cd_empresa                   int,
    cd_grupo                     int,
    cd_produto                   smallint,
    cd_status_nf                 smallint,
    cd_sub_grupo                 int,
    cnpj_carga                   text,
    cnpj_rh_grupo                text,
    cnpj_rh_subgrupo             text,
    cnpj_solicitante             text,
    cpf                          text,
    data_hora                    timestamp,
    desc_cliente_carga           text,
    desc_cliente_solicitante     text,
    desc_produto                 text,
    desc_status_nf               text,
    dt_agendamento_credito       timestamp,
    dt_baixa_pagto               timestamp,
    dt_cancelamento              timestamp,
    dt_emissao_titulo            timestamp,
    dt_entrada_pedido            timestamp,
    dt_liberacao_credito         timestamp,
    dt_pagto_pedido              timestamp,
    dt_vencto_cobranca           date,
    id_arquivo                   int,
    id_boleto_pedido             int,
    id_carga                     int,
    id_portador                  int,
    nm_grupo                     text,
    nm_sub_grupo                 text,
    nome_portador                text,
    numero_nf                    text,
    status_carga                 text,
    tipo_boleto                  text,
    tipo_pagto                   text,
    tipo_recebimento             text,
    vl_carga_portador            decimal,
    vl_total_esperado_grupo      decimal,
    vl_total_processado_grupo    decimal
);
CREATE INDEX IF NOT EXISTS ON test.info_pedido_conciliacao (data_hora);
DROP TABLE IF EXISTS test.info_autorizacao_conciliacao;
CREATE TABLE test.info_autorizacao_conciliacao
(
    id_autorizacao                 int primary key,
    cartao                         text,
    cd_autorizacao                 text,
    cd_banco                       smallint,
    cd_bin                         int,
    cd_bin_adquirente              text,
    cd_produto                     smallint,
    cd_retorno                     text,
    cnpj_estabelecimento           text,
    cpf_portador                   text,
    data_hora                      timestamp,
    dc_bin_adquirente              text,
    dc_modo_entrada                text,
    dc_produto                     text,
    dc_retorno                     text,
    dc_tecnologia                  text,
    dc_terminal                    text,
    dc_tipo_transacao              text,
    dc_trans_neg                   text,
    dc_status                      text,
    dt_autorizacao                 timestamp,
    dt_transacao                   timestamp,
    id_cartao                      int,
    id_compra                      int,
    id_estabelecimento             text,
    id_portador                    int,
    nm_estabelecimento             text,
    nm_estabelecimento_autorizacao text,
    nome_portador                  text,
    nu_nsu                         int,
    tp_modo_entrada                text,
    tp_transacao                   text,
    vl_bruto                       decimal,
    vl_autorizacao                 decimal
);
CREATE INDEX IF NOT EXISTS ON test.info_autorizacao_conciliacao (data_hora);
DROP TABLE IF EXISTS test.info_ajuste_conciliacao;
CREATE TABLE test.info_ajuste_conciliacao
(
    id_ajuste int primary key,
    cd_ajuste int,
    cd_estabelecimento_comercial int,
    cd_portador int,
    cd_produto smallint,
    cd_transacao int,
    cpf text,
    data_hora timestamp,
    dc_adquirente text,
    dc_estabelecimento_comercial text,
    dc_motivo_ajuste text,
    dc_portador text,
    dt_geracao_ajuste timestamp,
    dt_transacao timestamp,
    nm_setup_contabil int,
    vl_credito_ajuste decimal,
    vl_debito_ajuste decimal,
    vl_transacao decimal
);
CREATE INDEX IF NOT EXISTS ON test.info_ajuste_conciliacao (data_hora);

DROP TABLE IF EXISTS test.info_agendamento_pedido;
CREATE TABLE test.info_agendamento_pedido (
    id_boleto_pedido int PRIMARY KEY,
    cd_carga_controle_financeiro int,
    cd_cliente_rh_solic int,
    cnpj_solicitante text,
    data_hora timestamp,
    desc_cliente_solicitante text,
    dt_emissao_titulo timestamp,
    dt_entrada_pedido timestamp,
    dt_liberacao_pedido timestamp,
    dt_vencto_cobranca timestamp,
    id_arquivo int,
    nosso_numero text,
    status_carga text,
    status_carga_maceficio int,
    status_empresa_carga_detalhe_produto int,
    tipo_bandeira text,
    tipo_boleto text,
    tipo_recebimento text,
    vl_cobranca decimal,
    vl_carga decimal,
    vl_credito_utilizado decimal
 ) WITH bloom_filter_fp_chance = 0.01
     AND caching = {'keys': 'ALL', 'rows_per_partition': 'NONE'}
     AND comment = ''
     AND compaction = {'class': 'org.apache.cassandra.db.compaction.SizeTieredCompactionStrategy', 'max_threshold': '32', 'min_threshold': '4'}
     AND compression = {'chunk_length_in_kb': '64', 'class': 'org.apache.cassandra.io.compress.LZ4Compressor'}
     AND crc_check_chance = 1.0
     AND dclocal_read_repair_chance = 0.1
     AND default_time_to_live = 0
     AND gc_grace_seconds = 864000
     AND max_index_interval = 2048
     AND memtable_flush_period_in_ms = 0
     AND min_index_interval = 128
     AND read_repair_chance = 0.0
     AND speculative_retry = '99PERCENTILE';

DROP TABLE IF EXISTS test.info_contavirtual;
CREATE TABLE test.info_contavirtual (
    id_boleto int PRIMARY KEY,
    cnpj_carga text,
    data_hora timestamp,
    dc text,
    descricao_cliente_carga text,
    id_pedido int,
    id_tipo_ajuste int,
    id_tipo_registro text
 );