
package br.com.machina.estautoecapi.bean.credenciamento;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Tarifa {

    @Schema(example = "TAX")
    private String tipo;

    @Schema(example = "0.06", minimum = "0")
    private Double valor;

    public static void validar(Tarifa tarifa){

    }

}
