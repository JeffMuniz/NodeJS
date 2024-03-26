
package br.com.machina.estautoecapi.bean.credenciamento;

import br.com.machina.estautoecapi.bean.credenciamento.questionario.AreaAtendimento;
import br.com.machina.estautoecapi.bean.credenciamento.questionario.LugaresEstabelecimento;
import br.com.machina.estautoecapi.bean.credenciamento.questionario.NumeroCaixasRegistradoras;
import br.com.machina.estautoecapi.bean.credenciamento.questionario.NumeroRefeicoesDiarias;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class QuestionarioPAT {

    @NotNull
    private LugaresEstabelecimento lugaresEstabelecimento;

    private NumeroRefeicoesDiarias numeroRefeicoesDiarias;

    @NotNull
    private AreaAtendimento areaAtendimento;

    @NotNull
    private Boolean possuiFrutaCardapio;

    @NotNull
    private NumeroCaixasRegistradoras numeroCaixasRegistradoras;
}
