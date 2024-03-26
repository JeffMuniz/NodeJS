package br.com.mac.api.ctb.transacao.domain.service.virtualAccounting

import br.com.mac.api.ctb.transacao.ApplicationTest
import br.com.mac.api.ctb.transacao.config.CassandraContainerSetup
import br.com.mac.api.ctb.transacao.domain.model.ContaVirtualCreditoPendente
import br.com.mac.api.ctb.transacao.domain.model.ContaVirtualCreditoUtilizado
import br.com.mac.api.ctb.transacao.domain.model.Extrato
import br.com.mac.api.ctb.transacao.domain.model.TransacaoContabil
import br.com.mac.api.ctb.transacao.domain.service.ConciliacaoService

import br.com.mac.ctb.enum.TipoLedger
import br.com.mac.api.ctb.transacao.domain.service.ExtratoService
import br.com.mac.api.ctb.transacao.domain.service.impl.virtualAccounting.ExtratoContaVirtualServiceImpl
import br.com.mac.api.ctb.transacao.mock.MockTest
import br.com.mac.api.ctb.transacao.port.CassandraPort
import br.com.mac.ctb.enum.TipoOperacao
import org.junit.jupiter.api.*
import org.junit.jupiter.api.extension.ExtendWith
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.stereotype.Service
import org.springframework.test.context.ContextConfiguration
import org.springframework.test.context.junit.jupiter.SpringExtension
import java.math.BigDecimal
import kotlin.streams.toList

@SpringBootTest(classes = [ApplicationTest::class])
@ContextConfiguration(initializers = [CassandraContainerSetup::class])
@ExtendWith(SpringExtension::class)
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class ExtratoContaVirtualServiceImplTest {

    @Autowired
    private lateinit var extratoContaVirtualServiceImpl: ExtratoContaVirtualServiceImpl

    @Autowired
    private lateinit var mockTest: MockTest

    @BeforeEach
    fun cleanLedger() = mockTest.cleanLedger()

    @Test
    fun `When Conta Virtual Credito Pendente was requested then return a Extrato list`() {

        var ledger = TipoLedger.CONTAVIRTUAL_CREDITO_PENDENTE
        var contaVirtual = mockTest.addVirtualAccounting()

        var accountingTransactions: List<TransacaoContabil> =
                listOf(mockTest.addTransaction(
                        contaVirtual.idBoleto,
                        ledger,
                        "CREDITO_PENDENTE",
                        TipoOperacao.CREDITO))

        var extratos = extratoContaVirtualServiceImpl.getStatement(ledger, accountingTransactions)

        var extrato = extratos.first()

        Assertions.assertEquals(ledger.name, extrato.transacaoContabil.ledger)
        Assertions.assertEquals("CREDITO_PENDENTE", extrato.transacaoContabil.tipoEvento)
        Assertions.assertEquals(TipoOperacao.CREDITO.name, extrato.transacaoContabil.tipoOperacao)

    }

    @Test
    fun `When Conta Virtual Credito Utilizado was requested then return a Extrato list`() {

        var ledger = TipoLedger.CONTAVIRTUAL_CREDITO_UTILIZADO
        var contaVirtual = mockTest.addVirtualAccounting()

        var accountingTransactions: List<TransacaoContabil> =
                listOf(mockTest.addTransaction(
                        contaVirtual.idBoleto,
                        ledger,
                        "CREDITO_UTILIZADO",
                        TipoOperacao.CREDITO))

        var extratos = extratoContaVirtualServiceImpl.getStatement(ledger, accountingTransactions)

        var extrato = extratos.first()

        Assertions.assertEquals(ledger.name, extrato.transacaoContabil.ledger)
        Assertions.assertEquals("CREDITO_UTILIZADO", extrato.transacaoContabil.tipoEvento)
        Assertions.assertEquals(TipoOperacao.CREDITO.name, extrato.transacaoContabil.tipoOperacao)

    }

    @Test
    fun `When Debit in Conta Virtual Credito Pendente was requested then return a Extrato list`() {

        var ledger = TipoLedger.CONTAVIRTUAL_CREDITO_PENDENTE
        var contaVirtual = mockTest.addVirtualAccounting()

        var accountingTransactions: List<TransacaoContabil> =
                listOf(mockTest.addTransaction(
                        contaVirtual.idBoleto,
                        ledger,
                        "CREDITO_UTILIZADO",
                        TipoOperacao.DEBITO))

        var extratos = extratoContaVirtualServiceImpl.getStatement(ledger, accountingTransactions)

        var extrato = extratos.first()

        Assertions.assertEquals(ledger.name, extrato.transacaoContabil.ledger)
        Assertions.assertEquals("CREDITO_UTILIZADO", extrato.transacaoContabil.tipoEvento)
        Assertions.assertEquals(TipoOperacao.DEBITO.name, extrato.transacaoContabil.tipoOperacao)

    }
}
