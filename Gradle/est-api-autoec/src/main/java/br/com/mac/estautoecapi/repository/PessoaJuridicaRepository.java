package br.com.machina.estautoecapi.repository;

import br.com.machina.estautoecapi.bean.PessoaFisicaResponse;
import br.com.machina.estautoecapi.bean.PoliticaResponse;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface PessoaJuridicaRepository extends MongoRepository<PoliticaResponse, String> {

    @Query(value = "{'cnpj': ?0}")
    PoliticaResponse findByCnpj(String cnpj);

}
