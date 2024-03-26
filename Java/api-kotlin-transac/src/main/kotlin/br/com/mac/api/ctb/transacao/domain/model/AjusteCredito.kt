package br.com.mac.api.ctb.transacao.domain.model

import br.com.mac.api.ctb.transacao.domain.dto.AjusteResponseDTO
import java.time.ZoneId
import java.time.format.DateTimeFormatter

data class AjusteCredito(override var transacaoContabil: TransacaoContabil,
                         val autorizacao: Ajuste?) : Extrato {

    override fun toResponseDTO(): AjusteResponseDTO {
        return AjusteResponseDTO(
                idAjuste = autorizacao?.idAjuste,
                cpf = autorizacao?.cpf,
                nmSetupContabil = autorizacao?.nmSetupContabil,
                dcPortador = autorizacao?.dcPortador,
                dcAdquirente = autorizacao?.dcAdquirente,
                cdTransacao = autorizacao?.cdTransacao,
                cdEstabelecimentoComercial = autorizacao?.cdEstabelecimentoComercial,
                cdPortador = autorizacao?.cdPortador,
                cdProduto = autorizacao?.cdProduto,
                dtTransacao = autorizacao?.dtTransacao
                        ?.toInstant()
                        ?.atZone(ZoneId.systemDefault())
                        ?.toLocalDateTime()
                        ?.format(DateTimeFormatter.ISO_DATE_TIME),
                dcEstabelecimentoComercial = autorizacao?.dcEstabelecimentoComercial,
                dcMotivoAjuste = autorizacao?.dcMotivoAjuste,
                dtGeracaoAjuste = autorizacao?.dtGeracaoAjuste
                        ?.toInstant()
                        ?.atZone(ZoneId.systemDefault())
                        ?.toLocalDateTime()
                        ?.format(DateTimeFormatter.ISO_DATE_TIME),
                vlTransacao = autorizacao?.vlTransacao,
                vlCreditoAjuste = autorizacao?.vlCreditoAjuste,
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
