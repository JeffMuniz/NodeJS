package br.com.mac.api.ctb.transacao.domain.service.impl.scheduling

import br.com.mac.api.ctb.transacao.domain.model.AgendamentoPedidoCancelado
import br.com.mac.api.ctb.transacao.domain.model.AgendamentoPedidoEfetivado
import br.com.mac.api.ctb.transacao.domain.model.AgendamentoPedidoPendente
import br.com.mac.api.ctb.transacao.domain.model.TransacaoContabil
import br.com.mac.api.ctb.transacao.domain.model.Extrato

import br.com.mac.ctb.enum.TipoLedger
import br.com.mac.api.ctb.transacao.domain.service.ExtratoService
import br.com.mac.api.ctb.transacao.port.CassandraPort
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import kotlin.streams.toList

@Service
class ExtratoAgendamentoPedidoServiceImpl : ExtratoService {

    private var logger: Logger = LoggerFactory.getLogger(ExtratoAgendamentoPedidoServiceImpl::class.java)

    @Autowired
    private lateinit var cassandraPort: CassandraPort

    override fun getStatement(ledgerType: TipoLedger, accountingTransactions: List<TransacaoContabil>): List<Extrato> {

        val idSchedulingRequests = accountingTransactions
                .map { transacaoContabil -> transacaoContabil.codigoEvento.toString() }
                .toTypedArray()

        // busca no info_agendamento_pedido
        val schedulingRequests = cassandraPort.getBySchedulingRequestId(idSchedulingRequests)

        return accountingTransactions.parallelStream().map {

            val agendamentoPedido = schedulingRequests.firstOrNull { at ->
                at.idPedidoBoleto == it.codigoEvento }

            agendamentoPedido.takeIf { it == null }.run {
                logger.info("Agendamento Pedido com o id ${it.codigoEvento} não tem dados na base do informacional")
            }

            when (ledgerType) {
                TipoLedger.PEDIDO_RECEBIMENTO_PENDENTE    -> AgendamentoPedidoPendente(it, agendamentoPedido)
                TipoLedger.PEDIDO_RECEBIMENTO_CANCELADO   -> AgendamentoPedidoCancelado(it, agendamentoPedido)
                TipoLedger.PEDIDO_RECEBIMENTO_EFETIVADO   -> AgendamentoPedidoEfetivado(it, agendamentoPedido)
                else -> error("${ledgerType.name} do dominio de ${ledgerType.domain}")
            }

        }.toList()

    }
}
