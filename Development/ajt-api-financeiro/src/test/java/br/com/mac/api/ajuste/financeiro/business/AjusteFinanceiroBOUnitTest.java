package br.com.mac.api.ajuste.financeiro.business;

import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;

import com.tngtech.keycloakmock.api.KeycloakVerificationMock;
import com.tngtech.keycloakmock.api.TokenConfig;

import br.com.mac.api.ajuste.financeiro.enums.ExceptionsMessagesEnum;
import br.com.mac.api.ajuste.financeiro.enums.TipoEnum;
import br.com.mac.api.ajuste.financeiro.exception.NotFoundException;
import br.com.mac.api.ajuste.financeiro.exception.PreconditionException;
import br.com.mac.api.ajuste.financeiro.persistence.AjusteFinanceiroEntity;
import br.com.mac.api.ajuste.financeiro.repository.AjusteFinanceiroRepository;
import br.com.mac.api.ajuste.financeiro.util.MockTest;
import br.com.mac.api.ajuste.financeiro.web.api.model.CriaAjuste;
import br.com.mac.api.ajuste.financeiro.web.api.model.CriaAjusteCliente;
import br.com.mac.api.ajuste.financeiro.web.api.model.CriaAjusteUsuario;

/**
 * Classe de teste unitario dos servicos de AjusteFinanceiroBO
 *
 * @author mac Visa Card 2020
 * @version 1.0
 */
@RunWith(MockitoJUnitRunner.class)
public class AjusteFinanceiroBOUnitTest {

    KeycloakVerificationMock keycloakVerificationMock;

    @Mock
    private AjusteFinanceiroRepository ajusteFinanceiroRepo;

    @InjectMocks
    private AjusteFinanceiroBO ajusteFinanceiroBO;

    @Before
    public void setup() {
        keycloakVerificationMock = new KeycloakVerificationMock(65522, "backoffice");
        keycloakVerificationMock.start();
    }

    @After
    public void tearDown() throws Exception {
        keycloakVerificationMock.stop();
    }

    /**
     * Testa tipo de operacao nao encontrado
     */
    @Test(expected = NotFoundException.class)
    public void ajusteNaoEncontrado() {
        try {
            this.ajusteFinanceiroBO.buscaAjusteFinanceiroPorID(MockTest.ANY_INT);
        } catch (Exception e) {
            Assert.assertTrue(e.getMessage().contains(
                    ExceptionsMessagesEnum.AJUSTE_NAO_ENCONTRADO.getMessage()));
            throw e;
        }
    }

    /**
     * Testa a pesquisa de tipo de operacao
     */
    @Test
    public void ajusteEncontrado() {
        Mockito.when(this.ajusteFinanceiroRepo.findById(MockTest.ANY_INT)).thenReturn(
                MockTest.mockAjusteFinanceiroEntity(TipoEnum.getEnum("EC")));
        AjusteFinanceiroEntity ajusteEntity = this.ajusteFinanceiroBO.buscaAjusteFinanceiroPorID(MockTest.ANY_INT);
        Assert.assertNotNull(ajusteEntity);
    }

    /**
     * Testa inclusão de ajuste sem informar o campo tipo
     */
    @Test(expected = PreconditionException.class)
    public void salvarAjusteSemTipo() {
        String authorization = String.format("Bearer %s", keycloakVerificationMock.getAccessToken(TokenConfig.aTokenConfig().build()));

        CriaAjuste ajuste = this.mockEntradaAjuste();
        ajuste.setTipo(null);
        this.salvarAjuste(authorization, ajuste);
    }

    private CriaAjuste mockEntradaAjuste() {
        CriaAjuste ajuste = new CriaAjuste();
        ajuste.setTipo(CriaAjuste.TipoEnum.PORTADOR);
        ajuste.setOperacao(CriaAjuste.OperacaoEnum.DEBITO);
        ajuste.setCodigoExterno(12311);
        ajuste.setDataVencimento("2020-01-01");
        ajuste.setObservacao("Teste de Unidade");
        ajuste.setIdMotivo(2);
        ajuste.setValor(20D);
        ajuste.setUsuario(new CriaAjusteUsuario().loginUsuario("teste").nomeUsuario("Teste"));
        ajuste.setCliente(new CriaAjusteCliente().nome("Cliente Teste").cpf("40937652807"));
        ajuste.setDocumento("12321");
        return ajuste;
    }

