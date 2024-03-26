package br.com.mac.api.ajuste.financeiro.util;

import org.springframework.data.jpa.domain.Specification;

public interface ClauseDynamicQuery<E> {
    Specification<E> clause(Object value);
}
