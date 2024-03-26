package br.com.mac.api.ctb.transacao.domain.model

import br.com.mac.api.ctb.transacao.constant.DATE_TIME_PATTERN
import br.com.mac.api.ctb.transacao.domain.dto.TransacaoContabilDTO
import br.com.mac.ctb.entity.TransacaoContabilEntity
import java.math.BigDecimal
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter
import java.util.*

data class TransacaoContabil(

        var codigoTransacao: UUID? = null,
        var ledger: String? = null,
        var dataInclusao: LocalDateTime? = null,
        var codigoEvento: Int? = null,
        var tipoEvento: String? = null,
        var codigoTransacaoAnterior: UUID? = null,
        var dataEvento: LocalDateTime? = null,
        var valor: BigDecimal? = null,
        var saldo: BigDecimal? = null,
        var saldoAnterior: BigDecimal? = null,
        var tipoOperacao: String? = null,
        var totalCreditoDia: BigDecimal? = null,
        var totalCreditoMes: BigDecimal? = null,
        var totalCreditoAno: BigDecimal? = null

) {
    constructor(transacaoContabilEntity: TransacaoContabilEntity) : this() {
        codigoTransacao = transacaoContabilEntity.transacaoContabilKey?.codigoTransacao
        ledger = transacaoContabilEntity.transacaoContabilKey?.ledger
        dataInclusao = transacaoContabilEntity.transacaoContabilKey?.dataInclusao
        codigoEvento = transacaoContabilEntity.codigoEvento
        tipoEvento = transacaoContabilEntity.tipoEvento
        codigoTransacaoAnterior = transacaoContabilEntity.codigoTransacaoAnterior
        dataEvento = transacaoContabilEntity.dataEvento
        valor = transacaoContabilEntity.valor
        saldo = transacaoContabilEntity.saldo
        saldoAnterior = transacaoContabilEntity.saldoAnterior
        tipoOperacao = transacaoContabilEntity.tipoOperacao
        totalCreditoDia = transacaoContabilEntity.totalCreditoDia
        totalCreditoMes = transacaoContabilEntity.totalCreditoMes
        totalCreditoAno = transacaoContabilEntity.totalCreditoAno    }
}

fun TransacaoContabil.toDto() = TransacaoContabilDTO(
        codigoTransacao = this.codigoTransacao,
        ledger = this.ledger,
        dataInclusao = this.dataInclusao?.let { it.format(DateTimeFormatter.ofPattern(DATE_TIME_PATTERN)) },
        codigoEvento = this.codigoEvento,
        tipoEvento = this.tipoEvento,
        codigoTransacaoAnterior = this.codigoTransacaoAnterior,
        dataEvento = this.dataEvento?.let { it.format(DateTimeFormatter.ofPattern(DATE_TIME_PATTERN)) },
        valor = this.valor,
        saldo = this.saldo,
        saldoAnterior = this.saldoAnterior,
        tipoOperacao = this.tipoOperacao,
        totalCreditoDia = this.totalCreditoDia,
        totalCreditoMes = this.totalCreditoMes,
        totalCreditoAno = this.totalCreditoAno
)
