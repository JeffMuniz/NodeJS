package br.com.mac.wkr.ctb.atutransacao.domain.service

import br.com.mac.adapter.elassandra.ElassandraAdapter
import br.com.mac.wkr.ctb.atutransacao.ApplicationTest
import br.com.mac.wkr.ctb.atutransacao.config.AdapterConfig
import br.com.mac.wkr.ctb.atutransacao.container.ElassandraContainerSetup
import br.com.mac.wkr.ctb.atutransacao.domain.entity.TransacaoContabilEntity
import br.com.mac.wkr.ctb.atutransacao.domain.entity.TransacaoContabilKey
import br.com.mac.wkr.ctb.atutransacao.domain.enum.TipoOperacao
import br.com.mac.wkr.ctb.atutransacao.domain.model.TransacaoContabil
import br.com.mac.wkr.ctb.atutransacao.port.CassandraPort
import com.datastax.driver.core.ResultSet
import com.datastax.driver.core.utils.UUIDs
import org.assertj.core.api.Assertions.assertThat
import org.awaitility.Awaitility.await
import org.awaitility.kotlin.matches
import org.awaitility.kotlin.untilCallTo
import org.junit.jupiter.api.BeforeAll
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.TestInstance
import org.junit.jupiter.api.extension.ExtendWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.annotation.DirtiesContext
import org.springframework.test.context.ContextConfiguration
import org.springframework.test.context.junit.jupiter.SpringExtension
import java.math.BigDecimal
import java.time.LocalDate
import java.time.LocalDateTime
import java.time.LocalTime
import java.time.ZoneId
import java.util.Date
import java.util.concurrent.TimeUnit

@ExtendWith(SpringExtension::class)
@SpringBootTest(classes = [ApplicationTest::class])
@ContextConfiguration(
        initializers = [ElassandraContainerSetup::class],
        classes = [AdapterConfig::class,
            AdapterConfig::class]
)
@DirtiesContext
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class TransacaoContabilServiceTest {

    @Value("\${mac.ledgers}")
    private lateinit var ledger: String

    @Value("\${mac.initial-date:}")
    private lateinit var initialDate: String

    @Autowired
    private lateinit var transacaoContabilService: TransacaoContabilService

    @Autowired
    private lateinit var cassandraAdapter: ElassandraAdapter<TransacaoContabilEntity, TransacaoContabilKey>

    @Autowired
    private lateinit var cassandraPort: CassandraPort

    private lateinit var data: Date

    @BeforeAll
    fun before() {

        val date: LocalDate = LocalDate.of(YEAR, MONTH, DAY)
        val time = LocalTime.of(HOUR, MINUTE, SECOND)

        data = Date.from(LocalDateTime.of(date, time).atZone(ZoneId.systemDefault()).toInstant())

    }

    @BeforeEach
    fun beforeEach() {
        this.cleanLedger()
    }

    @Test
    fun testProcess() {

        for (i in 0 until 500) insertRecords(ledger, TipoOperacao.DEBITO)
        for (i in 0 until 1000) insertRecords(ledger, TipoOperacao.CREDITO)

        transacaoContabilService.process(ledger = ledger, initialDate = null, recordsSize = 15000)

        await().atMost(60, TimeUnit.SECONDS).untilCallTo {
            getSaldoLastRecord() } matches { saldo -> saldo!! > BigDecimal.ZERO
        }

        assertThat(getSaldoFirstRecord()?.toDouble()).isEqualTo(-1000.00)
        assertThat(getSaldoLastRecord()?.toDouble()).isEqualTo(500000.0)
    }

    @Test
    fun testProcessWithInitialDate() {

        val previousDay = Date.from(LocalDate
                .parse(initialDate)
                .minusDays(1)
                .atStartOfDay()
                .atZone(ZoneId.systemDefault())
                .toInstant())

        //insert a record one day before the inicialDate (mac.initial-date properties)
        insertRecords(ledger, TipoOperacao.CREDITO, previousDay, BigDecimal(500.0))

        for (i in 0 until 1000) insertRecords(ledger, TipoOperacao.CREDITO)
        for (i in 0 until 500) insertRecords(ledger, TipoOperacao.DEBITO)

        transacaoContabilService.process(ledger = ledger, initialDate = data, recordsSize = 120)

        await().atMost(60, TimeUnit.SECONDS).untilCallTo {
            getSaldoLastRecord() } matches { saldo -> saldo!! > BigDecimal.ZERO
        }

        assertThat(getSaldoFirstRecord()?.toDouble()).isEqualTo(500.00)
        assertThat(getSaldoLastRecord()?.toDouble()).isEqualTo(500500.0)

    }

    fun getSaldoLastRecord(): BigDecimal? {
        val lastRecord = cassandraAdapter.execute("SELECT tx_saldo FROM transacao_contabil " +
                "WHERE ds_ledger = :ledger LIMIT 1;", hashMapOf<String, Any>(Pair("ledger", ledger))) as? ResultSet
        return lastRecord?.one()?.getDecimal("tx_saldo")
    }

    fun getSaldoFirstRecord(): BigDecimal? {
        val firtRecord = cassandraAdapter.execute("SELECT tx_saldo FROM transacao_contabil " +
                "WHERE ds_ledger = :ledger ORDER BY dt_inclusao ASC LIMIT 1;", hashMapOf<String, Any>(Pair("ledger", ledger))) as? ResultSet
        return firtRecord?.one()?.getDecimal("tx_saldo")
    }

    fun insertRecords(ledger: String, tipoOperacao: TipoOperacao, date: Date, saldoInicial: BigDecimal?) {

        val transacaoContabil = TransacaoContabil(
                codigoTransacao = UUIDs.timeBased(),
                codigoEvento = 1225,
                tipoEvento = "REPASSE_CONFIRMADO",
                dataEvento = date,
                valor = BigDecimal("1000.00"),
                tipoOperacao = tipoOperacao,
                ledger = ledger,
                dataInclusao = date,
                saldo = saldoInicial,
                saldoAnterior = null,
                totalCreditoDia = null,
                totalCreditoMes = null,
                totalCreditoAno = null
        )

        cassandraPort.insert(transacaoContabil)
    }

    fun insertRecords(ledger: String, tipoOperacao: TipoOperacao) {
        val date = Date.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant())
        insertRecords(ledger, tipoOperacao, date, null)
    }

    fun cleanLedger() {

        cassandraAdapter.execute("TRUNCATE test.transacao_contabil;")
    }

    companion object {
        const val YEAR = 2020
        const val MONTH = 1
        const val DAY = 1
        const val HOUR = 0
        const val MINUTE = 0
        const val SECOND = 0
    }

}
