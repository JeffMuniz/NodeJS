package br.com.mac.api.ajuste.financeiro.web.api.error;

import static java.text.MessageFormat.format;

import java.text.MessageFormat;
import java.util.Collections;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import br.com.mac.api.ajuste.financeiro.exception.BadRequestException;
import br.com.mac.api.ajuste.financeiro.exception.InternalServerErrorException;
import br.com.mac.api.ajuste.financeiro.exception.NotFoundException;
import br.com.mac.api.ajuste.financeiro.exception.NotImplementedException;
import br.com.mac.api.ajuste.financeiro.web.api.model.ApiErro;
import br.com.mac.api.ajuste.financeiro.web.api.model.Erro;
import lombok.NonNull;

@RestControllerAdvice
public class HandleError {

    @ExceptionHandler({InternalServerErrorException.class, DataIntegrityViolationException.class})
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ResponseBody
    public ApiErro exception(@NonNull final Exception ex) {
        return new ApiErro()
                .mensagem(format("Erro interno do servidor"))
                .erros(Collections.singletonList(
                        new Erro()
                                .codigo("ERR-0001")
                                .mensagem("Foi encontrado um erro ao processar sua solicitação")));
    }

    @ExceptionHandler(NotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ResponseBody
    public ApiErro exception(@NonNull final NotFoundException ex) {
        return new ApiErro()
                .mensagem("Não encontrado")
                .erros(Collections.singletonList(
                        new Erro()
                                .codigo("ERR-0004")
                                .mensagem(MessageFormat.format("{0} não encontrado", ex.getParameters()))));
    }

    @ExceptionHandler(NumberFormatException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    public ApiErro exception(@NonNull final NumberFormatException ex) {
        return new ApiErro()
                .mensagem("Request inválido")
                .erros(Collections.singletonList(
                        new Erro()
                                .codigo("ERR-0007")
                                .mensagem(MessageFormat
                                        .format("Valor {0} deve ser numérico",
                                                ex.getMessage().split(":")[1]
                                                        .replace("\"", "")
                                                        .trim()))));
    }

    @ExceptionHandler(NotImplementedException.class)
    @ResponseStatus(HttpStatus.NOT_IMPLEMENTED)
    @ResponseBody
    public ApiErro exception(@NonNull final NotImplementedException ex) {
        return new ApiErro()
                .mensagem("Não implementado")
                .erros(Collections.singletonList(
                        new Erro()
                                .codigo("ERR-0008")
                                .mensagem(MessageFormat.format("{0}", ex.getParameters()))));
    }
    
    @ExceptionHandler(BadRequestException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    public ApiErro exception(@NonNull final BadRequestException ex) {
        return new ApiErro()
                .mensagem("Request inválido")
                .erros(Collections.singletonList(
                        new Erro()
                                .codigo("ERR-0009")
                                .mensagem(MessageFormat.format("{0}", ex.getParameters()))));
    }
    
}
