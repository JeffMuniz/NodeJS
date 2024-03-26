package br.com.mac.api.ctb.transacao.validator

import javax.validation.ConstraintValidator
import javax.validation.ConstraintValidatorContext

class ValidPontoDeControleValidator : ConstraintValidator<ValidPontoDeControle, String> {

    private lateinit var annotation: ValidPontoDeControle

    override fun initialize(annotation: ValidPontoDeControle) {
        this.annotation = annotation
    }

    override fun isValid(valueForValidation: String, context: ConstraintValidatorContext?): Boolean {

        return this.annotation.enumClass.java.enumConstants.any { it.name ==  valueForValidation.toUpperCase() }
    }
}
