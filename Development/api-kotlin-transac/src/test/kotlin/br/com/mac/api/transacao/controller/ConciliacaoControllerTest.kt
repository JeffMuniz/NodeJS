package br.com.mac.api.ctb.transacao.controller

import br.com.mac.api.ctb.transacao.ApplicationTest
import br.com.mac.api.ctb.transacao.config.CassandraContainerSetup
import br.com.mac.api.ctb.transacao.constant.CONTROL_POINT_VALIDATOR_MESSAGE
import br.com.mac.api.ctb.transacao.constant.DATE_FORMAT_VALIDATOR_MESSAGE
import br.com.mac.api.ctb.transacao.constant.VALIDATION_FAIL_MESSAGE
import br.com.mac.api.ctb.transacao.domain.dto.ConciliacaoDTO
import br.com.mac.api.ctb.transacao.domain.dto.ConciliacaoResponseDTO
import br.com.mac.api.ctb.transacao.domain.dto.PontoControleDTO
import br.com.mac.api.ctb.transacao.domain.dto.PontoControleResponseDTO
import br.com.mac.api.ctb.transacao.domain.service.ConciliacaoService
import br.com.mac.api.ctb.transacao.exception.Error
import br.com.mac.api.ctb.transacao.exception.ErrorResponse
import br.com.mac.api.ctb.transacao.mock.MockTest
import br.com.mac.ctb.enum.PontoDeControle
import com.fasterxml.jackson.databind.ObjectMapper
import com.ninjasquad.springmockk.MockkBean
import io.mockk.every
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.TestInstance
import org.junit.jupiter.api.extension.ExtendWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.test.context.ContextConfiguration
import org.springframework.test.context.junit.jupiter.SpringExtension
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.get

@SpringBootTest(classes = [ApplicationTest::class])
@ContextConfiguration(initializers = [CassandraContainerSetup::class])
@ExtendWith(SpringExtension::class)
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@AutoConfigureMockMvc
class ConciliacaoControllerTest {

    @Autowired
    private lateinit var mapper: ObjectMapper

    @Autowired
    private lateinit var mockMvc: MockMvc

    @MockkBean
    private lateinit var service: ConciliacaoService

    @Autowired
    private lateinit var mockTest: MockTest

    @Test
    fun getConciliation() {

        val controlPoint = PontoDeControle.REPASSE_PEDIDO.name
        val inclusionDate = mockTest.getISOCurrentDate()

        val conciliacao = mockTest.getConciliation()

        every { service.getConciliation(any(), any(), any()) } returns conciliacao

        val conciliacaoDTOJSON = mapper.writeValueAsString(ConciliacaoResponseDTO(conciliacao)) as String

        mockMvc.get("/conciliacao/$controlPoint?periodo=1&dataInclusao=$inclusionDate") {
            contentType = MediaType.APPLICATION_JSON
            accept = MediaType.APPLICATION_JSON
        }.andExpect {
            status { isOk }
            content { contentType(MediaType.APPLICATION_JSON) }
            content { json(conciliacaoDTOJSON) }
        }

    }

    @Test
    fun shouldFailIfControlPointIsMissingOnGetConciliation() {

        mockMvc.get("/conciliacao") {
            contentType = MediaType.APPLICATION_JSON
            accept = MediaType.APPLICATION_JSON
        }.andExpect {
            status { isNotFound }
        }

    }

    @Test
    fun shouldFailIfInclusionDateIsMissingOnGetConciliation() {

        val controlPoint = PontoDeControle.REPASSE_PEDIDO.name

        val errorResponse = ErrorResponse(mensagem = VALIDATION_FAIL_MESSAGE,
                erros = arrayListOf(Error(codigo = HttpStatus.BAD_REQUEST.value(),
                        mensagem = "Parâmetro ${ConciliacaoDTO::dataInclusao.name} é obrigatório")))

        val errorResponseJSON = mapper.writeValueAsString(errorResponse) as String

        mockMvc.get("/conciliacao/$controlPoint?periodo=1&dataInclusao=") {
            contentType = MediaType.APPLICATION_JSON
            accept = MediaType.APPLICATION_JSON
        }.andExpect {
            status { isBadRequest }
            content { contentType(MediaType.APPLICATION_JSON) }
            content { json(errorResponseJSON) }
        }

    }

