package br.com.mac.api.ajuste.financeiro.exception;

public class BadRequestException extends BaseException {

	private static final long serialVersionUID = 1L;

	public BadRequestException(final String message) {
		super(message);
	}

}
