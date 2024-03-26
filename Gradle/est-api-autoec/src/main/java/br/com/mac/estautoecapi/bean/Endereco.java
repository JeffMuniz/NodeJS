package br.com.machina.estautoecapi.bean;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.io.Serializable;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class Endereco implements Serializable {

    private static final long serialVersionUID = 4421061332940919690L;

    @NotNull
    @Schema(example = "Praça da Sé")
    private String logradouro;

    @Schema(example = "lado ímpar")
    private String complemento;

    @NotNull
    @Schema(example = "01001000")
    private String cep;

    @NotNull
    @Schema(example = "Sé")
    private String bairro;

    @NotNull
    @Schema(example = "1")
    private Long numero;

    @NotNull
    @Schema(example = "SP")
    private String uf;

    @NotNull
    @Schema(example = "São Paulo")
    private String cidade;

}
