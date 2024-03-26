package br.com.mac.api.ctb.transacao.controller

import br.com.mac.api.ctb.transacao.ApplicationTest
import br.com.mac.api.ctb.transacao.config.CassandraContainerSetup
import br.com.mac.api.ctb.transacao.constant.DATETIME_FORMAT_VALIDATOR_MESSAGE
import br.com.mac.api.ctb.transacao.constant.OPERATION_TYPE_VALIDATOR_MESSAGE
import br.com.mac.api.ctb.transacao.constant.VALIDATION_FAIL_MESSAGE
import br.com.mac.api.ctb.transacao.domain.dto.SaldoDTO
import br.com.mac.api.ctb.transacao.domain.dto.SaldoResponseDTO
import br.com.mac.api.ctb.transacao.domain.dto.TransacaoContabilDTO
import br.com.mac.api.ctb.transacao.domain.model.*
import br.com.mac.api.ctb.transacao.domain.service.TransacaoContabilService
import br.com.mac.api.ctb.transacao.exception.Error
import br.com.mac.api.ctb.transacao.exception.ErrorResponse
import br.com.mac.api.ctb.transacao.mock.MockTest
import br.com.mac.ctb.entity.*
import br.com.mac.ctb.enum.TipoLedger
import br.com.mac.ctb.enum.TipoOperacao
import com.datastax.driver.core.utils.UUIDs
import com.fasterxml.jackson.databind.ObjectMapper
import com.ninjasquad.springmockk.MockkBean
import io.mockk.every
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.TestInstance
import org.junit.jupiter.api.extension.ExtendWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.data.domain.PageRequest
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.test.context.ContextConfiguration
import org.springframework.test.context.junit.jupiter.SpringExtension
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.get
import java.math.BigDecimal
import java.time.Instant
import java.time.LocalDate
import java.time.LocalDateTime
import java.time.ZoneId
import java.util.*


@SpringBootTest(classes = [ApplicationTest::class])
@ContextConfiguration(initializers = [CassandraContainerSetup::class])
@ExtendWith(SpringExtension::class)
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@AutoConfigureMockMvc
class TransacaoContabilControllerTest {

    @Value("\${ledger.name}")
    private lateinit var ledger: String

    @Value("\${mac.timezone}")
    private var timezone: String? = null

    @Autowired
    private lateinit var mapper: ObjectMapper

    @Autowired
    private lateinit var mockMvc: MockMvc

    @MockkBean
    private lateinit var service: TransacaoContabilService

    @Autowired
    private lateinit var mockTest: MockTest

    /*
    *
    *  GetCurrentBalance
    * */

    @Test
    fun shouldGetCurrentBalance() {

        val saldo = BigDecimal("1000.00")
        val transacaoContabil = TransacaoContabil(saldo = saldo)
        val saldoDTO = SaldoDTO(valor = saldo)

        every { service.getCurrentBalance(any()) } returns transacaoContabil

        val saldoJSON = mapper.writeValueAsString(SaldoResponseDTO(saldo = saldoDTO)) as String

        mockMvc.get("/ledgers/$ledger/saldo") {
            contentType = MediaType.APPLICATION_JSON
            accept = MediaType.APPLICATION_JSON
        }.andExpect {
            status { isOk }
            content { contentType(MediaType.APPLICATION_JSON) }
            content { json(saldoJSON) }
        }
    }

    @Test
    fun shouldFailIfLedgerIsEmptyOnGetCurrentBalance() {

        mockMvc.get("/ledgers//saldo") {
            contentType = MediaType.APPLICATION_JSON
            accept = MediaType.APPLICATION_JSON
        }.andExpect {
            status { isNotFound }
        }

    }

    @Test
    fun shouldFailIfLedgerIsMissingOnGetCurrentBalance() {

        mockMvc.get("/ledgers//saldo") {
            contentType = MediaType.APPLICATION_JSON
            accept = MediaType.APPLICATION_JSON
        }.andExpect {
            status { isNotFound }
        }

    }

    @Test
    fun shouldFailIfInclusionDateHasInvalidDateFormatOnGetCurrentBalance() {

        val invalidDate = "01-01-2020 23:12:15"

        val errorResponse = ErrorResponse(mensagem = VALIDATION_FAIL_MESSAGE,
                erros = arrayListOf(Error(codigo = HttpStatus.BAD_REQUEST.value(),
                        mensagem = DATETIME_FORMAT_VALIDATOR_MESSAGE)))

        val errorResponseJSON = mapper.writeValueAsString(errorResponse) as String


        mockMvc.get("/ledgers/$ledger/saldo?dataInclusao=$invalidDate") {
            contentType = MediaType.APPLICATION_JSON
            accept = MediaType.APPLICATION_JSON
        }.andExpect {
            status { isBadRequest }
            content { contentType(MediaType.APPLICATION_JSON) }
            content { json(errorResponseJSON) }
        }

    }

    @Test
    fun shouldFailIfInclusionDateHasInvalidTimeFormatOnGetCurrentBalance() {

        val invalidDate = "2020-01-01 23:60:15"

        val errorResponse = ErrorResponse(mensagem = VALIDATION_FAIL_MESSAGE,
                erros = arrayListOf(Error(codigo = HttpStatus.BAD_REQUEST.value(),
                        mensagem = DATETIME_FORMAT_VALIDATOR_MESSAGE)))

        val errorResponseJSON = mapper.writeValueAsString(errorResponse) as String


        mockMvc.get("/ledgers/$ledger/saldo?dataInclusao=$invalidDate") {
            contentType = MediaType.APPLICATION_JSON
            accept = MediaType.APPLICATION_JSON
        }.andExpect {
            status { isBadRequest }
            content { contentType(MediaType.APPLICATION_JSON) }
            content { json(errorResponseJSON) }
        }

    }

    /*
    *
    *  GetBalancePerType
    * */

    @Test
    fun shouldGetBalancePerType() {

        val date = mockTest.getISOCurrentDateAndTime()
        val operationType = "credito"
        val transacaoContabil = TransacaoContabil(tipoOperacao = null, dataInclusao = null,
                saldo = BigDecimal("1000.00"), valor = null)

        every { service.getAmountPerType(any(), any(), any(), any()) } returns transacaoContabil

        val balanceJSON = mapper.writeValueAsString(transacaoContabil.toDto()) as String


        mockMvc.get("/ledgers/$ledger/montante-por-tipo-operacao?dataInclusao=$date" +
                "&tipoOperacao=$operationType") {
            contentType = MediaType.APPLICATION_JSON
            accept = MediaType.APPLICATION_JSON
        }.andExpect {
            status { isOk }
            content { contentType(MediaType.APPLICATION_JSON) }
            content { json(balanceJSON) }
        }

    }

    @Test
    fun shouldFailIfInclusionDateHasInvalidDateFormatOnGetBalancePerType() {

        val invalidDate = "01-01-2020 23:12:15"
        val operationType = "credito"

        val errorResponse = ErrorResponse(mensagem = VALIDATION_FAIL_MESSAGE,
                erros = arrayListOf(Error(codigo = HttpStatus.BAD_REQUEST.value(),
                        mensagem = DATETIME_FORMAT_VALIDATOR_MESSAGE)))

        val errorResponseJSON = mapper.writeValueAsString(errorResponse) as String


        mockMvc.get("/ledgers/$ledger/montante-por-tipo-operacao?dataInclusao=$invalidDate" +
                "&tipoOperacao=$operationType") {
            contentType = MediaType.APPLICATION_JSON
            accept = MediaType.APPLICATION_JSON
        }.andExpect {
            status { isBadRequest }
            content { contentType(MediaType.APPLICATION_JSON) }
            content { json(errorResponseJSON) }
        }

    }

