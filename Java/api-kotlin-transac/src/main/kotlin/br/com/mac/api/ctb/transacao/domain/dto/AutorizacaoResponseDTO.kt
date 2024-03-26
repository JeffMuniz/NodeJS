package br.com.mac.api.ctb.transacao.domain.dto

import com.fasterxml.jackson.annotation.JsonFormat
import java.math.BigDecimal
import java.util.*

data class AutorizacaoResponseDTO(
        var idAutorizacao: Int? = null,
        var cartao: String? = null,
        var cdAutorizacao: String? = null,
        var cdBanco: Short? = null,
        var cdBin: Int? = null,
        var cdBinAdquirente: String? = null,
        var cdProduto: Short? = null,
        var cdRetorno: String? = null,
        var cnpjEstabelecimento: String? = null,
        var cpfPortador: String? = null,
        @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss.SSS",
                shape = JsonFormat.Shape.STRING,
                locale = "pt-BR",
                timezone = "Brazil/East")
        var dataHora: String? = null,
        var dcBinAdquirente: String? = null,
        var dcModoEntrada: String? = null,
        var dcProduto: String? = null,
        var dcRetorno: String? = null,
        var dcTecnologia: String? = null,
        var dcTerminal: String? = null,
        var dcTipoTransacao: String? = null,
        var dcTransNeg: String? = null,
        var dcStatus: String? = null,
        @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss.SSS",
                shape = JsonFormat.Shape.STRING,
                locale = "pt-BR",
                timezone = "Brazil/East")
        var dtAutorizacao: String? = null,
        @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss.SSS",
                shape = JsonFormat.Shape.STRING,
                locale = "pt-BR",
                timezone = "Brazil/East")
        var dtTransacao: String? = null,
        var idCartao: Int? = null,
        var idCompra: Int? = null,
        var idEstabelecimento: String? = null,
        var idPortador: Int? = null,
        var nmEstabelecimento: String? = null,
        var nmEstabelecimentoAutorizacao: String? = null,
        var nomePortador: String? = null,
        var nuNsu: Int? = null,
        var tpModoEntrada: String? = null,
        var tpTransacao: String? = null,
        var vlAutorizacao: BigDecimal? = null,
        var vlBruto: BigDecimal? = null,
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
