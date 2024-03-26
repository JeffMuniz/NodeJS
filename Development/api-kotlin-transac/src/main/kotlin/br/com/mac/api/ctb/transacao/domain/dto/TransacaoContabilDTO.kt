package br.com.mac.api.ctb.transacao.domain.dto

import br.com.mac.api.ctb.transacao.constant.DATETIME_FORMAT_VALIDATOR_MESSAGE
import br.com.mac.api.ctb.transacao.constant.REGEX_DATETIME_FORMAT_VALIDATOR
import br.com.mac.ctb.enum.TipoOperacao
import br.com.mac.api.ctb.transacao.exception.DateInvalidFormatException
import br.com.mac.api.ctb.transacao.exception.DateIsNullOrEmptyException
import br.com.mac.api.ctb.transacao.validator.ValidTipoOperacao
import com.fasterxml.jackson.annotation.JsonIgnoreProperties
import com.fasterxml.jackson.annotation.JsonInclude
import io.swagger.annotations.ApiParam
import java.math.BigDecimal
import java.util.regex.Pattern
import java.util.UUID

@JsonIgnoreProperties(ignoreUnknown = true)
class TransacaoContabilDTO {

    @ApiParam(hidden = true)
    var codigoTransacao: UUID? = null

    @ApiParam(hidden = true)
    var ledger: String? = null

    @ApiParam(hidden = true)
    var dataInclusao: String? = null
        set(value) {
            value?.let { validateInclusionDate(value, ::dataInclusao.name) }
            field = value
        }

    @ApiParam(hidden = true)
    var codigoEvento: Int? = null

    @ApiParam(hidden = true)
    var tipoEvento: String? = null

    @ApiParam(hidden = true)
    var codigoTransacaoAnterior: UUID? = null

    @ApiParam(hidden = true)
    var dataEvento: String? = null

    @ApiParam(hidden = true)
    var valor: BigDecimal? = null

    @ApiParam(hidden = true)
    var saldo: BigDecimal? = null

    @ApiParam(hidden = true)
    var saldoAnterior: BigDecimal? = null

    @field:ValidTipoOperacao(enumClass = TipoOperacao::class)
    @ApiParam(hidden = true)
    var tipoOperacao: String? = null

    @ApiParam(hidden = true)
    var dataInicial: String? = null
        set(value) {
            value?.let { validateInclusionDate(value, ::dataInicial.name) }
            field = value
        }

    @ApiParam(hidden = true)
    var dataFinal: String? = null
        set(value) {
            value?.let { validateInclusionDate(value, ::dataFinal.name) }
            field = value
        }

    @ApiParam(hidden = true)
    var totalCreditoDia: BigDecimal? = null

    @ApiParam(hidden = true)
    var totalCreditoMes: BigDecimal? = null

    @ApiParam(hidden = true)
    var totalCreditoAno: BigDecimal? = null

    constructor(codigoTransacao: UUID?, ledger: String?, dataInclusao: String?, codigoEvento: Int?, tipoEvento: String?,
                codigoTransacaoAnterior: UUID?, dataEvento: String?, valor: BigDecimal?, saldo: BigDecimal?,
                saldoAnterior: BigDecimal?, tipoOperacao: String?, dataInicial: String? = null,
                dataFinal: String? = null, totalCreditoDia: BigDecimal?, totalCreditoMes: BigDecimal?,
                totalCreditoAno: BigDecimal?) {
        this.codigoTransacao = codigoTransacao
        this.ledger = ledger
        this.dataInclusao = dataInclusao
        this.codigoEvento = codigoEvento
        this.tipoEvento = tipoEvento
        this.codigoTransacaoAnterior = codigoTransacaoAnterior
        this.dataEvento = dataEvento
        this.valor = valor
        this.saldo = saldo
        this.saldoAnterior = saldoAnterior
        this.tipoOperacao = tipoOperacao
        this.dataInicial = dataInicial
        this.dataFinal = dataFinal
        this.totalCreditoDia = totalCreditoDia
        this.totalCreditoMes = totalCreditoMes
        this.totalCreditoAno = totalCreditoAno
    }

    constructor()

    @Throws(DateInvalidFormatException::class, DateIsNullOrEmptyException::class)
    private fun validateInclusionDate(value: String, propertyName: String) {

        when {
            (value.isBlank() or value.isEmpty()) ->
                throw DateIsNullOrEmptyException("Parâmetro $propertyName é obrigatório")
            !Pattern.compile(REGEX_DATETIME_FORMAT_VALIDATOR).matcher(value).matches() ->
                throw DateInvalidFormatException(DATETIME_FORMAT_VALIDATOR_MESSAGE)
        }
    }

}
