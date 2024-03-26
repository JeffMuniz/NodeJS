package br.com.mac.api.ctb.transacao.exception

import br.com.mac.api.ctb.transacao.constant.COLON
import br.com.mac.api.ctb.transacao.constant.INTERNAL_SERVER_ERROR_MESSAGE
import br.com.mac.api.ctb.transacao.constant.VALIDATION_FAIL_MESSAGE
import org.springframework.http.HttpHeaders
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.validation.BindException
import org.springframework.validation.FieldError
import org.springframework.web.bind.MissingServletRequestParameterException
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.context.request.WebRequest
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler
import javax.validation.ConstraintViolationException

@ControllerAdvice
class RestResponseEntityExceptionHandler : ResponseEntityExceptionHandler() {

    @ExceptionHandler(Exception::class)
    fun handleAllExceptions(ex: Exception, request: WebRequest?): ResponseEntity<Any?> {
        val errors = arrayListOf(Error(codigo = HttpStatus.INTERNAL_SERVER_ERROR.value(),
                mensagem = ex.localizedMessage))
        val errorResponse = ErrorResponse(INTERNAL_SERVER_ERROR_MESSAGE, errors)

        return ResponseEntity(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR)
    }

    @ExceptionHandler(DateInvalidFormatException::class)
    fun handleInclusionDateInvalidFormatException(ex: DateInvalidFormatException, request: WebRequest?):
            ResponseEntity<Any?> {
        val errors = arrayListOf(Error(codigo = HttpStatus.BAD_REQUEST.value(),
                mensagem = ex.localizedMessage))
        val errorResponse = ErrorResponse(VALIDATION_FAIL_MESSAGE, errors)
        return ResponseEntity(errorResponse, HttpStatus.BAD_REQUEST)
    }

    @ExceptionHandler(DateIsNullOrEmptyException::class)
    fun handleInclusionDateIsNullOrEmptyException(ex: DateIsNullOrEmptyException, request: WebRequest?):
            ResponseEntity<Any?> {

        val errors = arrayListOf(Error(codigo = HttpStatus.BAD_REQUEST.value(),
                mensagem = ex.localizedMessage))
        val errorResponse = ErrorResponse(VALIDATION_FAIL_MESSAGE, errors)
        return ResponseEntity(errorResponse, HttpStatus.BAD_REQUEST)
    }

    @ExceptionHandler(ConstraintViolationException::class)
    fun handleConstraintViolationException(ex: ConstraintViolationException, request: WebRequest?):
            ResponseEntity<Any?> {
        val errors = arrayListOf(Error(codigo = HttpStatus.BAD_REQUEST.value(),
                mensagem = ex.localizedMessage.run { this.substringAfter(COLON).trimStart() }))
        val errorResponse = ErrorResponse(VALIDATION_FAIL_MESSAGE, errors)
        return ResponseEntity(errorResponse, HttpStatus.BAD_REQUEST)
    }

    override fun handleBindException(ex: BindException, headers: HttpHeaders,
                                     status: HttpStatus, request: WebRequest): ResponseEntity<Any> {

        val errors = arrayListOf<Error>()

        for (error in ex.bindingResult.allErrors) {

            if (error is FieldError)
                errors.add(Error(codigo = HttpStatus.BAD_REQUEST.value(),
                        mensagem = error.defaultMessage?.let { it.substringAfter(COLON).trimStart() } ?: ex.message))
            else
                errors.add(Error(codigo = HttpStatus.BAD_REQUEST.value(),
                        mensagem = ex.message))
        }

        val errorResponse = ErrorResponse(VALIDATION_FAIL_MESSAGE, errors)

        return ResponseEntity(errorResponse, HttpStatus.BAD_REQUEST)
    }

    override fun handleMissingServletRequestParameter(ex: MissingServletRequestParameterException, headers: HttpHeaders,
                                                      status: HttpStatus, request: WebRequest): ResponseEntity<Any> {
        val name = ex.parameterName
        val errors = arrayListOf(Error(codigo = HttpStatus.BAD_REQUEST.value(),
                mensagem = "Parâmetro $name é obrigatório"))
        val errorResponse = ErrorResponse(VALIDATION_FAIL_MESSAGE, errors)

        return ResponseEntity(errorResponse, HttpStatus.BAD_REQUEST)
    }
}

