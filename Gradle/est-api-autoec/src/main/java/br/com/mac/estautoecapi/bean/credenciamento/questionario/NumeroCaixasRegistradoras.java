
package br.com.machina.estautoecapi.bean.credenciamento.questionario;

import lombok.Builder;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
public class NumeroCaixasRegistradoras extends Questionario{

    @Builder
    public NumeroCaixasRegistradoras(Integer min, Integer max){
        super(min, max);
    }

}
