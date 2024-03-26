package br.com.machina.estautoecapi.repository;

import br.com.machina.estautoecapi.bean.credenciamento.DadosCredenciamento;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DadosCredenciamentoRepository extends MongoRepository<DadosCredenciamento, String> {

    DadosCredenciamento findDadosCredenciamentoByEstabelecimento_Cnpj(String cnpj);
}
