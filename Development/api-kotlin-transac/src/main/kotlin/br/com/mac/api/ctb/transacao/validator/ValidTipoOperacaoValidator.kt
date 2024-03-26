package br.com.mac.api.ctb.transacao.validator

import javax.validation.ConstraintValidator
import javax.validation.ConstraintValidatorContext

class ValidTipoOperacaoValidator : ConstraintValidator<ValidTipoOperacao, String> {

    private lateinit var annotation: ValidTipoOperacao

    override fun initialize(annotation: ValidTipoOperacao) {
        this.annotation = annotation
    }

    override fun isValid(valueForValidation: String, context: ConstraintValidatorContext?): Boolean {

        return this.annotation.enumClass.java.enumConstants.any { it.name ==  valueForValidation.toUpperCase() }
    }
}
