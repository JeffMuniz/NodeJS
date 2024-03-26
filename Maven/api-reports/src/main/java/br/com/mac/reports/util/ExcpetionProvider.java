package br.com.mac.reports.util;

import br.com.mac.reports.entity.ApiErro;
import br.com.mac.reports.entity.Erro;

import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;
import java.util.ArrayList;
import java.util.List;

@Provider
public class ExcpetionProvider implements ExceptionMapper<ExcpetionHandler> {
    @Override
    public Response toResponse(ExcpetionHandler exception) {

        ApiErro apiErro = new ApiErro();
        apiErro.setMensagem( exception.getMessage());

        List<Erro> erros = new ArrayList<>();
        Erro erro = new Erro();
        erro.setMensagem(exception.toString());
        erro.setCodigo(400);
        erros.add(erro);
        apiErro.setErros(erros);

        return Response.status(Response.Status.BAD_REQUEST).entity(apiErro).build();
    }
}