    @Test
    fun shouldFailIfInclusionDateHasInvalidTimeFormatOnGetBalancePerType() {

        val invalidDate = "2020-01-01 23:12:60"
        val operationType = "credito"

        val errorResponse = ErrorResponse(mensagem = VALIDATION_FAIL_MESSAGE,
                erros = arrayListOf(Error(codigo = HttpStatus.BAD_REQUEST.value(),
                        mensagem = DATETIME_FORMAT_VALIDATOR_MESSAGE)))

        val errorResponseJSON = mapper.writeValueAsString(errorResponse) as String


        mockMvc.get("/ledgers/$ledger/montante-por-tipo-operacao?dataInclusao=$invalidDate" +
                "&tipoOperacao=$operationType") {
            contentType = MediaType.APPLICATION_JSON
            accept = MediaType.APPLICATION_JSON
        }.andExpect {
            status { isBadRequest }
            content { contentType(MediaType.APPLICATION_JSON) }
            content { json(errorResponseJSON) }
        }

    }

    @Test
    fun shouldFailIfOperationTypeIsInvalidOnGetBalancePerType() {

        val date = mockTest.getISOCurrentDateAndTime()
        val operationType = "parcelado"

        val errorResponse = ErrorResponse(mensagem = VALIDATION_FAIL_MESSAGE,
                erros = arrayListOf(Error(codigo = HttpStatus.BAD_REQUEST.value(),
                        mensagem = OPERATION_TYPE_VALIDATOR_MESSAGE)))

        val errorResponseJSON = mapper.writeValueAsString(errorResponse) as String


        mockMvc.get("/ledgers/$ledger/montante-por-tipo-operacao?dataInclusao=$date" +
                "&tipoOperacao=$operationType") {
            contentType = MediaType.APPLICATION_JSON
            accept = MediaType.APPLICATION_JSON
        }.andExpect {
            status { isBadRequest }
            content { contentType(MediaType.APPLICATION_JSON) }
            content { json(errorResponseJSON) }
        }

    }

    @Test
    fun shouldFailIfLedgerIsEmptyOnGetBalancePerType() {

        val date = mockTest.getISOCurrentDateAndTime()
        val operationType = "credito"

        mockMvc.get("/ledgers//montante-por-tipo-operacao?dataInclusao=$date&tipoOperacao=$operationType") {
            contentType = MediaType.APPLICATION_JSON
            accept = MediaType.APPLICATION_JSON
        }.andExpect {
            status { isNotFound }
        }

    }

    @Test
    fun shouldFailIfInclusionDateIsEmptyOnGetBalancePerType() {

        val operationType = "credito"

        val errorResponse = ErrorResponse(mensagem = VALIDATION_FAIL_MESSAGE,
                erros = arrayListOf(Error(codigo = HttpStatus.BAD_REQUEST.value(),
                        mensagem = "Parâmetro ${TransacaoContabilDTO::dataInclusao.name} é obrigatório")))

        val errorResponseJSON = mapper.writeValueAsString(errorResponse) as String

        mockMvc.get("/ledgers/$ledger/montante-por-tipo-operacao?dataInclusao=&tipoOperacao=$operationType") {
            contentType = MediaType.APPLICATION_JSON
            accept = MediaType.APPLICATION_JSON
        }.andExpect {
            status { isBadRequest }
            content { contentType(MediaType.APPLICATION_JSON) }
            content { json(errorResponseJSON) }
        }

    }

    @Test
    fun shouldFailIfOperatioTypeIsEmptyOnGetBalancePerType() {

        val date = mockTest.getISOCurrentDateAndTime()

        val errorResponse = ErrorResponse(mensagem = VALIDATION_FAIL_MESSAGE,
                erros = arrayListOf(Error(codigo = HttpStatus.BAD_REQUEST.value(),
                        mensagem = OPERATION_TYPE_VALIDATOR_MESSAGE)))

        val errorResponseJSON = mapper.writeValueAsString(errorResponse) as String

        mockMvc.get("/ledgers/$ledger/montante-por-tipo-operacao?dataInclusao=$date&tipoOperacao=") {
            contentType = MediaType.APPLICATION_JSON
            accept = MediaType.APPLICATION_JSON
        }.andExpect {
            status { isBadRequest }
            content { contentType(MediaType.APPLICATION_JSON) }
            content { json(errorResponseJSON) }
        }

    }

    @Test
    fun shouldFailIfLedgerIsMissingOnGetBalancePerType() {

        val date = mockTest.getISOCurrentDateAndTime()
        val operationType = "credito"

        mockMvc.get("/ledgers//montante-por-tipo-operacao?dataInclusao=$date&tipoOperacao=$operationType") {
            contentType = MediaType.APPLICATION_JSON
            accept = MediaType.APPLICATION_JSON
        }.andExpect {
            status { isNotFound }
        }

    }

    @Test
    fun shouldFailIfInclusionDateIsMissingOnGetBalancePerType() {

        val operationType = "credito"

        val errorResponse = ErrorResponse(mensagem = VALIDATION_FAIL_MESSAGE,
                erros = arrayListOf(Error(codigo = HttpStatus.BAD_REQUEST.value(),
                        mensagem = "Parâmetro dataInclusao é obrigatório")))

        val errorResponseJSON = mapper.writeValueAsString(errorResponse) as String

        mockMvc.get("/ledgers/$ledger/montante-por-tipo-operacao?tipoOperacao=$operationType") {
            contentType = MediaType.APPLICATION_JSON
            accept = MediaType.APPLICATION_JSON
        }.andExpect {
            status { isBadRequest }
            content { contentType(MediaType.APPLICATION_JSON) }
            content { json(errorResponseJSON) }
        }

    }

    @Test
    fun shouldFailIfOperatioTypeIsMissingOnGetBalancePerType() {

        val date = mockTest.getISOCurrentDateAndTime()

        val errorResponse = ErrorResponse(mensagem = VALIDATION_FAIL_MESSAGE,
                erros = arrayListOf(Error(codigo = HttpStatus.BAD_REQUEST.value(),
                        mensagem = "Parâmetro tipoOperacao é obrigatório")))

        val errorResponseJSON = mapper.writeValueAsString(errorResponse) as String

        mockMvc.get("/ledgers/$ledger/montante-por-tipo-operacao?dataInclusao=$date") {
            contentType = MediaType.APPLICATION_JSON
            accept = MediaType.APPLICATION_JSON
        }.andExpect {
            status { isBadRequest }
            content { contentType(MediaType.APPLICATION_JSON) }
            content { json(errorResponseJSON) }
        }

    }

    /*
    *
    *  GetLedgerStatement
    * */

