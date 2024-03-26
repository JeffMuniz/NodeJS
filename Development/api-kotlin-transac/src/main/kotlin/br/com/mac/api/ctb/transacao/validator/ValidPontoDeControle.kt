package br.com.mac.api.ctb.transacao.validator

import br.com.mac.api.ctb.transacao.constant.CONTROL_POINT_VALIDATOR_MESSAGE
import br.com.mac.ctb.enum.PontoDeControle
import javax.validation.Constraint
import javax.validation.Payload
import kotlin.reflect.KClass


@Target(AnnotationTarget.VALUE_PARAMETER, AnnotationTarget.PROPERTY, AnnotationTarget.FIELD)
@Retention(AnnotationRetention.RUNTIME)
@Constraint(validatedBy = [ValidPontoDeControleValidator::class])
annotation class ValidPontoDeControle(
        val message: String = CONTROL_POINT_VALIDATOR_MESSAGE,
        val groups: Array<KClass<*>> = [],
        val payload: Array<KClass<out Payload>> = [],
        val enumClass: KClass<PontoDeControle>
)
