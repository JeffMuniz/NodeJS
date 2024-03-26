package br.com.mac.reports.client;

import br.com.mac.reports.client.model.DocumentoResponse;
import org.eclipse.microprofile.rest.client.inject.RegisterRestClient;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

@RegisterRestClient
@Path("documentos")
public interface DocumentosS3Client {

    @GET
    @Consumes(MediaType.APPLICATION_JSON)
    DocumentoResponse obterDocumentoS3(@QueryParam("bucket") String bucket, @QueryParam("chave") String chave);
}
