package br.com.mac.reports.web.api.resource;

import br.com.mac.reports.client.model.DocumentoResponse;
import br.com.mac.reports.entity.RelatorioSolicitacao;
import br.com.mac.reports.enums.RelatorioSolicitacaoStatusEnum;
import br.com.mac.reports.service.RelatorioService;
import br.com.mac.reports.util.Constantes;
import br.com.mac.reports.util.ExcpetionHandler;
import org.apache.http.HttpStatus;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.UUID;

@Path(Constantes.PATH_SOLICITACAO)
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Tag(name = Constantes.TAG_RELATORIO_S3, description = Constantes.DESCRIPTION_RELATORIO_S3)
public class RelatorioSolicitacaoResource {

    @Inject
    RelatorioService relatorioService;

    @GET
    public DocumentoResponse carregarRelatorioS3(@QueryParam("chavePesquisa") UUID chavePesquisa) throws ExcpetionHandler {
        RelatorioSolicitacao solicitacaoRelatorio = RelatorioSolicitacao.findByChavePesquisa(chavePesquisa);
        if (solicitacaoRelatorio == null ) {
            throw new ExcpetionHandler("Chave Pesquisa não encontrada", new BadRequestException(
                    "Chave Pesquisa não encontrada"));
        }else if (solicitacaoRelatorio.getStatus().name().equals(RelatorioSolicitacaoStatusEnum.EM_PROCESSAMENTO.name())){
            throw new ExcpetionHandler("Relatório em processamento. Aguarde algumas horas e solicite novamente.", new BadRequestException(
                    "Relatório em processamento. Aguarde algumas horas e solicite novamente."));
        }else if (solicitacaoRelatorio.getStatus().name().equals(RelatorioSolicitacaoStatusEnum.ERRO.name())){
            throw new ExcpetionHandler("Erro ao gerar relatório.", new BadRequestException(
                    "Erro ao gerar relatório."));
        }
        return relatorioService.returnDocumentoS3(solicitacaoRelatorio);
    }

    @GET
    @Path("/externa/")
    public DocumentoResponse carregarRelatorioS3(@QueryParam("chaveExterna") String chaveExterna, @QueryParam("idRelatorio") UUID idRelatorio) throws ExcpetionHandler {
        RelatorioSolicitacao solicitacaoRelatorio = RelatorioSolicitacao.findByChaveExterna(chaveExterna, idRelatorio);
        if (solicitacaoRelatorio == null)
            throw new ExcpetionHandler("Chave Externa ou Id Relatorio não encontrado", new BadRequestException("Chave Externa ou Id Relatorio não encontrado"));
        return relatorioService.returnDocumentoS3(solicitacaoRelatorio);
    }
}
