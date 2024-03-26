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
public class TokenUpdate extends Token{

    @Schema(example = "220009")
    private String codigoSeguranca;

    public TokenUpdate(String ddd, String telefone, String codigoSeguranca){
        super(ddd, telefone);
        this.codigoSeguranca = codigoSeguranca;
    }
}
