package br.com.mac.api.ctb.transacao.domain.dto

import br.com.mac.api.ctb.transacao.domain.model.Conciliacao
import com.fasterxml.jackson.annotation.JsonIgnoreProperties
import com.fasterxml.jackson.annotation.JsonInclude

@JsonIgnoreProperties(ignoreUnknown = true)
@JsonInclude(JsonInclude.Include.NON_EMPTY)
data class ConciliacaoResponseDTO(

        var controle: String? = null,
        var datas: List<String> = arrayListOf(),
        var estoqueInicial: ConciliacaoFieldDTO? = null,
        var entradas: List<ConciliacaoFieldDTO> = arrayListOf(),
        var saidas: List<ConciliacaoFieldDTO> = arrayListOf(),
        var estoqueFinal: ConciliacaoFieldDTO? = null,
        var suporte: ConciliacaoFieldDTO? = null,
        var diferencaMovimento: ConciliacaoFieldDTO? = null

) {
    constructor(conciliacao: Conciliacao) : this() {
        this.controle = conciliacao.controle
        this.datas = conciliacao.datas.toList()
        this.estoqueInicial = conciliacao?.estoqueInicial?.let { ConciliacaoFieldDTO(it) }
        this.entradas = conciliacao.entradas.map { entrada -> ConciliacaoFieldDTO(entrada.value) }
        this.saidas = conciliacao.saidas.map { saida -> ConciliacaoFieldDTO(saida.value) }
        this.estoqueFinal = conciliacao?.estoqueFinal?.let { ConciliacaoFieldDTO(it) }
        this.suporte = conciliacao?.suporte?.let { ConciliacaoFieldDTO(it) }
        this.diferencaMovimento = conciliacao?.diferencaMovimento?.let { ConciliacaoFieldDTO(it) }
    }
}
