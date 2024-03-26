package br.com.mac.reports.web.api.resource;

import br.com.mac.reports.config.PostgreSQLTestResource;
import br.com.mac.reports.entity.Relatorio;
import io.quarkus.test.common.QuarkusTestResource;
import io.quarkus.test.junit.QuarkusTest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;

@QuarkusTest
@QuarkusTestResource(PostgreSQLTestResource.class)
public class RelatorioResourceTest {

    private Relatorio relatorio = new Relatorio();

    @BeforeEach
    public void setup() {
        relatorio = Relatorio.builder()
                .descricao("5bdab8d3-12c7-4ad5-922b-41145d733fc6")
                .diasExpurgo(365)
                .nomeRelatorio("RELATORIO_CARGA")
                .formatoArquivo("PDF")
                .idJasper("0dc823009fa7a040291636a83cc6b0d8")
                .tipoCallback("ASSINCRONO")
                .tipoDados("QUERY")
                .versao("1.0")
                .build();
    }

    @Test
    public void cadastrarRelatorioTest() {

        given().when()
                .contentType("application/json")
                .body(relatorio)
                .post("/report")
                .then().statusCode(200)
                .body("nomeRelatorio", equalTo(relatorio.getNomeRelatorio()));

    }

}
