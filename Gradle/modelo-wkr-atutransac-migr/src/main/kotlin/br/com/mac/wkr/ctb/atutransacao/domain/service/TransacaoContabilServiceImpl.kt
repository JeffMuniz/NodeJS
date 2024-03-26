package br.com.mac.wkr.ctb.atutransacao.domain.service

import br.com.mac.wkr.ctb.atutransacao.domain.enum.TipoOperacao
import br.com.mac.wkr.ctb.atutransacao.domain.model.TransacaoContabil
import br.com.mac.wkr.ctb.atutransacao.port.CassandraPort
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.domain.PageRequest
import org.springframework.scheduling.annotation.Async
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.math.BigDecimal
import java.time.LocalDateTime
import java.time.ZoneId
import java.util.Date
import java.util.LinkedList
import kotlin.system.measureTimeMillis

@Service
@Transactional
class TransacaoContabilServiceImpl : TransacaoContabilService {

    private var logger: Logger = LoggerFactory.getLogger(TransacaoContabilServiceImpl::class.java)

    @Autowired
    private lateinit var cassandraPort: CassandraPort

    @Async
    override fun process(ledger: String, recordsSize: Int, initialDate: Date?) {

        val totalTransacoes = cassandraPort.countTransacoes(ledger, initialDate)

        logger.info("{} - Processing {} records", ledger, totalTransacoes)

        var transacaoAnterior: TransacaoContabil? = null
        val lastPage: Int = ((totalTransacoes - 1) / recordsSize).toInt()

        initialDate?.let {
            transacaoAnterior = cassandraPort.findBaseTransaction(ledger, initialDate)
        }

        try {
            for (page in 0..lastPage) {

                logger.info("{} - Processing page {} of {}", ledger, page, lastPage)

                var transacoes: LinkedList<TransacaoContabil>? = null

                val findExecutionTime = measureTimeMillis {
                    transacoes = cassandraPort.findTransacoes(ledger = ledger,
                        initialDate = initialDate, page = PageRequest.of(page, recordsSize))
                }

                logger.info("{} - findTransactions [delay:{}ms]", ledger, findExecutionTime)

                transacoes?.push(transacaoAnterior)

                transacoes?.map { it }?.reduce { t1, t2 -> calculate(t1, t2) }

                if (transacaoAnterior == null) transacoes?.removeFirst()

                transacaoAnterior = transacoes?.last()

                val saveAllExecutionTime = measureTimeMillis {
                    transacoes?.let {
                        cassandraPort.saveAll(it)
                    }
                }

                logger.info("{} - saveAll [delay:{}ms]", ledger, saveAllExecutionTime)
            }

            logger.info("{} - Finished", ledger)

        } catch (ex : Exception) {
            logger.error("Exception on proccess ledger: {}", ledger)
            throw ex
        }

    }

    fun calculate(transacaoAnterior: TransacaoContabil?, transacaoContabil: TransacaoContabil): TransacaoContabil {

        val novoSaldo = if (transacaoContabil.tipoOperacao == TipoOperacao.DEBITO)
            (transacaoAnterior?.saldo ?: BigDecimal.ZERO).subtract(transacaoContabil.valor
                    ?: BigDecimal.ZERO)
        else
            (transacaoAnterior?.saldo ?: BigDecimal.ZERO).add(transacaoContabil.valor ?: BigDecimal.ZERO)

        val dataInclusaoTransacaoAnterior = transacaoAnterior?.dataInclusao?.toInstant()
                ?.atZone(ZoneId.systemDefault())?.toLocalDateTime()
        val dataInclusaoTransacaoAtual = transacaoContabil.dataInclusao?.toInstant()
                ?.atZone(ZoneId.systemDefault())?.toLocalDateTime()

        transacaoContabil.codigoTransacaoAnterior = transacaoAnterior?.codigoTransacao
        transacaoContabil.saldoAnterior = transacaoAnterior?.saldo
        transacaoContabil.saldo = novoSaldo

        transacaoContabil.totalCreditoDia = calculateCreditoDia(dataInclusaoTransacaoAtual,
                dataInclusaoTransacaoAnterior, transacaoAnterior, transacaoContabil)

        transacaoContabil.totalCreditoMes = calculateCreditoMes(dataInclusaoTransacaoAtual,
                dataInclusaoTransacaoAnterior, transacaoAnterior, transacaoContabil)

        transacaoContabil.totalCreditoAno = calculateCreditoAno(dataInclusaoTransacaoAtual,
                dataInclusaoTransacaoAnterior, transacaoAnterior, transacaoContabil)

        return transacaoContabil

    }

    fun calculateCreditoDia(dataInclusaoAtual: LocalDateTime?, dataInclusaoTransacaoAnterior: LocalDateTime?,
                            transacaoAnterior: TransacaoContabil?, transacaoAtual: TransacaoContabil): BigDecimal {

        val totalCreditoDiaAnterior = if (
                dataInclusaoAtual?.dayOfMonth == dataInclusaoTransacaoAnterior?.dayOfMonth
                && dataInclusaoAtual?.monthValue == dataInclusaoTransacaoAnterior?.monthValue
                && dataInclusaoAtual?.year == dataInclusaoTransacaoAnterior?.year)
            transacaoAnterior?.totalCreditoDia ?: BigDecimal.ZERO else BigDecimal.ZERO

        return if (transacaoAtual.tipoOperacao == TipoOperacao.CREDITO)
            totalCreditoDiaAnterior.add(transacaoAtual.valor ?: BigDecimal.ZERO) else totalCreditoDiaAnterior
    }

    fun calculateCreditoMes(dataInclusaoAtual: LocalDateTime?, dataInclusaoTransacaoAnterior: LocalDateTime?,
                            transacaoAnterior: TransacaoContabil?, transacaoAtual: TransacaoContabil): BigDecimal {

        val totalCreditoMesAnterior = if (
                dataInclusaoAtual?.monthValue == dataInclusaoTransacaoAnterior?.monthValue
                && dataInclusaoAtual?.year == dataInclusaoTransacaoAnterior?.year)
            transacaoAnterior?.totalCreditoMes ?: BigDecimal.ZERO else BigDecimal.ZERO

        return if (transacaoAtual.tipoOperacao == TipoOperacao.CREDITO)
            totalCreditoMesAnterior.add(transacaoAtual.valor ?: BigDecimal.ZERO) else totalCreditoMesAnterior
    }

    fun calculateCreditoAno(dataInclusaoAtual: LocalDateTime?, dataInclusaoTransacaoAnterior: LocalDateTime?,
                            transacaoAnterior: TransacaoContabil?, transacaoAtual: TransacaoContabil): BigDecimal {

        val totalCreditoAnoAnterior = if (dataInclusaoAtual?.year == dataInclusaoTransacaoAnterior?.year)
            transacaoAnterior?.totalCreditoAno ?: BigDecimal.ZERO else BigDecimal.ZERO

        return if (transacaoAtual.tipoOperacao == TipoOperacao.CREDITO)
            totalCreditoAnoAnterior.add(transacaoAtual.valor ?: BigDecimal.ZERO) else totalCreditoAnoAnterior
    }

}
