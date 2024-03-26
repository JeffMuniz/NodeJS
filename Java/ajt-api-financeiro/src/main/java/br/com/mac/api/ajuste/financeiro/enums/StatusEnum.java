package br.com.mac.api.ajuste.financeiro.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
public enum StatusEnum {

    PENDENTE(1),
    EM_PROCESSAMENTO(2),
    APROVADO(3),
    RECUSADO(4),
    EM_EXECUCAO(5),
    ERRO(9);

    @Getter
    private Integer value;
}
