package br.com.mac.api.ajuste.financeiro.api;

import br.com.mac.adapter.rest.RestAdapter;
import br.com.mac.adapter.rest.model.RequestModel;
import br.com.mac.adapter.rest.model.ResponseModel;
import br.com.mac.api.ajuste.financeiro.api.request.CriarSolicitacaoRequest;
import br.com.mac.api.ajuste.financeiro.api.response.SolicitacaoResponse;
import br.com.mac.api.ajuste.financeiro.util.HeadersDefaultApi;
import com.google.gson.Gson;
import lombok.Setter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.util.UriComponentsBuilder;

import javax.annotation.Resource;

/**
 * Classe que representa as chamadas a api de aprovacao
 *
 * @author mac Visa Card 2020
 * @version 1.0
 */
@Service
@RefreshScope
@Lazy
public class AprovacaoAPI {

    /**
     * Constante logger.
     */
    private static final Logger logger = LoggerFactory.getLogger(AprovacaoAPI.class);


    private final HeadersDefaultApi headersPier;

    @Resource(name = "mac.default.rest.adapter")
    private final RestAdapter restAdapter;

    @Setter
    @Value("${app.aprovacao.host}")
    private String server;

    public AprovacaoAPI(HeadersDefaultApi headersPier, RestAdapter restAdapter) {
        this.headersPier = headersPier;
        this.restAdapter = restAdapter;
    }

    /**
     * Realiza a criacao de uma solicitacao para a API de aprovacao
     *
     * @param authorization
     * @param request       - Entrada do servico
     *
     * @return Long com id da solicitacao
     */
    @SuppressWarnings("unchecked")
    public Long criarSolicitacao(String authorization, final CriarSolicitacaoRequest request) throws HttpClientErrorException {

        try {
            UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(server)
                    .pathSegment("v1", "aprovacao", "solicitacoes");

            HttpHeaders headers = this.headersPier.creatHeaders();
            headers.add(HttpHeaders.AUTHORIZATION, authorization);

            RequestModel<SolicitacaoResponse> requestModel = (RequestModel<SolicitacaoResponse>) new RequestModel.Builder()
                    .configUrl(builder.toUriString())
                    .configHttpHeaders(headers)
                    .configResponseType(SolicitacaoResponse.class)
                    .configBody(new Gson().toJson(request))
                    .build();

            ResponseModel<SolicitacaoResponse> response = this.restAdapter.postRequest(requestModel);
            if (response.getStatusCode() != HttpStatus.CREATED.value()) {
                throw new HttpClientErrorException(HttpStatus.resolve(response.getStatusCode()), response.getMessage());
            }

            return response.getData().getSolicitacoes().get(0).getId();

        } catch (HttpClientErrorException e) {
            logger.error(e.getMessage(), e);
            throw e;
        } catch (final Exception e) {
            logger.error(e.getMessage(), e);
            throw new HttpClientErrorException(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
