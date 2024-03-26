package br.com.machina.estautoecapi.port;

import br.com.machina.adapter.rest.MachinaRestAdapter;
import br.com.machina.adapter.rest.model.RequestModel;
import br.com.machina.adapter.rest.model.RequestModel.Builder;
import br.com.machina.adapter.rest.model.ResponseModel;
import br.com.machina.customexception.exception.BadRequestCustom;
import br.com.machina.estautoecapi.bean.TokenRequest;
import br.com.machina.estautoecapi.bean.TokenUpdate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;

import javax.annotation.Resource;

@Service
public class TokenPierRest {

    private String PATH_PIER_NOTIFICACOES_SMS = "/notificacoes-sms";

    private String PATH_PIER_CODIGOS_SEGURANCA_ENVIAR = PATH_PIER_NOTIFICACOES_SMS + "/gerar-codigo-seguranca";

    private String PATH_PIER_CODIGOS_SEGURANCA_VALIDAR = PATH_PIER_NOTIFICACOES_SMS + "/validar-codigo-seguranca";

    private String PATH_PIER_CODIGOS_SEGURANCA_REENVIAR = PATH_PIER_NOTIFICACOES_SMS + "/reenviar-codigo-seguranca";

    @Value("${app.pier.url}")
    private String pierBasePath;

    @Resource(name = "machina.default.rest.adapter")
    private MachinaRestAdapter restTemplate;

    @Autowired
    private HeadersDefaultPier headersPier;

    public HttpStatus validarToken(final TokenUpdate tokenSMSUpdate) {

        RequestModel<?> requestModel = new Builder()
                .configBody(tokenSMSUpdate)
                .configUrl(pierBasePath + PATH_PIER_CODIGOS_SEGURANCA_VALIDAR)
                .configHttpHeaders(headersPier.createHeaders())
                .build();
        try {
            ResponseModel<?> responseModel = restTemplate.postRequest(requestModel);

            return responseModel.getStatusCode() == HttpStatus.OK.value()? HttpStatus.OK: HttpStatus.BAD_REQUEST;

        } catch (HttpClientErrorException e) {
            throw new BadRequestCustom(e.getResponseBodyAsString());
        }
    }

    public HttpStatus gerarToken(final TokenRequest tokenSMSRequest) {

         RequestModel<?> requestModel = new Builder()
                 .configBody(tokenSMSRequest)
                 .configUrl(pierBasePath + PATH_PIER_CODIGOS_SEGURANCA_ENVIAR)
                 .configHttpHeaders(headersPier.createHeaders())
                 .build();
         try {
             ResponseModel<?> responseModel = restTemplate.postRequest(requestModel);

             return responseModel.getStatusCode() == HttpStatus.OK.value()? HttpStatus.OK: HttpStatus.BAD_REQUEST;

         } catch (HttpClientErrorException e) {
              throw new BadRequestCustom(e.getResponseBodyAsString());
         }
    }
}
