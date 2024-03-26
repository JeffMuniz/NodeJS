package br.com.mac.api.ctb.transacao.domain.service

import br.com.mac.api.ctb.transacao.ApplicationTest
import br.com.mac.api.ctb.transacao.config.CassandraContainerSetup
import br.com.mac.ctb.enum.TipoOperacao
import br.com.mac.api.ctb.transacao.mock.MockTest
import br.com.mac.api.ctb.transacao.port.CassandraPort
import br.com.mac.ctb.enum.TipoPeriodo
import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.ContextConfiguration
import org.springframework.test.context.junit.jupiter.SpringExtension
import java.math.BigDecimal
import java.util.Date

@SpringBootTest(classes = [ApplicationTest::class])
@ContextConfiguration(initializers = [CassandraContainerSetup::class])
@ExtendWith(SpringExtension::class)
class PontoControleServiceTest {

    @Autowired
    private lateinit var pontoControleService: PontoControleService

    @Autowired
    private lateinit var cassandraPort: CassandraPort

    @Autowired
    private lateinit var mockTest: MockTest

    @BeforeEach
    fun cleanLedger() = mockTest.cleanLedger()

    @Test
    fun testGetPontoControleSaldo() {

        val valor1 = BigDecimal("100.00")
        val valor2 = valor1.multiply(BigDecimal(2))
        val valor3 = valor1.multiply(BigDecimal(3))

        mockTest.createTransacaoContabil(ledger = "CREDITO_PENDENTE", valor = valor1, saldo = valor1,
                tipoOperacao = TipoOperacao.CREDITO.name, totalCreditoDia = valor1, totalCreditoMes = valor1,
                totalCreditoAno = valor1, saldoAnterior = BigDecimal.ZERO)

        mockTest.createTransacaoContabil(ledger = "CREDITO_PENDENTE", valor = valor1, saldo = valor2,
                tipoOperacao = TipoOperacao.CREDITO.name, totalCreditoDia = valor2, totalCreditoMes = valor2,
                totalCreditoAno = valor2, saldoAnterior = valor1)

        mockTest.createTransacaoContabil(ledger = "CREDITO_PENDENTE", valor = valor1, saldo = valor3,
                tipoOperacao = TipoOperacao.CREDITO.name, totalCreditoDia = valor3, totalCreditoMes = valor3,
                totalCreditoAno = valor3, saldoAnterior = valor2)

        mockTest.createTransacaoContabil(ledger = "CREDITO_PENDENTE", valor = valor1, saldo = valor2,
                tipoOperacao = TipoOperacao.DEBITO.name, totalCreditoDia = valor3, totalCreditoMes = valor3,
                totalCreditoAno = valor3, saldoAnterior = valor3)

        mockTest.createTransacaoContabil(ledger = "CREDITO_PENDENTE", valor = valor1, saldo = valor1,
                tipoOperacao = TipoOperacao.DEBITO.name, totalCreditoDia = valor3, totalCreditoMes = valor3,
                totalCreditoAno = valor3, saldoAnterior = valor2)

        mockTest.createTransacaoContabil(ledger = "CREDITO_CANCELADO", valor = valor1, saldo = valor1,
                tipoOperacao = TipoOperacao.CREDITO.name, totalCreditoDia = valor1, totalCreditoMes = valor1,
                totalCreditoAno = valor1)

        mockTest.createTransacaoContabil(ledger = "CREDITO_DISPONIVEL", valor = valor1, saldo = valor1,
                tipoOperacao = TipoOperacao.CREDITO.name, totalCreditoDia = valor1, totalCreditoMes = valor1,
                totalCreditoAno = valor1)

        val controle = "REPASSE_PEDIDO"
        val pontoControle = pontoControleService.getPontoControleSaldo(controle, TipoPeriodo.DIA, Date())

        Assertions.assertEquals(controle, pontoControle.controle)
        Assertions.assertEquals(TipoPeriodo.DIA, pontoControle.tipoPeriodo)
        Assertions.assertEquals(3, pontoControle.ledgers?.size)
        Assertions.assertEquals(valor1, pontoControle.suporte?.saldo)
        Assertions.assertEquals(BigDecimal.ZERO, pontoControle.periodoAnterior?.saldo)
        Assertions.assertEquals(BigDecimal("0.00"), pontoControle.diferenca?.valor)

    }
}