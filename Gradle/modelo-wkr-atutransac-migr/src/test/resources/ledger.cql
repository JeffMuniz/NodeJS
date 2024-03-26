CREATE KEYSPACE IF NOT EXISTS test WITH REPLICATION = { 'class' : 'NetworkTopologyStrategy', 'DC1' : 1 };
drop table if exists test.transacao_contabil;
CREATE TABLE test.transacao_contabil
(
    cd_transacao        timeuuid,
    cd_evento          int,
    tp_evento          varchar,
    cd_transacao_anterior timeuuid,
    dt_evento          timestamp,
    dt_inclusao     timestamp,
    tx_valor           decimal,
    tx_saldo           decimal,
    tx_saldo_anterior  decimal,
    tp_operacao        text,
    ds_ledger          text,
    tx_total_credito_dia    decimal,
    tx_total_credito_mes    decimal,
    tx_total_credito_ano    decimal,
    primary key (ds_ledger, dt_inclusao, cd_transacao)
) WITH CLUSTERING ORDER BY (dt_inclusao DESC);
CREATE INDEX IF NOT EXISTS ON test.transacao_contabil(tp_operacao);
