package br.com.mac.reports.service;

import br.com.mac.reports.entity.Relatorio;
import br.com.mac.reports.entity.RelatorioSolicitacao;
import br.com.mac.reports.enums.RelatorioSolicitacaoStatusEnum;
import br.com.mac.reports.mq.publish.RabbitMQPublish;
import br.com.mac.reports.util.ExcpetionHandler;
import br.com.mac.reports.web.api.model.SolicitacaoRelatorioRequest;
import com.fasterxml.jackson.core.JsonProcessingException;
import io.quarkus.hibernate.orm.panache.PanacheQuery;
import io.quarkus.test.junit.QuarkusTest;
import io.quarkus.test.junit.mockito.InjectMock;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;

import javax.inject.Inject;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.UUID;

@QuarkusTest
public class RelatorioServiceTest {

    @Inject
    RelatorioService relatorioService;

    @InjectMock
    RabbitMQPublish rabbitMQPublish;


    /*@InjectMock
    DocumentosS3Client documentosS3Client;*/

    private RelatorioSolicitacao relatorioSolicitacao = new RelatorioSolicitacao();

    private SolicitacaoRelatorioRequest solicitacaoRelatorioRequest = new SolicitacaoRelatorioRequest();

    @BeforeEach
    public void setup() {
        HashMap<String, String> dadosSolicitacao = new HashMap<>();
        dadosSolicitacao.put("Id_Cargamaceficio", "334421");
        solicitacaoRelatorioRequest = SolicitacaoRelatorioRequest.builder()
                .sincrono(true)
                .usuario("vitor")
                .email("vitor@mac.com.br")
                .idRelatorio(UUID.fromString("b7f1e3b4-4d50-4dd5-9f1e-e2933a703793"))
                .chaveExterna("5bdab8d3-12c7-4ad5-922b-41145d733fc6")
                .dadosSolicitacao(dadosSolicitacao)
                .build();
        relatorioSolicitacao = RelatorioSolicitacao.builder()
                .chaveExterna("5bdab8d3-12c7-4ad5-922b-41145d733fc6")
                .dataSolicitacao(LocalDateTime.now())
                .usuario("vitor")
                .dadosSolicitacao("{\"Id_Cargamaceficio\":\"334421\"}")
                .email("vitor@mac.com.br")
                .idRelatorio(Relatorio.builder()
                        .id(UUID.fromString("b7f1e3b4-4d50-4dd5-9f1e-e2933a703793"))
                        .build())
                .chavePesquisa(UUID.fromString("5bdab8d3-12c7-4ad5-922b-41145d733fc6"))
                .idChaveS3("0fcacc7b4ca0f9f0499c110dff067baa")
                .status(RelatorioSolicitacaoStatusEnum.EM_PROCESSAMENTO)
                .build();

        PanacheQuery query = Mockito.mock(PanacheQuery.class);
        Mockito.when(query.page(Mockito.any())).thenReturn(query);
        Mockito.when(query.firstResult()).thenReturn(relatorioSolicitacao);


    }

    @Test
    public void tratarPublishTest() throws ExcpetionHandler, JsonProcessingException {
        var relatorioSolicitacaoResponse = relatorioService.tratarPublish(solicitacaoRelatorioRequest);
        Assertions.assertEquals(relatorioSolicitacaoResponse.getChaveExterna(), relatorioSolicitacao.getChaveExterna());
    }

    @Test
    public void tratarPublishTestNull() throws ExcpetionHandler, JsonProcessingException {
        try {
            relatorioService.tratarPublish(new SolicitacaoRelatorioRequest());
        }catch (Exception e){
            Assertions.assertEquals("ID de Relatorio não encontrado", e.getMessage());
        }
    }

