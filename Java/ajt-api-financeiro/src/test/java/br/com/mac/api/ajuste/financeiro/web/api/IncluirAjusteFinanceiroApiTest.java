package br.com.mac.api.ajuste.financeiro.web.api;

import br.com.mac.api.ajuste.financeiro.api.AprovacaoAPI;
import br.com.mac.api.ajuste.financeiro.config.TemplateTest;
import br.com.mac.api.ajuste.financeiro.enums.ExceptionsMessagesEnum;
import br.com.mac.api.ajuste.financeiro.exception.NotImplementedException;
import br.com.mac.api.ajuste.financeiro.factory.AjusteFinanceiroFactoryTest;
import br.com.mac.api.ajuste.financeiro.factory.ClienteFactoryTest;
import br.com.mac.api.ajuste.financeiro.persistence.ClienteEntity;
import br.com.mac.api.ajuste.financeiro.repository.AjusteFinanceiroRepository;
import br.com.mac.api.ajuste.financeiro.repository.ClienteRepository;
import br.com.mac.api.ajuste.financeiro.web.api.model.AjusteFinanceiroBody;
import br.com.mac.api.ajuste.financeiro.web.api.model.CriaAjuste;
import br.com.mac.api.ajuste.financeiro.web.api.model.CriaAjusteCliente;
import br.com.mac.api.ajuste.financeiro.web.api.model.CriaAjusteUsuario;
import com.tngtech.keycloakmock.api.KeycloakVerificationMock;
import com.tngtech.keycloakmock.api.TokenConfig;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

/**
 * Integration tests for the {@link AjusteFinanceiroApiDelegateImpl} REST controller.
 */
public class IncluirAjusteFinanceiroApiTest extends TemplateTest {

    KeycloakVerificationMock keycloakVerificationMock;
    @Autowired
    private AjustesApiDelegate ajusteApiDelegate;

    @Autowired
    private AjusteFinanceiroRepository ajusteFinanceiroRepo;

    @Autowired
    private ClienteRepository clienteRepo;

    @MockBean
    private AprovacaoAPI aprovacaoAPI;

    @BeforeAll
    public void setuUp() {
        this.cleanUp();
        keycloakVerificationMock = new KeycloakVerificationMock(65524, "backoffice");
        keycloakVerificationMock.start();

        ClienteEntity clienteUmTipoCpf = this.clienteRepo.save(ClienteFactoryTest.clienteUmTipoCpf());
        this.ajusteFinanceiroRepo.saveAll(Arrays.asList(
                AjusteFinanceiroFactoryTest.ajusteEcCreditoPendente(clienteUmTipoCpf),
                AjusteFinanceiroFactoryTest.ajustePortadorDebitoAprovado(clienteUmTipoCpf)
        ));
    }

    @AfterAll
    public void cleanUp() {
        this.ajusteFinanceiroRepo.deleteAll();
        this.clienteRepo.deleteAll();
        try {
            keycloakVerificationMock.stop();
        } catch (Exception ignored) {
        }
    }

