package br.com.mac.reports.service;

import br.com.mac.reports.client.DocumentosS3Client;
import br.com.mac.reports.client.model.DocumentoResponse;
import br.com.mac.reports.client.model.RelatorioRequest;
import br.com.mac.reports.entity.Relatorio;
import br.com.mac.reports.entity.RelatorioSolicitacao;
import br.com.mac.reports.enums.RelatorioSolicitacaoStatusEnum;
import br.com.mac.reports.mq.publish.RabbitMQPublish;
import br.com.mac.reports.util.ExcpetionHandler;
import br.com.mac.reports.web.api.model.SolicitacaoRelatorioRequest;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.base.Strings;
import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.eclipse.microprofile.rest.client.inject.RestClient;
import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.BadRequestException;
import java.time.LocalDateTime;
import java.util.UUID;

@ApplicationScoped
public class RelatorioService {

    @Inject
    RabbitMQPublish rabbitMQPublish;

    @RestClient
    @Inject
    DocumentosS3Client documentosS3Client;

    @ConfigProperty(name = "aws.s3.bucket")
    String bucketName;

    ObjectMapper objectMapper = new ObjectMapper();

    @Transactional
    public RelatorioSolicitacao tratarPublish(SolicitacaoRelatorioRequest solicitacaoRelatorioRequest) throws ExcpetionHandler, JsonProcessingException {

        RelatorioSolicitacao relatorioSolicitacao = new RelatorioSolicitacao();
        var byId = Relatorio.builder().build().findById(solicitacaoRelatorioRequest.getIdRelatorio());


        if (byId == null)
            throw new ExcpetionHandler("ID de Relatorio não encontrado", new BadRequestException("ID de Relatorio não encontrado"));

        RelatorioSolicitacao responseRelatorioSolicitacao = RelatorioSolicitacao.findByChavePesquisa(UUID.fromString(solicitacaoRelatorioRequest.getChaveExterna()));

        if (responseRelatorioSolicitacao.isPersistent() && responseRelatorioSolicitacao.getStatus().equals(RelatorioSolicitacaoStatusEnum.CONCLUIDO) && !Strings.isNullOrEmpty(responseRelatorioSolicitacao.getIdChaveS3())){

            throw new ExcpetionHandler("Este relatório não pode ser reprocessado porque o status já esta como concluido.", new BadRequestException("Erro ao gerar relatório."));
        }else
        if (responseRelatorioSolicitacao.getStatus().equals(RelatorioSolicitacaoStatusEnum.EM_PROCESSAMENTO)|| responseRelatorioSolicitacao.getStatus().equals(RelatorioSolicitacaoStatusEnum.ERRO)){
            rabbitMQPublish.createClientWithPublish(responseRelatorioSolicitacao);

            responseRelatorioSolicitacao.setStatus(RelatorioSolicitacaoStatusEnum.EM_PROCESSAMENTO);
            responseRelatorioSolicitacao.persist();
            return  responseRelatorioSolicitacao;
        }else {

            relatorioSolicitacao.setIdRelatorio(byId);
            relatorioSolicitacao.setDadosSolicitacao(objectMapper.writeValueAsString(solicitacaoRelatorioRequest.getDadosSolicitacao()));
            relatorioSolicitacao.setEmail(solicitacaoRelatorioRequest.getEmail());
            relatorioSolicitacao.setUsuario(solicitacaoRelatorioRequest.getUsuario());
            relatorioSolicitacao.setDataSolicitacao(LocalDateTime.now());
            relatorioSolicitacao.setStatus(RelatorioSolicitacaoStatusEnum.EM_PROCESSAMENTO);
            relatorioSolicitacao.setChaveExterna(solicitacaoRelatorioRequest.getChaveExterna());
            relatorioSolicitacao.persistAndFlush();
            rabbitMQPublish.createClientWithPublish(relatorioSolicitacao);

        }
        return relatorioSolicitacao;
    }

    public DocumentoResponse returnDocumentoS3(RelatorioSolicitacao solicitacaoRelatorio) {
        return documentosS3Client.obterDocumentoS3(bucketName, solicitacaoRelatorio.getIdChaveS3());
    }

    @Transactional
    public void atualizaDocumento(UUID chavePesquisa, RelatorioRequest relatorio) throws ExcpetionHandler {

        RelatorioSolicitacao relatorioSolicitacao = RelatorioSolicitacao.findByChavePesquisa(chavePesquisa);
        if (relatorioSolicitacao == null)
            throw new ExcpetionHandler("Relatorio nao encontrado", new BadRequestException("Relatorio nao encontrado"));

        relatorioSolicitacao.setIdChaveS3(relatorio.getIdChaveS3());
        relatorioSolicitacao.setStatus(RelatorioSolicitacaoStatusEnum.valueOf(relatorio.getStatusRelatorio().toUpperCase()));
        relatorioSolicitacao.setDataSolicitacao(LocalDateTime.now());
        relatorioSolicitacao.setTempoGeracaoRel(relatorio.getTempoGeracaoRel());

        relatorioSolicitacao.persist();
    }
}
