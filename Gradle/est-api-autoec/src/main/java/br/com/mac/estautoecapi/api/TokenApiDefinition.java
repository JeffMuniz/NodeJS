package br.com.machina.estautoecapi.api;

import br.com.machina.estautoecapi.bean.TokenRequest;
import br.com.machina.estautoecapi.bean.TokenUpdate;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

@Tag(name = "Token")
public interface TokenApiDefinition {

    @Operation(summary = "Envia Token SMS",
        responses = {
            @ApiResponse(responseCode = "200", description = "Token enviado com sucesso",
                    content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE)),
            @ApiResponse(responseCode = "404", description = "Dados não encontrados",
                    content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE)),
            @ApiResponse(responseCode = "500", description = "Erro interno do servidor."),
        })
    ResponseEntity<Object> enviaToken(TokenRequest token);

    @Operation(summary = "Valida Token SMS",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Token validado com sucesso",
                            content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE)),
                    @ApiResponse(responseCode = "400", description = "Token inválido",
                            content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE)),
                    @ApiResponse(responseCode = "500", description = "Erro interno do servidor."),
            })
    ResponseEntity<Object> validaToken(TokenUpdate token);

}
