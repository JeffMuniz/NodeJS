package br.com.mac.api.ctb.transacao.controller

import br.com.mac.api.ctb.transacao.constant.DATE_TIME_PATTERN
import br.com.mac.api.ctb.transacao.helper.CSVHelper
import br.com.mac.api.ctb.transacao.constant.SUBSTRING_DATE_ONLY
import br.com.mac.api.ctb.transacao.constant.SUBSTRING_START_INDEX
import br.com.mac.api.ctb.transacao.domain.dto.SaldoDTO
import br.com.mac.api.ctb.transacao.domain.dto.SaldoResponseDTO
import br.com.mac.api.ctb.transacao.domain.dto.TransacaoContabilDTO
import br.com.mac.api.ctb.transacao.domain.model.Extrato
import br.com.mac.api.ctb.transacao.domain.model.toDto
import br.com.mac.api.ctb.transacao.domain.service.TransacaoContabilService
import br.com.mac.api.ctb.transacao.exception.ErrorResponse
import br.com.mac.api.ctb.transacao.extension.toDateAndFixedTime
import br.com.mac.api.ctb.transacao.extension.toDatePattern
import br.com.mac.api.ctb.transacao.validator.ValidTipoLedger
import br.com.mac.ctb.enum.TipoLedger
import br.com.mac.ctb.enum.TipoOperacao
import com.fasterxml.jackson.databind.ObjectMapper
import io.swagger.annotations.Api
import io.swagger.annotations.ApiOperation
import io.swagger.annotations.ApiParam
import io.swagger.annotations.ApiResponse
import io.swagger.annotations.ApiResponses
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.core.io.InputStreamResource
import org.springframework.core.io.Resource
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageImpl
import org.springframework.data.domain.PageRequest
import org.springframework.http.HttpHeaders
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.validation.annotation.Validated
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.bind.annotation.ResponseBody
import java.time.format.DateTimeFormatter
import javax.validation.Valid
import kotlin.streams.toList


@RestController
@RequestMapping("/ledgers")
@Api(value = "Transacao", description = "Contabil Transacao REST API")
@Validated
class TransacaoContabilController {
    companion object{
        val OBJECT_MAPPER = ObjectMapper()
    }

    @Autowired
    private lateinit var transacaoContabilService: TransacaoContabilService

    @ApiOperation(httpMethod = "GET", value = "Método get para pesquisar o saldo do Ledger por data")
    @ApiResponses(value = [
        ApiResponse(code = 200, message = "Retorna o saldo atual do Ledger", response = TransacaoContabilDTO::class),
        ApiResponse(code = 400, message = "Informa que o ledger é obrigatório ou o formato da data está incorreto",
                response = ErrorResponse::class)
    ])
    @GetMapping("/{ledger}/saldo")
    fun getBalance(@ApiParam(value = "Nome do ledger", required = true)
                   @PathVariable("ledger") ledger: String,
                   @ApiParam(value = "Data de inclusão do evento, formato(yyyy-MM-dd HH:mm:ss)",
                           required = false, example = "2020-01-01 23:59:59")
                   @RequestParam(required = false) dataInclusao: String?): ResponseEntity<SaldoResponseDTO> {

        val transacaoContabilDTO = TransacaoContabilDTO().apply {
            this.ledger = ledger
            this.dataInclusao = dataInclusao?.let { it }
        }

        val transacaoContabil = transacaoContabilService.getCurrentBalance(ledger = transacaoContabilDTO.ledger!!,
                inclusionDate = dataInclusao?.let { it.toDatePattern() })

        val saldoDTO = transacaoContabil.run {
            SaldoDTO(ledger = this.ledger,
                    valor = this.saldo,
                    data = this.dataInclusao?.let { it.format(DateTimeFormatter.ofPattern(DATE_TIME_PATTERN)) }
            )
        }
        return ResponseEntity.ok(SaldoResponseDTO(saldo = saldoDTO))
    }

    @ApiOperation(httpMethod = "GET", value = "Método get para pesquisar o montante do Ledger por data e tipo de " +
            "operação")
    @ApiResponses(value = [
        ApiResponse(code = 200, message = "Retorna o Ledger pesquisado", response = TransacaoContabilDTO::class),
        ApiResponse(code = 400, message = "Informa que o ledger é obrigatório ou o formato da data está incorreto ou " +
                "que o tipo de operação é inválido", response = ErrorResponse::class)
    ])
    @GetMapping("/{ledger}/montante-por-tipo-operacao")
    fun getAmountPerType(
            @ApiParam(value = "Nome do ledger", required = true)
            @PathVariable("ledger") ledger: String,
            @ApiParam(value = "Tipo de operação, valores(credito ou debito)", required = true)
            @RequestParam tipoOperacao: String,
            @ApiParam(value = "Data de inclusão do evento, utilizar o formato(yyyy-MM-dd HH:mm:ss)",
                    required = true, example = "2020-01-01 23:59:59")
            @RequestParam dataInclusao: String,
            @Valid transacaoContabilDTO: TransacaoContabilDTO): ResponseEntity<TransacaoContabilDTO> {

        val transacaoContabil = transacaoContabilService.getAmountPerType(ledger = ledger,
                startDate = transacaoContabilDTO.dataInclusao!!
                        .substring(SUBSTRING_START_INDEX, SUBSTRING_DATE_ONLY).toDateAndFixedTime(),
                endDate = transacaoContabilDTO.dataInclusao!!.toDatePattern(),
                operationType = transacaoContabilDTO.tipoOperacao!!)

        return ResponseEntity.ok(transacaoContabil.toDto())
    }

