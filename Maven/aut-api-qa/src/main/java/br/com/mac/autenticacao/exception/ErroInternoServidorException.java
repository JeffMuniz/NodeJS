package br.com.mac.autenticacao.exception;

public class ErroInternoServidorException extends BaseException {

  private static final long serialVersionUID = -3768111656794833601L;

  public ErroInternoServidorException(Object... parametros) {
    super(parametros);
  }
}