    @Test
    fun shouldGetLedgerStatement() {

        val startDate = mockTest.getISOYesterdayDateAndTime()
        val endDate = mockTest.getISOCurrentDateAndTime()
        val page = 0
        val size = 1
        val transacaoContabil = TransacaoContabil(
                codigoTransacao = UUID.fromString("af3a52c0-69df-11ea-81ed-bb84fe44d674"),
                ledger = ledger.toUpperCase(),
                dataInclusao = LocalDateTime.now().atZone(ZoneId.of(timezone)).toLocalDateTime(),
                codigoTransacaoAnterior = null,
                codigoEvento = 1,
                tipoEvento = "REPASSE_CONFIRMADO",
                tipoOperacao = TipoOperacao.CREDITO.name,
                dataEvento = LocalDateTime.now().atZone(ZoneId.of(timezone)).toLocalDateTime(),
                saldoAnterior = BigDecimal.ZERO,
                saldo = BigDecimal("1000.00"),
                valor = BigDecimal("1000.00"))

        val pedido = Pedido(
                idPedido = BigDecimal("3"),
                cdCargaControleFinanceiro = 2285,
                cdClienteRhCarga = 5227,
                cdClienteRhSolic = 5227,
                cdEmpresa = 5227,
                cdGrupo = 7513,
                cdProduto = 1,
                cdStatusNf = 2,
                cdSubGrupo = 7514,
                cnpjCarga = "87358283000126",
                cnpjRhGrupo = "87358283000126",
                cnpjRhSubgrupo = "87358283000126",
                cnpjSolicitante = "87358283000126",
                cpf = "48679104817",
                dataHora = mockTest.converCurrentLocalDateTimeWithSecondsLessToDate(100L),
                descClienteCarga = "Conductor QA 1",
                descClienteSolicitante = "Conductor QA 1",
                descProduto = "Produto PAT - Alimentação",
                descStatusNf = "NF Gerada - Aguardando Retorno",
                dtAgendamentoCredito = mockTest.converCurrentLocalDateTimeWithSecondsLessToDate(100L),
                dtBaixaPagto = null,
                dtCancelamento = null,
                dtEmissaoTitulo = mockTest.converCurrentLocalDateTimeWithSecondsLessToDate(777600L),
                dtEntradaPedido = mockTest.converCurrentLocalDateTimeWithSecondsLessToDate(864000L),
                dtLiberacaoCredito = mockTest.converCurrentLocalDateTimeWithSecondsLessToDate(86400L),
                dtPagtoPedido = null,
                dtVenctoCobranca = Date.from(
                        LocalDate.parse("2019-06-22").atStartOfDay().atZone(ZoneId.systemDefault()).toInstant()),
                idArquivo = 1587,
                idBoletoPedido = 690,
                idCarga = 14984,
                idPortador = 17681,
                nmGrupo = "Conductor QA",
                nmSubGrupo = "Conductor QA",
                nomePortador = "Eduardo Souza",
                numeroNf = null,
                statusCarga = "Pedido Processado",
                tipoBoleto = "Boleto RH",
                tipoPagto = "POS",
                tipoRecebimento = "B",
                vlCargaPortador = BigDecimal("100.00"),
                vlTotalEsperadoGrupo = BigDecimal("300.00"),
                vlTotalProcessadoGrupo = BigDecimal("300.00")
        )

        val listOfEffectiveCreditOrderStatement = listOf(CreditoDisponivel(
                transacaoContabil = transacaoContabil, pedido = pedido))

        every { service.getTransacoes(any(), any(), any(), any(), any()) } returns listOfEffectiveCreditOrderStatement

        val pageDto = mockTest
                .convertlistOfTransacaoContabilToResponsePageDto(listOfEffectiveCreditOrderStatement, PageRequest.of(page, size))

        val extratoJSON = mapper.writeValueAsString(pageDto) as String

        mockMvc.get("/ledgers/$ledger/extrato?dataInicial=$startDate" +
                "&dataFinal=$endDate&page=$page&size=$size") {
            contentType = MediaType.APPLICATION_JSON
            accept = MediaType.APPLICATION_JSON
        }.andExpect {
            status { isOk }
            content { contentType(MediaType.APPLICATION_JSON) }
            content { json(extratoJSON) }
        }

    }

    @Test
    fun shouldFailIfInclusionStartDateHasInvalidDateFormatOnGetLedgerStatement() {

        val startDate = "01-01-2020 23:12:15"
        val endDate = mockTest.getISOCurrentDateAndTime()
        val page = 0
        val size = 1

        val errorResponse = ErrorResponse(mensagem = VALIDATION_FAIL_MESSAGE,
                erros = arrayListOf(Error(codigo = HttpStatus.BAD_REQUEST.value(),
                        mensagem = DATETIME_FORMAT_VALIDATOR_MESSAGE)))

        val errorResponseJSON = mapper.writeValueAsString(errorResponse) as String


        mockMvc.get("/ledgers/$ledger/extrato?dataInicial=$startDate" +
                "&dataFinal=$endDate&page=$page&size=$size") {
            contentType = MediaType.APPLICATION_JSON
            accept = MediaType.APPLICATION_JSON
        }.andExpect {
            status { isBadRequest }
            content { contentType(MediaType.APPLICATION_JSON) }
            content { json(errorResponseJSON) }
        }

    }

    @Test
    fun shouldFailIfInclusionStartDateHasInvalidTimeFormatOnGetLedgerStatement() {

        val startDate = "01-01-2020 23:60:15"
        val endDate = mockTest.getISOCurrentDateAndTime()
        val page = 0
        val size = 1

        val errorResponse = ErrorResponse(mensagem = VALIDATION_FAIL_MESSAGE,
                erros = arrayListOf(Error(codigo = HttpStatus.BAD_REQUEST.value(),
                        mensagem = DATETIME_FORMAT_VALIDATOR_MESSAGE)))

        val errorResponseJSON = mapper.writeValueAsString(errorResponse) as String


        mockMvc.get("/ledgers/$ledger/extrato?dataInicial=$startDate" +
                "&dataFinal=$endDate&page=$page&size=$size") {
            contentType = MediaType.APPLICATION_JSON
            accept = MediaType.APPLICATION_JSON
        }.andExpect {
            status { isBadRequest }
            content { contentType(MediaType.APPLICATION_JSON) }
            content { json(errorResponseJSON) }
        }

    }

    @Test
    fun shouldFailIfInclusionEndDateHasInvalidDateFormatOnGetLedgerStatement() {

        val startDate = mockTest.getISOCurrentDateAndTime()
        val endDate = "01-01-2020 23:12:15"
        val page = 0
        val size = 1

        val errorResponse = ErrorResponse(mensagem = VALIDATION_FAIL_MESSAGE,
                erros = arrayListOf(Error(codigo = HttpStatus.BAD_REQUEST.value(),
                        mensagem = DATETIME_FORMAT_VALIDATOR_MESSAGE)))

        val errorResponseJSON = mapper.writeValueAsString(errorResponse) as String


        mockMvc.get("/ledgers/$ledger/extrato?dataInicial=$startDate" +
                "&dataFinal=$endDate&page=$page&size=$size") {
            contentType = MediaType.APPLICATION_JSON
            accept = MediaType.APPLICATION_JSON
        }.andExpect {
            status { isBadRequest }
            content { contentType(MediaType.APPLICATION_JSON) }
            content { json(errorResponseJSON) }
        }

    }

    @Test
    fun shouldFailIfInclusionEndDateHasInvalidTimeFormatOnGetLedgerStatement() {

        val startDate = mockTest.getISOCurrentDateAndTime()
        val endDate = "01-01-2020 23:12:60"
        val page = 0
        val size = 1

        val errorResponse = ErrorResponse(mensagem = VALIDATION_FAIL_MESSAGE,
                erros = arrayListOf(Error(codigo = HttpStatus.BAD_REQUEST.value(),
                        mensagem = DATETIME_FORMAT_VALIDATOR_MESSAGE)))

        val errorResponseJSON = mapper.writeValueAsString(errorResponse) as String


        mockMvc.get("/ledgers/$ledger/extrato?dataInicial=$startDate" +
                "&dataFinal=$endDate&page=$page&size=$size") {
            contentType = MediaType.APPLICATION_JSON
            accept = MediaType.APPLICATION_JSON
        }.andExpect {
            status { isBadRequest }
            content { contentType(MediaType.APPLICATION_JSON) }
            content { json(errorResponseJSON) }
        }

    }


    @Test
    fun shouldFailIfLedgerIsEmptyOnGetLedgerStatement() {

        val startDate = mockTest.getISOYesterdayDateAndTime()
        val endDate = mockTest.getISOCurrentDateAndTime()
        val page = 0
        val size = 1

        mockMvc.get("/ledgers//extrato?dataInicial=$startDate" +
                "&dataFinal=$endDate&page=$page&size=$size") {
            contentType = MediaType.APPLICATION_JSON
            accept = MediaType.APPLICATION_JSON
        }.andExpect {
            status { isNotFound }
        }

    }

    @Test
    fun shouldFailIfStartDateIsEmptyOnGetLedgerStatement() {

        val endDate = mockTest.getISOCurrentDateAndTime()
        val page = 0
        val size = 1

        val errorResponse = ErrorResponse(mensagem = VALIDATION_FAIL_MESSAGE,
                erros = arrayListOf(Error(codigo = HttpStatus.BAD_REQUEST.value(),
                        mensagem = "Parâmetro ${TransacaoContabilDTO::dataInicial.name} é obrigatório")))

        val errorResponseJSON = mapper.writeValueAsString(errorResponse) as String

        mockMvc.get("/ledgers/$ledger/extrato?dataInicial=" +
                "&dataFinal=$endDate&page=$page&size=$size") {
            contentType = MediaType.APPLICATION_JSON
            accept = MediaType.APPLICATION_JSON
        }.andExpect {
            status { isBadRequest }
            content { contentType(MediaType.APPLICATION_JSON) }
            content { json(errorResponseJSON) }
        }

    }

