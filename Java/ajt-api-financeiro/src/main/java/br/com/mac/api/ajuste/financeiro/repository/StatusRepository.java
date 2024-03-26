package br.com.mac.api.ajuste.financeiro.repository;

import br.com.mac.api.ajuste.financeiro.persistence.StatusEntity;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Representa as queries relacionadas a entidade de Status Solicitacao
 *
 * @author mac Visa Card 2019
 * @version 1.0
 */
@Repository
public interface StatusRepository extends JpaRepository<StatusEntity, Integer> {

    @NotNull
    @Query(value = "SELECT st "
            + " FROM StatusEntity st "
            + " where st.id = :id")
    Optional<StatusEntity> findById(@Param("id") Integer id);

    Optional<StatusEntity> findByNome(@javax.validation.constraints.NotNull String nome);
}
