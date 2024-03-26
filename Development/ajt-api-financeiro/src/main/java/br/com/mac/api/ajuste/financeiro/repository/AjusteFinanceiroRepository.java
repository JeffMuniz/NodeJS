package br.com.mac.api.ajuste.financeiro.repository;

import br.com.mac.api.ajuste.financeiro.persistence.AjusteFinanceiroEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Representa as queries relacionadas a entidade de Ajuste Financeiro
 *
 * @author mac Visa Card 2019
 * @version 1.0
 */
@Repository
public interface AjusteFinanceiroRepository extends JpaRepository<AjusteFinanceiroEntity, Integer> {
}
