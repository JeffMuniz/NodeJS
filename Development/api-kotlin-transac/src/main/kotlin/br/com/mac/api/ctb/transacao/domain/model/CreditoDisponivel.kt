package br.com.mac.api.ctb.transacao.domain.model

import br.com.mac.api.ctb.transacao.domain.dto.PedidoResponseDTO
import java.time.ZoneId
import java.time.format.DateTimeFormatter

data class CreditoDisponivel(override var transacaoContabil: TransacaoContabil,
                            val pedido: Pedido?) : Extrato {

    override fun toResponseDTO(): PedidoResponseDTO {
        return PedidoResponseDTO(
                idPedido = pedido?.idPedido,
                cdClienteRhCarga = pedido?.cdClienteRhCarga,
                cdClienteRhSolic = pedido?.cdClienteRhSolic,
                cnpjCarga = pedido?.cnpjCarga,
                cnpjRhGrupo = pedido?.cnpjRhGrupo,
                cpf = pedido?.cpf,
                descClienteCarga = pedido?.descClienteCarga,
                descClienteSolicitante = pedido?.descClienteSolicitante,
                descProduto = pedido?.descProduto,
                descStatusNf = pedido?.descStatusNf,
                dtEmissaoTitulo = pedido?.dtEmissaoTitulo
                        ?.toInstant()
                        ?.atZone(ZoneId.systemDefault())
                        ?.toLocalDateTime()
                        ?.format(DateTimeFormatter.ISO_DATE_TIME),
                dtEntradaPedido = pedido?.dtEntradaPedido
                        ?.toInstant()
                        ?.atZone(ZoneId.systemDefault())
                        ?.toLocalDateTime()
                        ?.format(DateTimeFormatter.ISO_DATE_TIME),
                dtLiberacaoCredito = pedido?.dtLiberacaoCredito
                        ?.toInstant()
                        ?.atZone(ZoneId.systemDefault())
                        ?.toLocalDateTime()
                        ?.format(DateTimeFormatter.ISO_DATE_TIME),
                nomePortador = pedido?.nomePortador,
                statusCarga = pedido?.statusCarga,
                tipoBoleto = pedido?.tipoBoleto,
                tipoRecebimento = pedido?.tipoRecebimento,
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
