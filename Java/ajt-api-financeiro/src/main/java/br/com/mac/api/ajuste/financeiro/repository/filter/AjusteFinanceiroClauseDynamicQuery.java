package br.com.mac.api.ajuste.financeiro.repository.filter;

import static java.text.MessageFormat.format;

import java.math.BigDecimal;
import java.math.RoundingMode;

import org.springframework.data.jpa.domain.Specification;

import br.com.mac.api.ajuste.financeiro.enums.OperacaoEnum;
import br.com.mac.api.ajuste.financeiro.enums.StatusEnum;
import br.com.mac.api.ajuste.financeiro.enums.TipoEnum;
import br.com.mac.api.ajuste.financeiro.persistence.AjusteFinanceiroEntity;
import br.com.mac.api.ajuste.financeiro.util.ClauseDynamicQuery;
import br.com.mac.api.ajuste.financeiro.web.api.dto.AjusteFinanceiroQueryParamsDto;

public enum AjusteFinanceiroClauseDynamicQuery implements ClauseDynamicQuery<AjusteFinanceiroEntity> {
    ID {
        @Override
        public Specification<AjusteFinanceiroEntity> clause(Object value) {
            return (ajusteFinanceiro, criteriaQuery, criteriaBuilder) -> criteriaBuilder
                    .equal(ajusteFinanceiro.get("id"), (Integer) value);
        }
    },
    IDSOLICITACAO {
        @Override
        public Specification<AjusteFinanceiroEntity> clause(Object value) {
            return (ajusteFinanceiro, criteriaQuery, criteriaBuilder) -> criteriaBuilder
                    .equal(ajusteFinanceiro.get("idSolicitacao"), (Integer) value);
        }
    },
    CLIENTENOME {
        @Override
        public Specification<AjusteFinanceiroEntity> clause(Object value) {
            return (ajusteFinanceiro, criteriaQuery, criteriaBuilder) -> criteriaBuilder
                    .like(criteriaBuilder.upper(ajusteFinanceiro.join("cliente").get("nome")),
                            (String) format("%{0}%",
                                    value.toString().toUpperCase()));
        }
    },
    CLIENTECPF {
        @Override
        public Specification<AjusteFinanceiroEntity> clause(Object value) {
            return (ajusteFinanceiro, criteriaQuery, criteriaBuilder) -> criteriaBuilder
                    .like(ajusteFinanceiro.join("cliente").get("cpf"),
                            (String) format("%{0}%",
                                    value.toString()));
        }
    },
    CLIENTECNPJ {
        @Override
        public Specification<AjusteFinanceiroEntity> clause(Object value) {
            return (ajusteFinanceiro, criteriaQuery, criteriaBuilder) -> criteriaBuilder
                    .like(ajusteFinanceiro.join("cliente").get("cnpj"),
                            (String) format("%{0}%",
                                    value.toString()));
        }
    },
    TIPO {
		@Override
        public Specification<AjusteFinanceiroEntity> clause(Object value) {
            return (ajusteFinanceiro, criteriaQuery, criteriaBuilder) -> criteriaBuilder
                    .equal(ajusteFinanceiro.join("tipo").get("id"), ((TipoEnum) value).getValue());
        }
    },
    OPERACAO {
        @Override
        public Specification<AjusteFinanceiroEntity> clause(Object value) {
            return (ajusteFinanceiro, criteriaQuery, criteriaBuilder) -> criteriaBuilder
                    .equal(ajusteFinanceiro.get("operacao"), ((OperacaoEnum) value).getValue());
        }
    },
    STATUS {
        @Override
        public Specification<AjusteFinanceiroEntity> clause(Object value) {
            return (ajusteFinanceiro, criteriaQuery, criteriaBuilder) -> criteriaBuilder
                    .equal(ajusteFinanceiro.join("status").get("id"), ((StatusEnum) value).getValue());
        }
    },
    VALOR {
        @Override
        public Specification<AjusteFinanceiroEntity> clause(Object value) {
            return (ajusteFinanceiro, criteriaQuery, criteriaBuilder) -> criteriaBuilder
                    .equal(ajusteFinanceiro.get("valor"),
                            ((BigDecimal) value).setScale(2, RoundingMode.HALF_UP));
        }
    },
    VALORMAIORQUE {
        @Override
        public Specification<AjusteFinanceiroEntity> clause(Object value) {
            return (ajusteFinanceiro, criteriaQuery, criteriaBuilder) -> criteriaBuilder
                    .greaterThanOrEqualTo(ajusteFinanceiro.get("valor"),
                            ((BigDecimal) value).setScale(2, RoundingMode.HALF_UP));
        }
    },
    VALORMENORQUE {
        @Override
        public Specification<AjusteFinanceiroEntity> clause(Object value) {
            return (ajusteFinanceiro, criteriaQuery, criteriaBuilder) -> criteriaBuilder
                    .lessThanOrEqualTo(ajusteFinanceiro.get("valor"),
                            ((BigDecimal) value).setScale(2, RoundingMode.HALF_UP));
        }
    },
    DATACRIACAO {
        @Override
        public Specification<AjusteFinanceiroEntity> clause(Object value) {
        	AjusteFinanceiroQueryParamsDto.DataInicialFinal dataCriacao = (AjusteFinanceiroQueryParamsDto
                    .DataInicialFinal) value;

            return (ajusteFinanceiro, criteriaQuery, criteriaBuilder) -> criteriaBuilder
                    .between(ajusteFinanceiro.get("dataCriacao"),
                            dataCriacao.dataInicial,
                            dataCriacao.dataFinal);
        }
    },
    DATAFINALIZACAO {
        @Override
        public Specification<AjusteFinanceiroEntity> clause(Object value) {
        	AjusteFinanceiroQueryParamsDto.DataInicialFinal data = (AjusteFinanceiroQueryParamsDto
                    .DataInicialFinal) value;

            return (ajusteFinanceiro, criteriaQuery, criteriaBuilder) -> criteriaBuilder
                    .between(ajusteFinanceiro.get("dataFinalizacao"),
                            data.dataInicial,
                            data.dataFinal);

        }
    }
}
