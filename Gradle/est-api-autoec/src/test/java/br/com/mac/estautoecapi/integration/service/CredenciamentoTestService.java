package br.com.machina.estautoecapi.integration.service;

import br.com.machina.estautoecapi.bean.credenciamento.DadosCredenciamento;
import io.restassured.response.Response;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Component;

@Component
public class CredenciamentoTestService {

    @Getter
    @Setter
    public Response response;

    @Getter
    @Setter
    public DadosCredenciamento dadosCredenciamento = new DadosCredenciamento();

}
