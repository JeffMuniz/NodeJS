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
import br.com.mac.api.ajuste.financeiro.api.response.SolicitacaoResponse;
import br.com.mac.api.ajuste.financeiro.util.HeadersDefaultApi;
import br.com.mac.api.ajuste.financeiro.util.MockTest;

/**
 * Classe de teste unitario dos servicos de Aprovacao
 *
 * @author mac Visa Card 2019
 * @version 1.0
 */
@RunWith(MockitoJUnitRunner.class)
@TestPropertySource(properties = {"app.aprovacao.host=hostApi"})
public class AprovacaoAPIUnitTest {
    KeycloakVerificationMock keycloakVerificationMock;
    @Mock
    private RestAdapter restAdapter;

    @Mock
    private HttpHeaders httpHeaders;

    @InjectMocks
    private AprovacaoAPI aprovacaoAPI;

    @Before
    public void setUp() {
        keycloakVerificationMock = new KeycloakVerificationMock(65521, "backoffice");
        keycloakVerificationMock.start();
        aprovacaoAPI = new AprovacaoAPI(new HeadersDefaultApi(), restAdapter);
        aprovacaoAPI.setServer("http://localhost");
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
    public void postCriarSolicitacao() {
        String authorization = String.format("Bearer %s", keycloakVerificationMock.getAccessToken(TokenConfig.aTokenConfig().build()));

        ResponseModel<SolicitacaoResponse> response = new ResponseModel<SolicitacaoResponse>(UUID.randomUUID(),
                HttpStatus.CREATED.value(),
                "Teste",
                MockTest.mockResponseAprovacaoAPI(),
                httpHeaders,
                ZonedDateTime.now());
        Mockito.when(this.restAdapter.postRequest(Mockito.any(RequestModel.class))).thenReturn(
                response);
        this.aprovacaoAPI.criarSolicitacao(authorization, MockTest.mockRequestAprovacaoAPI());
    }

    /**
     * Testa chamada da api de aprovacao para criar uma solicitacao de 201
     */
    @Test(expected = HttpClientErrorException.class)
    @SuppressWarnings("unchecked")
    public void postCriarSolicitacao406() {
        String authorization = String.format("Bearer %s", keycloakVerificationMock.getAccessToken(TokenConfig.aTokenConfig().build()));

        ResponseModel<SolicitacaoResponse> response = new ResponseModel<SolicitacaoResponse>(UUID.randomUUID(),
                HttpStatus.NOT_ACCEPTABLE.value(),
                "Teste",
                MockTest.mockResponseAprovacaoAPI(),
                httpHeaders,
                ZonedDateTime.now());
        Mockito.when(this.restAdapter.postRequest(Mockito.any(RequestModel.class))).thenReturn(
                response);
        this.aprovacaoAPI.criarSolicitacao(authorization, MockTest.mockRequestAprovacaoAPI());

    }

    /**
     * Testa chamada da api de aprovacao com exception
     */
    @Test(expected = Exception.class)
    public void postCriarSolicitacaoException() {
        String authorization = String.format("Bearer %s", keycloakVerificationMock.getAccessToken(TokenConfig.aTokenConfig().build()));

        this.aprovacaoAPI.criarSolicitacao(authorization, MockTest.mockRequestAprovacaoAPI());
    }


}
