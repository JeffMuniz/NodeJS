package br.com.mac.api.ctb.transacao.domain.dto

import com.fasterxml.jackson.annotation.JsonIgnoreProperties
import com.fasterxml.jackson.annotation.JsonInclude
import java.math.BigDecimal

data class SaldoResponseDTO(val saldo : SaldoDTO)

@JsonIgnoreProperties(ignoreUnknown = true)
data class SaldoDTO(val ledger: String? = null, val data:  String? = null, val valor: BigDecimal? = null)
