package br.com.machina.estautoecapi.bean.credenciamento;

import br.com.machina.estautoecapi.bean.credenciamento.enums.TipoProduto;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Produto {

    @Schema(example = "VALE_REFEICAO, VALE_ALIMENTACAO")
    private TipoProduto tipo;

    @Schema(example = "true")
    private Boolean aceiteTermos;

    public static void validar(Produto produto) {
    }
}
