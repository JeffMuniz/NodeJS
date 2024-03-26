package br.com.mac.api.ajuste.financeiro.repository.filter;

import org.springframework.data.jpa.domain.Specification;

import br.com.mac.api.ajuste.financeiro.persistence.MotivoEntity;
import br.com.mac.api.ajuste.financeiro.util.ClauseDynamicQuery;

public enum AjusteMotivoClauseDynamicQuery implements ClauseDynamicQuery<MotivoEntity> {
	
	
	OPERACAO{
		@Override
		public Specification<MotivoEntity> clause(Object value) {
			return (motivoEntity, criteriaQuery, criteriaBuilder) -> criteriaBuilder
                    .equal(motivoEntity.get("operacao"), (Integer) value);
		}
	},
	
	TIPO{
		@Override
		public Specification<MotivoEntity> clause(Object value) {
			return (motivoEntity, criteriaQuery, criteriaBuilder) -> criteriaBuilder
                    .equal(motivoEntity.get("tipo"), (Integer) value);
		}
	}, 
	
	ATIVO{
		@Override
		public Specification<MotivoEntity> clause(Object value) {
			return (motivoEntity, criteriaQuery, criteriaBuilder) -> criteriaBuilder
                    .equal(motivoEntity.get("ativo"), (Boolean) value);
		}
	};

	

}
