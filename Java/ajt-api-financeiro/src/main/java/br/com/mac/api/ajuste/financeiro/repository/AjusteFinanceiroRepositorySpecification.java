package br.com.mac.api.ajuste.financeiro.repository;

import br.com.mac.api.ajuste.financeiro.persistence.AjusteFinanceiroEntity;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AjusteFinanceiroRepositorySpecification extends JpaRepository<AjusteFinanceiroEntity, Integer>,
        JpaSpecificationExecutor<AjusteFinanceiroEntity> {

    List<AjusteFinanceiroEntity> findAll(Specification<AjusteFinanceiroEntity> query);
}
