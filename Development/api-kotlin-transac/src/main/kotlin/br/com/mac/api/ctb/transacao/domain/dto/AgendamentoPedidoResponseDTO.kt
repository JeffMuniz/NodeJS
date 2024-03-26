package br.com.mac.api.ctb.transacao.domain.dto

import com.fasterxml.jackson.annotation.JsonFormat
import com.fasterxml.jackson.annotation.JsonInclude
import java.math.BigDecimal
import java.time.LocalDateTime
import java.util.*

data class AgendamentoPedidoResponseDTO(

        var idPedidoBoleto: Int? = null,
        @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss.SSS",
                shape = JsonFormat.Shape.STRING,
                locale = "pt-BR",
                timezone = "Brazil/East")
        var dataEmissaoTitulo: String? = null,
        var cnpjSolicitante: String? = null,
        var descricaoClienteSolicitante: String? = null,
        var cdClienteRhSolic: Int? = null,
        var tipoBoleto: String? = null,
        var nossoNumero: String? = null,
        var tipoRecebimento: String? = null,
        @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss.SSS",
                shape = JsonFormat.Shape.STRING,
                locale = "pt-BR",
                timezone = "Brazil/East")
        var dataEntradaPedido: String? = null,
        @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss.SSS",
                shape = JsonFormat.Shape.STRING,
                locale = "pt-BR",
                timezone = "Brazil/East")
        var dataLiberacaoPedido: String? = null,
        @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss.SSS",
                shape = JsonFormat.Shape.STRING,
                locale = "pt-BR",
                timezone = "Brazil/East")
        var dataVenciementoCobranca: String? = null,
        var statusCarga: String? = null,
        var valorCarga: BigDecimal? = null,
        var valorCredidtoUtilizado: BigDecimal? = null,
        var valorCobranca: BigDecimal? = null,
        var idArquivo: Int? = null,
        var codigoCargaControleFinanceiro: Int? = null,
        var statusCargamaceficio: Int? = null,
        var statusEmpresaCargaDetalheProduto: Int? = null,
        var tipoBandeira: String? = null,
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
