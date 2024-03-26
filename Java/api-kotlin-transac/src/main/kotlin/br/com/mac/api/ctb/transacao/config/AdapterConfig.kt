package br.com.mac.api.ctb.transacao.config

import br.com.mac.adapter.elassandra.ElassandraAdapter
import br.com.mac.ctb.entity.PedidoEntity
import br.com.mac.ctb.entity.PedidoKey
import br.com.mac.ctb.entity.TransacaoContabilEntity
import br.com.mac.ctb.entity.TransacaoContabilKey
import br.com.mac.ctb.entity.AutorizacaoEntity
import br.com.mac.ctb.entity.AutorizacaoKey
import br.com.mac.ctb.entity.AjusteEntity
import br.com.mac.ctb.entity.AjusteKey
import br.com.mac.ctb.entity.AgendamentoPedidoKey
import br.com.mac.ctb.entity.AgendamentoPedidoEntity
import br.com.mac.ctb.entity.ContaVirtualKey
import br.com.mac.ctb.entity.ContaVirtualEntity

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import javax.annotation.Resource

@Configuration
class AdapterConfig {

    @Resource(name = "mac.elassandra.adapter")
    private lateinit var elassandraAdapter: ElassandraAdapter<TransacaoContabilEntity, TransacaoContabilKey>

    @Resource(name = "mac.elassandra.adapter")
    private lateinit var elassandraPedidoAdapter: ElassandraAdapter<PedidoEntity, PedidoKey>

    @Resource(name = "mac.elassandra.adapter")
    private lateinit var elassandraAuthorizationAdapter: ElassandraAdapter<AutorizacaoEntity, AutorizacaoKey>

    @Resource(name = "mac.elassandra.adapter")
    private lateinit var elassandraAdjustmentAdapter: ElassandraAdapter<AjusteEntity, AjusteKey>

    @Resource(name = "mac.elassandra.adapter")
    private lateinit var elassandraSRAdapter: ElassandraAdapter<AgendamentoPedidoEntity, AgendamentoPedidoKey>

    @Resource(name = "mac.elassandra.adapter")
    private lateinit var elassandraContaVirtualAdapter: ElassandraAdapter<ContaVirtualEntity, ContaVirtualKey>

    @Bean
    fun elassandraAdapter(): ElassandraAdapter<TransacaoContabilEntity, TransacaoContabilKey> {
        elassandraAdapter.setup(TransacaoContabilEntity::class.java)
        return elassandraAdapter
    }

    @Bean
    fun elassandraOrderAdapter(): ElassandraAdapter<PedidoEntity, PedidoKey> {
        elassandraPedidoAdapter.setup(PedidoEntity::class.java)
        return elassandraPedidoAdapter
    }

    @Bean
    fun elassandraAuthorizationAdapter(): ElassandraAdapter<AutorizacaoEntity, AutorizacaoKey> {
        elassandraAuthorizationAdapter.setup(AutorizacaoEntity::class.java)
        return elassandraAuthorizationAdapter
    }

    @Bean
    fun elassandraAdjustmentAdapter(): ElassandraAdapter<AjusteEntity, AjusteKey> {
        elassandraAdjustmentAdapter.setup(AjusteEntity::class.java)
        return elassandraAdjustmentAdapter
    }

    @Bean
    fun elassandraSchedulingRequestAdapter(): ElassandraAdapter<AgendamentoPedidoEntity, AgendamentoPedidoKey> {
        elassandraSRAdapter.setup(AgendamentoPedidoEntity::class.java)
        return elassandraSRAdapter
    }

    @Bean
    fun elassandraVirtualAccountingAdapter(): ElassandraAdapter<ContaVirtualEntity, ContaVirtualKey> {
        elassandraContaVirtualAdapter.setup(ContaVirtualEntity::class.java)
        return elassandraContaVirtualAdapter
    }
}
