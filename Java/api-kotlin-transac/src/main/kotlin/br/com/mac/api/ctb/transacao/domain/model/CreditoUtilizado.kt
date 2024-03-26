package br.com.mac.api.ctb.transacao.domain.model

import br.com.mac.api.ctb.transacao.domain.dto.AutorizacaoResponseDTO
import java.time.ZoneId
import java.time.format.DateTimeFormatter

data class CreditoUtilizado(override var transacaoContabil: TransacaoContabil,
                            val autorizacao: Autorizacao?) : Extrato {

    override fun toResponseDTO(): AutorizacaoResponseDTO {
        return AutorizacaoResponseDTO(
                idAutorizacao = autorizacao?.idAutorizacao,
                cdBinAdquirente = autorizacao?.cdBinAdquirente,
                cdAutorizacao = autorizacao?.cdAutorizacao,
                cdProduto = autorizacao?.cdProduto,
                cpfPortador = autorizacao?.cpfPortador,
                dataHora = autorizacao?.dataHora
                        ?.toInstant()
                        ?.atZone(ZoneId.systemDefault())
                        ?.toLocalDateTime()
                        ?.format(DateTimeFormatter.ISO_DATE_TIME),
                dtAutorizacao = autorizacao?.dtAutorizacao
                        ?.toInstant()
                        ?.atZone(ZoneId.systemDefault())
                        ?.toLocalDateTime()
                        ?.format(DateTimeFormatter.ISO_DATE_TIME),
                dtTransacao = autorizacao?.dtTransacao
                        ?.toInstant()
                        ?.atZone(ZoneId.systemDefault())
                        ?.toLocalDateTime()
                        ?.format(DateTimeFormatter.ISO_DATE_TIME),
                idCompra = autorizacao?.idCompra,
                idEstabelecimento = autorizacao?.idEstabelecimento,
                idPortador = autorizacao?.idPortador,
                nomePortador = autorizacao?.nomePortador,
                nmEstabelecimento = autorizacao?.nmEstabelecimento,
                vlBruto = autorizacao?.vlBruto,
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
