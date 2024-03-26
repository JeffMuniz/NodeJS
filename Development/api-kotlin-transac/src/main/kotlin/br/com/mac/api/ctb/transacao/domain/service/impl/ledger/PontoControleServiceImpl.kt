package br.com.mac.api.ctb.transacao.domain.service.impl.ledger

import br.com.mac.api.ctb.transacao.domain.model.PontoControle
import br.com.mac.api.ctb.transacao.domain.model.PontoControleConfig
import br.com.mac.api.ctb.transacao.domain.model.PontoControleLedger
import br.com.mac.api.ctb.transacao.domain.model.TransacaoContabil
import br.com.mac.api.ctb.transacao.domain.service.PontoControleService
import br.com.mac.api.ctb.transacao.extension.sumByBigDecimal
import br.com.mac.api.ctb.transacao.port.CassandraPort
import br.com.mac.ctb.enum.TipoOperacao
import br.com.mac.ctb.enum.TipoPeriodo
import com.google.common.reflect.TypeToken
import com.google.gson.Gson
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Component
import java.io.File
import java.math.BigDecimal
import java.time.LocalDateTime
import java.time.ZoneId
import java.util.Date
import javax.annotation.PostConstruct

@Component
class PontoControleServiceImpl : PontoControleService {

    @Value("\${mac.ledger.controle.config.file}")
    private lateinit var pontoControleFile: String

    @Value("\${mac.timezone}")
    private var timezone: String? = null

    @Autowired
    private lateinit var cassandraPort: CassandraPort

    private var pontoControleMapConfig: Map<String, PontoControleConfig> = mapOf()

    @PostConstruct
    private fun init() {
        val pontoControles: List<PontoControleConfig> = Gson().fromJson(File(pontoControleFile)
                .readText(Charsets.UTF_8), object : TypeToken<ArrayList<PontoControleConfig>>() {}.type)

        pontoControleMapConfig = pontoControles.map { it.controle to it }.toMap()
    }

    override fun getPontoControleSaldo(controle: String, tipoPeriodo: TipoPeriodo, inclusionDate: Date)
            : PontoControle {

        val pontoControleConfig = pontoControleMapConfig[controle]
        val dataPeriodoAtual = inclusionDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime()

        val transacoesCredito = pontoControleConfig!!.ledgersCredito.map {
            cassandraPort.getPeriodBalance(it, dataPeriodoAtual.toLocalDate(), tipoPeriodo)
        }

        val transacoesDebito = pontoControleConfig.ledgersDebito.map {
            cassandraPort.getPeriodBalance(it, dataPeriodoAtual.toLocalDate(), tipoPeriodo)
        }

        val transacaoSuporte = cassandraPort.getCurrentBalance(pontoControleConfig.ledgerSuporte,
                inclusionDate)

        val totalCredito: BigDecimal
        val totalDebito: BigDecimal

        val dataPeriodoAnterior: LocalDateTime

        when (tipoPeriodo) {
            TipoPeriodo.DIA -> {
                dataPeriodoAnterior = dataPeriodoAtual.minusDays(1)
                totalCredito = transacoesCredito.sumByBigDecimal { it.totalCreditoDia ?: BigDecimal.ZERO }
                totalDebito = transacoesDebito.sumByBigDecimal { it.totalCreditoDia ?: BigDecimal.ZERO }
            }
            TipoPeriodo.MES -> {
                dataPeriodoAnterior = dataPeriodoAtual.minusMonths(1)
                totalCredito = transacoesCredito.sumByBigDecimal { it.totalCreditoMes ?: BigDecimal.ZERO }
                totalDebito = transacoesDebito.sumByBigDecimal { it.totalCreditoMes ?: BigDecimal.ZERO }
            }
            TipoPeriodo.ANO -> {
                dataPeriodoAnterior = dataPeriodoAtual.minusYears(1)
                totalCredito = transacoesCredito.sumByBigDecimal { it.totalCreditoAno ?: BigDecimal.ZERO }
                totalDebito = transacoesDebito.sumByBigDecimal { it.totalCreditoAno ?: BigDecimal.ZERO }
            }
        }

        val periodoAnterior = cassandraPort.getCurrentBalance(pontoControleConfig.ledgerSuporte,
                Date.from(dataPeriodoAnterior.atZone(ZoneId.systemDefault()).toInstant()))

        val resultado = (periodoAnterior.saldo ?: BigDecimal.ZERO)
                .plus(totalCredito)
                .minus(totalDebito)

        val diferenca = resultado.minus(transacaoSuporte.saldo ?: BigDecimal.ZERO)

        return PontoControle(
                controle = controle,
                tipoPeriodo = tipoPeriodo,
                resultadoPeriodo = PontoControleLedger(
                        valor = resultado,
                        dataInclusao = inclusionDate
                                .toInstant()
                                .atZone(ZoneId.of(timezone))
                                .toLocalDateTime()),
                diferenca = PontoControleLedger(
                        valor = diferenca,
                        dataInclusao = inclusionDate
                                .toInstant()
                                .atZone(ZoneId.of(timezone))
                                .toLocalDateTime()),
                periodoAnterior = PontoControleLedger(
                        dataInclusao = periodoAnterior.dataInclusao, saldo = periodoAnterior.saldo),
                ledgers = getPontoControleLedgers(transacoesCredito, transacoesDebito, tipoPeriodo),
                suporte = PontoControleLedger(dataInclusao = transacaoSuporte.dataInclusao,
                        saldo = transacaoSuporte.saldo)
        )

    }

    private fun getPontoControleLedgers(transacoesCredito: List<TransacaoContabil>,
                                        transacoesDebito: List<TransacaoContabil>,
                                        tipoPeriodo: TipoPeriodo): List<PontoControleLedger> {
        return transacoesCredito.map {
            PontoControleLedger(ledger = it.ledger, tipoLedger = TipoOperacao.CREDITO.name,
                    dataInclusao = it.dataInclusao,
                    totalCredito = getTotalCreditoByTipoPeriodo(tipoPeriodo, it))
        } + transacoesDebito.map {
            PontoControleLedger(ledger = it.ledger, tipoLedger = TipoOperacao.DEBITO.name,
                    dataInclusao = it.dataInclusao,
                    totalCredito = getTotalCreditoByTipoPeriodo(tipoPeriodo, it))
        }
    }

    private fun getTotalCreditoByTipoPeriodo(tipoPeriodo: TipoPeriodo,
                                             transacaoContabil: TransacaoContabil): BigDecimal? {
        return when (tipoPeriodo) {
            TipoPeriodo.DIA -> {
                transacaoContabil.totalCreditoDia
            }
            TipoPeriodo.MES -> {
                transacaoContabil.totalCreditoMes
            }
            TipoPeriodo.ANO -> {
                transacaoContabil.totalCreditoAno
            }
        }
    }
}
