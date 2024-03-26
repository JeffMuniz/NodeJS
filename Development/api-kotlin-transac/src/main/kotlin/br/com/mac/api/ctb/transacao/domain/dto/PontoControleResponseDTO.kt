package br.com.mac.api.ctb.transacao.domain.dto

import br.com.mac.ctb.enum.TipoPeriodo
import com.fasterxml.jackson.annotation.JsonIgnoreProperties
import com.fasterxml.jackson.annotation.JsonInclude
import java.math.BigDecimal

data class PontoControleResponseDTO(val controle: PontoControleDTO)

@JsonIgnoreProperties(ignoreUnknown = true)
data class PontoControleDTO(
        var nome: String? = null,
        var campoAtuacao: String? = null,
        var tipoPeriodo: TipoPeriodo? = null,
        var ledgers: List<PontoControleLedgerDTO>? = arrayListOf(),
        var suporte: PontoControleLedgerDTO? = null,
        var periodoAnterior: PontoControleLedgerDTO? = null,
        var resultadoPeriodo: PontoControleLedgerDTO? = null,
        var diferenca: PontoControleLedgerDTO? = null,
        var saldoOperacional: BigDecimal? = null,
        var saldoSuporte: BigDecimal? = null,
        var diferencaOperacional: BigDecimal? = null
)
