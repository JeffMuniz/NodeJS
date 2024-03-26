package br.com.mac.api.ctb.transacao.helper

import com.fasterxml.jackson.databind.ObjectMapper
import org.apache.commons.csv.CSVFormat
import org.apache.commons.csv.CSVPrinter
import org.apache.commons.csv.QuoteMode
import java.io.ByteArrayInputStream
import java.io.ByteArrayOutputStream
import java.io.PrintWriter


object CSVHelper {

    private val OBJECT_MAPPER = ObjectMapper()

    fun convertToCSV(list: List<Any>): ByteArrayInputStream {
        if ( list.isNullOrEmpty() ) return ByteArrayInputStream(ByteArray(0))
        val format = CSVFormat.DEFAULT
                .withQuoteMode(QuoteMode.MINIMAL)
                .withHeader(*header(list))

        ByteArrayOutputStream().use { out ->
            CSVPrinter(PrintWriter(out), format)
                    .use {
                        body(list).forEach { arr -> it.printRecord(*arr) }
                        it.flush()
                        return ByteArrayInputStream(out.toByteArray())
                    }
        }
    }

    val header = { list: List<Any> ->
        OBJECT_MAPPER
                .convertValue(list[0], Map::class.java)
                .map { it.key.toString() }
                .toTypedArray()
    }
    val body = { list: List<Any> ->
        list.map { l ->
            OBJECT_MAPPER
                    .convertValue(l, Map::class.java)
        }.map { m -> m.values }.map { v -> v.toTypedArray() }
    }
}
