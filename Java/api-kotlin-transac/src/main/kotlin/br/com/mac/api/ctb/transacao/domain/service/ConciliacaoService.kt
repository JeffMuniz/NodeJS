package br.com.mac.api.ctb.transacao.domain.service

import br.com.mac.api.ctb.transacao.domain.model.Conciliacao
import br.com.mac.api.ctb.transacao.domain.model.PontoControle
import br.com.mac.ctb.enum.PontoDeControle
import java.util.Date

interface ConciliacaoService {

    fun getConciliation(controlPoint: PontoDeControle, period: Int, inclusionDate: Date): Conciliacao
    fun getControlPoints(inclusionDate: Date): List<PontoControle>

}
