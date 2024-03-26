package br.com.mac.api.ctb.transacao.domain.model

import java.time.LocalDateTime
import br.com.mac.ctb.entity.ContaVirtualEntity

data class ContaVirtual(
        var idBoleto: Int? = null,
        var cnpjCarga: String? = null,
        var dataHora: LocalDateTime? = null,
        var tipoOperacao: String? = null,
        var descricaoClienteCarga: String? = null,
        var idPedido: Int? = null,
        var idTipoAjuste: Int? = null,
        var idTipoRegistro: String? = null
) {

    constructor(contaVirtualEntity: ContaVirtualEntity) : this() {

        idBoleto = contaVirtualEntity.contaVirtualKey?.id
        cnpjCarga = contaVirtualEntity.cnpjCarga
        dataHora = contaVirtualEntity.dataHora
        tipoOperacao = contaVirtualEntity.tipoOperacao
        descricaoClienteCarga = contaVirtualEntity.descricaoClienteCarga
        idPedido = contaVirtualEntity.idPedido
        idTipoAjuste = contaVirtualEntity.idTipoAjuste
        idTipoRegistro = contaVirtualEntity.idTipoRegistro
    }
}
