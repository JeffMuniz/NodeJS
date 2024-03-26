package br.com.mac.api.ctb.transacao.domain.service.impl.order

import br.com.mac.ctb.enum.TipoLedger
import br.com.mac.api.ctb.transacao.domain.model.CreditoCancelado
import br.com.mac.api.ctb.transacao.domain.model.CreditoDisponivel
import br.com.mac.api.ctb.transacao.domain.model.CreditoPendente
import br.com.mac.api.ctb.transacao.domain.model.Extrato
import br.com.mac.api.ctb.transacao.domain.model.TransacaoContabil
import br.com.mac.api.ctb.transacao.domain.service.ExtratoService
import br.com.mac.api.ctb.transacao.port.CassandraPort
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import kotlin.streams.toList

@Service
class ExtratoPedidoServiceImpl : ExtratoService {

    private var logger: Logger = LoggerFactory.getLogger(ExtratoPedidoServiceImpl::class.java)

    @Autowired
    private lateinit var cassandraPort: CassandraPort

    override fun getStatement(tipoLedger: TipoLedger, listOfTransacaoContabil: List<TransacaoContabil>): List<Extrato> {

        val arrayOfOrderId = listOfTransacaoContabil
                .map { transacaoContabil -> transacaoContabil.codigoEvento.toString() }
                .toTypedArray()

        val listOfOrder = cassandraPort.getByOderId(arrayOfOrderId = arrayOfOrderId)

        return listOfTransacaoContabil.parallelStream().map {

            val pedido = listOfOrder.firstOrNull { transacaoContabil ->
                transacaoContabil.idPedido?.toInt() == it.codigoEvento }

            pedido.takeIf { it == null }.run {
                logger.info("Pedido com o id ${it.codigoEvento} não tem dados na base do informacional")
            }

            when (tipoLedger) {
                TipoLedger.CREDITO_CANCELADO -> CreditoCancelado(it, pedido)
                TipoLedger.CREDITO_PENDENTE -> CreditoPendente(it, pedido)
                TipoLedger.CREDITO_DISPONIVEL -> CreditoDisponivel(it, pedido)
                else -> error("${tipoLedger.name} do dominio de ${tipoLedger.domain}")
            }

        }.toList()

    }
}
