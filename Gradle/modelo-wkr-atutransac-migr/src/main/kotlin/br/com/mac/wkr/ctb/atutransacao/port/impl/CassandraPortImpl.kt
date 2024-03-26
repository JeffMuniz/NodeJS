package br.com.mac.wkr.ctb.atutransacao.port.impl

import br.com.mac.adapter.elassandra.ElassandraAdapter
import br.com.mac.wkr.ctb.atutransacao.domain.entity.TransacaoContabilEntity
import br.com.mac.wkr.ctb.atutransacao.domain.entity.TransacaoContabilKey
import br.com.mac.wkr.ctb.atutransacao.domain.model.TransacaoContabil
import br.com.mac.wkr.ctb.atutransacao.port.CassandraPort
import com.datastax.driver.core.ResultSet
import com.datastax.driver.core.Row
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.domain.Pageable
import org.springframework.stereotype.Component
import java.time.ZoneId
import java.util.Date
import java.util.LinkedList

// ledger fields
const val LEDGER_FIELD = "ds_ledger"
const val DATA_INCLUSAO_FIELD = "dt_inclusao"
const val CODIGO_TRANSACAO_FIELD = "cd_transacao"
const val CODIGO_EVENTO_FIELD = "cd_evento"
const val TIPO_EVENTO_FIELD = "tp_evento"
const val CODIGO_TRANSACAO_ANTERIOR_FIELD = "cd_transacao_anterior"
const val DATA_EVENTO_FIELD = "dt_evento"
const val VALOR_FIELD = "tx_valor"
const val SALDO_FIELD = "tx_saldo"
const val SALDO_ANTERIOR_FIELD = "tx_saldo_anterior"
const val TIPO_OPERACAO_FIELD = "tp_operacao"
const val TOTAL_CREDITO_DIA = "tx_total_credito_dia"
const val TOTAL_CREDITO_MES = "tx_total_credito_mes"
const val TOTAL_CREDITO_ANO = "tx_total_credito_ano"

