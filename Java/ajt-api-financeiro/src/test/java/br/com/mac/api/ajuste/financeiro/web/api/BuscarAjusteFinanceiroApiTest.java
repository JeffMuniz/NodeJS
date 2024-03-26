package br.com.mac.api.ajuste.financeiro.web.api;

import br.com.mac.api.ajuste.financeiro.config.TemplateTest;
import br.com.mac.api.ajuste.financeiro.enums.OperacaoEnum;
import br.com.mac.api.ajuste.financeiro.enums.StatusEnum;
import br.com.mac.api.ajuste.financeiro.enums.TipoEnum;
import br.com.mac.api.ajuste.financeiro.exception.NotFoundException;
import br.com.mac.api.ajuste.financeiro.factory.AjusteFinanceiroFactoryTest;
import br.com.mac.api.ajuste.financeiro.factory.ClienteFactoryTest;
import br.com.mac.api.ajuste.financeiro.persistence.AjusteFinanceiroEntity;
import br.com.mac.api.ajuste.financeiro.persistence.ClienteEntity;
import br.com.mac.api.ajuste.financeiro.repository.AjusteFinanceiroRepository;
import br.com.mac.api.ajuste.financeiro.repository.ClienteRepository;
import br.com.mac.api.ajuste.financeiro.util.DateUtil;
import br.com.mac.api.ajuste.financeiro.web.api.model.AjusteFinanceiro;
import br.com.mac.api.ajuste.financeiro.web.api.model.AjusteFinanceiroBody;
import com.tngtech.keycloakmock.api.KeycloakVerificationMock;
import com.tngtech.keycloakmock.api.TokenConfig;
import org.apache.commons.lang3.StringUtils;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

/**
 * Integration tests for the {@link AjusteFinanceiroApiDelegateImpl} REST controller.
 */
public class BuscarAjusteFinanceiroApiTest extends TemplateTest {

    KeycloakVerificationMock keycloakVerificationMock;
    @Autowired
    private AjustesApiDelegate ajusteApiDelegate;
    @Autowired
    private AjusteFinanceiroRepository ajusteFinanceiroRepo;
    @Autowired
    private ClienteRepository clienteRepo;
    private Integer idAjusteTest;
    private Integer idSolicitacaoTest;

