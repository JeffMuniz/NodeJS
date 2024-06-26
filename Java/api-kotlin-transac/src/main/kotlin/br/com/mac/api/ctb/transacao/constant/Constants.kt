package br.com.mac.api.ctb.transacao.constant

const val ZERO = 0
const val ONE = 1
const val FIXED_HOUR = 23
const val FIXED_MINUTE = 59
const val FIXED_SECOND = 59
const val FIXED_MILLISECOND = 59
const val HTTP_OK = 200
const val COLON = ":"
const val FIXED_TIME = " 00:00:00"
const val FIXED_FINISH_DAY = " 23:59:59"
const val DATE_TIME_PATTERN = "yyyy-MM-dd HH:mm:ss"
const val DATE_PATTERN = "yyyy-MM-dd"
const val DATE_ISO8601_PATTERN = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"
const val SUBSTRING_START_INDEX = 0
const val SUBSTRING_DATE_ONLY = 10

//validator
const val OPERATION_TYPE_VALIDATOR_MESSAGE = "Somente CREDITO e DEBITO são permitidos no campo tipo"
const val LEDGER_TYPE_VALIDATOR_MESSAGE = "O tipo de Ledger não possui extrato"
const val CONTROL_POINT_VALIDATOR_MESSAGE = "O ponto de controle não existe"
const val DATETIME_FORMAT_VALIDATOR_MESSAGE = "Formato inválido para a data, usar apenas o formato: yyyy-MM-dd HH:mm:ss"
const val REGEX_DATETIME_FORMAT_VALIDATOR =
        "([12]\\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01])\\s([0-1][0-9]|[2][0-3]):([0-5][0-9]):([0-5][0-9]))"
const val DATE_FORMAT_VALIDATOR_MESSAGE = "Formato inválido para a data, usar apenas o formato: yyyy-MM-dd"
const val REGEX_DATE_FORMAT_VALIDATOR =
        "([12]\\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01]))"
const val VALIDATION_FAIL_MESSAGE = "Falha na validação"
const val INTERNAL_SERVER_ERROR_MESSAGE = "Erro interno no servidor"
const val CONCILIATION_JSON_ERROR_MESSAGE = "JSON de conciliação não configurado corretamente"
const val CONTROL_POINT_JSON_ERROR_MESSAGE = "JSON de ponto de controle não configurado corretamente"

// ledger fields
const val CD_TRANSACAO_FIELD = "cd_transacao"
const val LEDGER_FIELD = "ds_ledger"
const val DATA_INCLUSAO_FIELD = "dt_inclusao"
const val CODIGO_EVENTO_FIELD = "cd_evento"
const val TIPO_EVENTO_FIELD = "tp_evento"
const val CD_TRANSACAO_ANTERIOR_FIELD = "cd_transacao_anterior"
const val DATA_EVENTO_FIELD = "dt_evento"
const val VALOR_FIELD = "tx_valor"
const val SALDO_FIELD = "tx_saldo"
const val SALDO_ANTERIOR_FIELD = "tx_saldo_anterior"
const val TIPO_OPERACAO_FIELD = "tp_operacao"
const val TOTAL_CREDITO_DIA = "tx_total_credito_dia"
const val TOTAL_CREDITO_MES = "tx_total_credito_mes"
const val TOTAL_CREDITO_ANO = "tx_total_credito_ano"

