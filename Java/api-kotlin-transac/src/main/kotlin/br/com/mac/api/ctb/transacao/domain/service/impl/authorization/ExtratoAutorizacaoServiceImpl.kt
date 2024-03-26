package br.com.mac.api.ctb.transacao.domain.service.impl.authorization

import br.com.mac.ctb.enum.TipoLedger
import br.com.mac.api.ctb.transacao.domain.model.CreditoUtilizado
import br.com.mac.api.ctb.transacao.domain.model.Extrato
import br.com.mac.api.ctb.transacao.domain.model.TransacaoContabil
import br.com.mac.api.ctb.transacao.domain.model.TransacaoDesfeita
import br.com.mac.api.ctb.transacao.domain.service.ExtratoService
import br.com.mac.api.ctb.transacao.port.CassandraPort
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import kotlin.streams.toList

@Service
class ExtratoAutorizacaoServiceImpl : ExtratoService {

    private var logger: Logger = LoggerFactory.getLogger(ExtratoAutorizacaoServiceImpl::class.java)

    @Autowired
    private lateinit var cassandraPort: CassandraPort

    override fun getStatement(tipoLedger: TipoLedger, listOfTransacaoContabil: List<TransacaoContabil>): List<Extrato> {

        val arrayOfAuthorizationId = listOfTransacaoContabil
                .map { transacaoContabil -> transacaoContabil.codigoEvento.toString() }
                .toTypedArray()

        val listOfAuthorization = cassandraPort
                .getByAuthorizationId(arrayOfAuthorizationId = arrayOfAuthorizationId)

        return listOfTransacaoContabil.parallelStream().map {

            val autorizacao = listOfAuthorization.firstOrNull { transacaoContabil ->
                transacaoContabil.idAutorizacao == it.codigoEvento
            }

            autorizacao.takeIf { it == null }.run {
                logger.info("Autorizacao com o id ${it.codigoEvento} não tem dados na base do informacional")
            }

            when (tipoLedger) {
                TipoLedger.CREDITO_UTILIZADO -> CreditoUtilizado(it, autorizacao)
                TipoLedger.TRANSACAO_DESFEITA -> TransacaoDesfeita(it, autorizacao)
                else -> error("${tipoLedger.name} do dominio de ${tipoLedger.domain}")
            }

        }.toList()

    }
}
