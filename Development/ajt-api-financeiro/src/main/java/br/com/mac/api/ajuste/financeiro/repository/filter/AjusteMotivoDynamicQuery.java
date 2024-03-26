package br.com.mac.api.ajuste.financeiro.repository.filter;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

import br.com.mac.api.ajuste.financeiro.persistence.MotivoEntity;
import br.com.mac.api.ajuste.financeiro.util.DynamicQuery;

@Component
public class AjusteMotivoDynamicQuery implements DynamicQuery<AjusteMotivoClauseDynamicQuery, MotivoEntity> {

	@Override
	public AjusteMotivoClauseDynamicQuery[] values() {
		return AjusteMotivoClauseDynamicQuery.values();
	}

	@Override
	public Specification<MotivoEntity> clause(AjusteMotivoClauseDynamicQuery dynamicQueryEnum, Object value) {
		return dynamicQueryEnum.clause(value);
	}




	

}
