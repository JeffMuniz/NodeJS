package br.com.mac.api.ctb.transacao.port.impl

import br.com.mac.adapter.elassandra.ElassandraAdapter
import br.com.mac.api.ctb.transacao.constant.FIXED_SECOND
import br.com.mac.api.ctb.transacao.constant.FIXED_MILLISECOND
import br.com.mac.api.ctb.transacao.constant.FIXED_HOUR
import br.com.mac.api.ctb.transacao.constant.FIXED_MINUTE
import br.com.mac.api.ctb.transacao.constant.ONE
import br.com.mac.api.ctb.transacao.constant.ZERO
// ledger fields
import br.com.mac.api.ctb.transacao.constant.CD_TRANSACAO_FIELD
import br.com.mac.api.ctb.transacao.constant.LEDGER_FIELD
import br.com.mac.api.ctb.transacao.constant.DATA_INCLUSAO_FIELD
import br.com.mac.api.ctb.transacao.constant.CODIGO_EVENTO_FIELD
import br.com.mac.api.ctb.transacao.constant.TIPO_EVENTO_FIELD
import br.com.mac.api.ctb.transacao.constant.CD_TRANSACAO_ANTERIOR_FIELD
import br.com.mac.api.ctb.transacao.constant.DATA_EVENTO_FIELD
import br.com.mac.api.ctb.transacao.constant.VALOR_FIELD
import br.com.mac.api.ctb.transacao.constant.SALDO_FIELD
import br.com.mac.api.ctb.transacao.constant.SALDO_ANTERIOR_FIELD
import br.com.mac.api.ctb.transacao.constant.TIPO_OPERACAO_FIELD
import br.com.mac.api.ctb.transacao.constant.TOTAL_CREDITO_DIA
import br.com.mac.api.ctb.transacao.constant.TOTAL_CREDITO_MES
import br.com.mac.api.ctb.transacao.constant.TOTAL_CREDITO_ANO

// order fields
import br.com.mac.api.ctb.transacao.constant.ID_PEDIDO_FIELD
import br.com.mac.api.ctb.transacao.constant.CD_CARGA_CONTROLE_FINANCEIRO_FIELD
import br.com.mac.api.ctb.transacao.constant.CD_CLIENTE_RH_CARGA_FIELD
import br.com.mac.api.ctb.transacao.constant.CD_CLIENTE_RH_SOLIC_FIELD
import br.com.mac.api.ctb.transacao.constant.CD_EMPRESA_FIELD
import br.com.mac.api.ctb.transacao.constant.CD_GRUPO_FIELD
import br.com.mac.api.ctb.transacao.constant.CD_PRODUTO_FIELD
import br.com.mac.api.ctb.transacao.constant.CD_STATUS_NF_FIELD
import br.com.mac.api.ctb.transacao.constant.CD_SUB_GRUPO_FIELD
import br.com.mac.api.ctb.transacao.constant.CNPJ_CARGA_FIELD
import br.com.mac.api.ctb.transacao.constant.CNPJ_RH_GRUPO_FIELD
import br.com.mac.api.ctb.transacao.constant.CNPJ_RH_SUBGRUPO_FIELD
import br.com.mac.api.ctb.transacao.constant.CNPJ_SOLICITANTE_FIELD
import br.com.mac.api.ctb.transacao.constant.CPF_FIELD
import br.com.mac.api.ctb.transacao.constant.DATA_HORA_FIELD
import br.com.mac.api.ctb.transacao.constant.DESC_CLIENTE_CARGA_FIELD
import br.com.mac.api.ctb.transacao.constant.DESC_CLIENTE_SOLICITANTE_FIELD
import br.com.mac.api.ctb.transacao.constant.DESC_PRODUTO_FIELD
import br.com.mac.api.ctb.transacao.constant.DESC_STATUS_NF_FIELD
import br.com.mac.api.ctb.transacao.constant.DT_AGENDAMENTO_CREDITO_FIELD
import br.com.mac.api.ctb.transacao.constant.DT_BAIXA_PAGTO_FIELD
import br.com.mac.api.ctb.transacao.constant.DT_CANCELAMENTO_FIELD
import br.com.mac.api.ctb.transacao.constant.DT_EMISSAO_TITULO_FIELD
import br.com.mac.api.ctb.transacao.constant.DT_ENTRADA_PEDIDO_FIELD
import br.com.mac.api.ctb.transacao.constant.DT_LIBERACAO_CREDITO_FIELD
import br.com.mac.api.ctb.transacao.constant.DT_PAGTO_PEDIDO_FIELD
import br.com.mac.api.ctb.transacao.constant.DT_VENCTO_COBRANCA_FIELD
import br.com.mac.api.ctb.transacao.constant.ID_ARQUIVO_FIELD
import br.com.mac.api.ctb.transacao.constant.ID_BOLETO_PEDIDO_FIELD
import br.com.mac.api.ctb.transacao.constant.ID_CARGA_FIELD
import br.com.mac.api.ctb.transacao.constant.ID_PORTADOR_FIELD
import br.com.mac.api.ctb.transacao.constant.NM_GRUPO_FIELD
import br.com.mac.api.ctb.transacao.constant.NM_SUB_GRUPO_FIELD
import br.com.mac.api.ctb.transacao.constant.NOME_PORTADOR_FIELD
import br.com.mac.api.ctb.transacao.constant.NUMERO_NF_FIELD
import br.com.mac.api.ctb.transacao.constant.STATUS_CARGA_FIELD
import br.com.mac.api.ctb.transacao.constant.TIPO_BOLETO_FIELD
import br.com.mac.api.ctb.transacao.constant.TIPO_PAGTO_FIELD
import br.com.mac.api.ctb.transacao.constant.TIPO_RECEBIMENTO_FIELD
import br.com.mac.api.ctb.transacao.constant.VL_CARGA_PORTADOR_FIELD
import br.com.mac.api.ctb.transacao.constant.VL_TOTAL_ESPERADO_GRUPO_FIELD
import br.com.mac.api.ctb.transacao.constant.VL_TOTAL_PROCESSADO_GRUPO_FIELD

