package br.com.machina.estautoecapi.bean.credenciamento.questionario;

import lombok.Builder;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
public class NumeroRefeicoesDiarias extends Questionario{

    @Builder
    public NumeroRefeicoesDiarias(Integer min, Integer max){
        super(min, max);
    }

}