    @Test
    fun shouldFailIfEndDateIsEmptyOnGetLedgerStatement() {

        val startDate = mockTest.getISOCurrentDateAndTime()
        val page = 0
        val size = 1

        val errorResponse = ErrorResponse(mensagem = VALIDATION_FAIL_MESSAGE,
                erros = arrayListOf(Error(codigo = HttpStatus.BAD_REQUEST.value(),
                        mensagem = "Parâmetro ${TransacaoContabilDTO::dataFinal.name} é obrigatório")))

        val errorResponseJSON = mapper.writeValueAsString(errorResponse) as String

        mockMvc.get("/ledgers/$ledger/extrato?dataInicial=$startDate" +
                "&dataFinal=&page=$page&size=$size") {
            contentType = MediaType.APPLICATION_JSON
            accept = MediaType.APPLICATION_JSON
        }.andExpect {
            status { isBadRequest }
            content { contentType(MediaType.APPLICATION_JSON) }
            content { json(errorResponseJSON) }
        }

    }


    @Test
    fun shouldFailIfLedgerIsMissingOnGetLedgerStatement() {

        val startDate = mockTest.getISOYesterdayDateAndTime()
        val endDate = mockTest.getISOCurrentDateAndTime()
        val page = 0
        val size = 1

        mockMvc.get("/ledgers//extrato?dataInicial=$startDate" +
                "&dataFinal=$endDate&page=$page&size=$size") {
            contentType = MediaType.APPLICATION_JSON
            accept = MediaType.APPLICATION_JSON
        }.andExpect {
            status { isNotFound }
        }

    }

    @Test
    fun shouldFailIfStartDateIsMissingOnGetLedgerStatement() {

        val endDate = mockTest.getISOCurrentDateAndTime()
        val page = 0
        val size = 1

        val errorResponse = ErrorResponse(mensagem = VALIDATION_FAIL_MESSAGE,
                erros = arrayListOf(Error(codigo = HttpStatus.BAD_REQUEST.value(),
                        mensagem = "Parâmetro ${TransacaoContabilDTO::dataInicial.name} é obrigatório")))

        val errorResponseJSON = mapper.writeValueAsString(errorResponse) as String

        mockMvc.get("/ledgers/$ledger/extrato?dataFinal=$endDate&page=$page&size=$size") {
            contentType = MediaType.APPLICATION_JSON
            accept = MediaType.APPLICATION_JSON
        }.andExpect {
            status { isBadRequest }
            content { contentType(MediaType.APPLICATION_JSON) }
            content { json(errorResponseJSON) }
        }

    }

    @Test
    fun shouldFailIfEndDateIsMissingOnGetLedgerStatement() {

        val startDate = mockTest.getISOCurrentDateAndTime()
        val page = 0
        val size = 1

        val errorResponse = ErrorResponse(mensagem = VALIDATION_FAIL_MESSAGE,
                erros = arrayListOf(Error(codigo = HttpStatus.BAD_REQUEST.value(),
                        mensagem = "Parâmetro ${TransacaoContabilDTO::dataFinal.name} é obrigatório")))

        val errorResponseJSON = mapper.writeValueAsString(errorResponse) as String

        mockMvc.get("/ledgers/$ledger/extrato?dataInicial=$startDate" +
                "&page=$page&size=$size") {
            contentType = MediaType.APPLICATION_JSON
            accept = MediaType.APPLICATION_JSON
        }.andExpect {
            status { isBadRequest }
            content { contentType(MediaType.APPLICATION_JSON) }
            content { json(errorResponseJSON) }
        }

    }

    @Test
    fun `Download - When the parameters is corret than return a File`() {

        val startDate = mockTest.getISOYesterdayDateAndTime()
        val endDate = mockTest.getISOCurrentDateAndTime()
        val page = 0
        val size = 1
        val transacaoContabil = TransacaoContabil(
                codigoTransacao = UUID.fromString("af3a52c0-69df-11ea-81ed-bb84fe44d674"),
                ledger = ledger.toUpperCase(),
                dataInclusao = LocalDateTime.now().atZone(ZoneId.of(timezone)).toLocalDateTime(),
                codigoTransacaoAnterior = null,
                codigoEvento = 1,
                tipoEvento = "REPASSE_CONFIRMADO",
                tipoOperacao = TipoOperacao.CREDITO.name,
                dataEvento = LocalDateTime.now().atZone(ZoneId.of(timezone)).toLocalDateTime(),
                saldoAnterior = BigDecimal.ZERO,
                saldo = BigDecimal("1000.00"),
                valor = BigDecimal("1000.00"))

        val pedido = Pedido(
                idPedido = BigDecimal("3"),
                cdCargaControleFinanceiro = 2285,
                cdClienteRhCarga = 5227,
                cdClienteRhSolic = 5227,
                cdEmpresa = 5227,
                cdGrupo = 7513,
                cdProduto = 1,
                cdStatusNf = 2,
                cdSubGrupo = 7514,
                cnpjCarga = "87358283000126",
                cnpjRhGrupo = "87358283000126",
                cnpjRhSubgrupo = "87358283000126",
                cnpjSolicitante = "87358283000126",
                cpf = "48679104817",
                dataHora = mockTest.converCurrentLocalDateTimeWithSecondsLessToDate(100L),
                descClienteCarga = "Conductor QA 1",
                descClienteSolicitante = "Conductor QA 1",
                descProduto = "Produto PAT - Alimentação",
                descStatusNf = "NF Gerada - Aguardando Retorno",
                dtAgendamentoCredito = mockTest.converCurrentLocalDateTimeWithSecondsLessToDate(100L),
                dtBaixaPagto = null,
                dtCancelamento = null,
                dtEmissaoTitulo = mockTest.converCurrentLocalDateTimeWithSecondsLessToDate(777600L),
                dtEntradaPedido = mockTest.converCurrentLocalDateTimeWithSecondsLessToDate(864000L),
                dtLiberacaoCredito = mockTest.converCurrentLocalDateTimeWithSecondsLessToDate(86400L),
                dtPagtoPedido = null,
                dtVenctoCobranca = Date.from(
                        LocalDate.parse("2019-06-22").atStartOfDay().atZone(ZoneId.systemDefault()).toInstant()),
                idArquivo = 1587,
                idBoletoPedido = 690,
                idCarga = 14984,
                idPortador = 17681,
                nmGrupo = "Conductor QA",
                nmSubGrupo = "Conductor QA",
                nomePortador = "Eduardo Souza",
                numeroNf = null,
                statusCarga = "Pedido Processado",
                tipoBoleto = "Boleto RH",
                tipoPagto = "POS",
                tipoRecebimento = "B",
                vlCargaPortador = BigDecimal("100.00"),
                vlTotalEsperadoGrupo = BigDecimal("300.00"),
                vlTotalProcessadoGrupo = BigDecimal("300.00")
        )

        val listOfEffectiveCreditOrderStatement = listOf(CreditoDisponivel(
                transacaoContabil = transacaoContabil, pedido = pedido))

        every { service.getTransacoes(any(), any(), any(), any(), any()) } returns listOfEffectiveCreditOrderStatement

        mockMvc.get("/ledgers/$ledger/extrato/download?dataInicial=$startDate" +
                "&dataFinal=$endDate&page=$page&size=$size") {
            contentType = MediaType.parseMediaType("text/csv")
        }.andExpect {
            status { isOk }
            content { contentType(MediaType.parseMediaType("text/csv")) }
        }
    }

