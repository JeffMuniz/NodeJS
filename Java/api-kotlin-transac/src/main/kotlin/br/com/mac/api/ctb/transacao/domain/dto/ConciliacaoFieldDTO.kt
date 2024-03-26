package br.com.mac.api.ctb.transacao.domain.dto

import br.com.mac.api.ctb.transacao.domain.model.ConciliacaoField

data class ConciliacaoFieldDTO(
        var descricaoCampo: String? = null,
        var descricaoTipoMovimento: String? = null,
        var valores: List<ValorFieldDTO> = arrayListOf(),
        var downloadUri: String? = null
) {
    constructor(conciliacaoField: ConciliacaoField) : this() {
        this.descricaoCampo = conciliacaoField.descricaoCampo
        this.descricaoTipoMovimento = conciliacaoField.descricaoTipoMovimento
        this.valores = conciliacaoField.valores.map { ValorFieldDTO(it) }
        this.downloadUri = conciliacaoField.downloadUri
    }
}

