package br.com.mac.api.ctb.transacao.exception

data class ErrorResponse(val mensagem: String, val erros: List<Error>)


data class Error(val codigo: Int, val mensagem: String)
