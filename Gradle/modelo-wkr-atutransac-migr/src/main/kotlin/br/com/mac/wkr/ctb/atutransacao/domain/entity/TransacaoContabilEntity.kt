package br.com.mac.wkr.ctb.atutransacao.domain.entity

import br.com.mac.wkr.ctb.atutransacao.domain.model.TransacaoContabil
import org.springframework.data.cassandra.core.mapping.Column
import org.springframework.data.cassandra.core.mapping.PrimaryKey
import org.springframework.data.cassandra.core.mapping.Table
import java.math.BigDecimal
import java.util.Date
import java.util.UUID

@Table(value = "transacao_contabil")
data class TransacaoContabilEntity(

        @PrimaryKey
        val transacaoContabilKey: TransacaoContabilKey? = null,

        @Column(value = "cd_evento")
        val codigoEvento: Int? = null,

        @Column(value = "tp_evento")
        val tipoEvento: String? = null,

        @Column(value = "cd_transacao_anterior")
        val codigoTransacaoAnterior: UUID? = null,

        @Column(value = "dt_evento")
        val dataEvento: Date? = null,

        @Column(value = "tx_valor")
        val valor: BigDecimal? = null,

        @Column(value = "tx_saldo")
        val saldo: BigDecimal? = null,

        @Column(value = "tx_saldo_anterior")
        val saldoAnterior: BigDecimal? = null,

        @Column(value = "tp_operacao")
        val tipoOperacao: String? = null,

        @Column(value = "tx_total_credito_dia")
        val totalCreditoDia: BigDecimal? = null,

        @Column(value = "tx_total_credito_mes")
        val totalCreditoMes: BigDecimal? = null,

        @Column(value = "tx_total_credito_ano")
        val totalCreditoAno: BigDecimal? = null
) {
    constructor(transacaoContabil: TransacaoContabil) : this(
            transacaoContabilKey = TransacaoContabilKey(
                    codigoTransacao = transacaoContabil.codigoTransacao,
                    ledger = transacaoContabil.ledger,
                    dataInclusao = transacaoContabil.dataInclusao),
            codigoEvento = transacaoContabil.codigoEvento,
            tipoEvento = transacaoContabil.tipoEvento,
            codigoTransacaoAnterior = transacaoContabil.codigoTransacaoAnterior,
            dataEvento = transacaoContabil.dataEvento,
            valor = transacaoContabil.valor,
            tipoOperacao = transacaoContabil.tipoOperacao?.name,
            saldo = transacaoContabil.saldo,
            saldoAnterior = transacaoContabil.saldoAnterior,
            totalCreditoDia = transacaoContabil.totalCreditoDia,
            totalCreditoMes = transacaoContabil.totalCreditoMes,
            totalCreditoAno = transacaoContabil.totalCreditoAno
    )
}

