	package br.com.mac.api.ajuste.financeiro.repository.filter;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

import br.com.mac.api.ajuste.financeiro.persistence.AjusteFinanceiroEntity;
import br.com.mac.api.ajuste.financeiro.util.DynamicQuery;

@Component
public class AjusteFinanceiroDynamicQuery implements DynamicQuery<AjusteFinanceiroClauseDynamicQuery, AjusteFinanceiroEntity> {

    @Override
    public AjusteFinanceiroClauseDynamicQuery[] values() {
        return AjusteFinanceiroClauseDynamicQuery.values();
    }

    @Override
    public Specification<AjusteFinanceiroEntity> clause(AjusteFinanceiroClauseDynamicQuery dynamicQueryEnum, Object value) {
        return dynamicQueryEnum.clause(value);
    }
}
