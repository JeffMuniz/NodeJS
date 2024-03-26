package br.com.machina.estautoecapi.bean.credenciamento.questionario;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

@AllArgsConstructor
@Data
public class Questionario {

    @Schema(example = "1", minimum = "0", maximum = "9999")
    @Min(value = 0)
    @Max(value = 9999)
    @NotNull
    private Integer min;

    @Schema(example = "100", minimum = "0", maximum = "9999", nullable = true)
    @Min(value = 1)
    @Max(value = 9999)
    private Integer max;

}
