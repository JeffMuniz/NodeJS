package br.com.mac.api.ajuste.financeiro.exception;

import static org.springframework.http.HttpStatus.FORBIDDEN;

public class ForbiddenException extends BaseException {

	private static final long serialVersionUID = 5055607301027693550L;

	public ForbiddenException(final String message) {
		super(FORBIDDEN, message);

	}

}
