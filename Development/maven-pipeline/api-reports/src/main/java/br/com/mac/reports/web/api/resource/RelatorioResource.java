package br.com.mac.reports.web.api.resource;

import br.com.mac.reports.entity.Relatorio;
import br.com.mac.reports.util.Constantes;
import org.eclipse.microprofile.openapi.annotations.parameters.RequestBody;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;

import javax.transaction.Transactional;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path(Constantes.PATH_REPORT)
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Tag(name = Constantes.TAG_RELATORIO, description = Constantes.DESCRIPTION_RELATORIO)
public class RelatorioResource {

    @POST
    @Transactional
    public Relatorio cadastrarRelatorio(@RequestBody Relatorio relatorio) {
        relatorio.persistAndFlush();
        return relatorio;
    }
}