// Cesar(20 FIELDS)
import br.com.mac.api.ctb.transacao.constant.ID_BOLETO_AGENDAMENTO_PEDIDO_FIELD
import br.com.mac.api.ctb.transacao.constant.DT_EMISSAO_TITULO_AGENDAMENTO_PEDIDO_FIELD
import br.com.mac.api.ctb.transacao.constant.CNPJ_SOLICITANTE_AGENDAMENTO_PEDIDO_FIELD
import br.com.mac.api.ctb.transacao.constant.DESC_CLIENTE_SOLICITANTE_AGENDAMENTO_PEDIDO_FIELD
import br.com.mac.api.ctb.transacao.constant.CD_CLIENTE_RH_SOLIC_AGENDAMENTO_PEDIDO_FIELD
import br.com.mac.api.ctb.transacao.constant.TIPO_BOLETO_AGENDAMENTO_PEDIDO_FIELD
import br.com.mac.api.ctb.transacao.constant.NOSSO_NUMERO_AGENDAMENTO_PEDIDO_FIELD
import br.com.mac.api.ctb.transacao.constant.TIPO_RECEBIMENTO_AGENDAMENTO_PEDIDO_FIELD
import br.com.mac.api.ctb.transacao.constant.DT_ENTRADA_AGENDAMENTO_PEDIDO_FIELD
import br.com.mac.api.ctb.transacao.constant.DT_LIBERACAO_PEDIDO_AGENDAMENTO_PEDIDO_FIELD
import br.com.mac.api.ctb.transacao.constant.DT_VENCTO_COBRANCA_AGENDAMENTO_PEDIDO_FIELD
import br.com.mac.api.ctb.transacao.constant.STATUS_CARGA_AGENDAMENTO_PEDIDO_FIELD
import br.com.mac.api.ctb.transacao.constant.VL_CARGA_AGENDAMENTO_PEDIDO_FIELD
import br.com.mac.api.ctb.transacao.constant.VL_CARGA_UTILIZADO_AGENDAMENTO_PEDIDO_FIELD
import br.com.mac.api.ctb.transacao.constant.VL_COBRANCA_AGENDAMENTO_PEDIDO_FIELD
import br.com.mac.api.ctb.transacao.constant.ID_ARQUIVO_AGENDAMENTO_PEDIDO_FIELD
import br.com.mac.api.ctb.transacao.constant.CD_CARGA_CONTROLE_FINANCEIRO_AGENDAMENTO_PEDIDO_FIELD
import br.com.mac.api.ctb.transacao.constant.STATUS_CARGA_macEFICIO_AGENDAMENTO_PEDIDO_FIELD
import br.com.mac.api.ctb.transacao.constant.STATUS_EMP_CARGA_DET_PROD_AGE_PEDIDO_FIELD
import br.com.mac.api.ctb.transacao.constant.TIPO_BANDEIRA_AGENDAMENTO_PEDIDO_FIELD
//Cesar