// order fields
const val ID_PEDIDO_FIELD = "id_pedido"
const val CD_CARGA_CONTROLE_FINANCEIRO_FIELD = "cd_carga_controle_financeiro"
const val CD_CLIENTE_RH_CARGA_FIELD = "cd_cliente_rh_carga"
const val CD_CLIENTE_RH_SOLIC_FIELD = "cd_cliente_rh_solic"
const val CD_EMPRESA_FIELD = "cd_empresa"
const val CD_GRUPO_FIELD = "cd_grupo"
const val CD_PRODUTO_FIELD = "cd_produto"
const val CD_STATUS_NF_FIELD = "cd_status_nf"
const val CD_SUB_GRUPO_FIELD = "cd_sub_grupo"
const val CNPJ_CARGA_FIELD = "cnpj_carga"
const val CNPJ_RH_GRUPO_FIELD = "cnpj_rh_grupo"
const val CNPJ_RH_SUBGRUPO_FIELD = "cnpj_rh_subgrupo"
const val CNPJ_SOLICITANTE_FIELD = "cnpj_solicitante"
const val CPF_FIELD = "cpf"
const val DATA_HORA_FIELD = "data_hora"
const val DESC_CLIENTE_CARGA_FIELD = "desc_cliente_carga"
const val DESC_CLIENTE_SOLICITANTE_FIELD = "desc_cliente_solicitante"
const val DESC_PRODUTO_FIELD = "desc_produto"
const val DESC_STATUS_NF_FIELD = "desc_status_nf"
const val DT_AGENDAMENTO_CREDITO_FIELD = "dt_agendamento_credito"
const val DT_BAIXA_PAGTO_FIELD = "dt_baixa_pagto"
const val DT_CANCELAMENTO_FIELD = "dt_cancelamento"
const val DT_EMISSAO_TITULO_FIELD = "dt_emissao_titulo"
const val DT_ENTRADA_PEDIDO_FIELD = "dt_entrada_pedido"
const val DT_LIBERACAO_CREDITO_FIELD = "dt_liberacao_credito"
const val DT_PAGTO_PEDIDO_FIELD = "dt_pagto_pedido"
const val DT_VENCTO_COBRANCA_FIELD = "dt_vencto_cobranca"
const val ID_ARQUIVO_FIELD = "id_arquivo"
const val ID_BOLETO_PEDIDO_FIELD = "id_boleto_pedido"
const val ID_CARGA_FIELD = "id_carga"
const val ID_PORTADOR_FIELD = "id_portador"
const val NM_GRUPO_FIELD = "nm_grupo"
const val NM_SUB_GRUPO_FIELD = "nm_sub_grupo"
const val NOME_PORTADOR_FIELD = "nome_portador"
const val NUMERO_NF_FIELD = "numero_nf"
const val STATUS_CARGA_FIELD = "status_carga"
const val TIPO_BOLETO_FIELD = "tipo_boleto"
const val TIPO_PAGTO_FIELD = "tipo_pagto"
const val TIPO_RECEBIMENTO_FIELD = "tipo_recebimento"
const val VL_CARGA_PORTADOR_FIELD = "vl_carga_portador"
const val VL_TOTAL_ESPERADO_GRUPO_FIELD = "vl_total_esperado_grupo"
const val VL_TOTAL_PROCESSADO_GRUPO_FIELD = "vl_total_processado_grupo"

// Scheduling Request
const val ID_BOLETO_AGENDAMENTO_PEDIDO_FIELD                            = "id_boleto_pedido"
const val DT_EMISSAO_TITULO_AGENDAMENTO_PEDIDO_FIELD                    = "dt_emissao_titulo"
const val CNPJ_SOLICITANTE_AGENDAMENTO_PEDIDO_FIELD                     = "cnpj_solicitante"
const val DESC_CLIENTE_SOLICITANTE_AGENDAMENTO_PEDIDO_FIELD             = "desc_cliente_solicitante"
const val CD_CLIENTE_RH_SOLIC_AGENDAMENTO_PEDIDO_FIELD                  = "cd_cliente_rh_solic"
const val TIPO_BOLETO_AGENDAMENTO_PEDIDO_FIELD                          = "tipo_boleto"
const val NOSSO_NUMERO_AGENDAMENTO_PEDIDO_FIELD                         = "nosso_numero"
const val TIPO_RECEBIMENTO_AGENDAMENTO_PEDIDO_FIELD                     = "tipo_recebimento"
const val DT_ENTRADA_AGENDAMENTO_PEDIDO_FIELD                           = "dt_entrada_pedido"
const val DT_LIBERACAO_PEDIDO_AGENDAMENTO_PEDIDO_FIELD                 = "dt_liberacao_pedido"
const val DT_VENCTO_COBRANCA_AGENDAMENTO_PEDIDO_FIELD                   = "dt_vencto_cobranca"
const val STATUS_CARGA_AGENDAMENTO_PEDIDO_FIELD                         = "status_carga"
const val VL_CARGA_AGENDAMENTO_PEDIDO_FIELD                             = "vl_carga"
const val VL_CARGA_UTILIZADO_AGENDAMENTO_PEDIDO_FIELD                   = "vl_credito_utilizado"
const val VL_COBRANCA_AGENDAMENTO_PEDIDO_FIELD                          = "vl_cobranca"
const val ID_ARQUIVO_AGENDAMENTO_PEDIDO_FIELD                           = "id_arquivo"
const val CD_CARGA_CONTROLE_FINANCEIRO_AGENDAMENTO_PEDIDO_FIELD         = "cd_carga_controle_financeiro"
const val STATUS_CARGA_macEFICIO_AGENDAMENTO_PEDIDO_FIELD               = "status_carga_maceficio"
const val STATUS_EMP_CARGA_DET_PROD_AGE_PEDIDO_FIELD                    = "status_empresa_carga_detalhe_produto"
const val TIPO_BANDEIRA_AGENDAMENTO_PEDIDO_FIELD                        = "tipo_bandeira"

