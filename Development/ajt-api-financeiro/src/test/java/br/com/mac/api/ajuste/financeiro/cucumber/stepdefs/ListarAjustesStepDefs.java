package br.com.mac.api.ajuste.financeiro.cucumber.stepdefs;

import br.com.mac.api.ajuste.financeiro.cucumber.domain.FiltroAjustesTest;
import br.com.mac.api.ajuste.financeiro.factory.AjusteFinanceiroFactoryTest;
import br.com.mac.api.ajuste.financeiro.factory.ClienteFactoryTest;
import br.com.mac.api.ajuste.financeiro.persistence.AjusteFinanceiroEntity;
import br.com.mac.api.ajuste.financeiro.persistence.ClienteEntity;
import br.com.mac.api.ajuste.financeiro.repository.AjusteFinanceiroRepository;
import br.com.mac.api.ajuste.financeiro.repository.ClienteRepository;
import br.com.mac.api.ajuste.financeiro.web.api.model.AjusteFinanceiro;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.cucumber.java.pt.Dado;
import io.cucumber.java.pt.Então;
import io.cucumber.java.pt.Quando;
import io.restassured.response.Response;
import org.junit.jupiter.api.AfterAll;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.IOException;
import java.util.*;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.fail;
import static org.junit.Assert.assertTrue;
import static org.springframework.http.HttpStatus.OK;

public class ListarAjustesStepDefs extends StepDefs {

    private final Logger logger = LoggerFactory.getLogger(ListarAjustesStepDefs.class);

    @Autowired
    private AjusteFinanceiroRepository ajusteFinanceiroRepo;

    @Autowired
    private ClienteRepository clienteRepo;

    private List<AjusteFinanceiroEntity> listaAjuste = new ArrayList<AjusteFinanceiroEntity>();
    private final Map<String, String> queryParams = new HashMap<String, String>();

	@Dado("os ajustes com os seguintes ajustes")
	public void os_ajustes_com_os_seguintes_atributos(io.cucumber.datatable.DataTable dataTable) {
        testContext().reset();
        this.setuUp();
	}

	@Quando("o ajuste exista")
	public void o_ajuste_existe_pelo_filtro() {
		this.listaAjuste.forEach(ajuste -> assertThat(this.ajusteFinanceiroRepo.findById(
				ajuste.getId())).isNotNull());
	}

	@Dado("os seguintes atributos")
	public void os_seguintes_atributos(io.cucumber.datatable.DataTable dataTable) {
		this.queryParams.clear();
		List<FiltroAjustesTest> filtros = dataTable.asList(FiltroAjustesTest.class);
		FiltroAjustesTest filtro = filtros.get(0);
		this.queryParams.put(filtro.getCampo(), filtro.getValor());
	}

	@Quando("o usuário realizar a busca{string} para o ajuste")
	public void o_usuário_realizar_a_busca_para_o_ajuste(String string) {
        String getUrl = "/v1/ajustes/financeiros";
        executeGet(getUrl, "xxx", null, this.queryParams);
	}

	@Então("retornará {string}")
	public void retornará(String expectedResult) {
        Response response = testContext().getResponse();
        AjusteFinanceiro ajusteResponse = this.converterResponse(response);

        switch (expectedResult) {
            case "SUCESSO":
                assertThat(response.statusCode()).isEqualTo(OK.value());
                assertTrue(!ajusteResponse.getAjustes().isEmpty());
                break;
            case "VAZIO":
                assertThat(response.statusCode()).isEqualTo(OK.value());
                assertTrue(ajusteResponse.getAjustes().isEmpty());
                break;
            default:
                fail("ERROR");
        }
	}


    private void setuUp() {
    	this.cleanUp();
    	ClienteEntity clienteUmTipoCpf = this.clienteRepo.save(ClienteFactoryTest.clienteUmTipoCpf());
    	ClienteEntity clienteDoisTipoCpf = this.clienteRepo.save(ClienteFactoryTest.clienteDoisTipoCpf());
    	ClienteEntity clienteUmTipoCnpj = this.clienteRepo.save(ClienteFactoryTest.clienteUmTipoCnpj());

        this.listaAjuste = this.ajusteFinanceiroRepo.saveAll(Arrays.asList(
    			AjusteFinanceiroFactoryTest.ajusteEcCreditoPendente(clienteUmTipoCpf),
    	    	AjusteFinanceiroFactoryTest.ajustePortadorDebitoAprovado(clienteUmTipoCpf),
    	    	AjusteFinanceiroFactoryTest.ajusteRHCreditoPendente(clienteDoisTipoCpf),
    	    	AjusteFinanceiroFactoryTest.ajustePortadorCreditoRecusado(clienteDoisTipoCpf),
    	    	AjusteFinanceiroFactoryTest.ajustePortadorDebitoPendenteUm(clienteUmTipoCnpj),
    	    	AjusteFinanceiroFactoryTest.ajustePortadorDebitoPendenteDois(clienteUmTipoCnpj)
    	));
    }

    @AfterAll
    private void cleanUp() {
    	this.ajusteFinanceiroRepo.deleteAll();
    	this.clienteRepo.deleteAll();
    }

    private AjusteFinanceiro converterResponse(Response response) {
		try {
			return new ObjectMapper().readValue(response.getBody().asString(),
					 new TypeReference<AjusteFinanceiro>() {
		    });
		} catch (IOException e) {
			logger.error(e.getMessage(), e);
		}
		return null;
	}

}
