package br.com.mac.api.ctb.transacao.config

import br.com.mac.api.ctb.transacao.constant.CONTROL_POINT_JSON_ERROR_MESSAGE
import br.com.mac.api.ctb.transacao.domain.model.PontoControleConfig
import br.com.mac.ctb.enum.PontoDeControle
import com.google.common.reflect.TypeToken
import com.google.gson.Gson
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Component
import java.io.File

@Component
class ControlPointConfigComponent {

    @Value("\${mac.ledger.controle.config.file}")
    private lateinit var pontoControleFile: String

    private var pontoControleMapConfig: Map<String, PontoControleConfig> = mapOf()

    fun setupControlPointConfigByJSON(controlPoint: PontoDeControle): PontoControleConfig {
        val pontoControles: List<PontoControleConfig> = Gson().fromJson(File(pontoControleFile)
                .readText(Charsets.UTF_8), object : TypeToken<ArrayList<PontoControleConfig>>() {}.type)

        pontoControleMapConfig = pontoControles.map { it.controle to it }.toMap()

        return pontoControleMapConfig[controlPoint.name]
                ?: throw error(CONTROL_POINT_JSON_ERROR_MESSAGE)
    }

    fun getControlPointsConfigByJSON() : List<PontoControleConfig> {
        return Gson().fromJson(File(pontoControleFile)
                .readText(Charsets.UTF_8), object : TypeToken<ArrayList<PontoControleConfig>>() {}.type)
    }
}