    private void salvarAjuste(String authorization, CriaAjuste ajuste) {
        try {
            this.ajusteFinanceiroBO.criarAjuste(authorization, ajuste);
        } catch (Exception e) {
            Assert.assertTrue(e.getMessage().contains(
                    ExceptionsMessagesEnum.ENTRADA_INVALIDA.getMessage()));
            throw e;
        }
    }

    /**
     * Testa inclusão de ajuste sem informar o campo operacao
     */
    @Test(expected = PreconditionException.class)
    public void salvarAjusteSemOperacao() {
        String authorization = String.format("Bearer %s", keycloakVerificationMock.getAccessToken(TokenConfig.aTokenConfig().build()));

        CriaAjuste ajuste = this.mockEntradaAjuste();
        ajuste.setOperacao(null);
        this.salvarAjuste(authorization, ajuste);
    }

    /**
     * Testa inclusão de ajuste sem informar o campo usuario
     */
    @Test(expected = PreconditionException.class)
    public void salvarAjusteSemUsuario() {
        String authorization = String.format("Bearer %s", keycloakVerificationMock.getAccessToken(TokenConfig.aTokenConfig().build()));

        CriaAjuste ajuste = this.mockEntradaAjuste();
        ajuste.setUsuario(null);
        this.salvarAjuste(authorization, ajuste);
    }

    /**
     * Testa inclusão de ajuste sem informar o campo login usuario
     */
    @Test(expected = PreconditionException.class)
    public void salvarAjusteSemLoginUsuario() {
        String authorization = String.format("Bearer %s", keycloakVerificationMock.getAccessToken(TokenConfig.aTokenConfig().build()));

        CriaAjuste ajuste = this.mockEntradaAjuste();
        ajuste.getUsuario().setLoginUsuario(null);
        this.salvarAjuste(authorization, ajuste);
    }

    /**
     * Testa inclusão de ajuste sem informar o campo nome usuario
     */
    @Test(expected = PreconditionException.class)
    public void salvarAjusteSemNomeUsuario() {
        String authorization = String.format("Bearer %s", keycloakVerificationMock.getAccessToken(TokenConfig.aTokenConfig().build()));

        CriaAjuste ajuste = this.mockEntradaAjuste();
        ajuste.getUsuario().setNomeUsuario(null);
        this.salvarAjuste(authorization, ajuste);
    }

    /**
     * Testa inclusão de ajuste sem informar o campo cliente
     */
    @Test(expected = PreconditionException.class)
    public void salvarAjusteSemCliente() {
        String authorization = String.format("Bearer %s", keycloakVerificationMock.getAccessToken(TokenConfig.aTokenConfig().build()));

        CriaAjuste ajuste = this.mockEntradaAjuste();
        ajuste.setCliente(null);
        this.salvarAjuste(authorization, ajuste);
    }

    /**
     * Testa inclusão de ajuste sem informar o campo data de vencimento
     */
    @Test(expected = PreconditionException.class)
    public void salvarAjusteSemDtVencimento() {
        String authorization = String.format("Bearer %s", keycloakVerificationMock.getAccessToken(TokenConfig.aTokenConfig().build()));

        CriaAjuste ajuste = this.mockEntradaAjuste();
        ajuste.setDataVencimento(null);
        this.salvarAjuste(authorization, ajuste);
    }

    /**
     * Testa inclusão de ajuste sem informar o campo valor
     */
    @Test(expected = PreconditionException.class)
    public void salvarAjusteSemValor() {
        String authorization = String.format("Bearer %s", keycloakVerificationMock.getAccessToken(TokenConfig.aTokenConfig().build()));

        CriaAjuste ajuste = this.mockEntradaAjuste();
        ajuste.setValor(null);
        this.salvarAjuste(authorization, ajuste);
    }

    /**
     * Testa inclusão de ajuste sem informar o campo motivo
     */
    @Test(expected = PreconditionException.class)
    public void salvarAjusteSemMotivo() {
        String authorization = String.format("Bearer %s", keycloakVerificationMock.getAccessToken(TokenConfig.aTokenConfig().build()));

        CriaAjuste ajuste = this.mockEntradaAjuste();
        ajuste.setIdMotivo(null);
        this.salvarAjuste(authorization, ajuste);
    }

}