@Component
class CassandraPortImpl(@Autowired val adapter:
    ElassandraAdapter<TransacaoContabilEntity, TransacaoContabilKey>) : CassandraPort {

    override fun insert(transacaoContabil: TransacaoContabil) {
        adapter.insert(TransacaoContabilEntity(transacaoContabil))
    }

    override fun saveAll(transacoes: List<TransacaoContabil>) {
        adapter.saveAll(transacoes.map { TransacaoContabilEntity(it) })
    }

    override fun countTransacoes(ledger: String, initialDate: Date?): Long {

        val parameters = mutableMapOf<String, Any>()

        val query = StringBuilder()

        query.append("SELECT count(1) FROM transacao_contabil WHERE ds_ledger = :ledger ")

        parameters.plusAssign(Pair("ledger", ledger.toUpperCase()))

        initialDate?.let {

            query.append("AND $DATA_INCLUSAO_FIELD >= :initialDate ")

            parameters.plusAssign(Pair("initialDate", it))

        }

        val result = adapter.execute(query.toString(), parameters) as ResultSet

        return result.one().getLong("count")
    }

    override fun findTransacoes(ledger: String, initialDate: Date?, page: Pageable): LinkedList<TransacaoContabil> {

        val ledgerRecordList = arrayListOf<TransacaoContabil>()

        val parameters = mutableMapOf<String, Any>()

        val query = StringBuilder()

        query.append("""SELECT $CODIGO_TRANSACAO_FIELD, $CODIGO_EVENTO_FIELD, $TIPO_EVENTO_FIELD, 
            $CODIGO_TRANSACAO_ANTERIOR_FIELD, $DATA_EVENTO_FIELD, $DATA_INCLUSAO_FIELD, $VALOR_FIELD, $SALDO_FIELD, 
            $SALDO_ANTERIOR_FIELD, $TIPO_OPERACAO_FIELD, $LEDGER_FIELD, $TOTAL_CREDITO_DIA, $TOTAL_CREDITO_MES, 
            $TOTAL_CREDITO_ANO FROM transacao_contabil 
            WHERE $LEDGER_FIELD = :ledger """)

        parameters.plusAssign(Pair("ledger", ledger.toUpperCase()))

        initialDate?.let {

            query.append("AND $DATA_INCLUSAO_FIELD >= :initialDate ")

            parameters.plusAssign(Pair("initialDate", it))

        }

        query.append("ORDER BY $DATA_INCLUSAO_FIELD ASC")

        val result = adapter.execute(query.toString(), parameters, page.pageSize) as? ResultSet

        result?.let {

            var pageControl = 0

            var records = it

            while (page.pageNumber != pageControl && !records.isFullyFetched) {

                val fetchSize = records.availableWithoutFetching
                val pagingState = records.executionInfo.pagingState

                records = adapter.execute(query.toString(), parameters, fetchSize, pagingState) as ResultSet

                pageControl++
            }

            records.let {

                var remaining = records.availableWithoutFetching

                for (row in records) {

                    ledgerRecordList.add(TransacaoContabil(convertRowToEntity(row)))

                    if (--remaining == 0) {

                        //Para iterar somente até o fim da página
                        break
                    }
                }

            }
        }

        return LinkedList(ledgerRecordList)

    }

    override fun findBaseTransaction(ledger: String, initialDate: Date?): TransacaoContabil? {

        val parameters = mutableMapOf<String, Any>()

        val query = StringBuilder()

        query.append("""SELECT $CODIGO_TRANSACAO_FIELD, $CODIGO_EVENTO_FIELD, $TIPO_EVENTO_FIELD, 
            $CODIGO_TRANSACAO_ANTERIOR_FIELD, $DATA_EVENTO_FIELD, $DATA_INCLUSAO_FIELD, $VALOR_FIELD, $SALDO_FIELD, 
            $SALDO_ANTERIOR_FIELD, $TIPO_OPERACAO_FIELD, $LEDGER_FIELD, $TOTAL_CREDITO_DIA, $TOTAL_CREDITO_MES, 
            $TOTAL_CREDITO_ANO FROM transacao_contabil 
            WHERE $LEDGER_FIELD = :ledger """)

        parameters.plusAssign(Pair("ledger", ledger.toUpperCase()))

        initialDate?.let {
            query.append("AND $DATA_INCLUSAO_FIELD < :initialDate")
            //get previous day
            parameters.plusAssign(Pair("initialDate", it))
        }

        query.append("\nLIMIT 1")

        val result = adapter.execute(query.toString(), parameters) as? ResultSet

        var baseTrasaction: TransacaoContabil? = null
        result?.let { it ->
            it.firstOrNull()?.let {
                baseTrasaction = TransacaoContabil(convertRowToEntity(it))
            }
        }

        return baseTrasaction

    }

    private fun convertRowToEntity(row: Row): TransacaoContabilEntity {
        val ledgerKey = TransacaoContabilKey(ledger = row.getString(LEDGER_FIELD),
                dataInclusao = row.getTimestamp(DATA_INCLUSAO_FIELD),
                codigoTransacao = row.getUUID(CODIGO_TRANSACAO_FIELD))

        return TransacaoContabilEntity(transacaoContabilKey = ledgerKey,
                codigoEvento = row.getInt(CODIGO_EVENTO_FIELD),
                tipoEvento = row.getString(TIPO_EVENTO_FIELD),
                codigoTransacaoAnterior = row.getUUID(CODIGO_TRANSACAO_ANTERIOR_FIELD),
                dataEvento = row.getTimestamp(DATA_EVENTO_FIELD),
                valor = row.getDecimal(VALOR_FIELD),
                saldo = row.getDecimal(SALDO_FIELD),
                saldoAnterior = row.getDecimal(SALDO_ANTERIOR_FIELD),
                tipoOperacao = row.getString(TIPO_OPERACAO_FIELD),
                totalCreditoDia = row.getDecimal(TOTAL_CREDITO_DIA),
                totalCreditoMes = row.getDecimal(TOTAL_CREDITO_MES),
                totalCreditoAno = row.getDecimal(TOTAL_CREDITO_ANO)
        )
    }
}
