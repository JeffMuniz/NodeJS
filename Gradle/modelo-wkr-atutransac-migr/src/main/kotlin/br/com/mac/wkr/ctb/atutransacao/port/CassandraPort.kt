package br.com.mac.wkr.ctb.atutransacao.port

import br.com.mac.wkr.ctb.atutransacao.domain.model.TransacaoContabil
import org.springframework.data.domain.Pageable
import java.util.Date
import java.util.LinkedList

interface CassandraPort {

    fun insert(transacaoContabil: TransacaoContabil)

    fun findTransacoes(ledger: String, initialDate: Date?, page: Pageable): LinkedList<TransacaoContabil>

    fun findBaseTransaction(ledger: String, initialDate: Date?): TransacaoContabil?

    fun saveAll(transacoes: List<TransacaoContabil>)

    fun countTransacoes(ledger: String, initialDate: Date?): Long

}
