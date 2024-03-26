package br.com.mac.api.ctb.transacao.domain.model

import br.com.mac.api.ctb.transacao.constant.DATE_TIME_PATTERN
import br.com.mac.api.ctb.transacao.domain.dto.PontoControleLedgerDTO
import java.math.BigDecimal
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter

data class PontoControleLedger(
        var ledger: String? = null,
        var tipoLedger: String? = null,
        var dataInclusao: LocalDateTime? = null,
        var valor: BigDecimal? = null,
        var saldo: BigDecimal? = null,
        var totalCredito: BigDecimal? = null
)

fun PontoControleLedger.toDto() = PontoControleLedgerDTO(
        ledger = this.ledger,
        tipoLedger = this.tipoLedger,
        dataInclusao = this.dataInclusao?.let { it.format(DateTimeFormatter.ofPattern(DATE_TIME_PATTERN)) },
        valor = this.valor,
        saldo = this.saldo,
        totalCredito = this.totalCredito
)
