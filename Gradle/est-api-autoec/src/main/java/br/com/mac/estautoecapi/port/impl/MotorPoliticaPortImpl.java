package br.com.machina.estautoecapi.port.impl;

import br.com.machina.adapter.rest.MachinaRestAdapter;
import br.com.machina.adapter.rest.model.RequestModel;
import br.com.machina.adapter.rest.model.ResponseModel;
import br.com.machina.estautoecapi.bean.PessoaFisicaResponse;
import br.com.machina.estautoecapi.bean.PoliticaResponse;
import br.com.machina.estautoecapi.bean.motor.request.PessoaFisicaRequest;
import br.com.machina.estautoecapi.bean.motor.request.PoliticaRequest;
import br.com.machina.estautoecapi.port.MotorPoliticaPort;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.Collections;

@Component
public class MotorPoliticaPortImpl implements MotorPoliticaPort {

    @Resource(name = "machina.default.rest.adapter")
    private MachinaRestAdapter rest;

    @Value("${app.motor.url}")
    private String url;

    public ResponseModel<PessoaFisicaResponse> getPessoa(String cpf) {
        RequestModel<PessoaFisicaResponse> requestModel = (RequestModel<PessoaFisicaResponse>) new RequestModel.Builder()
                .configBody(PessoaFisicaRequest.builder().cpf(cpf).build())
                .configUrl(url + "/pessoas")
                .configHttpHeaders(createHttpHeaders())
                .build();
        return rest.postRequest(requestModel);
    }

    public ResponseModel<PoliticaResponse> getEmpresas(String cnpj) {
        RequestModel<PoliticaResponse> requestModel = (RequestModel<PoliticaResponse>) new RequestModel.Builder()
                .configBody(PoliticaRequest.builder().cnpj(cnpj).build())
                .configUrl(url + "/politicas")
                .configHttpHeaders(createHttpHeaders())
                .build();
        return rest.postRequest(requestModel);
    }

    private HttpHeaders createHttpHeaders() {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
        return headers;
    }

}
