package br.com.mac.api.ctb.transacao.validator

import br.com.mac.ctb.enum.TipoOperacao
import br.com.mac.api.ctb.transacao.constant.OPERATION_TYPE_VALIDATOR_MESSAGE
import javax.validation.Constraint
import javax.validation.Payload
import kotlin.reflect.KClass


@Target(AnnotationTarget.VALUE_PARAMETER, AnnotationTarget.PROPERTY, AnnotationTarget.FIELD)
@Retention(AnnotationRetention.RUNTIME)
@Constraint(validatedBy = [ValidTipoOperacaoValidator::class])
annotation class ValidTipoOperacao(
        val message: String = OPERATION_TYPE_VALIDATOR_MESSAGE,
        val groups: Array<KClass<*>> = [],
        val payload: Array<KClass<out Payload>> = [],
        val enumClass: KClass<TipoOperacao>
)
