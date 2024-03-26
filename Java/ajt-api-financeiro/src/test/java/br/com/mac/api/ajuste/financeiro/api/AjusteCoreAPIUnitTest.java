package br.com.mac.api.ajuste.financeiro.api;

import java.time.ZonedDateTime;
import java.util.UUID;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.test.context.TestPropertySource;
import org.springframework.web.client.HttpClientErrorException;

import com.tngtech.keycloakmock.api.KeycloakVerificationMock;
import com.tngtech.keycloakmock.api.TokenConfig;

import br.com.mac.adapter.rest.RestAdapter;
import br.com.mac.adapter.rest.model.RequestModel;
import br.com.mac.adapter.rest.model.ResponseModel;
import br.com.mac.api.ajuste.financeiro.enums.TipoEnum;
import br.com.mac.api.ajuste.financeiro.util.HeadersDefaultApi;
import br.com.mac.api.ajuste.financeiro.util.MockTest;

/**
 * Classe de teste unitario dos servicos de Ajuste financeiro do core
 *
 * @author mac Visa Card 2019
 * @version 1.0
 */
@RunWith(MockitoJUnitRunner.class)
@TestPropertySource(properties = { "app.ajuste.core.host=hostApi" })
public class AjusteCoreAPIUnitTest {

    KeycloakVerificationMock keycloakVerificationMock;
	
    @Mock
    private RestAdapter restAdapter;
    
    @Mock
    private HttpHeaders httpHeaders;
    
    @InjectMocks
    private AjusteCoreAPI ajusteCoreAPI;

    @Before
    public void setUp() {
    	keycloakVerificationMock = new KeycloakVerificationMock(65520, "backoffice");
        keycloakVerificationMock.start();
    	ajusteCoreAPI = new AjusteCoreAPI(new HeadersDefaultApi(), restAdapter);
    	ajusteCoreAPI.setAjusteCoreHost("http://localhost");
    	ajusteCoreAPI.setEstornoHost("http://10.70.30.41:7272");
    }
    
    @After
    public void tearDown() throws Exception {
        keycloakVerificationMock.stop();
    }
    
    /**
     * Testa chamada da api de aprovacao para criar uma solicitacao com sucesso
     */
	@Test
	@SuppressWarnings("unchecked")
    public void postCriarAjusteEc() {
        String authorization = String.format("Bearer %s", keycloakVerificationMock.getAccessToken(TokenConfig.aTokenConfig().build()));
        
    	ResponseModel<String> response = new ResponseModel<String>(UUID.randomUUID(),
    			HttpStatus.CREATED.value(), 
    			"Teste", 
    			"",
    			httpHeaders, 
    			ZonedDateTime.now());
        Mockito.when(this.restAdapter.postRequest(Mockito.any(RequestModel.class))).thenReturn(
        		response);
        this.ajusteCoreAPI.criarAjuste(authorization, MockTest.mockAjusteFinanceiroEntity(TipoEnum.getEnum("EC")).get());
    }
	
    /**
     * Testa chamada da api de aprovacao para criar uma solicitacao de 201
     */
    @Test(expected = HttpClientErrorException.class)
	@SuppressWarnings("unchecked")
    public void postCriarAjusteEc406() {
        String authorization = String.format("Bearer %s", keycloakVerificationMock.getAccessToken(TokenConfig.aTokenConfig().build()));
        
    	ResponseModel<String> response = new ResponseModel<String>(UUID.randomUUID(),
    			HttpStatus.NOT_ACCEPTABLE.value(), 
    			"Teste", 
    			"",
    			httpHeaders, 
    			ZonedDateTime.now());
        Mockito.when(this.restAdapter.postRequest(Mockito.any(RequestModel.class))).thenReturn(
        		response);
        this.ajusteCoreAPI.criarAjuste(authorization, MockTest.mockAjusteFinanceiroEntity(TipoEnum.getEnum("EC")).get());
    	
    }
	
    /**
     * Testa chamada da api de aprovacao com exception
     */
    @Test(expected = Exception.class)
    public void postCriarAjusteEcException() {
        String authorization = String.format("Bearer %s", keycloakVerificationMock.getAccessToken(TokenConfig.aTokenConfig().build()));
    	this.ajusteCoreAPI.criarAjuste(authorization, MockTest.mockAjusteFinanceiroEntity(TipoEnum.getEnum("EC")).get());
    }
    
    /**
     * Testa chamada da api de estorno para criar um registro com sucesso
     */
	@Test
	@SuppressWarnings("unchecked")
    public void postCriarAjusteRh() {
        String authorization = String.format("Bearer %s", keycloakVerificationMock.getAccessToken(TokenConfig.aTokenConfig().build()));
        
    	ResponseModel<String> response = new ResponseModel<String>(UUID.randomUUID(),
    			HttpStatus.CREATED.value(), 
    			"Teste", 
    			"",
    			httpHeaders, 
    			ZonedDateTime.now());
        Mockito.when(this.restAdapter.postRequest(Mockito.any(RequestModel.class))).thenReturn(
        		response);
        this.ajusteCoreAPI.criarAjuste(authorization, MockTest.mockAjusteFinanceiroEntity(TipoEnum.getEnum("RH")).get());
    }
	
    /**
     * Testa chamada da api de estorno para criar um registro de 201
     */
    @Test(expected = HttpClientErrorException.class)
	@SuppressWarnings("unchecked")
    public void postCriarAjusteRh406() {
        String authorization = String.format("Bearer %s", keycloakVerificationMock.getAccessToken(TokenConfig.aTokenConfig().build()));
        
    	ResponseModel<String> response = new ResponseModel<String>(UUID.randomUUID(),
    			HttpStatus.NOT_ACCEPTABLE.value(), 
    			"Teste", 
    			"",
    			httpHeaders, 
    			ZonedDateTime.now());
        Mockito.when(this.restAdapter.postRequest(Mockito.any(RequestModel.class))).thenReturn(
        		response);
        this.ajusteCoreAPI.criarAjuste(authorization, MockTest.mockAjusteFinanceiroEntity(TipoEnum.getEnum("RH")).get());
    	
    }
	
    /**
     * Testa chamada da api de estorno com exception
     */
    @Test(expected = Exception.class)
    public void postCriarAjusteRhException() {
        String authorization = String.format("Bearer %s", keycloakVerificationMock.getAccessToken(TokenConfig.aTokenConfig().build()));
    	this.ajusteCoreAPI.criarAjuste(authorization, MockTest.mockAjusteFinanceiroEntity(TipoEnum.getEnum("RH")).get());
    }

}
