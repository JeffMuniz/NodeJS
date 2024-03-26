package br.com.mac.wkr.ctb.atutransacao.domain.service

import java.util.Date

interface TransacaoContabilService {
    fun process(ledger: String, recordsSize: Int, initialDate: Date?)
}
