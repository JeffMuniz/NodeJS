
package br.com.machina.estautoecapi.bean.credenciamento.questionario;

import lombok.Builder;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
public class AreaAtendimento extends Questionario{

    @Builder
    public AreaAtendimento(Integer min, Integer max){
        super(min, max);
    }
}
