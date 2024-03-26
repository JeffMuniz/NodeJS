package br.com.mac.api.ctb.transacao.domain.dto

import br.com.mac.api.ctb.transacao.domain.model.ValorField
import java.math.BigDecimal

data class ValorFieldDTO(
        var data: String? = null,
        var valor: BigDecimal? = null
) {
    constructor(valorField: ValorField) : this() {
        this.data = valorField.data
        this.valor = valorField.valor
    }
}