//authorization fields
import br.com.mac.api.ctb.transacao.constant.ID_AUTORIZACAO_FIELD
import br.com.mac.api.ctb.transacao.constant.CARTAO_FIELD
import br.com.mac.api.ctb.transacao.constant.CD_BANCO_FIELD
import br.com.mac.api.ctb.transacao.constant.CD_AUTORIZACAO_FIELD
import br.com.mac.api.ctb.transacao.constant.CD_BIN_FIELD
import br.com.mac.api.ctb.transacao.constant.CD_BIN_ADQUIRENTE_FIELD
import br.com.mac.api.ctb.transacao.constant.CD_RETORNO_FIELD
import br.com.mac.api.ctb.transacao.constant.CNPJ_ESTABELECIMENTO_FIELD
import br.com.mac.api.ctb.transacao.constant.CPF_PORTADOR_FIELD
import br.com.mac.api.ctb.transacao.constant.DC_BIN_ADQUIRENTE_FIELD
import br.com.mac.api.ctb.transacao.constant.DC_MODO_ENTRADA_FIELD
import br.com.mac.api.ctb.transacao.constant.DC_PRODUTO_FIELD
import br.com.mac.api.ctb.transacao.constant.DC_RETORNO_FIELD
import br.com.mac.api.ctb.transacao.constant.DC_TECNOLOGIA_FIELD
import br.com.mac.api.ctb.transacao.constant.DC_TERMINAL_FIELD
import br.com.mac.api.ctb.transacao.constant.DC_TIPO_TRANSACAO_FIELD
import br.com.mac.api.ctb.transacao.constant.DC_TRANS_NEG_FIELD
import br.com.mac.api.ctb.transacao.constant.DC_STATUS_FLIED
import br.com.mac.api.ctb.transacao.constant.DT_AUTORIZACAO_FIELD
import br.com.mac.api.ctb.transacao.constant.ID_CARTAO_FIELD
import br.com.mac.api.ctb.transacao.constant.ID_COMPRA_FIELD
import br.com.mac.api.ctb.transacao.constant.ID_ESTABELECIMENTO_FIELD
import br.com.mac.api.ctb.transacao.constant.NM_ESTABELECIMENTO_FIELD
import br.com.mac.api.ctb.transacao.constant.NM_ESTABELECIMENTO_AUTORIZACAO_FIELD
import br.com.mac.api.ctb.transacao.constant.NU_NSU_FIELD
import br.com.mac.api.ctb.transacao.constant.TP_MODO_ENTRADA_FIELD
import br.com.mac.api.ctb.transacao.constant.TP_TRANSACAO_FIELD
import br.com.mac.api.ctb.transacao.constant.VL_AUTORIZACAO_FIELD
import br.com.mac.api.ctb.transacao.constant.VL_BRUTO_FIELD

//adjustment fields
import br.com.mac.api.ctb.transacao.constant.ID_AJUSTE_FIELD
import br.com.mac.api.ctb.transacao.constant.CD_AJUSTE_FIELD
import br.com.mac.api.ctb.transacao.constant.CD_ESTABELECIMENTO_COMERCIAL_FIELD
import br.com.mac.api.ctb.transacao.constant.CD_PORTADOR_FIELD
import br.com.mac.api.ctb.transacao.constant.DC_ADQUIRENTE_FIELD
import br.com.mac.api.ctb.transacao.constant.DC_ESTABELECIMENTO_COMERCIAL_FIELD
import br.com.mac.api.ctb.transacao.constant.DC_MOTIVO_AJUSTE_FIELD
import br.com.mac.api.ctb.transacao.constant.DC_PORTADOR_FIELD
import br.com.mac.api.ctb.transacao.constant.DT_GERACAO_AJUSTE_FIELD
import br.com.mac.api.ctb.transacao.constant.DT_TRANSACAO_FIELD
import br.com.mac.api.ctb.transacao.constant.NM_SETUP_CONTABIL_FIELD
import br.com.mac.api.ctb.transacao.constant.VL_CREDITO_AJUSTE_FIELD
import br.com.mac.api.ctb.transacao.constant.VL_DEBITO_AJUSTE_FIELD
import br.com.mac.api.ctb.transacao.constant.VL_TRANSACAO_FIELD

// VIRTUAL ACCOUNTING
import br.com.mac.api.ctb.transacao.constant.ID_BOLETO_CONTAVIRTUAL_FIELD
import br.com.mac.api.ctb.transacao.constant.DT_HORA_CONTAVIRTUAL_FIELD
import br.com.mac.api.ctb.transacao.constant.CNPJ_CARGA_CONTAVIRTUAL_FIELD
import br.com.mac.api.ctb.transacao.constant.DESC_CLIENTE_CARGA_CONTAVIRTUAL_FIELD
import br.com.mac.api.ctb.transacao.constant.CD_PEDIDO_CONTAVIRTUAL_FIELD
import br.com.mac.api.ctb.transacao.constant.CD_TIPO_AJUSTE_CONTAVIRTUAL_FIELD
import br.com.mac.api.ctb.transacao.constant.CD_TIPO_REGISTRO_CONTAVIRTUAL_FIELD
import br.com.mac.api.ctb.transacao.constant.TIPO_OPERACAO_CONTAVIRTUAL_FIELD

import br.com.mac.api.ctb.transacao.domain.model.TransacaoContabil
import br.com.mac.api.ctb.transacao.domain.model.Pedido
import br.com.mac.api.ctb.transacao.domain.model.Autorizacao
import br.com.mac.api.ctb.transacao.domain.model.Ajuste
import br.com.mac.api.ctb.transacao.domain.model.ContaVirtual
import br.com.mac.api.ctb.transacao.domain.model.AgendamentoPedido


