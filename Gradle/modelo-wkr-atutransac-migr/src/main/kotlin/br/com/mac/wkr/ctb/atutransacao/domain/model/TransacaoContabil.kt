package br.com.mac.wkr.ctb.atutransacao.domain.model

import br.com.mac.wkr.ctb.atutransacao.domain.entity.TransacaoContabilEntity
import br.com.mac.wkr.ctb.atutransacao.domain.enum.TipoOperacao
import java.math.BigDecimal
import java.util.Date
import java.util.UUID

data class TransacaoContabil(
        var codigoTransacao: UUID? = null,
        var codigoTransacaoAnterior: UUID? = null,
        val codigoEvento: Int? = null,
        val tipoEvento: String? = null,
        val dataEvento: Date? = null,
        val valor: BigDecimal? = null,
        val tipoOperacao: TipoOperacao? = null,
        val ledger: String? = null,
        var dataInclusao: Date? = null,
        var saldo: BigDecimal? = null,
        var saldoAnterior: BigDecimal? = null,
        var totalCreditoDia: BigDecimal? = null,
        var totalCreditoMes: BigDecimal? = null,
        var totalCreditoAno: BigDecimal? = null
) {

    constructor(transacaoContabilEntity: TransacaoContabilEntity) : this(
            codigoTransacao = transacaoContabilEntity.transacaoContabilKey?.codigoTransacao,
            codigoTransacaoAnterior = transacaoContabilEntity.codigoTransacaoAnterior,
            codigoEvento = transacaoContabilEntity.codigoEvento,
            tipoEvento = transacaoContabilEntity.tipoEvento,
            dataEvento = transacaoContabilEntity.dataEvento,
            valor = transacaoContabilEntity.valor,
            tipoOperacao = transacaoContabilEntity.tipoOperacao?.let { TipoOperacao.valueOf(it) },
            ledger = transacaoContabilEntity.transacaoContabilKey?.ledger,
            dataInclusao = transacaoContabilEntity.transacaoContabilKey?.dataInclusao,
            saldo = transacaoContabilEntity.saldo,
            saldoAnterior = transacaoContabilEntity.saldoAnterior,
            totalCreditoDia = transacaoContabilEntity.totalCreditoDia,
            totalCreditoMes = transacaoContabilEntity.totalCreditoMes,
            totalCreditoAno = transacaoContabilEntity.totalCreditoAno
    )

}
