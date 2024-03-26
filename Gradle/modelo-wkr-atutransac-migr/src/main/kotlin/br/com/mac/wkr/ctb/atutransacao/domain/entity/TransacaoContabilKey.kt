package br.com.mac.wkr.ctb.atutransacao.domain.entity

import org.springframework.data.cassandra.core.cql.PrimaryKeyType
import org.springframework.data.cassandra.core.mapping.PrimaryKeyClass
import org.springframework.data.cassandra.core.mapping.PrimaryKeyColumn
import java.util.Date
import java.util.UUID

@PrimaryKeyClass
data class TransacaoContabilKey(

        @PrimaryKeyColumn(value = "cd_transacao",
                ordinal = 2,
                type = PrimaryKeyType.PARTITIONED)
        var codigoTransacao: UUID? = null,

        @PrimaryKeyColumn(value = "ds_ledger",
                ordinal = 0,
                type = PrimaryKeyType.PARTITIONED)
        val ledger: String? = null,

        @PrimaryKeyColumn(value = "dt_inclusao",
                ordinal = 1,
                type = PrimaryKeyType.CLUSTERED)
        var dataInclusao: Date? = null

)
