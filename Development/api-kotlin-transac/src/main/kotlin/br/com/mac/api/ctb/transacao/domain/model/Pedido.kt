package br.com.mac.api.ctb.transacao.domain.model

import br.com.mac.ctb.entity.PedidoEntity
import java.math.BigDecimal
import java.time.LocalDate
import java.util.*

data class Pedido(
        var idPedido: BigDecimal? = null,
        var cdCargaControleFinanceiro: Int? = null,
        var cdClienteRhCarga: Int? = null,
        var cdClienteRhSolic: Int? = null,
        var cdEmpresa: Int? = null,
        var cdGrupo: Int? = null,
        var cdProduto: Short? = null,
        var cdStatusNf: Short? = null,
        var cdSubGrupo: Int? = null,
        var cnpjCarga: String? = null,
        var cnpjRhGrupo: String? = null,
        var cnpjRhSubgrupo: String? = null,
        var cnpjSolicitante: String? = null,
        var cpf: String? = null,
        var dataHora: Date? = null,
        var descClienteCarga: String? = null,
        var descClienteSolicitante: String? = null,
        var descProduto: String? = null,
        var descStatusNf: String? = null,
        var dtAgendamentoCredito: Date? = null,
        var dtBaixaPagto: Date? = null,
        var dtCancelamento: Date? = null,
        var dtEmissaoTitulo: Date? = null,
        var dtEntradaPedido: Date? = null,
        var dtLiberacaoCredito: Date? = null,
        var dtPagtoPedido: Date? = null,
        var dtVenctoCobranca: Date? = null,
        var idArquivo: Int? = null,
        var idBoletoPedido: Int? = null,
        var idCarga: Int? = null,
        var idPortador: Int? = null,
        var nmGrupo: String? = null,
        var nmSubGrupo: String? = null,
        var nomePortador: String? = null,
        var numeroNf: String? = null,
        var statusCarga: String? = null,
        var tipoBoleto: String? = null,
        var tipoPagto: String? = null,
        var tipoRecebimento: String? = null,
        var vlCargaPortador: BigDecimal? = null,
        var vlTotalEsperadoGrupo: BigDecimal? = null,
        var vlTotalProcessadoGrupo: BigDecimal? = null
) {

    constructor(pedidoEntity: PedidoEntity) : this() {
        idPedido = pedidoEntity.pedidoKey?.id
        cdCargaControleFinanceiro = pedidoEntity.cdCargaControleFinanceiro
        cdClienteRhCarga = pedidoEntity.cdClienteRhCarga
        cdClienteRhSolic = pedidoEntity.cdClienteRhSolic
        cdEmpresa = pedidoEntity.cdEmpresa
        cdGrupo = pedidoEntity.cdGrupo
        cdProduto = pedidoEntity.cdProduto
        cdStatusNf = pedidoEntity.cdStatusNf
        cdSubGrupo = pedidoEntity.cdSubGrupo
        cnpjCarga = pedidoEntity.cnpjCarga
        cnpjRhGrupo = pedidoEntity.cnpjRhGrupo
        cnpjRhSubgrupo = pedidoEntity.cnpjRhSubgrupo
        cnpjSolicitante = pedidoEntity.cnpjSolicitante
        cpf = pedidoEntity.cpf
        dataHora = pedidoEntity.dataHora
        descClienteCarga = pedidoEntity.descClienteCarga
        descClienteSolicitante = pedidoEntity.descClienteSolicitante
        descProduto = pedidoEntity.descProduto
        descStatusNf = pedidoEntity.descStatusNf
        dtAgendamentoCredito = pedidoEntity.dtAgendamentoCredito
        dtBaixaPagto = pedidoEntity.dtBaixaPagto
        dtCancelamento = pedidoEntity.dtCancelamento
        dtEmissaoTitulo = pedidoEntity.dtEmissaoTitulo
        dtEntradaPedido = pedidoEntity.dtEntradaPedido
        dtLiberacaoCredito = pedidoEntity.dtLiberacaoCredito
        dtPagtoPedido = pedidoEntity.dtPagtoPedido
        dtVenctoCobranca = pedidoEntity.dtVenctoCobranca?.millisSinceEpoch?.let { Date(it) }
        idArquivo = pedidoEntity.idArquivo
        idBoletoPedido = pedidoEntity.idBoletoPedido
        idCarga = pedidoEntity.idCarga
        idPortador = pedidoEntity.idPortador
        nmGrupo = pedidoEntity.nmGrupo
        nmSubGrupo = pedidoEntity.nmSubGrupo
        nomePortador = pedidoEntity.nomePortador
        numeroNf = pedidoEntity.numeroNf
        statusCarga = pedidoEntity.statusCarga
        tipoBoleto = pedidoEntity.tipoBoleto
        tipoPagto = pedidoEntity.tipoPagto
        tipoRecebimento = pedidoEntity.tipoRecebimento
        vlCargaPortador = pedidoEntity.vlCargaPortador
        vlTotalEsperadoGrupo = pedidoEntity.vlTotalEsperadoGrupo
        vlTotalProcessadoGrupo = pedidoEntity.vlTotalProcessadoGrupo
    }
}
