
package br.com.machina.estautoecapi.bean.credenciamento;

import br.com.machina.estautoecapi.bean.credenciamento.enums.NomeAdquirente;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Builder.Default;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Objects;

import static br.com.machina.customexception.dto.ExceptionsMessagesEnum.GLOBAL_PRECONDITION_FAILED;
import static br.com.machina.customexception.exception.ExceptionCustom.checkThrow;

@Data
@Builder
@NoArgsConstructor
public class Adquirente {

    @Schema(name = "nome", example = "VISA")
    private NomeAdquirente nome;

    @Default
    @Schema(example = "[\"123782718\", \"983718721\", \"873981867\"]")
    private List<String> numerosEstabelecimento = null;

    public Adquirente(NomeAdquirente nome, List<String> numerosEstabelecimento) {
        checkThrow(Objects.isNull(nome), GLOBAL_PRECONDITION_FAILED);
    }
}
