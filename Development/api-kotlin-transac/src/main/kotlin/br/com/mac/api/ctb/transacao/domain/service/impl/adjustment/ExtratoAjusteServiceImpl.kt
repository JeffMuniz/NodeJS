package br.com.mac.api.ctb.transacao.domain.service.impl.adjustment

import br.com.mac.ctb.enum.TipoLedger
import br.com.mac.api.ctb.transacao.domain.model.AjusteCredito
import br.com.mac.api.ctb.transacao.domain.model.AjusteDebito
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
class ExtratoAjusteServiceImpl : ExtratoService {

    private var logger: Logger = LoggerFactory.getLogger(ExtratoAjusteServiceImpl::class.java)

    @Autowired
    private lateinit var cassandraPort: CassandraPort

    override fun getStatement(tipoLedger: TipoLedger, listOfTransacaoContabil: List<TransacaoContabil>): List<Extrato> {

        val arrayOfAdjustmentId = listOfTransacaoContabil
                .map { transacaoContabil -> transacaoContabil.codigoEvento.toString() }
                .toTypedArray()

        val listOfAdjustment = cassandraPort
                .getByAdjustmentId(arrayOfAdjustmentId = arrayOfAdjustmentId)

        return listOfTransacaoContabil.parallelStream().map {

            val ajuste = listOfAdjustment.firstOrNull { transacaoContabil ->
                transacaoContabil.idAjuste == it.codigoEvento
            }

            ajuste.takeIf { it == null }.run {
                logger.info("Ajuste com o id ${it.codigoEvento} não tem dados na base do informacional")
            }

            when (tipoLedger) {
                TipoLedger.AJUSTE_CREDITO -> AjusteCredito(it, ajuste)
                TipoLedger.AJUSTE_DEBITO -> AjusteDebito(it, ajuste)
                else -> error("${tipoLedger.name} do dominio de ${tipoLedger.domain}")
            }

        }.toList()

    }
}
