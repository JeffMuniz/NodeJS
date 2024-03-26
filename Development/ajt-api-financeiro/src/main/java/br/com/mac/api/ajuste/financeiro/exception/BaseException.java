package br.com.mac.api.ajuste.financeiro.exception;

import java.util.Arrays;

public class BaseException extends RuntimeException {

    private static final long serialVersionUID = 1645211301896803422L;

    private final transient Object[] parameters;

    BaseException(final Object... parameters) {
        super(Arrays.toString(parameters));
        this.parameters = parameters;
    }

    public Object[] getParameters() {
        return this.parameters.clone();
    }

}
