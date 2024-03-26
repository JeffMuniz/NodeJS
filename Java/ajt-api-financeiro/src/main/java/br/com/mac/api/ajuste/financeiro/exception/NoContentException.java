package br.com.mac.api.ajuste.financeiro.exception;

import static org.springframework.http.HttpStatus.NO_CONTENT;

public class NoContentException extends BaseException {

     private static final long serialVersionUID = -6913675134084073195L;

     public NoContentException(final String message) {
		super(NO_CONTENT, message);

	}

}