    @ApiOperation(httpMethod = "GET", value = "Método get para pesquisar o extrato do Ledger por data inicial e final")
    @ApiResponses(value = [
        ApiResponse(code = 200, message = "Retorna o Ledger pesquisado", response = TransacaoContabilDTO::class),
        ApiResponse(code = 400, message = "Informa que o ledger é obrigatório ou o formato das datas estão incorretos",
                response = ErrorResponse::class)
    ])
    @GetMapping("/{ledger}/extrato")
    fun getLedgerStatement(
            @ApiParam(value = "Nome do ledger", required = true)
            @Valid @PathVariable("ledger") @ValidTipoLedger(enumClass = TipoLedger::class) ledger: String,
            @ApiParam(value = "Data inicial de inclusão do evento, utilizar o formato(yyyy-MM-dd HH:mm:ss)",
                    required = true, example = "2020-01-01 00:00:00")
            @RequestParam dataInicial: String,
            @ApiParam(value = "Data final de inclusão do evento, utilizar o formato(yyyy-MM-dd HH:mm:ss)",
                    required = true, example = "2020-01-01 23:59:59")
            @RequestParam dataFinal: String,
            @RequestParam(defaultValue = "0") page: Int,
            @RequestParam(defaultValue = "10") size: Int,
            @RequestParam tipoOperacao: TipoOperacao?): ResponseEntity<Page<Any>> {

        val transacaoContabilDTO = TransacaoContabilDTO().apply {
            this.ledger = ledger
            this.dataInicial = dataInicial
            this.dataFinal = dataFinal
        }

        val page = PageRequest.of(page, size)

        val listOfExtrato = transacaoContabilService.getTransacoes(ledger = ledger,
                startDate = transacaoContabilDTO.dataInicial!!.toDatePattern(),
                endDate = transacaoContabilDTO.dataFinal!!.toDatePattern(),
                tipoOperacao = tipoOperacao,
                page = page)

        val listDto = listOfExtrato.parallelStream().map(Extrato::toResponseDTO)
                .toList()

        val pageDTO = PageImpl(listDto, page, listDto.count().toLong())

        return ResponseEntity.ok(pageDTO)
    }

    //TODO remover a paginação do endpoint
    @ApiOperation(httpMethod = "GET",
            value = "Método get para fazer o download do extrato do Ledger por data inicial e final")
    @ApiResponses(value = [
        ApiResponse(code = 200, message = "Retorna o Resource Ledger pesquisado", response = Resource::class),
        ApiResponse(code = 204, message = "Retorna o Resource Ledger pesquisado não tem conteúdo"),
        ApiResponse(code = 400, message = "Informa que o ledger é obrigatório ou o formato das datas estão incorretos",
                response = ErrorResponse::class)
    ])
    @ResponseBody
    @GetMapping(value = ["/{ledger}/extrato/download"]
            , produces = ["text/csv"]
             )
    fun getLedgerDownload(
            @ApiParam(value = "Nome do ledger", required = true)
            @Valid @PathVariable("ledger") @ValidTipoLedger(enumClass = TipoLedger::class) ledger: String,
            @ApiParam(value = "Data inicial de inclusão do evento, utilizar o formato(yyyy-MM-dd HH:mm:ss)",
                    required = true, example = "2020-01-01 00:00:00")
            @RequestParam dataInicial: String,
            @ApiParam(value = "Data final de inclusão do evento, utilizar o formato(yyyy-MM-dd HH:mm:ss)",
                    required = true, example = "2020-01-01 23:59:59")
            @RequestParam dataFinal: String,
            @RequestParam(defaultValue = "0") page: Int,
            @RequestParam(defaultValue = "10") size: Int,
            @RequestParam tipoOperacao: TipoOperacao?): ResponseEntity<Resource> {

        val transacaoContabilDTO = TransacaoContabilDTO().apply {
            this.ledger = ledger
            this.dataInicial = dataInicial
            this.dataFinal = dataFinal
        }

        val listOfExtrato = transacaoContabilService.getTransacoes(ledger = ledger,
                startDate = transacaoContabilDTO.dataInicial!!.toDatePattern(),
                endDate = transacaoContabilDTO.dataFinal!!.toDatePattern(),
                tipoOperacao = tipoOperacao,
                page = null)

        val listDto = listOfExtrato.parallelStream().map(Extrato::toResponseDTO)
                .toList()

        val csvOutputFile = CSVHelper.convertToCSV(listDto);
        val resource = InputStreamResource(csvOutputFile)

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=extrato.csv"  )
                .contentType(MediaType.parseMediaType("text/csv"))
                .body(resource)
    }
}
