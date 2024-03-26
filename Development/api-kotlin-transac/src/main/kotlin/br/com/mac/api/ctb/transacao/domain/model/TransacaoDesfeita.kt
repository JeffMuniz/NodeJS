package br.com.mac.api.ctb.transacao.domain.model

import br.com.mac.api.ctb.transacao.domain.dto.AutorizacaoResponseDTO
import java.time.ZoneId
import java.time.format.DateTimeFormatter

data class TransacaoDesfeita(override var transacaoContabil: TransacaoContabil,
                             val autorizacao: Autorizacao?) : Extrato {

    override fun toResponseDTO(): AutorizacaoResponseDTO {
        return AutorizacaoResponseDTO(
                idAutorizacao = autorizacao?.idAutorizacao,
                cdBanco = autorizacao?.cdBanco,
                cdProduto = autorizacao?.cdProduto,
                cnpjEstabelecimento = autorizacao?.cnpjEstabelecimento,
                cpfPortador = autorizacao?.cpfPortador,
                dataHora = autorizacao?.dataHora
                        ?.toInstant()
                        ?.atZone(ZoneId.systemDefault())
                        ?.toLocalDateTime()
                        ?.format(DateTimeFormatter.ISO_DATE_TIME),
                dcBinAdquirente = autorizacao?.dcBinAdquirente,
                dcProduto = autorizacao?.dcProduto,
                dcStatus = autorizacao?.dcStatus,
                dtTransacao = autorizacao?.dtTransacao
                        ?.toInstant()
                        ?.atZone(ZoneId.systemDefault())
                        ?.toLocalDateTime()
                        ?.format(DateTimeFormatter.ISO_DATE_TIME),
                idCompra = autorizacao?.idCompra,
                idEstabelecimento = autorizacao?.idEstabelecimento,
                nmEstabelecimento = autorizacao?.nmEstabelecimento,
                tpTransacao = autorizacao?.tpTransacao,
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
