package br.com.mac.api.ctb.transacao

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.context.annotation.ComponentScan


@SpringBootApplication
@ComponentScan("br.com.mac")
class ContabilApiTransacaoApplication

fun main(args: Array<String>) {
    runApplication<ContabilApiTransacaoApplication>(*args)
}

