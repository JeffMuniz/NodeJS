package br.com.mac.api.ajuste.financeiro.exception;

import static org.springframework.http.HttpStatus.NOT_IMPLEMENTED;

public class NotImplementedException extends BaseException {

    private static final long serialVersionUID = 5055607301027693550L;

    public NotImplementedException(final String message) {
        super(NOT_IMPLEMENTED, message);
    }

}
