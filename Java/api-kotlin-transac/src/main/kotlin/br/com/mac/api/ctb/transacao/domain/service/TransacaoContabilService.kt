package br.com.mac.api.ctb.transacao.domain.service

import br.com.mac.ctb.enum.TipoOperacao
import br.com.mac.api.ctb.transacao.domain.model.Extrato
import br.com.mac.api.ctb.transacao.domain.model.TransacaoContabil
import org.springframework.data.domain.Pageable
import java.util.Date

interface TransacaoContabilService {

    fun getCurrentBalance(ledger: String, inclusionDate: Date? = null): TransacaoContabil
    fun getAmountPerType(ledger: String, operationType: String, startDate: Date, endDate: Date): TransacaoContabil
    fun getTransacoes(ledger: String, startDate: Date, endDate: Date, tipoOperacao: TipoOperacao?, page: Pageable?)
            : List<Extrato>
}
