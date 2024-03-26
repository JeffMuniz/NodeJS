package br.com.mac.api.ctb.transacao.domain.dto

import com.fasterxml.jackson.annotation.JsonFormat
import com.fasterxml.jackson.annotation.JsonInclude
import java.math.BigDecimal
import java.time.LocalDateTime
import java.util.*

data class AjusteResponseDTO(
        var idAjuste: Int? = null,
        var cdAjuste: Int? = null,
        var cdEstabelecimentoComercial: Int? = null,
        var cdPortador: Int? = null,
        var cdProduto: Short? = null,
        var cdTransacao: Int? = null,
        var cpf: String? = null,
        @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss.SSS",
                shape = JsonFormat.Shape.STRING,
                locale = "pt-BR",
                timezone = "Brazil/East")
        var dataHora: String? = null,
        var dcAdquirente: String? = null,
        var dcEstabelecimentoComercial: String? = null,
        var dcMotivoAjuste: String? = null,
        var dcPortador: String? = null,
        @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss.SSS",
                shape = JsonFormat.Shape.STRING,
                locale = "pt-BR",
                timezone = "Brazil/East")
        var dtGeracaoAjuste: String? = null,
        @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss.SSS",
                shape = JsonFormat.Shape.STRING,
                locale = "pt-BR",
                timezone = "Brazil/East")
        var dtTransacao: String? = null,
        var nmSetupContabil: Int? = null,
        var vlCreditoAjuste: BigDecimal? = null,
        var vlDebitoAjuste: BigDecimal? = null,
        var vlTransacao: BigDecimal? = null,
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
