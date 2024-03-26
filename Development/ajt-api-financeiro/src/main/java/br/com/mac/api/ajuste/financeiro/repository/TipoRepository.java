package br.com.mac.api.ajuste.financeiro.repository;

import br.com.mac.api.ajuste.financeiro.persistence.TipoEntity;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Representa as queries relacionadas a entidade de TipoOperacao
 *
 * @author mac Visa Card 2019
 * @version 1.0
 */
@Repository
public interface TipoRepository extends JpaRepository<TipoEntity, Long> {

    @NotNull
    @Query(value = "SELECT to "
            + " FROM TipoEntity to "
            + " where to.id = :idTipo and to.ativo = true")
    Optional<TipoEntity> findByIdTipo(@Param("idTipo") Integer idTipo);

}