import br.com.mac.api.ctb.transacao.port.CassandraPort
import br.com.mac.ctb.entity.AjusteEntity
import br.com.mac.ctb.entity.AjusteKey
import br.com.mac.ctb.entity.AutorizacaoEntity
import br.com.mac.ctb.entity.AutorizacaoKey
import br.com.mac.ctb.entity.PedidoEntity
import br.com.mac.ctb.entity.PedidoKey
import br.com.mac.ctb.entity.TransacaoContabilEntity
import br.com.mac.ctb.entity.TransacaoContabilKey
import br.com.mac.ctb.enum.TipoOperacao
import br.com.mac.ctb.enum.TipoPeriodo
import com.datastax.driver.core.ResultSet
import com.datastax.driver.core.Row
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.data.domain.Pageable
import org.springframework.stereotype.Component
import java.math.BigDecimal
import java.time.LocalDate
import java.time.ZoneId
import java.util.Date


@Component
class CassandraPortImpl @Autowired constructor(val cassandraAdapter:
                                               ElassandraAdapter<TransacaoContabilEntity, TransacaoContabilKey>,
                                               val cassandraPedidoAdapter
                                               : ElassandraAdapter<PedidoEntity, PedidoKey>,
                                               val cassandraAutorizacaoAdapter:
                                               ElassandraAdapter<AutorizacaoEntity, AutorizacaoKey>,
                                               val cassandraAjusteAdapter: ElassandraAdapter<AjusteEntity, AjusteKey>)
    : CassandraPort {


    @Value("\${cassandra.informational.keyspace}")
    private lateinit var informationalKeyspace: String

    @Value("\${mac.timezone}")
    private var timezone: String? = null

    override fun getCurrentBalance(ledger: String, inclusionDate: Date?): TransacaoContabil {

        val query = StringBuilder()
                .append("SELECT cd_transacao,cd_evento,tp_evento,cd_transacao_anterior,dt_evento,dt_inclusao, ")
                .append("tx_valor,tx_saldo,tx_saldo_anterior,tp_operacao, ds_ledger, tx_total_credito_dia, ")
                .append("tx_total_credito_mes, tx_total_credito_ano ")
                .append("FROM transacao_contabil WHERE ds_ledger = :ledger\n")

        val parameters = mutableMapOf<String, Any>(
                Pair("ledger", ledger.toUpperCase())
        )

        inclusionDate?.let {
            query.append("AND dt_inclusao < :inclusionDate\n")
            parameters.plusAssign(Pair("inclusionDate", it))
        }

        query.append("LIMIT 1;")

        val records = cassandraAdapter.execute(query.toString(), parameters) as? ResultSet

        return records?.one()?.let { convertRowToTransacaoContabil(it) }
                ?: TransacaoContabil(saldo = BigDecimal.ZERO, ledger = ledger)

    }

    override fun getPeriodBalance(ledger: String, date: LocalDate, tipoPeriodo: TipoPeriodo): TransacaoContabil {

        val query = """
                SELECT cd_transacao,cd_evento,tp_evento,cd_transacao_anterior,dt_evento,dt_inclusao, 
                tx_valor,tx_saldo,tx_saldo_anterior,tp_operacao, ds_ledger, tx_total_credito_dia, 
                tx_total_credito_mes, tx_total_credito_ano 
                FROM transacao_contabil WHERE ds_ledger = :ledger 
                AND dt_inclusao > :inclusionDateStart AND dt_inclusao < :inclusionDateEnd
                LIMIT 1
                """

        val inclusionDateStart = when (tipoPeriodo) {
            TipoPeriodo.DIA -> {
                Date.from(date.atTime(ZERO, ZERO, ZERO, ZERO)
                        .atZone(ZoneId.systemDefault()).toInstant())
            }
            TipoPeriodo.MES -> {
                Date.from(date.withDayOfMonth(ONE).atTime(ZERO, ZERO, ZERO, ZERO)
                        .atZone(ZoneId.systemDefault()).toInstant())
            }
            TipoPeriodo.ANO -> {
                Date.from(date.withDayOfMonth(ONE).withMonth(1).atTime(ZERO, ZERO, ZERO, ZERO)
                        .atZone(ZoneId.systemDefault()).toInstant())
            }
        }

        val parameters = mutableMapOf<String, Any>(
                Pair("ledger", ledger.toUpperCase()),
                Pair("inclusionDateStart", inclusionDateStart),
                Pair("inclusionDateEnd", Date.from(date.atTime(FIXED_HOUR, FIXED_MINUTE, FIXED_SECOND,
                        FIXED_MILLISECOND)
                        .atZone(ZoneId.systemDefault()).toInstant()))
        )

        val records = cassandraAdapter.execute(query, parameters) as? ResultSet

        return records?.one()?.let { convertRowToTransacaoContabil(it) }
                ?: TransacaoContabil(ledger = ledger, totalCreditoDia = BigDecimal.ZERO,
                        totalCreditoMes = BigDecimal.ZERO, totalCreditoAno = BigDecimal.ZERO)

    }

    override fun getAmountPerType(ledger: String, operationType: String, startDate: Date, endDate: Date)
            : TransacaoContabil {

        val query = """SELECT SUM(tx_valor) as valor FROM transacao_contabil
                        WHERE ds_ledger = :ledger AND
                        dt_inclusao > :startDate AND
                        dt_inclusao < :endDate AND
                        tp_operacao = :operationType;"""

        val parameters = hashMapOf(
                Pair("ledger", ledger.toUpperCase()),
                Pair("startDate", startDate),
                Pair("endDate", endDate),
                Pair("operationType", operationType.toUpperCase())
        )

        val records = cassandraAdapter.execute(query, parameters as Map<String, Any>?) as? ResultSet

        return TransacaoContabil(valor = records?.one()?.getDecimal("valor") ?: BigDecimal.ZERO)
    }

    override fun getTransacoes(ledger: String, startDate: Date, endDate: Date,
                               operationType: TipoOperacao?, page: Pageable?):
            List<TransacaoContabil> {

        val listOfTransacaoContabil = arrayListOf<TransacaoContabil>()

        var query = """SELECT cd_transacao,cd_evento,tp_evento,cd_transacao_anterior,dt_evento,dt_inclusao,tx_valor,
            tx_saldo,tx_saldo_anterior,tp_operacao, ds_ledger, tx_total_credito_dia, tx_total_credito_mes, 
            tx_total_credito_ano 
            FROM transacao_contabil 
            WHERE ds_ledger = :ledger AND 
            dt_inclusao > :startDate AND 
            dt_inclusao < :endDate """

        val parameters = mutableMapOf<String, Any>(
                Pair("ledger", ledger.toUpperCase()),
                Pair("startDate", startDate),
                Pair("endDate", endDate)
        )

        operationType?.let {
            query += "AND tp_operacao = :operationType"
            parameters.plusAssign(Pair("operationType", operationType.name))
        }

        val result = cassandraAdapter.execute(query, parameters, page?.pageSize) as? ResultSet

        result?.let {

            var pageControl = ZERO

            var records = it

            while (page?.pageNumber != pageControl && !records.isFullyFetched) {

                val fetchSize = records.availableWithoutFetching
                val pagingState = records.executionInfo.pagingState

                records = cassandraAdapter.execute(query, parameters, fetchSize, pagingState) as ResultSet

                pageControl++
            }

            records.let {

                var remaining = records.availableWithoutFetching

                for (row in records) {

                    listOfTransacaoContabil.add(convertRowToTransacaoContabil(row))

                    if (--remaining == ZERO) {

                        //Para iterar somente até o fim da página
                        break
                    }
                }

            }
        }

        return listOfTransacaoContabil

    }

    override fun getByOderId(arrayOfOrderId: Array<String>): List<Pedido> {

        val listOfInfoPedido = arrayListOf<Pedido>()

        val query = """select * from $informationalKeyspace.info_pedido_conciliacao
            where id_pedido in (${arrayOfOrderId.joinToString()});"""

        val records = cassandraPedidoAdapter.execute(query) as ResultSet

        for (row in records) {

            listOfInfoPedido.add(convertRowToPedido(row))
        }

        return listOfInfoPedido
    }

    override fun getByAuthorizationId(arrayOfAuthorizationId: Array<String>): List<Autorizacao> {

        val listOfInfoAutorizacao = arrayListOf<Autorizacao>()

        val query = """select * from $informationalKeyspace.info_autorizacao_conciliacao
            where id_autorizacao in (${arrayOfAuthorizationId.joinToString()});"""

        val records = cassandraAutorizacaoAdapter.execute(query) as ResultSet

        for (row in records) {

            listOfInfoAutorizacao.add(convertRowToAutorizacao(row))
        }

        return listOfInfoAutorizacao
    }

    override fun getByAdjustmentId(arrayOfAdjustmentId: Array<String>): List<Ajuste> {
        val listOfInfoAjuste = arrayListOf<Ajuste>()

        val query = """select * from $informationalKeyspace.info_ajuste_conciliacao
            where id_ajuste in (${arrayOfAdjustmentId.joinToString()});"""

        val records = cassandraAjusteAdapter.execute(query) as ResultSet

        for (row in records) {

            listOfInfoAjuste.add(convertRowToAjuste(row))
        }

        return listOfInfoAjuste
    }

    override fun getBySchedulingRequestId(arrayOfSchedulingRequestId: Array<String>): List<AgendamentoPedido> {

        val schedulingRequests = arrayListOf<AgendamentoPedido>()

        val query = """select * from $informationalKeyspace.info_agendamento_pedido
            where id_boleto_pedido in (${arrayOfSchedulingRequestId.joinToString()});"""

        val records = cassandraPedidoAdapter.execute(query) as ResultSet

        for (row in records) {

            schedulingRequests.add(convertRowToAgendamentoPedido(row))
        }

        return schedulingRequests
    }

    override fun getByVirtualAccountingId(arrayOfVirtualAccountingId: Array<String>): List<ContaVirtual> {

        val virtualAccounting = arrayListOf<ContaVirtual>()

        val query = """select * from $informationalKeyspace.info_contavirtual
            where id_boleto in (${arrayOfVirtualAccountingId.joinToString()});"""

        val records = cassandraPedidoAdapter.execute(query) as ResultSet

        for (row in records) {

            virtualAccounting.add(convertRowToContaVirtual(row))
        }

        return virtualAccounting
    }


    //TODO Não converter a data
    private fun convertRowToTransacaoContabil(row: Row): TransacaoContabil {
        return TransacaoContabil(codigoTransacao = row.getUUID(CD_TRANSACAO_FIELD),
                ledger = row.getString(LEDGER_FIELD),
                dataInclusao = row.getTimestamp(DATA_INCLUSAO_FIELD)
                        .toInstant()
                        .atZone(ZoneId.systemDefault())
                        .toLocalDateTime(),
                codigoEvento = row.getInt(CODIGO_EVENTO_FIELD),
                tipoEvento = row.getString(TIPO_EVENTO_FIELD),
                codigoTransacaoAnterior = row.getUUID(CD_TRANSACAO_ANTERIOR_FIELD),
                dataEvento = row.getTimestamp(DATA_EVENTO_FIELD)
                        .toInstant()
                        .atZone(ZoneId.systemDefault())
                        .toLocalDateTime(),
                valor = row.getDecimal(VALOR_FIELD),
                saldo = row.getDecimal(SALDO_FIELD),
                saldoAnterior = row.getDecimal(SALDO_ANTERIOR_FIELD),
                tipoOperacao = row.getString(TIPO_OPERACAO_FIELD),
                totalCreditoDia = row.getDecimal(TOTAL_CREDITO_DIA),
                totalCreditoMes = row.getDecimal(TOTAL_CREDITO_MES),
                totalCreditoAno = row.getDecimal(TOTAL_CREDITO_ANO)
        )
    }

    private fun convertRowToPedido(row: Row): Pedido {
        return Pedido(idPedido = row.getDecimal(ID_PEDIDO_FIELD),
                cdCargaControleFinanceiro = row.getInt(CD_CARGA_CONTROLE_FINANCEIRO_FIELD),
                cdClienteRhCarga = row.getInt(CD_CLIENTE_RH_CARGA_FIELD),
                cdClienteRhSolic = row.getInt(CD_CLIENTE_RH_SOLIC_FIELD),
                cdEmpresa = row.getInt(CD_EMPRESA_FIELD),
                cdGrupo = row.getInt(CD_GRUPO_FIELD),
                cdProduto = row.getShort(CD_PRODUTO_FIELD),
                cdStatusNf = row.getShort(CD_STATUS_NF_FIELD),
                cdSubGrupo = row.getInt(CD_SUB_GRUPO_FIELD),
                cnpjCarga = row.getString(CNPJ_CARGA_FIELD),
                cnpjRhGrupo = row.getString(CNPJ_RH_GRUPO_FIELD),
                cnpjRhSubgrupo = row.getString(CNPJ_RH_SUBGRUPO_FIELD),
                cnpjSolicitante = row.getString(CNPJ_SOLICITANTE_FIELD),
                cpf = row.getString(CPF_FIELD),
                dataHora = row.getTimestamp(DATA_HORA_FIELD),
                descClienteCarga = row.getString(DESC_CLIENTE_CARGA_FIELD),
                descClienteSolicitante = row.getString(DESC_CLIENTE_SOLICITANTE_FIELD),
                descProduto = row.getString(DESC_PRODUTO_FIELD),
                descStatusNf = row.getString(DESC_STATUS_NF_FIELD),
                dtAgendamentoCredito = row.getTimestamp(DT_AGENDAMENTO_CREDITO_FIELD),
                dtBaixaPagto = row.getTimestamp(DT_BAIXA_PAGTO_FIELD),
                dtCancelamento = row.getTimestamp(DT_CANCELAMENTO_FIELD),
                dtEmissaoTitulo = row.getTimestamp(DT_EMISSAO_TITULO_FIELD),
                dtEntradaPedido = row.getTimestamp(DT_ENTRADA_PEDIDO_FIELD),
                dtLiberacaoCredito = row.getTimestamp(DT_LIBERACAO_CREDITO_FIELD),
                dtPagtoPedido = row.getTimestamp(DT_PAGTO_PEDIDO_FIELD),
                dtVenctoCobranca = row.getDate(DT_VENCTO_COBRANCA_FIELD)?.millisSinceEpoch?.let { Date(it) },
                idArquivo = row.getInt(ID_ARQUIVO_FIELD),
                idBoletoPedido = row.getInt(ID_BOLETO_PEDIDO_FIELD),
                idCarga = row.getInt(ID_CARGA_FIELD),
                idPortador = row.getInt(ID_PORTADOR_FIELD),
                nmGrupo = row.getString(NM_GRUPO_FIELD),
                nmSubGrupo = row.getString(NM_SUB_GRUPO_FIELD),
                nomePortador = row.getString(NOME_PORTADOR_FIELD),
                numeroNf = row.getString(NUMERO_NF_FIELD),
                statusCarga = row.getString(STATUS_CARGA_FIELD),
                tipoBoleto = row.getString(TIPO_BOLETO_FIELD),
                tipoPagto = row.getString(TIPO_PAGTO_FIELD),
                tipoRecebimento = row.getString(TIPO_RECEBIMENTO_FIELD),
                vlCargaPortador = row.getDecimal(VL_CARGA_PORTADOR_FIELD),
                vlTotalEsperadoGrupo = row.getDecimal(VL_TOTAL_ESPERADO_GRUPO_FIELD),
                vlTotalProcessadoGrupo = row.getDecimal(VL_TOTAL_PROCESSADO_GRUPO_FIELD)
        )

    }

    private fun convertRowToAutorizacao(row: Row): Autorizacao {
        return Autorizacao(idAutorizacao = row.getInt(ID_AUTORIZACAO_FIELD),
                cartao = row.getString(CARTAO_FIELD),
                cdAutorizacao = row.getString(CD_AUTORIZACAO_FIELD),
                cdBanco = row.getShort(CD_BANCO_FIELD),
                cdBin = row.getInt(CD_BIN_FIELD),
                cdBinAdquirente = row.getString(CD_BIN_ADQUIRENTE_FIELD),
                cdProduto = row.getShort(CD_PRODUTO_FIELD),
                cdRetorno = row.getString(CD_RETORNO_FIELD),
                cnpjEstabelecimento = row.getString(CNPJ_ESTABELECIMENTO_FIELD),
                cpfPortador = row.getString(CPF_PORTADOR_FIELD),
                dataHora = row.getTimestamp(DATA_HORA_FIELD),
                dcBinAdquirente = row.getString(DC_BIN_ADQUIRENTE_FIELD),
                dcModoEntrada = row.getString(DC_MODO_ENTRADA_FIELD),
                dcProduto = row.getString(DC_PRODUTO_FIELD),
                dcRetorno = row.getString(DC_RETORNO_FIELD),
                dcTecnologia = row.getString(DC_TECNOLOGIA_FIELD),
                dcTerminal = row.getString(DC_TERMINAL_FIELD),
                dcTipoTransacao = row.getString(DC_TIPO_TRANSACAO_FIELD),
                dcTransNeg = row.getString(DC_TRANS_NEG_FIELD),
                dcStatus = row.getString(DC_STATUS_FLIED),
                dtAutorizacao = row.getTimestamp(DT_AUTORIZACAO_FIELD),
                dtTransacao = row.getTimestamp(DT_TRANSACAO_FIELD),
                idCartao = row.getInt(ID_CARTAO_FIELD),
                idCompra = row.getInt(ID_COMPRA_FIELD),
                idEstabelecimento = row.getString(ID_ESTABELECIMENTO_FIELD),
                idPortador = row.getInt(ID_PORTADOR_FIELD),
                nmEstabelecimento = row.getString(NM_ESTABELECIMENTO_FIELD),
                nmEstabelecimentoAutorizacao = row.getString(NM_ESTABELECIMENTO_AUTORIZACAO_FIELD),
                nomePortador = row.getString(NOME_PORTADOR_FIELD),
                nuNsu = row.getInt(NU_NSU_FIELD),
                tpModoEntrada = row.getString(TP_MODO_ENTRADA_FIELD),
                tpTransacao = row.getString(TP_TRANSACAO_FIELD),
                vlAutorizacao = row.getDecimal(VL_AUTORIZACAO_FIELD),
                vlBruto = row.getDecimal(VL_BRUTO_FIELD)
        )
    }

    private fun convertRowToAjuste(row: Row): Ajuste {
        return Ajuste(idAjuste = row.getInt(ID_AJUSTE_FIELD),
                cdAjuste = row.getInt(CD_AJUSTE_FIELD),
                cdEstabelecimentoComercial = row.getInt(CD_ESTABELECIMENTO_COMERCIAL_FIELD),
                cdPortador = row.getInt(CD_PORTADOR_FIELD),
                cdProduto = row.getShort(CD_PRODUTO_FIELD),
                cdTransacao = row.getInt(CD_TRANSACAO_FIELD),
                cpf = row.getString(CPF_FIELD),
                dataHora = row.getTimestamp(DATA_HORA_FIELD),
                dcAdquirente = row.getString(DC_ADQUIRENTE_FIELD),
                dcEstabelecimentoComercial = row.getString(DC_ESTABELECIMENTO_COMERCIAL_FIELD),
                dcMotivoAjuste = row.getString(DC_MOTIVO_AJUSTE_FIELD),
                dcPortador = row.getString(DC_PORTADOR_FIELD),
                dtGeracaoAjuste = row.getTimestamp(DT_GERACAO_AJUSTE_FIELD),
                dtTransacao = row.getTimestamp(DT_TRANSACAO_FIELD),
                nmSetupContabil = row.getInt(NM_SETUP_CONTABIL_FIELD),
                vlCreditoAjuste = row.getDecimal(VL_CREDITO_AJUSTE_FIELD),
                vlDebitoAjuste = row.getDecimal(VL_DEBITO_AJUSTE_FIELD),
                vlTransacao = row.getDecimal(VL_TRANSACAO_FIELD)
        )

    }

    private fun convertRowToAgendamentoPedido(row: Row): AgendamentoPedido {
        return AgendamentoPedido(
                idPedidoBoleto = row.getInt(ID_BOLETO_AGENDAMENTO_PEDIDO_FIELD),
                dataEmissaoTitulo = row.getTimestamp(DT_EMISSAO_TITULO_AGENDAMENTO_PEDIDO_FIELD),
                cnpjSolicitante = row.getString(CNPJ_SOLICITANTE_AGENDAMENTO_PEDIDO_FIELD),
                descricaoClienteSolicitante = row.getString(DESC_CLIENTE_SOLICITANTE_AGENDAMENTO_PEDIDO_FIELD),
                cdClienteRhSolic = row.getInt(CD_CLIENTE_RH_SOLIC_AGENDAMENTO_PEDIDO_FIELD),
                tipoBoleto = row.getString(TIPO_BOLETO_AGENDAMENTO_PEDIDO_FIELD),
                nossoNumero = row.getString(NOSSO_NUMERO_AGENDAMENTO_PEDIDO_FIELD),
                tipoRecebimento = row.getString(TIPO_RECEBIMENTO_AGENDAMENTO_PEDIDO_FIELD),
                dataEntradaPedido = row.getTimestamp(DT_ENTRADA_AGENDAMENTO_PEDIDO_FIELD),
                dataLiberacaoPedido = row.getTimestamp(DT_LIBERACAO_PEDIDO_AGENDAMENTO_PEDIDO_FIELD),
                dataVenciementoCobranca = row.getTimestamp(DT_VENCTO_COBRANCA_AGENDAMENTO_PEDIDO_FIELD),
                statusCarga = row.getString(STATUS_CARGA_AGENDAMENTO_PEDIDO_FIELD),
                valorCarga = row.getDecimal(VL_CARGA_AGENDAMENTO_PEDIDO_FIELD),
                valorCredidtoUtilizado = row.getDecimal(VL_CARGA_UTILIZADO_AGENDAMENTO_PEDIDO_FIELD),
                valorCobranca = row.getDecimal(VL_COBRANCA_AGENDAMENTO_PEDIDO_FIELD),
                idArquivo = row.getInt(ID_ARQUIVO_AGENDAMENTO_PEDIDO_FIELD),
                codigoCargaControleFinanceiro = row.getInt(CD_CARGA_CONTROLE_FINANCEIRO_AGENDAMENTO_PEDIDO_FIELD),
                statusCargamaceficio = row.getInt(STATUS_CARGA_macEFICIO_AGENDAMENTO_PEDIDO_FIELD),
                statusEmpresaCargaDetalheProduto = row.getInt(STATUS_EMP_CARGA_DET_PROD_AGE_PEDIDO_FIELD),
                tipoBandeira = row.getString(TIPO_BANDEIRA_AGENDAMENTO_PEDIDO_FIELD)
        )

    }

    private fun convertRowToContaVirtual(row: Row): ContaVirtual {
        return ContaVirtual(
                idBoleto = row.getInt(ID_BOLETO_CONTAVIRTUAL_FIELD),
                dataHora = row.getTimestamp(DT_HORA_CONTAVIRTUAL_FIELD)
                        ?.toInstant()
                        ?.atZone(ZoneId.systemDefault())
                        ?.toLocalDateTime(),
                cnpjCarga = row.getString(CNPJ_CARGA_CONTAVIRTUAL_FIELD),
                descricaoClienteCarga = row.getString(DESC_CLIENTE_CARGA_CONTAVIRTUAL_FIELD),
                idPedido = row.getInt(CD_PEDIDO_CONTAVIRTUAL_FIELD),
                idTipoAjuste = row.getInt(CD_TIPO_AJUSTE_CONTAVIRTUAL_FIELD),
                idTipoRegistro = row.getString(CD_TIPO_REGISTRO_CONTAVIRTUAL_FIELD),
                tipoOperacao = row.getString(TIPO_OPERACAO_CONTAVIRTUAL_FIELD)
        )

    }
}
