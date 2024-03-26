package br.com.mac.api.ctb.transacao.config

import br.com.mac.api.ctb.transacao.constant.CONCILIATION_JSON_ERROR_MESSAGE
import br.com.mac.api.ctb.transacao.domain.model.Conciliacao
import br.com.mac.ctb.enum.PontoDeControle
import com.google.common.reflect.TypeToken
import com.google.gson.Gson
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Component
import java.io.File

@Component
class ConciliationModelConfigComponent {

    @Value("\${mac.ledger.conciliacao.config.file}")
    private lateinit var conciliacaoFieldsFile: String

    private var conciliacaoMap: Map<String, Conciliacao> = mapOf()

    fun setupConciliationModelByJSON(controlPoint: PontoDeControle): Conciliacao {

        val conciliacaoFields: List<Conciliacao> = Gson().fromJson(File(conciliacaoFieldsFile)
                .readText(Charsets.UTF_8), object : TypeToken<ArrayList<Conciliacao>>() {}.type)

        conciliacaoMap = conciliacaoFields.map { it.controle to it }.toMap()

        return conciliacaoMap[controlPoint.name]
                ?: throw error(CONCILIATION_JSON_ERROR_MESSAGE)

    }
}
