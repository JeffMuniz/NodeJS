package br.com.mac.autenticacao.exception;

public class NaoAutorizadoErroException extends BaseException {

  private static final long serialVersionUID = 3127320364860310210L;

  public NaoAutorizadoErroException(Object... parametros) {
    super(parametros);
  }
}
