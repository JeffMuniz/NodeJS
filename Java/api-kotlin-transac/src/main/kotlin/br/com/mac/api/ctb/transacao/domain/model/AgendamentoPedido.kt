package br.com.mac.api.ctb.transacao.domain.model

import br.com.mac.ctb.entity.AgendamentoPedidoEntity
import java.math.BigDecimal
import java.util.Date

data class AgendamentoPedido(
        var idPedidoBoleto: Int? = null,
        var dataEmissaoTitulo: Date? = null,
        var cnpjSolicitante: String? = null,
        var descricaoClienteSolicitante: String? = null,
        var cdClienteRhSolic: Int? = null,
        var tipoBoleto: String? = null,
        var nossoNumero: String? = null,
        var tipoRecebimento: String? = null,
        var dataEntradaPedido: Date? = null,
        var dataLiberacaoPedido: Date? = null,
        var dataVenciementoCobranca: Date? = null,
        var statusCarga: String? = null,
        var valorCarga: BigDecimal? = null,
        var valorCredidtoUtilizado: BigDecimal? = null,
        var valorCobranca: BigDecimal? = null,
        var idArquivo: Int? = null,
        var codigoCargaControleFinanceiro: Int? = null,
        var statusCargamaceficio: Int? = null,
        var statusEmpresaCargaDetalheProduto: Int? = null,
        var tipoBandeira: String? = null
) {

    constructor(agendamentoPedidoEntity: AgendamentoPedidoEntity) : this() {

        idPedidoBoleto = agendamentoPedidoEntity.agendamentoPedidoKey?.id
        dataEmissaoTitulo = agendamentoPedidoEntity.dataEmissaoTitulo
        cnpjSolicitante = agendamentoPedidoEntity.cnpjSolicitante
        descricaoClienteSolicitante = agendamentoPedidoEntity.descricaoClienteSolicitante
        cdClienteRhSolic = agendamentoPedidoEntity.cdClienteRhSolic
        tipoBoleto = agendamentoPedidoEntity.tipoBoleto
        nossoNumero = agendamentoPedidoEntity.nossoNumero
        tipoRecebimento = agendamentoPedidoEntity.tipoRecebimento
        dataEntradaPedido = agendamentoPedidoEntity.dataEntradaPedido
        dataLiberacaoPedido = agendamentoPedidoEntity.dataLiberacaoPedido
        dataVenciementoCobranca = agendamentoPedidoEntity.dataVenciementoCobranca
        statusCarga = agendamentoPedidoEntity.statusCarga
        valorCarga = agendamentoPedidoEntity.valorCarga
        valorCredidtoUtilizado = agendamentoPedidoEntity.valorCredidtoUtilizado
        valorCobranca = agendamentoPedidoEntity.valorCobranca
        idArquivo = agendamentoPedidoEntity.idArquivo
        codigoCargaControleFinanceiro = agendamentoPedidoEntity.codigoCargaControleFinanceiro
        statusCargamaceficio = agendamentoPedidoEntity.statusCargamaceficio
        statusEmpresaCargaDetalheProduto = agendamentoPedidoEntity.statusEmpresaCargaDetalheProduto
        tipoBandeira = agendamentoPedidoEntity.tipoBandeira
    }
}
