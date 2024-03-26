package br.com.mac.api.ctb.transacao.controller

import br.com.mac.api.ctb.transacao.domain.dto.PontoControleDTO
import br.com.mac.api.ctb.transacao.domain.dto.PontoControleResponseDTO
import br.com.mac.api.ctb.transacao.domain.dto.TransacaoContabilDTO
import br.com.mac.api.ctb.transacao.domain.model.toDto
import br.com.mac.api.ctb.transacao.domain.service.PontoControleService
import br.com.mac.api.ctb.transacao.exception.ErrorResponse
import br.com.mac.api.ctb.transacao.extension.toDatePattern
import br.com.mac.ctb.enum.TipoPeriodo
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

@RestController
@RequestMapping("/controles")
@Api(value = "Controles", description = "Pontos de Controle REST API")
@Validated
class PontoControleController {

    @Autowired
    private lateinit var pontoControleService: PontoControleService

    @ApiOperation(httpMethod = "GET", value = "Método para recuperar os saldos de um ponto de controle")
    @ApiResponses(value = [
        ApiResponse(code = 200, message = "Retorna os saldos do ponto de controle",
                response = TransacaoContabilDTO::class),
        ApiResponse(code = 400, message = "Informa que o Ponto de Controle é obrigatório ou o formato da data " +
                "está incorreto",
                response = ErrorResponse::class)
    ])
    @GetMapping("/{controle}")
    fun getPontoControle(@ApiParam(value = "Nome do controle", required = true)
                         @PathVariable("controle") controle: String,
                         @ApiParam(value = "Tipo de periodo para o calculo",
                                 required = true, example = "DIA,MES,ANO")
                         @RequestParam(required = true) tipoPeriodo: TipoPeriodo,
                         @ApiParam(value = "Data de inclusão do evento, formato(yyyy-MM-dd HH:mm:ss)",
                                 required = false, example = "2020-01-01 23:59:59")
                         @RequestParam(required = false) dataInclusao: String):
            ResponseEntity<PontoControleResponseDTO> {

        val pontoControle = pontoControleService.getPontoControleSaldo(controle, tipoPeriodo, dataInclusao
                ?.let { it.toDatePattern() })

        return ResponseEntity.ok(PontoControleResponseDTO(
                PontoControleDTO(
                        nome = pontoControle.controle,
                        tipoPeriodo = pontoControle.tipoPeriodo,
                        ledgers = pontoControle.ledgers?.map { it.toDto() },
                        suporte = pontoControle.suporte?.toDto(),
                        periodoAnterior = pontoControle.periodoAnterior?.toDto(),
                        resultadoPeriodo = pontoControle.resultadoPeriodo?.toDto(),
                        diferenca = pontoControle.diferenca?.toDto()
                )
        ))
    }
}
