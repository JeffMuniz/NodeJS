package br.com.machina.estautoecapi.port;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;

import static org.springframework.http.MediaType.APPLICATION_JSON_UTF8_VALUE;

@Service
public class HeadersDefaultPier {

    private static final String ACCESS_TOKEN = "access_token";

    private static final String CONTENT_TYPE = "Content-Type";

    private static final String ACCEPT = "Accept";

    @Value("${app.pier.accessToken}")
    private String accessToken;

    public HttpHeaders createHeaders() {
        HttpHeaders header = new HttpHeaders();
        header.set(ACCESS_TOKEN, accessToken);
        header.set(CONTENT_TYPE, APPLICATION_JSON_UTF8_VALUE);
        header.set(ACCEPT, APPLICATION_JSON_UTF8_VALUE);
        return header;
    }
}
