package br.com.mac.api.ctb.transacao.domain.service

import br.com.mac.api.ctb.transacao.domain.model.PontoControle
import br.com.mac.ctb.enum.TipoPeriodo
import java.util.Date

interface PontoControleService {

    fun getPontoControleSaldo(controle: String, tipoPeriodo: TipoPeriodo, inclusionDate: Date): PontoControle
}
