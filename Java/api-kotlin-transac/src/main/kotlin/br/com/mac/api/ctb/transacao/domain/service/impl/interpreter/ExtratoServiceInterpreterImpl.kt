package br.com.mac.api.ctb.transacao.domain.service.impl.interpreter

import br.com.mac.ctb.enum.TipoLedger
import br.com.mac.api.ctb.transacao.domain.model.Extrato
import br.com.mac.api.ctb.transacao.domain.model.TransacaoContabil
import br.com.mac.api.ctb.transacao.domain.service.ExtratoServiceInterpreter
import br.com.mac.api.ctb.transacao.domain.service.impl.adjustment.ExtratoAjusteServiceImpl
import br.com.mac.api.ctb.transacao.domain.service.impl.authorization.ExtratoAutorizacaoServiceImpl
import br.com.mac.api.ctb.transacao.domain.service.impl.order.ExtratoPedidoServiceImpl
import br.com.mac.api.ctb.transacao.domain.service.impl.scheduling.ExtratoAgendamentoPedidoServiceImpl
import br.com.mac.api.ctb.transacao.domain.service.impl.virtualAccounting.ExtratoContaVirtualServiceImpl
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import java.util.Collections
import java.util.HashMap

@Service
class ExtratoServiceInterpreterImpl @Autowired constructor(
        extratoAgendamentoPedidoServiceImpl: ExtratoAgendamentoPedidoServiceImpl,
        extratoPedidoServiceImpl: ExtratoPedidoServiceImpl,
        extratoAutorizacaoServiceImpl: ExtratoAutorizacaoServiceImpl,
        extratoAjusteServiceImpl: ExtratoAjusteServiceImpl,
        extratoContaVirtualServiceImpl: ExtratoContaVirtualServiceImpl
)
    : ExtratoServiceInterpreter {

    private val serviceProviderMap: MutableMap<String, (TipoLedger, List<TransacaoContabil>) -> List<Extrato>> =
            Collections.synchronizedMap(HashMap())

    init {
        serviceProviderMap["AGENDAMENTO_PEDIDO"] = extratoAgendamentoPedidoServiceImpl::getStatement
        serviceProviderMap["PEDIDO"] = extratoPedidoServiceImpl::getStatement
        serviceProviderMap["AUTORIZACAO"] = extratoAutorizacaoServiceImpl::getStatement
        serviceProviderMap["AJUSTE"] = extratoAjusteServiceImpl::getStatement
        serviceProviderMap["CONTAVIRTUAL"] = extratoContaVirtualServiceImpl::getStatement

    }

    override fun interpret(domain: String): (TipoLedger, List<TransacaoContabil>) -> List<Extrato> {

        return serviceProviderMap[domain] ?: error("Extrato não implementado")
    }
}