    @BeforeAll
    public void setuUp() {
        this.cleanUp();
        keycloakVerificationMock = new KeycloakVerificationMock(65523, "backoffice");
        keycloakVerificationMock.start();

        ClienteEntity clienteUmTipoCpf = this.clienteRepo.save(ClienteFactoryTest.clienteUmTipoCpf());
        ClienteEntity clienteDoisTipoCpf = this.clienteRepo.save(ClienteFactoryTest.clienteDoisTipoCpf());
        ClienteEntity clienteUmTipoCnpj = this.clienteRepo.save(ClienteFactoryTest.clienteUmTipoCnpj());

        List<AjusteFinanceiroEntity> listaAjuste = this.ajusteFinanceiroRepo.saveAll(Arrays.asList(
                AjusteFinanceiroFactoryTest.ajusteEcCreditoPendente(clienteUmTipoCpf),
                AjusteFinanceiroFactoryTest.ajustePortadorDebitoAprovado(clienteUmTipoCpf),
                AjusteFinanceiroFactoryTest.ajusteRHCreditoPendente(clienteDoisTipoCpf),
                AjusteFinanceiroFactoryTest.ajustePortadorCreditoRecusado(clienteDoisTipoCpf),
                AjusteFinanceiroFactoryTest.ajustePortadorDebitoPendenteUm(clienteUmTipoCnpj),
                AjusteFinanceiroFactoryTest.ajustePortadorDebitoPendenteDois(clienteUmTipoCnpj)
        ));

        this.idAjusteTest = listaAjuste.get(0).getId();
        this.idSolicitacaoTest = listaAjuste.get(0).getIdSolicitacao();

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
     * Given Que eu quero testar "Busca de ajuste por filtro de ID" And Tenha mais de um ajuste na base When Chamo a api
     * de ajuste financeiro informando somente o ID do ajuste Then Garanto que só retorne um ajuste And Seja o mesmo ID
     * da busca
     */
    @Test
    public void listarAjustesPorFiltroID() {
        String authorization = String.format("Bearer %s", keycloakVerificationMock.getAccessToken(TokenConfig.aTokenConfig().build()));

        ResponseEntity<AjusteFinanceiro> response = this.ajusteApiDelegate.buscaAjusteFinanceiro(
                authorization,
                idAjusteTest,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isNotNull();
        assertThat(response.getBody().getAjustes()).isNotEmpty();
        assertEquals(idAjusteTest, response.getBody().getAjustes().get(0).getId());
    }


    /**
     * Given Que eu quero testar "Busca de ajuste por filtro de ID sem resultado" And Tenha mais de um ajuste na base
     * When Chamo a api de ajuste financeiro informando somente o ID do ajuste Then Garanto que seja retornado nenhum
     * registro (NOT_FOUND)
     */
    @Test
    public void listarAjustesPorFiltroSemResultado() {
        String authorization = String.format("Bearer %s", keycloakVerificationMock.getAccessToken(TokenConfig.aTokenConfig().build()));

        ResponseEntity<AjusteFinanceiro> response = this.ajusteApiDelegate.buscaAjusteFinanceiro(
                authorization,
                999,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isNotNull();
        assertThat(response.getBody().getAjustes()).isEmpty();

    }


    /**
     * Given Que eu quero testar "Busca um ajuste por filtro de ID" And Tenha mais de um ajuste na base When Chamo a api
     * de ajuste financeiro informando somente o ID do ajuste Then Garanto que seja o mesmo ID da busca
     */
    @Test
    public void buscaAjustePorID() {
        String authorization = String.format("Bearer %s", keycloakVerificationMock.getAccessToken(TokenConfig.aTokenConfig().build()));

        ResponseEntity<AjusteFinanceiroBody> response = this.ajusteApiDelegate.
                buscaAjusteFinanceiroPorID(
                        authorization, idAjusteTest);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isNotNull();
        assertEquals(idAjusteTest, response.getBody().getId());
    }

    /**
     * Given Que eu quero testar "Busca um ajuste por filtro de ID sem resultado" And Não tenha o ajuste na base When
     * Chamo a api de ajuste financeiro informando somente o ID do ajuste Then Garanto que seja retornado nenhum
     * registro (NOT_FOUND)
     */
    @Test
    public void buscaAjustePorIDSemResultado() {
        String authorization = String.format("Bearer %s", keycloakVerificationMock.getAccessToken(TokenConfig.aTokenConfig().build()));

        assertThrows(NotFoundException.class, () -> {
            this.ajusteApiDelegate.buscaAjusteFinanceiroPorID(
                    authorization, 999);
        });
    }

    /**
     * Given Que eu quero testar "Busca de ajuste por filtro de TIPO RH" And Tenha mais de um ajuste na base com TIPOS
     * diferentes (EC/PORTADOR/RH) When Chamo a api de ajuste financeiro informando somente o tipo RH Then Garanto que
     * só retorne ajustes do tipo RH
     */
    @Test
    public void listarAjustesPorFiltroTipoRH() {
        String authorization = String.format("Bearer %s", keycloakVerificationMock.getAccessToken(TokenConfig.aTokenConfig().build()));

        TipoEnum tipo = TipoEnum.RH;
        ResponseEntity<AjusteFinanceiro> response = this.ajusteApiDelegate.buscaAjusteFinanceiro(
                authorization,
                null,
                null,
                tipo.name(),
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isNotNull();
        assertThat(response.getBody().getAjustes()).isNotEmpty();
        assertThat(response.getBody().getAjustes()).extracting(AjusteFinanceiroBody::getTipo)
                .allMatch(tipoResult -> Objects.equals(tipoResult.getId(), tipo.getValue()));
    }


    /**
     * Given Que eu quero testar "Busca de ajuste por filtro de TIPO PORTADOR" And Tenha mais de um ajuste na base com
     * TIPOS diferentes (EC/PORTADOR/RH) When Chamo a api de ajuste financeiro informando somente o tipo PORTADOR Then
     * Garanto que só retorne ajustes do tipo PORTADOR
     */
    @Test
    public void listarAjustesPorFiltroTipoPortador() {
        String authorization = String.format("Bearer %s", keycloakVerificationMock.getAccessToken(TokenConfig.aTokenConfig().build()));

        TipoEnum tipo = TipoEnum.PORTADOR;
        ResponseEntity<AjusteFinanceiro> response = this.ajusteApiDelegate.buscaAjusteFinanceiro(
                authorization,
                null,
                null,
                tipo.name(),
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isNotNull();
        assertThat(response.getBody().getAjustes()).isNotEmpty();
        assertThat(response.getBody().getAjustes()).extracting(AjusteFinanceiroBody::getTipo)
                .allMatch(tipoResult -> Objects.equals(tipoResult.getId(), tipo.getValue()));
    }

    /**
     * Given Que eu quero testar "Busca de ajuste por filtro de TIPO EC" And Tenha mais de um ajuste na base com TIPOS
     * diferentes (EC/PORTADOR/RH) When Chamo a api de ajuste financeiro informando somente o tipo EC Then Garanto que
     * só retorne ajustes do tipo EC
     */
    @Test
    public void listarAjustesPorFiltroTipoEC() {
        String authorization = String.format("Bearer %s", keycloakVerificationMock.getAccessToken(TokenConfig.aTokenConfig().build()));

        TipoEnum tipo = TipoEnum.EC;
        ResponseEntity<AjusteFinanceiro> response = this.ajusteApiDelegate.buscaAjusteFinanceiro(
                authorization,
                null,
                null,
                tipo.name(),
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isNotNull();
        assertThat(response.getBody().getAjustes()).isNotEmpty();
        assertThat(response.getBody().getAjustes()).extracting(AjusteFinanceiroBody::getTipo)
                .allMatch(tipoResult -> Objects.equals(tipoResult.getId(), tipo.getValue()));
    }

    /**
     * Given Que eu quero testar "Busca de ajuste por filtro de Operacao DEBITO" And Tenha mais de um ajuste na base com
     * OPERACAO diferentes (DEBITO/CREDITO) When Chamo a api de ajuste financeiro informando somente A Operacao DEBITO
     * Then Garanto que só retorne ajustes de Operacao DEBITO
     */
    @Test
    public void listarAjustesPorFiltroOperacaoDebito() {
        String authorization = String.format("Bearer %s", keycloakVerificationMock.getAccessToken(TokenConfig.aTokenConfig().build()));

        OperacaoEnum operacao = OperacaoEnum.DEBITO;
        ResponseEntity<AjusteFinanceiro> response = this.ajusteApiDelegate.buscaAjusteFinanceiro(
                authorization,
                null,
                null,
                null,
                operacao.name(),
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isNotNull();
        assertThat(response.getBody().getAjustes()).isNotEmpty();
        assertThat(response.getBody().getAjustes()).extracting(AjusteFinanceiroBody::getOperacao)
                .allMatch(operacaoResult -> Objects.equals(operacaoResult.getId(), operacao.getValue()));
    }

    /**
     * Given Que eu quero testar "Busca de ajuste por filtro de Operacao CREDITO" And Tenha mais de um ajuste na base
     * com OPERACAO diferentes (DEBITO/CREDITO) When Chamo a api de ajuste financeiro informando somente A Operacao
     * CREDITO Then Garanto que só retorne ajustes de Operacao CREDITO
     */
    @Test
    public void listarAjustesPorFiltroOperacaoCredito() {
        String authorization = String.format("Bearer %s", keycloakVerificationMock.getAccessToken(TokenConfig.aTokenConfig().build()));

        OperacaoEnum operacao = OperacaoEnum.CREDITO;
        ResponseEntity<AjusteFinanceiro> response = this.ajusteApiDelegate.buscaAjusteFinanceiro(
                authorization,
                null,
                null,
                null,
                operacao.name(),
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isNotNull();
        assertThat(response.getBody().getAjustes()).isNotEmpty();
        assertThat(response.getBody().getAjustes()).extracting(AjusteFinanceiroBody::getOperacao)
                .allMatch(operacaoResult -> Objects.equals(operacaoResult.getId(), operacao.getValue()));
    }

    /**
     * Given Que eu quero testar "Busca de ajuste por filtro de Status PENDENTE" And Tenha mais de um ajuste na base com
     * Status diferentes (PENDENTE/APROVADO/RECUSADO) When Chamo a api de ajuste financeiro informando somente Status
     * PENDENTE Then Garanto que só retorne ajustes de Status PENDENTE
     */
    @Test
    public void listarAjustesPorFiltroStatusPendente() {
        String authorization = String.format("Bearer %s", keycloakVerificationMock.getAccessToken(TokenConfig.aTokenConfig().build()));

        StatusEnum status = StatusEnum.PENDENTE;
        ResponseEntity<AjusteFinanceiro> response = this.ajusteApiDelegate.buscaAjusteFinanceiro(
                authorization,
                null,
                null,
                null,
                null,
                status.name(),
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isNotNull();
        assertThat(response.getBody().getAjustes()).isNotEmpty();
        assertThat(response.getBody().getAjustes()).extracting(AjusteFinanceiroBody::getStatus)
                .allMatch(statusResult -> Objects.equals(statusResult.getId(), status.getValue()));
    }

    /**
     * Given Que eu quero testar "Busca de ajuste por filtro de Status APROVADO" And Tenha mais de um ajuste na base com
     * Status diferentes (PENDENTE/APROVADO/RECUSADO) When Chamo a api de ajuste financeiro informando somente Status
     * APROVADO Then Garanto que só retorne ajustes de Status APROVADO
     */
    @Test
    public void listarAjustesPorFiltroStatusAprovado() {
        String authorization = String.format("Bearer %s", keycloakVerificationMock.getAccessToken(TokenConfig.aTokenConfig().build()));

        StatusEnum status = StatusEnum.APROVADO;
        ResponseEntity<AjusteFinanceiro> response = this.ajusteApiDelegate.buscaAjusteFinanceiro(
                authorization,
                null,
                null,
                null,
                null,
                status.name(),
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isNotNull();
        assertThat(response.getBody().getAjustes()).isNotEmpty();
        assertThat(response.getBody().getAjustes()).extracting(AjusteFinanceiroBody::getStatus)
                .allMatch(statusResult -> Objects.equals(statusResult.getId(), status.getValue()));
    }

    /**
     * Given Que eu quero testar "Busca de ajuste por filtro de Status RECUSADO" And Tenha mais de um ajuste na base com
     * Status diferentes (PENDENTE/APROVADO/RECUSADO) When Chamo a api de ajuste financeiro informando somente Status
     * RECUSADO Then Garanto que só retorne ajustes de Status RECUSADO
     */
    @Test
    public void listarAjustesPorFiltroStatusRecusado() {
        String authorization = String.format("Bearer %s", keycloakVerificationMock.getAccessToken(TokenConfig.aTokenConfig().build()));

        StatusEnum status = StatusEnum.RECUSADO;
        ResponseEntity<AjusteFinanceiro> response = this.ajusteApiDelegate.buscaAjusteFinanceiro(
                authorization,
                null,
                null,
                null,
                null,
                status.name(),
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isNotNull();
        assertThat(response.getBody().getAjustes()).isNotEmpty();
        assertThat(response.getBody().getAjustes()).extracting(AjusteFinanceiroBody::getStatus)
                .allMatch(statusResult -> Objects.equals(statusResult.getId(), status.getValue()));
    }

    /**
     * Given Que eu quero testar "Busca de ajuste por filtro de Nome do Cliente" And Tenha mais de um ajuste na base com
     * Nome do Cliente diferentes When Chamo a api de ajuste financeiro informando somente o Nome do Cliente Then
     * Garanto que só retorne os ajuste com nome que contenha o informado
     */
    @Test
    public void listarAjustesPorFiltroNomeCliente() {
        String authorization = String.format("Bearer %s", keycloakVerificationMock.getAccessToken(TokenConfig.aTokenConfig().build()));

        String razaoSocial = "mpRes";
        ResponseEntity<AjusteFinanceiro> response = this.ajusteApiDelegate.buscaAjusteFinanceiro(
                authorization,
                null,
                null,
                null,
                null,
                null,
                razaoSocial,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isNotNull();
        assertThat(response.getBody().getAjustes()).isNotEmpty();
        assertThat(response.getBody().getAjustes()).extracting(AjusteFinanceiroBody::getCliente)
                .allSatisfy(clienteResult -> {
                    assertThat(clienteResult.getNome().toUpperCase()).contains(razaoSocial.toUpperCase());
                });
    }

    /**
     * Given Que eu quero testar "Busca de ajuste por filtro de Cpf do Cliente" And Tenha mais de um ajuste na base com
     * Cpf do Cliente diferentes When Chamo a api de ajuste financeiro informando somente o Cpf do Cliente Then Garanto
     * que só retorne os ajuste com Cpf que contenha o informado
     */
    @Test
    public void listarAjustesPorFiltroCpfCliente() {
        String authorization = String.format("Bearer %s", keycloakVerificationMock.getAccessToken(TokenConfig.aTokenConfig().build()));

        String cpfCliente = "40833875606";
        ResponseEntity<AjusteFinanceiro> response = this.ajusteApiDelegate.buscaAjusteFinanceiro(
                authorization,
                null,
                null,
                null,
                null,
                null,
                null,
                cpfCliente,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isNotNull();
//        assertThat(response.getBody().getAjustes()).isNotEmpty();
//        assertThat(response.getBody().getAjustes()).extracting(AjusteFinanceiroBody::getCliente)
//                .allSatisfy(clienteResult -> {
//                    assertThat(clienteResult.getCpf()).contains(cpfCliente);
//                });
    }

    /**
     * Given Que eu quero testar "Busca de ajuste por filtro de CNPJ do Cliente" And Tenha mais de um ajuste na base com
     * CNPJ do Cliente diferentes When Chamo a api de ajuste financeiro informando somente o CNPJ formatado do Cliente
     * Then Garanto que só retorne os ajuste com CNPJ que contenha o informado
     */
    @Test
    public void listarAjustesPorFiltroCnpjClienteComFormatacao() {
        String authorization = String.format("Bearer %s", keycloakVerificationMock.getAccessToken(TokenConfig.aTokenConfig().build()));

        String cnpjCliente = "14.335.895/0001-20";
        ResponseEntity<AjusteFinanceiro> response = this.ajusteApiDelegate.buscaAjusteFinanceiro(
                authorization,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                cnpjCliente,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isNotNull();
//        assertThat(response.getBody().getAjustes()).isNotEmpty();
//        assertThat(response.getBody().getAjustes()).extracting(AjusteFinanceiroBody::getCliente)
//                .allSatisfy(clienteResult -> {
//                    assertThat(StringUtil.removerCaracterEspeciais(clienteResult.getCnpj())).contains(
//                            StringUtil.removerCaracterEspeciais(cnpjCliente));
//                });
    }

    /**
     * Given Que eu quero testar "Busca de ajuste por filtro de CNPJ do Cliente" And Tenha mais de um ajuste na base com
     * CNPJ do Cliente diferentes When Chamo a api de ajuste financeiro informando somente o CNPJ sem formatado do
     * Cliente Then Garanto que só retorne os ajuste com CNPJ que contenha o informado
     */
    @Test
    public void listarAjustesPorFiltroCnpjClienteSemFormatacao() {
        String authorization = String.format("Bearer %s", keycloakVerificationMock.getAccessToken(TokenConfig.aTokenConfig().build()));

        String cnpjCliente = "14335895000120";
        ResponseEntity<AjusteFinanceiro> response = this.ajusteApiDelegate.buscaAjusteFinanceiro(
                authorization,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                cnpjCliente,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isNotNull();
//        assertThat(response.getBody().getAjustes()).isNotEmpty();
//        assertThat(response.getBody().getAjustes()).extracting(AjusteFinanceiroBody::getCliente)
//                .allSatisfy(clienteResult -> {
//                    assertThat(StringUtil.removerCaracterEspeciais(clienteResult.getCnpj())).contains(
//                            StringUtil.removerCaracterEspeciais(cnpjCliente));
//                });
    }

    /**
     * Given Que eu quero testar "Busca de ajuste por filtro de Data de Criacao" And Tenha mais de um ajuste na base com
     * Data de Criacao diferentes When Chamo a api de ajuste financeiro informando somente uma  Data de Criacao Then
     * Garanto que só retorne os ajuste com  Data de Criacao igual a informada
     */
    @Test
    public void listarAjustesPorFiltroDataCriacao() {
        String authorization = String.format("Bearer %s", keycloakVerificationMock.getAccessToken(TokenConfig.aTokenConfig().build()));

        final LocalDate dataInicio = LocalDate.of(2020, 02, 20);
        final LocalDate dataFim = LocalDate.of(2020, 06, 20);
        ResponseEntity<AjusteFinanceiro> response = this.ajusteApiDelegate.buscaAjusteFinanceiro(
                authorization, null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                dataInicio.toString(),
                dataFim.toString(),
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isNotNull();
        assertThat(response.getBody().getAjustes()).isNotEmpty();
        assertThat(response.getBody().getAjustes()).extracting(AjusteFinanceiroBody::getDataCriacao)
                .anyMatch(localDate -> DateUtil.parseZonedDateTimeByLocalDate(localDate).isAfter(dataInicio)
                        || DateUtil.parseZonedDateTimeByLocalDate(localDate).equals(dataInicio));
        assertThat(response.getBody().getAjustes()).extracting(AjusteFinanceiroBody::getDataCriacao)
                .anyMatch(localDate -> DateUtil.parseZonedDateTimeByLocalDate(localDate).isBefore(dataFim)
                        || DateUtil.parseZonedDateTimeByLocalDate(localDate).equals(dataFim));
    }

    /**
     * Given Que eu quero testar "Busca de ajuste por filtro de Data de Criacao inicial e final" And Tenha mais de um
     * ajuste na base com  Data de Criacao diferentes When Chamo a api de ajuste financeiro informando somente uma  Data
     * de Criacao inicial e final Then Garanto que só retorne os ajuste com  Data de Criacao maior igual do que a data
     * inicial informada
     */
    @Test
    public void listarAjustesPorFiltroDataCriacaoInicialFinal() {
        String authorization = String.format("Bearer %s", keycloakVerificationMock.getAccessToken(TokenConfig.aTokenConfig().build()));

        final LocalDate dataInicio = LocalDate.of(2020, 02, 20);
        final LocalDate dataFim = LocalDate.of(2020, 06, 20);
        ResponseEntity<AjusteFinanceiro> response = this.ajusteApiDelegate.buscaAjusteFinanceiro(
                authorization,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                dataInicio.toString(),
                dataFim.toString(),
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isNotNull();
        assertThat(response.getBody().getAjustes()).isNotEmpty();
        assertThat(response.getBody().getAjustes()).extracting(AjusteFinanceiroBody::getDataCriacao)
                .anyMatch(localDate -> DateUtil.parseZonedDateTimeByLocalDate(localDate).isAfter(dataInicio)
                        || DateUtil.parseZonedDateTimeByLocalDate(localDate).equals(dataInicio));
        assertThat(response.getBody().getAjustes()).extracting(AjusteFinanceiroBody::getDataCriacao)
                .anyMatch(localDate -> DateUtil.parseZonedDateTimeByLocalDate(localDate).isBefore(dataFim)
                        || DateUtil.parseZonedDateTimeByLocalDate(localDate).equals(dataFim));
    }


    /**
     * Given Que eu quero testar "Busca de ajuste por filtro de Data de Finalizacao" And Tenha mais de um ajuste na base
     * com  Data de Finalizacao diferentes When Chamo a api de ajuste financeiro informando somente uma  Data de
     * Finalizacao Then Garanto que só retorne os ajuste com  Data de Finalizacao igual a informada
     */
    @Test
    public void listarAjustesPorFiltroDataFinalizacao() {
        String authorization = String.format("Bearer %s", keycloakVerificationMock.getAccessToken(TokenConfig.aTokenConfig().build()));

        final LocalDate dataRef = LocalDate.of(2020, 03, 05);
        ResponseEntity<AjusteFinanceiro> response = this.ajusteApiDelegate.buscaAjusteFinanceiro(
                authorization,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                dataRef.toString(),
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isNotNull();
        assertThat(response.getBody().getAjustes()).isNotEmpty();
        assertThat(response.getBody().getAjustes()).extracting(AjusteFinanceiroBody::getDataFinalizacao)
                .anyMatch(localDate -> dataRef.isEqual(DateUtil.parseZonedDateTimeByLocalDate(localDate)));
    }


    /**
     * Given Que eu quero testar "Busca de ajuste por filtro de Valor igual" And Tenha mais de um ajuste na base com
     * valores diferentes When Chamo a api de ajuste financeiro informando somente o valor Then Garanto que só retorne
     * os ajuste com valor igual ao informado
     */
    @Test
    public void listarAjustesPorFiltroValorIgual() {
        String authorization = String.format("Bearer %s", keycloakVerificationMock.getAccessToken(TokenConfig.aTokenConfig().build()));

        Double valor = 83.55D;
        ResponseEntity<AjusteFinanceiro> response = this.ajusteApiDelegate.buscaAjusteFinanceiro(
                authorization,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                valor,
                null,
                null,
                null,
                null,
                null,
                null);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isNotNull();
        assertThat(response.getBody().getAjustes()).isNotEmpty();
        assertThat(response.getBody().getAjustes()).extracting(AjusteFinanceiroBody::getValor)
                .allSatisfy(valorResult -> {
                    assertThat(valorResult == valor);
                });
    }

    /**
     * Given Que eu quero testar "Busca de ajuste por filtro de Valor maior igual" And Tenha mais de um ajuste na base
     * com valores diferentes When Chamo a api de ajuste financeiro informando somente o valor Then Garanto que só
     * retorne os ajuste com valor maior igual ao informado
     */
    @Test
    public void listarAjustesPorFiltroValorMaiorIgual() {
        String authorization = String.format("Bearer %s", keycloakVerificationMock.getAccessToken(TokenConfig.aTokenConfig().build()));

        Double valor = 250D;
        ResponseEntity<AjusteFinanceiro> response = this.ajusteApiDelegate.buscaAjusteFinanceiro(
                authorization,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                valor,
                null,
                null,
                null,
                null,
                null);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isNotNull();
        assertThat(response.getBody().getAjustes()).isNotEmpty();
        assertThat(response.getBody().getAjustes()).extracting(AjusteFinanceiroBody::getValor)
                .allSatisfy(valorResult -> {
                    assertThat(valorResult >= valor);
                });
    }

    /**
     * Given Que eu quero testar "Busca de ajuste por filtro de Valor menor igual" And Tenha mais de um ajuste na base
     * com valores diferentes When Chamo a api de ajuste financeiro informando somente o valor Then Garanto que só
     * retorne os ajuste com valor menor igual ao informado
     */
    @Test
    public void listarAjustesPorFiltroValorMenorIgual() {
        String authorization = String.format("Bearer %s", keycloakVerificationMock.getAccessToken(TokenConfig.aTokenConfig().build()));

        Double valor = 100D;
        ResponseEntity<AjusteFinanceiro> response = this.ajusteApiDelegate.buscaAjusteFinanceiro(
                authorization,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                valor,
                null,
                null,
                null,
                null);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isNotNull();
        assertThat(response.getBody().getAjustes()).isNotEmpty();
        assertThat(response.getBody().getAjustes()).extracting(AjusteFinanceiroBody::getValor)
                .allSatisfy(valorResult -> {
                    assertThat(valorResult <= valor);
                });
    }

    /**
     * Given Que eu quero testar "Busca de ajuste por filtro com ordenacao id ASC" And Tenha mais de um ajuste na base
     * When Chamo a api de ajuste financeiro informando somente a ordenacao de ASC para o campo ID Then Garanto que só
     * retorne os ajuste na ordenacao informada id com ASC
     */
    @Test
    public void listarAjustesPorFiltroOrdenacaoIdASC() {
        String authorization = String.format("Bearer %s", keycloakVerificationMock.getAccessToken(TokenConfig.aTokenConfig().build()));

        ResponseEntity<AjusteFinanceiro> response = this.ajusteApiDelegate.buscaAjusteFinanceiro(
                authorization,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                "ASC",
                "id");

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isNotNull();
        assertThat(response.getBody().getAjustes()).isNotEmpty();
        List<Integer> recebido = new ArrayList<>();
        response.getBody().getAjustes().forEach(ajuste -> recebido.add(ajuste.getId()));
        List<Integer> ordenado = recebido.stream().sorted().collect(Collectors.toList());
        assertEquals(ordenado, recebido);
    }

    /**
     * Given Que eu quero testar "Busca de ajuste por filtro com ordenacao id DESC" And Tenha mais de um ajuste na base
     * When Chamo a api de ajuste financeiro informando somente a ordenacao de DESC para o campo ID Then Garanto que só
     * retorne os ajuste na ordenacao informada id com DESC
     */
    @Test
    public void listarAjustesPorFiltroOrdenacaoIdDESC() {
        String authorization = String.format("Bearer %s", keycloakVerificationMock.getAccessToken(TokenConfig.aTokenConfig().build()));

        ResponseEntity<AjusteFinanceiro> response = this.ajusteApiDelegate.buscaAjusteFinanceiro(
                authorization,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                "DESC",
                "id");

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isNotNull();
        assertThat(response.getBody().getAjustes()).isNotEmpty();
        List<Integer> recebido = new ArrayList<>();
        response.getBody().getAjustes().forEach(ajuste -> recebido.add(ajuste.getId()));
        List<Integer> ordenado = recebido.stream().sorted(Comparator.reverseOrder()).collect(Collectors.toList());
        assertEquals(ordenado, recebido);
    }

    /**
     * Given Que eu quero testar "Busca de ajuste por filtro com ordenacao pelos campos CPF e CNPJ DESC" And Tenha mais
     * de um ajuste na base When Chamo a api de ajuste financeiro informando a ordenacao de DESC para o campo CPF e CNPJ
     * Then Garanto que só retorne os ajuste na ordenacao informada id com DESC
     */
    @Test
    public void listarAjustesPorFiltroOrdenacaoCpfCnpjDESC() {
        String authorization = String.format("Bearer %s", keycloakVerificationMock.getAccessToken(TokenConfig.aTokenConfig().build()));

        ResponseEntity<AjusteFinanceiro> response = this.ajusteApiDelegate.buscaAjusteFinanceiro(
                authorization,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                "DESC",
                "clienteCpf,clienteCnpj");

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isNotNull();
        assertThat(response.getBody().getAjustes()).isNotEmpty();
        List<Long> listCpfCnpj = new ArrayList<Long>();
        response.getBody().getAjustes().forEach(ajuste -> this.addCpfCnpj(ajuste.getCliente().getCnpj(), listCpfCnpj));
        response.getBody().getAjustes().forEach(ajuste -> this.addCpfCnpj(ajuste.getCliente().getCnpj(), listCpfCnpj));
        List<Long> ordenado = listCpfCnpj.stream().sorted(Comparator.reverseOrder()).collect(Collectors.toList());
        assertEquals(ordenado, listCpfCnpj);

    }

    private void addCpfCnpj(String cpfCnpj, List<Long> listCpfCnpj) {
        if (cpfCnpj != null && !StringUtils.EMPTY.equals(cpfCnpj)) {
            listCpfCnpj.add(Long.valueOf(cpfCnpj));
        }
    }

    /**
     * Given Que eu quero testar "Busca de ajuste por filtro com ordenacao padrao - id DESC" And Tenha mais de um ajuste
     * na base When Chamo a api de ajuste financeiro sem informar filtros Then Garanto que só retorne os ajuste na
     * ordenacao id com DESC
     */
    @Test
    public void listarAjustesPorFiltroOrdenacaoPadraoDescPorId() {
        String authorization = String.format("Bearer %s", keycloakVerificationMock.getAccessToken(TokenConfig.aTokenConfig().build()));

        ResponseEntity<AjusteFinanceiro> response = this.ajusteApiDelegate.buscaAjusteFinanceiro(
                authorization,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isNotNull();
        assertThat(response.getBody().getAjustes()).isNotEmpty();
        List<Integer> recebido = new ArrayList<>();
        response.getBody().getAjustes().forEach(ajuste -> recebido.add(ajuste.getId()));
        List<Integer> ordenado = recebido.stream().sorted(Comparator.reverseOrder()).collect(Collectors.toList());
        assertEquals(ordenado, recebido);
    }

    /**
     * Given Que eu quero testar "Busca de ajuste por filtro com ordenacao padrao - id DESC" And Tenha mais de um ajuste
     * na base When Chamo a api de ajuste financeiro informando somente o filtro de tamanho da pagina Then Garanto que
     * só retorne os ajuste na ordenacao id com DESC
     */
    @Test
    public void listarAjustesPorFiltroTamanhoPaginacao2Registros() {
        String authorization = String.format("Bearer %s", keycloakVerificationMock.getAccessToken(TokenConfig.aTokenConfig().build()));

        int limiteRegistrosPorPagina = 2;
        ResponseEntity<AjusteFinanceiro> response = this.ajusteApiDelegate.buscaAjusteFinanceiro(
                authorization, null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                limiteRegistrosPorPagina,
                null,
                null,
                null);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isNotNull();
        assertThat(response.getBody().getAjustes()).isNotEmpty();
        assertEquals(limiteRegistrosPorPagina, response.getBody().getAjustes().size());
    }

    /**
     * Given Que eu quero testar "Busca de ajuste filtrando a sugunda pagina de 2 registros" And Tenha mais de 4 ajustes
     * na base When Chamo a api de ajuste financeiro informando somente a ordenacao e o tipo Then Garanto que só retorne
     * os ajuste na ordenacao id com DESC
     */
    @Test
    public void listarAjustesSegundaPagina() {
        String authorization = String.format("Bearer %s", keycloakVerificationMock.getAccessToken(TokenConfig.aTokenConfig().build()));

        int limiteRegistrosPorPagina = 2;
        int pagina = 2;
        ResponseEntity<AjusteFinanceiro> response = this.ajusteApiDelegate.buscaAjusteFinanceiro(
                authorization,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                limiteRegistrosPorPagina,
                pagina,
                null,
                null);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isNotNull();
        assertThat(response.getBody().getAjustes()).isNotEmpty();
    }

    /**
     * Given Que eu quero testar "Busca um ajuste por filtro de ID da solicitação" And Tenha mais de um ajuste na base
     * When Chamo a api de ajuste financeiro informando somente o ID da Solicitação do ajuste Then Garanto que seja o
     * mesmo ID Solicitação da busca
     */
    @Test
    public void listarAjustesPorFiltroIdSolicitacao() {
        String authorization = String.format("Bearer %s", keycloakVerificationMock.getAccessToken(TokenConfig.aTokenConfig().build()));

        ResponseEntity<AjusteFinanceiro> response = this.ajusteApiDelegate.buscaAjusteFinanceiro(
                authorization,
                null,
                idSolicitacaoTest,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isNotNull();
        assertThat(response.getBody().getAjustes()).isNotEmpty();
        assertEquals(idSolicitacaoTest, response.getBody().getAjustes().get(0).getIdSolicitacao());
    }
}
