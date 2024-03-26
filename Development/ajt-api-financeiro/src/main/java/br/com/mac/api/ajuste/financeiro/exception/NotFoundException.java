package br.com.mac.api.ajuste.financeiro.exception;

public class NotFoundException extends BaseException {

    private static final long serialVersionUID = 5055607301027693550L;

    public NotFoundException(Object... parametros) {
        super(parametros);
    }

}
