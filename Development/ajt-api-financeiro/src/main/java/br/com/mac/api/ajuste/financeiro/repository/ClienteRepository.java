package br.com.mac.api.ajuste.financeiro.repository;

import br.com.mac.api.ajuste.financeiro.persistence.ClienteEntity;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Representa as queries relacionadas a entidade de Cliente
 *
 * @author mac Visa Card 2019
 * @version 1.0
 */
@Repository
public interface ClienteRepository extends JpaRepository<ClienteEntity, Integer> {

    @NotNull
    @Query(value = "SELECT cli.* "
            + " FROM cliente cli "
            + " where cli.cnpj = :cnpj LIMIT 1", nativeQuery = true)
    ClienteEntity findByCnpj(@Param("cnpj") String cnpj);

    @NotNull
    @Query(value = "SELECT cli.* "
            + " FROM cliente cli "
            + " where cli.cpf = :cpf and cli.id_conta = :idConta LIMIT 1", nativeQuery = true)
    ClienteEntity findByCpfAndConta(@Param("cpf") String cpf, @Param("idConta") Integer idConta);

    @NotNull
    @Query(value = "SELECT cli.* "
            + " FROM cliente cli "
            + " where cli.cnpj = :cnpj and cli.id_conta = :idConta LIMIT 1", nativeQuery = true)
    ClienteEntity findByCnpjAndConta(@Param("cnpj") String cpf, @Param("idConta") Integer idConta);

}
