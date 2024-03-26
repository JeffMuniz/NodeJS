package br.com.mac.api.ctb.transacao.domain.model

import br.com.mac.api.ctb.transacao.domain.dto.ContaVirtualResponseDTO
import java.time.ZoneId
import java.time.format.DateTimeFormatter

data class ContaVirtualCreditoEstorno(override var transacaoContabil: TransacaoContabil,
                                      val contaVirtual: ContaVirtual?) : Extrato {

    override fun toResponseDTO(): ContaVirtualResponseDTO {
        return ContaVirtualResponseDTO(
                contaVirtual?.idBoleto,
                contaVirtual?.dataHora
                        ?.format(DateTimeFormatter.ISO_DATE_TIME),
                contaVirtual?.cnpjCarga,
                contaVirtual?.descricaoClienteCarga,
                contaVirtual?.idPedido,
                contaVirtual?.idTipoAjuste,
                contaVirtual?.idTipoRegistro,
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
