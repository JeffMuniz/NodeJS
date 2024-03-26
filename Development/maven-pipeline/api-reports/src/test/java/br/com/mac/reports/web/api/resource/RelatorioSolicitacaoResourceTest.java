package br.com.mac.reports.web.api.resource;

import br.com.mac.reports.client.model.DocumentoResponse;
import br.com.mac.reports.config.PostgreSQLTestResource;
import br.com.mac.reports.entity.Relatorio;
import br.com.mac.reports.entity.RelatorioSolicitacao;
import br.com.mac.reports.enums.RelatorioSolicitacaoStatusEnum;
import br.com.mac.reports.service.RelatorioService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.github.tomakehurst.wiremock.WireMockServer;
import io.quarkus.test.common.QuarkusTestResource;
import io.quarkus.test.junit.QuarkusTest;
import org.apache.commons.lang3.StringUtils;
import org.apache.http.HttpStatus;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import javax.inject.Inject;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.UUID;

import static com.github.tomakehurst.wiremock.client.WireMock.*;
import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;

@QuarkusTest
@QuarkusTestResource(PostgreSQLTestResource.class)
public class RelatorioSolicitacaoResourceTest {

    private final WireMockServer wireMockServer = new WireMockServer(9090);
    @Inject
    RelatorioService relatorioService;
    ObjectMapper objectMapper;
    private RelatorioSolicitacao relatorioSolicitacao = new RelatorioSolicitacao();
    private final DocumentoResponse documentoResponse = new DocumentoResponse("TempReport12604220128866836555.pdf", StringUtils.EMPTY);

    @BeforeEach
    public void setup() throws JsonProcessingException {
        objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());

        wireMockServer.start();
        wireMockServer.stubFor(
                get(urlPathMatching("/documentos"))
                        .willReturn(
                                aResponse()
                                        .withHeader("Content-Type", "application/json")
                                        .withStatus(HttpStatus.SC_OK)
                                        .withBody(objectMapper.writeValueAsString(documentoResponse))));

        relatorioSolicitacao = RelatorioSolicitacao.builder()
                .chaveExterna("5bdab8d3-12c7-4ad5-922b-41145d733fc6")
                .dataSolicitacao(LocalDateTime.now())
                .usuario("felipe")
                .dadosSolicitacao("{\"Id_Cargamaceficio\":\"334421\"}")
                .email("felipe@email.com")
                .idRelatorio(Relatorio.builder()
                        .id(UUID.fromString("b7f1e3b4-4d50-4dd5-9f1e-e2933a703793"))
                        .build())
                .chavePesquisa(UUID.fromString("5bdab8d3-12c7-4ad5-922b-41145d733fc6"))
                .idChaveS3("0fcacc7b4ca0f9f0499c110dff067baa")
                .status(RelatorioSolicitacaoStatusEnum.EM_PROCESSAMENTO)
                .build();

    }

    @AfterEach
    public void teadDown() {
        wireMockServer.stop();
    }


    @Test
    public void carregarRelatorioS3ChaveExternaTest() {

        HashMap<String, String> params = new HashMap<>();
        params.put("chaveExterna", relatorioSolicitacao.getChaveExterna());
        params.put("idRelatorio", relatorioSolicitacao.getIdRelatorio().getId().toString());
        given().when()
                .contentType("application/json")
                .queryParams(params)
                .get("/solicitacao/externa")
                .then().statusCode(200)
                .body("nomeArquivo", equalTo("TempReport12604220128866836555.pdf"));
    }

    @Test
    public void carregarRelatorioS3ChavePesquisaInexistenteTest() {

        given().when()
                .contentType("application/json")
                .queryParam("chavePesquisa", "5bdab8d3-12c7-4ad5-922b-41145")
                .get("/solicitacao")
                .then().statusCode(400);
    }

    @Test
    public void carregarRelatorioS3ChaveExternaInexistenteTest() {

        HashMap<String, String> params = new HashMap<>();
        params.put("chaveExterna", "Teststs");
        params.put("idRelatorio", "5bdab8d3-12c7-4ad5-922b-41145");
        given().when()
                .contentType("application/json")
                .queryParams(params)
                .get("/solicitacao/externa")
                .then().statusCode(400);
    }
}
