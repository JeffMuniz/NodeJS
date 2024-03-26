package br.com.mac.reports.web.api.resource;

import br.com.mac.reports.client.model.RelatorioRequest;
import br.com.mac.reports.entity.RelatorioSolicitacao;
import br.com.mac.reports.service.RelatorioService;
import br.com.mac.reports.util.Constantes;
import br.com.mac.reports.util.ExcpetionHandler;
import br.com.mac.reports.web.api.model.SolicitacaoRelatorioRequest;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.extern.slf4j.Slf4j;
import org.eclipse.microprofile.openapi.annotations.parameters.RequestBody;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;

import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.validation.Valid;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.UUID;

@Slf4j
@Path(Constantes.PATH_SOLICITACAO)
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Tag(name = Constantes.TAG_RELATORIO_PUBLISH, description = Constantes.DESCRIPTION_RELATORIO_PUBLISH)
public class RelatorioPublishResource {

    @Inject
    RelatorioService relatorioService;

    @POST
    @Transactional
    public RelatorioSolicitacao publish(@RequestBody @Valid SolicitacaoRelatorioRequest solicitacaoRelatorioRequest) throws ExcpetionHandler, JsonProcessingException {
        return relatorioService.tratarPublish(solicitacaoRelatorioRequest);
    }

    @POST
    @Path("/{chavePesquisa}")
    public void concluirSolicitacao(@RequestBody RelatorioRequest relatorioRequest,@PathParam("chavePesquisa") UUID chavePesquisa) throws ExcpetionHandler {
        this.relatorioService.atualizaDocumento(
                chavePesquisa,
               relatorioRequest);
    }
}
