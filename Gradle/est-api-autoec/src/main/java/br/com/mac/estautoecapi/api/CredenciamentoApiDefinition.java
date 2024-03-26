package br.com.machina.estautoecapi.api;

import br.com.machina.estautoecapi.bean.PessoaFisicaResponse;
import br.com.machina.estautoecapi.bean.PoliticaResponse;
import br.com.machina.estautoecapi.bean.ValidaPessoaFisicaRequest;
import br.com.machina.estautoecapi.bean.credenciamento.DadosCredenciamento;
import br.com.machina.estautoecapi.bean.credenciamento.dto.DadosCredenciamentoDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

@Tag(name = "Credenciamento")
public interface CredenciamentoApiDefinition {

//    @Operation(summary = "Recupera rastreamentos por ID da conta",
//        responses = {
//            @ApiResponse(responseCode = "200",  description = "Rastreios encontrados com sucesso",
//                    content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE)),
//            @ApiResponse(responseCode = "404", description = "Dados não encontrados",
//                    content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE)),
//            @ApiResponse(responseCode = "500", description = "Erro interno do servidor."),
//        })
//    ResponseEntity<PoliticaResponse> getPessoaJuridica(@PathVariable String cnpj);
//
//    @Operation(summary = "Recupera Questionario de validação do PID do socio",
//            responses = {
//                    @ApiResponse(responseCode = "200", description = "Rastreios encontrados com sucesso",
//                            content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE)),
//                    @ApiResponse(responseCode = "404", description = "Dados não encontrados",
//                            content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE)),
//                    @ApiResponse(responseCode = "500", description = "Erro interno do servidor."),
//            })
//    ResponseEntity<PessoaFisicaResponse> getPessoaFisicaValidacao(@PathVariable String cnpj, @PathVariable String cpf);
//
//    @Operation(summary = "Valida dados da pessoa Fisica",
//            responses = {
//                    @ApiResponse(responseCode = "200", description = "Rastreios encontrados com sucesso",
//                            content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE)),
//                    @ApiResponse(responseCode = "404", description = "Dados não encontrados",
//                            content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE)),
//                    @ApiResponse(responseCode = "500", description = "Erro interno do servidor."),
//            })
//    ResponseEntity<Void> validarPessoa(@PathVariable String cnpj, @PathVariable String cpf, @RequestBody ValidaPessoaFisicaRequest pessoaRequest);
//
//    @Operation(summary = "Persiste credenciamento",
//            responses = {
//                    @ApiResponse(responseCode = "200", description = "Rastreios encontrados com sucesso",
//                            content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE)),
//                    @ApiResponse(responseCode = "404", description = "Dados não encontrados",
//                            content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE)),
//                    @ApiResponse(responseCode = "500", description = "Erro interno do servidor."),
//            })
//    ResponseEntity<String> salvarCredenciamento(@PathVariable String id, @RequestBody DadosCredenciamentoDTO credenciamentoRequest);
//
//    @Operation(summary = "Atualiza credenciamento",
//            responses = {
//                    @ApiResponse(responseCode = "200", description = "Rastreios encontrados com sucesso",
//                            content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE)),
//                    @ApiResponse(responseCode = "404", description = "Dados não encontrados",
//                            content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE)),
//                    @ApiResponse(responseCode = "500", description = "Erro interno do servidor."),
//            })
//    ResponseEntity<DadosCredenciamento> atualizarCredenciamento(@PathVariable String id, @RequestBody DadosCredenciamento credenciamentoRequest);

}
