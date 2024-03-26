package br.com.machina.estautoecapi.port;

import br.com.machina.adapter.rest.model.ResponseModel;
import br.com.machina.estautoecapi.bean.PessoaFisicaResponse;
import br.com.machina.estautoecapi.bean.PoliticaResponse;

public interface MotorPoliticaPort {

    ResponseModel<PoliticaResponse> getEmpresas(String cnpj);

    ResponseModel<PessoaFisicaResponse> getPessoa(String cpf);

}
