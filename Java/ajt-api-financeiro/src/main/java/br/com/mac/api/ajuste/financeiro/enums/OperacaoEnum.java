package br.com.mac.api.ajuste.financeiro.enums;

import java.util.stream.Stream;

import br.com.mac.api.ajuste.financeiro.exception.NotFoundException;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
public enum OperacaoEnum {

    DEBITO(1, "Débito"),
    CREDITO(2, "Crédito");

    @Getter
    private Integer value;

    @Getter
    private String descricao;
    
    /**
     * Busca enum por valor
     * @param value - valor
     * @return enum
     */
    public static OperacaoEnum getEnum(int value) {
    	return Stream.of(OperacaoEnum.values())
    	         .filter(item -> item.getValue() == value)
    	         .findFirst().orElse(null);
    }

    /**
     * Busca valor pelo enum
     * @param value - valor
     * @return enum
     */
    public static OperacaoEnum getEnum(String enumName) {
        return Stream.of(OperacaoEnum.values())
                .filter(item -> item.name().equals(enumName))
                .findFirst().orElseThrow(() ->
                        new NotFoundException(
                                ExceptionsMessagesEnum.OPERACAO_NAO_ENCONTRADO.getMessage()));
    }
    
}
