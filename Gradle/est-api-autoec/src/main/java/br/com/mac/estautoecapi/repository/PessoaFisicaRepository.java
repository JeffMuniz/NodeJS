package br.com.machina.estautoecapi.repository;

import br.com.machina.estautoecapi.bean.PessoaFisicaResponse;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface PessoaFisicaRepository extends MongoRepository<PessoaFisicaResponse, String> {

    @Query(value = "{'cpf': ?0}")
    PessoaFisicaResponse findByCpf(String cpf);

}
