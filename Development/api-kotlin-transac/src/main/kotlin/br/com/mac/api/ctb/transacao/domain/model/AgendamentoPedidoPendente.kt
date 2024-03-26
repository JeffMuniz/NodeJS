package br.com.mac.api.ctb.transacao.domain.model

import br.com.mac.api.ctb.transacao.domain.dto.AgendamentoPedidoResponseDTO
import java.time.ZoneId
import java.time.format.DateTimeFormatter

data class AgendamentoPedidoPendente(override var transacaoContabil: TransacaoContabil,
                                     val agendamentoPedido: AgendamentoPedido?) : Extrato {

    override fun toResponseDTO(): AgendamentoPedidoResponseDTO {
        return AgendamentoPedidoResponseDTO(
                agendamentoPedido?.idPedidoBoleto,
                agendamentoPedido?.dataEmissaoTitulo
                        ?.toInstant()
                        ?.atZone(ZoneId.systemDefault())
                        ?.toLocalDateTime()
                        ?.format(DateTimeFormatter.ISO_DATE_TIME),
                agendamentoPedido?.cnpjSolicitante,
                agendamentoPedido?.descricaoClienteSolicitante,
                agendamentoPedido?.cdClienteRhSolic,
                agendamentoPedido?.tipoBoleto,
                agendamentoPedido?.nossoNumero,
                agendamentoPedido?.tipoRecebimento,
                agendamentoPedido?.dataEntradaPedido
                        ?.toInstant()
                        ?.atZone(ZoneId.systemDefault())
                        ?.toLocalDateTime()
                        ?.format(DateTimeFormatter.ISO_DATE_TIME),
                agendamentoPedido?.dataLiberacaoPedido
                        ?.toInstant()
                        ?.atZone(ZoneId.systemDefault())
                        ?.toLocalDateTime()
                        ?.format(DateTimeFormatter.ISO_DATE_TIME),
                agendamentoPedido?.dataVenciementoCobranca
                        ?.toInstant()
                        ?.atZone(ZoneId.systemDefault())
                        ?.toLocalDateTime()
                        ?.format(DateTimeFormatter.ISO_DATE_TIME),
                agendamentoPedido?.statusCarga,
                agendamentoPedido?.valorCarga,
                agendamentoPedido?.valorCredidtoUtilizado,
                agendamentoPedido?.valorCobranca,
                agendamentoPedido?.idArquivo,
                agendamentoPedido?.codigoCargaControleFinanceiro,
                agendamentoPedido?.statusCargamaceficio,
                agendamentoPedido?.statusEmpresaCargaDetalheProduto,
                agendamentoPedido?.tipoBandeira,
                transacaoContabil.codigoTransacao,
                transacaoContabil.ledger,
                transacaoContabil.dataInclusao?.format(DateTimeFormatter.ISO_DATE_TIME),
                transacaoContabil.codigoEvento,
                transacaoContabil.tipoEvento,
                transacaoContabil.codigoTransacaoAnterior,
                transacaoContabil.dataEvento?.format(DateTimeFormatter.ISO_DATE_TIME),
                transacaoContabil.valor,
                transacaoContabil.saldo,
                transacaoContabil.saldoAnterior,
                transacaoContabil.tipoOperacao
        )
    }
}