    @Test
    fun `When all parameters right to Pedido Recebimento Cancelado then return 200`() {

        val startDate = mockTest.getISOYesterdayDateAndTime()
        val endDate = mockTest.getISOCurrentDateAndTime()
        val page = 0
        val size = 1
        val transacaoContabil = TransacaoContabil(
                codigoTransacao = UUIDs.random(),
                ledger = TipoLedger.PEDIDO_RECEBIMENTO_CANCELADO.name,
                dataInclusao = Instant.now().atZone(ZoneId.of(timezone)).toLocalDateTime(),
                codigoTransacaoAnterior = null,
                codigoEvento = 1,
                tipoEvento = "CANCELAMENTO_AGENDAMENTO_PEDIDO",
                tipoOperacao = TipoOperacao.CREDITO.name,
                dataEvento = Instant.now().atZone(ZoneId.of(timezone)).toLocalDateTime(),
                saldoAnterior = BigDecimal.ZERO,
                saldo = BigDecimal("1000.00"),
                valor = BigDecimal("1000.00"))

        val agendamentoPedidoCancelado = AgendamentoPedidoEntity(
                agendamentoPedidoKey = AgendamentoPedidoKey(6),
                dataEmissaoTitulo = mockTest.converCurrentLocalDateTimeWithSecondsLessToDate(86400L),
                cnpjSolicitante = "111.111.111/1111-11",
                descricaoClienteSolicitante = "Razão Socia",
                cdClienteRhSolic = 2456,
                tipoBoleto = "CAIXA",
                nossoNumero = "0003423.234234",
                tipoRecebimento = "COMERCIAL",
                dataEntradaPedido = mockTest.converCurrentLocalDateTimeWithSecondsLessToDate(86400L),
                dataLiberacaoPedido = mockTest.converCurrentLocalDateTimeWithSecondsLessToDate(96400L),
                dataVenciementoCobranca = mockTest.converCurrentLocalDateTimeWithSecondsLessToDate(96400L),
                statusCarga = "BEGIN",
                valorCarga = BigDecimal(1000.0),
                valorCredidtoUtilizado = BigDecimal(200.0),
                valorCobranca = BigDecimal(100.0),
                idArquivo = 10,
                codigoCargaControleFinanceiro = 50,
                statusCargamaceficio = 1,
                statusEmpresaCargaDetalheProduto = 3,
                tipoBandeira = "VISA"
        )

        val agendamentoPedidosCancelado =
                arrayListOf(AgendamentoPedidoCancelado(transacaoContabil, AgendamentoPedido(agendamentoPedidoCancelado)))

        every { service.getTransacoes(any(), any(), any(), any(), any()) } returns agendamentoPedidosCancelado

        val pageDto = mockTest
                .convertlistOfTransacaoContabilToResponsePageDto(agendamentoPedidosCancelado, PageRequest.of(page, size))

        val extratoJSON = mapper.writeValueAsString(pageDto) as String

        mockMvc.get("/ledgers/${TipoLedger.PEDIDO_RECEBIMENTO_CANCELADO.name}/extrato?dataInicial=$startDate" +
                "&dataFinal=$endDate&page=$page&size=$size") {
            contentType = MediaType.APPLICATION_JSON
            accept = MediaType.APPLICATION_JSON
        }.andExpect {
            status { isOk }
            content { contentType(MediaType.APPLICATION_JSON) }
            content { json(extratoJSON) }
        }
    }

    @Test
    fun `When all parameters right to Pedido Recebimento Efetivado then return 200`() {

        val startDate = mockTest.getISOYesterdayDateAndTime()
        val endDate = mockTest.getISOCurrentDateAndTime()
        val page = 0
        val size = 1
        val transacaoContabil = TransacaoContabil(
                codigoTransacao = UUIDs.random(),
                ledger = TipoLedger.PEDIDO_RECEBIMENTO_EFETIVADO.name,
                dataInclusao = Instant.now().atZone(ZoneId.of(timezone)).toLocalDateTime(),
                codigoTransacaoAnterior = null,
                codigoEvento = 1,
                tipoEvento = "RECEBIMENTO_EFETIVACAO",
                tipoOperacao = TipoOperacao.CREDITO.name,
                dataEvento = Instant.now().atZone(ZoneId.of(timezone)).toLocalDateTime(),
                saldoAnterior = BigDecimal.ZERO,
                saldo = BigDecimal("1000.00"),
                valor = BigDecimal("1000.00"))

        val agendamentoPedidoEfetivado = AgendamentoPedidoEntity(
                agendamentoPedidoKey = AgendamentoPedidoKey(7),
                dataEmissaoTitulo = mockTest.converCurrentLocalDateTimeWithSecondsLessToDate(86400L),
                cnpjSolicitante = "111.111.111/1111-11",
                descricaoClienteSolicitante = "Razão Socia",
                cdClienteRhSolic = 2456,
                tipoBoleto = "CAIXA",
                nossoNumero = "0003423.234234",
                tipoRecebimento = "COMERCIAL",
                dataEntradaPedido = mockTest.converCurrentLocalDateTimeWithSecondsLessToDate(86400L),
                dataLiberacaoPedido = mockTest.converCurrentLocalDateTimeWithSecondsLessToDate(96400L),
                dataVenciementoCobranca = mockTest.converCurrentLocalDateTimeWithSecondsLessToDate(96400L),
                statusCarga = "BEGIN",
                valorCarga = BigDecimal(1000.0),
                valorCredidtoUtilizado = BigDecimal(200.0),
                valorCobranca = BigDecimal(100.0),
                idArquivo = 10,
                codigoCargaControleFinanceiro = 50,
                statusCargamaceficio = 1,
                statusEmpresaCargaDetalheProduto = 3,
                tipoBandeira = "VISA"
        )

        val agendamentoPedidos =
                arrayListOf(AgendamentoPedidoEfetivado(transacaoContabil, AgendamentoPedido(agendamentoPedidoEfetivado)))

        every { service.getTransacoes(any(), any(), any(), any(), any()) } returns agendamentoPedidos

        val pageDto = mockTest
                .convertlistOfTransacaoContabilToResponsePageDto(agendamentoPedidos, PageRequest.of(page, size))

        val extratoJSON = mapper.writeValueAsString(pageDto) as String

        mockMvc.get("/ledgers/${TipoLedger.PEDIDO_RECEBIMENTO_EFETIVADO.name}/extrato?dataInicial=$startDate" +
                "&dataFinal=$endDate&page=$page&size=$size") {
            contentType = MediaType.APPLICATION_JSON
            accept = MediaType.APPLICATION_JSON
        }.andExpect {
            status { isOk }
            content { contentType(MediaType.APPLICATION_JSON) }
            content { json(extratoJSON) }
        }
    }

    @Test
    fun `When all parameters right to Pedido Recebimento Pendente then return 200`() {

        val startDate = mockTest.getISOYesterdayDateAndTime()
        val endDate = mockTest.getISOCurrentDateAndTime()
        val page = 0
        val size = 1
        val transacaoContabil = TransacaoContabil(
                codigoTransacao = UUIDs.random(),
                ledger = TipoLedger.PEDIDO_RECEBIMENTO_PENDENTE.name,
                dataInclusao = Instant.now().atZone(ZoneId.of(timezone)).toLocalDateTime(),
                codigoTransacaoAnterior = null,
                codigoEvento = 1,
                tipoEvento = "AGENDAMENTO_PEDIDO",
                tipoOperacao = TipoOperacao.CREDITO.name,
                dataEvento = Instant.now().atZone(ZoneId.of(timezone)).toLocalDateTime(),
                saldoAnterior = BigDecimal.ZERO,
                saldo = BigDecimal("1000.00"),
                valor = BigDecimal("1000.00"))

        val agendamentoPedidoPendente = AgendamentoPedidoEntity(
                agendamentoPedidoKey = AgendamentoPedidoKey(8),
                dataEmissaoTitulo = mockTest.converCurrentLocalDateTimeWithSecondsLessToDate(86400L),
                cnpjSolicitante = "111.111.111/1111-11",
                descricaoClienteSolicitante = "Razão Socia",
                cdClienteRhSolic = 2456,
                tipoBoleto = "CAIXA",
                nossoNumero = "0003423.234234",
                tipoRecebimento = "COMERCIAL",
                dataEntradaPedido = mockTest.converCurrentLocalDateTimeWithSecondsLessToDate(86400L),
                dataLiberacaoPedido = mockTest.converCurrentLocalDateTimeWithSecondsLessToDate(96400L),
                dataVenciementoCobranca = mockTest.converCurrentLocalDateTimeWithSecondsLessToDate(96400L),
                statusCarga = "BEGIN",
                valorCarga = BigDecimal(1000.0),
                valorCredidtoUtilizado = BigDecimal(200.0),
                valorCobranca = BigDecimal(100.0),
                idArquivo = 10,
                codigoCargaControleFinanceiro = 50,
                statusCargamaceficio = 1,
                statusEmpresaCargaDetalheProduto = 3,
                tipoBandeira = "VISA"
        )

        val agendamentoPedidos =
                arrayListOf(AgendamentoPedidoPendente(transacaoContabil, AgendamentoPedido(agendamentoPedidoPendente)))

        every { service.getTransacoes(any(), any(), any(), any(), any()) } returns agendamentoPedidos

        val pageDto = mockTest
                .convertlistOfTransacaoContabilToResponsePageDto(agendamentoPedidos, PageRequest.of(page, size))

        val extratoJSON = mapper.writeValueAsString(pageDto) as String

        mockMvc.get("/ledgers/${TipoLedger.PEDIDO_RECEBIMENTO_PENDENTE.name}/extrato?dataInicial=$startDate" +
                "&dataFinal=$endDate&page=$page&size=$size") {
            contentType = MediaType.APPLICATION_JSON
            accept = MediaType.APPLICATION_JSON
        }.andExpect {
            status { isOk }
            content { contentType(MediaType.APPLICATION_JSON) }
            content { json(extratoJSON) }
        }
    }

