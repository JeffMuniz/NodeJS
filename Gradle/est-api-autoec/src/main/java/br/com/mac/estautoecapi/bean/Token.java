package br.com.machina.estautoecapi.bean;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Token {

    @Schema(example = "11")
    private String ddd;

    @Schema(example = "988887777")
    private String telefone;
}
