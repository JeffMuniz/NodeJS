package br.com.mac.api.ctb.transacao.domain.service

import br.com.mac.api.ctb.transacao.ApplicationTest
import br.com.mac.api.ctb.transacao.config.CassandraContainerSetup
import br.com.mac.api.ctb.transacao.constant.SUBSTRING_DATE_ONLY
import br.com.mac.api.ctb.transacao.constant.SUBSTRING_START_INDEX
import br.com.mac.api.ctb.transacao.domain.model.*
import br.com.mac.ctb.enum.TipoOperacao
import br.com.mac.api.ctb.transacao.extension.toDateAndFixedTime
import br.com.mac.api.ctb.transacao.extension.toDatePattern
import br.com.mac.api.ctb.transacao.mock.MockTest
import br.com.mac.api.ctb.transacao.port.CassandraPort
import br.com.mac.ctb.enum.TipoLedger
import org.junit.jupiter.api.AfterAll
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.TestInstance
import org.junit.jupiter.api.assertThrows
import org.junit.jupiter.api.extension.ExtendWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.data.domain.PageRequest
import org.springframework.test.context.ContextConfiguration
import org.springframework.test.context.junit.jupiter.SpringExtension
import java.math.BigDecimal
import java.util.Collections


@SpringBootTest(classes = [ApplicationTest::class])
@ContextConfiguration(initializers = [CassandraContainerSetup::class])
@ExtendWith(SpringExtension::class)
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class TransacaoContabilServiceTest {

    @Value("\${ledger.name}")
    private lateinit var ledger: String

    @Autowired
    private lateinit var transacaoContabilService: TransacaoContabilService

    @Autowired
    private lateinit var cassandraPort: CassandraPort

    @Autowired
    private lateinit var extratoServiceInterpreter: ExtratoServiceInterpreter

    @Autowired
    private lateinit var mockTest: MockTest

    @AfterAll
    fun cleanInformationalTables() {

        mockTest.cleanOrderTable()
        mockTest.cleanAuthorizationTable()
        mockTest.cleanAdjustmentTable()
        mockTest.cleanSchedulingRequestTable()
    }

    @BeforeEach
    fun cleanLedger() = mockTest.cleanLedger()

    @Test
    fun testGetCurrentBalanceOnEmptyLedger() {

        val currentBalance = transacaoContabilService.getCurrentBalance(ledger = ledger)

        assertEquals(currentBalance.saldo, BigDecimal.ZERO)
    }

    @Test
    fun testGetCurrentBalance() {

        mockTest.cleanLedger()
        val saldo = BigDecimal("1000.00")
        mockTest.insertBalanceOnLedger(saldo)

        val currentBalance = transacaoContabilService.getCurrentBalance(ledger = ledger)

        assertEquals(currentBalance.saldo, saldo)
    }

    @Test
    fun testGetBalancePerDateOnEmptyLedger() {

        val transacaoContabil = transacaoContabilService.getCurrentBalance(ledger = ledger,
                inclusionDate = mockTest.getISOCurrentDateAndTime().toDatePattern())

        assertEquals(transacaoContabil.saldo, BigDecimal.ZERO)
    }

    @Test
    fun testGetBalancePerDate() {

        val saldo = BigDecimal("1000.00")
        mockTest.insertBalanceAndYesterdayDateOnLedger(saldo)

        val transacaoContabil = transacaoContabilService.getCurrentBalance(ledger = ledger,
                inclusionDate = mockTest.getISOCurrentDateAndTime().toDatePattern())

        assertEquals(transacaoContabil.saldo, saldo)
    }

    @Test
    fun testGetAmountPerTypeOnEmptyLedger() {

        val transacaoContabil = transacaoContabilService.getAmountPerType(ledger = ledger,
                operationType = TipoOperacao.CREDITO.name,
                startDate = mockTest.getISOCurrentDateAndTime()
                        .substring(SUBSTRING_START_INDEX, SUBSTRING_DATE_ONLY).toDateAndFixedTime(),
                endDate = mockTest.getISOCurrentDateAndTime().toDatePattern())

        assertEquals(transacaoContabil.valor, BigDecimal.ZERO)
    }

    @Test
    fun testGetAmountPerType() {

        val valor = BigDecimal("1000.00")
        val tipoOperacao = TipoOperacao.DEBITO.name
        mockTest.insertAmountAndTypeAndCurrentDateOnLedger(amount = valor, type = tipoOperacao)

        val transacaoContabil = transacaoContabilService.getAmountPerType(ledger = ledger, operationType = tipoOperacao,
                startDate = mockTest.getISOCurrentDateAndTime()
                        .substring(SUBSTRING_START_INDEX, SUBSTRING_DATE_ONLY).toDateAndFixedTime(),
                endDate = mockTest.getISOTomorrowDateAndTime().toDatePattern())

        assertEquals(transacaoContabil.valor, valor)

    }

    @Test
    fun testGetLedgerStatementOnEmptyLedger() {

        val list = transacaoContabilService.getTransacoes(ledger = ledger,
                startDate = mockTest.getISOYesterdayDateAndTime().toDatePattern(),
                endDate = mockTest.getISOCurrentDateAndTime().toDatePattern(),
                tipoOperacao = TipoOperacao.CREDITO,
                page = PageRequest.of(0, 5))

        assertEquals(list, Collections.EMPTY_LIST)
    }

    @Test
    fun testGetLedgerStatement() {

        val listOfTransacaoContabil = mockTest.insertListOnLedger()

        val listOfPedido = mockTest.insertListOnOrderTable()

        val listOfCreditoDisponivel = listOfTransacaoContabil
                .map { transacaoContabil ->

                    val pedido = listOfPedido.first { it.idPedido?.toInt() == transacaoContabil.codigoEvento }

                    CreditoDisponivel(transacaoContabil, pedido)

                }.toList()

        val listPage1 = transacaoContabilService.getTransacoes(ledger = ledger,
                startDate = mockTest.getISOYesterdayDateAndTime().toDatePattern(),
                endDate = mockTest.getISOCurrentDateAndTime().toDatePattern(),
                tipoOperacao = null,
                page = PageRequest.of(0, 2))

        assertEquals(listOfCreditoDisponivel.reversed().take(2), listPage1)

        val listPage2 = transacaoContabilService.getTransacoes(ledger = ledger,
                startDate = mockTest.getISOYesterdayDateAndTime().toDatePattern(),
                endDate = mockTest.getISOCurrentDateAndTime().toDatePattern(),
                tipoOperacao = null,
                page = PageRequest.of(1, 2))

        assertEquals(listOfCreditoDisponivel.reversed().takeLast(1), listPage2)

    }

    @Test
    fun testGetLedgerStatementWithoutPageable() {

        val listOfTransacaoContabil = mockTest.insertListOnLedger()

        val listOfPedido = mockTest.insertListOnOrderTable()

        val listOfCreditoDisponivel = listOfTransacaoContabil
                .map { transacaoContabil ->

                    val pedido = listOfPedido.first { it.idPedido?.toInt() == transacaoContabil.codigoEvento }

                    CreditoDisponivel(transacaoContabil, pedido)

                }.toList()

        val listPage1 = transacaoContabilService.getTransacoes(ledger = ledger,
                startDate = mockTest.getISOYesterdayDateAndTime().toDatePattern(),
                endDate = mockTest.getISOCurrentDateAndTime().toDatePattern(),
                tipoOperacao = null,
                page = null)

        assertEquals(listOfCreditoDisponivel.reversed().take(2), listPage1.take(2))

    }

    @Test
    fun testGetLedgerStatementWithInvalidLedgerType() {

        val ledgerInvalido = "credito_teste"

        mockTest.createTransacaoContabil(ledger = ledgerInvalido.toUpperCase())

        assertThrows<IllegalArgumentException> {
            transacaoContabilService.getTransacoes(ledger = ledgerInvalido,
                    startDate = mockTest.getISOYesterdayDateAndTime().toDatePattern(),
                    endDate = mockTest.getISOCurrentDateAndTime().toDatePattern(),
                    tipoOperacao = TipoOperacao.CREDITO,
                    page = PageRequest.of(0, 2))
        }

    }


    @Test
    fun testGetAuthorizationStatement() {

        val transacaoContabil = mockTest.insertAuthorizationOnLedger()

        val autorizacao = mockTest.insertOnAuthorizationTable()

        val listOfTransacaoDesfeita =
                arrayListOf(TransacaoDesfeita(transacaoContabil, autorizacao))

        val listPage1 = transacaoContabilService.getTransacoes(ledger = "TRANSACAO_DESFEITA",
                startDate = mockTest.getISOYesterdayDateAndTime().toDatePattern(),
                endDate = mockTest.getISOCurrentDateAndTime().toDatePattern(),
                tipoOperacao = null,
                page = PageRequest.of(0, 1))

        assertEquals(listOfTransacaoDesfeita, listPage1)

    }

    @Test
    fun testGetCreditAdjustmentStatement() {

        val transacaoContabil = mockTest.insertCreditAdjustmentOnLedger()

        val ajuste = mockTest.insertCreditOnAdjustmentTable()

        val listOfAjusteCredito =
                arrayListOf(AjusteCredito(transacaoContabil, ajuste))

        val listPage1 = transacaoContabilService.getTransacoes(ledger = "AJUSTE_CREDITO",
                startDate = mockTest.getISOYesterdayDateAndTime().toDatePattern(),
                endDate = mockTest.getISOCurrentDateAndTime().toDatePattern(),
                tipoOperacao = null,
                page = PageRequest.of(0, 1))

        assertEquals(listOfAjusteCredito, listPage1)
    }

    @Test
    fun testGetDebitAdjustmentStatement() {

        val transacaoContabil = mockTest.insertDebitAdjustmentOnLedger()

        val ajuste = mockTest.insertDebitOnAdjustmentTable()

        val listOfAjusteDebito =
                arrayListOf(AjusteDebito(transacaoContabil, ajuste))

        val listPage1 = transacaoContabilService.getTransacoes(ledger = "AJUSTE_DEBITO",
                startDate = mockTest.getISOYesterdayDateAndTime().toDatePattern(),
                endDate = mockTest.getISOCurrentDateAndTime().toDatePattern(),
                tipoOperacao = null,
                page = PageRequest.of(0, 1))

        assertEquals(listOfAjusteDebito, listPage1)
    }

    @Test
    fun testGetCreditSchedulingRequestStatement() {

        val transacaoContabil = mockTest.insertCreditSchedulingRequestOnLedger()
        val agendamentoPedido = mockTest.insertCreditOnSchedulingRequestTable()
        val agendamentoPedidos =
                arrayListOf(AgendamentoPedidoPendente(transacaoContabil, agendamentoPedido))
        val listPage1 = transacaoContabilService.getTransacoes(ledger = "PEDIDO_RECEBIMENTO_PENDENTE",
                startDate = mockTest.getISOYesterdayDateAndTime().toDatePattern(),
                endDate = mockTest.getISOCurrentDateAndTime().toDatePattern(),
                tipoOperacao = null,
                page = PageRequest.of(0, 1))

        assertEquals(agendamentoPedidos, listPage1)
    }
}
