package br.com.mac.api.ajuste.financeiro.exception;

public class InternalServerErrorException extends BaseException {

    private static final long serialVersionUID = -3768111656794833601L;

    public InternalServerErrorException(Object... parameters) {
        super(parameters);
    }
}
