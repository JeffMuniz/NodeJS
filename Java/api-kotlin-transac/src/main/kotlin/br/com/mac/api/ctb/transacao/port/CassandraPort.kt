package br.com.mac.api.ctb.transacao.port

import br.com.mac.api.ctb.transacao.domain.model.TransacaoContabil
import br.com.mac.api.ctb.transacao.domain.model.Pedido
import br.com.mac.api.ctb.transacao.domain.model.Autorizacao
import br.com.mac.api.ctb.transacao.domain.model.Ajuste
import br.com.mac.api.ctb.transacao.domain.model.AgendamentoPedido
import br.com.mac.api.ctb.transacao.domain.model.ContaVirtual
import br.com.mac.ctb.enum.TipoOperacao
import br.com.mac.ctb.enum.TipoPeriodo
import org.springframework.data.domain.Pageable
import java.time.LocalDate
import java.util.Date

interface CassandraPort {

    fun getCurrentBalance(ledger: String, inclusionDate: Date? = null): TransacaoContabil
    fun getAmountPerType(ledger: String, operationType: String, startDate: Date, endDate: Date): TransacaoContabil
    fun getTransacoes(ledger: String, startDate: Date, endDate: Date, operationType: TipoOperacao?, page: Pageable?):
            List<TransacaoContabil>
    fun getByOderId(arrayOfOrderId: Array<String>): List<Pedido>
    fun getPeriodBalance(ledger: String, date: LocalDate, tipoPeriodo: TipoPeriodo): TransacaoContabil
    fun getByAuthorizationId(arrayOfAuthorizationId: Array<String>): List<Autorizacao>
    fun getByAdjustmentId(arrayOfAdjustmentId: Array<String>): List<Ajuste>
    fun getBySchedulingRequestId(arrayOfSchedulingRequestId: Array<String>): List<AgendamentoPedido>
    fun getByVirtualAccountingId(arrayOfVirtualAccountingId: Array<String>): List<ContaVirtual>
}