    /**
     * Given Que eu quero testar "Incluir um ajuste a crédito para um ec" And Tenha mais de um ajuste na base When Chamo
     * a api de ajuste financeiro informando o ajuste Then Garanto que seja o mesmo retorne um ID And que seja possível
     * realizar a busca do mesmo
     */
    @Test
    public void incluirAjusteCreditoEC() {
        String authorization = String.format("Bearer %s", keycloakVerificationMock.getAccessToken(TokenConfig.aTokenConfig().build()));

        CriaAjuste ajuste = this.criaEntradaAjuste(CriaAjuste.TipoEnum.EC,
                CriaAjuste.OperacaoEnum.CREDITO);

        ResponseEntity<AjusteFinanceiroBody> response =
                this.ajusteApiDelegate.criarAjuste(
                        authorization, ajuste);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.CREATED);
        assertThat(response.getBody()).isNotNull();
        this.buscaAjuste(response.getBody().getId());

    }

    private CriaAjuste criaEntradaAjuste(CriaAjuste.TipoEnum tipo, CriaAjuste.OperacaoEnum operacao) {
        CriaAjuste ajuste = new CriaAjuste();
        ajuste.setTipo(tipo);
        ajuste.setOperacao(operacao);
        ajuste.setCodigoExterno(12311);
        ajuste.setDataVencimento("2020-01-01");
        ajuste.setObservacao("Teste de Unidade");
        ajuste.setIdMotivo(2);
        ajuste.setValor(20D);
        ajuste.setUsuario(new CriaAjusteUsuario().loginUsuario("teste").nomeUsuario("Teste"));
        ajuste.setCliente(new CriaAjusteCliente().nome("Cliente Teste").cpf("40937652807")
                .cnpj("21645836000123").idConta(1).descricaoConta("VR | LIBERADO | EMPRESA1"));
        ajuste.setDocumento("data:text/plain;base64,YQo=");
        return ajuste;
    }

    private void buscaAjuste(Integer idAjuste) {
        String authorization = String.format("Bearer %s", keycloakVerificationMock.getAccessToken(TokenConfig.aTokenConfig().build()));

        ResponseEntity<AjusteFinanceiroBody> response = this.ajusteApiDelegate.
                buscaAjusteFinanceiroPorID(
                        authorization, idAjuste);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isNotNull();
        assertEquals(idAjuste, response.getBody().getId());
    }

    /**
     * Given Que eu quero testar "Incluir um ajuste a débito para um ec" And Tenha mais de um ajuste na base When Chamo
     * a api de ajuste financeiro informando o ajuste Then Garanto que seja o mesmo retorne um ID And que seja possível
     * realizar a busca do mesmo
     */
    @Test
    public void incluirAjusteDebitoEC() {
        String authorization = String.format("Bearer %s", keycloakVerificationMock.getAccessToken(TokenConfig.aTokenConfig().build()));

        CriaAjuste ajuste = this.criaEntradaAjuste(CriaAjuste.TipoEnum.EC,
                CriaAjuste.OperacaoEnum.DEBITO);

        ResponseEntity<AjusteFinanceiroBody> response =
                this.ajusteApiDelegate.criarAjuste(
                        authorization, ajuste);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.CREATED);
        assertThat(response.getBody()).isNotNull();
        this.buscaAjuste(response.getBody().getId());

    }

    /**
     * Given Que eu quero testar "Incluir um ajuste a crédito para um portador" And Tenha mais de um ajuste na base When
     * Chamo a api de ajuste financeiro informando o ajuste Then Garanto que seja o mesmo retorne um ID And que seja
     * possível realizar a busca do mesmo
     */
    @Test
    public void incluirAjusteCreditoPortador() {
        String authorization = String.format("Bearer %s", keycloakVerificationMock.getAccessToken(TokenConfig.aTokenConfig().build()));

        CriaAjuste ajuste = this.criaEntradaAjuste(CriaAjuste.TipoEnum.PORTADOR,
                CriaAjuste.OperacaoEnum.CREDITO);

        ResponseEntity<AjusteFinanceiroBody> response =
                this.ajusteApiDelegate.criarAjuste(
                        authorization, ajuste);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.CREATED);
        assertThat(response.getBody()).isNotNull();
        this.buscaAjuste(response.getBody().getId());

    }

    /**
     * Given Que eu quero testar "Incluir um ajuste a débito para um portador" And Tenha mais de um ajuste na base When
     * Chamo a api de ajuste financeiro informando o ajuste Then Garanto que seja o mesmo retorne um ID And que seja
     * possível realizar a busca do mesmo
     */
    @Test
    public void incluirAjusteDebitoPortador() {
        String authorization = String.format("Bearer %s", keycloakVerificationMock.getAccessToken(TokenConfig.aTokenConfig().build()));

        CriaAjuste ajuste = this.criaEntradaAjuste(CriaAjuste.TipoEnum.PORTADOR,
                CriaAjuste.OperacaoEnum.DEBITO);

        ResponseEntity<AjusteFinanceiroBody> response =
                this.ajusteApiDelegate.criarAjuste(
                        authorization, ajuste);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.CREATED);
        assertThat(response.getBody()).isNotNull();
        this.buscaAjuste(response.getBody().getId());

    }

    /**
     * Given Que eu quero testar "Incluir um ajuste a crédito para um RH" And Tenha mais de um ajuste na base When
     * Chamo a api de ajuste financeiro informando o ajuste Then Garanto que seja o mesmo retorne um ID And que seja
     * possível realizar a busca do mesmo
     */
    @Test
    public void incluirAjusteCreditoRH() {
        String authorization = String.format("Bearer %s", keycloakVerificationMock.getAccessToken(TokenConfig.aTokenConfig().build()));

        CriaAjuste ajuste = this.criaEntradaAjuste(CriaAjuste.TipoEnum.RH,
                CriaAjuste.OperacaoEnum.CREDITO);

        ResponseEntity<AjusteFinanceiroBody> response =
                this.ajusteApiDelegate.criarAjuste(
                        authorization, ajuste);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.CREATED);
        assertThat(response.getBody()).isNotNull();
        this.buscaAjuste(response.getBody().getId());

    }

    /**
     * Given Que eu quero testar "Incluir um ajuste a débito para um RH" And Tenha mais de um ajuste na base When Chamo
     * a api de ajuste financeiro informando o ajuste Then Garanto que seja retornado código 501 - não implementado
     */
    @Test
    public void incluirAjusteDebitoRH() {
        String authorization = String.format("Bearer %s", keycloakVerificationMock.getAccessToken(TokenConfig.aTokenConfig().build()));

        CriaAjuste ajuste = this.criaEntradaAjuste(CriaAjuste.TipoEnum.RH,
                CriaAjuste.OperacaoEnum.DEBITO);

        NotImplementedException thrown = assertThrows(
                NotImplementedException.class,
                () -> this.ajusteApiDelegate.criarAjuste(
                        authorization, ajuste),
                "NOT_IMPLEMENTED"
        );
        assertTrue(thrown.getMessage().contains(ExceptionsMessagesEnum.TIPO_NAO_IMPLEMENTADO.getMessage()));

    }

}
