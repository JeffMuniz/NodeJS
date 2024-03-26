package br.com.mac.api.ajuste.financeiro.repository;

import java.util.List;
import java.util.Optional;

import org.jetbrains.annotations.NotNull;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import br.com.mac.api.ajuste.financeiro.persistence.MotivoEntity;

/**
 * Representa as queries relacionadas a entidade de Motivo
 *
 * @author mac Visa Card 2019
 * @version 1.0
 */
@Repository
public interface MotivoRepository extends JpaRepository<MotivoEntity, Integer> {

    @NotNull
    @Query(value = "SELECT mo "
            + " FROM MotivoEntity mo "
            + " where mo.id = :idMotivo ")
    Optional<MotivoEntity> findByIdMotivo(@Param("idMotivo") Integer idMotivo);
    
    
    Optional<List<MotivoEntity>> findAll(Specification<MotivoEntity> query);
}
