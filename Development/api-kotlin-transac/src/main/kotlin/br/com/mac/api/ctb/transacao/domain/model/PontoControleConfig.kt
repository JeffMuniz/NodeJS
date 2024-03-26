package br.com.mac.api.ctb.transacao.domain.model

class PontoControleConfig(
        val controle: String,
        val ledgersCredito: List<String>,
        val ledgersDebito: List<String>,
        val ledgerSuporte: String,
        val campoAtuacao: String
)
