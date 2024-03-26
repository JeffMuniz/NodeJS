package br.com.mac.wkr.ctb.atutransacao

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.context.annotation.ComponentScan
import org.springframework.scheduling.annotation.EnableAsync

@SpringBootApplication
@ComponentScan("br.com.mac")
@EnableAsync
class ContabilAtualizacaoTransacaoWorkerApplication

fun main(args: Array<String>) {
    runApplication<
            ContabilAtualizacaoTransacaoWorkerApplication>(*args)
}
