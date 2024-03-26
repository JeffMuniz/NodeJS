
package br.com.machina.estautoecapi.bean.credenciamento.questionario;

import lombok.Builder;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
public class LugaresEstabelecimento extends Questionario{

    @Builder
    public LugaresEstabelecimento(Integer min, Integer max){
        super(min, max);
    }

}