    @Test
    fun `When all parameters is null to Pedido Recebimento Cancelado then return 200`() {

        val startDate = mockTest.getISOYesterdayDateAndTime()
        val endDate = mockTest.getISOCurrentDateAndTime()
        val page = 0
        val size = 1
        val transacaoContabil = TransacaoContabil(
                codigoTransacao = UUIDs.random(),
                ledger = TipoLedger.PEDIDO_RECEBIMENTO_CANCELADO.name,
                dataInclusao = Instant.now().atZone(ZoneId.of(timezone)).toLocalDateTime(),
                codigoTransacaoAnterior = null,
                codigoEvento = 1,
                tipoEvento = "CANCELAMENTO_AGENDAMENTO_PEDIDO",
                tipoOperacao = TipoOperacao.CREDITO.name,
                dataEvento = Instant.now().atZone(ZoneId.of(timezone)).toLocalDateTime(),
                saldoAnterior = BigDecimal.ZERO,
                saldo = BigDecimal("1000.00"),
                valor = BigDecimal("1000.00"))

        val agendamentoPedidoCancelado = AgendamentoPedidoEntity(
                agendamentoPedidoKey = AgendamentoPedidoKey(9)
        )

        val agendamentoPedidos =
                arrayListOf(AgendamentoPedidoCancelado(transacaoContabil, AgendamentoPedido(agendamentoPedidoCancelado)))

        every { service.getTransacoes(any(), any(), any(), any(), any()) } returns agendamentoPedidos

        val pageDto = mockTest
                .convertlistOfTransacaoContabilToResponsePageDto(agendamentoPedidos, PageRequest.of(page, size))

        val extratoJSON = mapper.writeValueAsString(pageDto) as String

        mockMvc.get("/ledgers/${TipoLedger.PEDIDO_RECEBIMENTO_CANCELADO.name}/extrato?dataInicial=$startDate" +
                "&dataFinal=$endDate&page=$page&size=$size") {
            contentType = MediaType.APPLICATION_JSON
            accept = MediaType.APPLICATION_JSON
        }.andExpect {
            status { isOk }
            content { contentType(MediaType.APPLICATION_JSON) }
            content { json(extratoJSON) }
        }
    }


    @Test
    fun `When all parameters is null to Pedido Recebimento Efetivado then return 200`() {

        val startDate = mockTest.getISOYesterdayDateAndTime()
        val endDate = mockTest.getISOCurrentDateAndTime()
        val page = 0
        val size = 1
        val transacaoContabil = TransacaoContabil(
                codigoTransacao = UUIDs.random(),
                ledger = TipoLedger.PEDIDO_RECEBIMENTO_EFETIVADO.name,
                dataInclusao = Instant.now().atZone(ZoneId.of(timezone)).toLocalDateTime(),
                codigoTransacaoAnterior = null,
                codigoEvento = 1,
                tipoEvento = "RECEBIMENTO_EFETIVACAO",
                tipoOperacao = TipoOperacao.CREDITO.name,
                dataEvento = Instant.now().atZone(ZoneId.of(timezone)).toLocalDateTime(),
                saldoAnterior = BigDecimal.ZERO,
                saldo = BigDecimal("1000.00"),
                valor = BigDecimal("1000.00"))

        val agendamentoPedidoCancelado = AgendamentoPedidoEntity(
                agendamentoPedidoKey = AgendamentoPedidoKey(10)
        )

        val agendamentoPedidos =
                arrayListOf(AgendamentoPedidoEfetivado(transacaoContabil, AgendamentoPedido(agendamentoPedidoCancelado)))

        every { service.getTransacoes(any(), any(), any(), any(), any()) } returns agendamentoPedidos

        val pageDto = mockTest
                .convertlistOfTransacaoContabilToResponsePageDto(agendamentoPedidos, PageRequest.of(page, size))

        val extratoJSON = mapper.writeValueAsString(pageDto) as String

        mockMvc.get("/ledgers/${TipoLedger.PEDIDO_RECEBIMENTO_EFETIVADO.name}/extrato?dataInicial=$startDate" +
                "&dataFinal=$endDate&page=$page&size=$size") {
            contentType = MediaType.APPLICATION_JSON
            accept = MediaType.APPLICATION_JSON
        }.andExpect {
            status { isOk }
            content { contentType(MediaType.APPLICATION_JSON) }
            content { json(extratoJSON) }
        }
    }

    @Test
    fun `When all parameters is null to Pedido Recebimento Pendente then return 200`() {

        val startDate = mockTest.getISOYesterdayDateAndTime()
        val endDate = mockTest.getISOCurrentDateAndTime()
        val page = 0
        val size = 1
        val transacaoContabil = TransacaoContabil(
                codigoTransacao = UUIDs.random(),
                ledger = TipoLedger.PEDIDO_RECEBIMENTO_PENDENTE.name,
                dataInclusao = Instant.now().atZone(ZoneId.of(timezone)).toLocalDateTime(),
                codigoTransacaoAnterior = null,
                codigoEvento = 1,
                tipoEvento = "AGENDAMENTO_PEDIDO",
                tipoOperacao = TipoOperacao.CREDITO.name,
                dataEvento = Instant.now().atZone(ZoneId.of(timezone)).toLocalDateTime(),
                saldoAnterior = BigDecimal.ZERO,
                saldo = BigDecimal("1000.00"),
                valor = BigDecimal("1000.00"))

        val agendamentoPedidoPendente = AgendamentoPedidoEntity(
                agendamentoPedidoKey = AgendamentoPedidoKey(11)
        )

        val agendamentoPedidos =
                arrayListOf(AgendamentoPedidoPendente(transacaoContabil, AgendamentoPedido(agendamentoPedidoPendente)))

        every { service.getTransacoes(any(), any(), any(), any(), any()) } returns agendamentoPedidos

        val pageDto = mockTest
                .convertlistOfTransacaoContabilToResponsePageDto(agendamentoPedidos, PageRequest.of(page, size))

        val extratoJSON = mapper.writeValueAsString(pageDto) as String

        mockMvc.get("/ledgers/${TipoLedger.PEDIDO_RECEBIMENTO_PENDENTE.name}/extrato?dataInicial=$startDate" +
                "&dataFinal=$endDate&page=$page&size=$size") {
            contentType = MediaType.APPLICATION_JSON
            accept = MediaType.APPLICATION_JSON
        }.andExpect {
            status { isOk }
            content { contentType(MediaType.APPLICATION_JSON) }
            content { json(extratoJSON) }
        }
    }

