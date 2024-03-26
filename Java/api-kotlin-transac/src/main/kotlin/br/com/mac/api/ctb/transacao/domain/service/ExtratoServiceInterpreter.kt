package br.com.mac.api.ctb.transacao.domain.service

import br.com.mac.ctb.enum.TipoLedger
import br.com.mac.api.ctb.transacao.domain.model.Extrato
import br.com.mac.api.ctb.transacao.domain.model.TransacaoContabil

interface ExtratoServiceInterpreter {

    fun interpret(domain: String) : (TipoLedger, List<TransacaoContabil>) -> List<Extrato>
}
