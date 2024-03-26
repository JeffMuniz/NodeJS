package br.com.mac.api.ctb.transacao.controller

import br.com.mac.api.ctb.transacao.constant.ONE
import br.com.mac.api.ctb.transacao.domain.dto.ConciliacaoDTO
import br.com.mac.api.ctb.transacao.domain.dto.ConciliacaoResponseDTO
import br.com.mac.api.ctb.transacao.domain.dto.PontoControleDTO
import br.com.mac.api.ctb.transacao.domain.dto.PontoControleResponseDTO
import br.com.mac.api.ctb.transacao.domain.service.ConciliacaoService
import br.com.mac.api.ctb.transacao.exception.ErrorResponse
import br.com.mac.api.ctb.transacao.extension.toDateAndFixedTime
import br.com.mac.api.ctb.transacao.validator.ValidPontoDeControle
import br.com.mac.ctb.enum.PontoDeControle
import io.swagger.annotations.Api
import io.swagger.annotations.ApiOperation
import io.swagger.annotations.ApiParam
import io.swagger.annotations.ApiResponse
import io.swagger.annotations.ApiResponses
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseEntity
import org.springframework.validation.annotation.Validated
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import javax.validation.constraints.Max

@RestController
@RequestMapping("/conciliacao")
@Api(value = "Conciliacao", description = "Conciliacao REST API")
@Validated
class ConciliacaoController {

    @Autowired
    private lateinit var conciliacaoService: ConciliacaoService

    @ApiOperation(httpMethod = "GET", value = "Método para recuperar a conciliacao de um ponto de controle")
    @ApiResponses(value = [
        ApiResponse(code = 200, message = "Retorna os valores do ponto de controle",
                response = ConciliacaoResponseDTO::class),
        ApiResponse(code = 400, message = "Informa que o Ponto de Controle é obrigatório ou o formato da data " +
                "está incorreto",
                response = ErrorResponse::class)
    ])
    @GetMapping("/{controle}")
    fun getConciliation(@ApiParam(value = "Nome do Ponto de Controle", required = true)
                        @PathVariable("controle")
                        @ValidPontoDeControle(enumClass = PontoDeControle::class) controle: String,
                        @ApiParam(value = "Período para o cálculo retroativo em dias, máximo 5 dias",
                                required = false, example = "1")
                        @RequestParam(required = false)
                        @Max(value = 5, message = "Período máximo é de 5 dias") periodo: Int?,
                        @ApiParam(value = "Data de inclusão do evento, formato(yyyy-MM-dd)",
                                required = true, example = "2020-01-01")
                        @RequestParam(required = true) dataInclusao: String): ResponseEntity<ConciliacaoResponseDTO> {


        val pontoControleDTO = ConciliacaoDTO().apply {
            this.controle = controle
            this.periodo = periodo ?: ONE
            this.dataInclusao = dataInclusao
        }

        val conciliacao = conciliacaoService.getConciliation(
                controlPoint = PontoDeControle.valueOf(pontoControleDTO.controle!!),
                period = pontoControleDTO.periodo ?: 1,
                inclusionDate = pontoControleDTO.dataInclusao!!.toDateAndFixedTime())

        return ResponseEntity.ok(ConciliacaoResponseDTO(conciliacao))
    }


    @ApiOperation(httpMethod = "GET", value = "Método para recuperar a conciliacao de um ponto de controle")
    @ApiResponses(value = [
        ApiResponse(code = 200, message = "Retorna os valores do ponto de controle",
                response = ConciliacaoResponseDTO::class),
        ApiResponse(code = 400, message = "Informa que o Ponto de Controle é obrigatório ou o formato da data " +
                "está incorreto",
                response = ErrorResponse::class)
    ])
    @GetMapping("/controles")
    fun getControlPoints(@ApiParam(value = "Data de inclusão do evento, formato(yyyy-MM-dd)",
            required = true, example = "2020-01-01")
                         @RequestParam(required = true) dataInclusao: String):
            ResponseEntity<List<PontoControleResponseDTO>> {


        val pontoControleDTO = ConciliacaoDTO().apply {
            this.dataInclusao = dataInclusao
        }

        val controlPoints = conciliacaoService.getControlPoints(
                inclusionDate = pontoControleDTO.dataInclusao!!.toDateAndFixedTime())

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

       return ResponseEntity.ok(listOfDTO)
    }
}
