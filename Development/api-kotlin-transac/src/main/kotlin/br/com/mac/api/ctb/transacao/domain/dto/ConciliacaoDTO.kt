package br.com.mac.api.ctb.transacao.domain.dto

import br.com.mac.api.ctb.transacao.constant.DATE_FORMAT_VALIDATOR_MESSAGE
import br.com.mac.api.ctb.transacao.constant.REGEX_DATE_FORMAT_VALIDATOR
import br.com.mac.api.ctb.transacao.exception.DateInvalidFormatException
import br.com.mac.api.ctb.transacao.exception.DateIsNullOrEmptyException
import br.com.mac.api.ctb.transacao.validator.ValidPontoDeControle
import br.com.mac.ctb.enum.PontoDeControle
import com.fasterxml.jackson.annotation.JsonIgnoreProperties
import io.swagger.annotations.ApiParam
import java.util.regex.Pattern

@JsonIgnoreProperties(ignoreUnknown = true)
class ConciliacaoDTO {

    @ApiParam(hidden = true)
    @ValidPontoDeControle(enumClass = PontoDeControle::class)
    var controle: String? = null

    @ApiParam(hidden = true)
    var periodo: Int? = null

    @ApiParam(hidden = true)
    var dataInclusao: String? = null
        set(value) {
            value?.let { validateInclusionDate(value, ::dataInclusao.name) }
            field = value
        }

    constructor(controle: String?, periodo: Int?, dataInclusao: String?) {
        this.controle = controle
        this.periodo = periodo
        this.dataInclusao = dataInclusao
    }

    constructor()

    @Throws(DateInvalidFormatException::class, DateIsNullOrEmptyException::class)
    private fun validateInclusionDate(value: String, propertyName: String) {

        when {
            (value.isBlank() or value.isEmpty()) ->
                throw DateIsNullOrEmptyException("Parâmetro $propertyName é obrigatório")
            !Pattern.compile(REGEX_DATE_FORMAT_VALIDATOR).matcher(value).matches() ->
                throw DateInvalidFormatException(DATE_FORMAT_VALIDATOR_MESSAGE)
        }
    }


}
