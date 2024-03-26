package br.com.mac.reports.web.api.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import java.util.HashMap;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SolicitacaoRelatorioRequest {

    @NotNull
    private String usuario;
    @Email
    private String email;
    @NotNull
    private UUID idRelatorio;
    @NotNull
    private HashMap<String, String> dadosSolicitacao;
    @NotNull
    private boolean sincrono;
    private String chaveExterna;
}
