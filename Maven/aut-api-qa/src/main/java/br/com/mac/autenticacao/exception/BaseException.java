package br.com.mac.autenticacao.exception;

public class BaseException extends RuntimeException {

  private static final long serialVersionUID = -5949810461065240217L;

  private final transient Object[] parametros;

  BaseException(final Object... parametros) {
    this.parametros = new Object[] {parametros};
  }

  public Object[] getParametros() {
    return this.parametros.clone();
  }

}
