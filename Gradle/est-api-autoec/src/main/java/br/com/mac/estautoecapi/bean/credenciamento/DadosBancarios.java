
package br.com.machina.estautoecapi.bean.credenciamento;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DadosBancarios {

    @NonNull
    @Schema(example = "001")
    private String banco;

    @NonNull
    @Schema(example = "0001")
    private String agencia;

    @NonNull
    @Schema(example = "01001")
    private String contaCorrente;

    @Schema(example = "1")
    private String digito;

    public static void validar(DadosBancarios dadosBancarios) {
    }

}
