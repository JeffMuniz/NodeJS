package br.com.mac.api.ctb.transacao.domain.service.impl.virtualAccounting

import br.com.mac.api.ctb.transacao.domain.model.ContaVirtualCreditoPendente
import br.com.mac.api.ctb.transacao.domain.model.ContaVirtualCreditoUtilizado
import br.com.mac.api.ctb.transacao.domain.model.ContaVirtualCreditoEstorno
import br.com.mac.api.ctb.transacao.domain.model.Extrato
import br.com.mac.api.ctb.transacao.domain.model.TransacaoContabil

import br.com.mac.ctb.enum.TipoLedger
import br.com.mac.api.ctb.transacao.domain.service.ExtratoService
import br.com.mac.api.ctb.transacao.port.CassandraPort
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import kotlin.streams.toList

@Service
class ExtratoContaVirtualServiceImpl : ExtratoService {

    private var logger: Logger = LoggerFactory.getLogger(ExtratoContaVirtualServiceImpl::class.java)

    @Autowired
    private lateinit var cassandraPort: CassandraPort

    override fun getStatement(ledgerType: TipoLedger, accountingTransactions: List<TransacaoContabil>): List<Extrato> {

        val idSchedulingRequests = accountingTransactions
                .map { transacaoContabil -> transacaoContabil.codigoEvento.toString() }
                .toTypedArray()

        // busca no info_contavirtual
        val virtualAccounts = cassandraPort.getByVirtualAccountingId(idSchedulingRequests)

        return accountingTransactions.parallelStream().map {

            val contaVirtual = virtualAccounts.firstOrNull { at ->
                at.idBoleto == it.codigoEvento }

            contaVirtual.takeIf { it == null }.run {
                logger.info("Conta Virtual com o id ${it.codigoEvento} não tem dados na base do informacional")
            }

            when (ledgerType) {
                TipoLedger.CONTAVIRTUAL_CREDITO_PENDENTE -> ContaVirtualCreditoPendente(it, contaVirtual)
                TipoLedger.CONTAVIRTUAL_CREDITO_UTILIZADO -> ContaVirtualCreditoUtilizado(it, contaVirtual)
                TipoLedger.CONTAVIRTUAL_CREDITO_ESTORNO -> ContaVirtualCreditoEstorno(it, contaVirtual)
                else -> error("${ledgerType.name} do dominio de ${ledgerType.domain}")
            }

        }.toList()

    }
}
