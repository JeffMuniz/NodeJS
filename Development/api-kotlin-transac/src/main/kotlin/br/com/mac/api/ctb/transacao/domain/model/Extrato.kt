package br.com.mac.api.ctb.transacao.domain.model

interface Extrato {

    var transacaoContabil: TransacaoContabil

    fun toResponseDTO() : Any
}


