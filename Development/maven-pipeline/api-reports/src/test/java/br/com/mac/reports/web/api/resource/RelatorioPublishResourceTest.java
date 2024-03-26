package br.com.mac.reports.web.api.resource;

import br.com.mac.reports.client.model.RelatorioRequest;
import br.com.mac.reports.config.PostgreSQLTestResource;
import br.com.mac.reports.entity.Relatorio;
import br.com.mac.reports.entity.RelatorioSolicitacao;
import br.com.mac.reports.enums.RelatorioSolicitacaoStatusEnum;
import br.com.mac.reports.service.RelatorioService;
import br.com.mac.reports.web.api.model.SolicitacaoRelatorioRequest;
import io.quarkus.test.common.QuarkusTestResource;
import io.quarkus.test.junit.QuarkusTest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import javax.inject.Inject;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.UUID;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;

@QuarkusTest
@QuarkusTestResource(PostgreSQLTestResource.class)
public class RelatorioPublishResourceTest {

    @Inject
    RelatorioService relatorioService;
    private SolicitacaoRelatorioRequest solicitacaoRelatorioRequest = new SolicitacaoRelatorioRequest();
    private RelatorioSolicitacao relatorioSolicitacao = new RelatorioSolicitacao();
    private final RelatorioRequest relatorioConcluidoRequest = new RelatorioRequest();

    @BeforeEach
    public void setup() {
        HashMap<String, String> dadosSolicitacao = new HashMap<>();
        dadosSolicitacao.put("Id_Relatorio", "34441");
        solicitacaoRelatorioRequest = SolicitacaoRelatorioRequest.builder()
                .chaveExterna("5bdab8d3-12c7-4ad5-922b-41145d733fc6")
                .dadosSolicitacao(dadosSolicitacao)
                .idRelatorio(UUID.fromString("b7f1e3b4-4d50-4dd5-9f1e-e2933a703793"))
                .email("vitor@mac.com.br")
                .usuario("vitor")
                .sincrono(true)
                .build();
        relatorioSolicitacao = RelatorioSolicitacao.builder()
                .chaveExterna("5bdab8d3-12c7-4ad5-922b-41145d733fc6")
                .dataSolicitacao(LocalDateTime.now())
                .usuario("felipe")
                .dadosSolicitacao("{\"Id_Relatorio\":\"34441\"}")
                .email("vitor@mac.com.br")
                .idRelatorio(Relatorio.builder()
                        .id(UUID.fromString("b7f1e3b4-4d50-4dd5-9f1e-e2933a703793"))
                        .build())
                .chavePesquisa(UUID.fromString("5bdab8d3-12c7-4ad5-922b-41145d733fc6"))
                .idChaveS3("0fcacc7b4ca0f9f0499c110dff067baa")
                .status(RelatorioSolicitacaoStatusEnum.CONCLUIDO)
                .build();
    }

    @Test
    public void publishTest() {

        given().when()
                .contentType("application/json")
                .body(solicitacaoRelatorioRequest)
                .post("/solicitacao")
                .then().statusCode(200)
                .body("chaveExterna", equalTo(relatorioSolicitacao.getChaveExterna()));
    }

    @Test
    public void conlcuirRelatorioTest() {

        RelatorioRequest relatorioConcluidoRequest = RelatorioRequest.builder()
                .idChaveS3("0fcacc7b4ca0f9f0499c110dff067baa")
                .statusRelatorio(RelatorioSolicitacaoStatusEnum.ERRO.name())
                .tempoGeracaoRel(90L).build();

        given().when()
                .contentType("application/json")
                .body(relatorioConcluidoRequest)
                .post("/solicitacao/5bdab8d3-12c7-4ad5-922b-41145d733fc6")
                .then().statusCode(204);
    }

    @Test
    public void conlcuirRelatorioComChaveInexistenteTest() {

        RelatorioRequest relatorioConcluidoRequest = RelatorioRequest.builder()
                .idChaveS3("0fcacc7b4ca0f9f0499c110dff067baa")
                .tempoGeracaoRel(90L).build();

        given().when()
                .contentType("application/json")
                .body(relatorioConcluidoRequest)
                .post("/solicitacao/67c0f099-86e2-404f-8193-5577c35174ef")
                .then().statusCode(400);
    }
}
