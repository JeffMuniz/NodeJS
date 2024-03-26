package br.com.mac.api.ajuste.financeiro.web.api.mapper;

import br.com.mac.api.ajuste.financeiro.enums.OperacaoEnum;
import br.com.mac.api.ajuste.financeiro.persistence.MotivoEntity;
import br.com.mac.api.ajuste.financeiro.web.api.dto.AjusteMotivoQueryParamsDto;
import br.com.mac.api.ajuste.financeiro.web.api.model.MotivoAjusteBody;

public class AjusteMotivoMapper {

	public static AjusteMotivoQueryParamsDto serialize(Integer idOperacao, Integer idTipo) {
		return AjusteMotivoQueryParamsDto
					.builder()
					.operacao(idOperacao)
					.tipo(idTipo)
					.ativo(true)
					.build();
	}
	
	public static MotivoAjusteBody serialize(MotivoEntity motivoEntity) {
		MotivoAjusteBody motivoAjusteBody = new MotivoAjusteBody();
		motivoAjusteBody.setId(motivoEntity.getId());
		motivoAjusteBody.setMotivoDescricao(motivoEntity.getDescricao());
		motivoAjusteBody.setTipo(motivoEntity.getTipo().getNome());
		motivoAjusteBody.setOperacao(OperacaoEnum
										.getEnum(motivoEntity.getOperacao())
										.getDescricao());
		return motivoAjusteBody;
	}
}
