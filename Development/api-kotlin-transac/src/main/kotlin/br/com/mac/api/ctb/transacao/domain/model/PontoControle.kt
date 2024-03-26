package br.com.mac.api.ctb.transacao.domain.model

import br.com.mac.ctb.enum.TipoPeriodo
import java.math.BigDecimal

data class PontoControle(
        var controle: String? = null,
        var campoAtuacao: String? = null,
        var tipoPeriodo: TipoPeriodo? = null,
        var ledgers: List<PontoControleLedger>? = arrayListOf(),
        var suporte: PontoControleLedger? = null,
        var periodoAnterior: PontoControleLedger? = null,
        var resultadoPeriodo: PontoControleLedger? = null,
        var diferenca: PontoControleLedger? = null,
        var saldoOperacional: BigDecimal? = null,
        var saldoSuporte: BigDecimal? = null,
        var diferencaOperacional: BigDecimal? = null
)
