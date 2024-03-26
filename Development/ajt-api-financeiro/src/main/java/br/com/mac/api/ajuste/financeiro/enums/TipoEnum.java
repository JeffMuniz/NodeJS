package br.com.mac.api.ajuste.financeiro.enums;

import br.com.mac.api.ajuste.financeiro.exception.NotFoundException;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.stream.Stream;

@AllArgsConstructor
public enum TipoEnum {

    EC(1),
    PORTADOR(2),
    RH(3);

    @Getter
    private final Integer value;

	/**
     * Busca valor pelo enum
     *
     * @param enumName - valor
     *
     * @return enum
     */
	public static TipoEnum getEnum(String enumName) {
		return Stream.of(TipoEnum.values())
				.filter(item -> item.name().equals(enumName))
				.findFirst().orElseThrow(() ->
						new NotFoundException(
								ExceptionsMessagesEnum.TIPO_OPERACAO_NAO_ENCONTRADO.getMessage()));
	}

	/**
	 * Busca enum por valor
	 * @param value - valor
	 * @return enum
	 */
	public static TipoEnum getEnum(long value) {
		return Stream.of(TipoEnum.values())
				.filter(item -> item.getValue() == value)
				.findFirst().orElse(null);
	}

}
