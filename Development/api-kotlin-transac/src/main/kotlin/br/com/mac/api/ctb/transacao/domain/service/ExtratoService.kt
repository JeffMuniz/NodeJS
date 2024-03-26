package br.com.mac.api.ctb.transacao.domain.service

import br.com.mac.ctb.enum.TipoLedger
import br.com.mac.api.ctb.transacao.domain.model.TransacaoContabil
import br.com.mac.api.ctb.transacao.domain.model.Extrato

interface ExtratoService {

    fun getStatement(tipoLedger: TipoLedger, listOfTransacaoContabil: List<TransacaoContabil>): List<Extrato>

}