    @Test
    public void tratarPublishConcluidoTest() throws ExcpetionHandler, JsonProcessingException {

        HashMap<String, String> dadosSolicitacao = new HashMap<>();
        dadosSolicitacao.put("Id_Cargamaceficio", "334421");

        try {
            relatorioService.tratarPublish(SolicitacaoRelatorioRequest.builder()
                    .sincrono(true)
                    .usuario("vitor")
                    .email("vitor@mac.com.br")
                    .idRelatorio(UUID.fromString("b7f1e3b4-4d50-4dd5-9f1e-e2933a703793"))
                    .chaveExterna("6632740c-fe43-460b-98e4-20efc4320acc")
                    .dadosSolicitacao(dadosSolicitacao)
                    .build());
        }catch (Exception e){
            Assertions.assertEquals("Este relatório não pode ser reprocessado porque o status já esta como concluido.", e.getMessage());
        }
    }


    @Test
    public void tratarPublishConcluidoSemChaveS3Test() throws ExcpetionHandler, JsonProcessingException {

        HashMap<String, String> dadosSolicitacao = new HashMap<>();
        dadosSolicitacao.put("Id_Cargamaceficio", "334421");

   var retorno =     relatorioService.tratarPublish(SolicitacaoRelatorioRequest.builder()
                .sincrono(true)
                .usuario("vitor")
                .email("vitor@mac.com.br")
                .idRelatorio(UUID.fromString("b7f1e3b4-4d50-4dd5-9f1e-e2933a703793"))
                .chaveExterna("723359af-b75a-4fce-b08e-06f36e381ba0")
                .dadosSolicitacao(dadosSolicitacao)
                .build());

        Assertions.assertEquals("723359af-b75a-4fce-b08e-06f36e381ba0", retorno.getChaveExterna());
    }

    @Test
    public void tratarPublishNotPresentTest() throws ExcpetionHandler, JsonProcessingException {

        HashMap<String, String> dadosSolicitacao = new HashMap<>();
        dadosSolicitacao.put("Id_Cargamaceficio", "334421");


       try {
           relatorioService.tratarPublish(SolicitacaoRelatorioRequest.builder()
                   .sincrono(true)
                   .usuario("vitor")
                   .email("vitor@mac.com.br")
                   .idRelatorio(UUID.fromString("b7f1e3b4-4d50-4dd5-9f1e-e2933a703793"))
                   .chaveExterna("094b0de5-c9b3-42a6-be95-e6f2979c0054")
                   .dadosSolicitacao(dadosSolicitacao)
                   .build());
       }catch (Exception e){
           Assertions.assertEquals(null, e.getMessage());
       }
    }

    @Test
    public void tratarPublishQueueTest() throws ExcpetionHandler, JsonProcessingException {

        HashMap<String, String> dadosSolicitacao = new HashMap<>();
        dadosSolicitacao.put("Id_Cargamaceficio", "334421");

        var retorno =     relatorioService.tratarPublish(SolicitacaoRelatorioRequest.builder()
                .sincrono(true)
                .usuario("vitor")
                .email("vitor@mac.com.br")
                .idRelatorio(UUID.fromString("b7f1e3b4-4d50-4dd5-9f1e-e2933a703793"))
                .chaveExterna("84d16721-6cc0-4eb2-b7c7-aa1f8e5329bb")
                .dadosSolicitacao(dadosSolicitacao)
                .build());

        Assertions.assertEquals("84d16721-6cc0-4eb2-b7c7-aa1f8e5329bb", retorno.getChaveExterna());
    }

    @Test
    public void tratarPublishQueueErroTest() throws ExcpetionHandler, JsonProcessingException {

        HashMap<String, String> dadosSolicitacao = new HashMap<>();
        dadosSolicitacao.put("Id_Cargamaceficio", "334421");

        var retorno =     relatorioService.tratarPublish(SolicitacaoRelatorioRequest.builder()
                .sincrono(true)
                .usuario("vitor")
                .email("vitor@mac.com.br")
                .idRelatorio(UUID.fromString("b7f1e3b4-4d50-4dd5-9f1e-e2933a703793"))
                .chaveExterna("569d9756-9498-4176-b42b-76ee8f91a546")
                .dadosSolicitacao(dadosSolicitacao)
                .build());

        Assertions.assertEquals("569d9756-9498-4176-b42b-76ee8f91a546", retorno.getChaveExterna());
    }

}
