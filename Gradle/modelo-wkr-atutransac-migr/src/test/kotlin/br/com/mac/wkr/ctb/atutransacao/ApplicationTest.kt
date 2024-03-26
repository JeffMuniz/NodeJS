package br.com.mac.wkr.ctb.atutransacao

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.context.annotation.ComponentScan

@SpringBootApplication
@ComponentScan("br.com.mac")
class ApplicationTest

fun main(args: Array<String>) {
	runApplication<ApplicationTest>(*args)
}

