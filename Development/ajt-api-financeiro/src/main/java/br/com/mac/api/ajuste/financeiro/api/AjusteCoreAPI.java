package br.com.mac.api.ajuste.financeiro.api;

import java.time.format.DateTimeFormatter;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.util.UriComponentsBuilder;

import com.google.gson.Gson;

import br.com.mac.adapter.rest.RestAdapter;
import br.com.mac.adapter.rest.model.RequestModel;
import br.com.mac.adapter.rest.model.ResponseModel;
import br.com.mac.api.ajuste.financeiro.api.request.CriarAjusteEcRequest;
import br.com.mac.api.ajuste.financeiro.api.request.CriarAjusteRhRequest;
import br.com.mac.api.ajuste.financeiro.enums.ExceptionsMessagesEnum;
import br.com.mac.api.ajuste.financeiro.enums.MotivoExternoEnum;
import br.com.mac.api.ajuste.financeiro.enums.StatusEnum;
import br.com.mac.api.ajuste.financeiro.enums.TipoEnum;
import br.com.mac.api.ajuste.financeiro.exception.BadRequestException;
import br.com.mac.api.ajuste.financeiro.exception.NotImplementedException;
import br.com.mac.api.ajuste.financeiro.persistence.AjusteFinanceiroEntity;
import br.com.mac.api.ajuste.financeiro.persistence.StatusEntity;
import br.com.mac.api.ajuste.financeiro.repository.StatusRepository;
import br.com.mac.api.ajuste.financeiro.util.HeadersDefaultApi;
import br.com.mac.component.crypt.transf.core.impl.CryptTransformImpl;
import br.com.mac.api.ajuste.financeiro.exception.NotFoundException;
import lombok.Setter;

/**
 * Classe que representa as chamadas a api dos ajustes do core
 * @author mac Visa Card 2020
 * @version 1.0
 */
@Service
@RefreshScope
@Lazy
public class AjusteCoreAPI {

    /**
     * Constante logger.
     */
    private static final Logger logger = LoggerFactory.getLogger(AjusteCoreAPI.class);

    private final HeadersDefaultApi headersPier;

    @Resource(name = "mac.default.rest.adapter")
    private final RestAdapter restAdapter;

    @Setter
    @Value("${app.ajuste.core.host}")
	private String ajusteCoreHost;

    @Setter
    @Value("${app.estorno.host}")
	private String estornoHost;    

    @Autowired
    private StatusRepository statusRepository;

    public AjusteCoreAPI(HeadersDefaultApi headersPier, RestAdapter restAdapter) {
        this.headersPier = headersPier;
        this.restAdapter = restAdapter;
    }

    /**
     * Realiza um ajuste no core para sensibilizar a conductor
     * @param authorization - token de autorizacao
     * @param entity   - Entrada do servico
     * @return Long com id da solicitacao
     */
    public AjusteFinanceiroEntity criarAjuste(final String authorization, final AjusteFinanceiroEntity entity){

    	//Fluxo Pagamento EC: Criar sensibilização na conductor

        if(TipoEnum.EC.getValue().equals(entity.getTipo().getId())){
            return this.criarAjusteEC(authorization, entity, CriarAjusteEcRequest.builder().ajuste(
                    CriarAjusteEcRequest.Ajuste.builder()
                            .cnpj(new CryptTransformImpl().decryptAes(entity.getCliente().getCnpj()))
                            .idTipoAjusteLojista(entity.getOperacao())
                            .dataVencimento(entity.getDataVencimento().format(DateTimeFormatter.ofPattern("yyyy-MM-dd")))
                            .valor(entity.getValor())
                            .build())
                    .build()
            );
        }else if(TipoEnum.RH.getValue().toString().equals(entity.getTipo().getId().toString())){
        	return this.criarAjusteRh(authorization, entity, CriarAjusteRhRequest.builder()
            	            .idConta(entity.getCliente().getIdConta())
                            .idPedido(entity.getCodExterno())
                            .motivo(MotivoExternoEnum.getEnumName(entity.getMotivo().getId()))
                            .origem("BKO - LOGIN_USUARIO")
                            .valor(entity.getValor())                            
                    .build()
            );
        }else {
        	throw new NotImplementedException(ExceptionsMessagesEnum.REGRA_NAO_IMPL.getMessage());
        	//TODO Ajuste PORTADOR
        }
    }
	
