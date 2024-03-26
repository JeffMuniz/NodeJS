package br.com.mac.autenticacao.config;

import br.com.mac.autenticacao.dto.MensagemErroDto;
import br.com.mac.autenticacao.dto.MensagemErroDto.Error;
import br.com.mac.autenticacao.exception.ErroInternoServidorException;
import br.com.mac.autenticacao.exception.NaoAutorizadoErroException;
import java.text.MessageFormat;
import java.util.Collections;
import lombok.NonNull;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class ControllerAdviceConfig {

  /**
   * Trata exceção para exibição em json.
   *
   * @param ex exceção gerada
   *
   * @return mensagem de erro
   */
  @ExceptionHandler(ErroInternoServidorException.class)
  @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
  @ResponseBody
  public MensagemErroDto exception(@NonNull final ErroInternoServidorException ex) {
    return MensagemErroDto.builder()
        .messagem("Erro interno do servidor")
        .erros(Collections.singletonList(Error.builder()
            .code("ERR-0001")
            .messagem("Foi encontrado um erro ao processar sua solicitação")
            .build()))
        .build();
  }

  /**
   * Trata exceção para exibição em json.
   *
   * @param ex exceção gerada
   *
   * @return mensagem de erro
   */
  @ExceptionHandler(NaoAutorizadoErroException.class)
  @ResponseStatus(HttpStatus.UNAUTHORIZED)
  @ResponseBody
  public MensagemErroDto exception(@NonNull final NaoAutorizadoErroException ex) {
    return MensagemErroDto.builder()
        .messagem("Não autorizado")
        .erros(Collections.singletonList(Error.builder()
            .code("ERR-0002")
            .messagem("Verifique se o token está correto")
            .build()))
        .build();
  }

  /**
   * Trata exceção para exibição em json.
   *
   * @param ex exceção gerada
   *
   * @return mensagem de erro
   */
  @ExceptionHandler(MissingServletRequestParameterException.class)
  @ResponseStatus(HttpStatus.BAD_REQUEST)
  @ResponseBody
  public MensagemErroDto exception(@NonNull final MissingServletRequestParameterException ex) {
    return MensagemErroDto.builder()
        .messagem("Requisição Inválida")
        .erros(Collections.singletonList(Error.builder()
            .code("ERR-0003")
            .messagem(MessageFormat.format("Campo {0} está ausente", ex.getParameterName()))
            .build()))
        .build();
  }

}
