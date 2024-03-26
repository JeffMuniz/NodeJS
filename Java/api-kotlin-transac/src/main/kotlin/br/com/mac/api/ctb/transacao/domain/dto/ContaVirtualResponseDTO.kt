package br.com.mac.api.ctb.transacao.domain.dto

import com.fasterxml.jackson.annotation.JsonFormat
import com.fasterxml.jackson.annotation.JsonInclude
import java.math.BigDecimal
import java.time.LocalDateTime
import java.util.*

data class ContaVirtualResponseDTO(

        var idBoleto: Int? = null,
        var cnpjCarga: String? = null,
        var dataHora: String? = null,
        var descricaoClienteCarga: String? = null,
        var idPedido: Int? = null,
        var idTipoAjuste: Int? = null,
        var idTipoRegistro: String? = null,
        // Transacao (sempre igual)
        var codigoTransacao: UUID? = null,
        val ledger: String? = null,
        @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss.SSS",
                shape = JsonFormat.Shape.STRING,
                locale = "pt-BR",
                timezone = "Brazil/East")
        val dataInclusao: String? = null,
        val codigoEvento: Int? = null,
        val tipoEvento: String? = null,
        val codigoTransacaoAnterior: UUID? = null,
        @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss.SSS",
                shape = JsonFormat.Shape.STRING,
                locale = "pt-BR",
                timezone = "Brazil/East")
        val dataEvento: String? = null,
        val valor: BigDecimal? = null,
        val saldo: BigDecimal? = null,
        val saldoAnterior: BigDecimal? = null,
        val tipoOperacao: String? = null
)
