package br.com.mac.wkr.ctb.atutransacao

import br.com.mac.wkr.ctb.atutransacao.domain.service.TransacaoContabilService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.event.ContextRefreshedEvent
import org.springframework.context.event.EventListener
import org.springframework.stereotype.Component
import java.time.LocalDateTime
import java.time.ZoneId
import java.util.Date
import javax.validation.ValidationException

@Component
class ApplicationEventListener {

    @Value("\${mac.ledgers}")
    private lateinit var ledgers: String

    @Value("\${mac.records-size:100}")
    private var recordsSize: Int = RECORD_SIZE

    @Value("\${mac.initial-date:#{null}}")
    private var initialDate: String? = null

    @Autowired
    private lateinit var transacaoContabilService: TransacaoContabilService

    @EventListener
    fun onApplicationEvent(event: ContextRefreshedEvent?) {

        var date: Date? = null

        initialDate?.let {

            val regex = "([12]\\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01]))".toRegex()

            if (!it.matches(regex)) throw ValidationException(EXCEPTION_MESSAGE)

            val dateList = it.split(DELIMITER)

            date = Date.from(LocalDateTime.of(dateList[YEAR].toInt(), dateList[MONTH].toInt(), dateList[DAY].toInt(),
                    HOUR, MINUTE, SECOND).atZone(ZoneId.systemDefault()).toInstant())

        }

        ledgers.split(",").forEach {
            transacaoContabilService.process(ledger = it, recordsSize = recordsSize, initialDate = date)
        }
    }

    companion object {
        const val RECORD_SIZE = 100
        const val EXCEPTION_MESSAGE = "Data inicial invalida, utilizar o formato: yyyy-MM-dd"
        const val DELIMITER = "-"
        const val YEAR = 0
        const val MONTH = 1
        const val DAY = 2
        const val HOUR = 0
        const val MINUTE = 0
        const val SECOND = 0
    }


}
