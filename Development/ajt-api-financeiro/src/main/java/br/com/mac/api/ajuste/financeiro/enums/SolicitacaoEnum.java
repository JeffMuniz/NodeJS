package br.com.mac.api.ajuste.financeiro.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.stream.Stream;

@AllArgsConstructor
public enum SolicitacaoEnum {

	EC_DEBITO(2L, TipoEnum.EC, OperacaoEnum.DEBITO),
	PORTADOR_DEBITO(3L, TipoEnum.PORTADOR, OperacaoEnum.DEBITO),
	RH_DEBITO(4L, TipoEnum.RH, OperacaoEnum.DEBITO),
	EC_CREDITO(5L, TipoEnum.EC, OperacaoEnum.CREDITO),
	PORTADOR_CREDITO(6L, TipoEnum.PORTADOR, OperacaoEnum.CREDITO),
	RH_CREDITO(7L, TipoEnum.RH, OperacaoEnum.CREDITO);

	@Getter
	private Long codigo;

	@Getter
	private TipoEnum tipo;

	@Getter
	private OperacaoEnum operacao;

	/**
	 * Busca o valor da solicitacao pelo filtro
	 * @param tipo - tipo
	 * @param operacao - operacao
	 * @return valor numerico
	 */
	public static SolicitacaoEnum getEnum(final TipoEnum tipo, final OperacaoEnum operacao) {
		return Stream.of(SolicitacaoEnum.values())
				.filter(item -> tipo.equals(item.getTipo()) && operacao.equals(item.getOperacao()))
				.findFirst().orElse(null);
	}

}
