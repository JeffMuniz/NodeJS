package br.com.mac.api.ajuste.financeiro.exception;

import static org.springframework.http.HttpStatus.PRECONDITION_FAILED;

public class PreconditionException extends BaseException {

     private static final long serialVersionUID = 4878312470946750173L;

     public PreconditionException(final String message) {
          super(PRECONDITION_FAILED, message);
     }

}
