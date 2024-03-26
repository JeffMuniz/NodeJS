package br.com.mac.api.ctb.transacao.validator

import javax.validation.ConstraintValidator
import javax.validation.ConstraintValidatorContext

class ValidTipoLedgerValidator : ConstraintValidator<ValidTipoLedger, String> {

    private lateinit var annotation: ValidTipoLedger

    override fun initialize(annotation: ValidTipoLedger) {
        this.annotation = annotation
    }

    override fun isValid(valueForValidation: String, context: ConstraintValidatorContext?): Boolean {

        return this.annotation.enumClass.java.enumConstants.any { it.name ==  valueForValidation.toUpperCase() }
    }
}