    /**
     * Realiza um ajuste ao estabelecimento para sensibilizar a conductor
     * @param authorization - token de autorizacao
     * @param request   - Entrada do servico 
     * @return Long com id da solicitacao
     */
    @SuppressWarnings("unchecked")
    private AjusteFinanceiroEntity criarAjusteEC(final String authorization, final AjusteFinanceiroEntity entity, final CriarAjusteEcRequest request) throws HttpClientErrorException {

        try {
        	UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(ajusteCoreHost)
                    .pathSegment("v1", "ajustes");

            HttpHeaders headers = this.headersPier.creatHeaders();
            headers.add(HttpHeaders.AUTHORIZATION, authorization);

			RequestModel<String> requestModel = (RequestModel<String>) new RequestModel.Builder()
                    .configUrl(builder.toUriString())
                    .configHttpHeaders(headers)
                    .configResponseType(String.class)
                    .configBody(new Gson().toJson(request))
                    .build();

            ResponseModel<String> response = this.restAdapter.postRequest(requestModel);

            if (response.getStatusCode() >= HttpStatus.BAD_REQUEST.value() && 
            		response.getStatusCode() < HttpStatus.INTERNAL_SERVER_ERROR.value()) {
            	
                StatusEntity statusEntity = statusRepository.findById(StatusEnum.RECUSADO.getValue())
                        .orElseGet(() -> {
                            throw new NotFoundException(ExceptionsMessagesEnum.STATUS_NAO_ENCONTRADO.getMessage());
                });                
            	entity.setStatus(statusEntity);
            	entity.setObservacao(String.format("Recusado: %s",response.getMessage()));
            }else if(response.getStatusCode() >= HttpStatus.INTERNAL_SERVER_ERROR.value() && 
            		response.getStatusCode() <= 599) {

                StatusEntity statusEntity = statusRepository.findById(StatusEnum.ERRO.getValue())
                        .orElseGet(() -> {
                            throw new NotFoundException(ExceptionsMessagesEnum.STATUS_NAO_ENCONTRADO.getMessage());
                });                
            	entity.setStatus(statusEntity);
            	entity.setObservacao(String.format("Erro: %s",response.getMessage()));
            }
            
            return entity;
        } catch (HttpClientErrorException e) {
            logger.error(e.getMessage(), e);
            throw e;
        } catch (final Exception e) {
            logger.error(e.getMessage(), e);
            throw new HttpClientErrorException(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Realiza um ajuste RH para sensibilizar a conductor
     * @param authorization - token de autorizacao
     * @param request   - Entrada do servico 
     */
    @SuppressWarnings("unchecked")
    private AjusteFinanceiroEntity criarAjusteRh(final String authorization, final AjusteFinanceiroEntity entity, final CriarAjusteRhRequest request) throws HttpClientErrorException {

        try {
        	UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(estornoHost)
                    .pathSegment("contas", "empresas", "creditos");

            HttpHeaders headers = this.headersPier.creatHeaders();
            headers.add(HttpHeaders.AUTHORIZATION, authorization);            
			RequestModel<String> requestModel = (RequestModel<String>) new RequestModel.Builder()
                    .configUrl(builder.toUriString())
                    .configHttpHeaders(headers)
                    .configResponseType(String.class)
                    .configBody(new Gson().toJson(request))
                    .build();

            ResponseModel<String> response = this.restAdapter.postRequest(requestModel);
            
            if (response.getStatusCode() >= HttpStatus.BAD_REQUEST.value() && 
            		response.getStatusCode() < HttpStatus.INTERNAL_SERVER_ERROR.value()) {
            	
                StatusEntity statusEntity = statusRepository.findById(StatusEnum.RECUSADO.getValue())
                        .orElseGet(() -> {
                            throw new NotFoundException(ExceptionsMessagesEnum.STATUS_NAO_ENCONTRADO.getMessage());
                });                
            	entity.setStatus(statusEntity);
            	entity.setObservacao(String.format("Recusado: %s",response.getMessage()));
            }else if(response.getStatusCode() >= HttpStatus.INTERNAL_SERVER_ERROR.value() && 
            		response.getStatusCode() <= 599) {

                StatusEntity statusEntity = statusRepository.findById(StatusEnum.ERRO.getValue())
                        .orElseGet(() -> {
                            throw new NotFoundException(ExceptionsMessagesEnum.STATUS_NAO_ENCONTRADO.getMessage());
                });                
            	entity.setStatus(statusEntity);
            	entity.setObservacao(String.format("Erro: %s",response.getMessage()));
            }

            return entity;

        } catch (HttpClientErrorException e) {
            logger.error(e.getMessage(), e);
            throw e;
        } catch (final Exception e) {
            logger.error(e.getMessage(), e);
            throw new HttpClientErrorException(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
}
