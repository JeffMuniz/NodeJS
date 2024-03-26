package br.com.mac.api.ctb.transacao.domain.service.impl.ledger

import br.com.mac.ctb.enum.TipoLedger
import br.com.mac.ctb.enum.TipoOperacao
import br.com.mac.api.ctb.transacao.domain.model.Extrato
import br.com.mac.api.ctb.transacao.domain.model.TransacaoContabil
import br.com.mac.api.ctb.transacao.domain.service.ExtratoServiceInterpreter
import br.com.mac.api.ctb.transacao.domain.service.TransacaoContabilService
import br.com.mac.api.ctb.transacao.port.CassandraPort
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.domain.Pageable
import org.springframework.stereotype.Service
import java.util.Date

@Service
class TransacaoContabilServiceImpl : TransacaoContabilService {

    @Autowired
    private lateinit var cassandraPort: CassandraPort

    @Autowired
    private lateinit var extratoServiceInterpreter: ExtratoServiceInterpreter

    override fun getCurrentBalance(ledger: String, inclusionDate: Date?): TransacaoContabil {
        return cassandraPort.getCurrentBalance(ledger = ledger, inclusionDate = inclusionDate)
    }

    override fun getAmountPerType(ledger: String, operationType: String, startDate: Date, endDate: Date)
            : TransacaoContabil {

        return cassandraPort.getAmountPerType(ledger = ledger, operationType = operationType,
                startDate = startDate, endDate = endDate)
    }

    override fun getTransacoes(ledger: String, startDate: Date, endDate: Date, tipoOperacao: TipoOperacao?,
                               page: Pageable?): List<Extrato> {

        var listOfExtrato = listOf<Extrato>()

        val listOfTransacaoContabil = cassandraPort.getTransacoes(ledger = ledger, startDate = startDate,
                endDate = endDate, operationType = tipoOperacao, page = page)

        if (listOfTransacaoContabil.isNotEmpty()) {

            val ledgerType = TipoLedger.getTipoLedger(ledger)

            val serviceFunction = extratoServiceInterpreter
                    .interpret(ledgerType.domain)

            listOfExtrato = serviceFunction.invoke(ledgerType, listOfTransacaoContabil)
        }

        return listOfExtrato

    }
}