//authorization fields
const val ID_AUTORIZACAO_FIELD = "id_autorizacao"
const val CARTAO_FIELD = "cartao"
const val CD_BANCO_FIELD = "cd_banco"
const val CD_AUTORIZACAO_FIELD = "cd_autorizacao"
const val CD_BIN_FIELD = "cd_bin"
const val CD_BIN_ADQUIRENTE_FIELD = "cd_bin_adquirente"
const val CD_RETORNO_FIELD = "cd_retorno"
const val CNPJ_ESTABELECIMENTO_FIELD = "cnpj_estabelecimento"
const val CPF_PORTADOR_FIELD = "cpf_portador"
const val DC_BIN_ADQUIRENTE_FIELD = "dc_bin_adquirente"
const val DC_MODO_ENTRADA_FIELD = "dc_modo_entrada"
const val DC_PRODUTO_FIELD = "dc_produto"
const val DC_RETORNO_FIELD = "dc_retorno"
const val DC_TECNOLOGIA_FIELD = "dc_tecnologia"
const val DC_TERMINAL_FIELD = "dc_terminal"
const val DC_TIPO_TRANSACAO_FIELD = "dc_tipo_transacao"
const val DC_TRANS_NEG_FIELD = "dc_trans_neg"
const val DC_STATUS_FLIED = "dc_status"
const val DT_AUTORIZACAO_FIELD = "dt_autorizacao"
const val ID_CARTAO_FIELD = "id_cartao"
const val ID_COMPRA_FIELD = "id_compra"
const val ID_ESTABELECIMENTO_FIELD = "id_estabelecimento"
const val NM_ESTABELECIMENTO_FIELD = "nm_estabelecimento"
const val NM_ESTABELECIMENTO_AUTORIZACAO_FIELD = "nm_estabelecimento_autorizacao"
const val NU_NSU_FIELD = "nu_nsu"
const val TP_MODO_ENTRADA_FIELD = "tp_modo_entrada"
const val TP_TRANSACAO_FIELD = "tp_transacao"
const val VL_AUTORIZACAO_FIELD = "vl_autorizacao"
const val VL_BRUTO_FIELD = "vl_bruto"

//adjustment fields
const val ID_AJUSTE_FIELD = "id_ajuste"
const val CD_AJUSTE_FIELD = "cd_ajuste"
const val CD_ESTABELECIMENTO_COMERCIAL_FIELD = "cd_estabelecimento_comercial"
const val CD_PORTADOR_FIELD = "cd_portador"
const val DC_ADQUIRENTE_FIELD = "dc_adquirente"
const val DC_ESTABELECIMENTO_COMERCIAL_FIELD = "dc_estabelecimento_comercial"
const val DC_MOTIVO_AJUSTE_FIELD = "dc_motivo_ajuste"
const val DC_PORTADOR_FIELD = "dc_portador"
const val DT_GERACAO_AJUSTE_FIELD = "dt_geracao_ajuste"
const val DT_TRANSACAO_FIELD = "dt_transacao"
const val NM_SETUP_CONTABIL_FIELD = "nm_setup_contabil"
const val VL_CREDITO_AJUSTE_FIELD = "vl_credito_ajuste"
const val VL_DEBITO_AJUSTE_FIELD = "vl_debito_ajuste"
const val VL_TRANSACAO_FIELD = "vl_transacao"

// VIRTUAL ACCOUNTING
const val ID_BOLETO_CONTAVIRTUAL_FIELD = "id_boleto"
const val DT_HORA_CONTAVIRTUAL_FIELD = "data_hora"
const val CNPJ_CARGA_CONTAVIRTUAL_FIELD = "cnpj_carga"
const val DESC_CLIENTE_CARGA_CONTAVIRTUAL_FIELD = "descricao_cliente_carga"
const val  CD_PEDIDO_CONTAVIRTUAL_FIELD = "id_pedido"
const val CD_TIPO_AJUSTE_CONTAVIRTUAL_FIELD = "id_tipo_ajuste"
const val CD_TIPO_REGISTRO_CONTAVIRTUAL_FIELD = "id_tipo_registro"
const val TIPO_OPERACAO_CONTAVIRTUAL_FIELD = "dc"

