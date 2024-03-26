package br.com.machina.estautoecapi.bean;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
public class TokenRequest extends Token{

    @Schema(example = "false")
    private Boolean reenvio;

    public TokenRequest(String ddd, String telefone, Boolean reenvio){
        super(ddd, telefone);
        this.reenvio = reenvio;
    }
}
