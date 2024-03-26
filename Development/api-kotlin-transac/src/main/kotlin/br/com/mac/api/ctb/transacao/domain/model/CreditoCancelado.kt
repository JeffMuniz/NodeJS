package br.com.mac.api.ctb.transacao.domain.model

import br.com.mac.api.ctb.transacao.domain.dto.PedidoResponseDTO
import java.time.ZoneId
import java.time.format.DateTimeFormatter

data class CreditoCancelado(override var transacaoContabil: TransacaoContabil,
                            val pedido: Pedido?) : Extrato {

    override fun toResponseDTO(): PedidoResponseDTO {
        return PedidoResponseDTO(
                idPedido = pedido?.idPedido,
                cdEmpresa = pedido?.cdEmpresa,
                cdGrupo = pedido?.cdGrupo,
                cdSubGrupo = pedido?.cdSubGrupo,
                cnpjCarga = pedido?.cnpjCarga,
                cnpjRhGrupo = pedido?.cnpjRhGrupo,
                cnpjRhSubgrupo = pedido?.cnpjRhSubgrupo,
                descClienteCarga = pedido?.descClienteCarga,
                descProduto = pedido?.descProduto,
                dtBaixaPagto = pedido?.dtBaixaPagto
                        ?.toInstant()
                        ?.atZone(ZoneId.systemDefault())
                        ?.toLocalDateTime()
                        ?.format(DateTimeFormatter.ISO_DATE_TIME),
                dtCancelamento = pedido?.dtCancelamento
                        ?.toInstant()
                        ?.atZone(ZoneId.systemDefault())
                        ?.toLocalDateTime()
                        ?.format(DateTimeFormatter.ISO_DATE_TIME),
                dtEmissaoTitulo = pedido?.dtEmissaoTitulo
                        ?.toInstant()
                        ?.atZone(ZoneId.systemDefault())
                        ?.toLocalDateTime()
                        ?.format(DateTimeFormatter.ISO_DATE_TIME),
                dtLiberacaoCredito = pedido?.dtLiberacaoCredito
                        ?.toInstant()
                        ?.atZone(ZoneId.systemDefault())
                        ?.toLocalDateTime()
                        ?.format(DateTimeFormatter.ISO_DATE_TIME),
                dtPagtoPedido = pedido?.dtPagtoPedido
                        ?.toInstant()
                        ?.atZone(ZoneId.systemDefault())
                        ?.toLocalDateTime()
                        ?.format(DateTimeFormatter.ISO_DATE_TIME),
                dtVenctoCobranca = pedido?.dtVenctoCobranca
                        ?.toInstant()
                        ?.atZone(ZoneId.systemDefault())
                        ?.toLocalDateTime()
                        ?.format(DateTimeFormatter.ISO_DATE_TIME),
                idArquivo = pedido?.idArquivo,
                idBoletoPedido = pedido?.idBoletoPedido,
                nmGrupo = pedido?.nmGrupo,
                nmSubGrupo = pedido?.nmSubGrupo,
                tipoBoleto = pedido?.tipoBoleto,
                tipoPagto = pedido?.tipoPagto,
                vlCargaPortador = pedido?.vlCargaPortador,
                codigoTransacao = transacaoContabil.codigoTransacao,
                ledger = transacaoContabil.ledger,
                dataInclusao = transacaoContabil.dataInclusao?.format(DateTimeFormatter.ISO_DATE_TIME),
                codigoEvento = transacaoContabil.codigoEvento,
                tipoEvento = transacaoContabil.tipoEvento,
                codigoTransacaoAnterior = transacaoContabil.codigoTransacaoAnterior,
                dataEvento = transacaoContabil.dataEvento?.format(DateTimeFormatter.ISO_DATE_TIME),
                valor = transacaoContabil.valor,
                saldo = transacaoContabil.saldo,
                saldoAnterior = transacaoContabil.saldoAnterior,
                tipoOperacao = transacaoContabil.tipoOperacao
        )
    }
}
