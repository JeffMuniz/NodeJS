package br.com.mac.api.ctb.transacao.validator

import br.com.mac.api.ctb.transacao.constant.LEDGER_TYPE_VALIDATOR_MESSAGE
import br.com.mac.ctb.enum.TipoLedger
import javax.validation.Constraint
import javax.validation.Payload
import kotlin.reflect.KClass


@Target(AnnotationTarget.VALUE_PARAMETER, AnnotationTarget.PROPERTY, AnnotationTarget.FIELD)
@Retention(AnnotationRetention.RUNTIME)
@Constraint(validatedBy = [ValidTipoLedgerValidator::class])
annotation class ValidTipoLedger(
        val message: String = LEDGER_TYPE_VALIDATOR_MESSAGE,
        val groups: Array<KClass<*>> = [],
        val payload: Array<KClass<out Payload>> = [],
        val enumClass: KClass<TipoLedger>
)