    @Test
    fun `When all parameters is null to Pedido then return 200`() {

        val startDate = mockTest.getISOYesterdayDateAndTime()
        val endDate = mockTest.getISOCurrentDateAndTime()
        val page = 0
        val size = 1
        val transacaoContabil = TransacaoContabil(
                codigoTransacao = UUID.fromString("af3a52c0-69df-11ea-81ed-bb84fe44d674"),
                ledger = ledger.toUpperCase(),
                dataInclusao = LocalDateTime.now().atZone(ZoneId.of(timezone)).toLocalDateTime(),
                codigoTransacaoAnterior = null,
                codigoEvento = 1,
                tipoEvento = "REPASSE_CONFIRMADO",
                tipoOperacao = TipoOperacao.CREDITO.name,
                dataEvento = LocalDateTime.now().atZone(ZoneId.of(timezone)).toLocalDateTime(),
                saldoAnterior = BigDecimal.ZERO,
                saldo = BigDecimal("1000.00"),
                valor = BigDecimal("1000.00"))

        val pedido = Pedido(
                idPedido = BigDecimal("12")
        )

        val listOfEffectiveCreditOrderStatement = listOf(CreditoDisponivel(
                transacaoContabil = transacaoContabil, pedido = pedido))

        every { service.getTransacoes(any(), any(), any(), any(), any()) } returns listOfEffectiveCreditOrderStatement

        val pageDto = mockTest
                .convertlistOfTransacaoContabilToResponsePageDto(listOfEffectiveCreditOrderStatement, PageRequest.of(page, size))

        val extratoJSON = mapper.writeValueAsString(pageDto) as String

        mockMvc.get("/ledgers/$ledger/extrato?dataInicial=$startDate" +
                "&dataFinal=$endDate&page=$page&size=$size") {
            contentType = MediaType.APPLICATION_JSON
            accept = MediaType.APPLICATION_JSON
        }.andExpect {
            status { isOk }
            content { contentType(MediaType.APPLICATION_JSON) }
            content { json(extratoJSON) }
        }

    }

    @Test
    fun `When all parameters is null to Transacao Desfeita then return 200`() {

        val startDate = mockTest.getISOYesterdayDateAndTime()
        val endDate = mockTest.getISOCurrentDateAndTime()
        val page = 0
        val size = 1
        val transacaoContabil = TransacaoContabil(
                codigoTransacao = UUID.fromString("af3a52c0-69df-11ea-81ed-bb84fe44d674"),
                ledger = ledger.toUpperCase(),
                dataInclusao = LocalDateTime.now().atZone(ZoneId.of(timezone)).toLocalDateTime(),
                codigoTransacaoAnterior = null,
                codigoEvento = 1,
                tipoEvento = "REPASSE_CONFIRMADO",
                tipoOperacao = TipoOperacao.CREDITO.name,
                dataEvento = LocalDateTime.now().atZone(ZoneId.of(timezone)).toLocalDateTime(),
                saldoAnterior = BigDecimal.ZERO,
                saldo = BigDecimal("1000.00"),
                valor = BigDecimal("1000.00"))

        val autorizacao = Autorizacao(
                idAutorizacao = 13
        )

        val listOfEffectiveCreditOrderStatement = listOf(TransacaoDesfeita(
                transacaoContabil = transacaoContabil, autorizacao = autorizacao))

        every { service.getTransacoes(any(), any(), any(), any(), any()) } returns listOfEffectiveCreditOrderStatement

        val pageDto = mockTest
                .convertlistOfTransacaoContabilToResponsePageDto(listOfEffectiveCreditOrderStatement, PageRequest.of(page, size))

        val extratoJSON = mapper.writeValueAsString(pageDto) as String

        mockMvc.get("/ledgers/${TipoLedger.TRANSACAO_DESFEITA}/extrato?dataInicial=$startDate" +
                "&dataFinal=$endDate&page=$page&size=$size") {
            contentType = MediaType.APPLICATION_JSON
            accept = MediaType.APPLICATION_JSON
        }.andExpect {
            status { isOk }
            content { contentType(MediaType.APPLICATION_JSON) }
            content { json(extratoJSON) }
        }
    }

    @Test
    fun `When all parameters right to Transacao Desfeita then return 200`() {

        val startDate = mockTest.getISOYesterdayDateAndTime()
        val endDate = mockTest.getISOCurrentDateAndTime()
        val page = 0
        val size = 1
        val transacaoContabil = TransacaoContabil(
                codigoTransacao = UUIDs.random(),
                ledger = TipoLedger.PEDIDO_RECEBIMENTO_PENDENTE.name,
                dataInclusao = Instant.now().atZone(ZoneId.of(timezone)).toLocalDateTime(),
                codigoTransacaoAnterior = null,
                codigoEvento = 1,
                tipoEvento = "AGENDAMENTO_PEDIDO",
                tipoOperacao = TipoOperacao.CREDITO.name,
                dataEvento = Instant.now().atZone(ZoneId.of(timezone)).toLocalDateTime(),
                saldoAnterior = BigDecimal.ZERO,
                saldo = BigDecimal("1000.00"),
                valor = BigDecimal("1000.00"))

        val autorizacaoEntity = AutorizacaoEntity(
                autorizacaoKey = AutorizacaoKey(14),
                cartao = "12345678910",
                cdAutorizacao = "1234567",
                cdBanco = 10.toShort(),
                cdBin = 42,
                cdBinAdquirente = "30042",
                cdProduto = 10,
                cdRetorno = "30043",
                cnpjEstabelecimento = "032",
                cpfPortador = "111.111.111-32",
                dataHora = Date(),
                dcBinAdquirente = "Descrição do Bin do Adquirente",
                dcModoEntrada = "Modo de entrda",
                dcProduto = "Novo Produto",
                dcRetorno = "Sucesso",
                dcTecnologia = "3G",
                dcTerminal = "Maquina Cielo",
                dcTipoTransacao = "Cartão",
                dcTransNeg = "credito",
                dcStatus = "Encerrado",
                dtAutorizacao = Date(),
                dtTransacao = Date(),
                idCartao = 101,
                idCompra = 1001,
                idEstabelecimento = "3786",
                nmEstabelecimentoAutorizacao = "Restaurante do Joao",
                nomePortador = "José Polvilho",
                nuNsu = 101,
                tpModoEntrada = "maceficio",
                tpTransacao = "Compra",
                vlAutorizacao = BigDecimal(1000.0),
                vlBruto = BigDecimal(1000.0)

        )

        val transacaoDesfeita =
                arrayListOf(TransacaoDesfeita(transacaoContabil, Autorizacao(autorizacaoEntity)))

        every { service.getTransacoes(any(), any(), any(), any(), any()) } returns transacaoDesfeita

        val pageDto = mockTest
                .convertlistOfTransacaoContabilToResponsePageDto(transacaoDesfeita, PageRequest.of(page, size))

        val extratoJSON = mapper.writeValueAsString(pageDto) as String

        mockMvc.get("/ledgers/${TipoLedger.TRANSACAO_DESFEITA.name}/extrato?dataInicial=$startDate" +
                "&dataFinal=$endDate&page=$page&size=$size") {
            contentType = MediaType.APPLICATION_JSON
            accept = MediaType.APPLICATION_JSON
        }.andExpect {
            status { isOk }
            content { contentType(MediaType.APPLICATION_JSON) }
            content { json(extratoJSON) }
        }
    }