    @Test
    fun shouldFailIfControlPointIsInvalidOnGetConciliation() {

        val invalidControlPoint = "teste"
        val inclusionDate = mockTest.getISOCurrentDate()

        val errorResponse = ErrorResponse(mensagem = VALIDATION_FAIL_MESSAGE,
                erros = arrayListOf(Error(codigo = HttpStatus.BAD_REQUEST.value(),
                        mensagem = CONTROL_POINT_VALIDATOR_MESSAGE)))

        val errorResponseJSON = mapper.writeValueAsString(errorResponse) as String

        mockMvc.get("/conciliacao/$invalidControlPoint?periodo=1&dataInclusao=$inclusionDate") {
            contentType = MediaType.APPLICATION_JSON
            accept = MediaType.APPLICATION_JSON
        }.andExpect {
            status { isBadRequest }
            content { contentType(MediaType.APPLICATION_JSON) }
            content { json(errorResponseJSON) }
        }

    }

    @Test
    fun shouldFailIfInclusionDateHasInvalidDateFormatOnGetConciliation() {

        val invalidControlPoint = PontoDeControle.REPASSE_PEDIDO.name
        val inclusionDate = "01-01-2020"

        val errorResponse = ErrorResponse(mensagem = VALIDATION_FAIL_MESSAGE,
                erros = arrayListOf(Error(codigo = HttpStatus.BAD_REQUEST.value(),
                        mensagem = DATE_FORMAT_VALIDATOR_MESSAGE)))

        val errorResponseJSON = mapper.writeValueAsString(errorResponse) as String

        mockMvc.get("/conciliacao/$invalidControlPoint?periodo=1&dataInclusao=$inclusionDate") {
            contentType = MediaType.APPLICATION_JSON
            accept = MediaType.APPLICATION_JSON
        }.andExpect {
            status { isBadRequest }
            content { contentType(MediaType.APPLICATION_JSON) }
            content { json(errorResponseJSON) }
        }

    }

    @Test
    fun getControlPoints() {

        val inclusionDate = mockTest.getISOCurrentDate()

        val controlPoints = mockTest.getControlPoints()

        every { service.getControlPoints(any()) } returns controlPoints

        val listOfDTO = controlPoints.map { controlPoint ->
            PontoControleResponseDTO(
                    PontoControleDTO(
                            nome = controlPoint.controle,
                            campoAtuacao = controlPoint.campoAtuacao,
                            saldoOperacional = controlPoint.saldoOperacional,
                            saldoSuporte = controlPoint.saldoSuporte,
                            diferencaOperacional = controlPoint.diferencaOperacional
                    ))
        }

        val controlPointDTOJSON = mapper.writeValueAsString(listOfDTO) as String

        mockMvc.get("/conciliacao/controles?dataInclusao=$inclusionDate") {
            contentType = MediaType.APPLICATION_JSON
            accept = MediaType.APPLICATION_JSON
        }.andExpect {
            status { isOk }
            content { contentType(MediaType.APPLICATION_JSON) }
            content { json(controlPointDTOJSON) }
        }

    }

    @Test
    fun shouldFailIfInclusionDateIsMissingOnGetControlPoints() {

       val errorResponse = ErrorResponse(mensagem = VALIDATION_FAIL_MESSAGE,
                erros = arrayListOf(Error(codigo = HttpStatus.BAD_REQUEST.value(),
                        mensagem = "Parâmetro ${ConciliacaoDTO::dataInclusao.name} é obrigatório")))

        val errorResponseJSON = mapper.writeValueAsString(errorResponse) as String

        mockMvc.get("/conciliacao/controles?dataInclusao=") {
            contentType = MediaType.APPLICATION_JSON
            accept = MediaType.APPLICATION_JSON
        }.andExpect {
            status { isBadRequest }
            content { contentType(MediaType.APPLICATION_JSON) }
            content { json(errorResponseJSON) }
        }

    }

    @Test
    fun shouldFailIfInclusionDateHasInvalidDateFormatOnGetControlPoints() {

        val inclusionDate = "01-01-2020"

        val errorResponse = ErrorResponse(mensagem = VALIDATION_FAIL_MESSAGE,
                erros = arrayListOf(Error(codigo = HttpStatus.BAD_REQUEST.value(),
                        mensagem = DATE_FORMAT_VALIDATOR_MESSAGE)))

        val errorResponseJSON = mapper.writeValueAsString(errorResponse) as String

        mockMvc.get("/conciliacao/controles?dataInclusao=$inclusionDate") {
            contentType = MediaType.APPLICATION_JSON
            accept = MediaType.APPLICATION_JSON
        }.andExpect {
            status { isBadRequest }
            content { contentType(MediaType.APPLICATION_JSON) }
            content { json(errorResponseJSON) }
        }

    }
}