package br.com.mac.api.ctb.transacao.domain.service.impl.ledger

import br.com.mac.api.ctb.transacao.config.ConciliationModelConfigComponent
import br.com.mac.api.ctb.transacao.config.ControlPointConfigComponent
import br.com.mac.api.ctb.transacao.constant.FIXED_HOUR
import br.com.mac.api.ctb.transacao.constant.FIXED_MINUTE
import br.com.mac.api.ctb.transacao.constant.FIXED_SECOND
import br.com.mac.api.ctb.transacao.constant.ONE
import br.com.mac.api.ctb.transacao.constant.FIXED_FINISH_DAY
import br.com.mac.api.ctb.transacao.constant.FIXED_TIME
import br.com.mac.api.ctb.transacao.domain.model.Conciliacao
import br.com.mac.api.ctb.transacao.domain.model.PontoControle
import br.com.mac.api.ctb.transacao.domain.model.ValorField
import br.com.mac.api.ctb.transacao.domain.service.ConciliacaoService
import br.com.mac.api.ctb.transacao.extension.sumByBigDecimal
import br.com.mac.api.ctb.transacao.port.CassandraPort
import br.com.mac.ctb.enum.PontoDeControle
import br.com.mac.ctb.enum.TipoPeriodo
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component
import java.math.BigDecimal
import java.time.ZoneId
import java.time.format.DateTimeFormatter
import java.util.Date

@Component
class ConciliacaoServiceImpl : ConciliacaoService {

    companion object {
        private const val DOWNLOAD_URI =
                "/ledgers/LEADGER/extrato/download?tipoOperacao=CREDITO&dataInicial=DATA_INICIO&dataFinal=DATA_FIM"
    }

    @Autowired
    private lateinit var cassandraPort: CassandraPort

    @Autowired
    private lateinit var controlPointComponent: ControlPointConfigComponent

    @Autowired
    private lateinit var conciliationModelComponent: ConciliationModelConfigComponent

    override fun getConciliation(controlPoint: PontoDeControle, period: Int, inclusionDate: Date): Conciliacao {

        val pontoControleConfig = controlPointComponent.setupControlPointConfigByJSON(controlPoint)

        val conciliacao = conciliationModelComponent.setupConciliationModelByJSON(controlPoint)

        for (index in ONE..period) {

            var totalCredito = BigDecimal.ZERO
            var totalDebito = BigDecimal.ZERO

            val dataPeriodoAtual = inclusionDate.toInstant().atZone(ZoneId.systemDefault())
                    .toLocalDate().atTime(FIXED_HOUR, FIXED_MINUTE, FIXED_SECOND).minusDays(index.toLong())

            val dataPeriodoAtualFormatada = dataPeriodoAtual.format(DateTimeFormatter.ISO_LOCAL_DATE)

            conciliacao.datas.addFirst(dataPeriodoAtualFormatada)

            pontoControleConfig.ledgersCredito.forEach {
                val transacaoContabil =
                        cassandraPort.getPeriodBalance(it, dataPeriodoAtual.toLocalDate(), TipoPeriodo.DIA)

                val creditoDia = transacaoContabil.totalCreditoDia ?: BigDecimal.ZERO

                conciliacao.entradas[it]?.valores?.addFirst(ValorField(data = dataPeriodoAtualFormatada,
                        valor = creditoDia))
                //TODO ajustar essa parte
                conciliacao.entradas[it]?.downloadUri = DOWNLOAD_URI
                        .replace("LEADGER", it)
                        .replace("DATA_INICIO", "$dataPeriodoAtualFormatada$FIXED_TIME")
                        .replace("DATA_FIM", "$dataPeriodoAtualFormatada$FIXED_FINISH_DAY")

                totalCredito = totalCredito.add(creditoDia)
            }

            pontoControleConfig.ledgersDebito.forEach {
                val transacaoContabil =
                        cassandraPort.getPeriodBalance(it, dataPeriodoAtual.toLocalDate(), TipoPeriodo.DIA)

                val debitoDia = transacaoContabil.totalCreditoDia ?: BigDecimal.ZERO

                conciliacao.saidas[it]?.valores?.addFirst(ValorField(data = dataPeriodoAtualFormatada,
                        valor = debitoDia))

                //TODO ajustar essa parte
                conciliacao.saidas[it]?.downloadUri = DOWNLOAD_URI
                        .replace("LEADGER", it)
                        .replace("DATA_INICIO", "$dataPeriodoAtualFormatada$FIXED_TIME")
                        .replace("DATA_FIM", "$dataPeriodoAtualFormatada$FIXED_FINISH_DAY")

                totalDebito = totalDebito.add(debitoDia)
            }

            val dataPeriodoAnterior = dataPeriodoAtual.minusDays(ONE.toLong()).toLocalDate()
                    .atTime(FIXED_HOUR, FIXED_MINUTE, FIXED_SECOND)

            val periodoAnterior = cassandraPort.getCurrentBalance(pontoControleConfig.ledgerSuporte,
                    Date.from(dataPeriodoAnterior.atZone(ZoneId.systemDefault()).toInstant()))

            val estoqueInicial = periodoAnterior.saldo ?: BigDecimal.ZERO

            conciliacao.estoqueInicial.valores.addFirst(ValorField(data = dataPeriodoAtualFormatada,
                    valor = estoqueInicial))

            val estoqueFinal = estoqueInicial.plus(totalCredito).minus(totalDebito)

            conciliacao.estoqueFinal.valores.addFirst(ValorField(data = dataPeriodoAtualFormatada,
                    valor = estoqueFinal))

            val suporte = cassandraPort.getCurrentBalance(pontoControleConfig.ledgerSuporte,
                    Date.from(dataPeriodoAtual.atZone(ZoneId.systemDefault()).toInstant())).saldo ?: BigDecimal.ZERO

            conciliacao.suporte.valores.addFirst(ValorField(data = dataPeriodoAtualFormatada,
                    valor = suporte))

            val diferencaMovimento = estoqueFinal.minus(suporte)

            conciliacao.diferencaMovimento.valores.addFirst(ValorField(data = dataPeriodoAtualFormatada,
                    valor = diferencaMovimento))
        }

        return conciliacao
    }

    override fun getControlPoints(inclusionDate: Date): List<PontoControle> {

        val controlPoints = controlPointComponent.getControlPointsConfigByJSON()

        val listOfPontoDeControle = mutableListOf<PontoControle>()

        controlPoints.forEach { controlPoint ->

            val pontoDeControle = PontoDeControle.valueOf(controlPoint.controle)

            val conciliation = this.getConciliation(controlPoint = pontoDeControle, period = ONE,
                    inclusionDate = inclusionDate)

            val pontoControle = PontoControle(controle = conciliation.controle,
                    campoAtuacao = controlPoint.campoAtuacao,
                    saldoOperacional = conciliation.estoqueFinal.valores.sumByBigDecimal {
                        it.valor ?: BigDecimal.ZERO
                    },
                    saldoSuporte = conciliation.suporte.valores.sumByBigDecimal { it.valor ?: BigDecimal.ZERO },
                    diferencaOperacional = conciliation.diferencaMovimento.valores.sumByBigDecimal {
                        it.valor ?: BigDecimal.ZERO
                    }
            )

            listOfPontoDeControle.add(pontoControle)
        }

        return listOfPontoDeControle
    }

}
