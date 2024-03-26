package br.com.mac.api.ctb.transacao.domain.model

import br.com.mac.ctb.entity.AjusteEntity
import java.math.BigDecimal
import java.util.Date

data class Ajuste(
        var idAjuste: Int? = null,
        var cdAjuste: Int? = null,
        var cdEstabelecimentoComercial: Int? = null,
        var cdPortador: Int? = null,
        var cdProduto: Short? = null,
        var cdTransacao: Int? = null,
        var cpf: String? = null,
        var dataHora: Date? = null,
        var dcAdquirente: String? = null,
        var dcEstabelecimentoComercial: String? = null,
        var dcMotivoAjuste: String? = null,
        var dcPortador: String? = null,
        var dtGeracaoAjuste: Date? = null,
        var dtTransacao: Date? = null,
        var nmSetupContabil: Int? = null,
        var vlCreditoAjuste: BigDecimal? = null,
        var vlDebitoAjuste: BigDecimal? = null,
        var vlTransacao: BigDecimal? = null
) {
    constructor(ajusteEntity: AjusteEntity) : this() {

        idAjuste = ajusteEntity.ajusteKey?.idAjuste
        cdAjuste = ajusteEntity.cdAjuste
        cdEstabelecimentoComercial = ajusteEntity.cdEstabelecimentoComercial
        cdPortador = ajusteEntity.cdPortador
        cdProduto = ajusteEntity.cdProduto
        cdTransacao = ajusteEntity.cdTransacao
        cpf = ajusteEntity.cpf
        dataHora = ajusteEntity.dataHora
        dcAdquirente = ajusteEntity.dcAdquirente
        dcEstabelecimentoComercial = ajusteEntity.dcEstabelecimentoComercial
        dcMotivoAjuste = ajusteEntity.dcMotivoAjuste
        dcPortador = ajusteEntity.dcPortador
        dtGeracaoAjuste = ajusteEntity.dtGeracaoAjuste
        dtTransacao = ajusteEntity.dtTransacao
        nmSetupContabil = ajusteEntity.nmSetupContabil
        vlCreditoAjuste = ajusteEntity.vlCreditoAjuste
        vlDebitoAjuste = ajusteEntity.vlDebitoAjuste
        vlTransacao = ajusteEntity.vlTransacao
    }
}
