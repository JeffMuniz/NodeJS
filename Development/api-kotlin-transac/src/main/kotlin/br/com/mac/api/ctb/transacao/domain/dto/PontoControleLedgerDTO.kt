package br.com.mac.api.ctb.transacao.domain.dto

import com.fasterxml.jackson.annotation.JsonIgnoreProperties
import com.fasterxml.jackson.annotation.JsonInclude
import java.math.BigDecimal

@JsonIgnoreProperties(ignoreUnknown = true)
data class PontoControleLedgerDTO(
        var ledger: String? = null,
        var tipoLedger: String? = null,
        var dataInclusao: String? = null,
        var valor: BigDecimal? = null,
        var saldo: BigDecimal? = null,
        var totalCredito: BigDecimal? = null
)
