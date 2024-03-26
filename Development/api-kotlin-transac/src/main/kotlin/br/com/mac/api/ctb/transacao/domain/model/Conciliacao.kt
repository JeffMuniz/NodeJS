package br.com.mac.api.ctb.transacao.domain.model

import java.math.BigDecimal
import java.util.LinkedList

data class Conciliacao(
        var controle: String,
        var datas: LinkedList<String> = LinkedList(mutableListOf()),
        var estoqueInicial: ConciliacaoField,
        var entradas: Map<String, ConciliacaoField>,
        var saidas: Map<String, ConciliacaoField>,
        var estoqueFinal: ConciliacaoField,
        var suporte: ConciliacaoField,
        var diferencaMovimento: ConciliacaoField
)

data class ConciliacaoField(
        var descricaoCampo: String? = null,
        var descricaoTipoMovimento: String? = null,
        var valores: LinkedList<ValorField> = LinkedList(mutableListOf()),
        var downloadUri: String? = null
)

data class ValorField(
        var data: String? = null,
        var valor: BigDecimal? = null
)
