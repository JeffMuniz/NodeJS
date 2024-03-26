package br.com.mac.api.ajuste.financeiro.util;

import org.springframework.data.jpa.domain.Specification;

public interface DynamicQuery<T extends Enum<T>, E> {

    T[] values();

    Specification<E> clause(T dynamicQueryEnum, Object value);
}