    @Test
    fun `When all parameters is null to Ajuste then return 200`() {

        val startDate = mockTest.getISOYesterdayDateAndTime()
        val endDate = mockTest.getISOCurrentDateAndTime()
        val page = 0
        val size = 1
        val transacaoContabil = TransacaoContabil(
                codigoTransacao = UUID.fromString("af3a52c0-69df-11ea-81ed-bb84fe44d674"),
                ledger = ledger.toUpperCase(),
                dataInclusao = LocalDateTime.now().atZone(ZoneId.of(timezone)).toLocalDateTime(),
                codigoTransacaoAnterior = null,
                codigoEvento = 1,
                tipoEvento = "REPASSE_CONFIRMADO",
                tipoOperacao = TipoOperacao.CREDITO.name,
                dataEvento = LocalDateTime.now().atZone(ZoneId.of(timezone)).toLocalDateTime(),
                saldoAnterior = BigDecimal.ZERO,
                saldo = BigDecimal("1000.00"),
                valor = BigDecimal("1000.00"))

        val ajuste = Ajuste(
                idAjuste = 15
        )

        val listOfEffectiveCreditOrderStatement = listOf(AjusteDebito(
                transacaoContabil = transacaoContabil, autorizacao = ajuste))

        every { service.getTransacoes(any(), any(), any(), any(), any()) } returns listOfEffectiveCreditOrderStatement

        val pageDto = mockTest
                .convertlistOfTransacaoContabilToResponsePageDto(listOfEffectiveCreditOrderStatement, PageRequest.of(page, size))

        val extratoJSON = mapper.writeValueAsString(pageDto) as String

        mockMvc.get("/ledgers/${TipoLedger.AJUSTE_CREDITO.name}/extrato?dataInicial=$startDate" +
                "&dataFinal=$endDate&page=$page&size=$size") {
            contentType = MediaType.APPLICATION_JSON
            accept = MediaType.APPLICATION_JSON
        }.andExpect {
            status { isOk }
            content { contentType(MediaType.APPLICATION_JSON) }
            content { json(extratoJSON) }
        }
    }

    @Test
    fun `When all parameters right to Ajuste then return 200`() {

        val startDate = mockTest.getISOYesterdayDateAndTime()
        val endDate = mockTest.getISOCurrentDateAndTime()
        val page = 0
        val size = 1
        val transacaoContabil = TransacaoContabil(
                codigoTransacao = UUIDs.random(),
                ledger = TipoLedger.PEDIDO_RECEBIMENTO_PENDENTE.name,
                dataInclusao = Instant.now().atZone(ZoneId.of(timezone)).toLocalDateTime(),
                codigoTransacaoAnterior = null,
                codigoEvento = 1,
                tipoEvento = "AGENDAMENTO_PEDIDO",
                tipoOperacao = TipoOperacao.CREDITO.name,
                dataEvento = Instant.now().atZone(ZoneId.of(timezone)).toLocalDateTime(),
                saldoAnterior = BigDecimal.ZERO,
                saldo = BigDecimal("1000.00"),
                valor = BigDecimal("1000.00"))

        val ajusteEntity = AjusteEntity(
                ajusteKey = AjusteKey(16),
                cdAjuste = 15,
                cdEstabelecimentoComercial = 102,
                cdPortador = 2042,
                cdProduto = 50.toShort(),
                cdTransacao = 10035,
                cpf = "111.111.111.-11",
                dataHora = Date(),
                dcAdquirente = "Novo Adquirente",
                dcEstabelecimentoComercial = "Novo Estabelecimento",
                dcMotivoAjuste = "Cancelamento",
                dcPortador = "Novo Portador",
                dtGeracaoAjuste = Date(),
                dtTransacao = Date(),
                nmSetupContabil = 10021,
                vlCreditoAjuste = BigDecimal(1000.0),
                vlDebitoAjuste = BigDecimal(1000.0),
                vlTransacao = BigDecimal(1000.0)

        )

        val ajusteCredito =
                arrayListOf(AjusteCredito(transacaoContabil, Ajuste(ajusteEntity)))

        every { service.getTransacoes(any(), any(), any(), any(), any()) } returns ajusteCredito

        val pageDto = mockTest
                .convertlistOfTransacaoContabilToResponsePageDto(ajusteCredito, PageRequest.of(page, size))

        val extratoJSON = mapper.writeValueAsString(pageDto) as String

        mockMvc.get("/ledgers/${TipoLedger.AJUSTE_CREDITO.name}/extrato?dataInicial=$startDate" +
                "&dataFinal=$endDate&page=$page&size=$size") {
            contentType = MediaType.APPLICATION_JSON
            accept = MediaType.APPLICATION_JSON
        }.andExpect {
            status { isOk }
            content { contentType(MediaType.APPLICATION_JSON) }
            content { json(extratoJSON) }
        }
    }

    @Test
    fun `When all parameters is null to Conta Virtual Credito Pendente then return 200`() {

        val startDate = mockTest.getISOYesterdayDateAndTime()
        val endDate = mockTest.getISOCurrentDateAndTime()
        val page = 0
        val size = 1
        val transacaoContabil = TransacaoContabil(
                codigoTransacao = UUIDs.random(),
                ledger = TipoLedger.CONTAVIRTUAL_CREDITO_PENDENTE.name,
                dataInclusao = Instant.now().atZone(ZoneId.of(timezone)).toLocalDateTime(),
                codigoTransacaoAnterior = null,
                codigoEvento = 1,
                tipoEvento = "CREDITO_PENDENTE",
                tipoOperacao = TipoOperacao.CREDITO.name,
                dataEvento = Instant.now().atZone(ZoneId.of(timezone)).toLocalDateTime(),
                saldoAnterior = BigDecimal.ZERO,
                saldo = BigDecimal("1000.00"),
                valor = BigDecimal("1000.00"))

        val contaVirtualCreditoPendente = ContaVirtualEntity(
                contaVirtualKey = ContaVirtualKey(17)
        )

        val contaVirtuais =
                arrayListOf(ContaVirtualCreditoPendente(transacaoContabil, ContaVirtual(contaVirtualCreditoPendente)))

        every { service.getTransacoes(any(), any(), any(), any(), any()) } returns contaVirtuais

        val pageDto = mockTest
                .convertlistOfTransacaoContabilToResponsePageDto(contaVirtuais, PageRequest.of(page, size))

        val extratoJSON = mapper.writeValueAsString(pageDto) as String

        mockMvc.get("/ledgers/${TipoLedger.CONTAVIRTUAL_CREDITO_PENDENTE.name}/extrato?dataInicial=$startDate" +
                "&dataFinal=$endDate&page=$page&size=$size") {
            contentType = MediaType.APPLICATION_JSON
            accept = MediaType.APPLICATION_JSON
        }.andExpect {
            status { isOk }
            content { contentType(MediaType.APPLICATION_JSON) }
            content { json(extratoJSON) }
        }
    }

    @Test
    fun `When all parameters is null to Conta Virtual Credito Utilizado then return 200`() {

        val startDate = mockTest.getISOYesterdayDateAndTime()
        val endDate = mockTest.getISOCurrentDateAndTime()
        val page = 0
        val size = 1
        val transacaoContabil = TransacaoContabil(
                codigoTransacao = UUIDs.random(),
                ledger = TipoLedger.CONTAVIRTUAL_CREDITO_UTILIZADO.name,
                dataInclusao = Instant.now().atZone(ZoneId.of(timezone)).toLocalDateTime(),
                codigoTransacaoAnterior = null,
                codigoEvento = 1,
                tipoEvento = "CREDITO_UTILIZADO",
                tipoOperacao = TipoOperacao.CREDITO.name,
                dataEvento = Instant.now().atZone(ZoneId.of(timezone)).toLocalDateTime(),
                saldoAnterior = BigDecimal.ZERO,
                saldo = BigDecimal("1000.00"),
                valor = BigDecimal("1000.00"))

        val contaVirtualCreditoUtilizado = ContaVirtualEntity(
                contaVirtualKey = ContaVirtualKey(18)
        )

        val contaVirtuais =
                arrayListOf(ContaVirtualCreditoUtilizado(transacaoContabil, ContaVirtual(contaVirtualCreditoUtilizado)))

        every { service.getTransacoes(any(), any(), any(), any(), any()) } returns contaVirtuais

        val pageDto = mockTest
                .convertlistOfTransacaoContabilToResponsePageDto(contaVirtuais, PageRequest.of(page, size))

        val extratoJSON = mapper.writeValueAsString(pageDto) as String

        mockMvc.get("/ledgers/${TipoLedger.CONTAVIRTUAL_CREDITO_UTILIZADO.name}/extrato?dataInicial=$startDate" +
                "&dataFinal=$endDate&page=$page&size=$size") {
            contentType = MediaType.APPLICATION_JSON
            accept = MediaType.APPLICATION_JSON
        }.andExpect {
            status { isOk }
            content { contentType(MediaType.APPLICATION_JSON) }
            content { json(extratoJSON) }
        }
    }
}
