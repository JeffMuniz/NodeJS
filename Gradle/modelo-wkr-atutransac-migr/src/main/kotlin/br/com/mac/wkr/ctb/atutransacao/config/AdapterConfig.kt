package br.com.mac.wkr.ctb.atutransacao.config

import br.com.mac.adapter.elassandra.ElassandraAdapter
import br.com.mac.wkr.ctb.atutransacao.domain.entity.TransacaoContabilEntity
import br.com.mac.wkr.ctb.atutransacao.domain.entity.TransacaoContabilKey
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import javax.annotation.Resource

@Configuration
class AdapterConfig {

    @Resource(name = "mac.elassandra.adapter")
    private lateinit var elassandraAdapter: ElassandraAdapter<TransacaoContabilEntity, TransacaoContabilKey>

    @Bean
    fun elassandraAdapter(): ElassandraAdapter<TransacaoContabilEntity, TransacaoContabilKey>{
        elassandraAdapter.setup(TransacaoContabilEntity::class.java)
        return elassandraAdapter
    }

}
