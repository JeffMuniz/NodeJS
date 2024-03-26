package br.com.mac.api.ajuste.financeiro.util;

import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;

import static org.springframework.http.MediaType.APPLICATION_JSON_UTF8_VALUE;

@Service
public class HeadersDefaultApi {

    String CONTENT_TYPE = "Content-Type";
    String ACCEPT = "Accept";

    @SuppressWarnings("deprecation")
	public HttpHeaders creatHeaders() {
        HttpHeaders header = new HttpHeaders();
        header.set(CONTENT_TYPE, APPLICATION_JSON_UTF8_VALUE);
        header.set(ACCEPT, APPLICATION_JSON_UTF8_VALUE);
        return header;
    }
}
